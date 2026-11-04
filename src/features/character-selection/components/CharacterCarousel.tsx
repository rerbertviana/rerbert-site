import { characters } from "../data/characters";
import { CharacterCard } from "./CharacterCard";

export function CharacterCarousel() {
  return (
    <section aria-label="Character carousel">
      <button type="button" aria-label="Previous character" disabled>
        Previous
      </button>

      <div>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <button type="button" aria-label="Next character" disabled>
        Next
      </button>
    </section>
  );
}
