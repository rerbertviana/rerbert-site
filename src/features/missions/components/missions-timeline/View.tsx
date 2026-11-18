import type { TimelineEntry } from "../../types/timeline";
import { View as MissionCard } from "../mission-card/View";

interface Props {
  entries: TimelineEntry[];
}

const CARDS_PER_ROW = 4;

export function View({ entries }: Props) {
  if (entries.length === 0) {
    return null;
  }

  const rows: TimelineEntry[][] = [];

  for (let index = 0; index < entries.length; index += CARDS_PER_ROW) {
    rows.push(entries.slice(index, index + CARDS_PER_ROW));
  }

  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <div className="flex flex-col gap-12">
        {rows.map((row) => (
          <div
            key={row[0].id}
            className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-4"
          >
            {row.map((entry, cardIndex) => {
              const isLastCard = cardIndex === row.length - 1;

              return (
                <div
                  key={entry.id}
                  className={`
                    relative min-w-0

                    ${
                      !isLastCard
                        ? `
                          after:absolute
                          after:content-['']
                          after:bg-[#A78BFA]
                        `
                        : ""
                    }

                    ${
                      !isLastCard
                        ? `
                          after:left-1/2
                          after:top-full
                          after:h-8
                          after:w-[2px]
                          after:-translate-x-1/2
                          sm:after:hidden
                        `
                        : ""
                    }

                    ${
                      !isLastCard
                        ? `
                          xl:after:left-full
                          xl:after:top-1/2
                          xl:after:h-px
                          xl:after:w-5
                          xl:after:-translate-y-1/2
                          xl:after:translate-x-0
                          xl:after:block
                        `
                        : ""
                    }
                  `}
                >
                  <MissionCard entry={entry} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
