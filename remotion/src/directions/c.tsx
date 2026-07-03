import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/Baloo2";
import { loadFont as loadBody } from "@remotion/google-fonts/Lora";
import { loadFont as loadHand } from "@remotion/google-fonts/Caveat";
import { PAGE_WIDTH, PAGE_HEIGHT } from "../pageSize";
import { book, coverSubtitles, vonChris, kapitel1, toc, recipe, foreword } from "../content";
import { PhotoIcon } from "../components/PlaceholderIcon";

const { fontFamily: displayFont } = loadDisplay("normal", { weights: ["600", "700", "800"] });
const { fontFamily: bodyFont } = loadBody("normal", { weights: ["400", "600"], subsets: ["latin"] });
loadBody("italic", { weights: ["400"], subsets: ["latin"] });
const { fontFamily: handFont } = loadHand("normal", { weights: ["500", "700"] });

const tokens = {
  bg: "#F6ECE1",
  ink: "#3B2E24",
  accent: "#6E7B3F",
  accent2: "#D98E73",
  line: "#E3CBAE",
  card: "#FFF8EF",
};

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
    {children}
  </AbsoluteFill>
);

const Tape: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div
    style={{
      position: "absolute",
      width: 84,
      height: 30,
      background: "rgba(217,142,115,0.55)",
      boxShadow: "0 1px 2px rgba(59,46,36,0.15)",
      ...style,
    }}
  />
);

const PhotoCard: React.FC<{ label: string; style?: React.CSSProperties }> = ({ label, style }) => (
  <div
    style={{
      background: tokens.card,
      border: `1px solid ${tokens.line}`,
      borderRadius: 6,
      boxShadow: "0 10px 22px -12px rgba(59,46,36,0.35)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
      color: tokens.accent,
      position: "relative",
      ...style,
    }}
  >
    <PhotoIcon size={40} color={tokens.accent} />
    <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 22, textAlign: "center", padding: "0 20px", margin: 0 }}>
      {label}
    </p>
  </div>
);

const WavyDivider: React.FC = () => (
  <svg width="100%" height="14" viewBox="0 0 600 14" preserveAspectRatio="none" style={{ display: "block" }}>
    <path
      d="M0 7 Q 15 0, 30 7 T 60 7 T 90 7 T 120 7 T 150 7 T 180 7 T 210 7 T 240 7 T 270 7 T 300 7 T 330 7 T 360 7 T 390 7 T 420 7 T 450 7 T 480 7 T 510 7 T 540 7 T 570 7 T 600 7"
      fill="none"
      stroke={tokens.accent2}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const Folio: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: handFont,
      fontWeight: 700,
      fontSize: 22,
      opacity: 0.55,
      paddingTop: 14,
      marginTop: "auto",
    }}
  >
    <span>{left}</span>
    <span>{right}</span>
  </div>
);

const StickyNote: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      background: "#FCE7B8",
      borderRadius: 4,
      padding: "18px 20px",
      boxShadow: "0 8px 16px -10px rgba(59,46,36,0.4)",
      transform: "rotate(1.4deg)",
      ...style,
    }}
  >
    <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 22, lineHeight: 1.35, margin: 0, color: "#4A3B14" }}>
      {children}
    </p>
  </div>
);

