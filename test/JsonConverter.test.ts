import { JsonConverter } from "../src/model/JsonConverter"

describe('#updateInputJson', () => {
  test('should update inputJson', () => {
    const jsonConverter = new JsonConverter({}, '')
    const actual = jsonConverter.updateInputJson(
      {
        'key': 'value'
      }
    )
    const expected = new JsonConverter({'key': 'value'}, '')

    expect(actual).toEqual(expected)
  })
})

describe('#updateFormat', () => {
  test('should update format', () => {
    const jsonConverter = new JsonConverter({}, '')
    const actual = jsonConverter.updateFormat('new format')
    const expected = new JsonConverter({}, 'new format')

    expect(actual).toEqual(expected)
  })
})

describe('#convert', () => {
  describe('when input json is not array', () => {
    test('should return converted string', () => {
      const jsonConverter = new JsonConverter(
        {'key': 'value'},
        '<li>$key$</li>'
      )
      const actual = jsonConverter.convert()
      const expected = '<li>value</li>'

      expect(actual).toEqual(expected)
    })
  })

  describe('when input json is array', () => {
    test('should return converted string', () => {
      const jsonConverter = new JsonConverter(
        [
          {'key': 'value1'},
          {'key': 'value2'}
        ],
        '<li>$key$</li>'
      )
      const actual = jsonConverter.convert()
      const expected = `<li>value1</li>
<li>value2</li>
`

      expect(actual).toEqual(expected)
    })
  })
})