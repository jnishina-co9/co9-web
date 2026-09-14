// ============================================================
// カードデータと画面の文言(日本語/英語)
// カードを追加・変更するときはこのファイルだけ編集すればOK
// ------------------------------------------------------------
// size: "s"  = 1:1(正方形) / "w" = 2:1(横長) / "t" = 1:2(縦長)
// category: "solution" | "creation" | "column" | "about"
// tone: カードの色。省略時はcategoryで自動判定(solution=黒塗り、creation=白地黒枠、
//       column/about=薄グレー地)。個別に上書きしたい時だけ "dark"/"light"/"muted" を指定
// href: カードのリンク先(準備できたらURLを入れる)
// ja/en.title: 作品カード(works/*.htmlがある場合)は、そのページのh1
//       (タイトルカード内の見出し)と表記を完全一致させる。
//       about-gridの「Project」欄(project-name)は別の項目なので混同しないこと
// action: "theme-toggle" を指定すると、リンクカードの代わりに
//       ダーク/ライト切替スイッチを内蔵したカードになる(hrefは不要。
//       タグは「DARK MODE」固定表示、フィルターの絞り込み対象外。
//       ja/en.titleは他カードと同じくカード見出し(一言説明)として表示)。
//       現状「darkmode」カード専用
// action: "intro-text" を指定すると、常時テキスト表示の紹介カードになる
//       (href不要。ja/enに title と body が必要。ページ遷移はしないが、
//       →アイコンをクリックすると自身のcategoryでフィルター絞り込みが働く。
//       他のカードと同様、絞り込み・ドラッグ並び替えの対象)
// id命名規則: sol/art/gra/hnd/web/col + 3桁連番(例: sol015、col003)。
//       連番は各接頭辞の最大値+1をこのファイルから採番する。
//       ただしabout系(profile/contact等)と各カテゴリのintroカード
//       (solution-intro等)は連番の対象外で、意味の分かる名前のままでよい
//       (2026-09-07改定: columnも従来はスラッグ命名だったが連番方式に統一。
//       追加は /j-clm コマンドを使う)
// ============================================================

