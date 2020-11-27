import Ajv from "ajv"

const definitionsSchema = {
  $id: "definitions.json",
  definitions: {
    "non-empty-string": {
      type: "string",
      minLength: 1
    },
    song: {
      type: "object",
      properties: {
        id: { type: "integer" },
        url: { type: "string" },
        title: { $ref: "definitions.json#/definitions/non-empty-string" },
        as_performed_by: { type: "string" },
        content_format: { type: "string" },
        content: { type: "string" },
        transpose: { type: "integer" }
      },
      required: [
        "id",
        "url",
        "title",
        "as_performed_by",
        "content_format",
        "content",
        "transpose"
      ]
    }
  }
}

const songlistSchema = {
  $id: "songlistschema.json",
  title: "songlist",
  type: "array",
  items: { $ref: "definitions.json#/definitions/song" }
}

const ajv = new Ajv({ schemas: [definitionsSchema, songlistSchema] })
export const validator = ajv.getSchema("songlistschema.json")
