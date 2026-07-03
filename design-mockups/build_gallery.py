import base64, pathlib

OUT = pathlib.Path("/Users/dayo/heisshunger-ebook/remotion/out")
DEST = pathlib.Path("/Users/dayo/heisshunger-ebook/design-mockups/remotion-comparison.html")

def b64(name):
    data = (OUT / f"{name}.png").read_bytes()
    return base64.b64encode(data).decode("ascii")

STANDARD_PAGES = [
    ("cover", "Cover"),
    ("toc", "Inhaltsverzeichnis"),
    ("foreword", "Vorwort"),
    ("von-chris", "Auftakt, Seite 1"),
    ("kapitel1", "Kapitel 1, Seite 1"),
    ("recipe", "Rezept: Proteingrießpudding"),
]

D_PAGES = [
    ("cover", "Cover"),
    ("toc", "Inhaltsverzeichnis"),
    ("foreword", "Vorwort"),
    ("chapter-divider", "Kapitel-Trenner"),
    ("von-chris", "Auftakt, Seite 1"),
    ("kapitel1", "Kapitel 1, Seite 1"),
    ("recipe", "Rezept: Proteingrießpudding"),
]

ALL_DIRS = {"a": STANDARD_PAGES, "b": STANDARD_PAGES, "c": STANDARD_PAGES, "d": D_PAGES}

images = {
    f"{prefix}-{page_id}": b64(f"{prefix}-{page_id}")
    for prefix, pages in ALL_DIRS.items()
    for page_id, _ in pages
}

HEAD = """<title>Heißhunger — Remotion Design-Vergleich</title>
<style>
  :root{
    --stage-bg:#EDEEF0; --stage-panel:#FFFFFF; --stage-ink:#1C1E22;
    --stage-muted:#6B7078; --stage-line:#D6D8DC; --stage-accent:#3D5AFE;
  }
  @media (prefers-color-scheme: dark){
    :root{ --stage-bg:#131417; --stage-panel:#1B1D22; --stage-ink:#EDEEF2;
      --stage-muted:#9195A0; --stage-line:#2C2F36; --stage-accent:#7C93FF; }
  }
  :root[data-theme="dark"]{ --stage-bg:#131417; --stage-panel:#1B1D22; --stage-ink:#EDEEF2;
    --stage-muted:#9195A0; --stage-line:#2C2F36; --stage-accent:#7C93FF; }
  :root[data-theme="light"]{ --stage-bg:#EDEEF0; --stage-panel:#FFFFFF; --stage-ink:#1C1E22;
    --stage-muted:#6B7078; --stage-line:#D6D8DC; --stage-accent:#3D5AFE; }

  *{box-sizing:border-box;}
  body{ margin:0; background:var(--stage-bg); color:var(--stage-ink);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; -webkit-font-smoothing:antialiased; }

  .stage{max-width:1400px;margin:0 auto;padding:48px 32px 96px;}
  .stage-header{margin-bottom:56px;}
  .stage-header .eyebrow{ font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;
    color:var(--stage-accent);font-weight:700;margin:0 0 10px; }
  .stage-header h1{font-size:clamp(1.7rem,3vw,2.3rem);margin:0 0 12px;text-wrap:balance;letter-spacing:-.01em;}
  .stage-header p{max-width:66ch;color:var(--stage-muted);line-height:1.6;margin:0;font-size:.98rem;}

  .direction{margin-bottom:80px;}
  .direction.featured{
    border:1px solid var(--stage-accent); border-radius:12px; padding:28px 28px 8px; margin-bottom:96px;
  }
  .direction-head{ display:flex;align-items:baseline;gap:16px;flex-wrap:wrap;
    border-top:1px solid var(--stage-line);padding-top:20px;margin-bottom:24px; }
  .direction.featured .direction-head{ border-top:none; padding-top:0; }
  .direction-head .tag{ font-family:ui-monospace,"SF Mono","Cascadia Mono",Consolas,monospace;
    font-size:.78rem;color:var(--stage-panel);background:var(--stage-ink);
    padding:3px 9px;border-radius:3px;font-weight:600;letter-spacing:.02em; }
  .direction.featured .tag{ background:var(--stage-accent); }
  .direction-head h2{font-size:1.15rem;margin:0;font-weight:700;}
  .direction-head .desc{color:var(--stage-muted);font-size:.9rem;margin-left:auto;max-width:48ch;line-height:1.5;}
  .badge{ font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;font-weight:700;
    color:var(--stage-accent);border:1px solid var(--stage-accent);border-radius:99px;padding:2px 10px; }

  .pages-row{ display:flex;gap:28px;overflow-x:auto;padding:8px 4px 20px; scroll-snap-type:x proximity; }
  .page-slot{scroll-snap-align:start;flex:0 0 auto;display:flex;flex-direction:column;gap:10px;}
  .page-caption{ font-size:.72rem;color:var(--stage-muted);text-align:center;
    letter-spacing:.03em;text-transform:uppercase;font-weight:600; }
  .book-page{ width:300px;border-radius:2px;overflow:hidden;flex-shrink:0;
    box-shadow:0 1px 2px rgba(0,0,0,.08),0 18px 34px -18px rgba(0,0,0,.45); }
  .book-page img{display:block;width:100%;height:auto;}

  .stage-footer{ border-top:1px solid var(--stage-line);padding-top:20px;color:var(--stage-muted);
    font-size:.82rem;line-height:1.6;max-width:70ch; }
  .stage-footer strong{color:var(--stage-ink);}

  @media (max-width:720px){
    .direction-head{flex-direction:column;align-items:flex-start;}
    .direction-head .desc{margin-left:0;}
    .book-page{width:250px;}
  }
</style>
"""

