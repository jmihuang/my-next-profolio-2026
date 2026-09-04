CREATE TABLE experiences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  period TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  summary TEXT NOT NULL,
  highlights_json TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'published',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO experiences (period, company, role, summary, highlights_json, status, sort_order) VALUES
('2017/05 — Present', 'Freelance / Self-employed', 'Senior Product Designer · UX/UI & Frontend', '長期承接產品、網站與數位服務專案，從需求訪談、問題釐清、功能規劃到 UX/UI 與前端開發，完整推進 0→1 專案流程。', '["Camping Daddy APP · Product discovery、UX/UI、Vue 2 與後台 API 串接","Node 人脈管理 APP · 需求分析、Functional Map、UI Flow 與 UX/UI 設計","minequo 米奈可、華南銀行 · 網站企劃、互動設計與 RWD 前端實作"]', 'published', 0),
('2022/06 — 2024/03', 'momo.com Inc.', 'Frontend Engineer', '參與大型 B2C 電商核心產品與 UI 組件建置，整合購物流程、RWD 規劃與 React 前端實作。', '["Shopping Cart · React、TypeScript、Tailwind；梳理複雜功能與操作邏輯","momoUI · React、TypeScript、SCSS、Storybook；參與可重複使用的 UI Components 建置","Search · Next.js、TypeScript、Tailwind 前端開發與既有系統維護"]', 'published', 1),
('2020/09 — 2022/02', 'Stanley Black & Decker', 'Senior Digital Designer', '與 Asia Branding Team 跨團隊合作，參與亞洲區數位行銷專案、活動網站與 EDM 製作。', '["帶領平面設計師轉型數位設計，進行 Web Design 與 UX Thinking 內部培訓","協作完成亞洲區品牌數位體驗與行銷專案"]', 'published', 2),
('2014/03 — 2017/05', 'Microprogram', 'Frontend Web Developer', '與 PM、後端工程師及設計師協作，讓設計調整符合前端結構與實際開發需求。', '["YouBike 官網與維護系統 · RWD、跨瀏覽器相容性、UI 互動與 API 串接","LoRa 停車場管理系統 · Vue.js、UI 互動與前端功能開發"]', 'published', 3),
('2011/06 — 2012/08', 'Yao Fa Technology', 'Senior Web Designer', '負責政府與公共服務專案的網站視覺、互動與前端切版，並與專案經理、設計及工程團隊協作完成提案與上線。', '["國家公園與政府活動網站 · UI 設計、Flash 動態與前端切版","壽山國家公園、海洋管理處、台江國家公園等公共服務專案","任職期間參與並成功取得四件政府標案"]', 'published', 4),
('2009/06 — 2011/05', 'He Meng E-commerce', 'Web Designer', '參與電商平台與企業形象網站製作，將視覺設計轉化為可落地的網頁版型，並與企劃及工程角色共同推進專案。', '["郵政商城等電商平台 · 視覺設計、DIV 切版與商家架站頁面","企業形象網站 · 品牌視覺與網站版型設計"]', 'published', 5),
('2006/07 — 2009/05', 'Wo Long Creative Studio', 'Web Designer', '從中小企業網站開始累積數位設計與前端實作經驗，負責網站視覺、Flash 動態、切版與平面設計。', '["中小企業網站 · 視覺設計、Flash 動態與 HTML/CSS 切版","品牌平面設計與數位素材製作"]', 'published', 6);
