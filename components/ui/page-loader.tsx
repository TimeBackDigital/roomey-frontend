import { type LucideProps } from "lucide-react";
import * as React from "react";

type SpinnerVariantProps = Omit<LucideProps, "variant">;

const Ellipsis = ({ size = 24, ...props }: SpinnerVariantProps) => {
  return (
    <svg
      height={size}
      width={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <title>Loading…</title>
      <circle cx="4" cy="12" r="2" fill="currentColor">
        <animate
          attributeName="cy"
          begin="0;ellipsis3.end+0.25s"
          calcMode="spline"
          dur="0.6s"
          id="ellipsis1"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          values="12;6;12"
        />
      </circle>
      <circle cx="12" cy="12" r="2" fill="currentColor">
        <animate
          attributeName="cy"
          begin="ellipsis1.begin+0.1s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          values="12;6;12"
        />
      </circle>
      <circle cx="20" cy="12" r="2" fill="currentColor">
        <animate
          attributeName="cy"
          begin="ellipsis1.begin+0.2s"
          calcMode="spline"
          dur="0.6s"
          id="ellipsis3"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          values="12;6;12"
        />
      </circle>
    </svg>
  );
};

type PageLoaderProps = {
  text?: string;
  subtext?: string;
  logo?: React.ReactNode;
};

const PageLoader = ({
  text = "Loading...",
  subtext = "Please wait a moment",
  logo,
}: PageLoaderProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="fixed inset-0 z-50 grid place-items-center bg-white/70 dark:bg-black/70 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        {logo && <div className="mt-2">{logo}</div>}
        <Ellipsis size={48} className="text-primary" />
        <div>
          <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
            {text}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{subtext}</p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