export const cards = [
  {
    id: "col007",
    category: "column",
    size: "s",
    href: "https://note.com/co9_note/n/n17fb0b664e42",
    popup: {
      intro: [
        "これまでノーコードのStudioで運用していたポートフォリオサイトを、自作コードとGitHub Pages（無料のサイト公開機能）へ移行した作業記録をまとめました。AIツールの進化をきっかけに、「自分自身の手でコードを実装・管理したい」という思いから挑戦した実体験です。",
        "「使っていた独自ドメインの移行手順」や「完全無料でお問い合わせフォームを動かす仕組み」など、非エンジニアがつまずきやすいポイントを5つのステップで整理しました。ドメイン代以外は完全無料で本番公開に至るまでの全手順を公開しています。",
        "続きはnoteの記事でご覧いただけます。",
      ],
      links: [
        {
          sub: "VISIT",
          label: "ポートフォリオサイトを見る",
          href: "https://co9co9.com/",
          external: true,
        },
        {
          sub: "NOTE",
          label: "noteで記事を読む",
          href: "https://note.com/co9_note/n/n17fb0b664e42",
          external: true,
        },
      ],
    },
    ja: { title: "StudioからGitHub Pagesへ、独自ドメインを完全無料で移行した5ステップ" },
    en: { title: "5 Steps to Migrating a Custom Domain from Studio to GitHub Pages for Free" },
  },
  {
    id: "sol016",
    category: "solution",
    size: "s",
    href: "works/sol016-skill-library-ver1.html",
    ja: { title: "Web制作 ルール＆スキル集 ver.1" },
    en: { title: "Web Production Rules & Skill Library" },
  },
  {
    id: "col006",
    category: "column",
    size: "w",
    href: "https://note.com/co9_note/n/n94a691f692f6",
    popup: {
      intro: [
        "Googleスプレッドシートに、AIが自動で表やグラフを組み立ててくれる新機能「ビルド機能」と「Create a canvas」が登場しました(一部有料プランのみ展開中、2026年6月時点)。",
        "今回は架空のホットサンド屋さんのデータ(1週間分の売上・客数・経費)を用意し、グラフ作成やクロス集計、原価分析、ダッシュボード作成など7つのプロンプトで検証しました。",
        "関数やグラフの範囲指定を覚える必要はなく、「〇〇のデータからこういう表を作って」と伝えるだけで完成します。",
        "関数やグラフ作成でつまずいていた方にとって、専門知識なしでスプレッドシートを使いこなせる大きな進化だと感じています。",
        "続きはnoteの記事でご覧いただけます。",
      ],
      links: [
        {
          sub: "NOTE",
          label: "noteで記事を読む",
          href: "https://note.com/co9_note/n/n94a691f692f6",
          external: true,
        },
      ],
    },
    ja: { title: "スプレッドシートが劇的進化。AIにお願いするだけで表もグラフも完成!" },
    en: { title: "Spreadsheets, Reinvented: Just Ask AI and Your Tables and Charts Are Done" },
  },
  {
    id: "sol015",
    category: "solution",
    size: "s",
    href: "works/sol015-cursor-highlighter.html",
    ja: { title: "画面共有・プレゼン用カーソル可視化ツール『Cursor Highlighter』" },
    en: { title: "Cursor Highlighter: Cursor Visualization Tool for Presentations & Screen Sharing" },
  },
  {
    id: "sol014",
    category: "solution",
    size: "w",
    href: "works/sol014-kintai-app.html",
    ja: { title: "写真記録付き勤怠管理アプリ" },
    en: { title: "Photo-Verified Attendance Management App" },

  },
  {
    id: "web008",
    category: "creation",
    size: "t",
    href: "works/web008-line-tools.html",
    ja: { title: "LINEスタンプ制作応援ツール ポータルサイト" },
    en: { title: "LINE Sticker Tools Portal" },
  },
  {
    id: "web007",
    category: "creation",
    size: "s",
    href: "works/web007-bagel-shop.html",
    ja: { title: "ベーグルショップ『BAGEL & CO.』ブランドサイト" },
    en: { title: "BAGEL & CO. Brand Website" },
  },
  {
    id: "art008",
    category: "creation",
    size: "s",
    illustration: "img/works/art008/01.webp",
    href: "works/art008-ai-art.html",
    ja: { title: "Midjourney AI Art #08" },
    en: { title: "Midjourney AI Art #08" },
  },
  {
    id: "col005",
    category: "column",
    size: "s",
    href: "https://note.com/co9_note/n/ncb4c005640c4",
    popup: {
      intro: [
        "最近よく聞く「AIエージェント」や「AI組織」。でも紹介される事例は動画編集やSNS投稿など、デジタル系の仕事に偏りがちで、中小企業や個人店には縁遠く感じられがちです。",
        "そこで今回は、もっと身近なカフェを例に、AI組織の仕組みを検証してみました。",
        "使ったのはGoogleのAI開発アプリ、Antigravity 2.0。複数のAIエージェントに、自律的にタスクを同時並行で任せられるのが特徴です。",
        "店長・シェフ・広報・事務の4役割をAIに割り振り、日本語のプロンプトを送るだけで、コンセプト決めからレシピ考案、宣伝文、原価計算までを自動連携で仕上げてもらいました。",
        "続きはnoteの記事でご覧いただけます。",
      ],
      links: [
        {
          sub: "NOTE",
          label: "noteで記事を読む",
          href: "https://note.com/co9_note/n/ncb4c005640c4",
          external: true,
        },
      ],
    },
    ja: { title: "話題の“AI組織”、カフェの新商品開発で試してみた" },
    en: { title: "Testing the Buzzy \"AI Organization\" Trend on a Café's New Product Development" },
  },
  {
    id: "web006",
    category: "creation",
    size: "s",
    href: "works/web006-ai-kouza.html",
    ja: { title: "最新！みんなで楽しむ生成AI（初心者向け生成AI体験講座）" },
    en: { title: "The Latest! Enjoying Generative AI Together (Beginner-Friendly AI Workshop)" },
  },
  {
    id: "sol013",
    category: "solution",
    size: "w",
    href: "works/sol013-hearing-report-app.html",
    ja: { title: "ヒアリング準備・議事録作成 自動化ツール" },
    en: { title: "Hearing Prep & Meeting Notes Tool" },
  },
  {
    id: "art007",
    category: "creation",
    size: "s",
    illustration: "img/works/art007/01.webp",
    href: "works/art007-ai-art.html",
    ja: { title: "Midjourney AI Art #07" },
    en: { title: "Midjourney AI Art #07" },
  },
  {
    id: "darkmode",
    category: "about",
    size: "s",
    // action: リンクではなく、カード内蔵のスイッチでダーク/ライトを切り替える特殊カード。
    // フィルターの絞り込み対象外(main.js参照)
    ja: { title: "ダークモードを設定する" },
    en: { title: "Set Dark Mode" },
    action: "theme-toggle",
  },
  {
    id: "sol012",
    category: "solution",
    size: "s",
    href: "works/sol012-invoice-app.html",
    ja: { title: "請求書作成＆管理アプリ" },
    en: { title: "Invoice Creation & Management App" },
  },
  {
    id: "col002",
    category: "column",
    size: "w",
    href: "https://work-co9.studio.site/",
    // popup: 詳細ページを作らないカード用。クリックすると画面中央にポップアップ表示される
    popup: {
      // intro: 1文ずつ配列で並べる。表示時は文ごとに改行される
      intro: [
        "領域を横断した実務サポートに、DXの視点をプラス。",
        "最新のITツールやAIを活用して、現場の課題を仕組みで解決します。",
        "現場の課題解決を共に進めるパートナーとして、柔軟なアプローチで、業務効率化と安定した運営体制づくりを支援します。",
      ],
      links: [
        {
          sub: "VISIT",
          label: "サービスサイトを見る",
          href: "https://work-co9.studio.site/",
          external: true,
        },
        {
          sub: "CONTACT",
          label: "サービスについて相談する",
          href: "about/contact.html",
          tone: "white",
        },
      ],
    },
    ja: { title: "日々の業務をサポートする、伴走型事業支援サービス" },
    en: { title: "Hands-On Business Support Service" },
  },
  {
    id: "hnd005",
    category: "creation",
    size: "s",
    href: "works/hnd005-kurumi-earrings.html",
    ja: { title: "くるみボタンとナチュラルウッドの樹脂製ピアス" },
    en: { title: "Fabric-Covered Button & Natural Wood Earrings" },
  },
  {
    id: "sol011",
    category: "solution",
    size: "s",
    href: "works/sol011-product-spec.html",
    ja: { title: "プロダクト仕様書 HTML自動生成ツール" },
    en: { title: "Product Spec HTML Auto-Generation Tool" },
  },
  {
    id: "profile",
    category: "about",
    size: "s",
    illustration: "img/img-profile.webp",
    href: "about/profile.html",
    ja: { title: "私について" },
    en: { title: "Profile" },
  },
  {
    id: "solution-intro",
    category: "solution",
    size: "s",
    action: "intro-text",
    ja: {
      title: "仕組みをつくる",
      body: "現場の課題を、運用まで見据えて解決するDXツールです。最適なAIやクラウドツールを組み合わせ、実務で使える仕組みをご提案します。",
    },
    en: {
      title: "Building Systems",
      body: "DX tools built with real operational workflows in mind, combining the best AI and cloud tools to solve on-site and back-office challenges.",
    },
  },
  {
    id: "contact",
    category: "about",
    size: "t",
    illustration: "img/img-contact.svg",
    href: "about/contact.html",
    ja: { title: "お問い合わせ" },
    en: { title: "Contact" },
  },
  {
    id: "art006",
    category: "creation",
    size: "s",
    illustration: "img/works/art006/01.webp",
    href: "works/art006-ai-art.html",
    ja: { title: "Midjourney AI Art #06" },
    en: { title: "Midjourney AI Art #06" },
  },
  {
    id: "sol010",
    category: "solution",
    size: "s",
    href: "works/sol010-image-resizer-converter.html",
    ja: { title: "画像リサイズ ＆ ファイル形式変換ツール" },
    en: { title: "Image Resizer & Converter" },
  },
  {
    id: "sol009",
    category: "solution",
    size: "s",
    href: "works/sol009-line-image-resizer.html",
    ja: { title: "LINEスタンプ制作応援・第3弾! 画像リサイズツール" },
    en: { title: "LINE Sticker Tools #3: Image Resizer" },
  },
  {
    id: "web005",
    category: "creation",
    size: "s",
    href: "works/web005-business-support.html",
    ja: { title: "ちょっと頼みたい、ちょうどいいサポート。" },
    en: { title: "Just the Right Amount of Business Support" },
  },
  {
    id: "sol008",
    category: "solution",
    size: "s",
    href: "works/sol008-line-image-splitter.html",
    ja: { title: "LINEスタンプ制作応援・第2弾! 画像一括分割ツール" },
    en: { title: "LINE Sticker Tools #2: Image Splitter" },
  },
  {
    id: "gra003",
    category: "creation",
    size: "s",
    href: "works/gra003-bagels.html",
    ja: { title: "THE BAGELS" },
    en: { title: "THE BAGELS" },
  },
  {
    id: "sol007",
    category: "solution",
    size: "s",
    href: "works/sol007-line-background-remover.html",
    ja: { title: "LINEスタンプ制作応援・第1弾! 画像背景透過ツール" },
    en: { title: "LINE Sticker Tools #1: Image Background Remover" },
  },
  {
    id: "art005",
    category: "creation",
    size: "t",
    fit: "contain",
    illustration: "img/works/art005/01.webp",
    href: "works/art005-ai-art.html",
    ja: { title: "Midjourney AI Art #05" },
    en: { title: "Midjourney AI Art #05" },
  },
  {
    id: "privacy",
    category: "about",
    size: "s",
    href: "about/privacypolicy.html",
    ja: { title: "プライバシーポリシー" },
    en: { title: "Privacy Policy" },
  },
  {
    id: "column-intro",
    category: "column",
    size: "s",
    action: "intro-text",
    ja: {
      title: "深森呼吸が届ける",
      body: "noteでの発信や、業務支援サービスのご案内をまとめています。",
    },
    en: {
      title: "From Shinshin Kokyu",
      body: "Articles on note, along with business support services.",
    },
  },
  {
    id: "sol006",
    category: "solution",
    size: "s",
    href: "works/sol006-extension-gemini-chat-exporter.html",
    ja: { title: "Geminiとのチャット履歴を一括保存できるChrome拡張機能" },
    en: { title: "Gemini Chat History Exporter: Chrome Extension" },
  },
  {
    id: "hnd004",
    category: "creation",
    size: "s",
    href: "works/hnd004-lesson-bag.html",
    ja: { title: "ネームタグ付きレッスンバッグ" },
    en: { title: "Lesson Bag with Name Tag" },
  },
  {
    id: "art004",
    category: "creation",
    size: "s",
    illustration: "img/works/art004/01.webp",
    href: "works/art004-ai-art.html",
    ja: { title: "Midjourney AI Art #04" },
    en: { title: "Midjourney AI Art #04" },
  },
  {
    id: "gra002",
    category: "creation",
    size: "s",
    href: "works/gra002-setouchi-wonder-trip.html",
    ja: { title: "瀬戸内海、夏の離島へ『Wonder Trip』" },
    en: { title: "Setouchi Wonder Trip Poster" },
  },
  {
    id: "hnd003",
    category: "creation",
    size: "s",
    href: "works/hnd003-rosette.html",
    ja: { title: "ロゼット「GUEST」・「STAFF」" },
    en: { title: "GUEST & STAFF Rosette Pins" },
  },
  {
    id: "col004",
    category: "column",
    size: "s",
    href: "https://note.com/co9_note/n/n4b99992ab518",
    popup: {
      intro: [
        "Studioで作ったサイトのお問い合わせフォーム、以前はZapierを使って自動返信メールを実装していました。しかし運用中にZapier側でエラーが発生し、スプレッドシートとの接続が切れるトラブルに遭遇。",
        "そこで思い切って、外部サービスに頼らずGoogleの環境だけで完結する仕組みに作り替えました。",
        "使ったのはGAS（Google Apps Script）です。地方の中小企業サイトなど、コストをかけずに長期運用したい小規模サイトを想定した構成です。",
        "同じ悩みを持つ方向けに、そのまま使えるプロンプトも記事内でシェアしています。",
        "続きはnoteの記事でご覧いただけます。",
      ],
      links: [
        {
          sub: "NOTE",
          label: "noteで記事を読む",
          href: "https://note.com/co9_note/n/n4b99992ab518",
          external: true,
        },
      ],
    },
    ja: { title: "Zapier不要!GASだけで完結する問い合わせフォームの自動返信" },
    en: { title: "Ditching Zapier: Contact Form Auto-Replies Built Entirely with GAS" },
  },
  {
    id: "creation-intro",
    category: "creation",
    size: "s",
    action: "intro-text",
    ja: {
      title: "デザインとAI",
      body: "Webサイトからアート、ハンドメイドまで、感性と技術を掛け合わせて形にした制作物です。多彩なクリエイションの記録をぜひご覧ください。",
    },
    en: {
      title: "Design × AI",
      body: "From websites and AI art to handmade crafts, a collection of work shaped by blending sensibility with technology. Explore the range of creations.",
    },
  },
  {
    id: "hnd002",
    category: "creation",
    size: "s",
    href: "works/hnd002-kurumi-tietack.html",
    ja: { title: "くるみボタンのタイタック・カフス" },
    en: { title: "Fabric-Covered Button Tie Tack & Cufflinks" },
  },
  {
    id: "sol005",
    category: "solution",
    size: "s",
    href: "works/sol005-manual-creator.html",
    ja: { title: "ウェブページ・PDFでのマニュアル作成を自動化する" },
    en: { title: "Automating Manual Creation for Web Pages & PDFs" },
  },
  {
    id: "gra001",
    category: "creation",
    size: "s",
    href: "works/gra001-coffee-break.html",
    ja: { title: "リトルプレス『COFFEE BREAK』" },
    en: { title: "Little Press: COFFEE BREAK" },
  },
  {
    id: "col003",
    category: "column",
    size: "s",
    href: "https://jnishina-co9.github.io/site-recipe-q/",
    popup: {
      intro: [
        "数年前に温めていたお菓子レシピサイトのデザイン案。作る個数に合わせて材料の分量を自動計算する機能が実装できず、ずっとお蔵入りになっていました。",
        "今回、AIエージェントのAntigravityの力を借りて、当時できなかった機能も含めて実際に動くサイトとして復活させました。",
        "現在はレシピページ1枚のみの実験的な公開ですが、「あきらめていたアイデアも、AIと組めば形にできる」と実感した制作の記録です。",
        "続きはnoteの記事でご覧いただけます。",
      ],
      links: [
        {
          sub: "VISIT",
          label: "ウェブサイトを見る",
          href: "https://jnishina-co9.github.io/site-recipe-q/",
          external: true,
        },
        {
          sub: "NOTE",
          label: "noteで記事を読む",
          href: "https://note.com/co9_note/n/nee076d5e1558",
          external: true,
        },
      ],
    },
    ja: { title: "あきらめていたレシピサイトを、AIエージェントと形に" },
    en: { title: "Reviving a Shelved Recipe Site with an AI Agent" },
  },
  {
    id: "art003",
    category: "creation",
    size: "s",
    illustration: "img/works/art003/01.webp",
    href: "works/art003-ai-art.html",
    ja: { title: "Midjourney AI Art #03" },
    en: { title: "Midjourney AI Art #03" },
  },
  {
    id: "col001",
    category: "column",
    size: "w",
    href: "https://studio-co9.studio.site/",
    popup: {
      intro: [
        "中小企業や個人経営者様向けに、Studioを活用してウェブサイトの制作や運用代行を承ります。",
        "大手制作会社と違い、私が直接お客様のご要望をお伺いし、企画から納品まで一貫して行いますので、制作コストを抑えながらもスピーディーな対応が可能です。",
      ],
      links: [
        {
          sub: "VISIT",
          label: "サービスサイトを見る",
          href: "https://studio-co9.studio.site/",
          external: true,
        },
        {
          sub: "CONTACT",
          label: "サービスについて相談する",
          href: "about/contact.html",
          tone: "white",
        },
      ],
    },
    ja: { title: "Studioを活用したウェブサイト制作・運用代行" },
    en: { title: "Website Production & Management with Studio" },
  },
  {
    id: "sol004",
    category: "solution",
    size: "s",
    href: "works/sol004-gas-news-board.html",
    ja: { title: "GAS×AIで実装！無料で作る「お知らせ機能」と「社内掲示板」" },
    en: { title: "Free GAS+AI Build: In-Site News Feed & Employee Board" },
  },
  {
    id: "sol003",
    category: "solution",
    size: "s",
    href: "works/sol003-appsheet-enrollment.html",
    ja: { title: "AppSheet制作事例 #03『ペーパーレス入会申込＋電子署名アプリ』" },
    en: { title: "AppSheet Case Study #03: Paperless Enrollment & E-Signature App" },
  },
  {
    id: "art002",
    category: "creation",
    size: "s",
    illustration: "img/works/art002/01.webp",
    href: "works/art002-ai-art.html",
    ja: { title: "Midjourney AI Art #02" },
    en: { title: "Midjourney AI Art #02" },
  },
  {
    id: "sol002",
    category: "solution",
    size: "s",
    href: "works/sol002-appsheet-sales.html",
    ja: { title: "AppSheet制作事例 #02『営業管理アプリ』" },
    en: { title: "AppSheet Case Study #02: Sales Management App" },
  },
  {
    id: "web004",
    category: "creation",
    size: "s",
    href: "works/web004-studio-local.html",
    ja: { title: "Studioを活用したウェブ制作代行サービスのPRサイト（地域向け）" },
    en: { title: "PR Site for Studio-Based Web Production Service (Local)" },
  },
  {
    id: "web003",
    category: "creation",
    size: "s",
    href: "works/web003-studio.html",
    ja: { title: "Studioを活用したウェブ制作代行サービスのPRサイト" },
    en: { title: "PR Site for Studio-Based Web Production Service" },
  },
  {
    id: "cookiepolicy",
    category: "about",
    size: "s",
    href: "about/cookiepolicy.html",
    ja: { title: "クッキー（Cookie）ポリシー" },
    en: { title: "Cookie Policy" },
  },
  {
    id: "web002",
    category: "creation",
    size: "s",
    href: "works/web002-co9co9com.html",
    ja: { title: "ポートフォリオサイト『深森呼吸』" },
    en: { title: "Portfolio Site: Shinshin Kokyu" },
  },
  {
    id: "art001",
    category: "creation",
    size: "s",
    illustration: "img/works/art001/01.webp",
    href: "works/art001-ai-art.html",
    ja: { title: "Midjourney AI Art #01" },
    en: { title: "Midjourney AI Art #01" },
  },
  {
    id: "web001",
    category: "creation",
    size: "s",
    href: "works/web001-journey.html",
    ja: { title: "ポートフォリオサイト『journey』" },
    en: { title: "Portfolio Site: journey" },
  },
  {
    id: "sol001",
    category: "solution",
    size: "s",
    href: "works/sol001-appsheet-keihi.html",
    ja: { title: "AppSheet制作事例 #01『経費精算アプリ』" },
    en: { title: "AppSheet Case Study #01: Expense Report App" },
  },
  {
    id: "securityaction",
    category: "about",
    size: "s",
    href: "about/securityaction.html",
    ja: { title: "情報セキュリティ基本方針" },
    en: { title: "Security Policy" },
  },
  {
    id: "about-intro",
    category: "about",
    size: "s",
    action: "intro-text",
    ja: {
      title: "深森呼吸について",
      body: "プロフィールやお問い合わせ、各種ポリシーに関する情報をまとめています。",
    },
    en: {
      title: "About Shinshin Kokyu",
      body: "Profile, contact information, and policies.",
    },
  },
  {
    id: "hnd001",
    category: "creation",
    size: "s",
    href: "works/hnd001-linen-shoulder-bag.html",
    ja: { title: "リネンのショルダーバッグ" },
    en: { title: "Linen One-Shoulder Bag" },
  },
];

// カテゴリの表示ラベル(カードのタグ・フィルターボタンで共通使用)
export const categoryLabel = {
  solution: "SOLUTION",
  creation: "CREATION",
  column: "COLUMN",
  about: "ABOUT",
};

// 画面共通の文言
export const ui = {
  ja: {
    readMore: "READ MORE",
    viewAll: "VIEW ALL",
    footer: "© 2026 深森呼吸 — SHINSHIN KOKYU",
  },
  en: {
    readMore: "READ MORE",
    viewAll: "VIEW ALL",
    footer: "© 2026 SHINSHIN KOKYU",
  },
};
