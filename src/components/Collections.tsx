import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";

const Collections = async () => {
  const collections = await getCollections();
  return (
    <div className="flex flex-col items-center gap-10 px-8 py-5">
      <p className="text-heading1-bold">Collections</p>
      {!collections ||
        (collections.length === 0 ? (
          <p className="text-body-bold">No Collection Found</p>
        ) : (
          <div className="flex items-center justify-center gap-8">
            {collections.map((collections: CollectionType) => (
              <Link
                key={collections._id}
                href={`/collections/${collections._id}`}
              >
                <Image
                  src={collections.image}
                  alt={collections.title}
                  width={350}
                  height={200}
                  className="rounded-lg"
                />
              </Link>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Collections;
