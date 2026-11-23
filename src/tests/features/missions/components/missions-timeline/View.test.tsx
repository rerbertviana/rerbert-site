import { render, screen } from "@testing-library/react";

import type { TimelineEntry } from "@/features/missions/types/timeline";

import { View } from "@/features/missions/components/missions-timeline/View";

jest.mock("@/features/missions/components/mission-card/View", () => ({
  View: ({ entry }: { entry: TimelineEntry }) => (
    <div data-testid="mission-card" data-entry-id={entry.id}>
      {entry.id}
    </div>
  ),
}));

function createEntry(id: string): TimelineEntry {
  return {
    id,
    type: "project",
    data: {} as TimelineEntry["data"],
    sortDate: null,
    isInProgress: false,
  } as TimelineEntry;
}

describe("Missions Timeline View", () => {
  it("should render nothing when entries are empty", () => {
    const { container } = render(<View entries={[]} />);

    expect(container.firstChild).toBeNull();
  });
  it("should render all mission cards", () => {
    const entries = [
      createEntry("mission-1"),
      createEntry("mission-2"),
      createEntry("mission-3"),
    ];

    render(<View entries={entries} />);

    const cards = screen.getAllByTestId("mission-card");

    expect(cards).toHaveLength(3);

    entries.forEach((entry) => {
      expect(screen.getByText(entry.id)).toBeInTheDocument();
    });
  });

  it("should preserve the order of entries", () => {
    const entries = [
      createEntry("mission-1"),
      createEntry("mission-2"),
      createEntry("mission-3"),
      createEntry("mission-4"),
    ];

    render(<View entries={entries} />);

    const cards = screen.getAllByTestId("mission-card");

    expect(cards.map((card) => card.dataset.entryId)).toEqual([
      "mission-1",
      "mission-2",
      "mission-3",
      "mission-4",
    ]);
  });

  it("should group four cards into a single row", () => {
    const entries = Array.from({ length: 4 }, (_, index) =>
      createEntry(`mission-${index + 1}`),
    );

    const { container } = render(<View entries={entries} />);

    const rows = container.querySelectorAll(".grid");

    expect(rows).toHaveLength(1);
    expect(rows[0].children).toHaveLength(4);
  });

  it("should create a new row when there are more than four entries", () => {
    const entries = Array.from({ length: 5 }, (_, index) =>
      createEntry(`mission-${index + 1}`),
    );

    const { container } = render(<View entries={entries} />);

    const rows = container.querySelectorAll(".grid");

    expect(rows).toHaveLength(2);
    expect(rows[0].children).toHaveLength(4);
    expect(rows[1].children).toHaveLength(1);
  });

  it("should group eight entries into two rows of four", () => {
    const entries = Array.from({ length: 8 }, (_, index) =>
      createEntry(`mission-${index + 1}`),
    );

    const { container } = render(<View entries={entries} />);

    const rows = container.querySelectorAll(".grid");

    expect(rows).toHaveLength(2);
    expect(rows[0].children).toHaveLength(4);
    expect(rows[1].children).toHaveLength(4);
  });

  it("should render the cards in the correct row grouping", () => {
    const entries = Array.from({ length: 6 }, (_, index) =>
      createEntry(`mission-${index + 1}`),
    );

    const { container } = render(<View entries={entries} />);

    const rows = container.querySelectorAll(".grid");

    const firstRowIds = Array.from(rows[0].children).map((container) =>
      container.querySelector("[data-entry-id]")?.getAttribute("data-entry-id"),
    );

    const secondRowIds = Array.from(rows[1].children).map((container) =>
      container.querySelector("[data-entry-id]")?.getAttribute("data-entry-id"),
    );

    expect(firstRowIds).toEqual([
      "mission-1",
      "mission-2",
      "mission-3",
      "mission-4",
    ]);

    expect(secondRowIds).toEqual(["mission-5", "mission-6"]);
  });
});
