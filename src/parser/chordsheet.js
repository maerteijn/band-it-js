import ChordSheetJS from "chordsheetjs"
import { BandItSong } from "../song.js"
import { handleGridLine } from "./gridline.js"
import {
  GRID,
  HEADER_REGEX,
  VERSE_CHORUS_REGEX,
  CHORUS_REGEX,
  GRID_REGEX,
  TITLE_ARTIST_REGEX,
  META_TAG_REGEX
} from "../constants.js"

class BandItParserSection {
  constructor(title, type, prefix) {
    this.title = title
    this.type = type
    this.prefix = prefix
  }
}

export class BandItChordSheetParser extends ChordSheetJS.ChordSheetParser {
  constructor(...args) {
    super(...args)
    this.preserveWhitespace = false
    this.currentSection = null
    this.encounteredHeader = false
  }

  startSection(type, title, prefix = "") {
    this.endSection()
    this.currentSection = new BandItParserSection(title, type, prefix)
    const tag = `${prefix}start_of_${type}: ${title}`
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
    switch (true) {
      case HEADER_REGEX.test(line): {
        this.encounteredHeader = true
        const { value } = line.match(HEADER_REGEX).groups
        this.parseHeader(line, value)
        break
      }
      case !this.encounteredHeader: {
        // we did not encountered the first header yet, so this line could be
        // be potentional metadata
        this.parseMetaData(line)
        break
      }
      case this.currentSection && this.currentSection.type == GRID: {
        this.parseGridLine(line)
        break
      }
      default: {
        super.parseNonEmptyLine(line)
        const currentType = this.currentSection && this.currentSection.type
        this.song.setCurrentLineType(currentType)
      }
    }
  }

  parseHeader(line, header) {
    switch (true) {
      case VERSE_CHORUS_REGEX.test(header): {
        const nextline =
          this.hasNextLine() && this.lines[this.currentLine].trim()
        if (CHORUS_REGEX.test(header) && nextline == "") {
          this.song.addTag(`chorus: ${header}`)
        } else {
          // we start a chorus or verse section
          const { section } = line.match(VERSE_CHORUS_REGEX).groups
          this.startSection(section.toLowerCase(), header)
        }
        break
      }
      case GRID_REGEX.test(header): {
        const { value } = header.match(GRID_REGEX).groups
        this.startSection(GRID, value)
        break
      }
      default: {
        this.startSection("section", header, "x_")
      }
    }
  }

  parseMetaData(line) {
    switch (true) {
      case TITLE_ARTIST_REGEX.test(line): {
        const { title, artist } = line.match(TITLE_ARTIST_REGEX).groups
        this.song.addTag(`title: ${title.trim()}`)
        this.song.addLine()
        this.song.addTag(`artist: ${artist.trim()}`)
        break
      }
      case META_TAG_REGEX.test(line): {
        const { key, value } = line.match(META_TAG_REGEX).groups
        this.song.addTag(`${key.toLowerCase().trim()}: ${value.trim()}`)
        break
      }
    }
  }

  parseGridLine(line) {
    this.songLine.type = GRID
    handleGridLine(line, this.songLine)
  }
}
