jest.mock("next/server", () => ({
  NextResponse: {
    redirect: jest.fn((url: URL) => ({
      status: 307,
      headers: {
        get: (name: string) =>
          name.toLowerCase() === "location" ? url.toString() : null,
      },
    })),
  },
}));

import { proxy, config } from "@/proxy";

interface MockRequest {
  url: string;
}

describe("proxy", () => {
  test("should redirect the request to /en", () => {
    const request: MockRequest = {
      url: "http://localhost:3000/",
    };

    const response = proxy(request as Parameters<typeof proxy>[0]);

    expect(response.headers.get("location")).toBe("http://localhost:3000/en");
  });

  test("should return a redirect response with status 307", () => {
    const request: MockRequest = {
      url: "http://localhost:3000/",
    };

    const response = proxy(request as Parameters<typeof proxy>[0]);

    expect(response.status).toBe(307);
  });

  test("should match only the root route", () => {
    expect(config.matcher).toBe("/");
  });
});
