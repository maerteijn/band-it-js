import ChordSheetJS from "chordsheetjs"
import { BandItChordSheetParser } from "./parser/chordsheet"
import { BandItChordProParser } from "./parser/chordpro"
import { BandItChordProFormatter } from "./formatter"

export function parseChordSheet(chorsheet) {
  const parser = new BandItChordSheetParser()
  return parser.parse(chorsheet)
}

export function parseChordPro(chordpro) {
  const parser = new BandItChordProParser()
  return parser.parse(chordpro)
}

export function dumpSongToChordPro(song) {
  const formatter = new BandItChordProFormatter()
  return formatter.format(song)
}
