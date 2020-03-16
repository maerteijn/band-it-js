import ChordSheetJS from "chordsheetjs"

export class BandItSong extends ChordSheetJS.Song {
  constructor(song = null) {
    super()
    if (song) {
      Object.assign(this, song)
    }
    this.sections = []
    // TODO: create an object out of the section, maybe it should subclass
    // the Paragraph class of chordsheetjs
    this.currentSection = null
    this.collectSections()
  }

  flushSection() {
    if (this.currentSection && this.currentSection.lines.length > 0) {
      this.currentSection.type && this.sections.push(this.currentSection)
    }
    this.currentSection = null
  }

  ensureSection(title = "", type) {
    if (this.currentSection == null) {
      this.currentSection = { title: title, type: type, lines: [] }
    }
  }

  collectSections() {
    for (const line of this.lines) {
      this.ensureSection()

      if (line.items.length > 0) {
        const item = line.items[0]

        if (item instanceof ChordSheetJS.Tag) {
          switch (item.name) {
            case "start_of_verse":
            case "start_of_chorus":
            case "start_of_grid":
            case "x_start_of_section":
              this.flushSection()
              this.ensureSection(item.value, line.type)
              break
            case "end_of_verse":
            case "end_of_chorus":
            case "end_of_grid":
            case "x_end_of_section":
              this.flushSection()
              break
            // todo: handle the chorus reference to render it again
            default:
              this.currentSection.lines.push(line)
          }
        } else {
          // this can be a bit smarter done once section is an object. See
          // the paragraph class how to do this (maybe derive from
          // paragraph ?)
          this.currentSection.type = line.type
          this.currentSection.lines.push(line)
        }
      }
    }
  }
}
