import { renderHook } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import { useHomeHelper } from "../../../src/pages/home/HomeHelper";
import { TopSongResponse } from "../../../src/pages/home/response/TopSongResponse";

vi.mock('../../src/config/AxiosHttp'); 

describe('useHomeHelper', () => {
  // it('Should fetch top songs', () => {
  //   const { result } = renderHook(() => useHomeHelper());
  //   const mockResponse: TopSongResponse[] = [
  //     { artistName: "artist1", name: "song1", numberOfListenning: 2 },
  //     { artistName: "artist2", name: "song2", numberOfListenning: 1 },
  //     { artistName: "artist3", name: "song3", numberOfListenning: 8 },
  //   ];
  

  //   vi.mock("axios", async () => {
  //     const actual = await vi.importActual("axios")
  //     return {
  //       actual,
  //       create: vi.fn(() => ({
  //         get: vi.fn(() => Promise.resolve({ data: mockResponse })),
  //       })),
  //     }
  //   });
    

  //   expect(result.current.topSongs).toEqual([]);
  // })
})