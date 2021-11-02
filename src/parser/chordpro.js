import ChordSheetJS from "chordsheetjs"
import { BandItSong } from "../song.js"

export class BandItChordProParser extends ChordSheetJS.ChordProParser {
  parse(data) {
    const song = super.parse(data)
    return new BandItSong(song)
  }
}
