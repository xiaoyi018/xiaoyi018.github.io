const { test, expect } = require("@playwright/test");

const routes = [
  ["", "Yi Xiao"],
  ["publications/", "LoRA-EnVar"],
  ["projects/", "WindINR"],
  ["repositories/", "GitHub"],
  ["cv/", "Tsinghua University"],
];

for (const theme of ["light", "dark"]) {
  for (const [route, content] of routes) {
    test(`${route || "home"} renders in ${theme} theme`, async ({ page }, testInfo) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
      const response = await page.goto(`/al-folio/${route}`, { waitUntil: "load" });
      expect(response.status()).toBe(200);
      await expect(page.locator("body")).toContainText(content);
      await expect(page.locator("body")).not.toContainText("Albert Einstein");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(2);
      expect(errors).toEqual([]);
      await testInfo.attach("page", { body: await page.screenshot({ fullPage: true }), contentType: "image/png" });
    });
  }
}

test("all four research project links open", async ({ page }) => {
  await page.goto("/al-folio/projects/");
  const links = await page.locator('.projects a[href*="/projects/"]').evaluateAll((nodes) => [...new Set(nodes.map((node) => node.href))]);
  expect(links).toHaveLength(4);
  for (const link of links) {
    const response = await page.goto(link);
    expect(response.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
  }
});

test("mobile navigation expands and collapses", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile navigation only");
  await page.goto("/al-folio/");
  const toggle = page.locator(".navbar-toggler").first();
  const nav = page.locator(".navbar-collapse").first();
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(nav).toHaveClass(/show/);
  await toggle.click();
  await expect(nav).not.toHaveClass(/show/);
});

test("navigation keeps the same identity and links across every page", async ({ page }, testInfo) => {
  const expected = ["About", "Publications", "Research", "Code", "CV"];
  let brandBox;
  for (const [index, [route]] of routes.entries()) {
    await page.goto(`/al-folio/${route}`);
    const brand = page.locator("#navbar .navbar-brand");
    await expect(brand).toHaveText("Yi Xiao");
    const box = await brand.boundingBox();
    if (brandBox) {
      expect(Math.abs(box.x - brandBox.x)).toBeLessThanOrEqual(1);
      expect(Math.abs(box.y - brandBox.y)).toBeLessThanOrEqual(1);
    }
    brandBox = box;
    if (testInfo.project.name === "mobile") {
      await page.getByRole("button", { name: "Toggle navigation" }).click();
    }
    await expect(page.locator("#navbar .nav-item > a.nav-link")).toHaveText(expected.map((label) => new RegExp(`^${label}`)));
    await expect(page.locator("#navbar .nav-item.active > a")).toHaveText(new RegExp(expected[index]));
    const next = (index + 1) % routes.length;
    await page
      .locator("#navbar")
      .getByRole("link", { name: new RegExp(`^${expected[next]}`) })
      .click();
    await expect(page).toHaveURL(new RegExp(`/al-folio/${routes[next][0]}$`));
  }
});

test("papers, co-authored papers and conference abstracts are distinct", async ({ page }) => {
  await page.goto("/al-folio/publications/");
  const lists = page.locator(".publications ol.bibliography");
  // Jekyll groups each category by year, so assert against the rendered entry IDs.
  await expect(page.locator(".publications li .title")).toHaveCount(8);
  await expect(page.locator("#fan2026latent .author")).toContainText("Yi Xiao");
  await expect(page.locator("#li2023rapid .author")).toContainText("Wei Xue");
  await expect(page.locator("#xiao2025egu .periodical").first()).toContainText("EGU25-14520");
  await expect(page.locator("#xiao2024egu .periodical").first()).toContainText("EGU24-2857");
  for (const id of ["first-author", "coauthored", "abstracts"]) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  for (const key of ["xiao2025lora", "xiao2025vae", "xiao2024fengwu", "fan2026latent", "li2023rapid", "xiao2025egu", "xiao2024egu"]) {
    await expect(page.locator(`#${key} .links a[href^='https://']`).first()).toBeVisible();
  }
  expect(await lists.count()).toBeGreaterThan(0);
});

test("publication filter and citation disclosure work", async ({ page }) => {
  await page.goto("/al-folio/publications/");
  await page.getByPlaceholder("Type to filter").fill("LoRA-EnVar");
  await expect(page.locator(".publications li:visible")).toHaveCount(1);
  await expect(page.locator("#xiao2025lora")).toBeVisible();
  await page.getByPlaceholder("Type to filter").fill("");
  await expect(page.locator(".publications li:visible")).toHaveCount(8);
  const bib = page.locator("#xiao2025lora .bibtex.hidden");
  await expect(bib).not.toHaveClass(/open/);
  await page.locator("#xiao2025lora a.bibtex").click();
  await expect(bib).toHaveClass(/open/);
  expect((await bib.boundingBox()).height).toBeGreaterThan(20);
  await page.locator("#xiao2025lora a.bibtex").click();
  await expect(bib).not.toHaveClass(/open/);
});

test("search contains the site's real pages and no demo entries", async ({ page }, testInfo) => {
  await page.goto("/al-folio/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Toggle navigation" }).click();
  }
  await page.getByRole("button", { name: "Open search" }).click();
  const search = page.locator("ninja-keys");
  await expect(search.getByPlaceholder("Type to start searching")).toBeVisible();
  await expect(search).toContainText("Publications");
  await expect(search).toContainText("WindINR");
  await expect(search).not.toContainText("Einstein");
  await expect(search).not.toContainText("a post with");
});
