import { assert } from "./utils.js"

import ChordSheetJS from "chordsheetjs"
import { INDETERMINATE } from "chordsheetjs"

import { BandItSection } from "../src/section.js"
import { GRID } from "../src/constants.js"

describe("BandIt Section class", () => {
  it("A BandItSection takes title, type and a length property as constructor parameters", () => {
    const section = new BandItSection("Section")
    assert.equal(section.title, "Section")
    assert.equal(section.type, INDETERMINATE)
    assert.equal(section.max_items, 0)
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
    line.type = GRID
    section.addLine(line)

    assert.equal(section.lines[0], line)
    assert.equal(section.lines.length, 1)
    assert.equal(section.type, GRID)
  })

  it("The max_items property is updated correctly", () => {
    const section = new BandItSection("Section")

    let line = new ChordSheetJS.Line()
    line.addChordLyricsPair("A#", "")
    section.addLine(line)

    line = new ChordSheetJS.Line()
    line.addChordLyricsPair("A#", "")
    line.addChordLyricsPair("Cm", "")
    line.addChordLyricsPair("E", "")
    section.addLine(line)

    // so one line has 1 item, the other one has three, so max_items
    // should be three
    assert.equal(section.lines.length, 2)
    assert.equal(section.max_items, 3)
  })
})
