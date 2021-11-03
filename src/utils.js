import { BandItChordSheetParser } from "./parser/index.js"
import {
  BandItChordSheetFormatter,
} from "./formatter/index.js"

export function parseChordSheet(chorsheet) {
  const parser = new BandItChordSheetParser()
  return parser.parse(chorsheet)
}
export function dumpSongToChordSheet(song) {
  const formatter = new BandItChordSheetFormatter()
  return formatter.format(song)
}
