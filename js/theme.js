// ============================================================
// ダークモードのスイッチボタン制御
// 実際の切り替え(<html>へのdata-theme付与)は各HTML内の
// 先頭インラインスクリプトが初期表示時点で行っている(ちらつき防止のため)。
// このモジュールはボタンのクリック操作と、選択結果のlocalStorageへの保存を担当する。
// ============================================================

const STORAGE_KEY = "theme";
const toggle = document.getElementById("theme-toggle");
const icon = toggle?.querySelector(".theme-icon");

function reflectTheme(theme) {
  if (!toggle) return;
  const isDark = theme === "dark";
  toggle.setAttribute("aria-pressed", String(isDark));
  toggle.setAttribute(
    "aria-label",
    isDark ? "ライトモードに切り替える" : "ダークモードに切り替える"
  );
  if (icon) icon.textContent = isDark ? "☀" : "☾";
}

reflectTheme(document.documentElement.dataset.theme || "light");

toggle?.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem(STORAGE_KEY, next);
  reflectTheme(next);
});
