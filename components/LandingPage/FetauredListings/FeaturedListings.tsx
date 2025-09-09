import ListingCard from "@/components/Card/ListingCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Bed, House, Lamp, ShowerHead } from "lucide-react";

const FeaturedListings = () => {
  return (
    <section className="space-y-4">
      <div className="text-center">
        <h1>Featured Listings</h1>
        <h2 className="text-muted-foreground font-normal">
          Handpicked rooms available now.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="text-primary" isActive href="#">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default FeaturedListings;
