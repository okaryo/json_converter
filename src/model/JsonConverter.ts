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
    readonly isReverseList: boolean,
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
    return new JsonConverter(json, this.format, this.isReverseList)
  }

  updateFormat(format: string): JsonConverter {
    return new JsonConverter(this.inputJson, format, this.isReverseList)
  }

  updateIsReverseList(isActive: boolean): JsonConverter {
    return new JsonConverter(this.inputJson, this.format, isActive)
  }

  convert(): string {
    if (this.isJsonArray(this.inputJson)) {
      let outputs = ''
      let source = [...this.inputJson]
      if (this.isReverseList) source.reverse()

      source.forEach(json => {
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
    const matches = Array.from(this.format.matchAll(/\$([^\$]*)\$/g))
    for (const match of matches) {
      const target = match[0]
      const embededKeys = match[1]

      let value: any
      embededKeys.split('.').forEach(key => {
        if (value === undefined && !json.hasOwnProperty(key)) {
          value = target
          return
        }

        if (value === undefined) {
          value = json[key]
        } else {
          value = value[key]
        }
      })
      if (this.isJsonObjest(value)) {
        output = output.replaceAll(target , JSON.stringify(value))
      } else {
        output = output.replaceAll(target , value?.toString() ?? '')
      }
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
