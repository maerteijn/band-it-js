import ChordSheetJS from "chordsheetjs"
import { BandItChordSheetParser } from "./parser/chordsheet"
import { BandItChordProFormatter } from "./formatter"

export function parseChordSheet(chorsheet) {
  const parser = new BandItChordSheetParser()
  return parser.parse(chorsheet)
}

export function parseChordPro(chordpro) {
  const parser = new ChordSheetJS.ChordProParser()
  return parser.parse(chordpro)
}

export function dumpSongToChordPro(song) {
  const formatter = new BandItChordProFormatter()
  return formatter.format(song)
}
