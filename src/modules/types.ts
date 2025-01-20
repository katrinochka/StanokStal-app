export type T_Programm =  {
    id: number,
    name: string,
    description: string,
    price: number,
    material: string
    image: string,
    status: number,
    duration?: number
}

export type T_Manufacture = {
    id: string | null
    status: E_ManufactureStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    programms: T_Programm[]
    name: string
    marriage: string
}

export enum E_ManufactureStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}

export type T_User = {
    id: number
    username: string
    is_authenticated: boolean
    is_superuser: boolean
}

export type T_ManufacturesFilters = {
    date_formation_start: string
    date_formation_end: string
    status: E_ManufactureStatus
    owner: string
}

export type T_ProgrammsListResponse = {
    programms: T_Programm[],
    draft_manufacture_id?: number,
    programms_count?: number
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}

export type T_ProgrammAddData = {
    name: string;
    description: string;
    price: number;
    image?: File | null;
}