import React from "react";

import { PageLoader } from "@/shared";

const NotFoundComponent = React.lazy(() => import("./NotFound"));

export const NotFound = () => {
  return (
    <React.Suspense fallback={<PageLoader />}>
      <NotFoundComponent />
    </React.Suspense>
  );
};
