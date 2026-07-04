import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/Oswald";
import { loadFont as loadBody } from "@remotion/google-fonts/Barlow";
import { PAGE_WIDTH, PAGE_HEIGHT } from "../pageSize";
import {
  book,
  vonChris,
  vonChris2,
  kapitel1,
  kapitel2,
  kapitel3,
  kapitel3b,
  kapitel4,
  kapitel5,
  kapitel6,
  kapitel6b,
  kapitel7,
  kapitel8,
  kapitel9a,
  kapitel9b,
  kapitel11a,
  kapitel11b,
  toc,
  recipe,
  recipe2,
  recipe3,
  foreword,
  part1Divider,
  chapterDivider,
  part3Divider,
  part4Divider,
  faq,
  anhangIntro,
  triggerFoodCheck,
  notfallkarte,
  einkaufslisteDruck,
  pantry,
  ueberChris,
  schlusswort,
  backmatter,
} from "../content";

const { fontFamily: displayFont } = loadDisplay("normal", { weights: ["400", "500", "600", "700"] });
const { fontFamily: bodyFont } = loadBody("normal", { weights: ["400", "500", "600", "700", "800"] });

const tokens = {
  bg: "#EFE6D3",
  bgSoft: "#E6DAC1",
  ink: "#221D17",
  dark: "#15110D",
  chalk: "#3B3B37",
  accent: "#E8A33D",
  accent2: "#B23B2E",
  accentInk: "#221D17",
  line: "#CFC0A2",
  radius: 4,
  shadow: "0 10px 26px rgba(21,17,13,0.12)",
};

/* Fine paper/film grain */
const GRAIN_URL =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
  );

/* Medium-scale mottling — reads as hand-made paper / slate surface, not fog.
   Dark variant (warm-brown alpha) for multiply on kraft; light variant for screen on chalk. */
const MOTTLE_DARK_URL =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='680' height='680'><filter id='m'><feTurbulence type='fractalNoise' baseFrequency='0.021' numOctaves='4' seed='8' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.38  0 0 0 0 0.29  0 0 0 0 0.16  0.8 0.8 0.8 0 -0.72'/></filter><rect width='100%' height='100%' filter='url(#m)'/></svg>`
  );

const MOTTLE_LIGHT_URL =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='680' height='680'><filter id='ml'><feTurbulence type='fractalNoise' baseFrequency='0.019' numOctaves='4' seed='23' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.95  0 0 0 0 0.94  0 0 0 0 0.9  0.85 0.85 0.85 0 -0.74'/></filter><rect width='100%' height='100%' filter='url(#ml)'/></svg>`
  );

/* Chalky scuff streaks — horizontal smears like a wiped slate board */
const SCUFF_URL =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='900'><filter id='s'><feTurbulence type='turbulence' baseFrequency='0.004 0.055' numOctaves='4' seed='31' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.93  0 0 0 0 0.93  0 0 0 0 0.9  0.6 0.6 0.6 0 -0.5'/></filter><rect width='100%' height='100%' filter='url(#s)'/></svg>`
  );

/* Paper fibre streaks */
const FIBRE_URL =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'><filter id='f'><feTurbulence type='turbulence' baseFrequency='0.012 0.09' numOctaves='3' seed='11' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.4  0 0 0 0 0.31  0 0 0 0 0.18  0.5 0.5 0.5 0 -0.35'/></filter><rect width='100%' height='100%' filter='url(#f)'/></svg>`
  );

/* Grunge for inside torn labels — scuffed print, worn edges */
const LABEL_GRUNGE_URL =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='560' height='560'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.055 0.028' numOctaves='4' seed='44' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0.9  0 0 0 0 0.88  0 0 0 0 0.82  0.75 0.75 0.75 0 -0.66'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`
  );

const Grain: React.FC<{ light?: boolean; opacity?: number }> = ({ light, opacity }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `url("${GRAIN_URL}")`,
      backgroundSize: "220px 220px",
      opacity: opacity ?? (light ? 0.09 : 0.13),
      mixBlendMode: light ? "multiply" : "overlay",
      pointerEvents: "none",
    }}
  />
);

/* Kraft paper surface: mottling + fibres + stains + vignette. Absolutely positioned, put first inside a relative box. */
const KraftTexture: React.FC<{ strength?: number }> = ({ strength = 1 }) => (
  <>
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("${MOTTLE_DARK_URL}")`,
        backgroundSize: "680px 680px",
        opacity: 0.28 * strength,
        mixBlendMode: "multiply",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("${MOTTLE_DARK_URL}")`,
        backgroundSize: "1240px 1040px",
        backgroundPosition: "62% 38%",
        opacity: 0.16 * strength,
        mixBlendMode: "multiply",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("${FIBRE_URL}")`,
        backgroundSize: "500px 500px",
        opacity: 0.09 * strength,
        mixBlendMode: "multiply",
        pointerEvents: "none",
      }}
    />
    {/* Warm stains, like handled paper */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(34% 22% at 82% 12%, rgba(128,96,44,0.10) 0%, rgba(128,96,44,0) 70%), radial-gradient(40% 26% at 10% 86%, rgba(110,82,38,0.11) 0%, rgba(110,82,38,0) 72%), radial-gradient(24% 16% at 30% 6%, rgba(128,96,44,0.07) 0%, rgba(128,96,44,0) 70%)",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(120% 90% at 50% 38%, rgba(255,251,240,0.42) 0%, rgba(255,251,240,0) 55%), radial-gradient(140% 120% at 50% 50%, rgba(21,17,13,0) 58%, rgba(21,17,13,0.22) 100%)",
        pointerEvents: "none",
      }}
    />
    <Grain light />
  </>
);

/* Chalkboard / slate surface for dark pages: fine mottle, wiped scuffs, creases, vignette */
const ChalkTexture: React.FC = () => (
  <>
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("${MOTTLE_LIGHT_URL}")`,
        backgroundSize: "680px 680px",
        opacity: 0.11,
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("${MOTTLE_LIGHT_URL}")`,
        backgroundSize: "1180px 980px",
        backgroundPosition: "70% 55%",
        opacity: 0.07,
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}
    />
    {/* Wiped-chalk smears */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("${SCUFF_URL}")`,
        backgroundSize: "900px 900px",
        opacity: 0.075,
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}
    />
    {/* Creases, like folded photographed paper */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(96deg, rgba(0,0,0,0) 31.6%, rgba(255,255,255,0.045) 32%, rgba(0,0,0,0.16) 32.35%, rgba(0,0,0,0) 33%), linear-gradient(-84deg, rgba(0,0,0,0) 68.7%, rgba(255,255,255,0.035) 69.1%, rgba(0,0,0,0.13) 69.45%, rgba(0,0,0,0) 70.1%)",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(110% 80% at 50% 30%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 58%), radial-gradient(140% 120% at 50% 50%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.5) 100%)",
        pointerEvents: "none",
      }}
    />
    <Grain />
  </>
);

const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      background: tokens.bgSoft,
      border: `1px solid ${tokens.line}`,
      borderRadius: tokens.radius,
      boxShadow: tokens.shadow,
      padding: "22px 24px",
      position: "relative",
      overflow: "hidden",
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("${MOTTLE_DARK_URL}")`,
        backgroundSize: "680px 680px",
        opacity: 0.14,
        mixBlendMode: "multiply",
        pointerEvents: "none",
      }}
    />
    <div style={{ position: "relative" }}>{children}</div>
  </div>
);

const coverSubtitleD = "Warum du nicht schwach bist — und was wirklich hilft";

const Page: React.FC<{ children: React.ReactNode; bg?: string; chalk?: boolean }> = ({ children, bg, chalk }) => (
  <AbsoluteFill
    style={{
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      background: chalk
        ? `radial-gradient(120% 90% at 50% 36%, #4A4A45 0%, ${tokens.chalk} 55%, #2C2B27 100%)`
        : bg ?? tokens.bg,
      color: chalk ? "#EFEAE0" : tokens.ink,
      fontFamily: bodyFont,
    }}
  >
    {chalk ? <ChalkTexture /> : (bg ?? tokens.bg) === tokens.dark ? <Grain /> : <KraftTexture />}
    <div style={{ position: "absolute", inset: 0 }}>{children}</div>
  </AbsoluteFill>
);

