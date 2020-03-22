const GRIDLINE_REGEX = /(\S+\s*)/gi
const CHORD_REGEX = /(?<chord>([A-G])(#|b)?([^/\s]*)(\/([A-G])(#|b)?)?)/
const INDICATOR_REGEX = /^(?<indicator>\|{1,2})/

export function handleGridLine(line, songLine) {
  // As the chordpro and chordsheet parser are using the same format this
  // is a separate reusable utility function
  const matches = line.matchAll(GRIDLINE_REGEX)
  const indicator = INDICATOR_REGEX.test(line) && line.match(INDICATOR_REGEX)[0]

  for (const match of matches) {
    const item = match[0]
    if (indicator == "|" && CHORD_REGEX.test(item)) {
      songLine.addChordLyricsPair(item, "")
    } else {
      songLine.addChordLyricsPair("", item)
    }
  }
}
