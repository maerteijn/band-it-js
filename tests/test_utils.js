import { assert } from "./utils.js"

import { BandItSong } from "../src/song.js"
import {
  parseChordSheet,
  parseChordPro,
  dumpSongToChordSheet,
  dumpSongToChordPro
} from "../src/utils.js"

import * as fixtures from "./fixtures.js"

describe("parseChordPro", () => {
  it("Parsing a chordpro sheet should return a song", () => {
    const song = parseChordPro(fixtures.simple_chordpro)
    assert.instanceOf(song, BandItSong)
  })
})

describe("dumpSongToChordPro", () => {
  it("A parsed chordpro song can be converted back a chordpro sheet", () => {
    const song = parseChordPro(fixtures.extended_chordpro)
    const chordpro = "\n" + dumpSongToChordPro(song)

    // it should actually be the same as the chordpro we started with
    assert.equal(chordpro, fixtures.extended_chordpro + "\n")
  })
})

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
