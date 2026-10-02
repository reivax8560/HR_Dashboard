import { afterEach, describe, expect, test, vi } from "vitest";
import apiRequest from "./apiRequest";

describe("apiRequest", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("retourne le JSON d'une réponse réussie", async () => {
    const payload = [{ id: 1, name: "Informatique" }];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(apiRequest("/api/services")).resolves.toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith("/api/services", undefined);
  });

  test("affiche le message métier renvoyé par l'API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 409,
        statusText: "Conflict",
        json: vi.fn().mockResolvedValue({
          error: "Cette absence chevauche une absence existante.",
        }),
      }),
    );

    await expect(
      apiRequest("/api/absences", { method: "POST" }),
    ).rejects.toThrow("Cette absence chevauche une absence existante.");
  });
});
