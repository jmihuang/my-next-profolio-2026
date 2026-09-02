const Database = require("better-sqlite3");

const db = new Database("data.db");
const slug = "node-network";

const sections = [
  {
    leadingTitle: "01 - UX Interview",
    title: "從訪談與角色模型，整理出人脈建立的 POV 觀點。",
    content: `<p>這套產品定位為<strong>商務聚會後使用的封閉式工商名錄</strong>。UX Research 以角色模型與問卷分析記錄不同受訪者的情境、目標、困難與解法；案例保留原始 PDF 圖檔，讓每個觀點都可回看來源。</p><p><strong>POV 觀點：</strong>線下實體社交轉為線上管理時，使用者需要解決「辨識度低、信任感不足、人脈檢索困難」；不只找到人，也要能理解對方、確認關聯，並在下一次互動時想起這段關係。</p>`,
    images: [
      ["/projects/node-network/ux-research/UX_1.png", "藍教主使用者角色模型", "研究證據｜快速找到適合人選", "角色模型記錄了篩選、照片、抬頭與三個關鍵字作為找人與辨識的需求。"],
      ["/projects/node-network/ux-research/UX_2.png", "Zoey 使用者角色模型", "研究證據｜先建立信任", "角色模型記錄了先了解專業背景與作品，以及透過推薦取得信任的需求。"],
    ],
  },
  {
    leadingTitle: "02 - Card Sorting",
    title: "以 Card Sorting 彙整問題，收斂成可設計的 POV。",
    content: `<p>將訪談／問卷中反覆出現的問題依主題彙整為：<strong>有效管理人脈群、信任建立、維繫關係、拓展人脈</strong>。每個群組保留「發現什麼問題 → 現有的解決方式 → 功能可以怎麼做」的整理脈絡。</p><ul><li><strong>名片過多、事後忘記是誰：</strong>以人像卡片、3 個關鍵字及掃碼當下的備註／標籤，建立記憶錨點。</li><li><strong>商務引薦缺乏信任基礎：</strong>以共同朋友與人脈節點，讓二度人脈成為可理解的背書。</li><li><strong>需求無法精準對接：</strong>以「我能提供／我想要」的雙向條件，直接對齊合作需求。</li></ul><p><strong>收斂後的 POV：</strong>人脈產品需要同時支援「找得到、看得懂、信得過、維持得住」四個連續階段。</p>`,
    images: [
      ["/projects/node-network/ux-research/UX_4.png", "Card sorting：有效管理人脈群與信任建立", "彙整｜整理與信任", "研究圖中整理了人脈資料難以查找，以及陌生接觸前需要了解對方資料的問題。"],
      ["/projects/node-network/ux-research/UX_工作區域 1 複本 5.png", "Card sorting：維繫關係與信任建立", "彙整｜關係維繫", "研究圖中整理平時互動、活動邀請與認識背景如何影響熟悉感與信任。"],
      ["/projects/node-network/ux-research/UX_3png.png", "Card sorting：拓展人脈", "彙整｜拓展人脈", "研究圖中整理拓展人脈的需求，指向明確族群與自身可提供、需要的資訊。"],
    ],
  },
  {
    leadingTitle: "03 - Competitive Analysis",
    title: "從開放式履歷庫，轉向實體聚會後的高信任關係管理。",
    content: `<p><strong>封閉性與高信任度：</strong>LinkedIn 偏向開放式履歷庫與求職招聘；Node 聚焦實體商會／聚會後的關係維繫與轉介紹，所有節點皆基於真實互動或共同圈子。</p><p><strong>合作場景優先：</strong>Node 不以長篇工作史為主要閱讀方式，而是優先呈現即時需求、能提供的資源、想取得的資源，以及人與人之間的標籤印象。</p><p><strong>設計意義：</strong>透過共同朋友、人脈節點、關鍵字與雙向供需條件，降低陌生推銷的防備心，並讓商務媒合可從具體合作目標開始。</p>`,
    images: [],
  },
  {
    leadingTitle: "04 - Low-fidelity Prototype",
    title: "先以低保真流程確認搜尋、篩選、加入人脈與聊天的任務骨架。",
    content: `<p>低保真 prototype 將主要任務拆成首頁／搜尋、搜尋／篩選、搜尋結果中的加入人脈，以及聊天列表。此階段聚焦資訊與任務順序，作為後續高保真介面設計的基礎。</p>`,
    images: [
      ["/projects/node-network/mockup/nodeapp2.png", "Node 低保真 prototype", "Wireframe｜核心任務流程", "呈現首頁搜尋、條件篩選、加入人脈與聊天列表的初步流程。"],
    ],
  },
  {
    leadingTitle: "05 - Requirements & UI",
    title: "把研究需求對應到探索、判斷、連結與資料維護的設計畫面。",
    content: `<ol><li><strong>探索與篩選：</strong>每日推薦、搜尋、近期／熱門搜尋，以及興趣、產業、工作媒合條件；降低主動陌生開發的社交壓力。</li><li><strong>判斷與信任：</strong>人像卡片、現職抬頭、3 個關鍵字、人脈節點、共同朋友、工作經歷、服務項目與相關連結。</li><li><strong>建立與維護連結：</strong>電子名片、掃描行動條碼加入人脈，並在交流後立即以自訂標籤與備註保留當下情境。</li><li><strong>雙向供需對齊：</strong>以求才／求職、找投資／投資他人、尋求諮詢／給予諮詢等條件，讓合作需求能被直接辨識。</li></ol><p>以下畫面為設計成果，對應前述研究與 Card Sorting 收斂的需求；不延伸宣稱未提供的使用成效。</p>`,
    images: [
      ["/projects/node-network/mockup/首頁.png", "每日推薦人脈列表", "需求｜快速探索與記憶錨點", "以人脈節點、媒合資訊、共同朋友與三個關鍵字協助快速判斷。"],
      ["/projects/node-network/mockup/首頁-搜尋Focus狀態.png", "搜尋介面", "需求｜主動搜尋", "提供近期搜尋、熱門搜尋與進階搜尋入口。"],
      ["/projects/node-network/mockup/首頁-條件設定.png", "條件設定介面", "需求｜多維篩選", "以興趣、產業與工作媒合條件協助縮小探索範圍。"],
      ["/projects/node-network/mockup/人脈詳細頁-會員.png", "人脈詳細頁", "需求｜了解對方與建立信任", "集中呈現抬頭、地區、共同朋友、工作經歷、服務項目與相關連結。"],
      ["/projects/node-network/mockup/名片.png", "電子名片", "需求｜交換聯絡資訊", "電子名片集中呈現個人資料與掃描加入的入口。"],
      ["/projects/node-network/mockup/加新人脈-行動條碼-掃描加入.png", "掃描加入人脈", "需求｜建立關係後留下線索", "掃描加入後，提示使用者加入關鍵字作為日後辨識線索。"],
      ["/projects/node-network/mockup/個人資訊-工作資歷修改.png", "工作資歷修改", "需求｜持續維護資料", "工作經歷可編輯並標示現職，支援個人資訊的更新。"],
    ],
  },
];

