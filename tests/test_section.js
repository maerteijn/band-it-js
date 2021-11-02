import { assert } from "./utils.js"

import ChordSheetJS from "chordsheetjs"
import { INDETERMINATE } from "chordsheetjs"

import { BandItSection } from "../src/section.js"

describe("BandIt Section class", () => {
  it("A BandItSection takes title, type and a length property as constructor parameters", () => {
    const section = new BandItSection("Section")
    assert.equal(section.title, "Section")
    assert.equal(section.type, INDETERMINATE)
  })

  it("A BandItSection has a lines property", () => {
    // no lines are there, but the property should exist
    const section = new BandItSection("Section")
    assert.isArray(section.lines)
    assert.equal(section.lines.length, 0)
  })

  it("We can add a line with a type to the section", () => {
    const section = new BandItSection("Section")
    const line = new ChordSheetJS.Line()

    line.addChordLyricsPair("A#", "")
    line.type = "verse"
    section.addLine(line)

    assert.equal(section.lines[0], line)
    assert.equal(section.lines.length, 1)
    assert.equal(section.type, "verse")
  })
})
