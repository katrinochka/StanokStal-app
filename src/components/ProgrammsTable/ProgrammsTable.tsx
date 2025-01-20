import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {Button} from "reactstrap";
import {T_Programm} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {deleteProgramm} from "store/slices/programmsSlice.ts";
import {useAppDispatch} from "store/store.ts";

type Props = {
    programms:T_Programm[]
}

const ProgrammsTable = ({programms}:Props) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = (programm_id) => {
        navigate(`/programms/${programm_id}`)
    }

    const openProgrammEditPage = (programm_id) => {
        navigate(`/programms/${programm_id}/edit`)
    }

    const handleDeleteProgramm = async (programm_id) => {
        dispatch(deleteProgramm(programm_id))
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Фото',
                accessor: 'image',
                Cell: ({ value }) => <img src={value} width={100} />
            },
            {
                Header: 'Название',
                accessor: 'name',
                Cell: ({ value }) => value
            },
            {
                Header: 'Цена',
                accessor: 'price',
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "edit_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => openProgrammEditPage(cell.row.values.id)}>Редактировать</Button>
                )
            },
            {
                Header: "Удалить",
                accessor: "delete_button",
                Cell: ({ cell }) => (
                    <Button color="danger" onClick={() => handleDeleteProgramm(cell.row.values.id)}>Удалить</Button>
                )
            }
        ],
        []
    )

    if (!programms.length) {
        return (
            <></>
        )
    }

    return (
        <CustomTable columns={columns} data={programms} onClick={handleClick} />
    )
};

export default ProgrammsTable