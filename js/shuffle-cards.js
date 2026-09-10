/* ============================================================
   シャッフルカード型(AIアート作品)共通の切り替え挙動
   - お手本: works/art001-ai-art.html(css/work.cssの.shuffle-cardsと対)
   - 各.shuffle-thumb(ボタン)をホバー/フォーカスすると、そのカードを
     一時的に手前に表示する(プレビュー)
   - クリック/タップすると、その版を選択状態として固定する
     (プレビューを終える=マウスを離す/フォーカスが外れると、
      固定した版の表示に戻る)
   - 対応するカードに is-active クラスを付け外しするだけの単純な仕組み
     (見た目の詳細はcss/work.cssの .shuffle-card.is-active 側で定義)
   ============================================================ */

document.querySelectorAll(".shuffle-cards").forEach((group) => {
  const cards = [...group.querySelectorAll(".shuffle-card")];

  let lockedIndex = cards.findIndex((card) => card.classList.contains("is-active"));
  if (lockedIndex < 0) lockedIndex = 0;
  let activeIndex = lockedIndex;

  const render = () => {
    cards.forEach((card, i) => {
      const isActive = i === activeIndex;
      card.classList.toggle("is-active", isActive);
      card.querySelector(".shuffle-thumb")?.setAttribute("aria-pressed", String(isActive));
    });
  };

  cards.forEach((card, i) => {
    const thumb = card.querySelector(".shuffle-thumb");
    if (!thumb) return;

    thumb.addEventListener("mouseenter", () => {
      activeIndex = i;
      render();
    });
    thumb.addEventListener("mouseleave", () => {
      activeIndex = lockedIndex;
      render();
    });
    thumb.addEventListener("focus", () => {
      activeIndex = i;
      render();
    });
    thumb.addEventListener("blur", () => {
      activeIndex = lockedIndex;
      render();
    });
    thumb.addEventListener("click", () => {
      lockedIndex = i;
      activeIndex = i;
      render();
    });
  });

  render();
});
