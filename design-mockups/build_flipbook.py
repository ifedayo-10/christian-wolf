import base64, pathlib

OUT = pathlib.Path("/Users/dayo/heisshunger-ebook/remotion/out")
DEST = pathlib.Path("/Users/dayo/heisshunger-ebook/design-mockups/book-viewer.html")

def b64(name):
    data = (OUT / f"{name}.png").read_bytes()
    return base64.b64encode(data).decode("ascii")

PAGES = [
    ("cover", "Cover"),
    ("toc", "Inhaltsverzeichnis"),
    ("foreword", "Vorwort"),
    ("von-chris", "Auftakt · Von Chris"),
    ("kapitel1", "Kapitel 1 — Der Willenskraft-Mythos"),
    ("kapitel2", "Kapitel 2 — Aufwand, Belohnung & Genetik"),
    ("kapitel3", "Kapitel 3 — Fressattacken neu gedacht"),
    ("chapter-divider", "Teil 2"),
    ("kapitel5", "Kapitel 5 — Der Protein-Trick"),
    ("kapitel6", "Kapitel 6 — Alternativen & Sattmacher"),
    ("recipe", "Kapitel 10 — Rezept: Proteingrießpudding"),
]

page_data_js = ",\n".join(
    f'  {{ src: "data:image/png;base64,{b64(f"d-{pid}")}", caption: {caption!r} }}'
    for pid, caption in PAGES
)

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

  .stage{{ perspective: 2400px; perspective-origin: 50% 50%; }}

  .book{{
    position:relative;
    width:min(46vh, 42vw);
    aspect-ratio: 1184 / 1680;
    transform-style:preserve-3d;
  }}

  /* stacked paper edges behind the current page, suggesting remaining pages */
  .book::before, .book::after{{
    content:""; position:absolute; inset:0; background:var(--page-edge); border-radius:2px;
  }}
  .book::before{{ transform: translate(6px,6px); filter:brightness(0.9); z-index:0; }}
  .book::after{{ transform: translate(3px,3px); filter:brightness(0.95); z-index:1; }}

  .page-layer{{
    position:absolute; inset:0; z-index:2;
    border-radius:2px; overflow:hidden;
    box-shadow: 0 30px 60px -20px rgba(0,0,0,0.6);
    background:#fff;
    transform-origin: left center;
    backface-visibility:hidden;
  }}
  .page-layer img{{ display:block; width:100%; height:100%; object-fit:cover; }}

  .page-layer.flipping{{
    transition: transform 0.62s cubic-bezier(.4,.08,.2,1);
  }}
  .page-layer.flip-next{{ transform: rotateY(-170deg); }}
  .page-layer.flip-prev{{ transform-origin: right center; transform: rotateY(170deg); }}

  .shade{{
    position:absolute; inset:0; z-index:3; pointer-events:none; border-radius:2px;
    background:linear-gradient(90deg, rgba(0,0,0,0.16), transparent 18%, transparent 82%, rgba(0,0,0,0.1));
    opacity:0; transition:opacity .62s ease;
  }}
  .shade.active{{ opacity:1; }}

  .controls{{
    display:flex; align-items:center; gap:22px; margin-top:26px;
  }}
  .nav-btn{{
    width:44px; height:44px; border-radius:50%; border:1px solid rgba(255,255,255,0.18);
    background:rgba(255,255,255,0.06); color:var(--ui-ink); font-size:1.2rem; cursor:pointer;
    display:flex; align-items:center; justify-content:center; transition:background .15s, transform .15s;
  }}
  .nav-btn:hover{{ background:rgba(255,255,255,0.14); }}
  .nav-btn:active{{ transform:scale(0.92); }}
  .nav-btn:disabled{{ opacity:.25; cursor:default; }}
  .nav-btn:disabled:hover{{ background:rgba(255,255,255,0.06); }}

  .page-info{{ text-align:center; min-width:260px; }}
  .page-info .caption{{ font-size:.95rem; font-weight:600; }}
  .page-info .counter{{
    font-size:.72rem; color:var(--ui-muted); letter-spacing:.08em; text-transform:uppercase; margin-top:4px;
    font-variant-numeric: tabular-nums;
  }}

  .clickzone{{ position:absolute; top:0; bottom:0; width:38%; z-index:4; cursor:pointer; }}
  .clickzone.left{{ left:0; }}
  .clickzone.right{{ right:0; }}

  .hint{{
    position:fixed; bottom:16px; left:0; right:0; text-align:center; font-size:.72rem; color:var(--ui-muted);
    letter-spacing:.04em;
  }}

  @media (prefers-reduced-motion: reduce){{
    .page-layer.flipping{{ transition:none; }}
  }}
</style>

<div class="topbar">
  <span><strong>Heißhunger</strong> — Richtung D</span>
  <span>Buch-Vorschau</span>
</div>

<div class="stage">
  <div class="book" id="book">
    <div class="clickzone left" id="zoneLeft" aria-label="Vorherige Seite"></div>
    <div class="clickzone right" id="zoneRight" aria-label="Nächste Seite"></div>
    <div class="shade" id="shade"></div>
  </div>
</div>

<div class="controls">
  <button class="nav-btn" id="prevBtn" aria-label="Vorherige Seite">‹</button>
  <div class="page-info">
    <div class="caption" id="caption"></div>
    <div class="counter" id="counter"></div>
  </div>
  <button class="nav-btn" id="nextBtn" aria-label="Nächste Seite">›</button>
</div>

<div class="hint">← → oder Pfeiltasten · Klick auf linke/rechte Seite</div>

<script>
const pages = [
{page_data_js}
];

let current = 0;
let animating = false;
const book = document.getElementById('book');
const shade = document.getElementById('shade');
const caption = document.getElementById('caption');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function makeLayer(index, z) {{
  const layer = document.createElement('div');
  layer.className = 'page-layer';
  layer.style.zIndex = z;
  const img = document.createElement('img');
  img.src = pages[index].src;
  layer.appendChild(img);
  return layer;
}}

function render() {{
  book.querySelectorAll('.page-layer').forEach(el => el.remove());
  const layer = makeLayer(current, 2);
  book.appendChild(layer);
  caption.textContent = pages[current].caption;
  counter.textContent = 'Seite ' + (current + 1) + ' / ' + pages.length;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === pages.length - 1;
}}

function flip(direction) {{
  if (animating) return;
  const targetIndex = current + direction;
  if (targetIndex < 0 || targetIndex >= pages.length) return;
  animating = true;

  const under = makeLayer(targetIndex, 1);
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
  }}, 640);
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
print("wrote", DEST, DEST.stat().st_size, "bytes")
