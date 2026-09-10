// ============================================================
// 深森呼吸 ポートフォリオサイト メインスクリプト
// 1. カードの生成
// 2. 言語切り替え(日本語/英語)
// 3. カテゴリフィルター(絞り込み+詰めアニメーション)
// 4. ヘッダーのスクロール変化
// 5. マス目レイアウトの固定(スロット方式)
// 6. ドラッグでカード並び替え(入れ替え式・タッチ対応)
//
// 【スロット方式について】
// カードは読み込み時にマス目の座標(何列目・何行目)に固定される。
// ドラッグでは「動かしたカード」と「入れ替え相手」だけが動き、
// 無関係なカードは一切動かない。
// ============================================================

import { cards, ui, categoryLabel } from "./data.js";

const grid = document.getElementById("card-grid");
const header = document.getElementById("site-header");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// カードのスライド移動の速さと柔らかさ(共通設定)
const SLIDE_MS = 600; // ドラッグ中の入れ替え
const FILTER_MS = 900; // フィルター時の詰め・出現
const SLIDE_EASE = "cubic-bezier(0.25, 0.8, 0.3, 1)";

// ------------------------------------------------------------
// 1. カードの生成
// ------------------------------------------------------------
const SIZE_CLASS = { s: "", w: "card--wide", t: "card--tall" };

// カードの色: tone指定があればそれを優先、なければcategoryで自動判定
function cardTone(data) {
  if (data.tone) return data.tone;
  if (data.category === "creation") return "light";
  if (data.category === "column" || data.category === "about") return "muted";
  return "dark";
}

const TONE_CLASS = { light: "card--outline", muted: "card--muted" };

function createCard(data) {
  const el = document.createElement("article");
  const toneClass = TONE_CLASS[cardTone(data)] || "";
  // 作品サムネイル画像を敷いたカード: 普段は画像のみ、ホバー/フォーカスでテキストとピルを表示
  const isPhotoCard = toneClass === "card--outline" && Boolean(data.illustration);
  // 画像比率がカードと大きく異なる作品は、data.fit:"contain"でトリミングなし中央配置にできる
  const useContainFit = isPhotoCard && data.fit === "contain";
  el.className = [
    "card",
    SIZE_CLASS[data.size],
    toneClass,
    isPhotoCard ? "card--photo" : "",
    useContainFit ? "card--fit-contain" : "",
  ]
    .filter(Boolean)
    .join(" ");
  el.dataset.id = data.id;
  el.dataset.category = data.category;
  el.dataset.action = data.action || "";

  // ダークモードのスイッチカード: リンクではなく、切替スイッチを内蔵した専用カード
  // カテゴリに属さない(フィルターで絞り込まれない)ため、タグは「DARK MODE」固定表示
  // 見出し・タイトルは通常のリンクカードと同じ構成(card-head内にcard-tag+card-title)
  if (data.action === "theme-toggle") {
    el.innerHTML = `
      <div class="card-link">
        <div class="card-head">
          <span class="card-tag">DARK MODE</span>
          <h3 class="card-title"></h3>
        </div>
        <div class="theme-switch-wrap">
          <button type="button" class="theme-switch" id="theme-toggle" aria-pressed="false" aria-label="ダークモードに切り替える">
            <span class="theme-switch-knob"></span>
          </button>
        </div>
      </div>
    `;
    return el;
  }

  // SOLUTION/CREATIONの紹介カード: リンクなし・常時テキスト表示(遷移しない)
  if (data.action === "intro-text") {
    el.innerHTML = `
      <div class="card-link">
        <div class="card-head">
          <span class="card-tag">${categoryLabel[data.category] || data.category}</span>
        </div>
        <div class="card-intro-body">
          <h3 class="card-intro-title"></h3>
          <p class="card-intro-text"></p>
        </div>
        <div class="card-foot">
          <span class="pill">
            <span class="pill-label"></span>
            <span class="pill-arrow" aria-hidden="true">&#8594;</span>
          </span>
        </div>
      </div>
    `;
    return el;
  }

  const illustration = data.illustration
    ? `<div class="card-illustration"><img src="${data.illustration}" alt="" width="242" height="432" loading="lazy"></div>`
    : "";

  el.innerHTML = `
    <a class="card-link" href="${data.href}" draggable="false" target="_blank" rel="noopener">
      <div class="card-head">
        <span class="card-tag">${categoryLabel[data.category] || data.category}</span>
        <h3 class="card-title"></h3>
      </div>
      ${illustration}
      <div class="card-foot">
        <span class="pill">
          <span class="pill-label"></span>
          <span class="pill-arrow" aria-hidden="true">&#8594;</span>
        </span>
      </div>
    </a>
  `;
  return el;
}

