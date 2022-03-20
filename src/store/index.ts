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
        'name': 'name1'
      },
      {
        'url': 'https://example.com/2',
        'name': 'name2'
      },
    ],
    `<li>
  <a href="$url$">
    <p>$name$</p>
  </a>
</li>`
    ),
  output: `<li>
  <a href="https://example.com/1">
    <p>name1</p>
  </a>
</li>
<li>
  <a href="https://example.com/2">
    <p>name2</p>
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
