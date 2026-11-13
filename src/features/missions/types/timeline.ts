import type { Mission } from "@/shared/types/mission";
import type { Project } from "./project";

export type MissionFilter = "all" | "experience" | "project";

export type TimelineEntry =
  | {
      id: string;
      type: "experience";
      data: Mission;
      sortDate: string;
      isInProgress: false;
    }
  | {
      id: string;
      type: "project";
      data: Project;
      sortDate: string | null;
      isInProgress: boolean;
    };
