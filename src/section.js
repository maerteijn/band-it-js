import { Paragraph } from "chordsheetjs"

export class BandItSection extends Paragraph {
  constructor(title) {
    super()
    this.title = title
    // This can be used in a grid section to determine the amount of columns
    this.max_items = 0
  }

  addLine(line) {
    super.addLine(line)
    this.max_items = Math.max(this.max_items, line.items.length)
  }
}
