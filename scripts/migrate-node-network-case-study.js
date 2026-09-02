const Database = require("better-sqlite3");

const db = new Database("data.db");
const slug = "node-network";

const sections = [
  {
    leadingTitle: "01 - Project context",
    title: "A research-led concept for finding and managing professional connections.",
    content: `<p><strong>Node 人脈管理</strong>是以商業人脈建立、判斷與維繫為題的行動產品概念。此案例以提供的訪談／問卷分析、角色模型與介面 mockup 為範圍；以下主張均回到研究原圖，不延伸為未被素材支持的成果或指標。</p><p>研究資料中反覆出現的任務包含：找尋合適人選、判斷是否值得建立連結、整理既有人脈，以及在沒有立即需求時維持關係。</p>`,
    images: [
      ["/projects/node-network/ux-research/UX_工作區域 1 複本 3.png", "問卷分析：拓展人脈", "研究來源｜拓展人脈", "原始問卷分析指出：拓展人脈需要明確族群與自身可提供、需要的資訊。"],
    ],
  },
  {
    leadingTitle: "02 - UX Research",
    title: "Five role models and four themed analyses made the needs visible.",
    content: `<p>原始 UX Research 由 <strong>5 份使用者角色模型</strong>與<strong> 4 份問卷分析</strong>組成。角色包含藍教主、Zoey、蔡恩、Jonny 與 Sunny，涵蓋產業人士、行銷顧問、個人創業接案、講師／創業顧問與企業二代／公司主要業務等情境。</p><p>問卷分析將受訪者表述整理為四個主題：<strong>有效管理人脈群、信任建立、維繫關係、拓展人脈</strong>。下列為原始研究頁面，保留其題組與問題表述。</p>`,
    images: [
      ["/projects/node-network/ux-research/UX_4.png", "問卷分析：有效管理人脈群與信任建立", "研究來源｜整理與信任", "原圖記錄人脈資料整理的需求，以及陌生接觸時需先了解對方資料的疑慮。"],
      ["/projects/node-network/ux-research/UX_工作區域 1 複本 5.png", "問卷分析：維繫關係與信任建立", "研究來源｜關係維繫", "原圖記錄平時互動、活動邀請與認識背景如何影響關係溫度與信任。"],
    ],
  },
  {
    leadingTitle: "03 - Key insight",
    title: "Trust is built before a new connection feels worth pursuing.",
    content: `<p><strong>研究證據：</strong>Zoey 的角色模型指出，在與講師接觸前會先查詢對方背景（經歷／作品），並在不認識對方時感到信任不足；其解法直接列出「專業呈現歷程或相關連結」及「推薦口袋名單給朋友的功能」。藍教主的模型也記錄「有朋友問你在這有認識做設計的人嗎」與「問共同朋友」。</p><p><strong>設計方向：</strong>讓人脈卡和個人檔案先提供可驗證的抬頭、經歷、作品／連結、共同朋友與關鍵字，協助使用者理解對方與連結脈絡。</p>`,
    images: [
      ["/projects/node-network/ux-research/UX_2.png", "Zoey 使用者角色模型", "研究來源｜信任建立", "在研究中，Zoey 先查詢背景與作品，並指出專業推薦能取得信任。"],
      ["/projects/node-network/mockup/人脈詳細頁-會員.png", "人脈詳細頁介面", "設計呈現｜可驗證的個人資訊", "介面呈現抬頭、地區、共同朋友、工作經歷、服務項目與相關連結。"],
    ],
  },
  {
    leadingTitle: "04 - Key insight",
    title: "A useful connection starts with an explicit fit, not a vague contact list.",
    content: `<p><strong>研究證據：</strong>藍教主需要「快速找到在我附近，可以適合人才」；蔡恩希望找到「有效的曝光自己專業」，並提出可依產業、想要接觸的類型或職業做分類。問卷分析「拓展人脈」亦提出需顯示自己想接觸的類型或「我能提供／我想要」。</p><p><strong>設計方向：</strong>以產業、工作媒合、興趣、地區與共同朋友作為條件；人脈列表先顯示大頭照、職業／抬頭、關鍵字與人脈節點，讓使用者快速形成記憶與判斷依據。</p>`,
    images: [
      ["/projects/node-network/ux-research/UX_1.png", "藍教主使用者角色模型", "研究來源｜找尋適合人選", "角色模型中的解法列出篩選功能與照片、抬頭、三個關鍵字等記憶線索。"],
      ["/projects/node-network/mockup/首頁-條件設定.png", "首頁條件設定介面", "設計呈現｜多維條件", "以興趣、產業與工作媒合條件協助縮小探索範圍。"],
      ["/projects/node-network/mockup/首頁.png", "首頁每日推薦介面", "設計呈現｜人脈節點與關鍵字", "每日推薦先呈現人脈節點、媒合條件、共同朋友與三個關鍵字。"],
    ],
  },
  {
    leadingTitle: "05 - Key insight",
    title: "Relationship value needs time and ongoing familiarity.",
    content: `<p><strong>研究證據：</strong>「維繫關係」問卷分析直接整理為「人脈關係是需要長時間的刻意經營」與「需要建立熟悉感」；Sunny 的模型提到商會聚會與邀請活動，Jonny 則需要「找到志同道合的合作夥伴」，並將維持聯繫列為解法。</p><p><strong>設計方向：</strong>讓個人檔案可保留人脈節點、興趣與工作經歷等後續互動素材；掃描行動條碼加入新連結時，提示使用者加入第一個關鍵字，建立日後辨識的線索。</p>`,
    images: [
      ["/projects/node-network/ux-research/UX_工作區域 1 複本 4.png", "Sunny 使用者角色模型", "研究來源｜互相認識與活動", "角色模型提到名片交換、互相認識與商會活動所帶來的關係延續。"],
      ["/projects/node-network/ux-research/UX_工作區域 1 複本 3.png", "Jonny 使用者角色模型", "研究來源｜志同道合的合作夥伴", "角色模型將維持聯繫與了解對方專業視為找到合作夥伴的條件。"],
      ["/projects/node-network/mockup/加新人脈-行動條碼-掃描加入.png", "掃描加入人脈並設定關鍵字", "設計呈現｜加入後的記憶錨點", "掃描加入後，產品引導使用者為新朋友加入第一個關鍵字。"],
    ],
  },
  {
    leadingTitle: "06 - Product solution",
    title: "Search, assess, connect, and keep context for the next interaction.",
    content: `<ol><li><strong>探索：</strong>從每日推薦、搜尋與條件設定尋找可能的人選。</li><li><strong>評估：</strong>檢視人脈節點、媒合條件、共同朋友、個人資訊與工作經歷。</li><li><strong>建立連結：</strong>透過加入人脈、掃描名片／行動條碼完成交換。</li><li><strong>保留脈絡：</strong>以名片、關鍵字與個人資訊保留下一次互動可用的辨識線索。</li></ol><p>這是依既有介面 mockup 可辨識的流程整理，並非宣稱已驗證的成效數據。</p>`,
    images: [
      ["/projects/node-network/mockup/首頁-搜尋Focus狀態.png", "首頁搜尋介面", "01｜探索與搜尋", "搜尋提供近期與熱門搜尋詞，並可進入進階搜尋。"],
      ["/projects/node-network/mockup/名片.png", "個人電子名片介面", "02｜交換與保留聯絡資訊", "電子名片集中顯示抬頭、地區、標籤與多種聯絡方式，並提供分享與掃描入口。"],
      ["/projects/node-network/mockup/個人資訊-工作資歷修改.png", "工作資歷修改介面", "03｜維護可驗證資訊", "工作經歷可編輯並標示現職，支援個人資料的持續更新。"],
    ],
  },
  {
    leadingTitle: "07 - Reflection",
    title: "What the supplied material demonstrates - and what it does not yet establish.",
    content: `<p>現有材料充分呈現研究分析、角色模型，以及從需求到介面的設計意圖；但<strong>未提供可公開引用的訪談人數、受訪者招募方式、逐字稿、可用性測試或產品上線成效</strong>。因此本案例不以轉換率、留存或驗證結果作結論。</p><p>若後續補充研究方法、訪談摘錄或測試／上線資料，此區可擴充為更完整的 Research Evidence → Design Decision → Outcome 敘事。</p>`,
    images: [
      ["/projects/node-network/ux-research/UX_5.png", "蔡恩使用者角色模型", "研究來源｜專業與熟悉度", "角色模型記錄了專業曝光、朋友引薦與產生熟悉感的需求。"],
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
  const productId = insertProduct.run(slug, "Node 人脈管理", "UX Research · Product Design", "Product Designer · UX Research · UX/UI Design", "以角色模型與問卷分析，整理商業人脈從探索、信任到關係維繫的設計方向。", "UX Research · Persona · Information Architecture · Mobile UX", JSON.stringify(["Product & Commerce"]), JSON.stringify(["UX Research", "Persona", "Information Architecture", "Mobile UX", "Interaction Design"]), JSON.stringify(["Research evidence to design decision", "Trust and professional context", "Relationship nurturing"]), "/projects/node-network/ux-research/UX_4.png", slug, 6).lastInsertRowid;
  const sectionIds = sections.map((section, index) => insertSection.run(productId, index, section.leadingTitle, section.title, section.content).lastInsertRowid);
  images.forEach((image) => insertImage.run(productId, sectionIds[image.sectionIndex], image.path, image.alt, image.title, image.description, image.imageIndex));
})();

console.log(`Migrated ${sections.length} sections and ${images.length} images for ${slug}.`);
