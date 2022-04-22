import React, { useState } from "react";

export const LeftSideMenuContext = React.createContext<any>(false);

export function LeftSideMenuContextProvider({
  children,
}: React.PropsWithChildren<unknown>) {
  const [expanded, setExpanded] = useState(false);

  return (
    <LeftSideMenuContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </LeftSideMenuContext.Provider>
  );
}
