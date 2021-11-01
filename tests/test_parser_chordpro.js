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

  it("The parsed chordpro has metadata and a verse", () => {
    assert.equal(song.getMetaData("title"), "Hello")
    assert.equal(song.getMetaData("artist"), "Lionel Richie")
    assert.equal(song.getMetaData("tempo"), "63")

    const start_tag = song.lines[9].items[0]
    assert.isTrue(start_tag instanceof ChordSheetJS.Tag)
    assert.equal(start_tag.name, "start_of_verse")
    assert.equal(start_tag.value, "Verse 1")

    const end_tag = song.lines[12].items[0]
    assert.isTrue(end_tag instanceof ChordSheetJS.Tag)
    assert.equal(end_tag.name, "end_of_verse")
    assert.equal(end_tag.value, "Verse 1")
  })

  it("The parsed chordpro has lyrics and chords", () => {
    const knownLine = song.lines[10]
    assert.equal(knownLine.items[0].chords, "")
    assert.equal(knownLine.items[0].lyrics, "I've ")
    assert.equal(knownLine.items[1].chords, "Amadd9")
    assert.equal(knownLine.items[1].lyrics, "been alone with ")
  })

  it("The parsed chordpro has a custom section tag", () => {
    const start_tag = song.lines[5].items[0]
    assert.isTrue(start_tag instanceof ChordSheetJS.Tag)
    assert.equal(start_tag.name, "x_start_of_section")
    assert.equal(start_tag.value, "Intro")

    const end_tag = song.lines[7].items[0]
    assert.isTrue(end_tag instanceof ChordSheetJS.Tag)
    assert.equal(end_tag.name, "x_end_of_section")
    assert.equal(end_tag.value, "Intro")
  })
})

describe("BandItChordProParser - grid", () => {
  const parser = new BandItChordProParser()
  const song = parser.parse(fixtures.grid_chordpro)

  it("The Chordpro parser also parses grid tags", () => {
    const start_tag = song.lines[3].items[0]
    assert.isTrue(start_tag instanceof ChordSheetJS.Tag)
    assert.equal(start_tag.name, "start_of_grid")
    assert.equal(start_tag.value, "Interlude")

    const end_tag = song.lines[7].items[0]
    assert.isTrue(end_tag instanceof ChordSheetJS.Tag)
    assert.equal(end_tag.name, "end_of_grid")
    assert.equal(end_tag.value, "Interlude")
  })

  it("The Chordpro parser also parses grid lines", () => {
    const gridLine = song.lines[4]
    assert.equal(gridLine.type, "grid")
    // each line cahracter / chord is stored in an own item
    assert.equal(gridLine.items.length, 21)
    assert.equal(gridLine.items[0].lyrics, "|  ")
    assert.equal(gridLine.items[0].chords, "")
    assert.equal(gridLine.items[1].lyrics, "")
    assert.equal(gridLine.items[1].chords, "E ")
  })

  it("Gridlines with lyrics only are also supported", () => {
    const gridLine = song.lines[5]
    assert.equal(gridLine.type, "grid")
    assert.equal(gridLine.items.length, 21)
    assert.equal(gridLine.items[4].lyrics, "Yeah ")
    assert.equal(gridLine.items[12].lyrics, "yeah ")
  })
})

// // TODO add test for a refering chorus
