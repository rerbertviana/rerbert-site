import Link from "next/link";

interface SelectionHeaderProps {
  resumeUrl: string;
}

export function SelectionHeader({ resumeUrl }: SelectionHeaderProps) {
  return (
    <header>
      <Link href="/" aria-label="RERBERT.EXE home">
        <span>RERBERT.EXE</span>
        <span>Developer Portfolio</span>
      </Link>

      <nav aria-label="Global controls">
        <button type="button" aria-label="Toggle audio">
          Audio
        </button>

        <label>
          <span>Language</span>
          <select defaultValue="en" aria-label="Select language">
            <option value="en">English</option>
            <option value="pt">Português</option>
          </select>
        </label>

        <a href={resumeUrl} download>
          Download CV
        </a>
      </nav>
    </header>
  );
}
