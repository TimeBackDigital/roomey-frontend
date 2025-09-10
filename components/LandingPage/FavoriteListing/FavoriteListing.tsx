import ListingCard from "@/components/Card/ListingCard";
import { Bed, House, Lamp, ShowerHead } from "lucide-react";

const FavoriteListing = () => {
  return (
    <section className="space-y-4">
      <div className="text-center">
        <h1>Favorite Listings</h1>
        <h2 className="text-muted-foreground font-normal">
          Rooms you&apos;ve marked <br /> as favorites.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 1 }).map((_, index) => (
          <ListingCard
            key={index}
            images={[
              "/assets/bg/Property 1=Variant1.webp",
              "/assets/bg/Property 1=Variant2.webp",
              "/assets/bg/Property 1=Variant3.webp",
            ]}
            location="Central Sydney"
            title="2BR flat in Central Sydney"
            price="$250"
            tags={["Bills Included", "Available Now"]}
            amenities={[
              {
                label: "Apartment",
                icon: <House className="i-lucide-home w-4 h-4" />,
              },
              {
                label: "Private Room",
                icon: <Bed className="i-lucide-bed w-4 h-4" />,
              },
              {
                label: "Furnished",
                icon: <Lamp className="i-lucide-sofa w-4 h-4" />,
              },
              {
                label: "Shared Bath",
                icon: <ShowerHead className="i-lucide-bath w-4 h-4" />,
              },
            ]}
          />
        ))}
      </div>
    </section>
  );
};

export default FavoriteListing;
