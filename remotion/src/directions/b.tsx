import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/Anton";
import { loadFont as loadBody } from "@remotion/google-fonts/Barlow";
import { loadFont as loadMono } from "@remotion/google-fonts/IBMPlexMono";
import { PAGE_WIDTH, PAGE_HEIGHT } from "../pageSize";
import { book, coverSubtitles, vonChris, kapitel1, toc, recipe, foreword } from "../content";
import { PhotoIcon } from "../components/PlaceholderIcon";

const { fontFamily: displayFont } = loadDisplay();
const { fontFamily: bodyFont } = loadBody("normal", { weights: ["400", "600", "700"] });
const { fontFamily: monoFont } = loadMono("normal", { weights: ["500", "600"] });

const tokens = {
  bg: "#131316",
  ink: "#F4F2EC",
  accent: "#3358F4",
  accent2: "#F2B705",
  panel: "#1D1E22",
  line: "#33343A",
};

const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      background: tokens.bg,
      color: tokens.ink,
      fontFamily: bodyFont,
      overflow: "hidden",
    }}
  >
    {children}
  </AbsoluteFill>
);

const GhostNumber: React.FC<{ n: string }> = ({ n }) => (
  <span
    style={{
      position: "absolute",
      top: -34,
      right: 40,
      fontFamily: displayFont,
      fontSize: 220,
      lineHeight: 1,
      color: tokens.ink,
      opacity: 0.05,
    }}
  >
    {n}
  </span>
);

const Folio: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: monoFont,
      fontSize: 16,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      opacity: 0.5,
      borderTop: `1px solid ${tokens.line}`,
      paddingTop: 18,
      marginTop: "auto",
    }}
  >
    <span>{left}</span>
    <span>{right}</span>
  </div>
);

const CoachNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      background: tokens.accent2,
      color: "#181300",
      padding: "24px 28px",
      display: "flex",
      alignItems: "center",
      gap: 18,
      margin: "24px -4px 0",
    }}
  >
    <span style={{ fontFamily: displayFont, fontSize: 34, lineHeight: 1 }}>!</span>
    <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 21, lineHeight: 1.4, margin: 0 }}>{children}</p>
  </div>
);

