import { assert } from "chai"

import { BandItChordProFormatter } from "../src/formatter"
import { parseChordSheet } from "../src/utils"

import * as fixtures from "./fixtures"

describe("tChordProFormatter", () => {
  it("The chordsheet formatter can output grid sections", () => {
    const song = parseChordSheet(fixtures.grid_chordsheet)
    const formatter = new BandItChordProFormatter()
    const chordpro = formatter.format(song)

    assert.include(chordpro, "{start_of_grid: Interlude}")
    assert.include(
      chordpro,
      "|  E . . B    | . . . . | . C#m  . G#m  | . A . . |"
    )
    assert.include(
      chordpro,
      "|| . . . Yeah | . . . . | . yeah . yeah | . . . . |"
    )
    assert.include(
      chordpro,
      "|  E . . B    | . . . . | . C#m  . A    | . . . . |"
    )
    assert.include(chordpro, "{end_of_grid: Interlude}")
  })
})
