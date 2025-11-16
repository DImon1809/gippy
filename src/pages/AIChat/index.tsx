import React from "react";

import { PageLoader } from "@/shared";

const AIChatComponent = React.lazy(() => import("./AIChat"));

export const AIChat = () => {
  return (
    <React.Suspense fallback={<PageLoader />}>
      <AIChatComponent />
    </React.Suspense>
  );
};
