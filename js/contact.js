/* ============================================================
   お問い合わせフォーム送信処理
   - GAS(Google Apps Script)のウェブアプリへPOSTし、
     スプレッドシートへの保存とJunkoさんへの通知メールを行う
   - GAS_URLはデプロイ後に発行されるURLへ書き換える
   ============================================================ */

const GAS_URL = "https://script.google.com/macros/s/AKfycbzA2e4Y83wdlZ7NK_rycgtOfwXZXXUq2n_NFt7G9sqM3LUOLk8UAqABahcQsh-EveGc/exec";

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const viewInput = document.getElementById("view-input");
const viewConfirm = document.getElementById("view-confirm");
const toConfirmButton = document.getElementById("to-confirm-btn");
const backToInputButton = document.getElementById("back-to-input-btn");

// 未記入の任意項目を確認画面に表示するときの文言
const EMPTY_LABEL = "(未記入)";

if (form && viewInput && viewConfirm && toConfirmButton && backToInputButton) {
  toConfirmButton.addEventListener("click", () => {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    document.getElementById("confirm-name").textContent =
      `${form.elements.lastName.value} ${form.elements.firstName.value}`;
    document.getElementById("confirm-kana").textContent =
      `${form.elements.lastNameKana.value} ${form.elements.firstNameKana.value}`;
    document.getElementById("confirm-email").textContent = form.elements.email.value;
    document.getElementById("confirm-company").textContent =
      form.elements.company.value.trim() || EMPTY_LABEL;
    document.getElementById("confirm-phone").textContent =
      form.elements.phone.value.trim() || EMPTY_LABEL;
    document.getElementById("confirm-message").textContent = form.elements.message.value;

    viewInput.hidden = true;
    viewConfirm.hidden = false;
    viewConfirm.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  backToInputButton.addEventListener("click", () => {
    viewConfirm.hidden = true;
    viewInput.hidden = false;
    viewInput.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // ハニーポット(人には見えない罠の項目)が埋まっていたらbotとみなし、
    // 実際には送信せず成功したふり(サンクスページへ移動)だけをして終える
    if (form.elements.website.value) {
      window.location.href = "thanks.html";
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!GAS_URL.startsWith("https://script.google.com")) {
      statusEl.textContent = "フォームの送信先が未設定です。管理者にご連絡ください。";
      statusEl.dataset.state = "error";
      return;
    }

    const submitButton = form.querySelector("button[type=submit]");
    submitButton.disabled = true;
    statusEl.textContent = "送信中です…";
    statusEl.dataset.state = "";

    try {
      // Content-Typeをtext/plainやapplication/jsonにするとブラウザが
      // プリフライト(事前確認)通信を送ってしまい、GAS側で処理できず失敗するため、
      // multipart/form-dataになるFormDataのまま送る(プリフライトが発生しない形式)
      const response = await fetch(GAS_URL, {
        method: "POST",
        body: new FormData(form),
      });

      const result = await response.json();

      if (result.result !== "success") {
        throw new Error(result.message || "送信に失敗しました");
      }

      // 成功したらサンクスページへ移動する
      window.location.href = "thanks.html";
    } catch (error) {
      statusEl.textContent = "送信に失敗しました。時間をおいて再度お試しください。";
      statusEl.dataset.state = "error";
    } finally {
      submitButton.disabled = false;
    }
  });
}
