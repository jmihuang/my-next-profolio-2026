import xss from "xss";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { profile } from "@/lib/profile";

let legacyDb;

export const contactDefaults = {
  eyebrow: "Let's work together",
  title: "Let's build something that works.",
  description: "如果你正在打造產品、服務或新的數位體驗，我很樂意一起釐清問題、規劃並實現。",
  email_label: "Email me",
  email_address: profile.email,
  linkedin_label: "LinkedIn ↗",
  linkedin_url: profile.linkedin,
  projects_label: "Projects ↗",
  projects_url: "/projects",
  cv_label: "Download CV PDF",
  cv_url: "/downloads/Jamie_Huang_Senior_Product_Designer_CV_CN.pdf",
};

function ensureLegacySchema(db) {
  db.exec(`CREATE TABLE IF NOT EXISTS contact_cta (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    eyebrow TEXT NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL,
    email_label TEXT NOT NULL, email_address TEXT NOT NULL,
    linkedin_label TEXT NOT NULL, linkedin_url TEXT NOT NULL,
    projects_label TEXT NOT NULL, projects_url TEXT NOT NULL,
    cv_label TEXT NOT NULL, cv_url TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
  db.prepare(`INSERT OR IGNORE INTO contact_cta (id, eyebrow, title, description, email_label, email_address, linkedin_label, linkedin_url, projects_label, projects_url, cv_label, cv_url) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(contactDefaults.eyebrow, contactDefaults.title, contactDefaults.description, contactDefaults.email_label, contactDefaults.email_address, contactDefaults.linkedin_label, contactDefaults.linkedin_url, contactDefaults.projects_label, contactDefaults.projects_url, contactDefaults.cv_label, contactDefaults.cv_url);
}

async function getDb() {
  if (process.env.NODE_ENV === "development") {
    if (!legacyDb) {
      const { default: Database } = await import(/* webpackIgnore: true */ "better-sqlite3");
      legacyDb = new Database("data.db");
      ensureLegacySchema(legacyDb);
    }
    return { kind: "legacy", db: legacyDb };
  }
  const { env } = await getCloudflareContext({ async: true });
  if (!env.PRODUCTS_DB) throw new Error("PRODUCTS_DB D1 binding is not configured.");
  return { kind: "d1", db: env.PRODUCTS_DB };
}

async function first(query, ...values) {
  const connection = await getDb();
  if (connection.kind === "legacy") return connection.db.prepare(query).get(...values) || null;
  return (await connection.db.prepare(query).bind(...values).first()) || null;
}

async function run(query, ...values) {
  const connection = await getDb();
  if (connection.kind === "legacy") return connection.db.prepare(query).run(...values);
  return connection.db.prepare(query).bind(...values).run();
}

export async function getContactCta() {
  return (await first("SELECT * FROM contact_cta WHERE id = 1")) || contactDefaults;
}

function clean(value) { return xss(String(value || "").trim()); }
function cleanUrl(value) {
  const url = String(value || "").trim();
  if (url.startsWith("/") || /^https:\/\//.test(url)) return url;
  throw new Error("連結請使用 / 開頭的站內路徑，或 https:// 網址。");
}

export async function updateContactCta(input) {
  const data = {
    eyebrow: clean(input.eyebrow), title: clean(input.title), description: clean(input.description),
    email_label: clean(input.email_label), email_address: clean(input.email_address),
    linkedin_label: clean(input.linkedin_label), linkedin_url: cleanUrl(input.linkedin_url),
    projects_label: clean(input.projects_label), projects_url: cleanUrl(input.projects_url),
    cv_label: clean(input.cv_label), cv_url: cleanUrl(input.cv_url),
  };
  if (Object.values(data).some((value) => !value)) throw new Error("請完整填寫聯絡 CTA 設定。");
  await run("UPDATE contact_cta SET eyebrow = ?, title = ?, description = ?, email_label = ?, email_address = ?, linkedin_label = ?, linkedin_url = ?, projects_label = ?, projects_url = ?, cv_label = ?, cv_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1", data.eyebrow, data.title, data.description, data.email_label, data.email_address, data.linkedin_label, data.linkedin_url, data.projects_label, data.projects_url, data.cv_label, data.cv_url);
  return getContactCta();
}
