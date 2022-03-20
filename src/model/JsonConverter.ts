type JsonPrimitive =
  boolean |
  number  |
  string  |
  null

type JsonArray = JsonPrimitive[] | JsonObject[]

type JsonObject = {
  [key: string]: JsonPrimitive | JsonObject | JsonArray
}

export type Json = JsonObject | JsonArray

export class JsonConverter {
  constructor(
    readonly inputJson: Json,
    readonly format: string,
  ) {}

  static canConvert(value: any): boolean {
    try {
      JSON.parse(value)
      return true
    } catch (_) {
      return false
    }
  }

  updateInputJson(json: Json): JsonConverter {
    return new JsonConverter(json, this.format)
  }

  updateFormat(format: string): JsonConverter {
    return new JsonConverter(this.inputJson, format)
  }

  convert(): string {
    if (this.isJsonArray(this.inputJson)) {
      let outputs = ''

      this.inputJson.forEach(json => {
        if (this.isJsonObjest(json)) {
          outputs += `${this.replaceByFormat(json)}\n`
        }
      })
      return outputs.trim()
    }

    if (this.isJsonObjest(this.inputJson)) {
      return this.replaceByFormat(this.inputJson)
    }

    return 'Invalid json format!!'
  }

  private replaceByFormat(json: JsonObject): string {
    let output = this.format
    for (let [key, value] of Object.entries(json)) {
      output = output.replaceAll(`$${key}$` , value?.toString() ?? '')
    }
    return output
  }

  private isJsonObjest(value: any): value is JsonObject {
    return typeof value === 'object'
  }

  private isJsonArray(value: any): value is JsonArray {
    return Array.isArray(value)
  }
}
