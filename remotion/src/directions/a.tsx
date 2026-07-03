import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SourceSerif4";
import { loadFont as loadBody } from "@remotion/google-fonts/PublicSans";
import { PAGE_WIDTH, PAGE_HEIGHT } from "../pageSize";
import { book, coverSubtitles, vonChris, kapitel1, toc, recipe, foreword } from "../content";
import { PhotoIcon } from "../components/PlaceholderIcon";

const { fontFamily: displayFont } = loadDisplay("normal", { weights: ["400"], subsets: ["latin"] });
loadDisplay("italic", { weights: ["400"], subsets: ["latin"] });
const { fontFamily: bodyFont } = loadBody("normal", { weights: ["400", "600", "700"], subsets: ["latin"] });

const tokens = {
  bg: "#F3F1EA",
  ink: "#20261F",
  accent: "#2B6357",
  accentSoft: "#DCE7DF",
  line: "#C7BFAE",
};

const INSET = 26;

const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      background: tokens.bg,
      color: tokens.ink,
      fontFamily: bodyFont,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: INSET,
        border: `1px solid ${tokens.line}`,
        pointerEvents: "none",
      }}
    />
    {children}
  </AbsoluteFill>
);

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p
    style={{
      fontFamily: bodyFont,
      fontSize: 18,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: tokens.accent,
      fontWeight: 600,
      margin: "0 0 18px",
    }}
  >
    {children}
  </p>
);

const Folio: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: bodyFont,
      fontSize: 17,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      opacity: 0.45,
      borderTop: `1px solid ${tokens.line}`,
      paddingTop: 18,
      marginTop: "auto",
    }}
  >
    <span>{left}</span>
    <span>{right}</span>
  </div>
);

const DropCapParagraph: React.FC<{ text: string; fontSize: number }> = ({ text, fontSize }) => {
  const first = text.charAt(0);
  const rest = text.slice(1);
  return (
    <p style={{ margin: "0 0 22px", fontSize, lineHeight: 1.75 }}>
      <span
        style={{
          fontFamily: displayFont,
          fontSize: fontSize * 3.35,
          lineHeight: 0.72,
          float: "left",
          padding: "6px 8px 0 0",
          color: tokens.accent,
        }}
      >
        {first}
      </span>
      {rest}
    </p>
  );
};

const MarginNote: React.FC<{ label: string; children: React.ReactNode; style?: React.CSSProperties }> = ({
  label,
  children,
  style,
}) => (
  <div style={{ borderTop: `2px solid ${tokens.accent}`, paddingTop: 16, ...style }}>
    <p
      style={{
        fontFamily: bodyFont,
        fontSize: 15,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: tokens.accent,
        fontWeight: 700,
        margin: "0 0 12px",
      }}
    >
      {label}
    </p>
    {children}
  </div>
);

const StatChip: React.FC = () => (
  <div style={{ marginTop: 28 }}>
    <p style={{ fontFamily: displayFont, fontSize: 52, margin: 0, lineHeight: 1, color: tokens.ink }}>500.000+</p>
    <p style={{ fontFamily: bodyFont, fontSize: 16, opacity: 0.65, margin: "6px 0 0", lineHeight: 1.5 }}>
      Menschen über Chris' Videos erreicht — Ziel: 5 Millionen.
    </p>
  </div>
);

