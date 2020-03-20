import ChordSheetJS from "chordsheetjs"

import { BandItSection } from "./section"

export class BandItSong extends ChordSheetJS.Song {
  constructor(song = null) {
    super()
    if (song) {
      Object.assign(this, song)
    }
    this.sections = []
    this.currentSection = null
    this.collectSections()
  }

  flushSection() {
    if (this.currentSection && this.currentSection.lines.length > 0) {
      this.currentSection.type && this.sections.push(this.currentSection)
    }
    this.currentSection = null
  }

  ensureSection(title = "") {
    if (this.currentSection == null) {
      this.currentSection = new BandItSection(title)
    }
  }

  addLineToSection(line) {
    this.currentSection && this.currentSection.addLine(line)
  }

  collectSections() {
    for (const line of this.lines) {
      if (line.items.length > 0) {
        const item = line.items[0]

        if (item instanceof ChordSheetJS.Tag) {
          switch (item.name) {
            case "start_of_verse":
            case "start_of_chorus":
            case "start_of_grid":
            case "x_start_of_section":
              this.flushSection()
              this.ensureSection(item.value)
              break
            case "end_of_verse":
            case "end_of_chorus":
            case "end_of_grid":
            case "x_end_of_section":
              this.flushSection()
              break
            // todo: handle the chorus reference to render it again
            default:
              this.addLineToSection(line)
          }
        } else {
          this.addLineToSection(line)
        }
      }
    }
  }
}
