import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      user = await User.create({ clerkId: userId });
      await user.save();
    }

    const { productId } = await req.json();

    if (!productId) {
      return new NextResponse("Product is required", { status: 400 });
    }

    const isLiked = user.wishlist.includes(productId);

    if (isLiked) {
      user.wishlist = user.wishlist.filter((id: string) => id !== productId);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("[users/wishlist_POST] Error: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
