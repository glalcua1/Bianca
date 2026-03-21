import svgPaths from "./svg-psrj068gng";
import { imgRectangle, imgGroup } from "./svg-r4cv9";
import { RingMark } from "./RingMark";

// Ring mark – rendered via SVG luminance mask (see RingMark.tsx).
// Position matches the Figma spec: left=210.24px, top=63.26px, 32.266×49.375px
// within the 304×245px Group6 container.
function ClipPathGroup1() {
  return (
    <div
      className="absolute"
      style={{ left: "210.24px", top: "63.26px", width: "32.266px", height: "49.375px" }}
      data-name="RingMark"
    >
      <RingMark width="32.266" height="49.375" />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[16.83%_16.65%_28.53%_0.11%] mask-position-[-0.328px_-41.263px,_-0.295px_-0.307px]" data-name="Group" style={{ maskImage: `url('${imgRectangle}'), url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 253.05 133.933">
        <g id="Group">
          <path d={svgPaths.p26b9bb80} fill="var(--fill-0, #1D3C34)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[16.83%_16.65%_28.53%_0.11%]" data-name="Group">
      <Group9 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute inset-[45.19%_48.34%_44.54%_45.55%] mask-position-[-138.462px_-110.766px,_-138.429px_-69.809px]" data-name="Group" style={{ maskImage: `url('${imgRectangle}'), url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5693 25.1833">
        <g id="Group">
          <path d={svgPaths.p18c5de80} fill="var(--fill-0, #1D3C34)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[45.19%_48.34%_44.54%_45.55%]" data-name="Group">
      <Group11 />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute inset-[48.24%_40.51%_44.68%_49.59%] mask-position-[-150.751px_-118.253px,_-150.717px_-77.297px]" data-name="Group" style={{ maskImage: `url('${imgRectangle}'), url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.1108 17.3494">
        <g id="Group">
          <path d={svgPaths.p295eb900} fill="var(--fill-0, #1D3C34)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[48.24%_40.51%_44.68%_49.59%]" data-name="Group">
      <Group13 />
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute inset-[49.34%_32.11%_44.66%_57.23%] mask-position-[-173.992px_-120.935px,_-173.958px_-79.979px]" data-name="Group" style={{ maskImage: `url('${imgRectangle}'), url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.3947 14.7181">
        <g id="Group">
          <path d={svgPaths.p941b00} fill="var(--fill-0, #1D3C34)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[49.34%_32.11%_44.66%_57.23%]" data-name="Group">
      <Group15 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute inset-[47.95%_24.09%_45%_66.91%] mask-position-[-203.397px_-117.538px,_-203.364px_-76.582px]" data-name="Group" style={{ maskImage: `url('${imgRectangle}'), url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.3742 17.2714">
        <g id="Group">
          <path d={svgPaths.p3a757800} fill="var(--fill-0, #1D3C34)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents inset-[47.95%_24.09%_45%_66.91%]" data-name="Group">
      <Group17 />
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute inset-[48.24%_16.46%_44.68%_73.63%] mask-position-[-223.844px_-118.253px,_-223.811px_-77.297px]" data-name="Group" style={{ maskImage: `url('${imgRectangle}'), url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.1108 17.3494">
        <g id="Group">
          <path d={svgPaths.p31db0600} fill="var(--fill-0, #1D3C34)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents inset-[48.24%_16.46%_44.68%_73.63%]" data-name="Group">
      <Group19 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[16.83%_16.46%_28.53%_0.11%]" data-name="Group">
      <Group8 />
      <Group10 />
      <Group12 />
      <Group14 />
      <Group16 />
      <Group18 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[16.83%_16.46%_28.53%_0.11%]" data-name="Group">
      <Group7 />
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute contents inset-[16.71%_16.15%_28.43%_0.01%]" data-name="Clip path group">
      <Group5 />
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute inset-[59.63%_24.47%_7.38%_27.98%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-85.074px_-146.16px] mask-size-[276.912px_245.125px]" data-name="Group" style={{ maskImage: `url('${imgRectangle}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 144.524 80.8859">
        <g id="Group">
          <path d={svgPaths.p32b87680} fill="var(--fill-0, #1D3C34)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents inset-[59.63%_24.47%_7.38%_27.98%]" data-name="Group">
      <Group22 />
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[59.63%_24.47%_7.38%_27.98%]" data-name="Group">
      <Group21 />
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute inset-[77.09%_38.69%_16.82%_57.69%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-175.383px_-188.957px] mask-size-[276.912px_245.125px]" data-name="Group" style={{ maskImage: `url('${imgRectangle}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0033 14.9277">
        <g id="Group">
          <path d={svgPaths.p22bf9880} fill="var(--fill-0, #1D3C34)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute contents inset-[77.09%_38.69%_16.82%_57.69%]" data-name="Group">
      <Group25 />
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents inset-[77.09%_38.69%_16.82%_57.69%]" data-name="Group">
      <Group24 />
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute inset-[78.9%_34.04%_16.91%_60.09%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-182.663px_-193.394px] mask-size-[276.912px_245.125px]" data-name="Group" style={{ maskImage: `url('${imgRectangle}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.8418 10.2849">
        <g id="Group">
          <path d={svgPaths.pd8efc00} fill="var(--fill-0, #1D3C34)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents inset-[78.9%_34.04%_16.91%_60.09%]" data-name="Group">
      <Group28 />
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-[78.9%_34.04%_16.91%_60.09%]" data-name="Group">
      <Group27 />
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute inset-[79.06%_26.92%_16.82%_64.56%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-196.273px_-193.792px] mask-size-[276.912px_245.125px]" data-name="Group" style={{ maskImage: `url('${imgRectangle}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.9036 10.1131">
        <g id="Group">
          <path d={svgPaths.pbc65a00} fill="var(--fill-0, #1D3C34)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents inset-[79.06%_26.92%_16.82%_64.56%]" data-name="Group">
      <Group31 />
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute contents inset-[79.06%_26.92%_16.82%_64.56%]" data-name="Group">
      <Group30 />
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute inset-[79.41%_23.93%_16.91%_72.35%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-219.946px_-194.658px] mask-size-[276.912px_245.125px]" data-name="Group" style={{ maskImage: `url('${imgRectangle}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.3174 9.01117">
        <g id="Group">
          <path d={svgPaths.p2e69f5b1} fill="var(--fill-0, #1D3C34)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute contents inset-[79.41%_23.93%_16.91%_72.35%]" data-name="Group">
      <Group34 />
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute contents inset-[79.41%_23.93%_16.91%_72.35%]" data-name="Group">
      <Group33 />
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute inset-[79.55%_18.09%_16.9%_75.59%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-229.795px_-194.987px] mask-size-[276.912px_245.125px]" data-name="Group" style={{ maskImage: `url('${imgRectangle}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.198 8.72037">
        <g id="Group">
          <path d={svgPaths.pdb38b0} fill="var(--fill-0, #1D3C34)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute contents inset-[79.55%_18.09%_16.9%_75.59%]" data-name="Group">
      <Group37 />
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute contents inset-[79.55%_18.09%_16.9%_75.59%]" data-name="Group">
      <Group36 />
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute inset-[71.58%_11.2%_16.72%_81.07%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-246.449px_-175.454px] mask-size-[276.912px_245.125px]" data-name="Group" style={{ maskImage: `url('${imgRectangle}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.4993 28.6781">
        <g id="Group">
          <path d={svgPaths.p249ead40} fill="var(--fill-0, #1D3C34)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute contents inset-[71.58%_11.2%_16.72%_81.07%]" data-name="Group">
      <Group40 />
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute contents inset-[71.58%_11.2%_16.72%_81.07%]" data-name="Group">
      <Group39 />
    </div>
  );
}