const EffortRewardFigure: React.FC = () => {
  const rows = [
    { label: "Chips griffbereit", effort: 0.15, reward: 0.92 },
    { label: "Salat schnippeln", effort: 0.8, reward: 0.55 },
  ];
  return (
    <div>
      {rows.map((r) => (
        <div key={r.label} style={{ marginBottom: 22 }}>
          <p style={{ fontFamily: bodyFont, fontSize: 16, fontWeight: 600, margin: "0 0 8px" }}>{r.label}</p>
          {(["Aufwand", "Belohnung"] as const).map((k) => {
            const val = k === "Aufwand" ? r.effort : r.reward;
            return (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontFamily: bodyFont, fontSize: 13, width: 84, opacity: 0.6 }}>{k}</span>
                <div style={{ flex: 1, height: 9, background: tokens.accentSoft, borderRadius: 1 }}>
                  <div
                    style={{
                      width: `${val * 100}%`,
                      height: "100%",
                      background: tokens.accent,
                      opacity: k === "Aufwand" ? 0.55 : 1,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <p style={{ fontFamily: displayFont, fontStyle: "italic", fontSize: 20, lineHeight: 1.45, margin: "18px 0 0" }}>
        Je kleiner der Aufwand, desto eher gewinnt die Gewohnheit.
      </p>
    </div>
  );
};

export const ACover: React.FC = () => (
  <Page>
    <div style={{ padding: "70px 66px 0", display: "flex", flexDirection: "column", height: "100%" }}>
      <p
        style={{
          fontFamily: bodyFont,
          fontSize: 19,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: tokens.accent,
          fontWeight: 600,
          margin: "0 0 30px",
        }}
      >
        {book.eyebrow}
      </p>
      <h1
        style={{
          fontFamily: displayFont,
          fontWeight: 400,
          fontSize: 112,
          lineHeight: 0.95,
          margin: 0,
          letterSpacing: "-0.01em",
        }}
      >
        {book.title[0]}
        <br />
        {book.title[1]}
      </h1>
      <p
        style={{
          fontFamily: displayFont,
          fontStyle: "italic",
          fontSize: 32,
          opacity: 0.75,
          margin: "26px 0 0",
          maxWidth: "13ch",
          lineHeight: 1.35,
        }}
      >
        {coverSubtitles.a}
      </p>

      <div
        style={{
          flex: 1,
          margin: "40px -66px 0",
          position: "relative",
          background: tokens.accentSoft,
          borderTop: `1px solid ${tokens.line}`,
          borderBottom: `1px solid ${tokens.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PhotoIcon size={40} color={tokens.accent} />
        <p
          style={{
            position: "absolute",
            bottom: 28,
            fontFamily: bodyFont,
            fontSize: 16,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: tokens.accent,
            opacity: 0.85,
            margin: 0,
          }}
        >
          Foto-Platzhalter — Chris, Portrait
        </p>
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 30,
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: `1.5px solid ${tokens.accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: displayFont,
            fontSize: 22,
            color: tokens.accent,
            background: tokens.bg,
          }}
        >
          CW
        </div>
      </div>

      <div
        style={{
          fontFamily: bodyFont,
          fontSize: 22,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 700,
          padding: "30px 0 52px",
          margin: "0 -66px 0",
          textAlign: "center",
        }}
      >
        {book.author}
      </div>
    </div>
  </Page>
);

export const AVonChris: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 66px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{vonChris.kicker}</Kicker>
      <h3
        style={{
          fontFamily: displayFont,
          fontWeight: 400,
          fontSize: 44,
          lineHeight: 1.15,
          margin: "0 0 30px",
          maxWidth: "17ch",
        }}
      >
        {vonChris.heading}
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1.65fr 1fr", gap: 44, flex: 1, alignItems: "start" }}>
        <div style={{ fontFamily: bodyFont, fontSize: 21 }}>
          <DropCapParagraph text={vonChris.paragraphs[0]} fontSize={21} />
          {vonChris.paragraphs.slice(1).map((p, i) => (
            <p key={i} style={{ margin: "0 0 20px", lineHeight: 1.75 }}>
              {p}
            </p>
          ))}
        </div>
        <div>
          <MarginNote label="Zitat">
            <p
              style={{
                fontFamily: displayFont,
                fontStyle: "italic",
                fontSize: 25,
                lineHeight: 1.4,
                color: tokens.accent,
                margin: 0,
              }}
            >
              {vonChris.pullquote}
            </p>
          </MarginNote>
          <StatChip />
        </div>
      </div>
      <Folio left={vonChris.folio.left} right={vonChris.folio.right} />
    </div>
  </Page>
);

export const AKapitel1: React.FC = () => (
  <Page>
    <div style={{ padding: "66px 66px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{kapitel1.kicker}</Kicker>
      <h3
        style={{
          fontFamily: displayFont,
          fontWeight: 400,
          fontSize: 44,
          lineHeight: 1.15,
          margin: "0 0 30px",
        }}
      >
        {kapitel1.heading}
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1.65fr 1fr", gap: 44, flex: 1, alignItems: "start" }}>
        <div style={{ fontFamily: bodyFont, fontSize: 21 }}>
          <DropCapParagraph text={kapitel1.paragraphs[0]} fontSize={21} />
          {kapitel1.paragraphs.slice(1).map((p, i) => (
            <p key={i} style={{ margin: "0 0 20px", lineHeight: 1.75 }}>
              {p}
            </p>
          ))}
          <div
            style={{
              fontFamily: displayFont,
              fontStyle: "italic",
              fontSize: 26,
              lineHeight: 1.4,
              color: tokens.accent,
              borderLeft: `3px solid ${tokens.accent}`,
              paddingLeft: 24,
              margin: "18px 0 0",
            }}
          >
            Der richtige Hebel liegt nicht in deinem Kopf — er liegt in deinem Umfeld.
          </div>
        </div>
        <MarginNote label="Aufwand ↔ Belohnung">
          <EffortRewardFigure />
        </MarginNote>
      </div>
      <Folio left={kapitel1.folio.left} right={kapitel1.folio.right} />
    </div>
  </Page>
);

export const AForeword: React.FC = () => (
  <Page>
    <div style={{ padding: "78px 66px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{foreword.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 400, fontSize: 46, margin: "0 0 26px", maxWidth: "18ch" }}>
        {foreword.heading}
      </h3>
      <div style={{ fontFamily: bodyFont, fontSize: 22, lineHeight: 1.7, maxWidth: "56ch" }}>
        {foreword.intro.map((p, i) => (
          <p key={i} style={{ margin: "0 0 16px" }}>
            {p}
          </p>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 24 }}>
        {foreword.steps.map((s, i) => (
          <div
            key={s.n}
            style={{
              display: "flex",
              gap: 26,
              alignItems: "flex-start",
              padding: "20px 0",
              borderTop: i === 0 ? `1px solid ${tokens.line}` : "none",
              borderBottom: `1px solid ${tokens.line}`,
            }}
          >
            <span style={{ fontFamily: displayFont, fontSize: 34, color: tokens.accent, width: 40 }}>{s.n}</span>
            <div>
              <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 20, margin: "0 0 6px" }}>{s.label}</p>
              <p style={{ fontFamily: bodyFont, fontSize: 18, opacity: 0.75, margin: 0, lineHeight: 1.55 }}>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
      <Folio left={foreword.folio.left} right={foreword.folio.right} />
    </div>
  </Page>
);

export const ATOC: React.FC = () => (
  <Page>
    <div style={{ padding: "70px 66px 52px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{toc.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 400, fontSize: 48, margin: "0 0 40px" }}>{toc.heading}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 26, flex: 1 }}>
        {toc.parts.map((part) => (
          <div key={part.part}>
            <p
              style={{
                fontFamily: bodyFont,
                fontSize: 15,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: tokens.accent,
                fontWeight: 700,
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
                  fontFamily: displayFont,
                  fontSize: 23,
                  padding: "5px 0",
                }}
              >
                <span>{e.title}</span>
                <span style={{ flex: 1, borderBottom: `1px dotted ${tokens.line}`, transform: "translateY(-6px)" }} />
                <span style={{ fontFamily: bodyFont, fontSize: 17, opacity: 0.6 }}>{e.page}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </Page>
);

const NutritionFact: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ textAlign: "center" }}>
    <p style={{ fontFamily: displayFont, fontSize: 30, margin: 0, color: tokens.ink }}>{value}</p>
    <p style={{ fontFamily: bodyFont, fontSize: 13, letterSpacing: "0.05em", textTransform: "uppercase", opacity: 0.6, margin: "4px 0 0" }}>
      {label}
    </p>
  </div>
);

export const ARecipe: React.FC = () => (
  <Page>
    <div style={{ padding: "62px 66px 46px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Kicker>{recipe.kicker}</Kicker>
      <h3 style={{ fontFamily: displayFont, fontWeight: 400, fontSize: 46, margin: "0 0 14px" }}>{recipe.heading}</h3>
      <p style={{ fontFamily: bodyFont, fontSize: 19, lineHeight: 1.6, opacity: 0.85, maxWidth: "58ch", margin: "0 0 26px" }}>
        {recipe.subheading}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 40, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
          <div
            style={{
              background: tokens.accentSoft,
              border: `1px solid ${tokens.line}`,
              padding: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Img src={staticFile(recipe.productImage)} style={{ width: 190, height: 190, objectFit: "contain" }} />
          </div>
          <p style={{ fontFamily: bodyFont, fontSize: 14, opacity: 0.6, textAlign: "center", margin: 0 }}>
            {recipe.productLabel}
          </p>
          <div style={{ display: "flex", gap: 28, borderTop: `1px solid ${tokens.line}`, borderBottom: `1px solid ${tokens.line}`, padding: "16px 4px", width: "100%", justifyContent: "center" }}>
            <NutritionFact label="Kcal" value={String(recipe.nutrition.kcal)} />
            <NutritionFact label="Protein" value={`${recipe.nutrition.protein}g`} />
            <NutritionFact label="Kh" value={`${recipe.nutrition.carbs}g`} />
            <NutritionFact label="Fett" value={`${recipe.nutrition.fat}g`} />
          </div>
          <p style={{ fontFamily: bodyFont, fontSize: 14, opacity: 0.6, margin: 0 }}>
            {recipe.servings} · {recipe.time}
          </p>
        </div>

        <div>
          <p style={{ fontFamily: bodyFont, fontSize: 15, letterSpacing: "0.1em", textTransform: "uppercase", color: tokens.accent, fontWeight: 700, margin: "0 0 12px" }}>
            Zutaten
          </p>
          <ul style={{ margin: "0 0 24px", padding: 0, listStyle: "none" }}>
            {recipe.ingredients.map((ing) => (
              <li key={ing} style={{ fontFamily: bodyFont, fontSize: 18, lineHeight: 1.6, marginBottom: 8, paddingLeft: 20, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: tokens.accent }}>—</span>
                {ing}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: bodyFont, fontSize: 15, letterSpacing: "0.1em", textTransform: "uppercase", color: tokens.accent, fontWeight: 700, margin: "0 0 12px" }}>
            Zubereitung
          </p>
          <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {recipe.steps.map((step, i) => (
              <li
                key={step}
                style={{
                  fontFamily: bodyFont,
                  fontSize: 18,
                  lineHeight: 1.6,
                  marginBottom: 10,
                  paddingLeft: 34,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: `1px solid ${tokens.accent}`,
                    color: tokens.accent,
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

      <div style={{ marginTop: 30 }}>
        <p style={{ fontFamily: bodyFont, fontSize: 15, letterSpacing: "0.1em", textTransform: "uppercase", color: tokens.accent, fontWeight: 700, margin: "0 0 14px" }}>
          {recipe.alternativesLabel}
        </p>
        <div style={{ display: "flex", gap: 18 }}>
          {recipe.alternatives.map((alt) => (
            <div key={alt.key} style={{ flex: 1, background: tokens.accentSoft, border: `1px solid ${tokens.line}`, padding: "16px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <Img src={staticFile(alt.image)} style={{ width: 72, height: 72, objectFit: "contain" }} />
              <p style={{ fontFamily: bodyFont, fontSize: 13, textAlign: "center", margin: 0, opacity: 0.75 }}>{alt.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Folio left="Kapitel 10" right="79" />
    </div>
  </Page>
);

