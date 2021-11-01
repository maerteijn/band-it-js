import ChordSheetJS from "chordsheetjs"
import { GRID } from "../constants.js"

export class BandItChordProFormatter extends ChordSheetJS.ChordProFormatter {
  constructor(...args) {
    super(...args)
    this.currentLineType = null
  }

  formatLine(line) {
    this.currentLineType = line.type
    return super.formatLine(line)
  }

  formatChordLyricsPairChords(chordLyricsPair) {
    if (this.currentLineType == GRID) {
      return chordLyricsPair.chords
    }
    return super.formatChordLyricsPairChords(chordLyricsPair)
  }
}
