import { profile } from "../data/profile";

export function CharacterInformation() {
  return (
    <section aria-label="Character information">
      <div>
        <h2>Experience</h2>
        <p>{profile.experience}</p>
      </div>

      <div>
        <h2>Education</h2>
        <p>{profile.education}</p>
      </div>

      <div>
        <h2>Location</h2>
        <p>{profile.location}</p>
      </div>

      <div>
        <h2>Status</h2>
        <p>{profile.availability}</p>
      </div>
    </section>
  );
}
