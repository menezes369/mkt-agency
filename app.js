const { useState, useEffect, useRef } = React;

// Logo: coloque o arquivo logo.png na pasta public/ do projeto
const LOGO_SRC = "logo.png";
const WHATSAPP_URL = "https://wa.me/5518996241216";

const SERVICOS = [
  { n: "01", titulo: "Social Media", texto: "Posts com personalidade, planejamento organizado e uma audiência engajada.", g: "166,60,240" },
  { n: "02", titulo: "Tráfego Pago", texto: "Anúncios focados em resultado no Meta, Google e TikTok, com cada real bem investido.", g: "255,46,133" },
  { n: "03", titulo: "Criação de Sites", texto: "Páginas ágeis, bem desenhadas e pensadas para gerar contatos no celular ou no computador.", g: "209,43,214" },
  { n: "04", titulo: "Produção de Vídeo", texto: "Reels, vídeos institucionais e animações que capturam a atenção logo no início.", g: "255,95,168" },
  { n: "05", titulo: "Branding", texto: "Visual, voz e posicionamento únicos, que deixam sua marca inconfundível.", g: "124,58,237" },
  { n: "06", titulo: "Design", texto: "Artes, embalagens e materiais impressos com acabamento profissional.", g: "192,38,211" },
];

const FRASES = ["Tráfego pago", "Redes sociais"];

