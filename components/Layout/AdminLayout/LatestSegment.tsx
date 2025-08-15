"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

const LatestSegment = () => {
  const pathname = usePathname();

  const lastSegment = useMemo(() => {
    if (!pathname) return null;
    const parts = pathname.split("/").filter(Boolean);
    return parts.at(-1) ?? null;
  }, [pathname]);

  if (!lastSegment) return <div>—</div>;

  const formattedSegment = lastSegment
    .replace(/-/g, " ") // replace all dashes with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize each word

  return <h1>{formattedSegment}</h1>;
};

export default LatestSegment;
