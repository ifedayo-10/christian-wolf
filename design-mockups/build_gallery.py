import base64, pathlib

OUT = pathlib.Path("/Users/dayo/heisshunger-ebook/remotion/out")
DEST = pathlib.Path("/Users/dayo/heisshunger-ebook/design-mockups/remotion-comparison.html")

def b64(name):
    data = (OUT / f"{name}.png").read_bytes()
    return base64.b64encode(data).decode("ascii")

PAGE_IDS = ["cover", "toc", "foreword", "von-chris", "kapitel1", "recipe"]

images = {
    name: b64(name)
    for prefix in ["a", "b", "c"]
    for name in [f"{prefix}-{p}" for p in PAGE_IDS]
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
  .direction-head{ display:flex;align-items:baseline;gap:16px;flex-wrap:wrap;
    border-top:1px solid var(--stage-line);padding-top:20px;margin-bottom:24px; }
  .direction-head .tag{ font-family:ui-monospace,"SF Mono","Cascadia Mono",Consolas,monospace;
    font-size:.78rem;color:var(--stage-panel);background:var(--stage-ink);
    padding:3px 9px;border-radius:3px;font-weight:600;letter-spacing:.02em; }
  .direction-head h2{font-size:1.15rem;margin:0;font-weight:700;}
  .direction-head .desc{color:var(--stage-muted);font-size:.9rem;margin-left:auto;max-width:48ch;line-height:1.5;}

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

def direction_section(letter, name, desc, prefix):
    return f"""
  <section class="direction" data-dir="{letter.lower()}">
    <div class="direction-head">
      <span class="tag">{letter}</span>
      <h2>{name}</h2>
      <span class="desc">{desc}</span>
    </div>
    <div class="pages-row">{page_slot(f"{prefix}-cover", "Cover")}{page_slot(f"{prefix}-toc", "Inhaltsverzeichnis")}{page_slot(f"{prefix}-foreword", "Vorwort")}{page_slot(f"{prefix}-von-chris", "Auftakt, Seite 1")}{page_slot(f"{prefix}-kapitel1", "Kapitel 1, Seite 1")}{page_slot(f"{prefix}-recipe", "Rezept: Proteingrießpudding")}
    </div>
  </section>
"""

body = f"""
<div class="stage">
  <div class="stage-header">
    <p class="eyebrow">Heißhunger — E-Book · Design-Vergleich (Remotion-Render)</p>
    <h1>Drei Richtungen, echte Schriften, echtes Rendering</h1>
    <p>Gerendert mit Remotion (React → Chromium) als PNG-Stills, mit den echten Google Fonts, die auch im finalen Buch verwendet würden: Source&nbsp;Serif&nbsp;4 / Public&nbsp;Sans (A), Anton / Barlow / IBM&nbsp;Plex&nbsp;Mono (B), Baloo&nbsp;2 / Lora / Caveat (C). Jede Richtung zeigt jetzt sechs Seiten: Cover, Inhaltsverzeichnis, Vorwort (roter Faden), Auftakt „Von Chris“, Kapitel-1-Einstieg und das Held-Rezept Proteingrießpudding — dort mit echten Produktfotos von <a href="https://morenutrition.de" style="color:inherit">morenutrition.de</a> statt Platzhaltern.</p>
  </div>
"""

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
    <p><strong>Hinweis:</strong> Gerendert mit Remotion (<code>npx remotion still</code>) aus React-Komponenten in <code>remotion/src/directions/</code>. Die gleiche Pipeline wird für das finale Buch genutzt — sobald eine Richtung feststeht, bauen wir daraus alle Kapitel-Seiten und rendern sie in einem Rutsch zu PDF-fähigen Stills.</p>
  </div>
</div>
"""

DEST.write_text(HEAD + body)
print("wrote", DEST, DEST.stat().st_size, "bytes")
