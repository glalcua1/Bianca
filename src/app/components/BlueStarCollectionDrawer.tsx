import { Link } from "react-router";
import { Drawer } from "vaul";
import { X } from "lucide-react";
import CollectionPhotoFrame from "./CollectionPhotoFrame";
import {
  atelierPieceEyebrow,
  type AtelierPiece,
} from "../data/fineJewelleryCollections";
import { getBlueStarCollectionPieces } from "../data/blueDiamond";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function CollectionPieceCard({
  piece,
  onNavigate,
}: {
  piece: AtelierPiece;
  onNavigate: () => void;
}) {
  return (
    <Link
      to={`/fine-jewellery#${piece.category}`}
      onClick={onNavigate}
      className="group flex flex-col text-left outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-[#766d42]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5]"
    >
      <CollectionPhotoFrame
        fluid
        src={piece.image}
        alt={piece.alt}
        imageWellColor={piece.imageWellColor}
        data-name={piece.id}
      />
      <div className="mt-4 px-1">
        <p className="text-[10px] uppercase tracking-[0.22em] text-gold-on-cream">
          {atelierPieceEyebrow(piece)}
        </p>
        <h3 className="mt-2 font-editorial text-[1.05rem] tracking-[0.05em] text-[#1d3c34] transition-colors group-hover:text-[#524a28]">
          {piece.title}
        </h3>
        <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-on-cream-muted">
          {piece.productCode}
        </p>
      </div>
    </Link>
  );
}

/**
 * Right-side drawer showcasing Blue Star blue diamond rings and blue-toned earrings.
 */
export default function BlueStarCollectionDrawer({
  open,
  onOpenChange,
}: Props) {
  const pieces = getBlueStarCollectionPieces();
  const rings = pieces.filter((piece) => piece.category === "rings");
  const earrings = pieces.filter((piece) => piece.category === "earrings");

  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      direction="right"
      shouldScaleBackground={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-[#0a1628]/70 backdrop-blur-[3px]" />
        <Drawer.Content
          aria-describedby="blue-star-collection-description"
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col bg-[#faf8f5] shadow-[-24px_0_64px_rgba(10,22,40,0.35)] outline-none sm:max-w-3xl"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#1d3c34]/10 px-5 py-5 sm:px-6">
            <div className="min-w-0">
              <p className="font-editorial text-[10px] uppercase tracking-[0.28em] text-gold-on-cream">
                Blue Star · Atelier
              </p>
              <Drawer.Title className="mt-2 font-editorial text-lg tracking-[0.1em] uppercase text-[#1d3c34] sm:text-xl">
                View Collection
              </Drawer.Title>
              <p
                id="blue-star-collection-description"
                className="mt-2 text-sm leading-relaxed text-on-cream-body"
              >
                Lab-grown blue diamond rings and earrings from the Blue Star
                edit.
              </p>
            </div>
            <Drawer.Close asChild>
              <button
                type="button"
                aria-label="Close Blue Star collection"
                className="shrink-0 rounded-full p-2 text-on-cream-muted transition-colors hover:bg-[#1d3c34]/5 hover:text-bianca-forest"
              >
                <X className="size-5" />
              </button>
            </Drawer.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
            {rings.length > 0 && (
              <section aria-labelledby="blue-star-rings-heading">
                <h3
                  id="blue-star-rings-heading"
                  className="font-editorial text-[12px] uppercase tracking-[0.22em] text-[#1d3c34]"
                >
                  Rings
                </h3>
                <ul className="mt-5 grid grid-cols-2 gap-5 sm:gap-6">
                  {rings.map((piece) => (
                    <li key={piece.id}>
                      <CollectionPieceCard
                        piece={piece}
                        onNavigate={() => onOpenChange(false)}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {earrings.length > 0 && (
              <section
                aria-labelledby="blue-star-earrings-heading"
                className={rings.length > 0 ? "mt-10 border-t border-[#1d3c34]/10 pt-10" : ""}
              >
                <h3
                  id="blue-star-earrings-heading"
                  className="font-editorial text-[12px] uppercase tracking-[0.22em] text-[#1d3c34]"
                >
                  Earrings
                </h3>
                <ul className="mt-5 grid grid-cols-2 gap-5 sm:gap-6">
                  {earrings.map((piece) => (
                    <li key={piece.id}>
                      <CollectionPieceCard
                        piece={piece}
                        onNavigate={() => onOpenChange(false)}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="border-t border-[#1d3c34]/10 bg-[#f4f0e6]/70 px-5 py-4 sm:px-6">
            <Drawer.Close asChild>
              <Link
                to="/fine-jewellery#rings"
                className="inline-flex w-full items-center justify-center border border-[#1d3c34] bg-[#1d3c34] px-5 py-3 font-editorial text-[12px] uppercase tracking-[0.16em] text-[#faf8f5] transition-colors duration-500 hover:bg-transparent hover:text-bianca-forest"
              >
                Explore fine jewellery
              </Link>
            </Drawer.Close>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
