import { View as ProfileTitle } from "../components/profile-title/View";
import { View as SkillsPanel } from "../components/skills-panel/View";
import { View as MissionsPanel } from "../components/missions-panel/View";
import { View as LinksPanel } from "../components/links-panel/View";

export function View() {
  return (
    <main aria-label="Character Profile" className="flex flex-1 flex-col">
      <ProfileTitle />

      <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 pb-12 pt-8 sm:px-8">
        <SkillsPanel />
        <MissionsPanel />
        <LinksPanel />
      </section>
    </main>
  );
}
