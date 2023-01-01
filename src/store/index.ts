import { combineReducers, configureStore, createSlice, EnhancedStore, PayloadAction } from "@reduxjs/toolkit";
import { Json, JsonConverter } from "../model/JsonConverter";

type State = {
  jsonConverter: JsonConverter,
  output: string
}

type UpdateInputJsonPayload = Json
type UpdateFormatPayload = string

const initialState: State = {
  jsonConverter: new JsonConverter(
    [
      {
        'url': 'https://example.com/1',
        'author': { 'name': 'name1' },
        'book': { 'page': 100 }
      },
      {
        'url': 'https://example.com/2',
        'author': { 'name': 'name2' },
        'book': { 'page': 200 }
      },
    ],
    `<li>
  <a href="$url$">
    <p>$author.name$</p>
    <p>$book$</p>
  </a>
</li>`,
    false
  ),
  output: `<li>
  <a href="https://example.com/1">
    <p>name1</p>
    <p>{"page":100}</p>
  </a>
</li>
<li>
  <a href="https://example.com/2">
    <p>name2</p>
    <p>{"page":200}</p>
  </a>
</li>`
}

export const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    updateInputJson(state, action: PayloadAction<UpdateInputJsonPayload>) {
      state.jsonConverter = state.jsonConverter.updateInputJson(action.payload)
    },
    updateFormat(state, action: PayloadAction<UpdateFormatPayload>) {
      state.jsonConverter = state.jsonConverter.updateFormat(action.payload)
    },
    updateIsReverseList(state, action: PayloadAction<boolean>) {
      state.jsonConverter = state.jsonConverter.updateIsReverseList(action.payload)
    },
    convert(state) {
      state.output = state.jsonConverter.convert()
    }
  },
})

const rootReducer = combineReducers({
  converter: converterSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export const useStore = (): EnhancedStore => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false
      })
    }
  })
}
