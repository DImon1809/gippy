import React from "react";

import { PageLoader } from "@/shared";

const ContactsComponent = React.lazy(() => import("./Contacts"));

export const Contacts = () => {
  return (
    <React.Suspense fallback={<PageLoader />}>
      <ContactsComponent />
    </React.Suspense>
  );
};
