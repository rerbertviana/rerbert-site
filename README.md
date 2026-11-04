# RERBERT.EXE — Character Selection

Initial Next.js structure for the portfolio homepage.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Motion for React (`motion`)
- Lucide React

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Current scope

This first scaffold contains only the homepage structure and its components:

- Header: brand, audio control placeholder, language selector and CV download.
- Title: screen label, title and subtitle.
- Character carousel: one main character placeholder and four locked placeholders.
- Character information: experience, education, location and availability.
- Footer: Select Character action and keyboard hints.

The page background is in `public/images/developer-room.png`.

## Next implementation steps

1. Replace the character placeholder SVGs with the final character illustrations.
2. Build the visual design and responsive layout.
3. Add Motion transitions and ambient background effects.
4. Implement keyboard navigation and the Select Character route.
5. Add real audio behavior if desired.

## Notes

- The project uses Next.js routing, so React Router is intentionally not installed.
- Tailwind is configured but the homepage components are deliberately unstyled at this stage.
- Package dependencies use the `latest` dist-tag so `npm install` resolves current releases at installation time.
