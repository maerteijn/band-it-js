import { assert } from "./utils.js"

import { validator } from "../src/schema.js"
import * as fixtures from "./fixtures.js"

describe("JSON Schema", () => {
  it("A JSON should validate with the schema correctly correctly", () => {
    const parsed_json = JSON.parse(fixtures.json_valid_output_example)
    assert.isTrue(validator(parsed_json))
  })

  it("Invalid JSON should not be valid", () => {
    const parsed_json = JSON.parse(fixtures.json_invalid_output_example)
    const validated = validator(parsed_json)
    assert.isFalse(validated)
    assert.equal(validator.errors.length, 1)

    // The as_performed_by field can't contain an integer
    const error = validator.errors[0]
    assert.include(error.dataPath, "as_performed_by")
    assert.equal(error.message, "should be string")
  })
})