def page_slot(img_key, caption):
    return f"""
      <div class="page-slot">
        <div class="book-page"><img src="data:image/png;base64,{images[img_key]}" alt="{caption}"></div>
        <p class="page-caption">{caption}</p>
      </div>"""

def direction_section(letter, name, desc, prefix, featured=False):
    pages = ALL_DIRS[prefix]
    slots = "".join(page_slot(f"{prefix}-{page_id}", caption) for page_id, caption in pages)
    cls = "direction featured" if featured else "direction"
    badge = '<span class="badge">Haupt-Richtung</span>' if featured else ""
    return f"""
  <section class="{cls}" data-dir="{letter.lower()}">
    <div class="direction-head">
      <span class="tag">{letter}</span>
      <h2>{name}</h2>
      {badge}
      <span class="desc">{desc}</span>
    </div>
    <div class="pages-row">{slots}
    </div>
  </section>
"""

body = f"""
<div class="stage">
  <div class="stage-header">
    <p class="eyebrow">Heißhunger — E-Book · Design-Vergleich (Remotion-Render)</p>
    <h1>Vier Richtungen, echte Schriften, echtes Rendering</h1>
    <p>Gerendert mit Remotion (React → Chromium) als PNG-Stills, mit echten Google Fonts. <strong>D</strong> ist die aktuelle Haupt-Richtung: neutrales Weiß, an die More-Nutrition-Markenfarben angelehnt (Amber #FFB800, Ink #141618), inkl. vollflächiger Kapitel-Trenner-Seite und Rezeptformat mit echter Nährwert-Tabelle, Tag-Badges und Prep/Cook-Leiste — angelehnt an das Referenzformat von Greg Doucettes Anabolic Cookbook. A/B/C bleiben als Bonus-Design-Ansätze.</p>
  </div>
"""

body += direction_section(
    "D", "More-Branded Clean",
    "Archivo (schwer) als Headline, Manrope als Fließschrift, reinweißer Hintergrund, Amber &amp; Near-Black nach More Nutrition.",
    "d",
    featured=True,
)
body += direction_section(
    "A", "Ruhig &amp; Editorial",
    "Source Serif 4 als Headline, Public Sans als Fließschrift, gedecktes Petrolgrün, viel Weißraum.",
    "a",
)
body += direction_section(
    "B", "Bold Coach",
    "Anton (schwer, kondensiert) plus Barlow und IBM Plex Mono für Captions — near-black, Kobaltblau, Amber.",
    "b",
)
body += direction_section(
    "C", "Warm &amp; Human",
    "Baloo 2 (rund) als Headline, Lora als warme Serif-Fließschrift, Caveat für handschriftliche Notizen.",
    "c",
)

body += """
  <div class="stage-footer">
    <p><strong>Hinweis:</strong> Gerendert mit Remotion (<code>npx remotion still</code>) aus React-Komponenten in <code>remotion/src/directions/</code>. Sobald der Text für alle 11 Kapitel + Anhang steht, rendern wir das komplette 30–40-Seiten-Buch in Richtung D.</p>
  </div>
</div>
"""

DEST.write_text(HEAD + body)
print("wrote", DEST, DEST.stat().st_size, "bytes")
