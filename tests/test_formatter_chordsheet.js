import { assert } from "chai"

import { BandItChordSheetFormatter } from "../src/formatter"
import { parseChordPro } from "../src/utils"

import * as fixtures from "./fixtures"

describe("ChordSheetFormatter", () => {
  it("The chordsheet formatter handles headers correctly", () => {
    const song = parseChordPro(fixtures.extended_chordpro)
    const formatter = new BandItChordSheetFormatter()
    const chordsheet = formatter.format(song)
    console.log(chordsheet)

    assert.include(chordsheet, "[Intro]")
    assert.include(chordsheet, "[Verse 1]")
  })

  it("We can also output grid sections to a chordsheet", () => {
    const song = parseChordPro(fixtures.grid_chordpro)
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
