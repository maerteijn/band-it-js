import { assert } from "./utils.js"

import { BandItSong } from "../src/song.js"
import { parseChordSheet, dumpSongToChordSheet } from "../src/utils.js"

import * as fixtures from "./fixtures.js"

describe("parseChordSheet", () => {
  it("Parsing a chordsheet should return a song", () => {
    const song = parseChordSheet(fixtures.simple_chordsheet)
    assert.instanceOf(song, BandItSong)
  })
})

describe("dumpSongToChordSheet", () => {
  it("A parsed chordsheet song can be converted back a chordsheet", () => {
    const song = parseChordSheet(fixtures.extended_chordsheet)
    const chordsheet = "\n" + dumpSongToChordSheet(song)

    // it should actually be the same as the chordsheet we started with
    assert.equal(chordsheet, fixtures.extended_chordsheet)
  })
})
