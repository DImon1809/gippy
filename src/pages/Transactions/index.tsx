import React from "react";

import { PageLoader } from "@/shared";

const TransactionsComponent = React.lazy(() => import("./Transactions"));

export const Transactions = () => {
  return (
    <React.Suspense fallback={<PageLoader />}>
      <TransactionsComponent />
    </React.Suspense>
  );
};