cards.forEach((data) => grid.appendChild(createCard(data)));

// ------------------------------------------------------------
// 2. 言語切り替え
// ------------------------------------------------------------
function setLang(lang) {
  document.documentElement.lang = lang;

  // data-i18n属性が付いた要素の文言を差し替える
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (ui[lang][key]) el.textContent = ui[lang][key];
  });

  // カードのタイトルとREAD MOREを差し替える
  grid.querySelectorAll(".card").forEach((el) => {
    const data = cards.find((c) => c.id === el.dataset.id);
    if (!data) return;
    const titleEl = el.querySelector(".card-title");
    if (titleEl) titleEl.textContent = data[lang].title;
    const pillLabel = el.querySelector(".pill-label");
    if (pillLabel) {
      pillLabel.textContent = data.action === "intro-text" ? ui[lang].viewAll : ui[lang].readMore;
    }
    const introTitleEl = el.querySelector(".card-intro-title");
    if (introTitleEl) introTitleEl.textContent = data[lang].title;
    const introTextEl = el.querySelector(".card-intro-text");
    if (introTextEl) introTextEl.textContent = data[lang].body;
  });

  // ボタンの選択状態を更新
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    setLang(btn.dataset.lang);
    // スマホ表示では、言語を選んだらパネルを閉じる
    closePanelIfMobile();
  });
});

setLang("ja");

// ------------------------------------------------------------
// 3. カテゴリフィルター
// ------------------------------------------------------------
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });

    applyFilter(btn.dataset.filter);

    // スマホ表示ではフィルターを選んだらパネルを自動で閉じる
    closePanelIfMobile();
  });
});

// SOLUTION/CREATIONの紹介カードの→アイコン: 自身のcategoryのフィルターボタンを
// クリックしたのと同じ扱いにする(遷移はせず、絞り込みだけ働く)
grid.querySelectorAll('.card[data-action="intro-text"] .card-link').forEach((link) => {
  link.addEventListener("click", () => {
    const filterBtn = document.querySelector(
      `.filter-btn[data-filter="${link.closest(".card").dataset.category}"]`
    );
    if (filterBtn) filterBtn.click();
  });
});

