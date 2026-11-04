interface SelectionFooterProps {
  onSelectCharacter?: () => void;
}

export function SelectionFooter({
  onSelectCharacter,
}: SelectionFooterProps) {
  return (
    <footer>
      <button type="button" onClick={onSelectCharacter}>
        Select Character
      </button>

      <nav aria-label="Keyboard shortcuts">
        <span>← / → Navigate</span>
        <span>Enter Select</span>
        <span>Esc Back</span>
      </nav>
    </footer>
  );
}
