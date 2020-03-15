import ChordSheetJS from "chordsheetjs"
import { assert } from "chai"

import {
  parseChordSheet,
  parseChordPro,
  dumpSongToChordPro
} from "../src/utils"
import * as fixtures from "./fixtures"

describe("parseChordSheet", () => {
  it("Parsing a chordsheet should return a song", () => {
    const song = parseChordSheet(fixtures.simple_chordsheet)
    assert.instanceOf(song, ChordSheetJS.Song)
  })
})

describe("parseChordPro", () => {
  it("Parsing a chordpro sheet should return a song", () => {
    const song = parseChordPro(fixtures.simple_chordpro)
    assert.instanceOf(song, ChordSheetJS.Song)
  })
})

describe("dumpSongToChordPro", () => {
  it("A parsed chordpro song can be converted back a chordpro sheet", () => {
    const song = parseChordPro(fixtures.simple_chordpro)
    const chordpro = "\n" + dumpSongToChordPro(song)

    // it should actually be the same as the chordpro we started with
    assert.equal(chordpro, fixtures.simple_chordpro)
  })
  it("And a chordsheet file as well", () => {
    const song = parseChordSheet(fixtures.extended_chordsheet)
    const chordpro = dumpSongToChordPro(song)

    // it should actually be the same as the chordpro we started with
    assert.include(chordpro, "{artist: Lionel Richie}")
    assert.include(
      chordpro,
      "I've [Amadd9]been alone with [Cmaj7/G]you inside my [Fmaj7]mind[Am7/G][Fmaj7]"
    )
  })
  it("We can also output grid sections", () => {
    const song = parseChordSheet(fixtures.grid_chordsheet)
    const chordpro = dumpSongToChordPro(song)

    assert.include(chordpro, "{start_of_grid: Interlude}")
    assert.include(chordpro, "| E . . B | . . . . | . C#m . G#m | . A . . |")
    assert.include(chordpro, "        Yeah            yeah  yeah")
    assert.include(chordpro, "| E . . B | . . . . | . C#m . A   | . . . . |")
    assert.include(chordpro, "{end_of_grid: Interlude}")
  })
})