// 絞り込みを適用し、並べ直してマス目に固定し直す
function applyFilter(filter) {
  const cardEls = [...grid.querySelectorAll(".card")];

  // 変更前の位置を記録(表示中のカードのみ)
  const before = new Map();
  cardEls.forEach((el) => {
    if (!el.classList.contains("is-hidden")) {
      before.set(el, el.getBoundingClientRect());
    }
  });

  // 表示/非表示を切り替えてから、詰めて並べ直す
  // ダークモードのスイッチカードはどのカテゴリにも属さないため、絞り込みの対象外として常に表示する
  cardEls.forEach((el) => {
    if (el.dataset.action === "theme-toggle") return;
    el.classList.toggle(
      "is-hidden",
      filter !== "all" && el.dataset.category !== filter
    );
  });
  freezeLayout();

  if (reduceMotion) return;

  cardEls.forEach((el) => {
    if (el.classList.contains("is-hidden")) return;
    if (before.has(el)) {
      // 表示されたままのカード → 元の位置から上へスライドして詰める
      flipAnimate(el, before.get(el), FILTER_MS);
    } else {
      // 新しく現れたカード → 下からスッと上がって表示
      el.animate(
        [
          { opacity: 0, transform: "translateY(40px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: FILTER_MS, easing: SLIDE_EASE }
      );
    }
  });
}

// ------------------------------------------------------------
// 4. ヘッダーのスクロール変化
// ------------------------------------------------------------
function onScroll() {
  header.classList.toggle("is-scrolled", window.scrollY > 32);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ------------------------------------------------------------
// 4b. ハンバーガーメニュー(フィルターの開閉)
//     PC: ホバーで開く(開きっぱなし) / タッチ端末: タップで開閉
// ------------------------------------------------------------
const menuToggle = document.querySelector(".menu-toggle");
const canHover = window.matchMedia("(hover: hover)");
// スマホ用パネル表示になる画面幅かどうか
const panelQuery = window.matchMedia("(max-width: 767px)");

// パネル表示のときは、選択後に自動で閉じる
function closePanelIfMobile() {
  if (panelQuery.matches || !canHover.matches) setMenuOpen(false);
}

function setMenuOpen(open) {
  header.classList.toggle("is-menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
}

menuToggle.addEventListener("mouseenter", () => {
  if (canHover.matches) setMenuOpen(true);
});

menuToggle.addEventListener("click", () => {
  setMenuOpen(!header.classList.contains("is-menu-open"));
});

// ------------------------------------------------------------
// 5. マス目レイアウトの固定(スロット方式)
//    ※スマホ(1カラム)ではマス目が無いため通常の並び方式になる
// ------------------------------------------------------------
const slotLayoutQuery = window.matchMedia("(min-width: 768px)");
let slotMode = false;

// カードが占めるマス数(横×縦)
function getSpan(el) {
  return {
    w: el.classList.contains("card--wide") ? 2 : 1,
    h: el.classList.contains("card--tall") ? 2 : 1,
  };
}

// マス目の寸法情報(列数・1マスの大きさ・すき間・左上の基準位置)
function getGridMetrics() {
  const style = getComputedStyle(grid);
  const colWidths = style.gridTemplateColumns.split(" ").map(parseFloat);
  const rect = grid.getBoundingClientRect();
  const cols = colWidths.length;
  const colW = colWidths[0];
  const gapX = parseFloat(style.columnGap) || 0;
  const gapY = parseFloat(style.rowGap) || 0;
  // justify-content: center による左側の余白ぶんを差し引く
  const pad = (rect.width - (cols * colW + (cols - 1) * gapX)) / 2;
  return {
    cols,
    colW,
    rowH: colW, // 1マスは正方形
    gapX,
    gapY,
    left: rect.left + pad,
    top: rect.top,
  };
}

// カードの現在のマス座標(スタイルから読む)
function getArea(el) {
  const span = getSpan(el);
  return {
    c: parseInt(el.style.gridColumnStart, 10) || 1,
    r: parseInt(el.style.gridRowStart, 10) || 1,
    w: span.w,
    h: span.h,
  };
}

// 座標を固定するときは、横長・縦長のマスまたぎ(span)も一緒に指定する。
// 開始位置だけ上書きすると、CSS側のspan指定が消えてしまうため
function setArea(el, area) {
  const span = getSpan(el);
  el.style.gridColumn = `${area.c} / span ${span.w}`;
  el.style.gridRow = `${area.r} / span ${span.h}`;
}

// 2つのエリアが重なっているか
function overlapsArea(a, b) {
  return a.c < b.c + b.w && b.c < a.c + a.w && a.r < b.r + b.h && b.r < a.r + a.h;
}

// 全カードを自動配置で並べ直してから、マス座標に固定する
function freezeLayout() {
  const cardEls = [...grid.querySelectorAll(".card")];

  // 一旦座標指定を外して、ブラウザの自動配置に任せる
  cardEls.forEach((el) => {
    el.style.gridColumn = "";
    el.style.gridRow = "";
  });

  slotMode = slotLayoutQuery.matches;
  if (!slotMode) return;

  // 自動配置の結果を「全カードぶん測り終えてから」まとめて固定する。
  // 測りながら固定すると、固定済みカードの影響で後のカードの位置がズレるため
  const m = getGridMetrics();
  const rects = new Map();
  cardEls.forEach((el) => {
    if (el.classList.contains("is-hidden")) return;
    rects.set(el, el.getBoundingClientRect());
  });
  rects.forEach((r, el) => {
    setArea(el, {
      c: Math.round((r.left - m.left) / (m.colW + m.gapX)) + 1,
      r: Math.round((r.top - m.top) / (m.rowH + m.gapY)) + 1,
    });
  });
}

// ドラッグで並び替えた後、見た目の順(上→下・左→右)にDOMの順番を揃える。
// 画面サイズが変わって並べ直すときに、今の並び順が保たれるようにするため
function syncDomOrder() {
  if (!slotMode) return;
  const visible = [...grid.querySelectorAll(".card")].filter(
    (el) => !el.classList.contains("is-hidden")
  );
  visible.sort((a, b) => {
    const areaA = getArea(a);
    const areaB = getArea(b);
    return areaA.r - areaB.r || areaA.c - areaB.c;
  });
  visible.forEach((el) => grid.appendChild(el));
}

// 画面サイズが変わったら並べ直す(ドラッグ中は終わってから)
let resizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (!drag) freezeLayout();
  }, 150);
});

