import { render, screen } from "@testing-library/react";
import { ProfilePage } from "@/features/profile/ProfilePage";

jest.mock("@/shared/components/layout/site-layout/View", () => ({
  SiteLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="site-layout">{children}</div>
  ),
}));

jest.mock("@/features/profile/views/View", () => ({
  View: () => <div data-testid="profile-view" />,
}));

describe("ProfilePage", () => {
  it("should render the SiteLayout component", () => {
    render(<ProfilePage />);

    expect(screen.getByTestId("site-layout")).toBeInTheDocument();
  });

  it("should render the Profile View component", () => {
    render(<ProfilePage />);

    expect(screen.getByTestId("profile-view")).toBeInTheDocument();
  });

  it("should render the Profile View inside the SiteLayout", () => {
    render(<ProfilePage />);

    const siteLayout = screen.getByTestId("site-layout");
    const profileView = screen.getByTestId("profile-view");

    expect(siteLayout).toContainElement(profileView);
  });
});
