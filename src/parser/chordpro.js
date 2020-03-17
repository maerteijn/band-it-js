import ChordSheetJS from "chordsheetjs"
import { BandItSong } from "../song"
import { handleGridLine } from "./gridline"
import {
  GRID,
  CONTROL_CHARS,
  START_OF_GRID,
  END_OF_GRID,
  SECTION,
  START_OF_SECTION,
  END_OF_SECTION
} from "./constants"

export class BandItChordProParser extends ChordSheetJS.ChordProParser {
  parse(data) {
    const song = super.parse(data)
    return new BandItSong(song)
  }

  isGridLine(line) {
    return this.sectionType == GRID && !CONTROL_CHARS.includes(line[0])
  }

  readGridLine(line) {
    this.song.currentLine.type = GRID
    handleGridLine(line, this.song.currentLine)
    this.song.addLine()
  }

  parseDocument(document) {
    for (const line of document.split("\n")) {
      // A gridline with contents should be handled differently as the
      // rest. Make sure the {end_of_grid} tag is processed normally
      if (this.isGridLine(line)) {
        this.readGridLine(line)
      } else {
        super.parseDocument(line + "\n")
      }
    }
  }

  applyTag(tag) {
    // We override this so we can support sections and grids
    switch (tag.name) {
      case START_OF_GRID:
        this.startSection(GRID, tag)
        break
      case END_OF_GRID:
        this.endSection(GRID, tag)
        break
      case START_OF_SECTION:
        this.startSection(SECTION, tag)
        break
      case END_OF_SECTION:
        this.endSection(SECTION, tag)
        break
      default:
        super.applyTag(tag)
    }
  }
}
