-- Putien Design case study: CMS content and section images.
UPDATE products
SET eyebrow = 'Website Architecture · SEO Research · UI Design · Frontend Development',
    role = 'Website Planning · UI/UX Design · SEO Research · Frontend Development',
    summary = '從品牌優勢與搜尋需求出發，重新規劃網站架構，建立更完整的品牌與服務入口。',
    card_technology_line = 'Website Architecture · SEO Research · UI Design · Frontend Development',
    technologies_json = '["Website Planning","Information Architecture","SEO Research","UI Design","Frontend Development","Responsive Design"]',
    notes_json = '["Brand value to information architecture","Search intent to page classification","Designed, developed and launched"]',
    updated_at = CURRENT_TIMESTAMP
WHERE slug = 'putien-interior-design';

DELETE FROM product_images
WHERE section_id IN (SELECT id FROM product_sections WHERE product_id = (SELECT id FROM products WHERE slug = 'putien-interior-design'));
DELETE FROM product_sections WHERE product_id = (SELECT id FROM products WHERE slug = 'putien-interior-design');

INSERT INTO product_sections (product_id, sort_order, section_leading_title, section_title, content) VALUES
((SELECT id FROM products WHERE slug = 'putien-interior-design'), 0, 'Project context', 'From a small studio to a more established brand.', '<p>蒲田經營約六年，除了新屋設計，也累積了老屋改造、店舖等不同類型的實務經驗。團隊具有深厚工程背景；實際案例與客戶回響，成為品牌建立信任的重要基礎。</p><p>相較於只強調設計風格，蒲田更大的優勢在於 <strong>客製化設計 × 工程能力 × 問題解決</strong>。</p><p><strong>Website challenge：</strong>如何把既有的品牌價值，轉換成更完整、容易理解的網站架構。</p>'),
((SELECT id FROM products WHERE slug = 'putien-interior-design'), 1, 'Market positioning', 'Finding the differentiation beyond aesthetics.', '<p>這張圖是網站規劃時用來對齊品牌定位的設計判斷，不是嚴格的市場統計。蒲田的差異不只在設計，而是在客製化設計之外，具備處理老屋、店舖與複雜工程問題的能力。</p><p><strong>設計只是結果，解決問題才是更深層的能力。</strong></p>'),
((SELECT id FROM products WHERE slug = 'putien-interior-design'), 2, 'SEO research', 'Search intent as a foundation for website architecture.', '<p>SEO 不是設計完成後才加入的優化，而是從網站架構規劃階段，就參與了頁面與資訊分類的決策。</p><p>我以關鍵字架構理解使用者會如何找到這家公司，以及每種需求應該落在哪個頁面：核心／商業需求對應品牌與服務入口；服務／需求導向的搜尋對應服務與作品分類；資訊型問題則對應知識內容入口。</p><p><strong>SEO 不只是關鍵字，而是協助我判斷使用者會用什麼方式找到這家公司，以及這些需求應該落在哪個頁面。</strong></p>'),
((SELECT id FROM products WHERE slug = 'putien-interior-design'), 3, 'Website architecture', 'From business value to information architecture.', '<pre><code>品牌優勢\n    ↓\n市場定位\n    ↓\nSEO / Search Research\n    ↓\nInformation Architecture\n    ↓\nPage Structure\n    ↓\nUI Design</code></pre><p>將客戶原本分散的服務能力，整理成使用者可以理解與搜尋的資訊層級；網站不只展示漂亮作品，也讓人理解蒲田能處理什麼需求、為何值得信任。</p><pre><code>HOME\n├── ABOUT\n├── PROJECTS\n│   ├── Residential\n│   └── Commercial\n├── SERVICES\n├── ARTICLES\n└── CONTACT</code></pre>'),
((SELECT id FROM products WHERE slug = 'putien-interior-design'), 4, 'Page planning', 'Plan each page around a clear user task.', '<p><strong>Homepage｜建立品牌認知</strong><br>依序建立 Who they are → What they do → Why trust them 的理解路徑，將品牌介紹、服務、實際作品、工作流程、客戶回響與文章安排成清楚的瀏覽順序。</p><p><strong>Projects｜展示服務廣度與實際經驗</strong><br>不只展示作品，而是讓使用者透過住宅／商業空間、屋況與需求分類，找到與自身情境接近的案例；這也呼應前段的 Search Intent → Information Architecture。</p><p><strong>Contact｜降低開始溝通的門檻</strong><br>將表單與 LINE 整合為最後的聯絡入口，協助使用者更具體地提出裝修需求。</p>'),
((SELECT id FROM products WHERE slug = 'putien-interior-design'), 5, 'UI design', 'Turning structure into a clear visual experience.', '<p>將資訊架構落實於首頁、作品列表、作品詳情、文章與聯絡頁的閱讀層級。介面以品牌感受、資訊清晰度與可被探索性之間的平衡為原則。</p><p><strong>Designed to balance brand perception, information clarity and discoverability.</strong></p>'),
((SELECT id FROM products WHERE slug = 'putien-interior-design'), 6, 'Frontend development', 'From design to production.', '<pre><code>Website Planning\n        ↓\nUI Design\n        ↓\nResponsive Development\n        ↓\nSEO Implementation\n        ↓\nProduction</code></pre><p>負責將網站架構與 UI 設計落實為可使用的響應式網站，從規劃、設計到前端開發，讓資訊架構能在正式產品中被完整執行。</p>'),
((SELECT id FROM products WHERE slug = 'putien-interior-design'), 7, 'Result', 'A more complete digital presence.', '<p>正式上線後，蒲田從較單一的作品展示，建立出 <strong>Brand → Services → Projects → Articles → Contact</strong> 的完整數位品牌入口。</p><p>這個案例整合了 <strong>SEO Architecture + Website Structure + UI + Frontend</strong>，沒有以未驗證的流量、排名或轉換率數字作為成果主張。</p><p><strong>Designed, developed and launched.</strong></p><p><a href="https://www.putiendesign.com/" target="_blank" rel="noreferrer">Visit Putien Design →</a></p>');

