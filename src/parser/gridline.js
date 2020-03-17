const GRIDLINE_REGEX = /(\S+\s*)/gi
const CHORD_REGEX = /(?<chord>([A-G])(#|b)?([^/\s]*)(\/([A-G])(#|b)?)?)/i

export function handleGridLine(line, songLine) {
  // As the chordpro and chordsheet parser are using the same format this
  // is a separate reusable utility function
  if (line[0] == "|") {
    const matches = line.matchAll(GRIDLINE_REGEX)

    for (const match of matches) {
      const item = match[0]
      if (CHORD_REGEX.test(item)) {
        songLine.addChordLyricsPair(item, "")
      } else {
        songLine.addChordLyricsPair("", item)
      }
    }
  } else {
    // Only lyrics on this line, so add the line as one item
    songLine.addChordLyricsPair("", line)
  }
}