// 初期配置を固定
freezeLayout();

// ------------------------------------------------------------
// 6. ドラッグでカード並び替え
//    - マウス/ペン: 少し動かすとドラッグ開始
//    - タッチ: 長押し(250ミリ秒)でドラッグ開始
//    - カードの上で離す → そのカードと場所を交換
//    - 空きマスで離す → その空きマスに移動
//    - 無関係なカードは動かない
// ------------------------------------------------------------
const DRAG_THRESHOLD = 8; // ドラッグ開始とみなす移動量(px)
const LONG_PRESS_MS = 250; // タッチの長押し時間
const SWAP_COOLDOWN_MS = 200; // 入れ替えの最短間隔

let drag = null; // ドラッグ中の状態をまとめて持つ
let suppressClick = false; // ドラッグ直後のリンククリックを無効化するフラグ
let lastReorderAt = 0;

// ドラッグ直後のクリック(リンク遷移)をキャンセル
grid.addEventListener(
  "click",
  (e) => {
    if (suppressClick) {
      e.preventDefault();
      e.stopPropagation();
      suppressClick = false;
    }
  },
  true
);

const preventTouchScroll = (e) => e.preventDefault();

grid.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "mouse" && e.button !== 0) return;
  const card = e.target.closest(".card");
  if (!card || drag) return;

  drag = {
    card,
    pointerId: e.pointerId,
    pointerType: e.pointerType,
    startX: e.clientX,
    startY: e.clientY,
    lastX: e.clientX,
    lastY: e.clientY,
    active: false,
    placeholder: null,
    rafPending: false,
    longPressTimer: null,
  };

  // タッチは長押しでドラッグ開始(すぐ動かすとスクロールと判定)
  if (e.pointerType === "touch") {
    drag.longPressTimer = setTimeout(() => {
      if (drag && !drag.active) liftCard();
    }, LONG_PRESS_MS);
  }

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
  document.addEventListener("pointercancel", onPointerUp);
});

function onPointerMove(e) {
  if (!drag || e.pointerId !== drag.pointerId) return;
  drag.lastX = e.clientX;
  drag.lastY = e.clientY;

  const dx = e.clientX - drag.startX;
  const dy = e.clientY - drag.startY;
  const dist = Math.hypot(dx, dy);

  if (!drag.active) {
    if (drag.pointerType === "touch") {
      // 長押し前に大きく動いた → スクロール操作なのでドラッグ中止
      if (dist > 10) cleanupDrag();
    } else if (dist > DRAG_THRESHOLD) {
      liftCard();
    }
    return;
  }

  // ドラッグ中: カードを指に追従させる
  positionCard(e.clientX, e.clientY);

  // 移動先の判定は描画タイミングに間引いて実行(負荷対策)
  if (!drag.rafPending) {
    drag.rafPending = true;
    requestAnimationFrame(() => {
      if (drag && drag.active) updateDropPosition(drag.lastX, drag.lastY);
      if (drag) drag.rafPending = false;
    });
  }
}

function onPointerUp(e) {
  if (!drag || e.pointerId !== drag.pointerId) return;
  if (drag.active) {
    dropCard();
    // ドラッグ直後のクリックだけ無効化(念のため少し後に解除)
    suppressClick = true;
    setTimeout(() => (suppressClick = false), 100);
  }
  cleanupDrag();
}