INSERT INTO product_images (product_id, section_id, path, alt, title, description, image_role, sort_order)
SELECT p.id, s.id, v.path, v.alt, v.title, v.description, 'section', v.sort_order
FROM products p
JOIN product_sections s ON s.product_id = p.id
JOIN (
  SELECT 1 AS section_order, '/projects/putien-market-positioning.png' AS path, 'Putien Design market positioning diagram' AS alt, 'Brand positioning as a planning lens' AS title, 'This map expresses the positioning lens used in website planning; it is not presented as market statistics.' AS description, 0 AS sort_order
  UNION ALL SELECT 2, '/projects/putien-seo-research-01.png', 'SEO research: localized combinations and trend considerations', 'Search research input 01', 'User-provided SEO research reference used to inform information classification.', 0
  UNION ALL SELECT 2, '/projects/putien-seo-research-02.png', 'SEO research: keyword categories and suggested page placement', 'Search research input 02', 'Keyword types were mapped to likely page and information locations.', 1
  UNION ALL SELECT 2, '/projects/putien-seo-research-03.png', 'SEO research: keyword pyramid and GEO question terms', 'Search research input 03', 'Search intent was considered in the website information hierarchy.', 2
  UNION ALL SELECT 4, '/projects/putien-home.png', 'Putien Interior Design homepage', 'Homepage｜Brand → service → trust', 'The homepage establishes brand understanding before moving visitors toward work and contact.', 0
  UNION ALL SELECT 4, '/projects/putien-projects.png', 'Putien Interior Design projects page', 'Projects｜Find a relevant case', 'Project classification helps visitors explore cases by their own space and needs.', 1
  UNION ALL SELECT 5, '/projects/putien-workflow.png', 'Putien Interior Design workflow page', 'UI｜Information hierarchy in practice', 'The workflow page shows how complex information is presented in an approachable reading sequence.', 0
) v ON v.section_order = s.sort_order
WHERE p.slug = 'putien-interior-design';
