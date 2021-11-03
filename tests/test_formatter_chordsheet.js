import { assert } from "./utils.js"

import { BandItChordSheetFormatter } from "../src/formatter/index.js"
import { parseChordSheet } from "../src/utils.js"

import * as fixtures from "./fixtures.js"

describe("ChordSheetFormatter", () => {
  it("The chordsheet formatter handles headers correctly", () => {
    const song = parseChordSheet(fixtures.extended_chordsheet)
    const formatter = new BandItChordSheetFormatter()
    const chordsheet = formatter.format(song)
    assert.include(chordsheet, "[Intro]")
    assert.include(chordsheet, "[Verse 1]")
  })

  it("We can also output grid sections to a chordsheet", () => {
    const song = parseChordSheet(fixtures.grid_chordsheet)
    const formatter = new BandItChordSheetFormatter()
    const chordsheet = formatter.format(song)

    assert.include(chordsheet, "[Grid Interlude]")
    assert.include(
      chordsheet,
      "|  E . . B    | . . . . | . C#m  . G#m  | . A . . |"
    )
    assert.include(
      chordsheet,
      "|| . . . Yeah | . . . . | . yeah . yeah | . . . . |"
    )
    assert.include(
      chordsheet,
      "|  E . . B    | . . . . | . C#m  . A    | . . . . |"
    )
  })
})
