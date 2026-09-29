Playwright E2E Automation

An end-to-end(E2E) testing framework developed in TypeScript using Playwright, structured according to the *Page Object Model* (POM)

Technologies and tools:
- Playwright: Modern framework for fast and reliable E2E testing;
- TypeScript: JavaScript superset with static typing;
- Page Object Model(POM): Design pattern for separation of concerns;
- Github Actions: CI/CD pipeline for automated test execution.

Project structure
portfolio-playwright/
|-- .github/workflows/playwright.yml  (CI/CD Pipeline)
|-- pages/                            (Page Objects)
|-- tests/                            (E2E test scenarios divided by modules)
|-- playwright.config.ts              (Global configurations)
|-- package.json                      (Dependencies)

How to run the Project
1. git clone [https://github.com/simplicioBruna96/portfolio-playwright.git](https://github.com/simplicioBruna96/portfolio-playwright.git)
2. Install Dependencies: npm install 
3. Install Playwright: npx playwright install
4. Tests 
    - Headless mode: npx playwright test
    - UI mode interface: npx playwright test --ui
    - View the test report: npx playwright show-report
