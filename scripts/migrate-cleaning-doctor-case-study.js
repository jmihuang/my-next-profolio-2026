const sql = require("better-sqlite3");

const db = sql("data.db");
const product = db.prepare("SELECT id FROM products WHERE slug = ?").get("cleaning-doctor");
if (!product) throw new Error("Cleaning Doctor product was not found.");

const sections = [
  {
    leadingTitle: "01 — UX/UI Reconstruction",
    title: "Reframing an existing system through hierarchy and clarity.",
    content: `<p>這次不是從零建立新的後台，而是重新整理既有系統中資訊、視覺與操作的層級。目標是讓管理者在大量訂單與日常資料之間，依序看見<strong>核心資訊 → 工作狀態 → 下一步操作</strong>，降低查找與判斷成本。</p><p>以下三個方向都以既有畫面做 Before / After 對比；內容聚焦已完成的介面整理，不延伸不存在的功能。</p>`,
    images: [],
  },
  {
    leadingTitle: "Information Hierarchy",
    title: "Let the most important information be understood first.",
    content: `<p><strong>Before：</strong>既有列表承載了篩選、資料、逐列操作與匯出，資訊的重要程度不明確，使用者需要自己從大量內容中找重點。</p><p><strong>After：</strong>重新整理區塊與閱讀順序，讓管理者能先掌握目前的工作狀態，再進入對應操作。這不是新增功能，而是讓既有資訊以更清楚的層級被看見。</p><p><strong>Focus：</strong>Reduce cognitive load — 讓核心資訊優先被理解。</p>`,
    images: [
      ["/projects/cleaning-doctor/original-design/payroll-list.png", "改造前：舊版列表與篩選畫面", "Before｜資料堆疊的列表", "篩選、查看、匯出與逐列操作同時出現，閱讀順序不明確。"],
      ["/projects/cleaning-doctor/00-case-overview.png", "改造後：清潔公司排班管理後台設計總覽", "After｜以任務整理的後台", "將既有訂單、人員與狀態資訊重新分組，讓重點更容易被辨識。"],
    ],
  },
  {
    leadingTitle: "Visual & Interaction Hierarchy",
    title: "Make actions easier to scan.",
    content: `<p><strong>Before：</strong>查看、修改、查詢與匯出等不同操作的視覺權重接近，使用者必須花時間判斷哪一個是當下主要行動。</p><p><strong>After：</strong>以字級、留白、按鈕與狀態樣式重新建立主次。主要操作更容易被辨識，查看與編輯等輔助操作則保留在不干擾工作判斷的位置。</p><p><strong>Focus：</strong>讓介面不只呈現資料，也清楚提示可以做什麼。</p>`,
    images: [
      ["/projects/cleaning-doctor/original-design/payroll-detail.png", "改造前：舊版班次與報酬詳細頁", "Before｜操作與資訊平鋪", "人員、時段、服務與報酬等內容與操作混在同一平面，需要逐欄確認。"],
      ["/projects/cleaning-doctor/05-payroll-and-people.png", "改造後：人員與報酬管理介面總覽", "After｜明確的視覺與操作層級", "以一致的元件、狀態樣式與操作權重，讓日常處理更易辨識。"],
    ],
  },
  {
    leadingTitle: "Data Scannability",
    title: "Optimize for scanning, not reading.",
    content: `<p><strong>Before：</strong>管理後台需要處理大量訂單與人員資料；當列表資訊密集、區隔不足時，使用者容易落入逐筆閱讀與反覆比對。</p><p><strong>After：</strong>透過分組、表格欄位、狀態標籤與留白，讓使用者可以先快速掃描，再找到需要處理的項目。這讓既有的資料呈現從「逐筆閱讀」轉成「掃讀後判斷」。</p><p><strong>Focus：</strong>讓日常營運在大量資料中更快定位重點。</p>`,
    images: [
      ["/projects/cleaning-doctor/original-design/payroll-list.png", "改造前：舊版列表與篩選畫面", "Before｜需要逐筆閱讀的資料列表", "密集的資料與操作並列，管理者需要自行比對才能找到重點。"],
      ["/projects/cleaning-doctor/04-service-operations.png", "改造後：客服與營運管理介面總覽", "After｜可快速掃讀的資料結構", "以清楚的區塊、欄位與狀態呈現，協助先找到需要處理的內容。"],
    ],
  },
  {
    leadingTitle: "02 — Scheduling & Backfill",
    title: "Make scheduling gaps visible, and easier to resolve.",
    content: `<p>定期訂單產生多個場次後，管理者不需要逐筆找人。系統先協助看見尚未排滿的場次，再依該場次的時間篩選可安排人員；同時以需求人數限制可指派上限。若原日期無法安排，也能調整至其他可安排日期。</p><p><strong>Recurring scheduling flow</strong></p><p>建立定期訂單 → 批次產生週期場次 → 找出缺工／未排滿場次 → 依適合時間篩選人員 → 依需求人數完成補位 → 原日期無法安排時，調整其他日期</p><ol><li><strong>Batch scheduling：</strong>一次建立週期訂單的多個場次，減少逐筆建立的操作成本。</li><li><strong>Vacancy &amp; backfill：</strong>讓缺工場次被看見，再從符合該時段的人員中完成補位。</li><li><strong>Quota limit：</strong>將需求人數轉為操作限制；例如需求 2 人、已安排 1 人時，只能再指派 1 人，避免超額。</li><li><strong>Flexible rescheduling：</strong>指定日期無法安排時，可協助管理者調整到其他日期，而非強迫在原日期補足。</li></ol>`,
    images: [
      ["/projects/cleaning-doctor/raw/1.2 定期清潔 – 新增訂單 – 新增或排除週期日期.png", "定期清潔新增訂單的週期日期設定", "批次產生週期場次", "在建立定期訂單時設定週期與日期例外，作為後續場次產生的基礎。"],
      ["/projects/cleaning-doctor/raw/1.2 定期清潔 – 指派清潔人員.png", "定期清潔的人員指派畫面", "依適合時間篩選並指派人員", "管理者依場次條件查看人員，並在需求人數範圍內完成指派。"],
      ["/projects/cleaning-doctor/raw/1.2 定期清潔 – 指派清潔人員 – 補人.png", "定期清潔的補人操作畫面", "補位或調整其他日期", "當原場次尚未排滿時，管理者可處理補人；無法安排時則可調整其他日期。"],
    ],
  },
];

const removeImages = db.prepare("DELETE FROM product_images WHERE section_id IN (SELECT id FROM product_sections WHERE product_id = ?)");
const removeSections = db.prepare("DELETE FROM product_sections WHERE product_id = ?");
const insertSection = db.prepare("INSERT INTO product_sections (product_id, sort_order, section_leading_title, section_title, content) VALUES (?, ?, ?, ?, ?)");
const insertImage = db.prepare("INSERT INTO product_images (product_id, section_id, path, alt, title, description, image_role, sort_order) VALUES (?, ?, ?, ?, ?, ?, 'section', ?)");

db.transaction(() => {
  removeImages.run(product.id);
  removeSections.run(product.id);
  sections.forEach((section, sectionIndex) => {
    const result = insertSection.run(product.id, sectionIndex, section.leadingTitle, section.title, section.content);
    section.images.forEach(([path, alt, title, description], imageIndex) => {
      insertImage.run(product.id, result.lastInsertRowid, path, alt, title, description, imageIndex);
    });
  });
})();

console.log(`Migrated ${sections.length} CMS sections for Cleaning Doctor.`);