const EffortRewardFigure: React.FC = () => {
  const rows = [
    { label: "Chips griffbereit", effort: 0.15, reward: 0.92 },
    { label: "Salat schnippeln", effort: 0.8, reward: 0.55 },
  ];
  return (
    <div
      style={{
        background: tokens.card,
        border: `1.5px dashed ${tokens.accent2}`,
        borderRadius: 16,
        padding: "22px 24px",
        transform: "rotate(-0.5deg)",
      }}
    >
      <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 24, margin: "0 0 16px", color: tokens.accent }}>
        Aufwand ↔ Belohnung
      </p>
      {rows.map((r) => (
        <div key={r.label} style={{ marginBottom: 16 }}>
          <p style={{ fontFamily: bodyFont, fontSize: 15, fontWeight: 600, margin: "0 0 8px" }}>{r.label}</p>
          {(["Aufwand", "Belohnung"] as const).map((k) => {
            const val = k === "Aufwand" ? r.effort : r.reward;
            return (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontFamily: bodyFont, fontSize: 12, width: 74, opacity: 0.65 }}>{k}</span>
                <div style={{ flex: 1, height: 12, background: tokens.line, borderRadius: 8 }}>
                  <div
                    style={{
                      width: `${val * 100}%`,
                      height: "100%",
                      borderRadius: 8,
                      background: k === "Aufwand" ? tokens.accent2 : tokens.accent,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const CCover: React.FC = () => (
  <Page>
    <div style={{ padding: "70px 66px 0", display: "flex", flexDirection: "column", height: "100%" }}>
      <p style={{ fontFamily: handFont, fontStyle: "italic", fontWeight: 700, fontSize: 27, color: tokens.accent, margin: "0 0 16px" }}>
        {book.eyebrow}
      </p>
      <h1 style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 94, lineHeight: 0.95, margin: 0 }}>
        {book.title[0]}-
        <br />
        {book.title[1]}
      </h1>
      <p
        style={{
          fontFamily: bodyFont,
          fontStyle: "italic",
          fontSize: 30,
          opacity: 0.82,
          margin: "20px 0 0",
          maxWidth: "12ch",
          lineHeight: 1.4,
        }}
      >
        {coverSubtitles.c}
      </p>

      <div style={{ flex: 1, position: "relative", margin: "34px 40px 0" }}>
        <PhotoCard
          label=""
          style={{ position: "absolute", inset: "6% 14% 10% 4%", transform: "rotate(3deg)", opacity: 0.7 }}
        />
        <PhotoCard
          label="Foto-Platzhalter: Chris, Portrait"
          style={{ position: "absolute", inset: "0 4% 4% 14%", transform: "rotate(-2deg)" }}
        />
        <Tape style={{ top: "-4%", left: "38%", transform: "rotate(-8deg)" }} />
        <Tape style={{ bottom: "0%", right: "18%", transform: "rotate(6deg)" }} />
      </div>

      <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 30, color: tokens.accent, padding: "26px 0 50px" }}>
        — {book.author}
      </p>
    </div>
  </Page>
);

export const CVonChris: React.FC = () => (
  <Page>
    <div style={{ padding: "62px 66px 46px", height: "100%", display: "flex", flexDirection: "column" }}>
      <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 26, color: tokens.accent, margin: "0 0 12px" }}>
        {vonChris.kicker}
      </p>
      <h3 style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 42, lineHeight: 1.1, margin: "0 0 18px" }}>
        {vonChris.heading}
      </h3>
      <WavyDivider />
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 36, marginTop: 22, flex: 1, alignItems: "start" }}>
        <div style={{ fontFamily: bodyFont, fontSize: 21, lineHeight: 1.7 }}>
          {vonChris.paragraphs.map((p, i) => (
            <p key={i} style={{ margin: "0 0 18px" }}>
              {p}
            </p>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontFamily: handFont,
              fontWeight: 700,
              fontSize: 30,
              lineHeight: 1.3,
              background: tokens.card,
              border: `2px dashed ${tokens.accent2}`,
              borderRadius: 18,
              padding: "18px 20px",
              transform: "rotate(-0.8deg)",
            }}
          >
            {vonChris.pullquote}
          </div>
          <StickyNote style={{ transform: "rotate(1.6deg)" }}>
            500.000+ Menschen erreicht. Ziel: 5 Millionen.
          </StickyNote>
        </div>
      </div>
      <Folio left={vonChris.folio.left} right={vonChris.folio.right} />
    </div>
  </Page>
);

