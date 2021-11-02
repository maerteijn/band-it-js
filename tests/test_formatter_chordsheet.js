import { assert } from "./utils.js"

import { BandItChordSheetFormatter } from "../src/formatter/index.js"
import { parseChordPro } from "../src/utils.js"

import * as fixtures from "./fixtures.js"

describe("ChordSheetFormatter", () => {
  it("The chordsheet formatter handles headers correctly", () => {
    const song = parseChordPro(fixtures.extended_chordpro)
    const formatter = new BandItChordSheetFormatter()
    const chordsheet = formatter.format(song)
    assert.include(chordsheet, "[Intro]")
    assert.include(chordsheet, "[Verse 1]")
  })
})
