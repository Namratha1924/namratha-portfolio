/* ==========================================================================
   Namratha Ethamukkala — Portfolio interactions
   Content comes from js/data.js; nothing here needs editing for text changes.
   ========================================================================== */
(() => {
  const D = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Progress (0→1) of a tall section while its sticky child is pinned.
  const pinProgress = (el) => {
    const r = el.getBoundingClientRect();
    return clamp(-r.top / (r.height - innerHeight || 1));
  };
  const initials = (s) => s.split(/\s+/).map((w) => w[0]).join("").slice(0, 2);

  /* ---------------- Rendering ---------------- */
  function renderHero() {
    document.title = `${D.name} — ${D.role}`;
    const word = $("#hero-word");
    word.setAttribute("aria-label", D.firstName);
    word.innerHTML = [...D.firstName].map((c, i) => `<span class="ch" aria-hidden="true" style="--i:${i}">${esc(c)}</span>`).join("");
    $("#hero-kicker").textContent = D.kicker;
    $("#hero-role").textContent = D.heroLine;
    $$("[data-name]").forEach((el) => (el.textContent = D.name));
    $("#year").textContent = new Date().getFullYear();
  }

  function renderAbout() {
    $("#statement").innerHTML = D.statement.split(/\s+/).map((w) => `<span class="w">${esc(w)}</span>`).join(" ");
    if (D.statementMore) $("#statement-more").textContent = D.statementMore;
    else $("#statement-more").remove();
    if (D.photo) {
      const img = $("#portrait-img");
      img.src = D.photo;
      img.alt = `Portrait of ${D.name}`;
      $("#portrait-caption").textContent = D.photoCaption;
    } else {
      $("#portrait").remove();
    }
    $("#roles").innerHTML = D.roles
      .map(
        (r, i) => `<article class="glass light role" style="--d:${i * 0.1}s">
          <div class="role-icon" aria-hidden="true">${pad(i + 1)}</div>
          <p class="role-org">${esc(r.org)}</p>
          <h3>${esc(r.title)}</h3>
          <p>${esc(r.text)}</p>
        </article>`
      )
      .join("");
    $("#stats").innerHTML = D.stats
      .map(
        (s, i) => `<article class="metric metric-${esc(s.visual)}${s.visual === "agency" ? " dark" : " glass light"}" style="--d:${i * 0.08}s">
          <div class="metric-head">
            <strong data-count="${esc(s.value)}">${esc(s.value)}</strong>
            <span class="metric-label">${esc(s.label)}</span>
          </div>
          <div class="metric-visual" aria-hidden="true">${metricVisual(s)}</div>
          <p class="metric-note">${esc(s.note).replace(/\n/g, "<br>")}</p>
        </article>`
      )
      .join("");
  }

  function metricVisual(s) {
    if (s.visual === "apps") {
      return D.apps
        .map((a, i) => `<span class="mini-icon${a.icon ? " has-img" : ""}" style="--i:${i}" title="${esc(a.name)}">${a.icon ? `<img src="${esc(a.icon)}" alt="">` : esc(initials(a.name))}</span>`)
        .join("");
    }
    if (s.visual === "companies") {
      const last = s.items.length - 1;
      return `<ol class="co-list">${s.items
        .map((c, i) => `<li style="--i:${i}"${i === last ? ' class="now"' : ""}><span>${esc(c)}</span>${i === last ? "<em>Now</em>" : ""}</li>`)
        .join("")}</ol>`;
    }
    if (s.visual === "agency") {
      return `<p class="agency-name">${esc(D.avora.name)}</p><div class="agency-tags">${(s.items || [])
        .map((t, i) => `<span style="--i:${i}">${esc(t)}</span>`)
        .join("")}</div>`;
    }
    return `<div class="since-line"><span>${esc(s.value)}</span><i><b></b></i><span>Now</span></div>`;
  }

  function renderJourney() {
    $("#journey-title").innerHTML = D.journeyTitle;
    $("#journey-track").insertAdjacentHTML(
      "beforeend",
      D.journey
        .map(
          (m, i) => `<article class="glass j-card${m.now ? " now" : ""}" data-year="${esc(m.year)}">
            <div class="j-top"><span class="j-num">CH. ${pad(i + 1)}</span><span class="j-when">${esc(m.when)}</span></div>
            ${m.org ? `<span class="j-org"><span>${esc(m.org)}</span></span>` : ""}
            <h3>${esc(m.title)}</h3>
            <p>${esc(m.text)}</p>
          </article>`
        )
        .join("")
    );
  }

  function renderApps() {
    $("#apps-note").textContent = D.appsNote;
    const spots = [[25, 20, 85, 90], [80, 15, 20, 85], [50, 0, 50, 100], [15, 80, 90, 20], [70, 70, 10, 10], [30, 50, 90, 50]];
    const chevron = (dir) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${dir === "next" ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    // A stacked deck of glass cards: one app in front, the next two peeking behind.
    $("#app-tiles").innerHTML = `
      <div class="deck-stage" aria-live="polite">
        ${D.apps.map((a, i) => {
          const [ax, ay, bx, by] = spots[i % spots.length];
          const icon = a.icon ? `<img src="${esc(a.icon)}" alt="">` : esc(initials(a.name));
          return `<article class="glass light deck-card" data-i="${i}" aria-label="${pad(i + 1)} of ${pad(D.apps.length)}: ${esc(a.name)}">
            <div class="deck-top">
              <span class="app-icon deck-icon${a.icon ? " has-img" : ""}" style="--ax:${ax}%;--ay:${ay}%;--bx:${bx}%;--by:${by}%" aria-hidden="true">${icon}</span>
              <span class="deck-num" aria-hidden="true">${pad(i + 1)}</span>
            </div>
            <p class="deck-cat">${esc(a.category)}</p>
            <h3 class="deck-name">${esc(a.name)}</h3>
            <p class="deck-text">${esc(a.text)}</p>
            ${a.link ? `<a class="deck-cta" href="${esc(a.link)}" target="_blank" rel="noopener">Open on Google Play ${chevron("next")}</a>` : ""}
          </article>`;
        }).join("")}
      </div>
      <div class="deck-controls">
        <button type="button" class="deck-btn" data-dir="-1" aria-label="Previous app">${chevron("prev")}</button>
        <div class="deck-dots" aria-hidden="true">${D.apps.map((_, i) => `<i data-i="${i}"></i>`).join("")}</div>
        <p class="deck-count"><span id="deck-now">01</span> / ${pad(D.apps.length)}</p>
        <button type="button" class="deck-btn" data-dir="1" aria-label="Next app">${chevron("next")}</button>
      </div>`;
    deck();
  }

  // Deck: every card gets a position relative to the front one; CSS turns positions into the stack.
  function deck() {
    const cards = $$(".deck-card"), dots = $$(".deck-dots i"), n = cards.length;
    let cur = 0;
    const [prevBtn, nextBtn] = [$('.deck-btn[data-dir="-1"]'), $('.deck-btn[data-dir="1"]')];
    // No looping: the deck stops at the first and last app, and the chevron at that end switches off.
    const show = (to) => {
      cur = Math.max(0, Math.min(n - 1, to));
      cards.forEach((c, i) => {
        const pos = i - cur;
        c.dataset.pos = pos < 0 ? "out" : Math.min(pos, 3);
        c.inert = pos !== 0;
      });
      dots.forEach((d, i) => d.classList.toggle("on", i === cur));
      $("#deck-now").textContent = pad(cur + 1);
      prevBtn.disabled = cur === 0;
      nextBtn.disabled = cur === n - 1;
    };
    show(0);
    const wrap = $("#app-tiles");

    // Auto-flip: every 2.5s while the deck is on screen, paused while hovered, stopping at the
    // last card — and switched off for good the moment the visitor takes control.
    const STEP = 2500;
    let auto = !reduceMotion, visible = false, hovered = false, elapsed = 0, last = 0;
    const stopAuto = () => {
      auto = false;
      wrap.classList.remove("is-auto");
      dots.forEach((d) => d.style.removeProperty("--fill"));
    };
    const tick = (t) => {
      if (!auto) return;
      const dt = last ? Math.min(t - last, 100) : 0;
      last = t;
      if (visible && !hovered) elapsed += dt;
      dots[cur].style.setProperty("--fill", Math.min(1, elapsed / STEP).toFixed(3));
      if (elapsed >= STEP) {
        elapsed = 0;
        dots[cur].style.removeProperty("--fill");
        show(cur + 1);
        if (cur === n - 1) return stopAuto();
      }
      requestAnimationFrame(tick);
    };
    if (auto) {
      wrap.classList.add("is-auto");
      new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0.5 }).observe(wrap);
      if (finePointer) {
        $(".deck-stage").addEventListener("pointerenter", () => (hovered = true));
        $(".deck-stage").addEventListener("pointerleave", () => (hovered = false));
      }
      requestAnimationFrame(tick);
    }

    wrap.addEventListener("click", (e) => {
      const b = e.target.closest(".deck-btn");
      if (b) { stopAuto(); show(cur + +b.dataset.dir); }
    });
    wrap.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); stopAuto(); show(cur + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); stopAuto(); show(cur - 1); }
    });
    // swipe on touch screens
    const stage = $(".deck-stage");
    let x0 = null;
    stage.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
    stage.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) { stopAuto(); show(cur + (dx < 0 ? 1 : -1)); }
      x0 = null;
    });
  }

  function mock(kind) {
    if (kind === "dashboard") {
      const bars = [40, 55, 48, 72, 60, 92, 84].map((h, n) => `<i style="--h:${h}%;--n:${n}"${h > 80 ? ' class="hot"' : ""}></i>`).join("");
      return `<div class="m-dash"><div class="m-kpis"><i></i><i class="risk"></i><i></i></div><div class="m-chart">${bars}</div></div>`;
    }
    if (kind === "audit") {
      const rows = [["high", "High", 80], ["high", "High", 64], ["med", "Medium", 72], ["med", "Medium", 50], ["low", "Low", 60]]
        .map(([c, l, w], n) => `<div class="row" style="--n:${n}"><b></b><i style="--w:${w}%"></i><em class="sev ${c}">${l}</em></div>`)
        .join("");
      return `<div class="m-audit">${rows}</div>`;
    }
    if (kind === "brand") {
      return `<div class="m-brand"><svg aria-hidden="true"><use href="#mark"/></svg></div>`;
    }
    return `<div class="m-browser"><div class="mb-bar"><b></b><b></b><b></b></div><div class="m-hero"></div><div class="m-cards"><i></i><i></i><i></i></div></div>`;
  }

  function renderWork() {
    $("#stack").innerHTML = D.projects
      .map((p, i) => {
        const theme = i % 2 ? "light" : "dark";
        const cta = p.link
          ? `<a class="pill ${theme === "dark" ? "pill-light" : "pill-dark"}" href="${esc(p.link)}" target="_blank" rel="noopener">View case study <span aria-hidden="true">→</span></a>`
          : `<span class="pill ${theme === "dark" ? "pill-light" : "pill-dark"} pill-nolink" title="Case study link coming soon">View case study <span aria-hidden="true">→</span></span>`;
        return `<article class="stack-card ${theme}" data-theme="${theme}" style="--i:${i}">
          <div class="sc-info">
            <div>
              <p class="sc-meta">${pad(i + 1)} — ${esc(p.type)} · ${esc(p.year)}</p>
              <p class="sc-tagline">${esc(p.tagline)}</p>
              <p class="sc-desc">${esc(p.description)}</p>
              <ul class="sc-tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
            </div>
            <div>${cta}</div>
          </div>
          <div class="sc-visual">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)} preview" loading="lazy">` : mock(p.mock)}</div>
          <div class="stack-shade" aria-hidden="true"></div>
        </article>`;
      })
      .join("");
  }

  function renderAvora() {
    const A = D.avora, M = A.milestone;
    $("#avora-role").textContent = A.role;
    // the agency is the headline; each word rises in on its own
    $("#avora-title").innerHTML =
      A.name.split(" ").map((w, i) => `<span class="t-w" style="--d:${i}"><span class="av-grad">${esc(w)}</span></span>`).join(" ") +
      `<span class="t-w" style="--d:2"><span class="av-dot">.</span></span>`;
    $("#avora-text").textContent = A.text;
    const link = $("#avora-link");
    if (A.link) {
      link.href = A.link;
      link.innerHTML = `Visit ${esc(A.link.replace(/^https?:\/\/(www\.)?|\/$/g, ""))} <span aria-hidden="true">↗</span>`;
    } else link.remove();


    // tall card: the number leads, then who it was for
    const statNum = M.stat.replace(/\D/g, ""), statRest = M.stat.replace(/\d/g, "");
    $("#milestone").innerHTML = `
      <i class="ms-sheen" aria-hidden="true"></i>
      <span class="ms-badge"><b>01</b>${esc(M.label)}</span>
      <div class="ms-stat"><b><span data-count="${esc(statNum)}">${esc(statNum)}</span>${esc(statRest)}</b><span>${esc(M.statLabel)}</span></div>
      <div class="ms-who"><p class="ms-kicker">${esc(M.kicker)}</p><h3 class="ms-client">${esc(M.client)}</h3></div>
      <p class="ms-text">${esc(M.text)}</p>`;
    avoraLive();

    const t = $("#avora-title");
    new IntersectionObserver(([en], io) => { if (en.isIntersecting) { t.classList.add("in"); io.disconnect(); } }, { threshold: 0.4 }).observe(t);
  }

  // Avora, alive: the card tilts toward the pointer under a moving spotlight, and the watermark drifts with scroll.
  function avoraLive() {
    const sec = $("#avora"), card = $("#milestone");
    if (!finePointer || reduceMotion) return;
    sec.addEventListener("pointermove", (e) => {
      const r = sec.getBoundingClientRect();
      sec.style.setProperty("--sx", `${e.clientX - r.left}px`);
      sec.style.setProperty("--sy", `${e.clientY - r.top}px`);
      sec.classList.add("lit");
    });
    sec.addEventListener("pointerleave", () => sec.classList.remove("lit"));
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
      card.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
    });
    card.addEventListener("pointerleave", () => ["--rx", "--ry"].forEach((v) => card.style.setProperty(v, "0deg")));
  }
  function updateAvora() {
    const sec = $("#avora"), wm = $(".av-watermark");
    if (!sec || !wm || reduceMotion) return;
    const r = sec.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const p = clamp((innerHeight - r.top) / (innerHeight + r.height));
    wm.style.transform = `translateY(${(0.5 - p) * 90}px) rotate(${(p - 0.5) * -5}deg)`;
  }

  // Clipboard with an old-school fallback for browsers that block the async API.
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = Object.assign(document.createElement("textarea"), { value: text });
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    }
  }

  // A small glass message at the bottom of the screen.
  function toast(msg) {
    let t = $("#toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.className = "toast";
      t.setAttribute("role", "status");
      t.setAttribute("aria-live", "polite");
      document.body.appendChild(t);
    }
    t.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${esc(msg)}</span>`;
    t.classList.add("show");
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove("show"), 2600);
  }

  function renderContact() {
    const { email, phone, socials } = D.contact;
    $("#contact-title").textContent = D.contactTitle;
    $("#contact-sub").textContent = D.contactSub;
    // "Say hello" calls: on a phone it opens the dialer with the number ready;
    // on a computer (no dialer) it copies the number and says so.
    const hello = $("#email-link"), tel = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : `mailto:${email}`;
    hello.href = tel;
    if (phone)
      hello.addEventListener("click", async (e) => {
        if (!finePointer) return; // touch device: let the dialer open
        e.preventDefault();
        toast((await copyText(phone)) ? `Contact number copied — ${phone}` : `Call me on ${phone}`);
      });
    $("#socials").innerHTML = socials
      .map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`)
      .join("");
    const btn = $("#copy-btn");
    btn.addEventListener("click", async () => {
      if (await copyText(email)) {
        btn.textContent = "Copied ✓";
        toast(`Email copied — ${email}`);
      } else location.href = `mailto:${email}`;
      setTimeout(() => (btn.textContent = "Copy email"), 2000);
    });
  }

  /* ---------------- Scene: hero — zoom through the logo ---------------- */
  const hero = { el: $("#top"), mark: $("#hero-mark"), word: $("#hero-word"), white: $("#hero-white"), fades: $$("#top .fade-el"), shift: 0, p: 0 };

  function measureHero() {
    hero.mark.style.transform = "";
    const l = $("#lockup").getBoundingClientRect();
    const m = hero.mark.getBoundingClientRect();
    hero.shift = l.left + l.width / 2 - (m.left + m.width / 2);
  }

  function updateHero() {
    if (reduceMotion) return;
    const p = (hero.p = pinProgress(hero.el));
    const a = easeInOut(clamp(p / 0.28));          // name leaves, mark centres
    const b = clamp((p - 0.22) / 0.72);             // mark zooms
    hero.word.style.opacity = 1 - a;
    hero.word.style.filter = a ? `blur(${a * 10}px)` : "";
    hero.word.style.transform = `translateX(${a * 60}px)`;
    hero.fades.forEach((el) => (el.style.opacity = 1 - clamp(p / 0.12)));
    hero.mark.style.transform = `translateX(${a * hero.shift}px) scale(${Math.pow(110, b * b * b)})`;
    hero.white.style.opacity = clamp((p - 0.86) / 0.12);
  }

  /* ---------------- Scene: statement — words light up ---------------- */
  let W = [];
  function updateStatement() {
    if (reduceMotion || !W.length) return;
    const r = $("#statement").getBoundingClientRect();
    const f = clamp((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.3));
    const lit = f * W.length;
    W.forEach((w, i) => (w.style.opacity = 0.14 + 0.86 * clamp(lit - i)));
  }

  /* ---------------- Portrait — slow parallax inside its frame ---------------- */
  function updatePortrait() {
    const img = $("#portrait-img");
    if (reduceMotion || !img) return;
    const r = img.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const t = clamp((innerHeight - r.top) / (innerHeight + r.height)); // 0 entering → 1 leaving
    img.style.transform = `translateY(${(t - 0.5) * -8}%) scale(1.12)`;
  }

  /* ---------------- Scene: journey — horizontal story + drawn line ---------------- */
  let J = null;

  function buildJourney() {
    const sec = $("#journey"), track = $("#journey-track"), cards = $$(".j-card", track);
    track.style.transform = "";
    // Measure from the cards themselves: the line drawing is as wide as the last build,
    // so using scrollWidth would let the track grow a little on every resize.
    const last = cards[cards.length - 1];
    const TW = Math.ceil(last.offsetLeft + last.offsetWidth + parseFloat(getComputedStyle(track).paddingRight));
    const maxShift = Math.max(0, TW - innerWidth);
    sec.style.height = `${innerHeight + maxShift}px`;

    const y0 = 30, amp = 16;
    const pts = cards.map((c) => ({ x: c.offsetLeft + 34, y: y0 }));
    let d = `M 0 ${y0}`, prev = { x: 0, y: y0 };
    [...pts, { x: TW, y: y0 }].forEach((p, i) => {
      const by = y0 + (i % 2 ? amp : -amp);
      const dx = p.x - prev.x;
      d += ` C ${prev.x + dx * 0.35} ${by}, ${p.x - dx * 0.35} ${by}, ${p.x} ${p.y}`;
      prev = p;
    });

    const svg = $("#journey-line"), path = $("#jl-path");
    svg.setAttribute("width", TW);
    svg.setAttribute("viewBox", `0 0 ${TW} 64`);
    $("#jl-grad").setAttribute("gradientUnits", "userSpaceOnUse");
    $("#jl-grad").setAttribute("x2", TW);
    $("#jl-ghost").setAttribute("d", d);
    path.setAttribute("d", d);
    const L = path.getTotalLength();
    path.style.strokeDasharray = `${L} ${L}`;
    $("#jl-dots").innerHTML = pts.map((p) => `<circle class="jl-dot" cx="${p.x}" cy="${p.y}" r="6"/>`).join("");

    const samples = [];
    const N = Math.max(200, Math.round(L / 8));
    for (let i = 0; i <= N; i++) {
      const len = (L * i) / N;
      samples.push({ len, x: path.getPointAtLength(len).x });
    }
    J = { sec, track, cards, maxShift, path, L, samples, pts, dots: $$(".jl-dot"), tip: $("#jl-tip"), bar: $("#journey-bar"), yearEl: $("#journey-year"), water: $("#journey-water"), year: null };
    updateJourney();
  }

  function lengthAtX(x) {
    const s = J.samples;
    if (x <= 0) return 0;
    if (x >= s[s.length - 1].x) return J.L;
    let lo = 0, hi = s.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (s[mid].x < x) lo = mid; else hi = mid;
    }
    const a = s[lo], b = s[hi];
    return a.len + (b.len - a.len) * ((x - a.x) / (b.x - a.x || 1));
  }

  function setYear(y) {
    if (y === J.year) return;
    J.year = y;
    J.yearEl.classList.add("swap");
    setTimeout(() => {
      J.yearEl.textContent = y;
      J.yearEl.classList.remove("swap");
    }, 300);
  }

  function updateJourney() {
    if (!J) return;
    const p = pinProgress(J.sec);
    const shift = p * J.maxShift;
    J.track.style.transform = `translate3d(${-shift}px, 0, 0)`;
    // The line's tip runs a little ahead of centre and reaches the end exactly as the scroll ends.
    const tipX = shift + innerWidth * (0.5 + 0.45 * p);
    const len = lengthAtX(tipX);
    J.path.style.strokeDashoffset = J.L - len;
    const pt = J.path.getPointAtLength(len);
    J.tip.setAttribute("cx", pt.x);
    J.tip.setAttribute("cy", pt.y);
    // Hysteresis: a card lights up when the line reaches it and only dims once the line
    // has clearly moved back, so stopping right at a card never makes it flicker.
    let current = 0;
    J.pts.forEach((pp, i) => {
      const was = J.cards[i].classList.contains("active");
      const on = was ? pt.x >= pp.x - 48 : pt.x >= pp.x - 2;
      if (on) current = i;
      if (on !== was) J.cards[i].classList.toggle("active", on);
      // dots are re-created whenever the line is rebuilt, so always keep them in step with the cards
      J.dots[i].classList.toggle("active", on);
    });
    setYear(J.cards[current].dataset.year);
    J.bar.style.transform = `scaleX(${p})`;
    // Night sky → dawn: scroll progress lifts the aurora, and a soft spotlight follows the line's tip.
    if (!reduceMotion) {
      J.water.style.setProperty("--p", p.toFixed(3));
      J.water.style.setProperty("--tx", `${Math.round(J.tip.getBoundingClientRect().left)}px`);
    }
  }

  /* ---------------- Scene: case studies — cards stack and recede ---------------- */
  let S = [];
  function buildStack() {
    S = $$(".stack-card").map((c) => ({ c, shade: $(".stack-shade", c), top: parseFloat(getComputedStyle(c).top) }));
  }
  function updateStack() {
    if (reduceMotion) return;
    S.forEach((s, i) => {
      const next = S[i + 1];
      if (!next) return;
      const H = s.c.offsetHeight;
      const t = clamp((s.top + H - next.c.getBoundingClientRect().top) / H);
      s.c.style.transform = `scale(${1 - 0.07 * t})`;
      s.shade.style.opacity = t * 0.45;
    });
  }

  /* ---------------- Nav: theme follows the section underneath ---------------- */
  const nav = $("#nav");
  let lastY = scrollY, travel = 0, navHidden = false, navTheme = "dark";
  // Keep the nav visible while the page glides to a section after a link click (or a #hash load).
  let navLockUntil = location.hash ? performance.now() + 1500 : 0;
  document.addEventListener("click", (e) => {
    if (e.target.closest('a[href^="#"]')) navLockUntil = performance.now() + 1500;
  });
  function updateNav() {
    const under = document.elementsFromPoint(innerWidth / 2, 34).find((el) => !nav.contains(el));
    const sec = under?.closest("[data-theme]");
    let theme = sec?.dataset.theme || "light";
    if (sec === hero.el && hero.p > 0.9) theme = "light";
    if (theme !== navTheme) {
      navTheme = theme;
      nav.classList.toggle("is-dark", theme === "dark");
      nav.classList.toggle("is-light", theme === "light");
    }

    // Hide after a deliberate scroll down, show after a deliberate scroll up.
    // Small jitters (trackpad momentum, bounce) never flip the state.
    const y = scrollY, dy = y - lastY;
    lastY = y;
    if (Math.abs(dy) > innerHeight) travel = 0; // a jump (menu link, reload), not a scroll
    else {
      if (dy && Math.sign(dy) !== Math.sign(travel)) travel = 0;
      travel += dy;
    }
    let hide = navHidden;
    if (y < innerHeight || performance.now() < navLockUntil) { hide = false; travel = 0; }
    else if (travel > 120) hide = true;
    else if (travel < -60) hide = false;
    if (hide !== navHidden) {
      navHidden = hide;
      nav.classList.toggle("is-hidden", hide);
    }
  }

  function activeLinks() {
    const links = $$(".nav-links a");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${en.target.id}`));
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["about", "journey", "work", "avora"].forEach((id) => io.observe($(`#${id}`)));
  }

  /* ---------------- Reveal on scroll + count up ---------------- */
  function countUp(el) {
    const v = el.dataset.count;
    if (reduceMotion || !/^\d{1,3}$/.test(v)) return;
    const end = +v, start = performance.now(), dur = 1400;
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - t, 4)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function reveals() {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("in");
          const n = en.target.querySelector("[data-count]");
          if (n) countUp(n);
          io.unobserve(en.target);
        }),
      { threshold: 0.15 }
    );
    $$(".reveal, .role, .metric, .portrait").forEach((el) => io.observe(el));

    const view = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.target.classList.toggle("in-view", en.isIntersecting)),
      { threshold: 0.35 }
    );
    $$(".stack-card").forEach((el) => view.observe(el));
  }

  /* ---------------- Liquid glass: highlight follows the pointer ---------------- */
  function glassLight() {
    if (!finePointer) return;
    document.addEventListener("pointermove", (e) => {
      const g = e.target.closest?.(".glass");
      if (!g) return;
      const r = g.getBoundingClientRect();
      g.style.setProperty("--mx", `${e.clientX - r.left}px`);
      g.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  }

  /* ---------------- Boot ---------------- */
  // Always open on the logo intro rather than a restored scroll position.
  if (!location.hash) {
    history.scrollRestoration = "manual";
    const toTop = () => scrollTo({ top: 0, behavior: "instant" });
    toTop();
    addEventListener("load", toTop);
    addEventListener("pageshow", toTop);
  }

  renderHero();
  renderAbout();
  renderJourney();
  renderApps();
  renderWork();
  renderAvora();
  renderContact();
  W = $$("#statement .w");
  reveals();
  activeLinks();
  glassLight();

  let ticking = false;
  const frame = () => {
    updateHero();
    updateStatement();
    updatePortrait();
    updateJourney();
    updateStack();
    updateAvora();
    updateNav();
    ticking = false;
  };
  const requestFrame = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  };
  const layout = () => {
    measureHero();
    buildJourney();
    buildStack();
    frame();
  };

  addEventListener("scroll", requestFrame, { passive: true });
  let rt;
  addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(layout, 120); });
  layout();
  document.fonts?.ready.then(layout);
})();
