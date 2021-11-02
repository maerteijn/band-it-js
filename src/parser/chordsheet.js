import ChordSheetJS from "chordsheetjs"
import { BandItSong } from "../song.js"
import {
  HEADER_REGEX,
  VERSE_CHORUS_REGEX,
  CHORUS_REGEX,
  TITLE_ARTIST_REGEX,
  META_TAG_REGEX
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
      this.song.addLine()
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
      this.song.addLine()
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
        this.song.addLine()
        const { value } = line.match(HEADER_REGEX).groups
        this.parseHeader(line, value)
        break
      }
      case !this.encounteredHeader: {
        // parse metadata until the first header occured
        this.parseMetaData(line)
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
      case VERSE_CHORUS_REGEX.test(header): {
        this.song.addLine()
        const nextline =
          this.hasNextLine() && this.lines[this.currentLine].trim()
        if (CHORUS_REGEX.test(header) && nextline == "") {
          // support empty choruses which are references to other chorus
          // sections
          this.song.addTag(`chorus: ${header}`)
        } else {
          // we start a chorus or verse section
          const { section } = line.match(VERSE_CHORUS_REGEX).groups
          this.startSection(section.toLowerCase(), header)
        }
        break
      }
      default: {
        this.song.addLine()
        this.startSection("verse", header)
      }
    }
  }

  parseMetaData(line) {
    switch (true) {
      case TITLE_ARTIST_REGEX.test(line): {
        this.song.addLine()
        const { title, artist } = line.match(TITLE_ARTIST_REGEX).groups
        this.song.addTag(`title: ${title.trim()}`)
        this.song.addTag(`artist: ${artist.trim()}`)
        break
      }
      case META_TAG_REGEX.test(line): {
        this.song.addLine()
        const { key, value } = line.match(META_TAG_REGEX).groups
        this.song.addTag(`${key.toLowerCase().trim()}: ${value.trim()}`)
        break
      }
    }
  }
}
