import { configureStore } from "@reduxjs/toolkit";
import { careersReducer } from "../features/careers/careersSlice";

export const store = configureStore({
  reducer: {
    careers: careersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
