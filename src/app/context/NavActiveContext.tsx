import { createContext, useContext, type ReactNode } from "react";

export type NavActiveItem =
  | "the-house"
  | "fine-jewellery"
  | "bespoke-jewellery"
  | "cannes-collection"
  | "media";

const NavActiveContext = createContext<NavActiveItem | undefined>(undefined);

export function NavActiveProvider({
  value,
  children,
}: {
  value?: NavActiveItem;
  children: ReactNode;
}) {
  return (
    <NavActiveContext.Provider value={value}>{children}</NavActiveContext.Provider>
  );
}

export function useNavActiveItem() {
  return useContext(NavActiveContext);
}
