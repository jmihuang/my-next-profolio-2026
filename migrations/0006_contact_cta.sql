CREATE TABLE contact_cta (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  eyebrow TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  email_label TEXT NOT NULL,
  email_address TEXT NOT NULL,
  linkedin_label TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  projects_label TEXT NOT NULL,
  projects_url TEXT NOT NULL,
  cv_label TEXT NOT NULL,
  cv_url TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contact_cta (id, eyebrow, title, description, email_label, email_address, linkedin_label, linkedin_url, projects_label, projects_url, cv_label, cv_url) VALUES
(1, 'Let''s work together', 'Let''s build something that works.', '如果你正在打造產品、服務或新的數位體驗，我很樂意一起釐清問題、規劃並實現。', 'Email me', 'jmispace@gmail.com', 'LinkedIn ↗', 'https://www.linkedin.com/in/jamie-huang-37597a140/', 'Projects ↗', '/projects', 'Download CV PDF', '/downloads/Jamie_Huang_Senior_Product_Designer_CV_CN.pdf');
