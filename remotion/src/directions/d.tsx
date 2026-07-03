import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/Archivo";
import { loadFont as loadBody } from "@remotion/google-fonts/Manrope";
import { PAGE_WIDTH, PAGE_HEIGHT } from "../pageSize";
import { book, vonChris, kapitel1, toc, recipe, foreword, chapterDivider } from "../content";
import { PhotoIcon } from "../components/PlaceholderIcon";

const { fontFamily: displayFont } = loadDisplay("normal", { weights: ["700", "800", "900"] });
const { fontFamily: bodyFont } = loadBody("normal", { weights: ["400", "600", "700", "800"] });

const tokens = {
  bg: "#FFFFFF",
  bgSoft: "#F5F5F5",
  ink: "#1C1D1F",
  dark: "#141618",
  accent: "#FFB800",
  accentInk: "#1C1D1F",
  line: "#E7E7E9",
};

const coverSubtitleD = "Warum du nicht schwach bist — und was wirklich hilft";

const Page: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg }) => (
  <AbsoluteFill
    style={{
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      background: bg ?? tokens.bg,
      color: tokens.ink,
      fontFamily: bodyFont,
    }}
  >
    {children}
  </AbsoluteFill>
);

const Kicker: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <p
    style={{
      fontFamily: bodyFont,
      fontSize: 17,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: light ? tokens.accent : tokens.ink,
      opacity: light ? 1 : 0.55,
      fontWeight: 800,
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
      fontFamily: bodyFont,
      fontWeight: 700,
      fontSize: 16,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: light ? "#fff" : tokens.ink,
      opacity: light ? 0.6 : 0.4,
      borderTop: `1px solid ${light ? "rgba(255,255,255,0.2)" : tokens.line}`,
      paddingTop: 18,
      marginTop: "auto",
    }}
  >
    <span>{left}</span>
    <span>{right}</span>
  </div>
);

