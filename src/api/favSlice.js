import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "fav",
  initialState: { items: [] },
  reducers: {
    replaceFavItem(state, action) {
      state.items = action.payload.items;
    },
    addFavItem(state, action) {
      // TODO check existing
      const newItem = action.payload;
      const existingItems = state.items.find(
        (item) => item.uuid === newItem.uuid
      );

      if (!existingItems) {
        state.items.push({
          uuid: newItem.uuid,
          fav: true,
        });
      } else {
        existingItems.fav = !existingItems.fav;
      }
    },
  },
});

export const favActions = favSlice.actions;
export default favSlice;
