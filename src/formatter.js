import ChordSheetJS from "chordsheetjs"

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
    if (this.currentLineType == "grid") {
      return chordLyricsPair.chords
    }
    return super.formatChordLyricsPairChords(chordLyricsPair)
  }
}
