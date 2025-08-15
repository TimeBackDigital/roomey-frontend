import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const SearchLocationSection = () => {
  return (
    <Card className="relative overflow-hidden rounded-xl w-full p-0">
      <CardContent className="relative h-[85vh] p-0">
        <Image
          src="/assets/bg/Property 1=Variant1.webp"
          alt="Find a Room in a Share House"
          fill
          quality={100}
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col text-white w-full justify-center items-center z-10">
          <h1 className="leading-tight">Find a Room</h1>
          <h1 className="leading-tight">in a Share House</h1>
          <h2 className="mt-3 text-background text-center font-normal leading-snug">
            Discover Your Perfect Room: <br />
            Choose From Our Fully Furnished, <br />
            Modern, and Stylish Shared <br />
            Houses Today!
          </h2>
        </div>
        {/* 
        <div className="absolute inset-0 flex flex-col items-end justify-end text-center text-white px-4 z-10">
          <div className="flex items-center w-full max-w-xs bg-white rounded-full px-3 py-2">
            <Search className="text-gray-500 w-4 h-4 mr-2" />
            <Input
              placeholder="Search City, Suburb"
              className="border-none shadow-none focus-visible:ring-0 p-0 text-sm"
            />
          </div>

          <Button className="rounded-full w-full max-w-xs bg-gray-800 hover:bg-gray-700 mt-3">
            <Search className="w-4 h-4 mr-2" />
            Find a Room
          </Button>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default SearchLocationSection;
