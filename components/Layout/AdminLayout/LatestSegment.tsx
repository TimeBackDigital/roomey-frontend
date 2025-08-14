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

  return (
    <h2>{lastSegment.slice(0, 1).toUpperCase() + lastSegment.slice(1)}</h2>
  );
};

export default LatestSegment;
