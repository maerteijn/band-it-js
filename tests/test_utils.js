import { assert } from "chai"

import { BandItSong } from "../src/song"
import {
  parseChordSheet,
  parseChordPro,
  dumpSongToChordSheet,
  dumpSongToChordPro
} from "../src/utils"
import * as fixtures from "./fixtures"

describe("parseChordSheet", () => {
  it("Parsing a chordsheet should return a song", () => {
    const song = parseChordSheet(fixtures.simple_chordsheet)
    assert.instanceOf(song, BandItSong)
  })
})

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

describe("dumpSongToChordSheet", () => {
  it("A parsed chordpro song can be converted to a chordsheet", () => {
    const song = parseChordPro(fixtures.extended_chordpro)
    const chordsheet = dumpSongToChordSheet(song)

    assert.include(chordsheet, "Hello - Lionel Richie")
    assert.notInclude(chordsheet, "Hello - Lionel Richie}")
    assert.include(chordsheet, "Tempo: 63")
    assert.include(chordsheet, "[Intro]")
    assert.include(chordsheet, "Amadd9 Cmaj7/G Fmaj7 Am7/G Fmaj7")
    assert.include(chordsheet, "[Verse 1]")
    assert.include(
      chordsheet,
      "     Amadd9          Cmaj7/G       Fmaj7 Am7/G Fmaj7"
    )
    assert.include(chordsheet, "I've been alone with you inside my mind")
  })

  it("And a parsed chordsheet file as well", () => {
    const song = parseChordSheet(fixtures.extended_chordsheet)
    const chordsheet = dumpSongToChordSheet(song)

    assert.include(chordsheet, "[Chorus 1]")
    assert.include(chordsheet, "      Dm             G")
    assert.include(chordsheet, "I can see it in your eyes,")
    assert.include(chordsheet, "      C              F")
    assert.include(chordsheet, "I can see it in your smile")
  })
  it("We can also output grid sections to a chordsheet", () => {
    const song = parseChordSheet(fixtures.grid_chordsheet)
    const chordsheet = dumpSongToChordSheet(song)

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