export const DCover: React.FC = () => (
  <Page>
    <div style={{ padding: "80px 70px 0", display: "flex", flexDirection: "column", height: "100%" }}>
      <p
        style={{
          fontFamily: bodyFont,
          fontSize: 18,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: tokens.ink,
          opacity: 0.55,
          fontWeight: 700,
          margin: "0 0 34px",
        }}
      >
        {book.eyebrow}
      </p>
      <h1
        style={{
          fontFamily: displayFont,
          fontWeight: 900,
          fontSize: 116,
          lineHeight: 0.92,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        {book.title[0]}
        <br />
        {book.title[1]}
      </h1>
      <div style={{ width: 64, height: 10, background: tokens.accent, margin: "28px 0 0" }} />
      <p
        style={{
          fontFamily: bodyFont,
          fontWeight: 600,
          fontSize: 26,
          opacity: 0.8,
          margin: "22px 0 0",
          maxWidth: "18ch",
          lineHeight: 1.4,
        }}
      >
        {coverSubtitleD}
      </p>

      <div
        style={{
          flex: 1,
          margin: "40px -70px 0",
          background: tokens.bgSoft,
          borderTop: `1px solid ${tokens.line}`,
          borderBottom: `1px solid ${tokens.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PhotoIcon size={40} color={tokens.ink} />
        <p
          style={{
            position: "absolute",
            fontFamily: bodyFont,
            fontSize: 15,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: tokens.ink,
            opacity: 0.5,
            marginTop: 90,
          }}
        >
          Foto-Platzhalter — Chris, Portrait
        </p>
      </div>

      <div
        style={{
          fontFamily: bodyFont,
          fontSize: 20,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontWeight: 800,
          padding: "28px 0 56px",
          textAlign: "center",
        }}
      >
        {book.author}
      </div>
    </div>
  </Page>
);

export const DTOC: React.FC = () => (
  <Page>
    <div style={{ padding: "72px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{toc.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 46, margin: "0 0 36px" }}>{toc.heading}</h3>
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

export const DForeword: React.FC = () => (
  <Page>
    <div style={{ padding: "78px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{foreword.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 44, margin: "0 0 26px", maxWidth: "16ch" }}>
        {foreword.heading}
      </h3>
      <div style={{ fontFamily: bodyFont, fontSize: 21, lineHeight: 1.65, maxWidth: "56ch" }}>
        {foreword.intro.map((p, i) => (
          <p key={i} style={{ margin: "0 0 16px" }}>
            {p}
          </p>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 24 }}>
        {foreword.steps.map((s) => (
          <div
            key={s.n}
            style={{
              display: "flex",
              gap: 22,
              alignItems: "center",
              padding: "18px 4px",
              borderBottom: `1px solid ${tokens.line}`,
            }}
          >
            <span
              style={{
                fontFamily: displayFont,
                fontWeight: 900,
                fontSize: 22,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: tokens.dark,
                color: tokens.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {s.n}
            </span>
            <div>
              <p style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 19, margin: "0 0 4px" }}>{s.label}</p>
              <p style={{ fontFamily: bodyFont, fontSize: 17, opacity: 0.65, margin: 0, lineHeight: 1.5 }}>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
      <Folio left={foreword.folio.left} right={foreword.folio.right} />
    </div>
  </Page>
);

export const DChapterDivider: React.FC = () => (
  <Page bg={tokens.dark}>
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "70px 70px 52px", color: "#fff" }}>
      <p
        style={{
          fontFamily: bodyFont,
          fontWeight: 800,
          fontSize: 20,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: tokens.accent,
          margin: 0,
        }}
      >
        {chapterDivider.part}
      </p>
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <h1
          style={{
            fontFamily: displayFont,
            fontWeight: 900,
            fontSize: 96,
            lineHeight: 0.98,
            margin: 0,
            maxWidth: "10ch",
          }}
        >
          {chapterDivider.heading}
        </h1>
      </div>
      <p style={{ fontFamily: bodyFont, fontSize: 22, opacity: 0.75, maxWidth: "38ch", margin: "0 0 30px", lineHeight: 1.5 }}>
        {chapterDivider.subheading}
      </p>
      <Folio left={chapterDivider.part} right={chapterDivider.folioRight} light />
    </div>
  </Page>
);

export const DVonChris: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{vonChris.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 42, lineHeight: 1.12, margin: "0 0 28px", maxWidth: "18ch" }}>
        {vonChris.heading}
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1.65fr 1fr", gap: 40, alignItems: "start" }}>
        <div style={{ fontFamily: bodyFont, fontSize: 21, lineHeight: 1.72 }}>
          {vonChris.paragraphs.map((p, i) => (
            <p key={i} style={{ margin: "0 0 18px" }}>
              {p}
            </p>
          ))}
        </div>
        <div
          style={{
            background: tokens.dark,
            color: "#fff",
            padding: "24px 22px",
            borderLeft: `6px solid ${tokens.accent}`,
          }}
        >
          <p style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 24, lineHeight: 1.35, margin: 0 }}>
            {vonChris.pullquote}
          </p>
        </div>
      </div>
      <Folio left={vonChris.folio.left} right={vonChris.folio.right} />
    </div>
  </Page>
);

const EffortRewardFigure: React.FC = () => {
  const rows = [
    { label: "Chips griffbereit", effort: 15, reward: 92 },
    { label: "Salat schnippeln", effort: 80, reward: 55 },
  ];
  return (
    <div style={{ background: tokens.bgSoft, border: `1px solid ${tokens.line}`, padding: "22px 24px" }}>
      <p style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 15, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 18px" }}>
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
              <div style={{ flex: 1, height: 10, background: "#fff", border: `1px solid ${tokens.line}` }}>
                <div style={{ width: `${v}%`, height: "100%", background: color }} />
              </div>
              <span style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 13, width: 32 }}>{v}%</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const DKapitel1: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 70px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel1.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 42, margin: "0 0 28px" }}>{kapitel1.heading}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1.65fr 1fr", gap: 40, alignItems: "start" }}>
        <div style={{ fontFamily: bodyFont, fontSize: 21, lineHeight: 1.72 }}>
          {kapitel1.paragraphs.map((p, i) => (
            <p key={i} style={{ margin: "0 0 18px" }}>
              {p}
            </p>
          ))}
          <div style={{ borderLeft: `4px solid ${tokens.accent}`, paddingLeft: 22, margin: "20px 0 0" }}>
            <p style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 24, lineHeight: 1.35, margin: 0 }}>
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

const NutritionTable: React.FC<{ nutrition: { kcal: number; protein: number; carbs: number; fat: number } }> = ({
  nutrition,
}) => (
  <div style={{ border: `1px solid ${tokens.ink}`, width: "100%" }}>
    <div
      style={{
        background: tokens.dark,
        color: "#fff",
        fontFamily: bodyFont,
        fontWeight: 800,
        fontSize: 14,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "8px 14px",
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

export const DRecipe: React.FC = () => (
  <Page>
    <div style={{ padding: "60px 70px 46px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {recipe.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: tokens.bgSoft,
              border: `1px solid ${tokens.line}`,
              borderRadius: 4,
              padding: "6px 12px",
              fontFamily: bodyFont,
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 style={{ fontFamily: displayFont, fontWeight: 900, fontSize: 48, margin: "0 0 14px" }}>{recipe.heading}</h3>
      <div
        style={{
          display: "flex",
          gap: 24,
          background: tokens.bgSoft,
          border: `1px solid ${tokens.line}`,
          padding: "10px 16px",
          width: "fit-content",
          marginBottom: 20,
        }}
      >
        <span style={{ fontFamily: bodyFont, fontSize: 14, fontWeight: 700 }}>{recipe.servings}</span>
        <span style={{ fontFamily: bodyFont, fontSize: 14, opacity: 0.5 }}>|</span>
        <span style={{ fontFamily: bodyFont, fontSize: 14, fontWeight: 700 }}>Zubereitung: {recipe.prepTime}</span>
        <span style={{ fontFamily: bodyFont, fontSize: 14, opacity: 0.5 }}>|</span>
        <span style={{ fontFamily: bodyFont, fontSize: 14, fontWeight: 700 }}>{recipe.cookTime}</span>
      </div>
      <p style={{ fontFamily: bodyFont, fontSize: 18, lineHeight: 1.6, opacity: 0.75, maxWidth: "62ch", margin: "0 0 26px" }}>
        {recipe.subheading}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 36, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          <div style={{ background: tokens.bgSoft, border: `1px solid ${tokens.line}`, padding: 22, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <Img src={staticFile(recipe.productImage)} style={{ width: 170, height: 170, objectFit: "contain" }} />
          </div>
          <p style={{ fontFamily: bodyFont, fontSize: 13, opacity: 0.55, textAlign: "center", margin: 0 }}>
            {recipe.productLabel}
          </p>
          <NutritionTable nutrition={recipe.nutrition} />
        </div>

        <div>
          <p style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 15, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 12px" }}>
            Zutaten
          </p>
          <ul style={{ margin: "0 0 22px", padding: 0, listStyle: "none" }}>
            {recipe.ingredients.map((ing) => (
              <li key={ing} style={{ fontFamily: bodyFont, fontSize: 17, lineHeight: 1.6, marginBottom: 8, paddingLeft: 20, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: tokens.accent, fontWeight: 900 }}>—</span>
                {ing}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 15, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 12px" }}>
            Zubereitung
          </p>
          <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {recipe.steps.map((step, i) => (
              <li key={step} style={{ fontFamily: bodyFont, fontSize: 17, lineHeight: 1.6, marginBottom: 10, paddingLeft: 34, position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: 22,
                    height: 22,
                    background: tokens.dark,
                    color: tokens.accent,
                    fontFamily: bodyFont,
                    fontWeight: 800,
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div style={{ marginTop: 26 }}>
        <p style={{ fontFamily: bodyFont, fontWeight: 800, fontSize: 15, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 14px" }}>
          {recipe.alternativesLabel}
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          {recipe.alternatives.map((alt) => (
            <div key={alt.key} style={{ flex: 1, background: tokens.bgSoft, border: `1px solid ${tokens.line}`, padding: "14px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Img src={staticFile(alt.image)} style={{ width: 66, height: 66, objectFit: "contain" }} />
              <p style={{ fontFamily: bodyFont, fontSize: 13, textAlign: "center", margin: 0, opacity: 0.7, fontWeight: 600 }}>{alt.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Folio left="Kapitel 10" right="79" />
    </div>
  </Page>
);
