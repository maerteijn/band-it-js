import { BandItChordSheetParser, BandItChordProParser } from "./parser/index.js"
import {
  BandItChordSheetFormatter,
  BandItChordProFormatter
} from "./formatter/index.js"

export function parseChordSheet(chorsheet) {
  const parser = new BandItChordSheetParser()
  return parser.parse(chorsheet)
}

export function parseChordPro(chordpro) {
  const parser = new BandItChordProParser()
  return parser.parse(chordpro)
}

export function dumpSongToChordSheet(song) {
  const formatter = new BandItChordSheetFormatter()
  return formatter.format(song)
}

export function dumpSongToChordPro(song) {
  const formatter = new BandItChordProFormatter()
  return formatter.format(song)
}
