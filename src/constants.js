export const GRID = "grid"
export const START_OF_GRID = "start_of_grid"
export const END_OF_GRID = "end_of_grid"
export const GRID_REGEX = /(grid)(?<value>.*)/i

export const SECTION = "x_section"
export const START_OF_SECTION = "x_start_of_section"
export const END_OF_SECTION = "x_end_of_section"
export const X_SECTION_REGEX = /(?<section>x_start_of_section|x_end_of_section)(.*)/i

export const HEADER_REGEX = /\[(?<value>.*)\]/
export const VERSE_CHORUS_REGEX = /(?<section>verse|chorus)(.*)/i
export const CHORUS_REGEX = /(chorus)(.*)/i

export const TITLE_ARTIST_REGEX = /(?<title>.*)-(?<artist>.*)/
export const META_TAG_REGEX = /(?<key>.*):(?<value>.*)/

export const CONTROL_CHARS = "{"
