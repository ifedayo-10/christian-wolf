import base64, pathlib

OUT = pathlib.Path("/Users/dayo/heisshunger-ebook/remotion/out")
DEST = pathlib.Path("/Users/dayo/heisshunger-ebook/design-mockups/book-viewer.html")

def b64(name):
    data = (OUT / f"{name}.png").read_bytes()
    return base64.b64encode(data).decode("ascii")

# (filename stem without "d-", caption) in physical page order 1..35
PAGES = [
    ("01-cover", "Cover"),
    ("02-toc", "Inhaltsverzeichnis"),
    ("03-foreword", "Vorwort"),
    ("04-von-chris", "Auftakt · Von Chris (1/2)"),
    ("05-von-chris2", "Auftakt · Von Chris (2/2)"),
    ("06-part1-divider", "Teil 1 — Warum"),
    ("07-kapitel1", "Kapitel 1 — Der Willenskraft-Mythos"),
    ("08-kapitel2", "Kapitel 2 — Aufwand, Belohnung & Genetik"),
    ("09-kapitel3", "Kapitel 3 — Fressattacken neu gedacht"),
    ("10-kapitel3b", "Kapitel 3 — Übung"),
    ("11-part2-divider", "Teil 2 — Was hilft"),
    ("12-kapitel4", "Kapitel 4 — Umfeld schlägt Willen"),
    ("13-kapitel5", "Kapitel 5 — Der Protein-Trick"),
    ("14-kapitel6", "Kapitel 6 — Alternativen & Sattmacher"),
    ("15-kapitel6b", "Kapitel 6 — Schwer & leicht"),
    ("16-part3-divider", "Teil 3 — Fressattacken"),
    ("17-kapitel7", "Kapitel 7 — Der Notfallplan im Moment"),
    ("18-kapitel8", "Kapitel 8 — Schwierige Situationen"),
    ("19-part4-divider", "Teil 4 — Alltag"),
    ("20-kapitel9a", "Kapitel 9 — Küchen-Setup"),
    ("21-kapitel9b", "Kapitel 9 — Einkaufsliste"),
    ("22-recipe1", "Kapitel 10 — Proteingrießpudding"),
    ("23-recipe2", "Kapitel 10 — Herzhafter Sattmacher-Toast"),
    ("24-recipe3", "Kapitel 10 — Beeren-Overnight-Oats"),
    ("25-kapitel11a", "Kapitel 11 — Wochenstruktur"),
    ("26-kapitel11b", "Kapitel 11 — Morgen- & Abendroutine"),
    ("27-faq", "Häufige Fragen"),
    ("28-anhang-intro", "Anhang"),
    ("29-trigger-check", "Trigger-Food-Selbstcheck"),
    ("30-notfallkarte", "Notfall-Karte"),
    ("31-einkaufsliste", "Einkaufsliste zum Ausdrucken"),
    ("32-pantry", "Baukasten: Sattmacher-Zutaten"),
    ("33-ueber-chris", "Über den Autor"),
    ("34-schlusswort", "Schlusswort"),
    ("35-backmatter", "Weiterlesen"),
]

# Build spreads: page 1 alone, then (2,3), (4,5), ... (34,35)
spreads = [[PAGES[0]]]
i = 1
while i < len(PAGES):
    if i + 1 < len(PAGES):
        spreads.append([PAGES[i], PAGES[i + 1]])
        i += 2
    else:
        spreads.append([PAGES[i]])
        i += 1

def img_entry(stem, caption):
    return f'{{ src: "data:image/png;base64,{b64(f"d-{stem}")}", caption: {caption!r} }}'

spread_js_items = []
for spread in spreads:
    entries = ", ".join(img_entry(stem, cap) for stem, cap in spread)
    spread_js_items.append(f"  [{entries}]")
spreads_js = ",\n".join(spread_js_items)

