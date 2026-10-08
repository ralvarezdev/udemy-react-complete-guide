# udemy-react-complete-guide

**Note:** This repository is archived and read-only.

Challenges and projects from Maximilian Schwarzmuller's React course on Udemy. Each numbered folder is a course section, usually with an `exercises/` directory and/or a `project/` demo app. Sections 02, 28 and 29 are not present, and section titles below are inferred from folder names.

## Sections

- **`01`–`08`** — JavaScript refresher and first React app (`react-scripts`), React essentials and deep dive, practice project, styling (CSS, inline, Tailwind), debugging, refs and portals
- **`09`–`13`** — project management app (Vite + Tailwind), Context API and `useReducer`, side effects, quiz demo project, behind the scenes
- **`14`–`18`** — class-based components, HTTP requests, custom hooks, forms, food order app
- **`19`–`23`** — Redux basics and advanced Redux, routing, authentication, deployment
- **`24`–`30`** — React Query, Next.js introduction, animation, patterns, React with TypeScript

## Running a project

Each `project/` folder is an independent app with its own `package.json`. Most use Vite (`dev`, `build`, `lint`, `preview`); `01-getting-started` uses `react-scripts` (`start`, `build`, `test`).

```bash
cd 09-project-management-app/project
npm install
npm run dev
```

## License

GNU General Public License v3.0 (see `LICENSE`).
