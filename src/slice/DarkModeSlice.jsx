import {createSlice} from "@reduxjs/toolkit"

const darkModeSlice = createSlice({
   name: "darkmode",
   initialState: {
      mode: window.matchMedia("(prefers-color-scheme: dark)").matches,
   },
   reducers: {
      changeMode: (state) => {
         state.mode = !state.mode
      }
   }
})

export const {changeMode} = darkModeSlice.actions
export default darkModeSlice.reducer
