import { configureStore } from "@reduxjs/toolkit";
import articleSlice from "./article/slice";

const store = configureStore({
    reducer: {
        article: articleSlice
    }
})

export default store