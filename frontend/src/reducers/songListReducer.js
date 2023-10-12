import { createSlice } from "@reduxjs/toolkit";

export const songListSlice = createSlice({
  name: "songList",
  initialState: {
    songList: []
  },
  reducers:{
    changeSongList: (state,action) => {
        state.songList= action.payload;
    },
  }
});

export const {changeSongList} = songListSlice.actions;

export default songListSlice.reducer;