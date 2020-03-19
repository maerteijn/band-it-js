import ChordSheetJS from "chordsheetjs"
import { BandItSong } from "../song"
import { handleGridLine } from "./gridline"
import {
  GRID,
  HEADER_REGEX,
  VERSE_CHORUS_REGEX,
  CHORUS_REGEX,
  GRID_REGEX,
  TITLE_ARTIST_REGEX,
  META_TAG_REGEX
} from "../constants"

export class BandItChordSheetParser extends ChordSheetJS.ChordSheetParser {
  constructor(...args) {
    super(...args)
    this.preserveWhitespace = false
    this.currentSection = null
    this.encounteredHeader = false
  }

  startSection(type, title, prefix = "") {
    this.endSection()
    this.currentSection = { type: type, title: title, prefix: prefix }
    let tag = `${prefix}start_of_${type}: ${title}`
    this.song.addTag(tag)
  }

  endSection() {
    if (this.currentSection !== null) {
      let { type, title, prefix } = this.currentSection
      let tag = `${prefix}end_of_${type}: ${title}`
      this.song.addTag(tag)
      this.song.addLine()
    }
    this.currentSection = null
  }

  parse(data) {
    // remove multiple blank lines and '\r' before parsing so we get a 'clean' song
    data = data.replace(/\r\n/g, "\n")
    data = data.replace(/^\n{1,}$/gm, "")

    const song = super.parse(data)

    if (this.currentSection !== null) {
      // a section is still open, so let's close it
      this.song.addLine()
      this.endSection()
    }
    return new BandItSong(song)
  }

  parseLine(line) {
    super.parseLine(line)
    if (line.trim().length == 0) {
      this.endSection()
    }
  }

  parseNonEmptyLine(line) {
    if (HEADER_REGEX.test(line)) {
      this.encounteredHeader = true
      const { value } = line.match(HEADER_REGEX).groups
      this.parseHeader(line, value)
    } else if (!this.encounteredHeader) {
      // we did not encountered the first header yet, so this line could be
      // be potentional metadata
      this.parseMetaData(line)
    } else if (this.currentSection && this.currentSection.type == GRID) {
      this.parseGridLine(line)
    } else {
      super.parseNonEmptyLine(line)
      const currentType = this.currentSection && this.currentSection.type
      this.song.setCurrentLineType(currentType)
    }
  }

  parseHeader(line, header) {
    if (VERSE_CHORUS_REGEX.test(header)) {
      const nextline = this.hasNextLine() && this.lines[this.currentLine].trim()
      if (CHORUS_REGEX.test(header) && nextline == "") {
        // if the next line is empty we refer to a earlier defined chorus,
        // so then we should use the {chorus: x} tag
        this.song.addTag(`chorus: ${header}`)
      } else {
        // we start a chorus or verse section
        const { section } = line.match(VERSE_CHORUS_REGEX).groups
        this.startSection(section.toLowerCase(), header)
      }
    } else if (GRID_REGEX.test(header)) {
      const { value } = header.match(GRID_REGEX).groups
      this.startSection(GRID, value)
    } else {
      // not a verse or chorus, so add a custom x_ section
      this.startSection("section", header, "x_")
    }
  }

  parseMetaData(line) {
    if (TITLE_ARTIST_REGEX.test(line)) {
      const { title, artist } = line.match(TITLE_ARTIST_REGEX).groups
      this.song.addTag(`title: ${title.trim()}`)
      this.song.addLine()
      this.song.addTag(`artist: ${artist.trim()}`)
    } else if (META_TAG_REGEX.test(line)) {
      const { key, value } = line.match(META_TAG_REGEX).groups
      this.song.addTag(`${key.toLowerCase().trim()}: ${value.trim()}`)
    }
  }

  parseGridLine(line) {
    this.songLine.type = GRID
    handleGridLine(line, this.songLine)
  }

  ensureChordLyricsPairInitialized() {
    if (!this.processingText && !this.preserveWhitespace) {
      let lyrics = this.songLine.currentChordLyricsPair.lyrics
      // replace all mutliple spaces with just one
      lyrics = lyrics.replace(/  +/g, " ")
      this.songLine.currentChordLyricsPair.lyrics = lyrics
    }
    super.ensureChordLyricsPairInitialized()
  }
}
