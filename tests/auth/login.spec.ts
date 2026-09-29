import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { USERS } from '../../utils/dataFactory';

test.describe('Feature: Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('LOG-01: Valid credentials redirects to inventory', async ({ page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('LOG-02: Invalid password shows error', async () => {
    await loginPage.login(USERS.standard.username, 'wrong_password');
    await expect(loginPage.errorMessage).toContainText('do not match');
  });

  test('LOG-03: Locked user shows error', async () => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('LOG-04: Empty fields shows error', async () => {
    await loginPage.submitButton.click();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('LOG-05: Empty password shows error', async () => {
    await loginPage.usernameField.fill(USERS.standard.username);
    await loginPage.submitButton.click();
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });
});