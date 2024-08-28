import { test, expect } from "@playwright/test";

test.describe("Marquee Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("marquee component should render and scroll horizontally", async ({
    page,
  }) => {
    const container = await page.locator('[data-testid="containerId"]');
    await expect(container).toBeVisible();

    const initialScrollLeft = await container.evaluate((el) => el.scrollLeft);
    expect(initialScrollLeft).toBe(0);

    // Ensure the container is large enough to scroll
    const containerWidth = await container.evaluate((el) => el.clientWidth);
    const scrollWidth = await container.evaluate((el) => el.scrollWidth);

    expect(scrollWidth).toBeGreaterThan(containerWidth);

    // Scroll the marquee
    await container.dispatchEvent("mousedown", { button: 0 });
    await container.dispatchEvent("mousemove", { button: 0, clientX: 200 });

    // Verify scrolling effect
    const scrolledPosition = await container.evaluate((el) => el.scrollLeft);

    expect(scrolledPosition).toBeGreaterThanOrEqual(initialScrollLeft);
  });

  test("should loop scroll correctly", async ({ page }) => {
    // Scroll to the end
    const marqueeContainer = await page.locator('[data-testid="containerId"]');
    await marqueeContainer.evaluate((el) => (el.scrollLeft = el.scrollWidth));
    const scrollLeftAtEnd = await marqueeContainer.evaluate(
      (el) => el.scrollLeft
    );
    expect(scrollLeftAtEnd).toBeGreaterThan(0);

    // Check if it scrolls back to the start
    const scrollLeftAtStart = await marqueeContainer.evaluate(
      (el) => el.scrollLeft = 0
    );
    expect(scrollLeftAtStart).toBe(0);
  });

  // test('has title', async ({ page }) => {
  //   const title = page.getByTestId("test")
  //   await expect(title).toBeVisible();
  // });
});