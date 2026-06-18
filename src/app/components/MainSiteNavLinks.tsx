import { Link } from "react-router";
import { useNavActiveItem } from "../context/NavActiveContext";
import { SITE_NAV_ITEMS } from "../data/siteContact";
import FineJewelleryNavTrigger from "./FineJewelleryNavTrigger";

type Props = {
  /** Shorter labels for the scaled desktop header artboard */
  compact?: boolean;
};

export default function MainSiteNavLinks({ compact = false }: Props) {
  const activeItem = useNavActiveItem();

  return (
    <>
      {SITE_NAV_ITEMS.map((item) => {
        const isActive = activeItem === item.id;
        const label =
          compact && item.desktopLabel ? item.desktopLabel : item.label;

        if (item.id === "fine-jewellery") {
          return (
            <FineJewelleryNavTrigger
              key={item.id}
              label={label}
              isActive={isActive}
              variant="default"
            />
          );
        }

        return (
          <Link
            key={item.id}
            to={item.to}
            className="relative block h-full shrink-0"
          >
            <div className="flex h-full flex-col items-center px-[12px] py-[5px] md:px-[14px] lg:px-[16px]">
              <span
                className={`whitespace-nowrap font-editorial text-[14px] uppercase tracking-[1.5px] text-[#f9f9f9] lg:text-[15px] ${
                  isActive ? "font-bold text-white" : ""
                } ${item.id === "the-house" && isActive ? "text-white" : ""}`}
              >
                {label}
              </span>
            </div>
          </Link>
        );
      })}
    </>
  );
}
