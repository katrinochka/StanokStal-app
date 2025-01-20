import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Manufacture, T_ManufacturesFilters, T_Programm} from "modules/types.ts";
import {NEXT_MONTH, PREV_MONTH} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "../store.ts";
import {AxiosResponse} from "axios";

type T_ManufacturesSlice = {
    draft_manufacture_id: number | null,
    programms_count: number | null,
    manufacture: T_Manufacture | null,
    manufactures: T_Manufacture[],
    filters: T_ManufacturesFilters,
    save_mm: boolean
}

const initialState:T_ManufacturesSlice = {
    draft_manufacture_id: null,
    programms_count: null,
    manufacture: null,
    manufactures: [],
    filters: {
        status: 0,
        date_formation_start: PREV_MONTH.toISOString().split('T')[0],
        date_formation_end: NEXT_MONTH.toISOString().split('T')[0]
    },
    save_mm: false
}

export const fetchManufacture = createAsyncThunk<T_Manufacture, string, AsyncThunkConfig>(
    "manufactures/manufacture",
    async function(manufacture_id) {
        const response = await api.manufactures.manufacturesRead(manufacture_id) as AxiosResponse<T_Manufacture>
        return response.data
    }
)

export const fetchManufactures = createAsyncThunk<T_Manufacture[], object, AsyncThunkConfig>(
    "manufactures/manufactures",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.manufactures.manufacturesList({
            status: state.manufactures.filters.status,
            date_formation_start: state.manufactures.filters.date_formation_start,
            date_formation_end: state.manufactures.filters.date_formation_end
        }) as AxiosResponse<T_Manufacture[]>
        return response.data
    }
)

export const removeProgrammFromDraftManufacture = createAsyncThunk<T_Programm[], string, AsyncThunkConfig>(
    "manufactures/remove_programm",
    async function(programm_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.manufactures.manufacturesDeleteProgrammDelete(state.manufactures.manufacture.id, programm_id) as AxiosResponse<T_Programm[]>
        return response.data
    }
)

export const deleteDraftManufacture = createAsyncThunk<void, object, AsyncThunkConfig>(
    "manufactures/delete_draft_manufacture",
    async function(_, {getState}) {
        const state = getState()
        await api.manufactures.manufacturesDeleteDelete(state.manufactures.manufacture.id)
    }
)

export const sendDraftManufacture = createAsyncThunk<void, object, AsyncThunkConfig>(
    "manufactures/send_draft_manufacture",
    async function(_, {getState}) {
        const state = getState()
        await api.manufactures.manufacturesUpdateStatusUserUpdate(state.manufactures.manufacture.id)
    }
)

export const updateManufacture = createAsyncThunk<void, object, AsyncThunkConfig>(
    "manufactures/update_manufacture",
    async function(data, {getState}) {
        const state = getState()
        await api.manufactures.manufacturesUpdateUpdate(state.manufactures.manufacture.id, {
            ...data
        })
    }
)

export const updateProgrammValue = createAsyncThunk<void, object, AsyncThunkConfig>(
    "manufactures/update_mm_value",
    async function({programm_id, duration},thunkAPI) {
        const state = thunkAPI.getState()
        await api.manufactures.manufacturesUpdateProgrammUpdate(state.manufactures.manufacture.id, programm_id, {duration})
    }
)

const manufacturesSlice = createSlice({
    name: 'manufactures',
    initialState: initialState,
    reducers: {
        saveManufacture: (state, action) => {
            state.draft_manufacture_id = action.payload.draft_manufacture_id
            state.programms_count = action.payload.programms_count
        },
        removeManufacture: (state) => {
            state.manufacture = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchManufacture.fulfilled, (state:T_ManufacturesSlice, action: PayloadAction<T_Manufacture>) => {
            state.manufacture = action.payload
        });
        builder.addCase(fetchManufactures.fulfilled, (state:T_ManufacturesSlice, action: PayloadAction<T_Manufacture[]>) => {
            state.manufactures = action.payload
        });
        builder.addCase(removeProgrammFromDraftManufacture.rejected, (state:T_ManufacturesSlice) => {
            state.manufacture = null
        });
        builder.addCase(removeProgrammFromDraftManufacture.fulfilled, (state:T_ManufacturesSlice, action: PayloadAction<T_Programm[]>) => {
            if (state.manufacture) {
                state.manufacture.programms = action.payload as T_Programm[]
            }
        });
        builder.addCase(sendDraftManufacture.fulfilled, (state:T_ManufacturesSlice) => {
            state.manufacture = null
        });
    }
})

export const { saveManufacture, removeManufacture, triggerUpdateMM, updateFilters } = manufacturesSlice.actions;

export default manufacturesSlice.reducer