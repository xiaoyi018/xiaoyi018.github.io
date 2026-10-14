const { test, expect } = require("@playwright/test");

const routes = [
  ["", "Yi Xiao"],
  ["publications/", "FengWu"],
  ["projects/", "WindINR"],
  ["cv/", "Tsinghua University"],
  ["repositories/", "GitHub"],
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
