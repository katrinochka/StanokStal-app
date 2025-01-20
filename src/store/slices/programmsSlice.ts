import {createSlice} from "@reduxjs/toolkit";

type T_ProgrammsSlice = {
    programm_name: string
}

const initialState:T_ProgrammsSlice = {
    programm_name: "",
}


const programmsSlice = createSlice({
    name: 'programms',
    initialState: initialState,
    reducers: {
        updateProgrammName: (state, action) => {
            state.programm_name = action.payload
        }
    }
})

export const { updateProgrammName} = programmsSlice.actions;

export default programmsSlice.reducer