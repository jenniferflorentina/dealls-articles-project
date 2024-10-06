import { createSlice } from "@reduxjs/toolkit"
import {state} from "./state"
import fetcher from './fetcher'

const initialState = state

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetcher.fetchCategories.fulfilled, (state, {payload}) => {
        state.categories = payload
      })
    }
  })

export default articleSlice.reducer