/* Rough torn-label edges (percent-based so it scales with the box).
   Irregular: long near-straight runs broken by occasional chunky nicks — like ripped paper strips,
   not a uniform sawtooth. */
const TORN_CLIP =
  "polygon(0.8% 10%, 4% 3.5%, 12% 5.5%, 18.5% 1.5%, 23% 5%, 37% 3%, 46% 6.5%, 51.5% 2%, 64% 4.5%, 71.5% 1%, 79% 5.5%, 90.5% 2%, 96% 6%, 99.4% 3.5%, 99.9% 16%, 98.7% 32%, 99.8% 49%, 98.9% 66%, 100% 82%, 98.5% 92%, 93.5% 97.5%, 87% 93.5%, 81.5% 98%, 69% 94.5%, 59.5% 99%, 54% 95%, 43% 98.5%, 32.5% 94%, 25% 98.5%, 13.5% 95%, 6.5% 99%, 2% 94.5%, 0.4% 84%, 1.7% 67%, 0.3% 51%, 1.5% 33%, 0.5% 18%)";

const TORN_CLIP_2 =
  "polygon(1.2% 14%, 5.5% 5%, 16% 3%, 21% 7%, 33.5% 2%, 45% 5.5%, 58% 1.5%, 63.5% 6%, 76% 3%, 84.5% 6.5%, 92% 1.5%, 98.2% 5%, 99.7% 18%, 98.5% 40%, 99.9% 58%, 98.6% 78%, 99.6% 90%, 95% 97%, 89% 92.5%, 78.5% 98.5%, 67% 94%, 61.5% 99%, 49% 95.5%, 38.5% 99.5%, 27% 94%, 20.5% 98.5%, 9% 95%, 3% 98%, 0.5% 86%, 1.8% 64%, 0.4% 44%, 1.6% 24%)";

const TornLabel: React.FC<{
  children: React.ReactNode;
  bg?: string;
  rotate?: number;
  clip?: string;
  padding?: string;
  style?: React.CSSProperties;
  shadow?: string;
}> = ({ children, bg = tokens.dark, rotate = -1.2, clip = TORN_CLIP, padding = "22px 38px 24px", style, shadow }) => (
  <div
    style={{
      filter: shadow ?? "drop-shadow(0 10px 16px rgba(0,0,0,0.35))",
      transform: `rotate(${rotate}deg)`,
      alignSelf: "flex-start",
      ...style,
    }}
  >
    <div style={{ clipPath: clip, background: bg, padding, position: "relative" }}>
      {/* Scuffed, worn print surface */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${LABEL_GRUNGE_URL}")`,
          backgroundSize: "560px 560px",
          opacity: 0.22,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${SCUFF_URL}")`,
          backgroundSize: "760px 760px",
          backgroundPosition: "30% 60%",
          opacity: 0.13,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  </div>
);

/* Circular stamp badge — thin ring, number as hero, like a rubber stamp */
const StampBadge: React.FC<{
  top: string;
  big: string;
  bottom?: string;
  dark?: boolean;
  size?: number;
}> = ({ top, big, bottom, dark, size = 138 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: dark ? "rgba(15,14,12,0.72)" : "rgba(21,17,13,0.03)",
      boxShadow: dark ? "0 6px 14px rgba(0,0,0,0.3)" : "none",
      border: dark ? "none" : `2px solid rgba(34,29,23,0.75)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        width: size - 11,
        height: size - 11,
        borderRadius: "50%",
        border: `1.5px solid ${dark ? "rgba(239,234,224,0.55)" : "rgba(34,29,23,0.55)"}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        color: dark ? "#EFEAE0" : tokens.ink,
      }}
    >
      <span
        style={{
          fontFamily: displayFont,
          fontWeight: 500,
          fontSize: 13.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          opacity: 0.85,
          marginBottom: 2,
        }}
      >
        {top}
      </span>
      <span
        style={{
          fontFamily: displayFont,
          fontWeight: 700,
          fontSize: 42,
          lineHeight: 0.95,
          color: tokens.accent,
        }}
      >
        {big}
      </span>
      {bottom ? (
        <span
          style={{
            fontFamily: displayFont,
            fontWeight: 600,
            fontSize: 14.5,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: 2,
            opacity: 0.9,
          }}
        >
          {bottom}
        </span>
      ) : null}
    </div>
  </div>
);

const Kicker: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <p
    style={{
      fontFamily: displayFont,
      fontSize: 19,
      letterSpacing: "0.24em",
      textTransform: "uppercase",
      color: light ? tokens.accent : "#8A6E3C",
      fontWeight: 600,
      margin: "0 0 16px",
    }}
  >
    {children}
  </p>
);

const Folio: React.FC<{ left: string; right: string; light?: boolean }> = ({ left, right, light }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: displayFont,
      fontWeight: 500,
      fontSize: 16,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: light ? "#fff" : tokens.ink,
      opacity: light ? 0.55 : 0.45,
      borderTop: `1px solid ${light ? "rgba(255,255,255,0.22)" : "rgba(34,29,23,0.28)"}`,
      paddingTop: 18,
      marginTop: "auto",
    }}
  >
    <span>{left}</span>
    <span>{right}</span>
  </div>
);

/* Extracts "5" from "5 Min." etc. for stamp badges */
const leadingNum = (s: string): string => {
  const m = s.match(/^\s*(\d+)/);
  return m ? m[1] : "—";
};

export const DCover: React.FC = () => (
  <Page>
    <div style={{ padding: "80px 70px 0", display: "flex", flexDirection: "column", height: "100%" }}>
      <p
        style={{
          fontFamily: displayFont,
          fontSize: 20,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#8A6E3C",
          fontWeight: 600,
          margin: "0 0 42px",
        }}
      >
        {book.eyebrow}
      </p>
      <TornLabel bg="#191713" rotate={-1.8} padding="14px 46px 26px" style={{ zIndex: 2 }}>
        <h1
          style={{
            fontFamily: displayFont,
            fontWeight: 700,
            fontSize: 128,
            lineHeight: 1,
            margin: 0,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#F3EEE3",
            whiteSpace: "nowrap",
          }}
        >
          {book.title[0]}
        </h1>
      </TornLabel>
      <TornLabel
        bg="#191713"
        rotate={1.1}
        clip={TORN_CLIP_2}
        padding="14px 46px 26px"
        style={{ marginLeft: 92, marginTop: -4, zIndex: 1 }}
      >
        <h1
          style={{
            fontFamily: displayFont,
            fontWeight: 700,
            fontSize: 128,
            lineHeight: 1,
            margin: 0,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: tokens.accent,
            whiteSpace: "nowrap",
          }}
        >
          {book.title[1]}
        </h1>
      </TornLabel>
      <p
        style={{
          fontFamily: displayFont,
          fontWeight: 500,
          fontSize: 26,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          color: tokens.ink,
          margin: "44px 0 0",
          maxWidth: "28ch",
          lineHeight: 1.55,
        }}
      >
        {coverSubtitleD}
      </p>

      <div
        style={{
          flex: 1,
          margin: "40px -70px 0",
          background: tokens.dark,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Img
          src={staticFile("chris/cover-portrait-duotone.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%", filter: "contrast(1.05) saturate(0.94)" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, rgba(21,17,13,0.14) 0%, rgba(21,17,13,0) 24%, rgba(21,17,13,0) 55%, ${tokens.dark} 100%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${GRAIN_URL}")`,
            backgroundSize: "220px 220px",
            opacity: 0.15,
            mixBlendMode: "overlay",
          }}
        />
        <p
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 40,
            textAlign: "center",
            fontFamily: displayFont,
            fontSize: 25,
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "#F3EEE3",
            margin: 0,
          }}
        >
          {book.author}
        </p>
      </div>
    </div>
  </Page>
);