const images = sections.flatMap((section, sectionIndex) => section.images.map(([path, alt, title, description], imageIndex) => ({ sectionIndex, imageIndex, path, alt, title, description })));

const existing = db.prepare("SELECT id FROM products WHERE slug = ?").get(slug);
const removeImages = db.prepare("DELETE FROM product_images WHERE product_id = ?");
const removeSections = db.prepare("DELETE FROM product_sections WHERE product_id = ?");
const removeProduct = db.prepare("DELETE FROM products WHERE id = ?");
const insertProduct = db.prepare("INSERT INTO products (slug, title, eyebrow, role, summary, card_technology_line, categories_json, technologies_json, notes_json, cover_image_path, case_study_key, status, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?)");
const insertSection = db.prepare("INSERT INTO product_sections (product_id, sort_order, section_leading_title, section_title, content) VALUES (?, ?, ?, ?, ?)");
const insertImage = db.prepare("INSERT INTO product_images (product_id, section_id, path, alt, title, description, image_role, sort_order) VALUES (?, ?, ?, ?, ?, ?, 'section', ?)");

db.transaction(() => {
  if (existing) {
    removeImages.run(existing.id);
    removeSections.run(existing.id);
    removeProduct.run(existing.id);
  }
  const productId = insertProduct.run(slug, "Node 人脈管理", "UX Research · Product Design", "Product Designer · UX Research · UX/UI Design", "以 UX 訪談、Card Sorting 與 prototype，整理人脈探索、信任、連結與維繫的設計方向。", "UX Research · Card Sorting · Prototype · Mobile UX", JSON.stringify(["Product & Commerce"]), JSON.stringify(["UX Research", "Card Sorting", "Information Architecture", "Prototype", "Mobile UX"]), JSON.stringify(["POV to design decision", "Trust and professional context", "Relationship nurturing"]), "/projects/node-network/node-network-hero.jpeg", slug, 6).lastInsertRowid;
  const sectionIds = sections.map((section, index) => insertSection.run(productId, index, section.leadingTitle, section.title, section.content).lastInsertRowid);
  images.forEach((image) => insertImage.run(productId, sectionIds[image.sectionIndex], image.path, image.alt, image.title, image.description, image.imageIndex));
})();

console.log(`Migrated ${sections.length} sections and ${images.length} images for ${slug}.`);
