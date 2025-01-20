import {Button, Card, Col, Row} from "reactstrap";
import {E_ManufactureStatus, T_Manufacture} from "modules/types.ts";
import {formatDate} from "utils/utils.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {acceptManufacture, fetchManufactures, rejectManufacture} from "store/slices/manufacturesSlice.ts";

type Props = {
    manufacture: T_Manufacture
    index: number
}

const ManufactureCard = ({manufacture, index}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const handleAcceptManufacture = async (manufacture_id) => {
        await dispatch(acceptManufacture(manufacture_id))
        await dispatch(fetchManufactures())
    }

    const handleRejectManufacture = async (manufacture_id) => {
        await dispatch(rejectManufacture(manufacture_id))
        await dispatch(fetchManufactures())
    }

    const navigate = useNavigate()

    const openManufacturePage = () => {
        navigate(`/manufactures/${manufacture.id}`)
    }

    const STATUSES = {
        1: "Введен",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    return (
        <Card style={{padding: "10px"}}>
            <Row>
                <Col md={1}>
                    {index + 1}
                </Col>
                <Col md={1}>
                    {STATUSES[manufacture.status]}
                </Col>
                <Col md={1}>
                    {manufacture.marriage != null ? manufacture.marriage ? "Да" : "Нет" : ""}
                </Col>
                <Col>
                    {formatDate(manufacture.date_created)}
                </Col>
                <Col>
                    {formatDate(manufacture.date_formation)}
                </Col>
                <Col>
                    {formatDate(manufacture.date_complete)}
                </Col>
                {!is_superuser &&
                    <Col>
                        <Button color="primary" onClick={openManufacturePage}>Открыть</Button>
                    </Col>
                }
                {is_superuser &&
                    <>
                        <Col>
                            {manufacture.owner}
                        </Col>
                        <Col>
                            {manufacture.status == E_ManufactureStatus.InWork && <Button color="primary" onClick={() => handleAcceptManufacture(manufacture.id)}>Принять</Button>}
                        </Col>
                        <Col>
                            {manufacture.status == E_ManufactureStatus.InWork && <Button color="primary" onClick={() => handleRejectManufacture(manufacture.id)}>Отклонить</Button>}
                        </Col>
                    </>
                }
            </Row>
        </Card>
    )
}

export default ManufactureCard