# Band-It-JS
![](https://github.com/maerteijn/band-it-js/workflows/band-it-js%20ci/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Front-end tools such as parsers, formatters and utilities.

## Development requirements

A recent version of `NodeJS` (tested with 14.17).

## Development install

As easy as always:
```bash
    npm install
```

## Linting and tests

Basic linting is included:
```bash
    npm run eslint
    npm run eslint:fix
```

We follow the `Prettier` opinionated code formatting guidelines:
```bash
    npm run prettier
    npm run prettier:fix
```

And `mocha` and `chai` are also there:
```bash
    npm run test
    npm run coverage
```

To run a single test(case), use the grep feature of mocha:
```javascript
  it("The parsed chordsheet has a title", () => {
    assert.equal(song.metadata.title, "Hello")
  })
```

```bash
npm run test -- -g "The parsed chordsheet has a title"
```
