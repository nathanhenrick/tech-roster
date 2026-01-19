import { test } from "@playwright/test";

test("auth setup", async ({ page }) => {
  const email = `teste+${Date.now()}@example.com`;
  const password = "SenhaSegura123";

  await page.goto("http://localhost:3000/admin/cadastrar");

  await page.getByTestId("email").fill(email);
  await page.getByTestId("password").fill(password);
  await page.getByTestId("password_confirmation").fill(password);
  await page.getByTestId("btn_register").click();

  await page.waitForURL(/\/admin\/login/);

  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);
  await page.getByTestId("btn_login").click();

  await page.waitForURL(/\/admin\/desenvolvedores/);

  await page.context().storageState({
    path: "storageState.json",
  });
});
