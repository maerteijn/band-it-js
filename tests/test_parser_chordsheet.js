import { assert } from "chai"

import ChordSheetJS from "chordsheetjs"

import { BandItChordSheetParser } from "../src/parser/chordsheet"
import { BandItSong } from "../src/song"

import * as fixtures from "./fixtures"

describe("BandItChordSheetParser - simple", () => {
  const parser = new BandItChordSheetParser()
  const song = parser.parse(fixtures.simple_chordsheet)

  it("The BandItChordSheetParser should return a BandItSong", () => {
    assert.isTrue(song instanceof BandItSong)
  })

  it("The chordsheet has no sections, so the song has no items", () => {
    song.lines.forEach(line => {
      assert.isEmpty(line.items)
    })
  })
})

describe("BandItChordSheetParser - extended", () => {
  const parser = new BandItChordSheetParser()
  const song = parser.parse(fixtures.extended_chordsheet)

  it("The parsed chordsheet has metadata and a verse", () => {
    assert.equal(song.getMetaData("title"), "Hello")
    assert.equal(song.getMetaData("artist"), "Lionel Richie")
    assert.equal(song.getMetaData("tempo"), "63")
    const start_tag = song.lines[11].items[0]
    assert.isTrue(start_tag instanceof ChordSheetJS.Tag)
    assert.equal(start_tag.name, "start_of_verse")
    assert.equal(start_tag.value, "Verse 1")

    const end_tag = song.lines[13].items[0]
    assert.isTrue(end_tag instanceof ChordSheetJS.Tag)
    assert.equal(end_tag.name, "end_of_verse")
    assert.equal(end_tag.value, "Verse 1")
  })

  it("The parsed chordsheet has lyrics and chords", () => {
    const knownLine = song.lines[12]
    assert.equal(knownLine.items[0].chords, "")
    assert.equal(knownLine.items[0].lyrics, "I've ")
    assert.equal(knownLine.items[1].chords, "Amadd9")
    assert.equal(knownLine.items[1].lyrics, "been alone with ")
  })

  it("The parsed chordsheet has a custom section tag", () => {
    const song = parser.parse(fixtures.extended_chordsheet)

    const start_tag = song.lines[6].items[0]
    assert.isTrue(start_tag instanceof ChordSheetJS.Tag)
    assert.equal(start_tag.name, "x_start_of_section")
    assert.equal(start_tag.value, "Intro")

    const end_tag = song.lines[8].items[0]
    assert.isTrue(end_tag instanceof ChordSheetJS.Tag)
    assert.equal(end_tag.name, "x_end_of_section")
    assert.equal(end_tag.value, "Intro")
  })
})

describe("BandItChordSheetParser - grid", () => {
  const parser = new BandItChordSheetParser()
  const song = parser.parse(fixtures.grid_chordsheet)

  it("The Chordsheet parser also parses grid lines", () => {
    const gridLine = song.lines[5]
    assert.equal(gridLine.type, "grid")
    // each line cahracter / chord is stored in an own item
    assert.equal(gridLine.items.length, 21)
    assert.equal(gridLine.items[0].lyrics, "| ")
    assert.equal(gridLine.items[0].chords, "")
    assert.equal(gridLine.items[1].lyrics, "")
    assert.equal(gridLine.items[1].chords, "E ")
  })

  it("Gridlines with lyrics only are also supported", () => {
    const gridLine = song.lines[6]
    assert.equal(gridLine.type, "grid")
    assert.equal(gridLine.items.length, 1)
    assert.equal(gridLine.items[0].lyrics, "        Yeah            yeah  yeah")
  })
})

// TODO add test for a refering chorus