const NUMEROS = [
  { prefix: "+", to: 120, suffix: "", rotulo: "clientes atendidos" },
  { prefix: "+", to: 8, suffix: " anos", rotulo: "de experiência no mercado digital" },
  { prefix: "", to: 24, suffix: "h", rotulo: "para retornar seu contato" },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap');

.rm, .rm * { box-sizing: border-box; }
.rm {
  --ink: #0c0c16;
  --green: #96e84a;
  --cyan: #00c8e6;
  --purple: #9446f0;
  --pink: #ff2e85;
  --orange: #ff8a50;
  --yellow: #ffb614;
  /* tema claro (padrão) */
  --bg: #ffffff;
  --fg: #0c0c16;
  --muted: #4b4b57;
  --line: #0c0c16;
  --edge: #0c0c16;
  --btn-bg: #0c0c16;
  --btn-fg: #ffffff;
  color-scheme: light dark;
  font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;
  color: var(--fg);
  background: var(--bg);
  margin: 0;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
.rm a { color: inherit; text-decoration: none; }

/* tema escuro: segue a configuração do navegador/sistema */
@media (prefers-color-scheme: dark) {
  .rm {
    --bg: #0c0c16;
    --fg: #f5f5fa;
    --muted: #b8b8c6;
    --line: #f5f5fa;
    --edge: #f5f5fa;
    --btn-bg: #ffffff;
    --btn-fg: #0c0c16;
  }
  .rm .rm-hero {
    background-color: #0c0c16;
    background-image:
      radial-gradient(90% 40% at 0% 30%, rgba(0,200,230,.30) 0%, rgba(0,200,230,0) 100%),
      radial-gradient(90% 40% at 100% 95%, rgba(255,46,133,.28) 0%, rgba(255,46,133,0) 100%),
      linear-gradient(180deg, #0c0c16 0%, #101020 55%, #160f1d 100%);
  }
}

.rm .grad {
  /* inline: o gradiente corre pelas linhas como se fosse uma só (verde → azul na 1ª linha, roxo → rosa → laranja → amarelo na 2ª) */
  background: linear-gradient(90deg, #96e84a 0%, #00c8e6 26%, #5b9ee8 38%, #9446f0 50%, #ff2e85 74%, #ff8a50 88%, #ffb614 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
.rm .grad-short {
  background: linear-gradient(90deg, #96e84a 0%, #00c8e6 40%, #9446f0 100%);
  -webkit-background-clip: text; background-clip: text;
  color: transparent; -webkit-text-fill-color: transparent;
}

/* ---------- HERO ---------- */
.rm-hero {
  min-height: 100vh;
  padding: 24px 24px 72px;
  background:
    radial-gradient(120% 55% at 0% 22%, #a6ebf7 0%, rgba(166,235,247,0) 70%),
    linear-gradient(180deg, #f4fdff 0%, #ffffff 55%, #ffe0ec 100%),
    #fff;
  background-image:
    radial-gradient(90% 40% at 0% 30%, rgba(142,229,245,.95) 0%, rgba(142,229,245,0) 100%),
    radial-gradient(90% 40% at 100% 95%, rgba(255,192,218,.95) 0%, rgba(255,192,218,0) 100%),
    linear-gradient(180deg, #f5fdff 0%, #ffffff 50%, #fff2f7 100%);
}
.rm-hero-inner { max-width: 1100px; margin: 0 auto; }
.rm-nav { display: flex; align-items: center; justify-content: space-between; }
.rm-logo { display: flex; align-items: center; gap: 14px; }
.rm-mascote { width: 40px; height: 58px; object-fit: contain; font-size: 40px; line-height: 58px; text-align: center; }
.rm-logo-txt { font-weight: 800; font-size: 31px; letter-spacing: -1.5px; color: var(--cyan); }
.rm-logo-txt span { color: var(--purple); }

.rm-btn {
  display: inline-flex; align-items: center; justify-content: center;
  font-family: inherit; font-weight: 800; font-size: 19px; letter-spacing: -.3px;
  border-radius: 999px; border: 3px solid var(--line);
  padding: 20px 40px; cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease;
}
.rm-btn:focus-visible { outline: 3px solid var(--purple); outline-offset: 3px; }
.rm-btn:hover { transform: translateY(-2px); }
.rm .rm-btn-dark { background: var(--btn-bg); color: var(--btn-fg); border-color: var(--btn-bg); }
.rm .rm-btn-line { background: transparent; color: var(--fg); border-color: var(--line); }
.rm .rm-btn-white { background: #ffffff; color: #0c0c16; border-color: #0c0c16; }
.rm-nav .rm-btn { padding: 15px 28px; font-size: 18px; border-width: 0; }

.rm-pill {
  display: inline-block; margin-top: 90px;
  font-weight: 800; font-size: 17px; letter-spacing: 3px; text-transform: uppercase;
  border: 3px solid var(--line); border-radius: 999px; padding: 15px 24px;
}
.rm-h1 {
  font-weight: 800; font-size: clamp(56px, 15vw, 128px);
  line-height: 1.04; letter-spacing: -0.055em; margin: 32px 0 0;
}
.rm-lead {
  font-weight: 300; font-size: 22px; line-height: 1.75; color: var(--muted);
  margin: 44px 0 0; max-width: 560px; letter-spacing: -.2px;
}
.rm-cta { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; margin-top: 48px; }

/* ---------- CARROSSEL DE FRASES ---------- */
.rm-marquee {
  background: #96e84a;
  border-top: 8px solid var(--edge);
  border-bottom: 8px solid var(--edge);
  overflow: hidden;
  white-space: nowrap;
  display: flex;
}
.rm-marquee-group {
  display: flex; align-items: center; flex-shrink: 0;
  min-width: 100%;
  animation: rm-scroll 28s linear infinite;
}
.rm-marquee-item {
  display: inline-flex; align-items: center;
  font-weight: 800; text-transform: uppercase; letter-spacing: -0.045em;
  font-size: clamp(34px, 8.5vw, 72px); line-height: 1;
  color: #0c0c16;
  padding: 22px 0;
}
.rm-marquee-item::after {
  content: ""; display: inline-block; flex-shrink: 0;
  width: 0.5em; height: 0.5em; background: #9446f0;
  transform: rotate(45deg);
  margin: 0 clamp(36px, 8vw, 80px);
}
@keyframes rm-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}
@media (prefers-reduced-motion: reduce) {
  .rm-marquee-group { animation: none; }
}

/* ---------- SERVIÇOS ---------- */
.rm-serv { padding: 60px 24px 90px; background: var(--bg); }
.rm-serv-inner { max-width: 1100px; margin: 0 auto; }
.rm-h2 {
  font-weight: 800; font-size: clamp(46px, 12vw, 92px);
  line-height: 1.12; letter-spacing: -0.05em; margin: 0 0 80px;
}
.rm-cards { display: grid; gap: 28px; grid-template-columns: 1fr; }
.rm-card {
  border: 6px solid var(--line); border-radius: 56px;
  padding: 56px 44px 52px; min-height: 280px;
}
.rm-card-n { font-weight: 800; font-size: 20px; letter-spacing: 0; margin: 0 0 54px; }
.rm-card h3 { font-weight: 800; font-size: 36px; letter-spacing: -1.2px; margin: 0 0 24px; line-height: 1.15; }
.rm-card p { font-weight: 400; font-size: 22px; line-height: 1.5; margin: 0; opacity: .8; letter-spacing: -.3px; }

/* ---------- NÚMEROS ---------- */
.rm-nums { background: #0c0c16; color: #fff; padding: 100px 24px 110px; }
.rm-nums-inner { max-width: 1100px; margin: 0 auto; display: grid; gap: 64px; grid-template-columns: 1fr; }
.rm-num-v {
  font-weight: 800; font-size: clamp(88px, 22vw, 140px);
  letter-spacing: -0.04em; line-height: 1; margin: 0;
  background: linear-gradient(90deg, #96e84a 0%, #00c8e6 45%, #9446f0 80%, #ff2e85 100%);
  -webkit-background-clip: text; background-clip: text;
  color: transparent; -webkit-text-fill-color: transparent;
  display: inline-block;
}
.rm-num-l { font-weight: 400; font-size: 25px; margin: 14px 0 0; color: #d6d6e0; letter-spacing: -.3px; }

/* ---------- CTA FINAL ---------- */
.rm-gap { height: 60px; background: var(--bg); }
.rm-final {
  /* a seção colorida mantém texto e botões escuros nos dois temas */
  --fg: #0c0c16; --line: #0c0c16; --btn-bg: #0c0c16; --btn-fg: #ffffff;
  color: var(--fg);
  border-top: 6px solid var(--edge);
  min-height: 100vh; padding: 130px 24px 140px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
  background: linear-gradient(155deg, #96e84a 0%, #00d4c8 38%, #00c4f0 55%, #7c8cf0 80%, #9446f0 100%);
}
.rm-final h2 {
  font-weight: 800; font-size: clamp(56px, 14vw, 108px);
  line-height: 1.12; letter-spacing: -0.055em; margin: 0; max-width: 900px;
}
.rm-final p {
  font-weight: 300; font-size: 24px; line-height: 1.6; margin: 48px 0 0;
  max-width: 560px; letter-spacing: -.3px;
}
.rm-final-btns { display: flex; flex-direction: column; align-items: center; gap: 28px; margin-top: 64px; width: 100%; }
.rm-final .rm-btn { max-width: 100%; }
.rm-final .email { font-size: clamp(17px, 4.6vw, 22px); padding: 26px 44px; width: min(100%, 520px); }

@media (min-width: 820px) {
  .rm-hero { padding: 32px 56px 110px; }
  .rm-serv { padding: 100px 56px 130px; }
  .rm-cards { grid-template-columns: repeat(2, 1fr); }
  .rm-nums { padding: 130px 56px; }
  .rm-nums-inner { grid-template-columns: repeat(3, 1fr); }
  .rm-final { padding: 160px 56px; }
  .rm-final-btns { flex-direction: row; flex-wrap: wrap; justify-content: center; }
  .rm-cta { flex-direction: row; }
}
@media (prefers-reduced-motion: reduce) {
  .rm-btn { transition: none; }
}

/* ===== UX/UI v2 (glass escuro) ===== */
.rm { --accent: #7b2ff0; --glass: rgba(255,255,255,.78); --ease: cubic-bezier(.2,.7,.2,1); --mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace; }
@media (prefers-color-scheme: dark) { .rm { --accent: #96e84a; --glass: rgba(16,16,28,.74); } }
.rm :focus-visible { outline: 3px solid var(--purple); outline-offset: 3px; border-radius: 12px; }
.rm section, .rm header { scroll-margin-top: 84px; }

/* barra de progresso + barra flutuante + botão WhatsApp */
.rm-progress { position: fixed; inset: 0 0 auto 0; height: 5px; z-index: 60; transform-origin: 0 50%; transform: scaleX(0); will-change: transform;
  background: linear-gradient(90deg,#96e84a,#00c8e6,#9446f0,#ff2e85,#ffb614); }
.rm-top { position: fixed; z-index: 50; top: calc(14px + env(safe-area-inset-top,0px)); left: 14px; right: 14px; max-width: 1100px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; padding: 8px 8px 8px 18px; border-radius: 999px;
  background: var(--glass); backdrop-filter: blur(16px) saturate(1.4); -webkit-backdrop-filter: blur(16px) saturate(1.4);
  border: 2px solid var(--line); transform: translateY(-170%); transition: transform .45s var(--ease); }
.rm-top.on { transform: none; }
.rm-top .rm-logo-txt { font-size: 24px; }
.rm-top .rm-mascote { width: 28px; height: 36px; font-size: 26px; line-height: 36px; }
.rm-top .rm-btn { padding: 12px 22px; font-size: 16px; border-width: 0; }
.rm .rm-fab { position: fixed; z-index: 50; right: 16px; bottom: calc(16px + env(safe-area-inset-bottom,0px)); display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 20px; border-radius: 999px; background: #96e84a; color: #0c0c16; border: 3px solid #0c0c16; font-weight: 800; font-size: 16px;
  box-shadow: 4px 5px 0 #0c0c16; transform: translateY(170%); transition: transform .45s var(--ease), box-shadow .2s; }
.rm .rm-fab.on { transform: none; }
.rm .rm-fab:hover { box-shadow: 6px 8px 0 #0c0c16; }

/* hero: aurora, grão, entrada, mascote */
.rm-hero { position: relative; overflow: hidden; isolation: isolate; }
.rm-hero-inner { position: relative; z-index: 1; }
.rm-blob { position: absolute; z-index: -1; border-radius: 50%; filter: blur(70px); opacity: .55; pointer-events: none; animation: rm-drift 16s ease-in-out infinite alternate; }
.rm-blob.a { width: 60vw; height: 60vw; max-width: 620px; max-height: 620px; left: -18%; top: 6%; background: #00c8e6; }
.rm-blob.b { width: 55vw; height: 55vw; max-width: 560px; max-height: 560px; right: -20%; bottom: -6%; background: #ff2e85; animation-delay: -5s; }
.rm-blob.c { width: 40vw; height: 40vw; max-width: 420px; max-height: 420px; right: 8%; top: 18%; background: #96e84a; opacity: .4; animation-delay: -9s; }
@keyframes rm-drift { from { transform: translate3d(0,0,0) scale(1); } to { transform: translate3d(6%,-8%,0) scale(1.15); } }
.rm-hero::after { content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: .07; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }
.rm-hero [data-in] { animation: rm-rise .9s var(--ease) both; animation-delay: var(--d, 0ms); }
@keyframes rm-rise { from { opacity: 0; transform: translateY(26px); } }
.rm-hero-grid { display: grid; gap: 40px; align-items: center; }
.rm-art { position: relative; display: grid; place-items: center; min-height: 300px; }
.rm-art img { 
  position: relative; 
  width: min(78%, 420px); 
  height: auto; 
  animation: rm-float 6s ease-in-out infinite; 
  filter: drop-shadow(0 30px 40px rgba(12,12,22,.25)); 
  border: none !important;
  outline: none !important;
  background: transparent !important;
}

.rm-art-emoji { position: relative; font-size: clamp(150px, 38vw, 280px); line-height: 1; animation: rm-float 6s ease-in-out infinite; }
.rm-art-glow { position: absolute; width: 80%; aspect-ratio: 1; border-radius: 50%; filter: blur(50px); opacity: .45; animation: rm-spin 22s linear infinite;
  background: conic-gradient(from 90deg,#96e84a,#00c8e6,#9446f0,#ff2e85,#ffb614,#96e84a); }
@keyframes rm-float { 50% { transform: translateY(-14px) rotate(1.5deg); } }
@keyframes rm-spin { to { transform: rotate(360deg); } }
.rm-pill { display: inline-flex; align-items: center; gap: 12px; }
.rm-dot { width: 12px; height: 12px; border-radius: 50%; background: #96e84a; animation: rm-ping 2s infinite; }
@keyframes rm-ping { 0% { box-shadow: 0 0 0 0 rgba(150,232,74,.8); } 70%,100% { box-shadow: 0 0 0 12px rgba(150,232,74,0); } }
.rm-hero-foot { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-top: 64px; padding-top: 22px;
  border-top: 2px dashed rgba(128,128,140,.4); font-family: var(--mono); font-size: 13px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); }
.rm-cue { display: inline-flex; align-items: center; gap: 12px; }
.rm-cue i { display: block; width: 2px; height: 34px; background: currentColor; transform-origin: top; animation: rm-cue 1.8s var(--ease) infinite; }
@keyframes rm-cue { 0% { transform: scaleY(0); } 50% { transform: scaleY(1); } 100% { transform: scaleY(1); opacity: 0; } }

/* botões com seta, faixa inclinada, rótulos mono */
.rm-btn .ar { display: inline-block; margin-left: 12px; transition: transform .25s var(--ease); }
.rm-btn:hover .ar { transform: translate(3px,-3px); }
.rm-btn:hover .ar.down { transform: translateY(4px); }
.rm-btn:active { transform: scale(.97); }
.rm-marquee { transform: rotate(-1.6deg) scale(1.05); margin: 34px 0; position: relative; z-index: 2; border-width: 6px; }
.rm-eyebrow { display: block; margin: 0 0 22px; font-family: var(--mono); font-weight: 500; font-size: 14px; letter-spacing: .18em; text-transform: uppercase; color: var(--accent); }
.rm-nums .rm-eyebrow { color: #96e84a; max-width: 1100px; margin: 0 auto 48px; }
.rm-final .rm-eyebrow { color: #0c0c16; }

/* reveal ao rolar */
.rm [data-reveal] { opacity: 0; transform: translateY(32px); transition: opacity .7s var(--ease), transform .7s var(--ease); transition-delay: var(--d, 0ms); }
.rm [data-reveal].in { opacity: 1; transform: none; }

/* cards de serviço */
.rm-card { position: relative; display: block; box-shadow: 0 0 0 var(--line); }
.rm .rm-card[data-reveal].in { transition: transform .35s var(--ease), box-shadow .35s var(--ease), opacity .7s; transition-delay: 0ms; }
.rm .rm-card[data-reveal].in:hover { transform: translateY(-8px) rotate(-.6deg); box-shadow: 10px 14px 0 var(--line); }
.rm-card-go { position: absolute; top: 36px; right: 36px; width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center;
  font-size: 26px; font-weight: 800; background: #0c0c16; color: #fff; transition: transform .35s var(--ease); }
.rm-card.dark .rm-card-go { background: #fff; color: #0c0c16; }
.rm-card:hover .rm-card-go { transform: rotate(45deg) scale(1.08); }

/* números */
.rm-nums { background-image: radial-gradient(55% 60% at 90% 0%, rgba(148,70,240,.38), transparent 70%), radial-gradient(50% 55% at 0% 100%, rgba(0,200,230,.28), transparent 70%); }
.rm-num { border-top: 2px solid rgba(255,255,255,.16); padding-top: 28px; }
.rm-num-v { font-variant-numeric: tabular-nums; }

/* CTA final animado + rodapé */
.rm-final { background-size: 200% 200%; animation: rm-shift 14s ease-in-out infinite alternate; }
@keyframes rm-shift { to { background-position: 100% 100%; } }
.rm-foot { background: #0c0c16; color: #fff; padding: 80px 24px 36px; overflow: hidden; }
.rm-foot-in { max-width: 1100px; margin: 0 auto; }
.rm-foot-word { display: block; font-weight: 800; font-size: clamp(64px, 21vw, 250px); letter-spacing: -.06em; line-height: .9; white-space: nowrap;
  color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,.28); }
.rm-foot-word:hover { background: linear-gradient(90deg,#96e84a,#00c8e6,#9446f0,#ff2e85,#ffb614); -webkit-background-clip: text; background-clip: text; -webkit-text-stroke-color: transparent; }
.rm-foot-row { display: flex; flex-wrap: wrap; gap: 18px 32px; justify-content: space-between; align-items: center; margin-top: 56px; padding-top: 28px;
  border-top: 1px solid rgba(255,255,255,.16); font-size: 16px; color: #b8b8c6; }
.rm-foot-row nav { display: flex; gap: 26px; flex-wrap: wrap; }
.rm-foot-row a:hover { color: #96e84a; }

/* responsivo */
@media (max-width: 819px) {
  .rm-cards { gap: 20px; }
  .rm-card { position: sticky; top: calc(92px + var(--i,0) * 14px); }
  .rm-card-go { top: 28px; right: 28px; width: 48px; height: 48px; }
  .rm-hero-foot { margin-top: 44px; font-size: 11px; }
}
@media (min-width: 820px) { .rm-foot { padding: 110px 56px 44px; } }
@media (min-width: 1000px) {
  .rm-hero-inner { max-width: 1240px; }
  .rm-hero-grid { grid-template-columns: 1.3fr .7fr; }
  .rm-hero-grid .rm-h1 { font-size: clamp(64px, 7.4vw, 108px); }
  .rm-pill { margin-top: 70px; }
}
@media (min-width: 1180px) {
  .rm-cards { grid-template-columns: repeat(3, 1fr); }
  .rm-card { padding: 48px 40px; }
  .rm-card h3 { font-size: 32px; }
  .rm-card-go { top: 30px; right: 30px; }
}
@media (prefers-color-scheme: dark) {
  .rm-blob { opacity: .32; }
  .rm-hero::after { mix-blend-mode: screen; opacity: .05; }
  .rm-art img { filter: drop-shadow(0 30px 50px rgba(0,0,0,.6)); }
}
@media (prefers-reduced-motion: reduce) {
  .rm *, .rm *::before, .rm *::after { animation: none !important; transition: none !important; }
  .rm [data-reveal] { opacity: 1; transform: none; }
}
/* ===== ESTÉTICA "GLASS ESCURO" · roxo + rosa (sempre escuro) ===== */
.rm {
  color-scheme: dark;
  --bg: #050506; --fg: #f3f3f5; --muted: #8d8d99;
  --line: rgba(255,255,255,.14); --edge: rgba(255,255,255,.12);
  --btn-bg: #17171a; --btn-fg: #fff; --accent: #d9a6ff; --glass: rgba(18,18,20,.72);
  --panel: linear-gradient(180deg,#1c1c1f 0%,#121214 100%);
  --rim: inset 0 1px 0 rgba(255,255,255,.07), 0 30px 60px rgba(0,0,0,.45);
  --pp: #a63cf0; --pk: #ff2e85;
}
.rm ::selection { background: #a63cf0; color: #fff; }
.rm .grad { background: linear-gradient(90deg,#b57bff 0%,#a63cf0 28%,#e04fd0 55%,#ff4fa3 80%,#ff8fb8 100%); -webkit-background-clip: text; background-clip: text; }
.rm .grad-short { background: linear-gradient(90deg,#b57bff,#e04fd0 55%,#ff4fa3); -webkit-background-clip: text; background-clip: text; }
.rm .rm-logo-txt { color: #ff5fa8; }
.rm .rm-logo-txt span { color: #b57bff; }
.rm .rm-progress { background: linear-gradient(90deg,#a63cf0,#d12bd6,#ff2e85); }

/* botões: pílula com brilho roxo e traço lateral */
.rm .rm-btn { border-width: 1px; font-weight: 500; letter-spacing: -.1px; position: relative; }
.rm .rm-btn-dark, .rm .rm-fab {
  color: #fff; border: 1px solid rgba(255,255,255,.28);
  background: linear-gradient(100deg, rgba(196,64,248,.95) 0%, rgba(132,42,196,.6) 55%, rgba(48,22,70,.65) 100%), #17171a;
  box-shadow: 0 0 34px rgba(176,38,255,.38), inset 0 1px 0 rgba(255,255,255,.2);
}
.rm .rm-btn-dark:hover { box-shadow: 0 0 48px rgba(255,46,133,.45), inset 0 1px 0 rgba(255,255,255,.25); }
.rm .rm-btn-line { background: transparent; color: #f3f3f5; border-color: rgba(255,255,255,.18); }
.rm .rm-btn-line:hover { border-color: #ff5fa8; }
.rm .rm-btn-white { background: rgba(255,255,255,.05); color: #f3f3f5; border-color: rgba(255,255,255,.16); }
.rm .rm-btn-white:hover { border-color: #b57bff; }
.rm .rm-cta .rm-btn-dark::before, .rm .rm-final-btns .rm-btn-dark::before {
  content: ""; position: absolute; left: -16px; top: 50%; width: 3px; height: 20px; margin-top: -10px; border-radius: 3px;
  background: linear-gradient(#ff4fa3,#a63cf0); box-shadow: 0 0 14px #d12bd6;
}
.rm .rm-fab { box-shadow: 0 0 30px rgba(176,38,255,.5), inset 0 1px 0 rgba(255,255,255,.2); }
.rm .rm-fab:hover { box-shadow: 0 0 44px rgba(255,46,133,.55), inset 0 1px 0 rgba(255,255,255,.25); }

/* barra flutuante */
.rm .rm-top { background: var(--glass); border: 1px solid rgba(255,255,255,.14); box-shadow: var(--rim); }

/* hero: painel de vidro com luz de cima */
.rm .rm-hero { padding: 14px 14px 0; min-height: auto; background: #050506; }
.rm .rm-hero::before { content: ""; position: absolute; z-index: -1; top: -25%; right: -10%; width: 75%; height: 80%; pointer-events: none;
  background: radial-gradient(ellipse at top, rgba(255,255,255,.17), transparent 65%); filter: blur(30px); }
.rm .rm-hero::after { mix-blend-mode: screen; opacity: .06; }
.rm .rm-blob.a { background: #a63cf0; opacity: .38; }
.rm .rm-blob.b { background: #ff2e85; opacity: .3; }
.rm .rm-blob.c { background: #7c3aed; opacity: .35; }
.rm .rm-hero-inner { max-width: 1240px; padding: 22px 22px 28px; border-radius: 36px; border: 1px solid rgba(255,255,255,.1); box-shadow: var(--rim);
  background: linear-gradient(180deg, rgba(28,28,31,.82), rgba(18,18,20,.9)); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }
.rm .rm-nav { padding-bottom: 20px; border-bottom: 1px solid transparent;
  border-image: linear-gradient(90deg, transparent, rgba(255,255,255,.16) 20%, rgba(255,255,255,.16) 80%, transparent) 1; }
.rm .rm-pill { margin-top: 56px; padding: 10px 18px; border: 1px solid rgba(255,255,255,.18); background: rgba(255,255,255,.04);
  font-family: var(--mono); font-weight: 500; font-size: 13px; letter-spacing: .16em; color: #f3f3f5; }
.rm .rm-dot { background: #ff4fa3; animation-name: rm-ping-pk; }
@keyframes rm-ping-pk { 0% { box-shadow: 0 0 0 0 rgba(255,79,163,.8); } 70%,100% { box-shadow: 0 0 0 12px rgba(255,79,163,0); } }
.rm .rm-art-glow { background: conic-gradient(from 90deg,#a63cf0,#ff2e85,#7c3aed,#d12bd6,#a63cf0); opacity: .4; }
.rm .rm-hero-foot { border-top: 1px solid rgba(255,255,255,.1); }

/* rótulos com traço luminoso */
.rm .rm-eyebrow, .rm .rm-nums .rm-eyebrow, .rm .rm-final .rm-eyebrow { color: var(--accent); }
.rm .rm-eyebrow::before { content: ""; display: inline-block; width: 3px; height: 16px; margin-right: 12px; vertical-align: -3px; border-radius: 3px;
  background: linear-gradient(#ff4fa3,#a63cf0); box-shadow: 0 0 12px #c03cf0; }

/* faixa */
.rm .rm-marquee { background: var(--panel); border: 1px solid rgba(255,255,255,.12); box-shadow: 0 0 60px rgba(166,60,240,.28); }
.rm .rm-marquee-item { color: #f3f3f5; }
.rm .rm-marquee-item::after { background: linear-gradient(135deg,#a63cf0,#ff2e85); border-radius: 4px; box-shadow: 0 0 18px rgba(255,46,133,.6); }

/* serviços: cards de vidro com brilho por cor */
.rm .rm-serv { background: transparent; }
.rm .rm-card { border: 1px solid rgba(255,255,255,.1); border-radius: 32px; padding: 28px 28px 32px; min-height: 300px; color: #f3f3f5;
  background: radial-gradient(90% 70% at 100% 0%, rgba(var(--g),.22), transparent 65%), var(--panel); box-shadow: var(--rim); }
.rm .rm-card .rm-card-n { display: inline-flex; margin: 0 0 56px; padding: 6px 14px; border: 1px solid rgba(255,255,255,.18); border-radius: 999px;
  font-family: var(--mono); font-weight: 500; font-size: 13px; letter-spacing: .1em; color: var(--muted); }
.rm .rm-card h3 { font-size: 30px; color: #f3f3f5; }
.rm .rm-card p { opacity: 1; color: var(--muted); font-size: 19px; }
.rm .rm-card .rm-card-go { top: 24px; right: 24px; width: 48px; height: 48px; font-size: 22px; font-weight: 500;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.16); color: #fff; }
.rm .rm-card[data-reveal].in:hover { transform: translateY(-6px); border-color: rgba(var(--g),.6);
  box-shadow: 0 0 44px rgba(var(--g),.28), inset 0 1px 0 rgba(255,255,255,.1); }
.rm .rm-card:hover .rm-card-go { background: linear-gradient(135deg, rgba(var(--g),.9), rgba(255,46,133,.7)); border-color: transparent; }

/* números */
.rm .rm-nums { background: transparent; color: #f3f3f5; }
.rm .rm-num { padding: 30px; border: 1px solid rgba(255,255,255,.1); border-radius: 32px; background: var(--panel); box-shadow: var(--rim); }
.rm .rm-num-v { background: linear-gradient(90deg,#b57bff,#e04fd0 55%,#ff4fa3); -webkit-background-clip: text; background-clip: text; }
.rm .rm-num-l { color: var(--muted); }

/* CTA final: painel grande com brilho roxo/rosa */
.rm .rm-final { --fg: #f3f3f5; --line: rgba(255,255,255,.18); --btn-bg: #17171a; --btn-fg: #fff; color: #f3f3f5;
  margin: 0 14px; min-height: auto; padding: 100px 22px; border: 1px solid rgba(255,255,255,.1); border-radius: 36px; animation: none; box-shadow: var(--rim);
  background: radial-gradient(60% 50% at 50% 0%, rgba(166,60,240,.45), transparent 70%), radial-gradient(50% 45% at 92% 100%, rgba(255,46,133,.35), transparent 70%), var(--panel); }
.rm .rm-final p { color: var(--muted); }

/* rodapé */
.rm .rm-foot { background: #050506; }
.rm .rm-foot-word:hover { background: linear-gradient(90deg,#a63cf0,#ff2e85); -webkit-background-clip: text; background-clip: text; }
.rm .rm-foot-row a:hover { color: #ff7ab8; }
.rm .rm-foot-row { border-top: 1px solid rgba(255,255,255,.1); }

@media (min-width: 820px) {
  .rm .rm-hero { padding: 18px 18px 0; }
  .rm .rm-hero-inner { padding: 30px 44px 36px; border-radius: 44px; }
  .rm .rm-final { margin: 0 18px; padding: 130px 56px; border-radius: 44px; }
}
/* ===== ajustes: botões compactos, logo baleia, nome "agência mkt" ===== */
.rm .rm-btn { white-space: nowrap; flex-shrink: 0; font-size: 16px; padding: 14px 26px; }
.rm .rm-nav { gap: 12px; }
.rm .rm-nav .rm-btn { padding: 11px 20px; font-size: 15px; }
.rm .rm-top .rm-btn { padding: 10px 18px; font-size: 15px; }
.rm .rm-cta { flex-direction: row; flex-wrap: wrap; gap: 12px; margin-top: 36px; }
.rm .rm-cta .rm-btn { padding: 13px 22px; font-size: 15px; }
.rm .rm-fab { padding: 12px 18px; font-size: 15px; }
.rm .rm-final-btns { gap: 14px; margin-top: 44px; }
.rm .rm-final .rm-btn, .rm .rm-final .email { width: min(100%, 320px); font-size: 15px; padding: 14px 22px; }
.rm .rm-logo { min-width: 0; gap: 10px; }
.rm .rm-mascote { width: 38px; height: 38px; object-fit: contain; font-size: 0; line-height: 0; }
.rm .rm-top .rm-mascote { width: 30px; height: 30px; }
.rm .rm-logo-txt { font-size: 22px; white-space: nowrap; letter-spacing: -.04em; }
.rm .rm-top .rm-logo-txt { font-size: 19px; }
.rm .rm-art img { width: min(46%, 240px); filter: drop-shadow(0 24px 40px rgba(166,60,240,.35)); }
.rm .rm-foot-word { font-size: clamp(44px, 14vw, 180px); }
@media (min-width: 820px) {
  .rm .rm-logo-txt { font-size: 28px; }
  .rm .rm-mascote { width: 46px; height: 46px; }
  .rm .rm-final-btns .rm-btn, .rm .rm-final .email { width: auto; }
  .rm .rm-cta .rm-btn { padding: 15px 28px; font-size: 16px; }
}
`;

function Carrossel() {
  // 4 repetições por grupo para cobrir telas largas; o 2º grupo é a cópia que fecha o loop
  const itens = Array.from({ length: 4 }).flatMap(() => FRASES);
  const grupo = (oculto) => (
    <div className="rm-marquee-group" aria-hidden={oculto || undefined}>
      {itens.map((f, i) => (
        <span className="rm-marquee-item" key={i}>{f}</span>
      ))}
    </div>
  );
  return (
    <div className="rm-marquee" role="region" aria-label={FRASES.join(", ")}>
      {grupo(false)}
      {grupo(true)}
    </div>
  );
}

function Logo() {
  return (
    <>
      <img className="rm-mascote" src={LOGO_SRC} alt="" />
      <span className="rm-logo-txt">agência <span>mkt</span></span>
    </>
  );
}

function Contador({ prefix = "", to, suffix = "" }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { setV(to); return; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const k = Math.min((t - t0) / 1400, 1);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{prefix}{v}{suffix}</span>;
}

const Seta = ({ down }) => <span className={`ar${down ? " down" : ""}`} aria-hidden="true">{down ? "↓" : "↗"}</span>;

function AgenciaMkt() {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
    // progresso de rolagem, barra flutuante e rolagem suave
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) html.style.scrollBehavior = "smooth";
    const onScroll = () => {
      const max = html.scrollHeight - html.clientHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      setScrolled(window.scrollY > 140);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); html.style.scrollBehavior = prev; };
  }, []);
  
  // aparece ao rolar
  useEffect(() => {
    const els = rootRef.current.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <div className="rm" id="top" ref={rootRef}>
      <style>{css}</style>
      <div className="rm-progress" ref={barRef} aria-hidden="true" />

      <div className={`rm-top${scrolled ? " on" : ""}`}>
        <a href="#top" className="rm-logo" aria-label="agência mkt" tabIndex={scrolled ? 0 : -1}><Logo /></a>
        <a className="rm-btn rm-btn-dark" href={WHATSAPP_URL} tabIndex={scrolled ? 0 : -1}>Falar agora</a>
      </div>

      <a className={`rm-fab${scrolled ? " on" : ""}`} href={WHATSAPP_URL} tabIndex={scrolled ? 0 : -1} aria-label="Chamar no WhatsApp">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1.1.1-3.6-.9-3-1.3-4.9-4.4-5.1-4.6-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/></svg>
        WhatsApp
      </a>

      {/* 1. HERO */}
      <header className="rm-hero">
        <span className="rm-blob a" /><span className="rm-blob b" /><span className="rm-blob c" />
        <div className="rm-hero-inner">
          <nav className="rm-nav" aria-label="Principal">
            <a href="#top" className="rm-logo" aria-label="agência mkt"><Logo /></a>
            <a className="rm-btn rm-btn-dark" href={WHATSAPP_URL}>Falar agora</a>
          </nav>

          <div className="rm-hero-grid">
            <div>
              <span className="rm-pill" data-in style={{ "--d": "60ms" }}><i className="rm-dot" />Agência digital</span>

              <h1 className="rm-h1" data-in style={{ "--d": "160ms" }}>
                Sua marca<br />
                <span className="grad">nos olhos de todos</span>
              </h1>

              <p className="rm-lead" data-in style={{ "--d": "280ms" }}>
                A agência mkt planeja, grava, projeta e divulga. Nosso método é flexível:
                entendemos o seu setor e colocamos a sua marca na boca do público.
              </p>

              <div className="rm-cta" data-in style={{ "--d": "400ms" }}>
                <a className="rm-btn rm-btn-dark" href={WHATSAPP_URL}>Quero um orçamento<Seta /></a>
                <a className="rm-btn rm-btn-line" href="#servicos">Ver o que fazemos<Seta down /></a>
              </div>
            </div>

            <div className="rm-art" data-in style={{ "--d": "320ms" }}>
              <span className="rm-art-glow" />
              <img src={LOGO_SRC} alt="Logo agência mkt" />
            </div>
          </div>

          <div className="rm-hero-foot" data-in style={{ "--d": "520ms" }}>
            <span>Marketing sob medida</span>
            <span className="rm-cue">Role para ver <i /></span>
          </div>
        </div>
      </header>
{/* 1.5 CARROSSEL DE FRASES */}
      <Carrossel />
      {/* 2. SERVIÇOS */}
      <section className="rm-serv" id="servicos">
        <div className="rm-serv-inner">
          <span className="rm-eyebrow" data-reveal>(01) O que fazemos</span>
          <h2 className="rm-h2" data-reveal>
            Soluções completas para sua marca, <span className="grad-short">sob o mesmo teto.</span>
          </h2>

          <div className="rm-cards">
            {SERVICOS.map((s, i) => (
              <a
                key={s.n}
                className="rm-card"
                href={`${WHATSAPP_URL}?text=${encodeURIComponent("Oi! Quero saber mais sobre " + s.titulo)}`}
                aria-label={`${s.titulo}: falar no WhatsApp`}
                data-reveal
                style={{ "--g": s.g, "--i": i, "--d": `${(i % 3) * 90}ms` }}
              >
                <span className="rm-card-go" aria-hidden="true">↗</span>
                <p className="rm-card-n">{s.n}</p>
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NÚMEROS */}
      <section className="rm-nums" id="numeros" aria-label="Números da agência">
        <span className="rm-eyebrow" data-reveal>(02) Em números</span>
        <div className="rm-nums-inner">
          {NUMEROS.map((n, i) => (
            <div className="rm-num" key={n.rotulo} data-reveal style={{ "--d": `${i * 120}ms` }}>
              <p className="rm-num-v"><Contador prefix={n.prefix} to={n.to} suffix={n.suffix} /></p>
              <p className="rm-num-l">{n.rotulo}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rm-gap" />

      {/* 4. CTA FINAL */}
      <section className="rm-final" id="contato">
        <span className="rm-eyebrow">(03) Contato</span>
        <h2>Vamos dar vida nova à sua marca?</h2>
        <p>Fala pra gente o que você precisa. O primeiro papo é objetivo, leve e sem compromisso.</p>
        <div className="rm-final-btns">
          <a className="rm-btn rm-btn-dark" href={WHATSAPP_URL}>Chamar no WhatsApp<Seta /></a>
        </div>
      </section>

      {/* 5. RODAPÉ */}
      <footer className="rm-foot">
        <div className="rm-foot-in">
          <a href="#top" className="rm-foot-word" aria-label="Voltar ao topo">agência mkt</a>
          <div className="rm-foot-row">
            <nav aria-label="Rodapé">
              <a href="#servicos">Serviços</a>
              <a href="#numeros">Números</a>
              <a href="#contato">Contato</a>
            </nav>
            <span>© {new Date().getFullYear()} agência mkt</span>
            <a href="#top">Voltar ao topo ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AgenciaMkt />);
