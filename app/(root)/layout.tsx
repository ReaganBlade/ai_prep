import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default RootLayout;
