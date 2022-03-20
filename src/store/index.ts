import { combineReducers, configureStore, createSlice, EnhancedStore, PayloadAction } from "@reduxjs/toolkit";
import { Json, JsonConverter } from "../model/JsonConverter";

type State = {
  jsonConverter: JsonConverter,
  output: string
}

type UpdateInputJsonPayload = Json
type UpdateFormatPayload = string

const initialState: State = {
  jsonConverter: new JsonConverter({}, ''),
  output: ''
}

const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    updateInputJson(state, action: PayloadAction<UpdateInputJsonPayload>) {
      state.jsonConverter = state.jsonConverter.updateInputJson(action.payload)
    },
    updateFormat(state, action: PayloadAction<UpdateFormatPayload>) {
      state.jsonConverter = state.jsonConverter.updateFormat(action.payload)
    },
    convert(state, _) {
      state.output = state.jsonConverter.convert()
    }
  },
})

const rootReducer = combineReducers({
  converter: converterSlice.reducer
})

export const useStore = (): EnhancedStore => {
  return configureStore({
    reducer: rootReducer,
  })
}