// カードを持ち上げる(ドラッグ開始)
function liftCard() {
  const { card } = drag;
  const rect = card.getBoundingClientRect();
  drag.active = true;

  // 元の位置にプレースホルダー(見えない場所取り)を置く
  const ph = document.createElement("div");
  ph.className = "card-placeholder";
  if (card.classList.contains("card--wide")) ph.classList.add("card--wide");
  if (card.classList.contains("card--tall")) ph.classList.add("card--tall");
  drag.placeholder = ph;

  if (slotMode) {
    // カードが居たマス座標をそのまま引き継ぐ
    setArea(ph, getArea(card));
    grid.appendChild(ph);
  } else {
    grid.insertBefore(ph, card);
  }

  // カードを画面固定にして指に追従できるようにする
  card.classList.add("is-dragging");
  Object.assign(card.style, {
    position: "fixed",
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    left: `${rect.left}px`,
    top: `${rect.top}px`,
  });

  // ドラッグ中はページスクロールを止める(タッチ用)
  document.addEventListener("touchmove", preventTouchScroll, { passive: false });

  positionCard(drag.lastX, drag.lastY);
}

// カードを指の位置に追従させる
function positionCard(x, y) {
  const dx = x - drag.startX;
  const dy = y - drag.startY;
  const scale = reduceMotion ? 1 : 1.04;
  drag.card.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
}

// 移動先を判定して、プレースホルダー(=カードが収まる予定の場所)を動かす
function updateDropPosition(x, y) {
  if (performance.now() - lastReorderAt < SWAP_COOLDOWN_MS) return;

  const targets = [...grid.querySelectorAll(".card")].filter(
    (el) => el !== drag.card && !el.classList.contains("is-hidden")
  );
  if (targets.length === 0) return;

  // 指の真下にあるカード
  const pointerTarget = targets.find((el) => {
    const r = el.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  });

  if (slotMode) {
    updateDropPositionSlot(x, y, pointerTarget, targets);
  } else {
    updateDropPositionFlow(x, y, pointerTarget || findMostOverlapped(targets));
  }
}

// ドラッグ中のカードと一番大きく重なっているカードを探す(重なり35%以上)
function findMostOverlapped(targets) {
  const dragRect = drag.card.getBoundingClientRect();
  let best = null;
  let bestRatio = 0;
  for (const el of targets) {
    const r = el.getBoundingClientRect();
    const w = Math.min(dragRect.right, r.right) - Math.max(dragRect.left, r.left);
    const h = Math.min(dragRect.bottom, r.bottom) - Math.max(dragRect.top, r.top);
    if (w <= 0 || h <= 0) continue;
    // 重なり面積が「小さい方のカード」の何割を占めるか
    const overlap = w * h;
    const smaller = Math.min(
      dragRect.width * dragRect.height,
      r.width * r.height
    );
    const ratio = overlap / smaller;
    if (ratio > bestRatio && ratio >= 0.35) {
      bestRatio = ratio;
      best = el;
    }
  }
  return best;
}

// --- スロット方式(タブレット以上) ---
// 「動かしているカードが最優先」:
// 指した場所にドラッグ中のカードが入り、
// 邪魔になるカードの方が近くの空きマスへどく
function updateDropPositionSlot(x, y, pointerTarget, targets) {
  const m = getGridMetrics();

  let anchor = null;
  if (pointerTarget) {
    // カードの上 → そのカードの位置に入る
    const t = getArea(pointerTarget);
    anchor = { c: t.c, r: t.r };
  } else if (
    x >= m.left &&
    x <= m.left + m.cols * (m.colW + m.gapX) &&
    y >= m.top
  ) {
    // 空きスペース → 指しているマスに入る
    anchor = {
      c: Math.floor((x - m.left) / (m.colW + m.gapX)) + 1,
      r: Math.floor((y - m.top) / (m.rowH + m.gapY)) + 1,
    };
  } else {
    // グリッドの外 → 大きく重なっているカードがあればその位置に入る
    const overlapped = findMostOverlapped(targets);
    if (!overlapped) return;
    const t = getArea(overlapped);
    anchor = { c: t.c, r: t.r };
  }

  tryOccupy(anchor, m);
}

