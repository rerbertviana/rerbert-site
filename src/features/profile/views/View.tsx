import { View as BackButton } from "../components/back-button/View";
import { View as LinksPanel } from "../components/links-panel/View";
import { View as MissionsPanel } from "../components/missions-panel/View";
import { View as ProfileTitle } from "../components/profile-title/View";
import { View as SkillsPanel } from "../components/skills-panel/View";

export function View() {
  return (
    <main aria-label="Character Profile" className="flex flex-1 flex-col">
      <ProfileTitle />

      <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-8 pt-6 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <BackButton />
        </div>

        <div className="flex flex-col gap-4">
          <SkillsPanel />
          <MissionsPanel />
          <LinksPanel />
        </div>
      </section>
    </main>
  );
}
