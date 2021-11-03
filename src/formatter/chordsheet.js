import ChordSheetJS from "chordsheetjs"

import { ARTIST, TITLE, GRID } from "../constants.js"

export class BandItChordSheetFormatter extends ChordSheetJS.TextFormatter {
  format(song) {
    const formatted = [
      this.formatTitle(song),
      this.formatMetaData(song),
      this.formatSections(song),
    ].join("\n\n")

    // cleanup empty songlines
    return formatted.replace(/^\n{1,}$/gm, "")
  }

  formatTitle(song) {
    const { title, artist } = song.metadata
    return `${title} - ${artist}`
  }

  formatMetaData(song) {
    const keys = Object.keys(song.metadata).filter(
      key => ![ARTIST, TITLE].includes(key)
    )
    return keys
      .map(key => {
        const title = key.charAt(0).toUpperCase() + key.slice(1)
        return `${title}: ${song.metadata[key]}`
      })
      .join("\n")
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
      .map(section => this.formatSection(section))
      .join("\n\n")
  }

  formatSection(section) {
    switch (section.type) {
      case GRID: {
        const header = `[Grid ${section.title}]`
        const lines = section.lines.map(line => this.formatGridLine(line))
        lines.unshift(header)
        return lines.join("\n")
      }
      default: {
        const header = `[${section.title}]`
        const renderableLines = section.lines.filter(line =>
          line.hasRenderableItems()
        )
        const formattedLines = renderableLines.map(line =>
          this.formatLine(line)
        )
        formattedLines.unshift(header)
        return formattedLines.join("\n")
      }
    }
  }
}
