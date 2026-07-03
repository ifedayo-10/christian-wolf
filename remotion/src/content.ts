export const book = {
  eyebrow: "Ein Buch von Christian Wolf",
  title: ["Heiß", "hunger"],
  author: "Christian Wolf",
};

export const coverSubtitles = {
  a: "Warum du nicht schwach bist — und was wirklich hilft",
  b: "Du bist nicht schwach. Du kämpfst nur an der falschen Front.",
  c: "Du bist nicht schwach. Versprochen.",
};

export const vonChris = {
  kicker: "Auftakt · Von Chris",
  heading: "Ich war elf, als ich meine erste Diät gemacht habe",
  paragraphs: [
    "Nicht, weil mir jemand gesagt hat, dass ich abnehmen soll. Sondern weil ich das Gefühl hatte, die Kontrolle über meinen Körper zu verlieren — und Kontrolle, dachte ich, bekommt man durch Verzicht.",
    "Es folgten Jahre, in denen ich mich immer weiter reinsteigerte. Kalorien zählen. Lebensmittel verbieten. Noch strenger werden. Am Ende stand ich kurz vor einer Magersucht — und auf der anderen Seite: Fressattacken, die ich mir nicht erklären konnte.",
    "Ich habe mich geschämt. Ich dachte, mit mir stimmt etwas nicht.",
  ],
  pullquote: "Mein Körper hatte nicht versagt. Er hatte genau das gemacht, was er sollte.",
  folio: { left: "Von Chris", right: "11" },
};

export const kapitel1 = {
  kicker: "Kapitel 1",
  heading: "Der Willenskraft-Mythos",
  paragraphs: [
    "Willenskraft ist der meistüberschätzte Begriff der gesamten Ernährungswelt. Jede Diät, jeder Ratgeber läuft am Ende auf denselben Satz hinaus: Reiß dich einfach zusammen.",
    "Kannst du nicht. Und das ist keine Ausrede — das ist Biologie. Willenskraft funktioniert wie ein Muskel, der schnell ermüdet.",
  ],
  infografikLabel: "Infografik-Platzhalter — Aufwand ↔ Belohnung",
  folio: { left: "Kapitel 1", right: "18" },
};

export const foreword = {
  kicker: "Vorwort",
  heading: "Worum es in diesem Buch geht",
  intro: [
    "Dieses Buch ist kein Diätplan. Es ist eine Anleitung, wie du aufhörst, gegen dich selbst zu kämpfen.",
    "Wir gehen das in vier Schritten an — in der Reihenfolge, die wirklich funktioniert, nicht in der, die am einfachsten klingt.",
  ],
  steps: [
    {
      n: "1",
      label: "Warum Heißhunger entsteht",
      text: "Warum du nicht schwach bist — sondern deine Biologie einfach ihren Job macht.",
    },
    {
      n: "2",
      label: "Was wirklich hilft",
      text: "Umfeld, Protein und clevere Alternativen statt Willenskraft und Verbote.",
    },
    {
      n: "3",
      label: "Umgang mit Fressattacken",
      text: "Ein Notfallplan für den Moment — ohne Scham, ohne Nachbestrafung.",
    },
    {
      n: "4",
      label: "Ein einfacher Alltagsplan",
      text: "Küche, Einkaufsliste, Rezepte, Routinen — alles direkt umsetzbar.",
    },
  ],
  folio: { left: "Vorwort", right: "9" },
};

export const toc = {
  kicker: "Inhalt",
  heading: "Inhaltsverzeichnis",
  parts: [
    { part: "Auftakt", entries: [{ title: "Von Chris", page: 11 }] },
    {
      part: "Teil 1 — Warum",
      entries: [
        { title: "Kapitel 1 — Der Willenskraft-Mythos", page: 18 },
        { title: "Kapitel 2 — Aufwand, Belohnung & Genetik", page: 24 },
        { title: "Kapitel 3 — Fressattacken neu gedacht", page: 30 },
      ],
    },
    {
      part: "Teil 2 — Was hilft",
      entries: [
        { title: "Kapitel 4 — Umfeld schlägt Willen", page: 36 },
        { title: "Kapitel 5 — Der Protein-Trick", page: 44 },
        { title: "Kapitel 6 — Alternativen & Sattmacher", page: 50 },
      ],
    },
    {
      part: "Teil 3 — Fressattacken",
      entries: [
        { title: "Kapitel 7 — Der Notfallplan im Moment", page: 58 },
        { title: "Kapitel 8 — Schwierige Situationen", page: 64 },
      ],
    },
    {
      part: "Teil 4 — Alltag",
      entries: [
        { title: "Kapitel 9 — Küchen-Setup & Einkaufsliste", page: 70 },
        { title: "Kapitel 10 — Sattmacher-Rezepte", page: 78 },
        { title: "Kapitel 11 — Tagesplan & Routinen", page: 88 },
      ],
    },
    {
      part: "Anhang",
      entries: [
        { title: "Trigger-Food-Selbstcheck", page: 94 },
        { title: "Notfall-Karte", page: 96 },
        { title: "Einkaufsliste zum Ausdrucken", page: 98 },
      ],
    },
  ],
};

export const recipe = {
  kicker: "Kapitel 10 · Sattmacher-Rezepte — Held-Rezept",
  heading: "Proteingrießpudding",
  subheading:
    "Warum ausgerechnet ein Pudding, den du erst anrühren musst? Genau deshalb — die Zubereitung ist die Reibung, die dich vom Blindgreifen zur Chipstüte abhält.",
  servings: "1 Portion",
  time: "5 Min. + 3 Min. Quellzeit",
  ingredients: [
    "60 g More Protein Grießpudding (oder neutrales Proteinpulver + 2 EL Grieß)",
    "250 ml heißes Wasser oder Milch",
    "1 Handvoll Beeren, frisch oder tiefgekühlt",
    "1 TL Zimt",
  ],
  steps: [
    "Pulver in einer Schüssel mit der heißen Flüssigkeit verrühren.",
    "3 Minuten quellen lassen, zwischendurch umrühren.",
    "Mit Beeren und Zimt toppen — fertig.",
  ],
  nutrition: { kcal: 210, protein: 35, carbs: 14, fat: 2 },
  productImage: "more-nutrition/griesspudding.png",
  productLabel: "Produktbeispiel: More Protein Grießpudding",
  alternativesLabel: "Weitere Sattmacher für unterwegs",
  alternatives: [
    { key: "riegel", image: "more-nutrition/riegel.png", label: "Süß & unterwegs" },
    { key: "satisbites", image: "more-nutrition/satisbites.png", label: "Cookie-Craving" },
    { key: "chips", image: "more-nutrition/chips.png", label: "Herzhaftes Verlangen" },
    { key: "shake", image: "more-nutrition/shake.png", label: "Shake statt Snack" },
  ],
};
