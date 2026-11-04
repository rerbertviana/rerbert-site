import Image from "next/image";
import type { Character } from "../types/character";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const isLocked = character.status === "locked";

  return (
    <article aria-label={isLocked ? "Locked character" : character.name}>
      <Image
        src={character.image}
        alt={isLocked ? "Locked character silhouette placeholder" : "Rerbert Viana character placeholder"}
        width={320}
        height={420}
        priority={!isLocked}
      />

      {isLocked ? (
        <div>
          <p aria-label="Locked">Locked</p>
        </div>
      ) : (
        <div>
          <p>{character.name}</p>
          <p>{character.role}</p>
        </div>
      )}
    </article>
  );
}
