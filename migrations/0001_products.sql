-- Imported from the verified pre-D1 data.db schema on 2026-09-01.
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  eyebrow TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  card_technology_line TEXT NOT NULL DEFAULT '',
  categories_json TEXT NOT NULL DEFAULT '[]',
  technologies_json TEXT NOT NULL DEFAULT '[]',
  notes_json TEXT NOT NULL DEFAULT '[]',
  cover_image_path TEXT NOT NULL,
  case_study_key TEXT,
  status TEXT NOT NULL DEFAULT 'published',
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sort_order INTEGER NOT NULL DEFAULT 0,
  featured_order INTEGER
);

CREATE TABLE product_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  section_leading_title TEXT NOT NULL DEFAULT '',
  section_title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE product_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  path TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  image_role TEXT NOT NULL DEFAULT 'gallery',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  section_id INTEGER REFERENCES product_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX idx_products_status_published_at ON products(status, published_at DESC);
CREATE INDEX idx_products_sort_order ON products(sort_order, id);
CREATE INDEX idx_product_images_product_sort ON product_images(product_id, sort_order);
CREATE INDEX idx_product_sections_product_sort ON product_sections(product_id, sort_order, id);
CREATE INDEX idx_product_images_section_sort ON product_images(section_id, sort_order, id);
INSERT INTO products VALUES(1,'cleaning-doctor','清潔公司排班管理後台','Operations CRM · UX/UI Redesign','UI/UX','重構舊有清潔工作排程管理平台','Material UI · Adobe XD','["Product & Commerce"]','["UI flow · UIUX"]','["Clear action hierarchy for operations"]','/projects/cleaning-doctor/00-case-overview.png','cleaning-doctor','published','2026-08-27 07:08:44','2026-08-27 07:08:44','2026-08-31 07:44:07',2,2);
INSERT INTO products VALUES(2,'momo-shopping-cart','Shopping Cart Modernization','RWD Refactoring · Frontend–Backend Decoupling','UX/UI Design · RWD Design · Frontend Collaboration','將既有 jQuery 購物車重構為 React 前後端分離模式架構。透過統一的 RWD 系統整合桌機與手機功能，降低雙版本重複開發與維護成本。','React · TypeScript · RWD · Frontend–Backend Decoupling · Flow Design','["Product & Commerce"]','["React","TypeScript","RWD","Frontend–Backend Decoupling","Functional Mapping","Flow Design","API Integration"]','["Cross-device system alignment","Checkout state modeling","Feature inventory & RWD design"]','/projects/momo-shopping-cart-flow.png','momo-shopping-cart','published','2026-08-27 07:08:44','2026-08-27 07:08:44','2026-08-31 07:44:06',0,1);
INSERT INTO products VALUES(3,'commerce-design-system','Commerce Design System','Design Systems','Design System · UI Components · Frontend Collaboration','以 Atomic Design 與 Tailwind Utility 思維，建立可維護、可組合的電商元件系統。','Atomic Design · Component CSS · Tailwind Utility · Storybook','["Design Systems"]','["Atomic Design","Component CSS","Tailwind Utility","Storybook","Frontend Collaboration"]','["Reusable component patterns","Controlled customization","Documented implementation"]','/projects/design-system-hero.jpeg','commerce-design-system','published','2026-08-27 07:08:44','2026-08-27 07:08:44','2026-08-28 05:46:25',1,NULL);
INSERT INTO products VALUES(4,'annluya-ecommerce','安綠雅','Product & Commerce · Branding Web','UX/UI · E-commerce Website','保養品牌電商網站改版與 RWD 導覽規劃。','UX/UI · E-commerce · Information Architecture · Responsive Design','["Product & Commerce","Branding Web"]','["UX/UI","E-commerce","Information Architecture","Responsive Design"]','["Desktop & mobile navigation","Product categories","Campaign modules"]','/projects/annluya-overview.png','annluya-ecommerce','published','2026-08-27 07:08:44','2026-08-27 07:08:44','2026-08-27 07:08:44',5,NULL);
INSERT INTO products VALUES(5,'eornet-brand-platform','丞元資訊','Branding Web','Brand Identity · Website Design','雲端服務企業的品牌識別與資訊型網站。','Brand · Web Design · Responsive Design · Product Planning','["Branding Web"]','["Brand","Web Design","Information Design","Responsive Design","Product Planning"]','["Service architecture","Enterprise website","Visual system"]','/projects/eornet-home.jpg','eornet-brand-platform','published','2026-08-27 07:08:44','2026-08-27 07:08:44','2026-08-27 07:08:44',4,NULL);
INSERT INTO products VALUES(6,'putien-interior-design','蒲田室內設計','Branding Web','Website Strategy · UX/UI · Responsive Design','室內設計品牌的作品、內容與服務流程平台。','UX/UI · Web Design · Content Architecture · Responsive Design','["Branding Web"]','["UX/UI","Web Design","Content Architecture","Responsive Design"]','["Project showcase","Workflow","Editorial content"]','/projects/putien-home.png','putien-interior-design','published','2026-08-27 07:08:44','2026-08-27 07:08:44','2026-08-31 07:43:48',3,NULL);
INSERT INTO product_sections VALUES(31,3,0,'The problem','Consistency cannot depend on individual decisions.','<p>過去的購物流程中，相似元件常有不同樣式與數值；CSS 也容易在新需求下被覆寫、疊加。當交接者沒有規則可依循，畫面一致性與後續維護便高度依賴個人經驗。</p>','2026-08-28 05:46:25','2026-08-28 05:46:25');
INSERT INTO product_sections VALUES(32,3,1,'System architecture','Nested by purpose, not by page.','<p>以 Atomic Design 的分層思維建立 Style Guide：最小元件先有穩定規則，再逐層巢狀組合成較完整的任務區塊。頁面只負責組合，不應再各自覆寫內層元件的 CSS；核心樣式由 CSS 基底維護，Tailwind 則只處理少量、明確的版面調整。</p><ol><li><strong>Foundations</strong>：定義色彩、字級、間距、圓角與互動狀態。</li><li><strong>Atoms</strong>：建立 Button、Icon、Label、Input 等穩定 CSS 基底。</li><li><strong>Molecules</strong>：以多個 Atom 組成欄位、搜尋列、價格資訊等任務單元。</li><li><strong>Organisms</strong>：將 Molecules 組合成可放入頁面的功能區塊。</li></ol>','2026-08-28 05:46:25','2026-08-28 05:46:25');
INSERT INTO product_sections VALUES(33,3,2,'Component model','Change the parameters, not the component.',replace('<p>將按鈕、輸入框與狀態等既有結構收斂到元件 CSS；使用者只需要透過 Props 或預設的 Utility 傳入尺寸、間距、圓角與排列方式。這保留了使用彈性，也避免為了單一情境去改寫或破壞原本元件。</p>\n<pre><code>&lt;Button\n  variant="contained"\n  tone="primary"\n  size="lg"\n  spacing="m-10"\n  radius="xl"\n/&gt;</code></pre>','\n',char(10)),'2026-08-28 05:46:25','2026-08-28 05:46:25');
INSERT INTO product_sections VALUES(34,3,3,'Shared documentation','Storybook',replace('<p>Bridging the Gap Between Design and Code.<br>以 Storybook 將元件種類、狀態、可調整欄位與原始碼集中呈現。設計、前端與接手成員不只知道元件「長什麼樣子」，也能理解何時使用、如何調整，並直接複製程式碼投入開發。</p>\n<ul>\n<li>降低元件被任意覆寫的風險。</li>\n<li>讓新需求在既定規則下快速組合。</li>\n<li>提供跨角色可共同使用的文件與程式碼。</li>\n</ul>','\n',char(10)),'2026-08-28 05:46:25','2026-08-28 05:46:25');
INSERT INTO product_sections VALUES(63,1,0,'01 — UX/UI Reconstruction','Reframing an existing system through hierarchy and clarity.',replace('<p>重新設計既有系統中資訊、視覺與操作的層級。</p>\n<p>目標是讓管理者在大量訂單與日常資料之間，清楚並瞭解 <strong>核心資訊 &rarr; 工作狀態 &rarr; 下一步操作</strong>，降低查找與判斷成本。</p>\n<p>以下三個方向都以既有畫面做 Before / After 對比；內容聚焦已完成的介面整理。</p>','\n',char(10)),'2026-08-28 09:00:02','2026-08-28 09:00:02');
INSERT INTO product_sections VALUES(64,1,1,'Information Hierarchy','Let the most important information be understood first.','<p><strong>Before：</strong>既有列表承載了篩選、資料、逐列操作與匯出，資訊的重要程度不明確，使用者需要自己從大量內容中找重點。</p><p><strong>After：</strong>重新整理區塊與閱讀順序，讓管理者能先掌握目前的工作狀態，再進入對應操作。這不是新增功能，而是讓既有資訊以更清楚的層級被看見。</p><p><strong>Focus：</strong>Reduce cognitive load — 讓核心資訊優先被理解。</p>','2026-08-28 09:00:02','2026-08-28 09:00:02');
INSERT INTO product_sections VALUES(65,1,2,'Visual & Interaction Hierarchy','Make actions easier to scan.',replace('<ul>\n<li>\n<p><strong>舊有痛點（Before）：</strong></p>\n<ul>\n<li>\n<p><strong>按鈕氾濫且視覺干擾嚴重：</strong> 每筆明細重複配置獨立的「修改」按鈕，造成嚴重視覺噪音，並大幅提高誤觸風險。</p>\n</li>\n<li>\n<p><strong>操作權重缺乏層級規範：</strong> 查詢、查看、匯出與修改等功能在顏色與尺寸上均一化，缺乏明確的主次架構（Primary / Secondary / Danger），使用者難以辨識核心行動點（CTA）。</p>\n</li>\n<li>\n<p><strong>資訊混亂且瀏覽負擔沉重：</strong> 關鍵數據直接混入文字段落中，且缺乏分頁與結構化收納，多筆資料時頁面無限垂直延伸，造成閱讀與審核疲勞。</p>\n</li>\n</ul>\n</li>\n<li>\n<p><strong>重構重點（After）：</strong></p>\n<ul>\n<li>\n<p><strong>資訊模組化分層：</strong> 明確拆分「客資/訂單總覽」與「執行人員/明細表格」，建立清晰的資訊閱讀階層。</p>\n</li>\n<li>\n<p><strong>按鈕語意與層級標準化：</strong> 統一規範主要操作（Primary）、次要動作（Secondary/Text）與危險警示（Danger），降低介面干擾與操作認知負擔。</p>\n</li>\n<li>\n<p><strong>漸進式瀏覽與高效檢索：</strong> 採用「列表總覽 &gt; 詳細頁/彈窗」的雙層結構，結合多維度條件篩選與分頁機制，讓管理者在龐大資料中快速精準定位目標。</p>\n</li>\n</ul>\n</li>\n</ul>','\n',char(10)),'2026-08-28 09:00:02','2026-08-28 09:00:02');
INSERT INTO product_sections VALUES(66,1,3,'02 — Scheduling & Backfill','Make scheduling gaps visible, and easier to resolve.',replace('<p><strong>痛點（Pain Points）</strong></p>\n<ul>\n<li>\n<p><strong>跨表核對耗時繁瑣</strong>：排班需手動核對客戶的接案地區、特殊需求（如寵物、辦公室、窗戶清潔等）、週期時段，以及清潔人員的接案地區、清潔時間與身分類型，耗費大量人工時間。</p>\n</li>\n<li>\n<p><strong>容易疏漏造成缺工或衝突</strong>：人工比對容易忽略人員已請假或時段重疊，在批次排班時不易即時察覺缺工或人數未滿的狀況。</p>\n</li>\n</ul>\n<p><strong>解決方案與產品價值（Solutions &amp; Value）</strong></p>\n<ul>\n<li>\n<p><strong>多維度條件自動篩選</strong>：系統直接依據訂單設定的「日期」、「清潔時段」、「接案地區」與「特殊需求」，自動撈出符合條件的清潔人員名單。</p>\n</li>\n<li>\n<p><strong>視覺化缺工標示與動態補位</strong>：批次產出排程後，有缺額的月份以紅點標記（如 <code>2021/6 🔴</code>），缺工列顯示「補入」按鈕，點擊即自動帶入該場次時間進行指派。</p>\n</li>\n<li>\n<p><strong>人數上限防呆控制</strong>：依據開單設定的需求人數動態計算剩餘配額，選取達上限時即時顯示「已達人數上限」並鎖定勾選，防止超額指派</p>\n</li>\n</ul>','\n',char(10)),'2026-08-28 09:00:02','2026-08-28 09:00:02');
INSERT INTO product_images VALUES(6,2,'/projects/momo-shopping-cart-flow.png','momo Shopping Cart flow chart','gallery',0,'2026-08-27 07:08:44',NULL,'','');
INSERT INTO product_images VALUES(13,4,'/projects/annluya-overview.png','Annluya desktop and mobile website design','gallery',0,'2026-08-27 07:08:44',NULL,'','');
INSERT INTO product_images VALUES(14,5,'/projects/eornet-home.jpg','Eornet homepage','gallery',0,'2026-08-27 07:08:44',NULL,'','');
INSERT INTO product_images VALUES(15,5,'/projects/eornet-product.jpg','Eornet product page','gallery',1,'2026-08-27 07:08:44',NULL,'','');
INSERT INTO product_images VALUES(16,5,'/projects/eornet-about.jpg','Eornet about page','gallery',2,'2026-08-27 07:08:44',NULL,'','');
INSERT INTO product_images VALUES(17,6,'/projects/putien-home.png','Putien Interior Design homepage','gallery',0,'2026-08-27 07:08:44',NULL,'','');
INSERT INTO product_images VALUES(18,6,'/projects/putien-projects.png','Putien Interior Design projects page','gallery',1,'2026-08-27 07:08:44',NULL,'','');
INSERT INTO product_images VALUES(19,6,'/projects/putien-workflow.png','Putien Interior Design workflow page','gallery',2,'2026-08-27 07:08:44',NULL,'','');
INSERT INTO product_images VALUES(49,3,'/projects/design-system-colors.png','Design system color tokens','gallery',0,'2026-08-28 05:46:25',NULL,'','');
INSERT INTO product_images VALUES(50,3,'/projects/design-system-typography.png','Design system typography scale','gallery',1,'2026-08-28 05:46:25',NULL,'','');
INSERT INTO product_images VALUES(51,3,'/projects/design-system-components.png','Design system component patterns','gallery',2,'2026-08-28 05:46:25',NULL,'','');
INSERT INTO product_images VALUES(52,3,'/projects/design-system-checkbox.png','Design system checkbox states','gallery',3,'2026-08-28 05:46:25',NULL,'','');
INSERT INTO product_images VALUES(53,3,'/projects/design-system-badges.png','Design system badge variants','gallery',4,'2026-08-28 05:46:25',NULL,'','');
INSERT INTO product_images VALUES(54,3,'/projects/design-system-icons.png','Design system icon library','gallery',5,'2026-08-28 05:46:25',NULL,'','');
INSERT INTO product_images VALUES(55,3,'/projects/design-system-foundations-colors.png','Design system color foundations','section',0,'2026-08-28 05:46:25',32,'Foundations','定義色彩、字級、間距、圓角與互動狀態。');
INSERT INTO product_images VALUES(56,3,'/projects/design-system-atoms-buttons.png','Button atom specifications','section',1,'2026-08-28 05:46:25',32,'Atoms','建立 Button、Icon、Label、Input 等穩定 CSS 基底。');
INSERT INTO product_images VALUES(57,3,'/projects/design-system-molecules-cart.png','Cart module molecule','section',2,'2026-08-28 05:46:25',32,'Molecules','以多個 Atom 組成欄位、搜尋列、價格資訊等任務單元。');
INSERT INTO product_images VALUES(58,3,'/projects/design-system-organisms-search.png','Search results organism','section',3,'2026-08-28 05:46:25',32,'Organisms','將 Molecules 組合成可放入頁面的功能區塊。');
INSERT INTO product_images VALUES(59,3,'/projects/design-system-storybook-docs.png','Component documentation in Storybook','section',0,'2026-08-28 05:46:25',34,'Storybook Documentation','集中呈現元件種類、狀態、可調整欄位與原始碼，作為團隊共享的 source of truth。');
INSERT INTO product_images VALUES(135,1,'/projects/cleaning-doctor/01-authentication.png','Authentication screens','gallery',0,'2026-08-28 09:00:02',NULL,'','');
INSERT INTO product_images VALUES(136,1,'/projects/cleaning-doctor/03-recurring-orders.png','Recurring order management screens','gallery',1,'2026-08-28 09:00:02',NULL,'','');
INSERT INTO product_images VALUES(137,1,'/projects/cleaning-doctor/04-service-operations.png','Service operations screens','gallery',2,'2026-08-28 09:00:02',NULL,'','');
INSERT INTO product_images VALUES(138,1,'/projects/cleaning-doctor/05-payroll-and-people.png','Payroll and people screens','gallery',3,'2026-08-28 09:00:02',NULL,'','');
INSERT INTO product_images VALUES(139,1,'/projects/cleaning-doctor/06-customers-and-system.png','Customer and system screens','gallery',4,'2026-08-28 09:00:02',NULL,'','');
INSERT INTO product_images VALUES(140,1,'/projects/cleaning-doctor/original-design/payroll-list.png','改造前：舊版列表與篩選畫面','section',0,'2026-08-28 09:00:02',64,'Before｜資料堆疊的列表','篩選、查看、匯出與逐列操作同時出現，閱讀順序不明確。');
INSERT INTO product_images VALUES(141,1,'/upload/products/cleaning-doctor-section-1787907462920.png','','section',1,'2026-08-28 09:00:02',64,'After｜以任務整理的後台','新版介面透過重新梳理資訊架構與視覺層級，有效降低了使用者的認知負荷，使建立訂單的任務流程更加直覺。');
INSERT INTO product_images VALUES(142,1,'/projects/cleaning-doctor/original-design/payroll-detail.png','改造前：舊版班次與報酬詳細頁','section',0,'2026-08-28 09:00:02',65,'Before｜操作與資訊平鋪','人員、時段、服務與報酬等內容與操作混在同一平面，密集的資料與操作並列，閱讀理解低需要逐欄確認，管理者需要花費較多時間比對才能找到重點。');
INSERT INTO product_images VALUES(143,1,'/upload/products/cleaning-doctor-section-1787907462920.png','改造後：清楚每筆訂單訊息，可總覽的解讀','section',1,'2026-08-28 09:00:02',65,'After｜ 訂單資訊結構化分層，關鍵數據一目了然。','資訊結構層級分明，從「看單一卡片」升級為「整批資料快速比對」，用清楚的區塊、欄位與狀態呈現，協助先找到需要處理的內容。');
INSERT INTO product_images VALUES(144,1,'/upload/products/cleaning-doctor-section-1787907462920.png','定期清潔新增訂單的週期日期設定','section',0,'2026-08-28 09:00:02',66,'批次產生週期場次','在建立定期訂單時設定週期與日期例外，作為後續場次產生的基礎。');
INSERT INTO product_images VALUES(145,1,'/projects/cleaning-doctor/raw/1.2 定期清潔 – 指派清潔人員.png','定期清潔的人員指派畫面','section',1,'2026-08-28 09:00:02',66,'依適合時間篩選並指派人員','依適合時間篩選並指派人員與人數上限防呆控制「已達人數上限」並鎖定勾選，防止超額指派');
INSERT INTO product_images VALUES(146,1,'/projects/cleaning-doctor/raw/1.2 定期清潔 – 指派清潔人員 – 補人.png','定期清潔的補人操作畫面','section',2,'2026-08-28 09:00:02',66,'補位或調整其他日期','當原場次尚未排滿時，管理者可處理補人；無法安排時則可調整其他日期。');
