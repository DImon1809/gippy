import React from "react";

import { PageLoader } from "@/shared";

const SupportComponent = React.lazy(() => import("./Support"));

export const Support = () => {
  return (
    <React.Suspense fallback={<PageLoader />}>
      <SupportComponent />
    </React.Suspense>
  );
};
