import { assert } from "./utils.js"
import ChordSheetJS from "chordsheetjs"

import { BandItChordProParser } from "../src/parser/chordpro.js"
import { BandItSong } from "../src/song.js"

import * as fixtures from "./fixtures.js"

describe("BandItChordProParser - simple", () => {
  const parser = new BandItChordProParser()
  const song = parser.parse(fixtures.simple_chordpro)

  it("The BandItChordProParser should return a BandItSong", () => {
    assert.isTrue(song instanceof BandItSong)
  })

  it("The chordpro has no sections, so the song has no sections", () => {
    assert.equal(song.sections.length, 0)
  })
})

describe("BandItChordProParser - extended", () => {
  const parser = new BandItChordProParser()
  const song = parser.parse(fixtures.extended_chordpro)

  it("The parsed chordpro has metadata", () => {
    assert.equal(song.metadata.title, "Hello")
    assert.equal(song.metadata.artist, "Lionel Richie")
    assert.equal(song.metadata.tempo, "63")
  })

  it("The parsed chordpro has a verse", () => {
    const start_tag = song.lines[10].items[0]
    assert.isTrue(start_tag instanceof ChordSheetJS.Tag)
    assert.equal(start_tag.name, "start_of_verse")
    assert.equal(start_tag.value, "Verse 1")

    const end_tag = song.lines[13].items[0]
    assert.isTrue(end_tag instanceof ChordSheetJS.Tag)
    assert.equal(end_tag.name, "end_of_verse")
    assert.equal(end_tag.value, "Verse 1")
  })

  it("The parsed chordpro has lyrics and chords", () => {
    const knownLine = song.lines[11]
    assert.equal(knownLine.items[0].chords, "")
    assert.equal(knownLine.items[0].lyrics, "I've ")
    assert.equal(knownLine.items[1].chords, "Amadd9")
    assert.equal(knownLine.items[1].lyrics, "been alone with ")
  })
})
