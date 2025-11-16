import React from "react";

import { PageLoader } from "@/shared";

const WalletComponent = React.lazy(() => import("./Wallet"));

export const Wallet = () => {
  return (
    <React.Suspense fallback={<PageLoader />}>
      <WalletComponent />
    </React.Suspense>
  );
};
