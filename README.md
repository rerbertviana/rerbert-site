<p align="center">
  <strong>rerbert.dev — Interactive Developer Portfolio</strong>
</p>

<p align="center">
  An interactive developer portfolio inspired by futuristic RPG character selection interfaces, combining gaming aesthetics with a professional presentation of software development experience, skills and projects.
</p>

---

<p><strong>🌐 Overview</strong></p>

<strong>rerbert.dev</strong> is a personal portfolio designed as an interactive experience rather than a traditional portfolio website.

Inspired by futuristic RPG interfaces, the project combines a gaming-inspired visual identity with a professional presentation of my background, skills, career journey and projects.

Visitors can navigate through different sections of the portfolio using an interface built around the concept of character selection, profiles, skill inventories and missions.

<p><strong>✨ Features</strong></p>

- **Character Selection** — Interactive homepage inspired by RPG character selection interfaces.
- **Profile** — Professional profile, education, experience and social links.
- **Skills & Arsenal** — Technologies and development skills presented through an interactive inventory interface.
- **Missions** — Professional experience and projects presented through an interactive interface with filtering.
- **Internationalization** — English and Brazilian Portuguese support.
- **Interactive Navigation** — Keyboard interactions and URL-based navigation.
- **Animations** — Interface transitions and animated interactions.
- **Audio Feedback** — Sound effects integrated into interface interactions.
- **Responsive Design** — Adapted for desktop and mobile devices.

<p><strong>🛠️ Tech Stack</strong></p>

- **Next.js** — App Router
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Motion for React**
- **Lucide React**
- **Zustand**
- **Jest**
- **React Testing Library**

<p><strong>🏗️ Architecture</strong></p>

The project follows a feature-oriented architecture, separating application features from shared components, utilities and infrastructure.

```text
src/
├── app/
│   └── [locale]/
│       ├── missions/
│       ├── profile/
│       ├── skills/
│       ├── layout.tsx
│       └── page.tsx
│
├── features/
│   ├── character-selection/
│   │   ├── components/
│   │   ├── controller/
│   │   ├── data/
│   │   ├── store/
│   │   ├── types/
│   │   ├── utils/
│   │   └── views/
│   │
│   ├── missions/
│   │   ├── components/
│   │   ├── data/
│   │   ├── types/
│   │   ├── utils/
│   │   └── views/
│   │
│   ├── profile/
│   │   ├── components/
│   │   ├── data/
│   │   └── views/
│   │
│   └── skills/
│       ├── components/
│       ├── data/
│       └── views/
│
├── shared/
│   ├── components/
│   │   ├── animations/
│   │   ├── layout/
│   │   ├── navigation/
│   │   └── ...
│   ├── data/
│   ├── i18n/
│   │   └── dictionaries/
│   ├── lib/
│   │   └── audio/
│   └── types/
│
└── proxy.ts

tests/
├── features/
│   ├── character-selection/
│   ├── missions/
│   ├── profile/
│   └── skills/
│
├── shared/
│   ├── components/
│   ├── data/
│   ├── i18n/
│   └── lib/
│
├── setup/
└── proxy.test.ts
```

<p><strong>Architectural principles</strong></p>

- **Feature-oriented organization** — Each feature encapsulates its own components, data, logic and views.
- **Reusable components** — Shared components centralize functionality used across different pages.
- **Separation of concerns** — Views, controllers, data, stores and utilities are organized according to their responsibilities.
- **Shared infrastructure** — Internationalization, audio functionality, shared UI and types are centralized.
- **Testing organization** — Tests mirror the feature and shared structure to facilitate maintenance and discoverability.

<p><strong>🚀 Getting Started</strong></p>

<p><strong>Prerequisites</strong></p>

- Node.js
- npm

<p><strong>Installation</strong></p>

Clone the repository:

```bash
git clone https://github.com/rerbertviana/rerbert-site.git
```

Navigate to the project directory:

```bash
cd rerbert-site
```

Install dependencies:

```bash
npm install
```

<p><strong>Development</strong></p>

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

<p><strong>🧪 Testing</strong></p>

Run the automated test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:coverage
```

<p><strong>🔍 Code Quality</strong></p>

Run ESLint:

```bash
npm run lint
```

<p><strong>📦 Production Build</strong></p>

Generate the production build:

```bash
npm run build
```

Run the production server locally:

```bash
npm run start
```

<p><strong>📌 Project Status</strong></p>

The portfolio is fully developed and has been validated through automated tests, linting, production build and local production testing.

<p><strong>👨‍💻 Author</strong></p>

**Rerbert Brito Viana**

- GitHub: [@rerbertviana](https://github.com/rerbertviana)
- Portfolio: [rerbert.dev](https://rerbert.dev)
