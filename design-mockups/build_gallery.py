import base64, pathlib

OUT = pathlib.Path("/Users/dayo/heisshunger-ebook/remotion/out")
DEST = pathlib.Path("/Users/dayo/heisshunger-ebook/design-mockups/remotion-comparison.html")

def b64(name):
    data = (OUT / f"{name}.png").read_bytes()
    return base64.b64encode(data).decode("ascii")

# Reading order for Direction D, the single direction we're finishing.
D_PAGES = [
    ("cover", "Cover"),
    ("toc", "Inhaltsverzeichnis"),
    ("foreword", "Vorwort"),
    ("von-chris", "Auftakt · Von Chris"),
    ("kapitel1", "Kapitel 1 — Der Willenskraft-Mythos"),
    ("kapitel2", "Kapitel 2 — Aufwand, Belohnung & Genetik"),
    ("kapitel3", "Kapitel 3 — Fressattacken neu gedacht"),
    ("chapter-divider", "Teil 2 — Kapitel-Trenner"),
    ("kapitel5", "Kapitel 5 — Der Protein-Trick"),
    ("kapitel6", "Kapitel 6 — Alternativen & Sattmacher"),
    ("recipe", "Kapitel 10 — Rezept: Proteingrießpudding"),
]

PENDING = [
    "Kapitel 4 — Umfeld schlägt Willen",
    "Kapitel 7 — Der Notfallplan im Moment",
    "Kapitel 8 — Schwierige Situationen",
    "Kapitel 9 — Küchen-Setup & Einkaufsliste",
    "Kapitel 11 — Tagesplan & Routinen",
    "Anhang (Trigger-Food-Selbstcheck, Notfall-Karte, Einkaufsliste)",
]

images = {f"d-{page_id}": b64(f"d-{page_id}") for page_id, _ in D_PAGES}

HEAD = """<title>Heißhunger — Richtung D</title>
<style>
  :root{
    --stage-bg:#EDEEF0; --stage-panel:#FFFFFF; --stage-ink:#1C1E22;
    --stage-muted:#6B7078; --stage-line:#D6D8DC; --stage-accent:#FFB800;
  }
  @media (prefers-color-scheme: dark){
    :root{ --stage-bg:#131417; --stage-panel:#1B1D22; --stage-ink:#EDEEF2;
      --stage-muted:#9195A0; --stage-line:#2C2F36; }
  }
  :root[data-theme="dark"]{ --stage-bg:#131417; --stage-panel:#1B1D22; --stage-ink:#EDEEF2;
    --stage-muted:#9195A0; --stage-line:#2C2F36; }
  :root[data-theme="light"]{ --stage-bg:#EDEEF0; --stage-panel:#FFFFFF; --stage-ink:#1C1E22;
    --stage-muted:#6B7078; --stage-line:#D6D8DC; }

  *{box-sizing:border-box;}
  body{ margin:0; background:var(--stage-bg); color:var(--stage-ink);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; -webkit-font-smoothing:antialiased; }

  .stage{max-width:1200px;margin:0 auto;padding:48px 32px 96px;}
  .stage-header{margin-bottom:20px;}
  .stage-header .eyebrow{ font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;
    color:#B8860B;font-weight:700;margin:0 0 10px; }
  .stage-header h1{font-size:clamp(1.7rem,3vw,2.3rem);margin:0 0 12px;text-wrap:balance;letter-spacing:-.01em;}
  .stage-header p{max-width:70ch;color:var(--stage-muted);line-height:1.6;margin:0;font-size:.98rem;}

  .progress{
    display:flex; gap:20px; flex-wrap:wrap; margin:28px 0 48px; padding:20px 22px;
    background:var(--stage-panel); border:1px solid var(--stage-line); border-radius:10px;
  }
  .progress-col{flex:1; min-width:220px;}
  .progress-col h3{font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;margin:0 0 10px;color:var(--stage-muted);}
  .progress-col ul{margin:0;padding-left:18px;font-size:.88rem;line-height:1.7;}
  .progress-col.done ul{color:var(--stage-ink);}
  .progress-col.pending ul{color:var(--stage-muted);}

  .pages{ display:flex; flex-direction:column; gap:56px; }
  .page-row{ display:flex; flex-direction:column; align-items:center; gap:14px; }
  .page-caption{ font-size:.8rem;color:var(--stage-muted);
    letter-spacing:.02em;font-weight:600; }
  .book-page{ width:100%; max-width:620px; border-radius:3px;overflow:hidden;
    box-shadow:0 1px 2px rgba(0,0,0,.08),0 24px 40px -20px rgba(0,0,0,.5); }
  .book-page img{display:block;width:100%;height:auto;}

  .stage-footer{ border-top:1px solid var(--stage-line);padding-top:20px;color:var(--stage-muted);
    font-size:.82rem;line-height:1.6;max-width:70ch;margin-top:40px; }
  .stage-footer strong{color:var(--stage-ink);}
</style>
"""

def page_row(img_key, caption):
    return f"""
    <div class="page-row">
      <div class="book-page"><img src="data:image/png;base64,{images[img_key]}" alt="{caption}"></div>
      <p class="page-caption">{caption}</p>
    </div>"""

body = f"""
<div class="stage">
  <div class="stage-header">
    <p class="eyebrow">Heißhunger — E-Book · Richtung D (More-Branded Clean)</p>
    <h1>Das Buch, in Arbeit — nur noch eine Richtung</h1>
    <p>Reinweißer Hintergrund, More-Nutrition-Farben (Amber #FFB800, Ink #141618), Archivo/Manrope. Text ist echter, gekürzter Inhalt aus Chris' beiden Video-Transkripten (Willenskraft-Mythos, Fressattacken) — keine Stichpunkt-Ausschmückung mehr. Das Cover- und Auftakt-Foto sind bearbeitete Standbilder aus dem Willenskraft-Video (Duoton in den Buchfarben), kein Platzhalter mehr.</p>
  </div>

  <div class="progress">
    <div class="progress-col done">
      <h3>Fertig ({len(D_PAGES)} Seiten)</h3>
      <ul>{"".join(f"<li>{cap}</li>" for _, cap in D_PAGES)}</ul>
    </div>
    <div class="progress-col pending">
      <h3>Noch offen, für 30–40 Seiten</h3>
      <ul>{"".join(f"<li>{p}</li>" for p in PENDING)}</ul>
    </div>
  </div>

  <div class="pages">
    {"".join(page_row(f"d-{page_id}", caption) for page_id, caption in D_PAGES)}
  </div>

  <div class="stage-footer">
    <p><strong>Hinweis:</strong> Gerendert mit Remotion aus <code>remotion/src/directions/d.tsx</code>. Als Nächstes: die restlichen Kapitel + Anhang schreiben und in derselben Pipeline rendern, bis alle 30–40 Seiten stehen.</p>
  </div>
</div>
"""

DEST.write_text(HEAD + body)
print("wrote", DEST, DEST.stat().st_size, "bytes")
