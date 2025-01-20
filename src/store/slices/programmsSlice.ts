import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Programm, T_ProgrammsListResponse} from "modules/types.ts";
import {AsyncThunkConfig} from "../store.ts";
import {api} from "modules/api.ts";
import {AxiosResponse} from "axios";
import {saveManufacture} from "../slices/manufacturesSlice.ts";
import {RootState} from "../store.ts";

type T_ProgrammsSlice = {
    programm_name: string
    programm: null | T_Programm
    programms: T_Programm[]
}

const initialState:T_ProgrammsSlice = {
    programm_name: "",
    programm: null,
    programms: []
}

export const fetchProgramm = createAsyncThunk<T_Programm, string, { state: RootState }>(
    "fetch_programm",
    async function(id) {
        const response = await api.programms.programmsRead(id);
        return response.data as T_Programm
    }
 )

export const fetchProgramms = createAsyncThunk<T_Programm[], object, AsyncThunkConfig>(
    "fetch_programms",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.programms.programmsList({
            programm_name: state.programms.programm_name
        }) as AxiosResponse<T_ProgrammsListResponse>

        thunkAPI.dispatch(saveManufacture({
            draft_manufacture_id: response.data.draft_manufacture_id,
            programms_count: response.data.programms_count
        }))

        return response.data.programms
    }
)

export const addProgrammToManufacture = createAsyncThunk<void, string, AsyncThunkConfig>(
    "programms/add_programm_to_manufacture",
    async function(programm_id) {
        await api.programms.programmsAddToManufactureCreate(programm_id)
    }
)

const programmsSlice = createSlice({
    name: 'programms',
    initialState: initialState,
    reducers: {
        updateProgrammName: (state, action) => {
            state.programm_name = action.payload
        },
        removeSelectedProgramm: (state) => {
            state.programm = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProgramms.fulfilled, (state:T_ProgrammsSlice, action: PayloadAction<T_Programm[]>) => {
            state.programms = action.payload
        });
        builder.addCase(fetchProgramm.fulfilled, (state:T_ProgrammsSlice, action: PayloadAction<T_Programm>) => {
            state.programm = action.payload
        });
    }
})

export const { updateProgrammName, removeSelectedProgramm} = programmsSlice.actions;

export default programmsSlice.reducer