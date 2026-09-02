const fs = require("fs");
const path = require("path");
const vm = require("vm");

async function loadProductsModule() {
  const context = vm.createContext({ console, Buffer, process });
  const module = new vm.SourceTextModule(
    fs.readFileSync(path.join(process.cwd(), "lib/products.js"), "utf8"),
    { context, identifier: path.join(process.cwd(), "lib/products.js") },
  );

  await module.link(async (specifier) => {
    const value = require(specifier);
    const keys = [...new Set(["default", ...Object.keys(value)])];
    return new vm.SyntheticModule(keys, function setExports() {
      this.setExport("default", value);
      Object.keys(value).forEach((key) => this.setExport(key, value[key]));
    }, { context });
  });
  await module.evaluate();
  return module.namespace;
}

function productInput(sectionsJson) {
  return {
    title: "CMS Test Product",
    categories: "Design Systems",
    summary: "Temporary CMS verification product.",
    eyebrow: "CMS verification",
    role: "Test editor",
    cardTechnologyLine: "",
    technologies: "",
    notes: "",
    coverImagePath: "/projects/design-system-hero.jpeg",
    status: "published",
    galleryPaths: "",
    sectionsJson: JSON.stringify(sectionsJson),
  };
}

async function assertFrontend(slug, checks) {
  const response = await fetch(`http://127.0.0.1:3000/projects/${slug}`);
  const html = await response.text();
  if (!response.ok || checks.some((check) => !html.includes(check))) {
    throw new Error(`Frontend verification failed for ${slug}`);
  }
  return html;
}

async function main() {
  const products = await loadProductsModule();
  const existing = await products.getAllProducts({ includeDrafts: true });
  existing.filter((product) => product.title === "CMS Test Product").forEach((product) => products.deleteProduct(product.id));

  let test = await products.createProduct(productInput([
    { leadingTitle: "Test section one", title: "Initial CMS section", content: "<p>Initial content from CMS test.</p>", images: [] },
    { leadingTitle: "Test section two", title: "Second CMS section", content: "<p>Second content from CMS test.</p>", images: [{ path: "/projects/design-system-colors.png", alt: "CMS test image" }] },
  ]));
  if (test.sections.length !== 2 || test.sections[1].images.length !== 1) throw new Error("Create test failed");
  await assertFrontend(test.slug, ["Initial CMS section", "Second CMS section", "design-system-colors.png"]);

  test = await products.updateProduct(test.id, productInput([
    { leadingTitle: "Test section one", title: "Updated CMS section", content: "<p>Updated content from CMS test.</p>", images: [] },
    { leadingTitle: "Test section two", title: "Second CMS section", content: "<p>Second content from CMS test.</p>", images: [{ path: "/projects/design-system-colors.png", alt: "CMS test image" }] },
    { leadingTitle: "Test section three", title: "Third CMS section", content: "<p>Third content added from CMS test.</p>", images: [] },
  ]));
  if (test.sections.length !== 3 || test.sections[0].section_title !== "Updated CMS section") throw new Error("Update or add section failed");
  await assertFrontend(test.slug, ["Updated CMS section", "Third CMS section"]);

  test = await products.updateProduct(test.id, productInput([
    { leadingTitle: "Test section three", title: "Third CMS section", content: "<p>Third content added from CMS test.</p>", images: [] },
    { leadingTitle: "Test section one", title: "Updated CMS section", content: "<p>Updated content from CMS test.</p>", images: [] },
    { leadingTitle: "Test section two", title: "Second CMS section", content: "<p>Second content from CMS test.</p>", images: [{ path: "/projects/design-system-colors.png", alt: "CMS test image" }] },
  ]));
  if (test.sections[0].section_title !== "Third CMS section") throw new Error("Section order failed");
  const reorderedHtml = await assertFrontend(test.slug, ["Third CMS section", "Updated CMS section", "Second CMS section"]);
  if (reorderedHtml.indexOf("Third CMS section") > reorderedHtml.indexOf("Updated CMS section")) throw new Error("Frontend section order failed");

  test = await products.updateProduct(test.id, productInput([
    { leadingTitle: "Test section three", title: "Third CMS section", content: "<p>Third content added from CMS test.</p>", images: [] },
    { leadingTitle: "Test section one", title: "Updated CMS section", content: "<p>Updated content from CMS test.</p>", images: [] },
  ]));
  if (test.sections.length !== 2 || test.sections.some((section) => section.section_title === "Second CMS section")) throw new Error("Section delete failed");
  const deletedHtml = await assertFrontend(test.slug, ["Third CMS section", "Updated CMS section"]);
  if (deletedHtml.includes("Second CMS section")) throw new Error("Frontend section deletion failed");

  const report = { slug: test.slug, remainingSectionsBeforeProductDelete: test.sections.map((section) => section.section_title) };
  products.deleteProduct(test.id);
  if (products.getProductById(test.id)) throw new Error("Test product delete failed");
  console.log(JSON.stringify(report));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