HTML = f"""<title>Heißhunger — Buch-Vorschau</title>
<style>
  :root{{
    --room-bg-1:#2b2f36; --room-bg-2:#1a1c20;
    --page-edge:#e8e4da; --ui-ink:#EDEEF2; --ui-muted:#9BA0AC; --accent:#FFB800;
  }}
  *{{box-sizing:border-box;}}
  html,body{{height:100%;}}
  body{{
    margin:0; min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06), transparent 60%),
      linear-gradient(180deg, var(--room-bg-1), var(--room-bg-2));
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
    color:var(--ui-ink);
    overflow:hidden;
    -webkit-font-smoothing:antialiased;
  }}

  .topbar{{
    position:fixed; top:0; left:0; right:0; display:flex; align-items:baseline; justify-content:space-between;
    padding:18px 26px; font-size:.78rem; letter-spacing:.06em; text-transform:uppercase; color:var(--ui-muted);
  }}
  .topbar strong{{color:var(--ui-ink); font-weight:700;}}

  .stage{{ perspective: 3200px; perspective-origin: 50% 50%; }}

  .book{{
    position:relative;
    height:min(74vh, 62vw);
    aspect-ratio: 2368 / 1680;
    transform-style:preserve-3d;
  }}
  .book.single{{ aspect-ratio: 1184 / 1680; }}

  .book::before, .book::after{{
    content:""; position:absolute; inset:0; background:var(--page-edge); border-radius:2px;
  }}
  .book::before{{ transform: translate(7px,7px); filter:brightness(0.88); z-index:0; }}
  .book::after{{ transform: translate(3.5px,3.5px); filter:brightness(0.94); z-index:1; }}

  .spine{{
    position:absolute; left:50%; top:0; bottom:0; width:14px; margin-left:-7px; z-index:5; pointer-events:none;
    background:linear-gradient(90deg, rgba(0,0,0,0.22), rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0.22));
  }}
  .book.single .spine{{ display:none; }}

  .page-layer{{
    position:absolute; inset:0; z-index:2;
    border-radius:2px; overflow:hidden;
    box-shadow: 0 34px 70px -24px rgba(0,0,0,0.65);
    background:#fff;
    transform-origin: left center;
    backface-visibility:hidden;
    display:flex;
  }}
  .page-layer img{{ display:block; width:50%; height:100%; object-fit:cover; }}
  .book.single .page-layer img{{ width:100%; }}
  .page-layer .filler{{ width:50%; height:100%; background:#fff; }}

  .page-layer.flipping{{ transition: transform 0.64s cubic-bezier(.4,.08,.2,1); }}
  .page-layer.flip-next{{ transform: rotateY(-170deg); }}
  .page-layer.flip-prev{{ transform-origin: right center; transform: rotateY(170deg); }}

  .shade{{
    position:absolute; inset:0; z-index:3; pointer-events:none; border-radius:2px;
    background:linear-gradient(90deg, rgba(0,0,0,0.16), transparent 12%, transparent 88%, rgba(0,0,0,0.1));
    opacity:0; transition:opacity .64s ease;
  }}
  .shade.active{{ opacity:1; }}

  .controls{{ display:flex; align-items:center; gap:22px; margin-top:26px; }}
  .nav-btn{{
    width:44px; height:44px; border-radius:50%; border:1px solid rgba(255,255,255,0.18);
    background:rgba(255,255,255,0.06); color:var(--ui-ink); font-size:1.2rem; cursor:pointer;
    display:flex; align-items:center; justify-content:center; transition:background .15s, transform .15s;
  }}
  .nav-btn:hover{{ background:rgba(255,255,255,0.14); }}
  .nav-btn:active{{ transform:scale(0.92); }}
  .nav-btn:disabled{{ opacity:.25; cursor:default; }}
  .nav-btn:disabled:hover{{ background:rgba(255,255,255,0.06); }}

  .page-info{{ text-align:center; min-width:320px; }}
  .page-info .caption{{ font-size:.92rem; font-weight:600; }}
  .page-info .counter{{
    font-size:.72rem; color:var(--ui-muted); letter-spacing:.08em; text-transform:uppercase; margin-top:4px;
    font-variant-numeric: tabular-nums;
  }}

  .clickzone{{ position:absolute; top:0; bottom:0; width:36%; z-index:4; cursor:pointer; }}
  .clickzone.left{{ left:0; }}
  .clickzone.right{{ right:0; }}

  .hint{{
    position:fixed; bottom:16px; left:0; right:0; text-align:center; font-size:.72rem; color:var(--ui-muted);
    letter-spacing:.04em;
  }}

  @media (prefers-reduced-motion: reduce){{ .page-layer.flipping{{ transition:none; }} }}
</style>

<div class="topbar">
  <span><strong>Heißhunger</strong> — Richtung D · vollständiges Buch (35 Seiten)</span>
  <span>Buch-Vorschau</span>
</div>

<div class="stage">
  <div class="book" id="book">
    <div class="spine"></div>
    <div class="clickzone left" id="zoneLeft" aria-label="Vorheriges Blatt"></div>
    <div class="clickzone right" id="zoneRight" aria-label="Nächstes Blatt"></div>
    <div class="shade" id="shade"></div>
  </div>
</div>

<div class="controls">
  <button class="nav-btn" id="prevBtn" aria-label="Vorheriges Blatt">‹</button>
  <div class="page-info">
    <div class="caption" id="caption"></div>
    <div class="counter" id="counter"></div>
  </div>
  <button class="nav-btn" id="nextBtn" aria-label="Nächstes Blatt">›</button>
</div>

<div class="hint">← → oder Pfeiltasten · Klick auf linke/rechte Buchhälfte</div>

<script>
const spreads = [
{spreads_js}
];

let current = 0;
let animating = false;
const book = document.getElementById('book');
const shade = document.getElementById('shade');
const caption = document.getElementById('caption');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function buildLayer(index, z) {{
  const spread = spreads[index];
  const layer = document.createElement('div');
  layer.className = 'page-layer';
  layer.style.zIndex = z;
  spread.forEach(p => {{
    const img = document.createElement('img');
    img.src = p.src;
    layer.appendChild(img);
  }});
  if (spread.length === 1) {{
    const filler = document.createElement('div');
    filler.className = 'filler';
    layer.appendChild(filler);
  }}
  return layer;
}}

function render() {{
  book.classList.toggle('single', spreads[current].length === 1);
  book.querySelectorAll('.page-layer').forEach(el => el.remove());
  book.appendChild(buildLayer(current, 2));
  caption.textContent = spreads[current].map(p => p.caption).join('  ·  ');
  counter.textContent = 'Blatt ' + (current + 1) + ' / ' + spreads.length;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === spreads.length - 1;
}}

function flip(direction) {{
  if (animating) return;
  const targetIndex = current + direction;
  if (targetIndex < 0 || targetIndex >= spreads.length) return;
  animating = true;

  book.classList.toggle('single', spreads[targetIndex].length === 1);
  const under = buildLayer(targetIndex, 1);
  book.appendChild(under);

  const top = book.querySelector('.page-layer[style*="z-index: 2"]');
  top.classList.add('flipping');
  shade.classList.add('active');
  requestAnimationFrame(() => {{
    top.classList.add(direction > 0 ? 'flip-next' : 'flip-prev');
  }});

  setTimeout(() => {{
    current = targetIndex;
    animating = false;
    shade.classList.remove('active');
    render();
  }}, 660);
}}

document.getElementById('zoneRight').addEventListener('click', () => flip(1));
document.getElementById('zoneLeft').addEventListener('click', () => flip(-1));
nextBtn.addEventListener('click', () => flip(1));
prevBtn.addEventListener('click', () => flip(-1));
document.addEventListener('keydown', (e) => {{
  if (e.key === 'ArrowRight') flip(1);
  if (e.key === 'ArrowLeft') flip(-1);
}});

render();
</script>
"""

DEST.write_text(HTML)
print("wrote", DEST, DEST.stat().st_size, "bytes", "spreads:", len(spreads))
