import { assert } from "./utils.js"
import BandItJS from "../src/index.js"

describe("Export modules", () => {
  it("We should export all modules available in this package", () => {
    assert("BandItChordSheetParser" in BandItJS)
    assert("BandItChordProParser" in BandItJS)
    assert("BandItChordSheetFormatter" in BandItJS)
    assert("BandItChordProFormatter" in BandItJS)
    assert("BandItSong" in BandItJS)
    assert("BandItSection" in BandItJS)
    assert("parseChordSheet" in BandItJS)
    assert("parseChordPro" in BandItJS)
    assert("dumpSongToChordPro" in BandItJS)
    assert("dumpSongToChordSheet" in BandItJS)
    assert("validator" in BandItJS)
  })
})
