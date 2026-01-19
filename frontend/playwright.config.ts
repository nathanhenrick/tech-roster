import { defineConfig } from "@playwright/test";

export default defineConfig({
  projects: [
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: "e2e",
      use: {
        baseURL: "http://localhost:3000",
        storageState: "storageState.json",
      },
      dependencies: ["setup"],
    },
  ],
});
