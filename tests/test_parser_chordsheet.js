import { assert } from "./utils.js"

import ChordSheetJS from "chordsheetjs"

import { BandItChordSheetParser } from "../src/parser/chordsheet.js"
import { BandItSong } from "../src/song.js"
import { GRID } from "../src/constants.js"
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

describe("BandItChordSheetParser - grid", () => {
  const parser = new BandItChordSheetParser()
  const song = parser.parse(fixtures.grid_chordsheet)

  it("The Chordsheet parser also parses grid lines", () => {
    const gridLine = song.lines[2]
    assert.equal(gridLine.type, "grid")
    // each line cahracter / chord is stored in an own item
    assert.equal(gridLine.items.length, 21)
    assert.equal(gridLine.items[0].lyrics, "|  ")
    assert.equal(gridLine.items[0].chords, "")
    assert.equal(gridLine.items[1].lyrics, "")
    assert.equal(gridLine.items[1].chords, "E ")
  })

  it("The Chordsheet parser creates a section for a grid", () => {
    assert.equal(song.sections.length, 1)
    assert.equal(song.sections[0].type, GRID)
  })

  it("Gridlines with lyrics only are also supported", () => {
    const gridLine = song.lines[3]
    assert.equal(gridLine.type, "grid")
    assert.equal(gridLine.items.length, 21)
    assert.equal(gridLine.items[4].lyrics, "Yeah ")
    assert.equal(gridLine.items[12].lyrics, "yeah ")
  })
})
