export const simple_chordsheet = `
       Am         C/G        F          C
Let it be, let it be, let it be, let it be
C                G              F  C/E Dm C
Whisper words of wisdom, let it be
`

export const extended_chordsheet = `
Hello - Lionel Richie

Tempo: 63
Key: Am (A@444Hz)

[Intro]
Amadd9 Cmaj7/G Fmaj7 Am7/G Fmaj7
x2

[Verse 1]
     Amadd9          Cmaj7/G       Fmaj7 Am7/G Fmaj7
I've been alone with you inside my mind

[Chorus 1]
      Dm             G
I can see it in your eyes,
      C              F
I can see it in your smile`

export const grid_chordsheet = `
Under the Bridge - Red Hot Chili Peppers

[Grid Interlude]
|  E . . B    | . . . . | . C#m  . G#m  | . A . . |
|| . . . Yeah | . . . . | . yeah . yeah | . . . . |
|  E . . B    | . . . . | . C#m  . A    | . . . . |
`

export const simple_chordpro = `
{title: Hello}
{artist: Lionel Richie}

{tempo: 63}
`

export const extended_chordpro = `
{title: Hello}
{artist: Lionel Richie}

{tempo: 63}

{start_of_verse: Intro}
[Amadd9] [Cmaj7/G] [Fmaj7] [Am7/G] [Fmaj7]
{end_of_verse: Intro}

{start_of_verse: Verse 1}
I've [Amadd9]been alone with [Cmaj7/G]you inside my [Fmaj7]mind[Am7/G][Fmaj7]
And [Amadd9]in my dreams I've [Cma7/G]kissed your lips
{end_of_verse: Verse 1}
`

export const grid_chordpro = `
{title: Under the Bridge}
{artist: Red Hot Chili Peppers}
`

export const json_valid_output_example = `
[
  {
    "as_performed_by": "Lionel Richie",
    "id": 3,
    "content_format": "chordpro",
    "content": "{title: Hello}{artist: Lionel Richie}",
    "title": "Hello",
    "transpose": 0,
    "url": "Hello - Lionel Richie.txt"
  }
]
`

export const json_invalid_output_example = `
[
  {
    "as_performed_by": 3,
    "id": 4,
    "content_format": "chordpro",
    "content": "{title: Hello}{artist: Lionel Richie}",
    "title": "Hello",
    "url": "Hello - Lionel Richie.txt"
  }
]
`
