import {useMemo} from "react";
import {formatDate} from "./utils.ts";
import {T_Manufacture} from "./manufacturesSlice.ts";
import CustomTable from "./CustomTable.tsx";

const ManufacturesTable = ({manufactures}:{manufactures:T_Manufacture[]}) => {

    // const handleClick = (manufacture_id) => {
    //     navigate(`/manufactures/${manufacture_id}`)
    // }

    const STATUSES = {
        1: "Введен",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Статус',
                accessor: 'status',
                Cell: ({ value }) => STATUSES[value]
            },
            {
                Header: 'Брак',
                accessor: 'marriage',
                Cell: ({ value }) => value != null ? value ? "Да" : "Нет" : ""
            },
            {
                Header: 'Дата создания',
                accessor: 'date_created',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата формирования',
                accessor: 'date_formation',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата завершения',
                accessor: 'date_complete',
                Cell: ({ value }) => formatDate(value)
            }
        ],
        []
    )

    return (
        <CustomTable columns={columns} data={manufactures} onClick={handleClick}/>
    )
};

export default ManufacturesTable