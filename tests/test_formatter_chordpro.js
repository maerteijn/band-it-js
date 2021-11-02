import { assert } from "./utils.js"

import { BandItChordProFormatter } from "../src/formatter/index.js"
import { parseChordPro } from "../src/utils.js"

import * as fixtures from "./fixtures.js"

describe("tChordProFormatter", () => {
  it("The chordsheet formatter works as expected", () => {
    const song = parseChordPro(fixtures.extended_chordpro)
    const formatter = new BandItChordProFormatter()
    const chordpro = formatter.format(song)

    assert.include(chordpro, "{start_of_verse: Intro}")
  })
})