function Group43() {
  return (
    <div className="absolute inset-[78.39%_9.36%_14.95%_85.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-259.401px_-192.156px] mask-size-[276.912px_245.125px]" data-name="Group" style={{ maskImage: `url('${imgRectangle}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.1508 16.3213">
        <g id="Group">
          <path d={svgPaths.p34aa9400} fill="var(--fill-0, #1D3C34)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group42() {
  return (
    <div className="absolute contents inset-[78.39%_9.36%_14.95%_85.33%]" data-name="Group">
      <Group43 />
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute contents inset-[78.39%_9.36%_14.95%_85.33%]" data-name="Group">
      <Group42 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[16.71%_9.36%_7.38%_0.01%]" data-name="Group">
      <ClipPathGroup1 />
      <ClipPathGroup2 />
      <Group20 />
      <Group23 />
      <Group26 />
      <Group29 />
      <Group32 />
      <Group35 />
      <Group38 />
      <Group41 />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[0_8.91%_0_0]" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[0_8.91%_0_0]" data-name="Group">
      <ClipPathGroup />
    </div>
  );
}

export default function Group6() {
  return (
    <div className="relative size-full">
      <Group />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Tiro_Bangla:Regular',sans-serif] justify-center leading-[0] left-[282px] not-italic text-[12px] text-black top-[165px] tracking-[1.5px] whitespace-nowrap">
        <p className="leading-[normal]">TM</p>
      </div>
    </div>
  );
}