export const DTOC: React.FC = () => (
  <Page>
    <div style={{ padding: "72px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{toc.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 46, margin: "0 0 36px" }}>{toc.heading}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>
        {toc.parts.map((part) => (
          <div key={part.part}>
            <p
              style={{
                fontFamily: bodyFont,
                fontSize: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: tokens.ink,
                background: tokens.accent,
                display: "inline-block",
                padding: "3px 10px",
                fontWeight: 800,
                margin: "0 0 10px",
              }}
            >
              {part.part}
            </p>
            {part.entries.map((e) => (
              <div
                key={e.title}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 10,
                  fontFamily: bodyFont,
                  fontWeight: 600,
                  fontSize: 21,
                  padding: "5px 0",
                }}
              >
                <span>{e.title}</span>
                <span style={{ flex: 1, borderBottom: `1px dotted ${tokens.line}`, transform: "translateY(-6px)" }} />
                <span style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 16, opacity: 0.55 }}>{e.page}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </Page>
);

const ForewordDropCap: React.FC<{ text: string }> = ({ text }) => {
  const first = text.charAt(0);
  const rest = text.slice(1);
  return (
    <p style={{ margin: "0 0 20px", fontSize: 23, lineHeight: 1.8 }}>
      <span
        style={{
          fontFamily: displayFont,
          fontWeight: 700,
          fontSize: 84,
          lineHeight: 0.72,
          float: "left",
          padding: "4px 10px 0 0",
          color: tokens.accent,
        }}
      >
        {first}
      </span>
      {rest}
    </p>
  );
};

export const DForeword: React.FC = () => (
  <Page>
    <div style={{ padding: "78px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{foreword.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 44, margin: "0 0 30px", maxWidth: "16ch" }}>
        {foreword.heading}
      </h3>
      <div style={{ fontFamily: bodyFont, fontSize: 23, lineHeight: 1.8, maxWidth: "62ch" }}>
        <ForewordDropCap text={foreword.paragraphs[0]} />
        {foreword.paragraphs.slice(1).map((p, i) => (
          <p key={i} style={{ margin: "0 0 20px" }}>
            {p}
          </p>
        ))}
      </div>
      <Folio left={foreword.folio.left} right={foreword.folio.right} />
    </div>
  </Page>
);

const Divider: React.FC<{ data: { part: string; heading: string; subheading: string; folioRight: string } }> = ({
  data,
}) => (
  <Page chalk>
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "70px 70px 52px", color: "#F3EEE3" }}>
      <p
        style={{
          fontFamily: displayFont,
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: "0.34em",
          textTransform: "uppercase",
          color: tokens.accent,
          margin: 0,
        }}
      >
        {data.part}
      </p>
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <TornLabel bg="#191713" rotate={-1.6} padding="20px 52px 32px">
          <h1
            style={{
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 118,
              lineHeight: 1.04,
              margin: 0,
              maxWidth: "10ch",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "#F3EEE3",
            }}
          >
            {data.heading}
          </h1>
        </TornLabel>
      </div>
      <p
        style={{
          fontFamily: displayFont,
          fontWeight: 500,
          fontSize: 25,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(243,238,227,0.78)",
          maxWidth: "34ch",
          margin: "0 0 34px",
          lineHeight: 1.65,
        }}
      >
        {data.subheading}
      </p>
      <Folio left={data.part} right={data.folioRight} light />
    </div>
  </Page>
);

export const DChapterDivider: React.FC = () => <Divider data={chapterDivider} />;
export const DPart1Divider: React.FC = () => <Divider data={part1Divider} />;
export const DPart3Divider: React.FC = () => <Divider data={part3Divider} />;
export const DPart4Divider: React.FC = () => <Divider data={part4Divider} />;

export const DVonChris: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{vonChris.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 42, lineHeight: 1.12, margin: "0 0 28px", maxWidth: "18ch" }}>
        {vonChris.heading}
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 40, alignItems: "start" }}>
        <div style={{ fontFamily: bodyFont, fontSize: 23, lineHeight: 1.85 }}>
          {vonChris.paragraphs.map((p, i) => (
            <p key={i} style={{ margin: "0 0 18px" }}>
              {p}
            </p>
          ))}
          <p style={{ margin: "0 0 18px" }}>
            Diese Erkenntnis hat mein Leben verändert — und später mein Berufsleben. Ich habe angefangen, das, was
            ich gelernt hatte, mit anderen zu teilen. Erst mit ein paar Leuten, dann mit Tausenden, mittlerweile mit
            über 500.000 Menschen, die durch meine Videos einen anderen Blick auf Essen, Kontrolle und Heißhunger
            gefunden haben. Und ich bin noch nicht fertig.
          </p>
          <div style={{ borderLeft: `4px solid ${tokens.accent}`, paddingLeft: 22 }}>
            <p style={{ fontFamily: displayFont, fontWeight: 500, fontSize: 22, lineHeight: 1.4, margin: 0 }}>
              {vonChris.pullquote}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ background: tokens.dark, aspectRatio: "3/4", overflow: "hidden", position: "relative", borderRadius: 6, boxShadow: tokens.shadow }}>
            <Img
              src={staticFile("chris/portrait-2-duotone.jpg")}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 15%" }}
            />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(21,17,13,0) 65%, ${tokens.dark} 100%)` }} />
          </div>
          <p style={{ fontFamily: bodyFont, fontSize: 13, opacity: 0.5, textAlign: "center", margin: 0 }}>
            Standbild aus Chris' YouTube-Video, bearbeitet
          </p>
        </div>
      </div>
      <Folio left={vonChris.folio.left} right={vonChris.folio.right} />
    </div>
  </Page>
);

export const DVonChris2: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{vonChris2.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 38, lineHeight: 1.15, margin: "0 0 28px", maxWidth: "20ch" }}>
        {vonChris2.heading}
      </h3>
      <div style={{ fontFamily: bodyFont, fontSize: 23, lineHeight: 1.85, maxWidth: "68ch" }}>
        {vonChris2.paragraphs.map((p, i) => (
          <p key={i} style={{ margin: "0 0 18px" }}>
            {p}
          </p>
        ))}
        <div style={{ borderLeft: `4px solid ${tokens.accent}`, paddingLeft: 22 }}>
          <p style={{ fontFamily: displayFont, fontWeight: 500, fontSize: 24, lineHeight: 1.4, margin: 0 }}>
            {vonChris2.pullquote}
          </p>
        </div>
      </div>
      <Folio left={vonChris2.folio.left} right={vonChris2.folio.right} />
    </div>
  </Page>
);

const EffortRewardFigure: React.FC = () => {
  const rows = [
    { label: "Chips griffbereit", effort: 15, reward: 92 },
    { label: "Salat schnippeln", effort: 80, reward: 55 },
  ];
  return (
    <Card>
      <p style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 15, letterSpacing: "0.06em", textTransform: "uppercase", color: tokens.accent2, margin: "0 0 18px" }}>
        Aufwand ↔ Belohnung
      </p>
      {rows.map((r) => (
        <div key={r.label} style={{ marginBottom: 18 }}>
          <p style={{ fontFamily: bodyFont, fontSize: 15, fontWeight: 700, margin: "0 0 8px" }}>{r.label}</p>
          {([
            ["Aufwand", r.effort, tokens.line],
            ["Belohnung", r.reward, tokens.accent],
          ] as const).map(([k, v, color]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontFamily: bodyFont, fontSize: 13, width: 76, opacity: 0.6 }}>{k}</span>
              <div style={{ flex: 1, height: 10, borderRadius: 5, background: tokens.bg, border: `1px solid ${tokens.line}` }}>
                <div style={{ width: `${v}%`, height: "100%", borderRadius: 5, background: color }} />
              </div>
              <span style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 13, width: 32 }}>{v}%</span>
            </div>
          ))}
        </div>
      ))}
    </Card>
  );
};

export const DKapitel1: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel1.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 42, margin: "0 0 28px" }}>{kapitel1.heading}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1.65fr 1fr", gap: 40, alignItems: "start" }}>
        <div style={{ fontFamily: bodyFont, fontSize: 23, lineHeight: 1.85 }}>
          {kapitel1.paragraphs.map((p, i) => (
            <p key={i} style={{ margin: "0 0 18px" }}>
              {p}
            </p>
          ))}
          <div style={{ borderLeft: `4px solid ${tokens.accent}`, paddingLeft: 22, margin: "20px 0 0" }}>
            <p style={{ fontFamily: displayFont, fontWeight: 500, fontSize: 24, lineHeight: 1.35, margin: 0 }}>
              Der richtige Hebel liegt nicht in deinem Kopf — er liegt in deinem Umfeld.
            </p>
          </div>
        </div>
        <EffortRewardFigure />
      </div>
      <Folio left={kapitel1.folio.left} right={kapitel1.folio.right} />
    </div>
  </Page>
);

const StatCallout: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div style={{ background: tokens.dark, color: "#fff", borderRadius: tokens.radius, boxShadow: tokens.shadow, padding: "26px 24px", position: "relative", overflow: "hidden" }}>
    <Grain />
    <p style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 52, lineHeight: 1, margin: 0, color: tokens.accent }}>
      {value}
    </p>
    <p style={{ fontFamily: bodyFont, fontSize: 15, opacity: 0.8, margin: "10px 0 0", lineHeight: 1.5 }}>{label}</p>
  </div>
);

export const DKapitel2: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel2.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 42, margin: "0 0 28px" }}>{kapitel2.heading}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1.65fr 1fr", gap: 40, alignItems: "start" }}>
        <div style={{ fontFamily: bodyFont, fontSize: 23, lineHeight: 1.85 }}>
          {kapitel2.paragraphs.map((p, i) => (
            <p key={i} style={{ margin: "0 0 16px" }}>
              {p}
            </p>
          ))}
          <div style={{ borderLeft: `4px solid ${tokens.accent}`, paddingLeft: 22, margin: "18px 0 0" }}>
            <p style={{ fontFamily: displayFont, fontWeight: 500, fontSize: 22, lineHeight: 1.4, margin: 0 }}>
              {kapitel2.pullquote}
            </p>
          </div>
        </div>
        <StatCallout value="Top 10%" label="Chris' eigenes genetisches Übergewichts-Risiko laut DNA-Test — mehr als 90 % der Bevölkerung." />
      </div>
      <Folio left={kapitel2.folio.left} right={kapitel2.folio.right} />
    </div>
  </Page>
);

const ResearchCallout: React.FC<{ label: string; text: string }> = ({ label, text }) => (
  <Card style={{ borderLeft: `6px solid ${tokens.accent}` }}>
    <p style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 12px", color: tokens.accent2 }}>
      {label}
    </p>
    <p style={{ fontFamily: bodyFont, fontSize: 18, lineHeight: 1.6, margin: 0 }}>{text}</p>
  </Card>
);

export const DKapitel3: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel3.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 42, margin: "0 0 28px" }}>{kapitel3.heading}</h3>
      <div style={{ fontFamily: bodyFont, fontSize: 23, lineHeight: 1.85, maxWidth: "66ch" }}>
        {kapitel3.paragraphs.map((p, i) => (
          <p key={i} style={{ margin: "0 0 16px" }}>
            {p}
          </p>
        ))}
      </div>
      <div style={{ marginTop: 10, maxWidth: "66ch" }}>
        <ResearchCallout label={kapitel3.calloutLabel} text={kapitel3.callout} />
      </div>
      <Folio left={kapitel3.folio.left} right={kapitel3.folio.right} />
    </div>
  </Page>
);

const NutritionTable: React.FC<{ nutrition: { kcal: number; protein: number; carbs: number; fat: number } }> = ({
  nutrition,
}) => (
  <div style={{ border: `1px solid ${tokens.line}`, borderRadius: tokens.radius, boxShadow: tokens.shadow, width: "100%", overflow: "hidden" }}>
    <div
      style={{
        background: tokens.dark,
        color: tokens.accent,
        fontFamily: bodyFont,
        fontWeight: 800,
        fontSize: 14,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "10px 14px",
      }}
    >
      Nährwerte pro Portion
    </div>
    {([
      ["Kalorien", nutrition.kcal, ""],
      ["Fett", nutrition.fat, "g"],
      ["Kohlenhydrate", nutrition.carbs, "g"],
      ["Protein", nutrition.protein, "g"],
    ] as const).map(([label, value, unit], i) => (
      <div
        key={label}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "9px 14px",
          background: tokens.bgSoft,
          borderTop: i === 0 ? "none" : `1px solid ${tokens.line}`,
          fontFamily: bodyFont,
          fontSize: 16,
        }}
      >
        <span style={{ opacity: 0.7 }}>{label}</span>
        <span style={{ fontWeight: 800 }}>
          {value}
          {unit}
        </span>
      </div>
    ))}
  </div>
);

const ProteinFlowDiagram: React.FC = () => {
  const steps = ["Protein", "Aminosäuren", "Gluconeogenese", "Glucose", "De-novo-Lipogenese", "Fett"];
  return (
    <Card>
      <p style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 15, letterSpacing: "0.06em", textTransform: "uppercase", color: tokens.accent2, margin: "0 0 18px" }}>
        Der Weg von Protein zu Fett
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div
              style={{
                background: i === steps.length - 1 ? tokens.dark : tokens.bg,
                color: i === steps.length - 1 ? tokens.accent : tokens.ink,
                border: `1px solid ${tokens.line}`,
                borderRadius: 6,
                padding: "10px 14px",
                fontFamily: bodyFont,
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {s}
            </div>
            {i < steps.length - 1 && (
              <div style={{ textAlign: "center", color: tokens.accent, fontSize: 18, lineHeight: 1, padding: "2px 0" }}>↓</div>
            )}
          </React.Fragment>
        ))}
      </div>
      <p style={{ fontFamily: bodyFont, fontSize: 13, opacity: 0.6, margin: "16px 0 0", lineHeight: 1.5 }}>
        Zwei energetisch teure Umwandlungsschritte — deshalb wird ein Proteinüberschuss in der Praxis kaum zu Fett.
      </p>
    </Card>
  );
};

export const DKapitel5: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel5.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 42, margin: "0 0 28px" }}>{kapitel5.heading}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1.65fr 1fr", gap: 40, alignItems: "start" }}>
        <div style={{ fontFamily: bodyFont, fontSize: 23, lineHeight: 1.85 }}>
          {kapitel5.paragraphs.map((p, i) => (
            <p key={i} style={{ margin: "0 0 16px" }}>
              {p}
            </p>
          ))}
          <div style={{ borderLeft: `4px solid ${tokens.accent}`, paddingLeft: 22, margin: "18px 0 0" }}>
            <p style={{ fontFamily: displayFont, fontWeight: 500, fontSize: 22, lineHeight: 1.4, margin: 0 }}>
              {kapitel5.pullquote}
            </p>
          </div>
        </div>
        <ProteinFlowDiagram />
      </div>
      <Folio left={kapitel5.folio.left} right={kapitel5.folio.right} />
    </div>
  </Page>
);

const ChecklistCard: React.FC<{ label: string; items: string[] }> = ({ label, items }) => (
  <Card>
    <p style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 15, letterSpacing: "0.06em", textTransform: "uppercase", color: tokens.accent2, margin: "0 0 16px" }}>
      {label}
    </p>
    {items.map((item) => (
      <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: 5,
            background: tokens.accent,
            flexShrink: 0,
            marginTop: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 900,
            color: tokens.dark,
          }}
        >
          ✓
        </span>
        <p style={{ fontFamily: bodyFont, fontSize: 15, lineHeight: 1.5, margin: 0 }}>{item}</p>
      </div>
    ))}
  </Card>
);

export const DKapitel6: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel6.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 42, margin: "0 0 28px" }}>{kapitel6.heading}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1.65fr 1fr", gap: 40, alignItems: "start" }}>
        <div style={{ fontFamily: bodyFont, fontSize: 23, lineHeight: 1.85 }}>
          {kapitel6.paragraphs.map((p, i) => (
            <p key={i} style={{ margin: "0 0 16px" }}>
              {p}
            </p>
          ))}
        </div>
        <ChecklistCard label={kapitel6.calloutLabel} items={kapitel6.checklist} />
      </div>
      <Folio left={kapitel6.folio.left} right={kapitel6.folio.right} />
    </div>
  </Page>
);

/* Section header in stamped condensed caps, like ZUTATEN / ZUBEREITUNG in the reference */
const RecipeSectionHead: React.FC<{ title: string; sub?: string; dark?: boolean }> = ({ title, sub, dark }) => (
  <div style={{ marginBottom: 18 }}>
    <p
      style={{
        fontFamily: displayFont,
        fontWeight: 600,
        fontSize: 33,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: dark ? "#F3EEE3" : tokens.ink,
        margin: 0,
        lineHeight: 1,
      }}
    >
      {title}
    </p>
    {sub ? (
      <p
        style={{
          fontFamily: displayFont,
          fontWeight: 500,
          fontSize: 18,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: dark ? "rgba(243,238,227,0.65)" : "rgba(34,29,23,0.6)",
          margin: "8px 0 0",
        }}
      >
        {sub}
      </p>
    ) : null}
  </div>
);

const StepList: React.FC<{ steps: string[]; dark?: boolean; fontSize?: number }> = ({ steps, dark, fontSize = 24 }) => (
  <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
    {steps.map((step, i) => (
      <li
        key={step}
        style={{
          fontFamily: bodyFont,
          fontWeight: dark ? 600 : 500,
          fontSize,
          lineHeight: 1.55,
          marginBottom: 22,
          paddingLeft: 46,
          position: "relative",
          color: dark ? "rgba(243,238,227,0.92)" : tokens.ink,
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 4,
            width: 29,
            height: 29,
            background: tokens.accent,
            color: tokens.dark,
            fontFamily: displayFont,
            fontWeight: 700,
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.28)",
            transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
          }}
        >
          {i + 1}
        </span>
        {step}
      </li>
    ))}
  </ol>
);

/* Ingredient list, amounts bold and right-aligned like the reference */
const IngredientList: React.FC<{ items: string[]; dark?: boolean }> = ({ items, dark }) => (
  <ul style={{ margin: 0, padding: 0, listStyle: "none", textAlign: "right" }}>
    {items.map((ing) => (
      <li
        key={ing}
        style={{
          fontFamily: displayFont,
          fontWeight: 500,
          fontSize: 25,
          lineHeight: 1.5,
          marginBottom: 14,
          color: dark ? "#F3EEE3" : tokens.ink,
        }}
      >
        {ing}
      </li>
    ))}
  </ul>
);

export const DRecipe: React.FC = () => (
  <Page chalk>
    <div style={{ padding: "64px 72px 46px", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header: torn title label, then subtitle strip + stamps row */}
      <div style={{ display: "flex", flexDirection: "column", marginBottom: 24 }}>
        <TornLabel bg="#191713" rotate={-1.6} padding="24px 48px 28px">
          <h3
            style={{
              fontFamily: displayFont,
              fontWeight: 600,
              fontSize: 64,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#F3EEE3",
              margin: 0,
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            {recipe.heading}
          </h3>
        </TornLabel>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: 6 }}>
          <TornLabel
            bg="#191713"
            rotate={-1.6}
            clip={TORN_CLIP_2}
            padding="12px 28px 14px"
            style={{ marginLeft: 36, marginTop: 8 }}
            shadow="drop-shadow(0 6px 10px rgba(0,0,0,0.3))"
          >
            <p
              style={{
                fontFamily: displayFont,
                fontWeight: 500,
                fontSize: 20,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: tokens.accent,
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              {recipe.tags.join("  ·  ")}
            </p>
          </TornLabel>
          <div style={{ display: "flex", gap: 20, marginTop: 4 }}>
            <StampBadge dark top="Portionen" big={leadingNum(recipe.servings)} bottom="Portion" />
            <StampBadge dark top="Zubereitung" big={leadingNum(recipe.prepTime)} bottom="Min" />
            <StampBadge dark top="Quellzeit" big={leadingNum(recipe.cookTime)} bottom="Min" />
          </div>
        </div>
      </div>

      <p
        style={{
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 22,
          lineHeight: 1.65,
          color: "rgba(243,238,227,0.78)",
          maxWidth: "54ch",
          margin: "6px 0 54px",
        }}
      >
        {recipe.subheading}
      </p>

      {/* Body: Zutaten (right-aligned) | Zubereitung */}
      <div style={{ display: "grid", gridTemplateColumns: "0.86fr 1.14fr", gap: 64, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ textAlign: "right", alignSelf: "flex-end" }}>
            <RecipeSectionHead dark title="Zutaten" sub={`Für ${recipe.servings}`} />
          </div>
          <IngredientList dark items={recipe.ingredients} />

          {/* Nährwerte as stamped label block */}
          <TornLabel
            bg="#191713"
            rotate={1.4}
            clip={TORN_CLIP_2}
            padding="18px 26px 20px"
            style={{ marginTop: 34, alignSelf: "flex-end" }}
            shadow="drop-shadow(0 8px 12px rgba(0,0,0,0.32))"
          >
            <p
              style={{
                fontFamily: displayFont,
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: tokens.accent,
                margin: "0 0 10px",
              }}
            >
              Nährwerte pro Portion
            </p>
            {([
              ["Kalorien", `${recipe.nutrition.kcal}`],
              ["Protein", `${recipe.nutrition.protein} g`],
              ["Kohlenhydrate", `${recipe.nutrition.carbs} g`],
              ["Fett", `${recipe.nutrition.fat} g`],
            ] as const).map(([label, val]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 44,
                  fontFamily: displayFont,
                  fontSize: 17,
                  padding: "3px 0",
                  color: "#F3EEE3",
                }}
              >
                <span style={{ fontWeight: 400, opacity: 0.8 }}>{label}</span>
                <span style={{ fontWeight: 600 }}>{val}</span>
              </div>
            ))}
          </TornLabel>
        </div>

        <div>
          <RecipeSectionHead dark title="Zubereitung" />
          <StepList dark steps={recipe.steps} />

          {/* Product cutout as prop, bottom right */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 20, marginTop: 48 }}>
            <Img
              src={staticFile(recipe.productImage)}
              style={{
                width: 350,
                height: 350,
                objectFit: "contain",
                filter: "drop-shadow(0 20px 22px rgba(0,0,0,0.5))",
                transform: "rotate(-2deg)",
              }}
            />
            <p
              style={{
                fontFamily: displayFont,
                fontWeight: 500,
                fontSize: 15,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(243,238,227,0.55)",
                margin: "0 0 22px",
                maxWidth: "18ch",
                lineHeight: 1.5,
              }}
            >
              {recipe.productLabel}
            </p>
          </div>
        </div>
      </div>

      {/* Alternatives strip */}
      <div style={{ marginTop: 48, flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18 }}>
          <p
            style={{
              fontFamily: displayFont,
              fontWeight: 600,
              fontSize: 19,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: tokens.accent,
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            {recipe.alternativesLabel}
          </p>
          <div style={{ flex: 1, borderTop: "1px solid rgba(243,238,227,0.25)" }} />
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {recipe.alternatives.map((alt, i) => (
            <div key={alt.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <Img
                src={staticFile(alt.image)}
                style={{
                  width: 132,
                  height: 132,
                  objectFit: "contain",
                  filter: "drop-shadow(0 12px 14px rgba(0,0,0,0.45))",
                  transform: `rotate(${i % 2 === 0 ? -2.5 : 2.5}deg)`,
                }}
              />
              <p
                style={{
                  fontFamily: displayFont,
                  fontWeight: 500,
                  fontSize: 14,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textAlign: "center",
                  margin: 0,
                  color: "rgba(243,238,227,0.7)",
                }}
              >
                {alt.label}
              </p>
            </div>
          ))}
        </div>
        <Folio left="Kapitel 10 · Sattmacher" right="22" light />
      </div>
    </div>
  </Page>
);

/* ===================== Additional chapters for the full 35-page book ===================== */

const SimpleChecklist: React.FC<{ label: string; items: string[] }> = ({ label, items }) => (
  <Card>
    <p style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 15, letterSpacing: "0.06em", textTransform: "uppercase", color: tokens.accent2, margin: "0 0 16px" }}>
      {label}
    </p>
    {items.map((item) => (
      <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ width: 18, height: 18, borderRadius: 5, background: tokens.accent, flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: tokens.dark }}>
          ✓
        </span>
        <p style={{ fontFamily: bodyFont, fontSize: 15, lineHeight: 1.5, margin: 0 }}>{item}</p>
      </div>
    ))}
  </Card>
);

export const DKapitel3b: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel3b.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 40, margin: "0 0 26px" }}>{kapitel3b.heading}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 40, alignItems: "start" }}>
        <div style={{ fontFamily: bodyFont, fontSize: 22, lineHeight: 1.8 }}>
          {kapitel3b.paragraphs.map((p, i) => (
            <p key={i} style={{ margin: "0 0 18px" }}>
              {p}
            </p>
          ))}
        </div>
        <SimpleChecklist label={kapitel3b.calloutLabel} items={kapitel3b.checklist} />
      </div>
      <Folio left={kapitel3b.folio.left} right={kapitel3b.folio.right} />
    </div>
  </Page>
);

export const DKapitel4: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel4.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 42, margin: "0 0 28px" }}>{kapitel4.heading}</h3>
      <div style={{ fontFamily: bodyFont, fontSize: 23, lineHeight: 1.85, maxWidth: "68ch" }}>
        {kapitel4.paragraphs.map((p, i) => (
          <p key={i} style={{ margin: "0 0 18px" }}>
            {p}
          </p>
        ))}
        <div style={{ borderLeft: `4px solid ${tokens.accent}`, paddingLeft: 22 }}>
          <p style={{ fontFamily: displayFont, fontWeight: 500, fontSize: 24, lineHeight: 1.4, margin: 0 }}>
            {kapitel4.pullquote}
          </p>
        </div>
      </div>
      <Folio left={kapitel4.folio.left} right={kapitel4.folio.right} />
    </div>
  </Page>
);

const MakeTag: React.FC<{ make: string }> = ({ make }) => (
  <span
    style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 5,
      fontFamily: bodyFont,
      fontWeight: 800,
      fontSize: 12,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      background: make === "schwer" ? tokens.accent2 : tokens.accent,
      color: make === "schwer" ? "#fff" : tokens.dark,
    }}
  >
    {make}
  </span>
);

export const DKapitel6b: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel6b.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 38, margin: "0 0 18px" }}>{kapitel6b.heading}</h3>
      <p style={{ fontFamily: bodyFont, fontSize: 19, opacity: 0.7, lineHeight: 1.6, maxWidth: "66ch", margin: "0 0 30px" }}>
        {kapitel6b.intro}
      </p>
      <div style={{ border: `1px solid ${tokens.line}`, borderRadius: tokens.radius, boxShadow: tokens.shadow, overflow: "hidden" }}>
        {kapitel6b.rows.map((r, i) => (
          <div
            key={r.food}
            style={{
              display: "grid",
              gridTemplateColumns: "1.3fr 0.7fr 2fr",
              gap: 16,
              alignItems: "center",
              padding: "16px 18px",
              borderTop: i === 0 ? "none" : `1px solid ${tokens.line}`,
            }}
          >
            <span style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 17 }}>{r.food}</span>
            <MakeTag make={r.make} />
            <span style={{ fontFamily: bodyFont, fontSize: 15, opacity: 0.7, lineHeight: 1.4 }}>{r.note}</span>
          </div>
        ))}
      </div>
      <Folio left={kapitel6b.folio.left} right={kapitel6b.folio.right} />
    </div>
  </Page>
);

export const DKapitel7: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel7.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 42, margin: "0 0 28px" }}>{kapitel7.heading}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 40, alignItems: "start" }}>
        <div style={{ fontFamily: bodyFont, fontSize: 21, lineHeight: 1.75 }}>
          {kapitel7.paragraphs.map((p, i) => (
            <p key={i} style={{ margin: "0 0 16px" }}>
              {p}
            </p>
          ))}
        </div>
        <SimpleChecklist label={kapitel7.calloutLabel} items={kapitel7.checklist} />
      </div>
      <Folio left={kapitel7.folio.left} right={kapitel7.folio.right} />
    </div>
  </Page>
);

export const DKapitel8: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel8.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 42, margin: "0 0 28px" }}>{kapitel8.heading}</h3>
      <div style={{ fontFamily: bodyFont, fontSize: 23, lineHeight: 1.85, maxWidth: "68ch" }}>
        {kapitel8.paragraphs.map((p, i) => (
          <p key={i} style={{ margin: "0 0 18px" }}>
            {p}
          </p>
        ))}
        <div style={{ borderLeft: `4px solid ${tokens.accent}`, paddingLeft: 22 }}>
          <p style={{ fontFamily: displayFont, fontWeight: 500, fontSize: 24, lineHeight: 1.4, margin: 0 }}>
            {kapitel8.pullquote}
          </p>
        </div>
      </div>
      <Folio left={kapitel8.folio.left} right={kapitel8.folio.right} />
    </div>
  </Page>
);

export const DKapitel9a: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel9a.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 42, margin: "0 0 24px" }}>{kapitel9a.heading}</h3>
      <div style={{ fontFamily: bodyFont, fontSize: 22, lineHeight: 1.8, maxWidth: "66ch", marginBottom: 26 }}>
        {kapitel9a.paragraphs.map((p, i) => (
          <p key={i} style={{ margin: 0 }}>
            {p}
          </p>
        ))}
      </div>
      <div style={{ maxWidth: "50ch" }}>
        <SimpleChecklist label={kapitel9a.calloutLabel} items={kapitel9a.checklist} />
      </div>
      <Folio left={kapitel9a.folio.left} right={kapitel9a.folio.right} />
    </div>
  </Page>
);

const CategoryColumns: React.FC<{ categories: { label: string; items: string[] }[] }> = ({ categories }) => (
  <div style={{ display: "flex", gap: 24 }}>
    {categories.map((cat) => (
      <Card key={cat.label} style={{ flex: 1, padding: "20px 18px" }}>
        <p style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 14, letterSpacing: "0.04em", textTransform: "uppercase", margin: "0 0 14px", color: tokens.accent2 }}>
          {cat.label}
        </p>
        {cat.items.map((item) => (
          <p key={item} style={{ fontFamily: bodyFont, fontSize: 15, lineHeight: 1.6, margin: "0 0 8px" }}>
            {item}
          </p>
        ))}
      </Card>
    ))}
  </div>
);

export const DKapitel9b: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel9b.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 42, margin: "0 0 20px" }}>{kapitel9b.heading}</h3>
      <div style={{ fontFamily: bodyFont, fontSize: 20, lineHeight: 1.7, maxWidth: "66ch", marginBottom: 28, opacity: 0.85 }}>
        {kapitel9b.paragraphs.map((p, i) => (
          <p key={i} style={{ margin: 0 }}>
            {p}
          </p>
        ))}
      </div>
      <CategoryColumns categories={kapitel9b.categories} />
      <Folio left={kapitel9b.folio.left} right={kapitel9b.folio.right} />
    </div>
  </Page>
);

const SimpleRecipe: React.FC<{ data: typeof recipe2 }> = ({ data }) => (
  <Page>
    <div style={{ padding: "64px 72px 46px", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header: cream torn label left, stamps right */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 26 }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 660 }}>
          <TornLabel bg="#FBF5E6" rotate={-1.4} padding="22px 40px 26px" shadow="drop-shadow(0 8px 14px rgba(21,17,13,0.28))">
            <h3
              style={{
                fontFamily: displayFont,
                fontWeight: 600,
                fontSize: data.heading.length > 30 ? 34 : data.heading.length > 24 ? 46 : 54,
                letterSpacing: "0.045em",
                textTransform: "uppercase",
                color: "#8A6E3C",
                margin: 0,
                lineHeight: 1,
                whiteSpace: "nowrap",
                textShadow: "0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              {data.heading}
            </h3>
          </TornLabel>
          <p
            style={{
              fontFamily: displayFont,
              fontWeight: 600,
              fontSize: 17,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: tokens.ink,
              margin: "16px 0 0 44px",
            }}
          >
            {data.tags.join("  ·  ")}
          </p>
        </div>
        <div style={{ display: "flex", gap: 20, paddingTop: 4 }}>
          <StampBadge top="Portionen" big={leadingNum(data.servings)} bottom="Portion" />
          <StampBadge top="Zubereitung" big={leadingNum(data.prepTime)} bottom="Min" />
        </div>
      </div>

      <div style={{ height: 56 }} />

      <div style={{ display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: 60, alignItems: "start", flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ textAlign: "right" }}>
            <RecipeSectionHead title="Zutaten" sub={`Für ${data.servings}`} />
          </div>
          <IngredientList items={data.ingredients} />

          <div style={{ textAlign: "right", marginTop: 40 }}>
            <p
              style={{
                fontFamily: displayFont,
                fontWeight: 600,
                fontSize: 17,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#8A6E3C",
                margin: "0 0 10px",
              }}
            >
              Nährwerte
            </p>
            {([
              ["Kalorien", `${data.nutrition.kcal}`],
              ["Protein", `${data.nutrition.protein} g`],
              ["Kohlenhydrate", `${data.nutrition.carbs} g`],
              ["Fett", `${data.nutrition.fat} g`],
            ] as const).map(([label, val]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 26,
                  fontFamily: displayFont,
                  fontSize: 18,
                  padding: "3px 0",
                  color: tokens.ink,
                }}
              >
                <span style={{ fontWeight: 400, opacity: 0.7 }}>{label}</span>
                <span style={{ fontWeight: 600, minWidth: 52, textAlign: "right" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <RecipeSectionHead title="Zubereitung" />
          <StepList steps={data.steps} />

          <div style={{ display: "flex", alignItems: "flex-end", gap: 18, marginTop: 48 }}>
            <Img
              src={staticFile(data.productImage)}
              style={{
                width: 320,
                height: 320,
                objectFit: "contain",
                filter: "drop-shadow(0 18px 20px rgba(21,17,13,0.35))",
                transform: "rotate(2deg)",
              }}
            />
            <p
              style={{
                fontFamily: displayFont,
                fontWeight: 500,
                fontSize: 15,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(34,29,23,0.55)",
                margin: "0 0 26px",
                maxWidth: "20ch",
                lineHeight: 1.5,
              }}
            >
              {data.productLabel}
            </p>
          </div>
        </div>
      </div>

      {/* Tipp block, like the amber TIPP in the reference */}
      <div style={{ maxWidth: "52ch", margin: "30px 0 0" }}>
        <p
          style={{
            fontFamily: displayFont,
            fontWeight: 600,
            fontSize: 19,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#8A6E3C",
            margin: "0 0 8px",
          }}
        >
          Tipp
        </p>
        <p style={{ fontFamily: bodyFont, fontWeight: 600, fontSize: 19, lineHeight: 1.6, color: "rgba(34,29,23,0.78)", margin: 0 }}>
          {data.subheading}
        </p>
      </div>

      <Folio left={data.kicker.split("·")[0].trim()} right={data.folio.right} />
    </div>
  </Page>
);

export const DRecipe2: React.FC = () => <SimpleRecipe data={recipe2} />;
export const DRecipe3: React.FC = () => <SimpleRecipe data={recipe3} />;

export const DKapitel11a: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel11a.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 42, margin: "0 0 20px" }}>{kapitel11a.heading}</h3>
      <div style={{ fontFamily: bodyFont, fontSize: 20, lineHeight: 1.7, maxWidth: "66ch", marginBottom: 28, opacity: 0.85 }}>
        {kapitel11a.paragraphs.map((p, i) => (
          <p key={i} style={{ margin: 0 }}>
            {p}
          </p>
        ))}
      </div>
      <div style={{ border: `1px solid ${tokens.line}`, borderRadius: tokens.radius, boxShadow: tokens.shadow, overflow: "hidden" }}>
        {kapitel11a.rows.map((r, i) => (
          <div key={r.day} style={{ display: "grid", gridTemplateColumns: "0.5fr 2fr", gap: 16, padding: "16px 18px", borderTop: i === 0 ? "none" : `1px solid ${tokens.line}` }}>
            <span style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 20 }}>{r.day}</span>
            <span style={{ fontFamily: bodyFont, fontSize: 16, lineHeight: 1.5 }}>{r.plan}</span>
          </div>
        ))}
      </div>
      <Folio left={kapitel11a.folio.left} right={kapitel11a.folio.right} />
    </div>
  </Page>
);

export const DKapitel11b: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel11b.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 42, margin: "0 0 30px" }}>{kapitel11b.heading}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
        {[kapitel11b.morning, kapitel11b.evening].map((block) => (
          <SimpleChecklist key={block.label} label={block.label} items={block.items} />
        ))}
      </div>
      <Folio left={kapitel11b.folio.left} right={kapitel11b.folio.right} />
    </div>
  </Page>
);

export const DFAQ: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{faq.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 42, margin: "0 0 30px" }}>{faq.heading}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {faq.items.map((item) => (
          <div key={item.q}>
            <p style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 19, margin: "0 0 6px" }}>{item.q}</p>
            <p style={{ fontFamily: bodyFont, fontSize: 17, opacity: 0.75, lineHeight: 1.55, margin: 0 }}>{item.a}</p>
          </div>
        ))}
      </div>
      <Folio left={faq.folio.left} right={faq.folio.right} />
    </div>
  </Page>
);

export const DAnhangIntro: React.FC = () => (
  <Page chalk>
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "70px 70px 52px", color: "#F3EEE3" }}>
      <p style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 22, letterSpacing: "0.34em", textTransform: "uppercase", color: tokens.accent, margin: 0 }}>
        {anhangIntro.kicker}
      </p>
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <TornLabel bg="#191713" rotate={-1.4} padding="18px 48px 28px">
          <h1
            style={{
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: 100,
              lineHeight: 1.06,
              margin: 0,
              maxWidth: "11ch",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "#F3EEE3",
            }}
          >
            {anhangIntro.heading}
          </h1>
        </TornLabel>
      </div>
      {anhangIntro.paragraphs.map((p, i) => (
        <p key={i} style={{ fontFamily: bodyFont, fontSize: 20, opacity: 0.8, maxWidth: "46ch", margin: "0 0 30px", lineHeight: 1.6 }}>
          {p}
        </p>
      ))}
      <Folio left={anhangIntro.folio.left} right={anhangIntro.folio.right} light />
    </div>
  </Page>
);

export const DTriggerFoodCheck: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{triggerFoodCheck.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 38, margin: "0 0 14px" }}>{triggerFoodCheck.heading}</h3>
      <p style={{ fontFamily: bodyFont, fontSize: 19, opacity: 0.7, margin: "0 0 26px" }}>{triggerFoodCheck.intro}</p>
      <div style={{ border: `1px solid ${tokens.line}`, borderRadius: tokens.radius, boxShadow: tokens.shadow, overflow: "hidden", marginBottom: 26 }}>
        {triggerFoodCheck.questions.map((q, i) => (
          <div key={q} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "18px 20px", borderTop: i === 0 ? "none" : `1px solid ${tokens.line}` }}>
            <span style={{ fontFamily: bodyFont, fontSize: 18, lineHeight: 1.5 }}>{q}</span>
            <span style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <span style={{ border: `1.5px solid ${tokens.ink}`, opacity: 0.4, borderRadius: 4, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>J</span>
              <span style={{ border: `1.5px solid ${tokens.ink}`, opacity: 0.4, borderRadius: 4, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>N</span>
            </span>
          </div>
        ))}
      </div>
      <div style={{ background: tokens.dark, color: "#fff", borderRadius: tokens.radius, boxShadow: tokens.shadow, padding: "18px 20px", borderLeft: `6px solid ${tokens.accent}` }}>
        <p style={{ fontFamily: bodyFont, fontSize: 16, lineHeight: 1.55, margin: 0 }}>{triggerFoodCheck.result}</p>
      </div>
      <Folio left={triggerFoodCheck.folio.left} right={triggerFoodCheck.folio.right} />
    </div>
  </Page>
);

export const DNotfallkarte: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Kicker>{notfallkarte.kicker}</Kicker>
      <div
        style={{
          border: `2px dashed rgba(232,163,61,0.45)`,
          borderRadius: 16,
          boxShadow: tokens.shadow,
          padding: "40px 44px",
          maxWidth: 640,
          width: "100%",
          marginTop: 20,
          background: tokens.dark,
          color: "#fff",
        }}
      >
        <h3 style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 34, margin: "0 0 26px", color: tokens.accent, textAlign: "center" }}>
          {notfallkarte.heading}
        </h3>
        <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {notfallkarte.steps.map((step, i) => (
            <li key={step} style={{ display: "flex", gap: 14, marginBottom: 16, fontFamily: bodyFont, fontSize: 17, lineHeight: 1.5 }}>
              <span style={{ fontFamily: displayFont, fontWeight: 700, color: tokens.accent, width: 24, flexShrink: 0 }}>{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        <p style={{ fontFamily: bodyFont, fontSize: 13, opacity: 0.5, textAlign: "center", margin: "30px 0 0" }}>{notfallkarte.footer}</p>
      </div>
      <div style={{ marginTop: "auto", width: "100%" }}>
        <Folio left={notfallkarte.folio.left} right={notfallkarte.folio.right} />
      </div>
    </div>
  </Page>
);

export const DEinkaufslisteDruck: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{einkaufslisteDruck.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 42, margin: "0 0 30px" }}>{einkaufslisteDruck.heading}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {einkaufslisteDruck.categories.map((cat) => (
          <div key={cat.label}>
            <p style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 15, letterSpacing: "0.04em", textTransform: "uppercase", margin: "0 0 10px", opacity: 0.7 }}>
              {cat.label}
            </p>
            {cat.items.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: `1px solid ${tokens.line}` }}>
                <span style={{ width: 16, height: 16, border: `1.5px solid ${tokens.ink}`, opacity: 0.4, flexShrink: 0 }} />
                <span style={{ fontFamily: bodyFont, fontSize: 17 }}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Folio left={einkaufslisteDruck.folio.left} right={einkaufslisteDruck.folio.right} />
    </div>
  </Page>
);

export const DPantry: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{pantry.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 40, margin: "0 0 30px" }}>{pantry.heading}</h3>
      <div style={{ border: `1px solid ${tokens.line}`, borderRadius: tokens.radius, boxShadow: tokens.shadow, overflow: "hidden" }}>
        {pantry.items.map((item, i) => (
          <div key={item.name} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, padding: "16px 18px", borderTop: i === 0 ? "none" : `1px solid ${tokens.line}` }}>
            <span style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 17 }}>{item.name}</span>
            <span style={{ fontFamily: bodyFont, fontSize: 15, opacity: 0.7 }}>{item.note}</span>
          </div>
        ))}
      </div>
      <Folio left={pantry.folio.left} right={pantry.folio.right} />
    </div>
  </Page>
);

export const DUeberChris: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{ueberChris.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 44, margin: "0 0 30px" }}>{ueberChris.heading}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 40 }}>
        <div style={{ background: tokens.dark, aspectRatio: "3/4", overflow: "hidden", position: "relative", borderRadius: 6, boxShadow: tokens.shadow }}>
          <Img src={staticFile("chris/cover-portrait-duotone.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(21,17,13,0) 65%, ${tokens.dark} 100%)` }} />
        </div>
        <div style={{ fontFamily: bodyFont, fontSize: 20, lineHeight: 1.75 }}>
          {ueberChris.paragraphs.map((p, i) => (
            <p key={i} style={{ margin: "0 0 16px" }}>
              {p}
            </p>
          ))}
        </div>
      </div>
      <Folio left={ueberChris.folio.left} right={ueberChris.folio.right} />
    </div>
  </Page>
);

