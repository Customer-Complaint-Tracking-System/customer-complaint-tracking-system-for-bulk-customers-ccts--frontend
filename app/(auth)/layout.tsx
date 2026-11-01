import React, { PropsWithChildren } from "react";

const AuthRootLayout = ({ children }: PropsWithChildren) => {
  return <div className="size-full">{children}</div>;
};

export default AuthRootLayout;
