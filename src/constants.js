export const VERSE = "verse"
export const CHORUS = "chorus"

export const HEADER_REGEX = /\[(?<value>.*)\]/
export const VERSE_CHORUS_REGEX = /(?<section>verse|chorus)(.*)/i
export const CHORUS_REGEX = /(chorus)(.*)/i

export const TITLE = "title"
export const ARTIST = "artist"
export const TITLE_ARTIST_REGEX = /(?<title>.*)-(?<artist>.*)/
export const META_TAG_REGEX = /(?<key>.*):(?<value>.*)/

export const GRID = "grid"
export const START_OF_GRID = "start_of_grid"
export const END_OF_GRID = "end_of_grid"
export const GRID_REGEX = /(grid)(?<value>.*)/i
export const GRIDLINE_REGEX = /(\S+\s*)/gi

export const CHORD_REGEX = /(?<chord>([A-G])(#|b)?([^/\s]*)(\/([A-G])(#|b)?)?)/
export const INDICATOR_REGEX = /^(?<indicator>\|{1,2})/
