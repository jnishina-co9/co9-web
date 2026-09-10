/* ============================================================
   ギャラリー用ライトボックス(グラフィック作品ページ共用)
   - .g-link(メインビジュアル・ギャラリー内)をクリックすると拡大表示
   - <dialog>要素を使用(Escで閉じる・背景クリックで閉じる)
   - ← →キー / ボタンで前後の画像へ移動
   - JSが無効でも .g-link は画像への通常リンクとして動く
   ============================================================ */

const links = [...document.querySelectorAll(".g-link")];

if (links.length > 0) {
  // 表示に使うデータ(画像パス・代替テキスト・キャプション)を集める
  const slides = links.map((link) => {
    const img = link.querySelector("img");
    const caption = link.closest(".g-item")?.querySelector("figcaption");
    return {
      src: link.getAttribute("href"),
      alt: img ? img.alt : "",
      caption: caption ? caption.textContent.trim() : "",
    };
  });

  // ダイアログを1つだけ生成してbody末尾に追加
  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "画像の拡大表示");
  dialog.innerHTML = `
    <figure>
      <button type="button" class="lb-btn lb-close" aria-label="閉じる">&#10005;</button>
      <button type="button" class="lb-btn lb-prev" aria-label="前の画像">&#8592;</button>
      <button type="button" class="lb-btn lb-next" aria-label="次の画像">&#8594;</button>
      <img alt="">
      <figcaption class="lb-caption"></figcaption>
    </figure>
  `;
  document.body.append(dialog);

  const image = dialog.querySelector("img");
  const captionEl = dialog.querySelector(".lb-caption");
  const prevBtn = dialog.querySelector(".lb-prev");
  const nextBtn = dialog.querySelector(".lb-next");
  let current = 0;

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    const slide = slides[current];
    image.src = slide.src;
    image.alt = slide.alt;
    captionEl.textContent = slide.caption;
  };

  links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      show(index);
      dialog.showModal();
    });
  });

  dialog.querySelector(".lb-close").addEventListener("click", () => dialog.close());
  prevBtn.addEventListener("click", () => show(current - 1));
  nextBtn.addEventListener("click", () => show(current + 1));

  // 画像が1枚だけの作品では前後ボタンを隠す
  if (slides.length < 2) {
    prevBtn.hidden = true;
    nextBtn.hidden = true;
  }

  // ← →キーで前後移動(Escで閉じるのはdialog標準機能)
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });

  // 画像の外(背景)をクリックしたら閉じる
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
