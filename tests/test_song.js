import { assert } from "./utils.js"

import ChordSheetJS from "chordsheetjs"

import { BandItChordSheetParser } from "../src/parser/index.js"
import { BandItSong } from "../src/song.js"
import { BandItSection } from "../src/section.js"

import * as fixtures from "./fixtures.js"

describe("BandIt Song class", () => {
  it("A BandItSong can take a ChordsheetJS song as constructor parameter", () => {
    const song = new ChordSheetJS.Song({ title: "My Song" })
    const bandItSong = new BandItSong(song)
    // now the bandItSong metadata should be the same
    assert.equal(song.metadata.title, bandItSong.metadata.title)
  })

  it("But it should not fail when not doing so", () => {
    const song = new BandItSong()
    assert.isTrue(song instanceof BandItSong)
  })
})

describe("BandIt Song sections", () => {
  it("Sections are BandItSection objects", () => {
    const parser = new BandItChordSheetParser()
    const song = parser.parse(fixtures.extended_chordsheet)
    assert.isTrue(song.sections[0] instanceof BandItSection)
  })

  it("A BandItSong creates sections for each part of the song when initiated", () => {
    const parser = new BandItChordSheetParser()
    const song = parser.parse(fixtures.extended_chordsheet)

    assert.equal(song.sections.length, 3)
    assert.equal(song.sections[0].title, "Intro")
    assert.equal(song.sections[0].type, "verse")
    assert.equal(song.sections[1].title, "Verse 1")
    assert.equal(song.sections[1].type, "verse")
    assert.equal(song.sections[2].title, "Chorus 1")
    assert.equal(song.sections[2].type, "chorus")
  })
})
