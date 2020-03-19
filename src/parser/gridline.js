const GRIDLINE_REGEX = /(\S+\s*)/gi
const CHORD_REGEX = /(?<chord>([A-G])(#|b)?([^/\s]*)(\/([A-G])(#|b)?)?)/

export function handleGridLine(line, songLine) {
  // As the chordpro and chordsheet parser are using the same format this
  // is a separate reusable utility function
  const matches = line.matchAll(GRIDLINE_REGEX)
  const indicator = (line[0] + line[1]).trim()

  for (const match of matches) {
    const item = match[0]
    if (indicator == "|" && CHORD_REGEX.test(item)) {
      songLine.addChordLyricsPair(item, "")
    } else {
      songLine.addChordLyricsPair("", item)
    }
  }
}
