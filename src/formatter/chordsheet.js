import ChordSheetJS from "chordsheetjs"

import { ARTIST, TITLE, GRID } from "../constants"

export class BandItChordSheetFormatter extends ChordSheetJS.TextFormatter {
  format(song) {
    return [
      this.formatTitle(song),
      this.formatMetaData(song),
      this.formatSections(song)
    ].join("\n\n")
  }

  formatTitle(song) {
    const { title, artist } = song.metaData
    return `${title} - ${artist}`
  }

  formatMetaData(song) {
    const keys = Object.keys(song.metaData).filter(
      key => ![ARTIST, TITLE].includes(key)
    )
    return keys.map(key => `${key}: ${song.metaData[key]}`).join("\n")
  }

  formatGridItem(item) {
    if (item instanceof ChordSheetJS.ChordLyricsPair) {
      return `${item.chords}${item.lyrics}`
    }
    return ""
  }

  formatGridLine(line) {
    return line.items.map(item => this.formatGridItem(item)).join("")
  }

  formatSections(song) {
    return song.sections
      .map(section => {
        return `[${section.title}]\n` + this.formatSection(section)
      })
      .join("\n\n")
  }

  formatSection(section) {
    switch (section.type) {
      case GRID: {
        return section.lines.map(line => this.formatGridLine(line)).join("\n")
      }
      default: {
        const renderableLines = section.lines.filter(line =>
          line.hasRenderableItems()
        )
        const formattedLines = renderableLines.map(line =>
          this.formatLine(line)
        )
        return formattedLines.join("\n")
      }
    }
  }
}
