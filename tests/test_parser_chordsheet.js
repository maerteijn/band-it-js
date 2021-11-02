import { assert } from "./utils.js"

import ChordSheetJS from "chordsheetjs"

import { BandItChordSheetParser } from "../src/parser/chordsheet.js"
import { BandItSong } from "../src/song.js"

import * as fixtures from "./fixtures.js"

describe("BandItChordSheetParser - simple", () => {
  const parser = new BandItChordSheetParser()
  const song = parser.parse(fixtures.simple_chordsheet)

  it("The BandItChordSheetParser should return a BandItSong", () => {
    assert.isTrue(song instanceof BandItSong)
  })

  it("The chordsheet has no sections so no lines", () => {
    assert.equal(song.sections.length, 0)
    assert.equal(song.lines.length, 0)
  })
})

describe("BandItChordSheetParser - extended", () => {
  const parser = new BandItChordSheetParser()
  const song = parser.parse(fixtures.extended_chordsheet)

  it("The parsed chordsheet has metadata", () => {
    assert.equal(song.metadata.title, "Hello")
    assert.equal(song.metadata.artist, "Lionel Richie")
    assert.equal(song.metadata.tempo, "63")
  })

  it("The parsed chordsheet has a verse", () => {
    const start_tag = song.lines[8].items[0]
    assert.isTrue(start_tag instanceof ChordSheetJS.Tag)
    assert.equal(start_tag.name, "start_of_verse")
    assert.equal(start_tag.value, "Verse 1")

    const end_tag = song.lines[11].items[0]
    assert.isTrue(end_tag instanceof ChordSheetJS.Tag)
    assert.equal(end_tag.name, "end_of_verse")
    assert.equal(end_tag.value, "Verse 1")
  })

  it("The parsed chordsheet has lyrics and chords", () => {
    const knownLine = song.lines[9]
    assert.equal(knownLine.items[0].chords, "")
    assert.equal(knownLine.items[0].lyrics, "I've ")
    assert.equal(knownLine.items[1].chords, "Amadd9")
    assert.equal(knownLine.items[1].lyrics, "been alone with ")
  })
})
