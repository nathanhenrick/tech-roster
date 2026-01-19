import { test, expect } from "@playwright/test";

test.describe("Desenvolvedores", () => {
  const devName = `Dev ${Date.now()}`;
  const updatedDevName = `Dev Atualizado ${Date.now()}`;

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/admin/desenvolvedores");
    await page.waitForLoadState("networkidle");
  });

  test("Criar, editar e remover desenvolvedor", async ({ page }) => {
    await page.getByTestId("developer-add").click();

    await page.getByTestId("developer-name").fill(devName);
    await page.getByTestId("developer-level").selectOption({ index: 1 });
    await page.getByTestId("developer-gender").selectOption("M");
    await page.getByTestId("developer-birth").fill("2000-01-01");
    await page.getByTestId("developer-hobby").fill("Code");

    await page.getByTestId("developer-save").click();

    const row = page
      .locator('[data-testid^="developer-row"]')
      .filter({ hasText: devName });

    await expect(row).toBeVisible();

    await row.getByTestId("developer-edit").click();
    await page.getByTestId("developer-name").fill(updatedDevName);
    await page.getByTestId("developer-save").click();

    const updatedRow = page
      .locator('[data-testid^="developer-row"]')
      .filter({ hasText: updatedDevName });

    await expect(updatedRow).toBeVisible();

    await updatedRow.getByTestId("developer-delete").click();
    await page.locator(".swal2-confirm").click();

    await expect(updatedRow).toHaveCount(0);
  });
});
