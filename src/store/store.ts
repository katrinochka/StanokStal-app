import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import programmsReducer from "./slices/programmsSlice.ts"

export const store = configureStore({
    reducer: {
        programms: programmsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;