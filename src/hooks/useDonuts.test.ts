import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import { apiRoot } from "../config";
import { useDonuts } from "./useDonuts";

const donutsMock = [
  { id: "1", name: "Glazed", price: 1.5, imageUrl: "url1" },
  { id: "2", name: "Chocolate", price: 2.0, imageUrl: "url2" },
];

describe("useDonuts hook", () => {
  it("initial state: loading true, empty donuts, no error", () => {
    const { result } = renderHook(() => useDonuts());

    expect(result.current.loading).toBe(true);
    expect(result.current.donuts).toEqual([]);
    expect(result.current.error).toBe(false);
  });

  it("fetchDonuts loads donuts and sets loading false", async () => {
    server.use(
      http.get(`${apiRoot}/donuts`, () => {
        return HttpResponse.json(donutsMock, {
          status: 202,
        });
      })
    );

    const { result } = renderHook(() => useDonuts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(false);
      expect(result.current.donuts).toHaveLength(donutsMock.length);
      // Because of shuffle, we check that all donut ids exist
      expect(result.current.donuts.map((d) => d.id).sort()).toEqual(
        donutsMock.map((d) => d.id).sort()
      );
    });
  });

  it("handles fetch error sets error flag and loading false", async () => {
    server.use(
      http.get(`${apiRoot}/donuts`, () => {
        return HttpResponse.json({
          status: 500,
        });
      })
    );

    const { result } = renderHook(() => useDonuts());

    await waitFor(() => {
      expect(result.current.error).toBe(true);
      expect(result.current.loading).toBe(false);
      expect(result.current.donuts).toEqual([]);
    });
  });

  it("handleChomp updates chompedIds and sessionStorage", async () => {
    server.use(
      http.get(`${apiRoot}/donuts`, () => {
        return HttpResponse.json(donutsMock, {
          status: 202,
        });
      })
    );

    const { result } = renderHook(() => useDonuts());
    await waitFor(() => {
      act(() => {
        result.current.handleChomp("1");
      });

      expect(result.current.chompedIds["1"]).toBe(true);
      expect(JSON.parse(sessionStorage.getItem("chompedIds")!)).toEqual({
        "1": true,
      });
    });
  });

  it("handleReset clears chompedIds and sessionStorage", async () => {
    server.use(
      http.get(`${apiRoot}/donuts`, () => {
        return HttpResponse.json(donutsMock, {
          status: 202,
        });
      })
    );

    const { result } = renderHook(() => useDonuts());
    await waitFor(() => {
      act(() => {
        result.current.handleChomp("1");
      });

      act(() => {
        result.current.handleReset();
      });

      expect(result.current.chompedIds).toEqual({});
    });
  });

  it("fetchDonuts can be manually triggered", async () => {
    server.use(
      http.get(`${apiRoot}/donuts`, () => {
        return HttpResponse.json(donutsMock, {
          status: 202,
        });
      })
    );

    const { result } = renderHook(() => useDonuts());

    await waitFor(() => {
      server.use(
        http.get(`${apiRoot}/donuts`, () => {
          return HttpResponse.json([], {
            status: 202,
          });
        })
      );

      act(() => {
        result.current.fetchDonuts();
      });
    });

    await waitFor(() => {
      expect(result.current.donuts).toEqual([]);
    });
  });
});
