import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Programm, T_ProgrammAddData, T_ProgrammsListResponse} from "modules/types.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "../store.ts";
import {AxiosResponse} from "axios";
import {saveManufacture} from "store/slices/manufacturesSlice.ts";
import {Programm} from "src/api/Api.ts";

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

export const fetchProgramm = createAsyncThunk<T_Programm, string, AsyncThunkConfig>(
    "fetch_programm",
    async function(id) {
        const response = await api.programms.programmsRead(id) as AxiosResponse<T_Programm>
        return response.data
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

export const deleteProgramm = createAsyncThunk<T_Programm[], string, AsyncThunkConfig>(
    "delete_programm",
    async function(programm_id) {
        const response = await api.programms.programmsDeleteDelete(programm_id) as AxiosResponse<T_Programm[]>
        return response.data
    }
)

export const updateProgramm = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_programm",
    async function({programm_id, data}) {
        await api.programms.programmsUpdateUpdate(programm_id as string, data as Programm)
    }
)

export const updateProgrammImage = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_programm_image",
    async function({programm_id, data}) {
        await api.programms.programmsUpdateImageCreate(programm_id as string, data as {image?: File})
    }
)

export const createProgramm = createAsyncThunk<void, T_ProgrammAddData, AsyncThunkConfig>(
    "update_programm",
    async function(data) {
        await api.programms.programmsCreateCreate(data)
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
        builder.addCase(deleteProgramm.fulfilled, (state:T_ProgrammsSlice, action: PayloadAction<T_Programm[]>) => {
            state.programms = action.payload
        });
    }
})

export const { updateProgrammName, removeSelectedProgramm} = programmsSlice.actions;

export default programmsSlice.reducer