export const CKapitel1: React.FC = () => (
  <Page>
    <div style={{ padding: "62px 66px 46px", height: "100%", display: "flex", flexDirection: "column" }}>
      <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 26, color: tokens.accent, margin: "0 0 12px" }}>
        {kapitel1.kicker}
      </p>
      <h3 style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 44, lineHeight: 1.1, margin: "0 0 18px" }}>
        {kapitel1.heading}
      </h3>
      <WavyDivider />
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 36, marginTop: 22, flex: 1, alignItems: "start" }}>
        <div style={{ fontFamily: bodyFont, fontSize: 21, lineHeight: 1.7 }}>
          {kapitel1.paragraphs.map((p, i) => (
            <p key={i} style={{ margin: "0 0 18px" }}>
              {p}
            </p>
          ))}
          <StickyNote style={{ marginTop: 10, transform: "rotate(-1.2deg)" }}>
            Der richtige Hebel liegt nicht in deinem Kopf — er liegt in deinem Umfeld.
          </StickyNote>
        </div>
        <EffortRewardFigure />
      </div>
      <Folio left={kapitel1.folio.left} right={kapitel1.folio.right} />
    </div>
  </Page>
);

export const CForeword: React.FC = () => (
  <Page>
    <div style={{ padding: "68px 66px 46px", height: "100%", display: "flex", flexDirection: "column" }}>
      <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 26, color: tokens.accent, margin: "0 0 12px" }}>
        {foreword.kicker}
      </p>
      <h3 style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 42, lineHeight: 1.1, margin: "0 0 20px", maxWidth: "16ch" }}>
        {foreword.heading}
      </h3>
      <div style={{ fontFamily: bodyFont, fontSize: 21, lineHeight: 1.65, maxWidth: "56ch" }}>
        {foreword.intro.map((p, i) => (
          <p key={i} style={{ margin: "0 0 14px" }}>
            {p}
          </p>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
        {foreword.steps.map((s, i) => (
          <div key={s.n} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: tokens.card,
                  border: `2px solid ${tokens.accent}`,
                  color: tokens.accent,
                  fontFamily: displayFont,
                  fontWeight: 700,
                  fontSize: 19,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {s.n}
              </span>
              {i < foreword.steps.length - 1 && (
                <span style={{ width: 2, flex: 1, minHeight: 14, background: tokens.line, marginTop: 4 }} />
              )}
            </div>
            <div style={{ paddingBottom: 4 }}>
              <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 22, margin: "4px 0 4px", color: tokens.ink }}>
                {s.label}
              </p>
              <p style={{ fontFamily: bodyFont, fontSize: 17, opacity: 0.8, margin: 0, lineHeight: 1.5 }}>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
      <Folio left={foreword.folio.left} right={foreword.folio.right} />
    </div>
  </Page>
);

export const CTOC: React.FC = () => (
  <Page>
    <div style={{ padding: "70px 66px 46px", height: "100%", display: "flex", flexDirection: "column" }}>
      <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 26, color: tokens.accent, margin: "0 0 12px" }}>
        {toc.kicker}
      </p>
      <h3 style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 44, margin: "0 0 16px" }}>{toc.heading}</h3>
      <WavyDivider />
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 22 }}>
        {toc.parts.map((part) => (
          <div key={part.part}>
            <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 20, color: tokens.accent, margin: "0 0 8px" }}>
              {part.part}
            </p>
            {part.entries.map((e) => (
              <div key={e.title} style={{ display: "flex", alignItems: "baseline", gap: 10, fontFamily: bodyFont, fontSize: 20, padding: "4px 0" }}>
                <span>{e.title}</span>
                <span style={{ flex: 1, borderBottom: `1.5px dotted ${tokens.accent2}`, transform: "translateY(-5px)" }} />
                <span style={{ fontFamily: handFont, fontWeight: 700, fontSize: 18, opacity: 0.7 }}>{e.page}</span>
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
    <p style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 26, margin: 0, color: tokens.accent }}>{value}</p>
    <p style={{ fontFamily: bodyFont, fontSize: 13, opacity: 0.65, margin: "4px 0 0" }}>{label}</p>
  </div>
);

export const CRecipe: React.FC = () => (
  <Page>
    <div style={{ padding: "60px 66px 44px", height: "100%", display: "flex", flexDirection: "column" }}>
      <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 24, color: tokens.accent, margin: "0 0 10px" }}>
        {recipe.kicker}
      </p>
      <h3 style={{ fontFamily: displayFont, fontWeight: 800, fontSize: 42, margin: "0 0 12px" }}>{recipe.heading}</h3>
      <p style={{ fontFamily: bodyFont, fontStyle: "italic", fontSize: 18, lineHeight: 1.55, opacity: 0.85, maxWidth: "58ch", margin: "0 0 22px" }}>
        {recipe.subheading}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 34, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          <div style={{ background: tokens.card, border: `1.5px dashed ${tokens.accent2}`, borderRadius: 16, padding: 20, display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(-1deg)" }}>
            <Img src={staticFile(recipe.productImage)} style={{ width: 160, height: 160, objectFit: "contain" }} />
          </div>
          <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 16, opacity: 0.75, textAlign: "center", margin: 0 }}>
            {recipe.productLabel}
          </p>
          <div style={{ display: "flex", gap: 18, background: tokens.card, border: `1px solid ${tokens.line}`, borderRadius: 12, padding: "12px 6px", width: "100%", justifyContent: "center" }}>
            <NutritionFact label="Kcal" value={String(recipe.nutrition.kcal)} />
            <NutritionFact label="Protein" value={`${recipe.nutrition.protein}g`} />
            <NutritionFact label="Kh" value={`${recipe.nutrition.carbs}g`} />
            <NutritionFact label="Fett" value={`${recipe.nutrition.fat}g`} />
          </div>
          <p style={{ fontFamily: bodyFont, fontSize: 14, opacity: 0.65, margin: 0 }}>
            {recipe.servings} · {recipe.time}
          </p>
        </div>

        <div>
          <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 20, color: tokens.accent, margin: "0 0 10px" }}>Zutaten</p>
          <ul style={{ margin: "0 0 20px", padding: 0, listStyle: "none" }}>
            {recipe.ingredients.map((ing) => (
              <li key={ing} style={{ fontFamily: bodyFont, fontSize: 17, lineHeight: 1.55, marginBottom: 8, paddingLeft: 20, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: tokens.accent2 }}>•</span>
                {ing}
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 20, color: tokens.accent, margin: "0 0 10px" }}>Zubereitung</p>
          <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {recipe.steps.map((step, i) => (
              <li key={step} style={{ fontFamily: bodyFont, fontSize: 17, lineHeight: 1.55, marginBottom: 10, paddingLeft: 32, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, top: -1, width: 22, height: 22, borderRadius: "50%", background: tokens.accent, color: tokens.card, fontFamily: handFont, fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div style={{ marginTop: 26 }}>
        <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 20, color: tokens.accent, margin: "0 0 14px" }}>
          {recipe.alternativesLabel}
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {recipe.alternatives.map((alt, i) => (
            <div
              key={alt.key}
              style={{
                flex: 1,
                background: tokens.card,
                border: `1px solid ${tokens.line}`,
                borderRadius: 10,
                padding: "14px 10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                position: "relative",
                transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)`,
                boxShadow: "0 8px 14px -10px rgba(59,46,36,0.35)",
              }}
            >
              <Tape style={{ top: -10, left: "50%", marginLeft: -42, transform: "rotate(-4deg)" }} />
              <Img src={staticFile(alt.image)} style={{ width: 64, height: 64, objectFit: "contain" }} />
              <p style={{ fontFamily: handFont, fontWeight: 700, fontSize: 14, textAlign: "center", margin: 0, opacity: 0.8 }}>
                {alt.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Folio left="Kapitel 10" right="79" />
    </div>
  </Page>
);
