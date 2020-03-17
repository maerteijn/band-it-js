import { assert } from "chai"
import BandItJS from "../src/index"

describe("Export modules", () => {
  it("We should export all modules available in this package", () => {
    assert("BandItChordSheetParser" in BandItJS)
    assert("BandItChordProParser" in BandItJS)
    assert("BandItChordProFormatter" in BandItJS)
    assert("BandItSong" in BandItJS)
    assert("parseChordSheet" in BandItJS)
    assert("parseChordPro" in BandItJS)
    assert("dumpSongToChordPro" in BandItJS)
    assert("validator" in BandItJS)
  })
})
