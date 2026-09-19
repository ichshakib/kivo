<div align="center">

<img src="./assets/logo.svg" alt="Kivo Logo" width="120" />

# Kivo

**A high-performance modern monorepo powering web, mobile, documentation, and backend services.**

[![Turborepo](https://img.shields.io/badge/Turborepo-2.x-000000?logo=turborepo&logoColor=white)](https://turborepo.org)
[![Next.js](https://img.shields.io/badge/Next.js-16.x-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![Expo](https://img.shields.io/badge/Expo-57.x-000020?logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB?logo=react&logoColor=black)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![pnpm](https://img.shields.io/badge/pnpm-11.x-F69220?logo=pnpm&logoColor=white)](https://pnpm.io)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier&logoColor=white)](https://prettier.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

</div>

---

## 📌 Overview

**Kivo** is built as an end-to-end fullstack ecosystem managed with **Turborepo** and **pnpm workspaces**. It brings together web, native mobile, documentation, shared UI design systems, and backend services in a unified repository.

---

## 🏗️ Monorepo Architecture

```
kivo/
├── apps/
│   ├── web/               # Next.js 16 Web Application (Port 3000)
│   ├── mobile/            # Expo & React Native Mobile App (iOS / Android / Web)
│   ├── docs/              # Next.js 16 Documentation Portal (Port 3001)
│   └── api/               # Node.js / TypeScript Backend API Service
├── packages/
│   ├── ui/                # Shared React Component Library (@repo/ui)
│   ├── typescript-config/ # Monorepo tsconfig presets (@repo/typescript-config)
│   └── eslint-config/     # Monorepo ESLint configurations (@repo/eslint-config)
├── assets/                # Official brand identity & vector assets
├── .github/               # GitHub issue templates, PR template & workflows
└── .vscode/               # Workspace settings & recommended extensions
```

---

## 🚀 Applications & Packages

### 📱 Apps

| Application  | Technology                             | Description                         | Dev Command                  | Port                    |
| :----------- | :------------------------------------- | :---------------------------------- | :--------------------------- | :---------------------- |
| **`web`**    | Next.js 16 (App Router), React 19      | Primary web interface               | `pnpm --filter web dev`      | `http://localhost:3000` |
| **`mobile`** | Expo SDK 57, React Native, Expo Router | Cross-platform mobile app           | `pnpm --filter mobile start` | Metro Bundler           |
| **`docs`**   | Next.js 16 (App Router), React 19      | Product and developer documentation | `pnpm --filter docs dev`     | `http://localhost:3001` |
| **`api`**    | Node.js, TypeScript                    | Backend service scaffold            | `pnpm --filter api dev`      | Configurable            |

### 📦 Shared Packages

- **`@repo/ui`**: Shared UI component system consumed across web and documentation apps.
- **`@repo/typescript-config`**: Centralized TypeScript configurations (`base.json`, `nextjs.json`, `react-library.json`).
- **`@repo/eslint-config`**: Shared ESLint rules (`base`, `next-js`, `react-internal`).

---

## 🛠️ Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: `>= 24.0.0`
- **pnpm**: `>= 11.0.0` (Enable via `corepack enable pnpm` or install globally)

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ichshakib/kivo.git
cd kivo
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start development servers

Run all applications concurrently:

```bash
pnpm dev
```

Or run a specific application:

```bash
# Start Web app
pnpm --filter web dev

# Start Docs app
pnpm --filter docs dev

# Start Mobile app
pnpm --filter mobile start
```

---

## 📜 Available Scripts

| Script                 | Command                               | Description                                         |
| :--------------------- | :------------------------------------ | :-------------------------------------------------- |
| **`pnpm dev`**         | `turbo run dev`                       | Start development servers across all workspaces     |
| **`pnpm build`**       | `turbo run build`                     | Build all apps and packages with dependency caching |
| **`pnpm lint`**        | `turbo run lint`                      | Run ESLint across all projects                      |
| **`pnpm check-types`** | `turbo run check-types`               | Run static TypeScript type checks                   |
| **`pnpm format`**      | `prettier --write "**/*.{ts,tsx,md}"` | Format source code and documentation                |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes using conventional commit messages (`git commit -m 'feat: add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request using our [PR Template](.github/pull_request_template.md).

For bugs and feature requests, please use the [Issue Templates](.github/ISSUE_TEMPLATE/).

---

## 📬 Contact & Support

- **Author**: Shakib Khan
- **GitHub**: [@ichshakib](https://github.com/ichshakib)
- **Email**: [ichshakib@gmail.com](mailto:ichshakib@gmail.com)
- **Repository**: [https://github.com/ichshakib/kivo](https://github.com/ichshakib/kivo)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
