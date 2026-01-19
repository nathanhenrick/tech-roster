import { test, expect } from "@playwright/test";

test.describe("Níveis de Desenvolvedor", () => {
  const levelName = `Pleno ${Date.now()}`;
  const updatedLevelName = `Senior ${Date.now()}`;

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/admin/niveis");
    await page.waitForLoadState("networkidle");
  });

  test("Criar, editar e remover nível", async ({ page }) => {
    await page.getByTestId("level-add").click();

    await page.getByTestId("level-name").fill(levelName);
    await page.getByTestId("level-save").click();

    const row = page
      .locator('[data-testid^="level-row"]')
      .filter({ hasText: levelName });

    await expect(row).toBeVisible();

    await row.getByTestId("level-edit").click();
    await page.getByTestId("level-name").fill(updatedLevelName);
    await page.getByTestId("level-save").click();

    const updatedRow = page
      .locator('[data-testid^="level-row"]')
      .filter({ hasText: updatedLevelName });

    await expect(updatedRow).toBeVisible();

    await updatedRow.getByTestId("level-delete").click();
    await page.locator(".swal2-confirm").click();

    await expect(updatedRow).toHaveCount(0);
  });
});
