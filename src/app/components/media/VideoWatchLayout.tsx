import type { ReactNode } from "react";
import type { NavActiveItem } from "../../context/NavActiveContext";
import SiteFooter from "../SiteFooter";
import SiteNav from "../SiteNav";

type Props = {
  activeItem?: NavActiveItem;
  children: ReactNode;
};

/** Compact chrome so the player stays in the first viewport for Googlebot. */
export default function VideoWatchLayout({ activeItem, children }: Props) {
  return (
    <main className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <div className="bg-[#1d3c34]">
        <SiteNav activeItem={activeItem} />
      </div>
      {children}
      <SiteFooter />
    </main>
  );
}
