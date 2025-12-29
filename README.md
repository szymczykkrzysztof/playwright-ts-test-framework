# Playwright test automation framework in typescript
Test automation framework for https://www.saucedemo.com web application implemented in typescript.

A modern **Playwright automation framework** built in **TypeScript**, designed for reliable end-to-end UI testing and scalable automation. This framework uses best practices like the **Page Object Model (POM)**, typed fixtures, environment configuration, and CI/CD readiness.

It’s suitable for writing clear, maintainable automated tests using Playwright’s powerful TypeScript support.

---

## 🚀 Features

- ✨ Playwright + TypeScript based test automation
- 🧱 Page Object Model for scalable architecture
- 🧪 Test fixtures for reusable components
- 🌍 Environment configuration via `.env`
- 🎯 Configurable test runs (smoke/regression)
- 📊 HTML test reporting
- 📦 CI/CD support (GitHub Actions / Jenkins)
- 🛠 Cross-browser support (Chromium, Firefox, etc.)


## 🛠 Installation & Setup

Follow the steps below to install dependencies, set up Playwright, and run the tests locally.

### 1. Install NPM dependencies

Install all required Node.js packages defined in `package.json`:

```bash
npm install
```
### 2. Install Playwright browsers

Download and install all required Playwright browser binaries and system dependencies:
```bash
npx playwright install --with-deps
```

### 3. Configure environment variables (if needed)

Create a .env file based on the provided example:
```bash
cp .env.example .env
```
or
```bash
touch .env
```
on the root level of project.
### 4. Run tests

Execute all tests
```bash
npx playwright test
```
### 5. Generate test report with test run results
```bash
npx playwright show-report
```
