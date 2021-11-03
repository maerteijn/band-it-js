import ChordSheetJS from "chordsheetjs"
import { BandItSong } from "../song.js"

import {
  VERSE,
  CHORUS,
  GRID,
  HEADER_REGEX,
  CHORUS_REGEX,
  GRID_REGEX,
  TITLE_ARTIST_REGEX,
  META_TAG_REGEX,
  GRIDLINE_REGEX,
  CHORD_REGEX,
  INDICATOR_REGEX,
} from "../constants.js"

class BandItParserSection {
  constructor(title, type) {
    this.title = title
    this.type = type
  }
}

export class BandItChordSheetParser extends ChordSheetJS.ChordSheetParser {
  constructor(...args) {
    super(...args)
    this.preserveWhitespace = false
    this.currentSection = null
    this.encounteredHeader = false
  }

  startSection(type, title) {
    this.endSection()
    this.currentSection = new BandItParserSection(title, type)
    const tag = `start_of_${type}: ${title}`
    this.song.addTag(tag)
  }

  endSection() {
    if (this.currentSection !== null) {
      let { type, title } = this.currentSection
      let tag = `end_of_${type}: ${title}`
      this.song.addTag(tag)
      this.songLine = this.song.addLine()
    }
    this.currentSection = null
    this.chordLyricsPair = null
  }

  parse(data) {
    // remove multiple blank lines and '\r' before parsing so we get a 'clean' song
    data = data.replace(/\r\n/g, "\n")
    data = data.replace(/^\n{1,}$/gm, "")

    const song = super.parse(data)

    if (this.currentSection !== null) {
      // a section is still open, so let's close it
      this.songLine = this.song.addLine()
      this.endSection()
    }
    return new BandItSong(song)
  }

  parseLine(line) {
    switch (true) {
      case line.trim().length === 0: {
        this.chordLyricsPair = null
        break
      }
      case HEADER_REGEX.test(line): {
        this.encounteredHeader = true
        this.songLine = this.song.addLine()
        const { value } = line.match(HEADER_REGEX).groups
        this.parseHeader(line, value)
        break
      }
      case !this.encounteredHeader: {
        // parse metadata until the first header occured
        this.parseMetaData(line)
        break
      }
      case this.currentSection && this.currentSection.type == GRID: {
        this.parseGridLine(line)
        break
      }
      default: {
        this.songLine = this.song.addLine()
        super.parseNonEmptyLine(line)
        const currentType = this.currentSection && this.currentSection.type
        this.song.setCurrentLineType(currentType)
      }
    }
  }

  parseHeader(line, header) {
    switch (true) {
      case CHORUS_REGEX.test(header): {
        this.songLine = this.song.addLine()
        const nextline =
          this.hasNextLine() && this.lines[this.currentLine].trim()

        if (nextline == "") {
          // support empty choruses which are references to other chorus
          // sections
          this.song.addTag(`chorus: ${header}`)
        } else {
          // we start a chorus  section
          this.startSection(CHORUS, header)
        }
        break
      }
      case GRID_REGEX.test(header): {
        const { value } = header.match(GRID_REGEX).groups
        this.startSection(GRID, value)
        break
      }
      default: {
        this.songLine = this.song.addLine()
        this.startSection(VERSE, header)
      }
    }
  }

  parseMetaData(line) {
    switch (true) {
      case TITLE_ARTIST_REGEX.test(line): {
        this.songLine = this.song.addLine()
        const { title, artist } = line.match(TITLE_ARTIST_REGEX).groups
        this.song.addTag(`title: ${title.trim()}`)
        this.song.addTag(`artist: ${artist.trim()}`)
        break
      }
      case META_TAG_REGEX.test(line): {
        this.songLine = this.song.addLine()
        const { key, value } = line.match(META_TAG_REGEX).groups
        this.song.addTag(`${key.toLowerCase().trim()}: ${value.trim()}`)
        break
      }
    }
  }

  parseGridLine(line) {
    this.songLine = this.song.addLine()
    this.song.setCurrentLineType(GRID)

    const matches = line.matchAll(GRIDLINE_REGEX)
    const indicator =
      INDICATOR_REGEX.test(line) && line.match(INDICATOR_REGEX)[0]

    for (const match of matches) {
      const item = match[0]
      if (indicator == "|" && CHORD_REGEX.test(item)) {
        this.songLine.addChordLyricsPair(item, "")
      } else {
        this.songLine.addChordLyricsPair("", item)
      }
    }
  }
}
