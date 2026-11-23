import { act, renderHook } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";

import { LanguageProvider, useLanguage } from "@/shared/i18n/LanguageProvider";

import { getDictionary } from "@/shared/i18n/get-dictionary";

import type { Locale } from "@/shared/i18n/config";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

const mockUsePathname = usePathname as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

const mockPush = jest.fn();

describe("LanguageProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUsePathname.mockReturnValue("/en/profile");

    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  function renderLanguageProvider(locale: Locale) {
    return renderHook(() => useLanguage(), {
      wrapper: ({ children }) => (
        <LanguageProvider locale={locale} dictionary={getDictionary(locale)}>
          {children}
        </LanguageProvider>
      ),
    });
  }

  it("should provide the current locale and dictionary", () => {
    const { result } = renderLanguageProvider("en");

    expect(result.current.locale).toBe("en");
    expect(result.current.dictionary).toBe(getDictionary("en"));
  });

  it("should provide the English resume URL", () => {
    const { result } = renderLanguageProvider("en");

    expect(result.current.resumeUrl).toBe("/resume/rerbert-cv-english.pdf");
  });

  it("should provide the Brazilian Portuguese resume URL", () => {
    const { result } = renderLanguageProvider("pt-BR");

    expect(result.current.resumeUrl).toBe("/resume/rerbert-cv.pdf");
  });

  it("should navigate to the requested locale", () => {
    const { result } = renderLanguageProvider("en");

    act(() => {
      result.current.changeLanguage("pt-BR");
    });

    expect(mockPush).toHaveBeenCalledWith("/pt-BR/profile");
  });

  it("should preserve the query string and hash when changing language", () => {
    window.history.pushState({}, "", "/en/profile?tab=skills#section");

    mockUsePathname.mockReturnValue("/en/profile");

    const { result } = renderLanguageProvider("en");

    act(() => {
      result.current.changeLanguage("pt-BR");
    });

    expect(mockPush).toHaveBeenCalledWith("/pt-BR/profile?tab=skills#section");
  });

  it("should not navigate when the requested locale is already active", () => {
    const { result } = renderLanguageProvider("en");

    act(() => {
      result.current.changeLanguage("en");
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should throw an error when useLanguage is used outside the provider", () => {
    expect(() => renderHook(() => useLanguage())).toThrow(
      "useLanguage must be used within a LanguageProvider",
    );
  });
});
