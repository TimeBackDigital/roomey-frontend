"use client";

import { CaptchaApi } from "@/lib/type";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Turnstile from "react-turnstile";

type Props = {
  siteKey?: string;
};

const Captcha = forwardRef<CaptchaApi, Props>(function Captcha(
  { siteKey = process.env.NEXT_PUBLIC_SITE_KEY ?? "" },
  ref
) {
  const [token, setToken] = useState<string | null>(null);
  const [widgetKey, setWidgetKey] = useState(0);

  const resolverRef = useRef<((t: string) => void) | null>(null);

  const reset = () => {
    setToken(null);
    setWidgetKey((k) => k + 1);
  };

  useImperativeHandle(
    ref,
    () => ({
      getFreshToken: () =>
        new Promise<string>((resolve) => {
          if (token) return resolve(token);

          resolverRef.current = resolve;

          setWidgetKey((k) => k + 1);
        }),
      reset,
      clear: () => setToken(null),
    }),
    [token]
  );

  return (
    <Turnstile
      key={widgetKey}
      sitekey={siteKey}
      size="invisible"
      theme="light"
      onVerify={(t) => {
        setToken(t);
        resolverRef.current?.(t);
        resolverRef.current = null;
      }}
      onExpire={() => {
        setToken(null);
        reset();
      }}
      onError={() => {
        setToken(null);
        reset();
      }}
    />
  );
});

export default Captcha;
