/* ============================================================
   シャッフルカード型(AIアート作品)用 カルーセル付きポップアップ
   - .shuffle-cards--popup 内の扇サムネイル(.shuffle-thumb)をクリックすると開く
   - メイン画像の上下に余白を確保し、左右に専用列の矢印ボタンを配置
   - 下部に元画像比率の小さいサムネイル(左寄せ)と解説文を表示し、
     横幅をメイン画像の表示幅に同期する
   - 閉じるボタンは枠外右上に配置(gra/hndのライトボックスと統一)
   ============================================================ */

document.querySelectorAll(".shuffle-cards--popup").forEach((group) => {
  const cards = [...group.querySelectorAll(".shuffle-card")];
  if (cards.length === 0) return;

  const slides = cards.map((card) => {
    const link = card.querySelector(".shuffle-visual a");
    const img = card.querySelector(".shuffle-visual img") || card.querySelector(".shuffle-thumb img");
    const caption = card.querySelector(".shuffle-data p");
    return {
      src: link ? link.getAttribute("href") : img?.getAttribute("src") || "",
      alt: img ? img.alt : "",
      caption: caption ? caption.textContent.trim() : "",
    };
  });

  const dialog = document.createElement("dialog");
  dialog.className = "art-popup";
  dialog.setAttribute("aria-label", "作品の拡大表示");
  dialog.innerHTML = `
    <div class="art-popup-inner">
      <figure class="art-popup-figure">
        <div class="art-popup-stage">
          <button type="button" class="art-popup-nav art-popup-prev" aria-label="前の画像">&#8592;</button>
          <img class="art-popup-main" alt="">
          <button type="button" class="art-popup-nav art-popup-next" aria-label="次の画像">&#8594;</button>
        </div>
        <div class="art-popup-meta">
          <div class="art-popup-thumbs" role="group" aria-label="バージョンの選択"></div>
          <figcaption class="art-popup-caption"></figcaption>
        </div>
      </figure>
    </div>
    <button type="button" class="art-popup-close" aria-label="閉じる">&#10005;</button>
  `;
  document.body.append(dialog);

  const mainImg = dialog.querySelector(".art-popup-main");
  const metaWrap = dialog.querySelector(".art-popup-meta");
  const thumbsWrap = dialog.querySelector(".art-popup-thumbs");
  const captionEl = dialog.querySelector(".art-popup-caption");
  const prevBtn = dialog.querySelector(".art-popup-prev");
  const nextBtn = dialog.querySelector(".art-popup-next");
  let current = 0;

  if (slides.length < 2) {
    prevBtn.hidden = true;
    nextBtn.hidden = true;
  }

  // サムネイルと解説文の横幅をメイン画像の実際の表示幅に揃える
  const syncMetaWidth = () => {
    const w = mainImg.getBoundingClientRect().width;
    if (w > 0) metaWrap.style.width = `${w}px`;
  };
  mainImg.addEventListener("load", syncMetaWidth);
  new ResizeObserver(syncMetaWidth).observe(mainImg);

  const thumbBtns = slides.map((slide, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "art-popup-thumb";
    btn.setAttribute("aria-label", `バージョン${i + 1}を表示`);
    const tImg = document.createElement("img");
    tImg.src = slide.src;
    tImg.alt = "";
    btn.append(tImg);
    btn.addEventListener("click", () => show(i));
    thumbsWrap.append(btn);
    return btn;
  });

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    const slide = slides[current];
    mainImg.src = slide.src;
    mainImg.alt = slide.alt;
    captionEl.textContent = slide.caption;
    thumbBtns.forEach((btn, i) => {
      const active = i === current;
      btn.classList.toggle("is-current", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    if (mainImg.complete) syncMetaWidth();
  };

  cards.forEach((card, i) => {
    const thumb = card.querySelector(".shuffle-thumb");
    thumb?.addEventListener("click", () => {
      show(i);
      dialog.showModal();
      requestAnimationFrame(syncMetaWidth);
    });
  });

  dialog.querySelector(".art-popup-close").addEventListener("click", () => dialog.close());
  prevBtn.addEventListener("click", () => show(current - 1));
  nextBtn.addEventListener("click", () => show(current + 1));

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});