// アンカー位置にプレースホルダーを置き、他のカードを「縦方向重力」で整列する。
// ・動かしているカードが最優先(指した場所に必ず入る)
// ・他のカードは自分の列から横に動かない(斜め移動なし)
//   - 邪魔になったカードは真下に押し下がる
//   - 隙間があれば、まっすぐ上に詰める
function tryOccupy(anchor, m) {
  const { placeholder } = drag;
  const phArea = getArea(placeholder);
  const span = getSpan(placeholder);

  // 行き先(はみ出す場合は列を内側に寄せる)
  const area = {
    c: Math.min(Math.max(1, anchor.c), m.cols - span.w + 1),
    r: Math.max(1, anchor.r),
    w: span.w,
    h: span.h,
  };
  if (area.c === phArea.c && area.r === phArea.r) return;

  const others = [...grid.querySelectorAll(".card")].filter(
    (el) => el !== drag.card && !el.classList.contains("is-hidden")
  );
  const beforeRects = new Map(
    others.map((el) => [el, el.getBoundingClientRect()])
  );

  setArea(placeholder, area);

  // 上の行のカードから順に、それぞれ自分の列のまま
  // 「他とぶつからない一番上の行」に置き直す
  const placed = [area];
  const items = [...others].sort((a, b) => {
    const areaA = getArea(a);
    const areaB = getArea(b);
    return areaA.r - areaB.r || areaA.c - areaB.c;
  });
  for (const el of items) {
    const cur = getArea(el);
    const cand = { c: cur.c, r: 1, w: cur.w, h: cur.h };
    while (placed.some((p) => overlapsArea(cand, p))) {
      cand.r++;
    }
    setArea(el, cand);
    placed.push(cand);
  }

  lastReorderAt = performance.now();

  if (reduceMotion) return;
  others.forEach((el) => flipAnimate(el, beforeRects.get(el)));
}

// --- 通常方式(スマホの1カラム): 並び順の入れ替えで動かす ---
function updateDropPositionFlow(x, y, target) {
  const { placeholder } = drag;
  const targets = [...grid.children].filter(
    (el) =>
      el !== drag.card &&
      el !== placeholder &&
      el.classList.contains("card") &&
      !el.classList.contains("is-hidden")
  );

  if (target) {
    const before = new Map(targets.map((el) => [el, el.getBoundingClientRect()]));
    swapElements(placeholder, target);
    lastReorderAt = performance.now();
    if (reduceMotion) return;
    targets.forEach((el) => flipAnimate(el, before.get(el)));
    return;
  }

  // カードの無い場所 → 読み順で指の位置に相当する場所へ
  const gridRect = grid.getBoundingClientRect();
  if (x < gridRect.left || x > gridRect.right || y < gridRect.top || y > gridRect.bottom) {
    return;
  }

  const nextCard = targets.find((el) => {
    const r = el.getBoundingClientRect();
    const sameRow = y >= r.top && y < r.bottom;
    return (sameRow && r.left > x) || r.top >= y;
  });

  if (nextCard) {
    if (placeholder.nextElementSibling === nextCard) return;
  } else if (grid.lastElementChild === placeholder) {
    return;
  }

  const before = new Map(targets.map((el) => [el, el.getBoundingClientRect()]));
  if (nextCard) {
    grid.insertBefore(placeholder, nextCard);
  } else {
    grid.appendChild(placeholder);
  }
  lastReorderAt = performance.now();

  if (reduceMotion) return;
  targets.forEach((el) => flipAnimate(el, before.get(el)));
}

// 2つの要素のDOM上の位置を交換する
function swapElements(a, b) {
  const marker = document.createComment("");
  a.replaceWith(marker);
  b.replaceWith(a);
  marker.replaceWith(b);
}