export const DSchlusswort: React.FC = () => (
  <Page>
    <div style={{ padding: "78px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{schlusswort.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.035em", fontSize: 46, margin: "0 0 30px" }}>{schlusswort.heading}</h3>
      <div style={{ fontFamily: bodyFont, fontSize: 24, lineHeight: 1.85, maxWidth: "62ch" }}>
        {schlusswort.paragraphs.map((p, i) => (
          <p key={i} style={{ margin: "0 0 20px" }}>
            {p}
          </p>
        ))}
      </div>
      <Folio left={schlusswort.folio.left} right={schlusswort.folio.right} />
    </div>
  </Page>
);

export const DBackmatter: React.FC = () => (
  <Page chalk>
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "70px 70px 52px", color: "#F3EEE3", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <p style={{ fontFamily: displayFont, fontWeight: 600, fontSize: 20, letterSpacing: "0.3em", textTransform: "uppercase", color: tokens.accent, margin: "0 0 24px" }}>
        {backmatter.kicker}
      </p>
      <TornLabel bg="#191713" rotate={-1.4} padding="14px 40px 22px" style={{ alignSelf: "center", marginBottom: 30 }}>
        <h1
          style={{
            fontFamily: displayFont,
            fontWeight: 700,
            fontSize: 66,
            margin: 0,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {backmatter.heading}
        </h1>
      </TornLabel>
      {backmatter.paragraphs.map((p, i) => (
        <p key={i} style={{ fontFamily: bodyFont, fontSize: 19, opacity: 0.8, maxWidth: "44ch", margin: "0 0 8px", lineHeight: 1.6 }}>
          {p}
        </p>
      ))}
    </div>
  </Page>
);
