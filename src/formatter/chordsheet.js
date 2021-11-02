import ChordSheetJS from "chordsheetjs"

import { ARTIST, TITLE } from "../constants.js"

export class BandItChordSheetFormatter extends ChordSheetJS.TextFormatter {
  format(song) {
    const formatted = [
      this.formatTitle(song),
      this.formatMetaData(song),
      this.formatSections(song)
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

  formatSections(song) {
    return song.sections
      .map(section => this.formatSection(section))
      .join("\n\n")
  }

  formatSection(section) {
    const header = `[${section.title}]`
    const renderableLines = section.lines.filter(line =>
      line.hasRenderableItems()
    )
    const formattedLines = renderableLines.map(line => this.formatLine(line))
    formattedLines.unshift(header)
    return formattedLines.join("\n")
  }
}