// 要素を「元の位置 → 今の位置」へ滑らかにスライドさせる(FLIPアニメーション)
function flipAnimate(el, prevRect, duration = SLIDE_MS) {
  if (!prevRect) return;
  const nextRect = el.getBoundingClientRect();

  // すでにアニメーション中なら、今見えている位置から続きを動かす(カクつき防止)
  let curX = 0;
  let curY = 0;
  if (el._slideAnim) {
    const matrix = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    curX = matrix.e;
    curY = matrix.f;
    el._slideAnim.cancel();
  }

  const dx = prevRect.left - nextRect.left + curX;
  const dy = prevRect.top - nextRect.top + curY;
  if (dx === 0 && dy === 0) return;

  el._slideAnim = el.animate(
    [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }],
    { duration, easing: SLIDE_EASE }
  );
  el._slideAnim.onfinish = () => (el._slideAnim = null);
}

// カードを離す(位置を確定)
function dropCard() {
  const { card, placeholder } = drag;
  const from = card.getBoundingClientRect();
  const to = placeholder.getBoundingClientRect();

  // プレースホルダーの場所にカードを収める
  if (slotMode) {
    setArea(card, getArea(placeholder));
    placeholder.remove();
  } else {
    grid.insertBefore(card, placeholder);
    placeholder.remove();
  }

  card.classList.remove("is-dragging");
  card.style.position = "";
  card.style.width = "";
  card.style.height = "";
  card.style.left = "";
  card.style.top = "";
  card.style.transform = "";

  syncDomOrder();

  // 離した位置から確定位置へスッと吸い込まれるアニメーション
  if (!reduceMotion) {
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    card.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(1.04)` },
        { transform: "none" },
      ],
      { duration: 400, easing: SLIDE_EASE }
    );
  }
}

// ドラッグ状態の後片付け
function cleanupDrag() {
  if (drag && drag.longPressTimer) clearTimeout(drag.longPressTimer);
  if (drag && drag.active === false && drag.placeholder) drag.placeholder.remove();
  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
  document.removeEventListener("pointercancel", onPointerUp);
  document.removeEventListener("touchmove", preventTouchScroll);
  drag = null;
}

// ------------------------------------------------------------
// 7. カード詳細ポップアップ(詳細ページを作らないカード向け)
//    data.popup を持つカードだけ、クリックで別ページに行かず
//    画面中央にタイトル・紹介文・LINKSボタンをポップアップ表示する
// ------------------------------------------------------------
const popupCards = cards.filter((data) => data.popup);

if (popupCards.length > 0) {
  const popup = document.createElement("dialog");
  popup.className = "card-popup";
  popup.innerHTML = `
    <div class="popup-inner">
      <span class="popup-tag"></span>
      <h2 class="popup-title"></h2>
      <p class="popup-intro"></p>
      <div class="popup-links">
        <p class="sec-label">Links</p>
        <h3>もっと詳しく</h3>
        <div class="link-list"></div>
      </div>
    </div>
    <button type="button" class="popup-close" aria-label="閉じる">&#10005;</button>
  `;
  document.body.append(popup);

  const popupTag = popup.querySelector(".popup-tag");
  const popupTitle = popup.querySelector(".popup-title");
  const popupIntro = popup.querySelector(".popup-intro");
  const popupLinkList = popup.querySelector(".link-list");

  function openPopup(data) {
    const lang = document.documentElement.lang;
    popupTag.textContent = categoryLabel[data.category] || data.category;
    popupTitle.textContent = (data[lang] || data.ja).title;
    popupIntro.innerHTML = data.popup.intro.join("<br>");
    popupLinkList.innerHTML = data.popup.links
      .map((link) => {
        const toneClass = link.tone === "white" ? " cta--white" : "";
        const externalAttrs = link.external ? ' target="_blank" rel="noopener"' : "";
        return `
          <a class="cta${toneClass}" href="${link.href}"${externalAttrs}>
            <span class="label"><span class="sub">${link.sub}</span>${link.label}</span>
            <span class="circle" aria-hidden="true">&#8594;</span>
          </a>
        `;
      })
      .join("");
    popup.showModal();
  }

  popupCards.forEach((data) => {
    const cardLink = grid.querySelector(`.card[data-id="${data.id}"] .card-link`);
    cardLink.addEventListener("click", (e) => {
      e.preventDefault();
      openPopup(data);
    });
  });

  popup.querySelector(".popup-close").addEventListener("click", () => popup.close());

  // 背景(枠の外)をクリックしたら閉じる。Escで閉じるのはdialog標準機能
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.close();
  });
}