const EffortRewardFigure: React.FC = () => {
  const rows = [
    { label: "CHIPS GRIFFBEREIT", effort: 15, reward: 92 },
    { label: "SALAT SCHNIPPELN", effort: 80, reward: 55 },
  ];
  return (
    <div
      style={{
        background: tokens.panel,
        border: `1px solid ${tokens.line}`,
        padding: "26px 28px",
        marginTop: 8,
      }}
    >
      <p
        style={{
          fontFamily: monoFont,
          fontSize: 16,
          letterSpacing: "0.06em",
          color: tokens.accent2,
          margin: "0 0 22px",
        }}
      >
        INFOGRAFIK — AUFWAND ↔ BELOHNUNG
      </p>
      {rows.map((r) => (
        <div key={r.label} style={{ marginBottom: 20 }}>
          <p style={{ fontFamily: monoFont, fontSize: 15, letterSpacing: "0.04em", margin: "0 0 10px", opacity: 0.85 }}>
            {r.label}
          </p>
          {([
            ["AUFWAND", r.effort, tokens.line],
            ["BELOHNUNG", r.reward, tokens.accent],
          ] as const).map(([k, v, color]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span style={{ fontFamily: monoFont, fontSize: 13, width: 108, opacity: 0.6 }}>{k}</span>
              <div style={{ flex: 1, height: 16, background: "#0E0F12" }}>
                <div style={{ width: `${v}%`, height: "100%", background: color }} />
              </div>
              <span style={{ fontFamily: monoFont, fontSize: 14, width: 40, textAlign: "right" }}>{v}%</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const BCover: React.FC = () => (
  <Page>
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          minHeight: "54%",
          background: tokens.panel,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)",
        }}
      >
        <PhotoIcon size={44} color={tokens.accent} />
        <p
          style={{
            position: "absolute",
            bottom: 46,
            fontFamily: monoFont,
            fontSize: 16,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: tokens.accent,
            opacity: 0.85,
          }}
        >
          Foto-Platzhalter — Chris, hoher Kontrast
        </p>
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 34,
            background: tokens.accent2,
            color: "#181300",
            fontFamily: monoFont,
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: "0.05em",
            padding: "8px 14px",
          }}
        >
          BAND 1
        </div>
      </div>
      <div style={{ padding: "20px 68px 60px", position: "relative", flex: 1 }}>
        <p
          style={{
            fontFamily: monoFont,
            fontSize: 19,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: tokens.accent2,
            fontWeight: 600,
            margin: "0 0 20px",
          }}
        >
          {book.eyebrow}
        </p>
        <h1
          style={{
            fontFamily: displayFont,
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: 108,
            lineHeight: 0.85,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {book.title[0]}-
          <br />
          {book.title[1]}
        </h1>
        <p
          style={{
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 26,
            opacity: 0.78,
            margin: "26px 0 0",
            maxWidth: "17ch",
            lineHeight: 1.45,
          }}
        >
          {coverSubtitles.b}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 30 }}>
          <div style={{ width: 40, height: 4, background: tokens.accent2 }} />
          <p
            style={{
              fontFamily: monoFont,
              fontSize: 20,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: tokens.accent,
              margin: 0,
            }}
          >
            {book.author}
          </p>
        </div>
      </div>
    </div>
  </Page>
);

export const BVonChris: React.FC = () => (
  <Page>
    <div style={{ padding: "60px 62px 50px", height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      <GhostNumber n="01" />
      <p
        style={{
          fontFamily: monoFont,
          fontSize: 18,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: tokens.accent2,
          fontWeight: 600,
          margin: "0 0 18px",
        }}
      >
        01 / {vonChris.kicker}
      </p>
      <h3
        style={{
          fontFamily: displayFont,
          fontWeight: 400,
          textTransform: "uppercase",
          fontSize: 52,
          lineHeight: 0.98,
          margin: "0 0 28px",
        }}
      >
        Mit 11 in die erste Diät
      </h3>
      <div style={{ fontFamily: bodyFont, fontSize: 22, lineHeight: 1.62, opacity: 0.92 }}>
        <p style={{ margin: "0 0 18px" }}>Nicht weil jemand es sagte. Weil ich glaubte: Kontrolle heißt Verzicht.</p>
        <p style={{ margin: "0 0 18px" }}>
          Kalorien zählen. Verbieten. Strenger werden. Am Ende: fast Magersucht — und Fressattacken, die ich mir
          nicht erklären konnte. Ich schämte mich. Ich dachte, mit mir stimmt was nicht.
        </p>
        <p style={{ margin: 0 }}>
          Erst Jahre später habe ich verstanden: Mein Körper hatte nicht versagt. Er hatte genau das gemacht, was
          er sollte.
        </p>
      </div>
      <div
        style={{
          fontFamily: displayFont,
          textTransform: "uppercase",
          fontSize: 36,
          lineHeight: 1.1,
          background: tokens.accent,
          color: "#0B0E1A",
          padding: "20px 24px",
          margin: "20px -4px 0",
        }}
      >
        Mein Körper hat nicht versagt.
      </div>
      <CoachNote>500.000+ Menschen haben über Chris' Videos einen anderen Blick auf Essen gefunden.</CoachNote>
      <Folio left={vonChris.folio.left} right={`S. ${vonChris.folio.right}`} />
    </div>
  </Page>
);

export const BKapitel1: React.FC = () => (
  <Page>
    <div style={{ padding: "60px 62px 50px", height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      <GhostNumber n="02" />
      <p
        style={{
          fontFamily: monoFont,
          fontSize: 18,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: tokens.accent2,
          fontWeight: 600,
          margin: "0 0 18px",
        }}
      >
        02 / {kapitel1.kicker}
      </p>
      <h3
        style={{
          fontFamily: displayFont,
          fontWeight: 400,
          textTransform: "uppercase",
          fontSize: 48,
          lineHeight: 0.98,
          margin: "0 0 28px",
        }}
      >
        Willenskraft ist der falsche Hebel
      </h3>
      <div style={{ fontFamily: bodyFont, fontSize: 22, lineHeight: 1.62, opacity: 0.92 }}>
        <p style={{ margin: "0 0 18px" }}>
          Jede Diät endet beim selben Satz: Reiß dich zusammen. Als wäre Heißhunger eine Charakterfrage.
        </p>
        <p style={{ margin: 0 }}>
          Ist sie nicht. Willenskraft hält einen Moment. Gegen ein Gehirn, das seit Jahrmillionen Energie sichert,
          hat sie auf Dauer keine Chance.
        </p>
      </div>
      <EffortRewardFigure />
      <Folio left={kapitel1.folio.left} right={`S. ${kapitel1.folio.right}`} />
    </div>
  </Page>
);

export const BForeword: React.FC = () => (
  <Page>
    <div style={{ padding: "60px 62px 50px", height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      <GhostNumber n="00" />
      <p style={{ fontFamily: monoFont, fontSize: 18, letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.accent2, fontWeight: 600, margin: "0 0 18px" }}>
        00 / {foreword.kicker}
      </p>
      <h3 style={{ fontFamily: displayFont, fontWeight: 400, textTransform: "uppercase", fontSize: 46, lineHeight: 1, margin: "0 0 24px", maxWidth: "16ch" }}>
        {foreword.heading}
      </h3>
      <div style={{ fontFamily: bodyFont, fontSize: 21, lineHeight: 1.6, opacity: 0.92, maxWidth: "58ch" }}>
        {foreword.intro.map((p, i) => (
          <p key={i} style={{ margin: "0 0 14px" }}>
            {p}
          </p>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
        {foreword.steps.map((s) => (
          <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 20, background: tokens.panel, border: `1px solid ${tokens.line}`, padding: "16px 20px" }}>
            <span style={{ fontFamily: displayFont, fontSize: 40, color: tokens.accent2, width: 50 }}>{s.n}</span>
            <div>
              <p style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: 19, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.02em" }}>
                {s.label}
              </p>
              <p style={{ fontFamily: bodyFont, fontSize: 16, opacity: 0.75, margin: 0 }}>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
      <Folio left={foreword.folio.left} right={`S. ${foreword.folio.right}`} />
    </div>
  </Page>
);

export const BTOC: React.FC = () => (
  <Page>
    <div style={{ padding: "64px 62px 50px", height: "100%", display: "flex", flexDirection: "column" }}>
      <p style={{ fontFamily: monoFont, fontSize: 18, letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.accent2, fontWeight: 600, margin: "0 0 18px" }}>
        {toc.kicker}
      </p>
      <h3 style={{ fontFamily: displayFont, fontWeight: 400, textTransform: "uppercase", fontSize: 48, margin: "0 0 34px" }}>
        {toc.heading}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {toc.parts.map((part) => (
          <div key={part.part}>
            <p style={{ fontFamily: monoFont, fontSize: 15, letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.accent, fontWeight: 600, margin: "0 0 8px" }}>
              {part.part}
            </p>
            {part.entries.map((e) => (
              <div key={e.title} style={{ display: "flex", alignItems: "baseline", gap: 10, fontFamily: bodyFont, fontWeight: 600, fontSize: 21, padding: "5px 0" }}>
                <span>{e.title}</span>
                <span style={{ flex: 1, borderBottom: `1px dotted ${tokens.line}`, transform: "translateY(-6px)" }} />
                <span style={{ fontFamily: monoFont, fontSize: 16, color: tokens.accent2 }}>{e.page}</span>
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
    <p style={{ fontFamily: monoFont, fontSize: 12, letterSpacing: "0.05em", textTransform: "uppercase", opacity: 0.6, margin: "6px 0 0" }}>
      {label}
    </p>
  </div>
);

export const BRecipe: React.FC = () => (
  <Page>
    <div style={{ padding: "56px 62px 46px", height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      <p style={{ fontFamily: monoFont, fontSize: 17, letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.accent2, fontWeight: 600, margin: "0 0 16px" }}>
        {recipe.kicker}
      </p>
      <h3 style={{ fontFamily: displayFont, fontWeight: 400, textTransform: "uppercase", fontSize: 50, lineHeight: 0.95, margin: "0 0 14px" }}>
        {recipe.heading}
      </h3>
      <p style={{ fontFamily: bodyFont, fontSize: 18, lineHeight: 1.55, opacity: 0.85, maxWidth: "58ch", margin: "0 0 24px" }}>
        {recipe.subheading}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 34, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          <div style={{ background: tokens.panel, border: `1px solid ${tokens.line}`, padding: 22, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", width: "100%" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: tokens.accent2 }} />
            <Img src={staticFile(recipe.productImage)} style={{ width: 170, height: 170, objectFit: "contain" }} />
          </div>
          <div style={{ display: "flex", gap: 22, background: tokens.panel, border: `1px solid ${tokens.line}`, padding: "14px 4px", width: "100%", justifyContent: "center" }}>
            <NutritionFact label="Kcal" value={String(recipe.nutrition.kcal)} />
            <NutritionFact label="Protein" value={`${recipe.nutrition.protein}g`} />
            <NutritionFact label="Kh" value={`${recipe.nutrition.carbs}g`} />
            <NutritionFact label="Fett" value={`${recipe.nutrition.fat}g`} />
          </div>
          <p style={{ fontFamily: monoFont, fontSize: 13, opacity: 0.6, margin: 0 }}>
            {recipe.servings} · {recipe.time}
          </p>
        </div>

        <div>
          <p style={{ fontFamily: monoFont, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.accent2, fontWeight: 600, margin: "0 0 10px" }}>
            Zutaten
          </p>
          <ul style={{ margin: "0 0 22px", padding: 0, listStyle: "none" }}>
            {recipe.ingredients.map((ing) => (
              <li key={ing} style={{ fontFamily: bodyFont, fontSize: 17, lineHeight: 1.55, marginBottom: 8, paddingLeft: 18, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: tokens.accent }}>—</span>
                {ing}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: monoFont, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.accent2, fontWeight: 600, margin: "0 0 10px" }}>
            Zubereitung
          </p>
          <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {recipe.steps.map((step, i) => (
              <li key={step} style={{ fontFamily: bodyFont, fontSize: 17, lineHeight: 1.55, marginBottom: 10, paddingLeft: 32, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: 0, width: 22, height: 22, background: tokens.accent, color: "#0B0E1A", fontFamily: monoFont, fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div style={{ marginTop: 26 }}>
        <p style={{ fontFamily: monoFont, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.accent2, fontWeight: 600, margin: "0 0 12px" }}>
          {recipe.alternativesLabel}
        </p>
        <div style={{ display: "flex", gap: 14 }}>
          {recipe.alternatives.map((alt) => (
            <div key={alt.key} style={{ flex: 1, background: tokens.panel, border: `1px solid ${tokens.line}`, padding: "14px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Img src={staticFile(alt.image)} style={{ width: 64, height: 64, objectFit: "contain" }} />
              <p style={{ fontFamily: monoFont, fontSize: 11, textAlign: "center", margin: 0, opacity: 0.75, textTransform: "uppercase" }}>{alt.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Folio left="Kapitel 10" right="S. 79" />
    </div>
  </Page>
);
