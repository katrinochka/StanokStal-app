import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./slices/userSlice.ts"
import manufacturesReducer from "./slices/manufacturesSlice.ts"
import programmsReducer from "./slices/programmsSlice.ts"

export const store = configureStore({
    reducer: {
        user: userReducer,
        manufactures: manufacturesReducer,
        programms: programmsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AsyncThunkConfig = {
    state: RootState
}