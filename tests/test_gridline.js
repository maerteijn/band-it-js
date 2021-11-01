import { assert } from "./utils.js"
import ChordSheetJS from "chordsheetjs"
import { handleGridLine } from "../src/parser/gridline.js"

describe("handleGridLine", () => {
  const line = "| A . . . | B . . . |"

  it("The handleGridLine function parses a gridline correctly", () => {
    const gridLine = new ChordSheetJS.Line()
    handleGridLine(line, gridLine)

    assert.equal(gridLine.items.length, 11)
    assert.equal(gridLine.items[1].chords, "A ")
  })

  it("Empty lines will not choke the parser", () => {
    const gridLine = new ChordSheetJS.Line()
    handleGridLine("", gridLine)

    assert.equal(gridLine.items.length, 0)
  })
})
