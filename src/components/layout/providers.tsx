"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "framer-motion";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { FinanceProvider } from "@/components/shared/finance-provider";

/** domMax carries layout animations; loaded after first paint so it stays off the critical path. */
const loadFeatures = () => import("framer-motion").then((mod) => mod.domMax);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NuqsAdapter>
      <MotionConfig reducedMotion="user">
        <LazyMotion features={loadFeatures} strict>
          <FinanceProvider>{children}</FinanceProvider>
        </LazyMotion>
      </MotionConfig>
    </NuqsAdapter>
  );
}
