import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {T_Programm} from "modules/types.ts";
import {
    removeProgrammFromDraftManufacture,
    updateProgrammValue
} from "store/slices/manufacturesSlice.ts";
import {useEffect, useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {addProgrammToManufacture, fetchProgramms} from "store/slices/programmsSlice.ts";

type Props = {
    programm: T_Programm,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean
}

const ProgrammCard = ({programm, showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser} = useAppSelector((state) => state.user)

    const {save_mm} = useAppSelector(state => state.manufactures)

    const [local_duration, setLocal_duration] = useState(programm.duration)

    const location = useLocation()

    const isManufacturePage = location.pathname.includes("manufactures")

    const handeAddToDraftManufacture = async () => {
        await dispatch(addProgrammToManufacture(programm.id))
        await dispatch(fetchProgramms())
    }

    const handleRemoveFromDraftManufacture = async () => {
        await dispatch(removeProgrammFromDraftManufacture(programm.id))
    }

    useEffect(() => {
        save_mm && updateValue()
    }, [save_mm]);

    const updateValue = async () => {
        dispatch(updateProgrammValue({
            programm_id: programm.id,
            duration: local_duration
        }))
    }

    if (isManufacturePage) {
        return (
            <Card key={programm.id} className="card w-100 mb5">
                <Row>
                    <Col className="col-md-4 d-flex justify-content-center">
                        <img
                            alt=""
                            src={programm.image}
                            style={{"width": "100%"}}
                            className = "card-manufacture d-flex justify-content-center"
                        />
                    </Col>
                    <Col md={8} className="cards-wrapper d-flex flex-column">
                        <CardBody className = "card w-100 mb5">
                            <CardTitle tag="h5">
                                {programm.name}
                            </CardTitle>
                            <CardText>
                                Цена: {programm.price} руб.
                            </CardText>
                            <CustomInput label="Длительность (мин)" type="number" value={local_duration} setValue={setLocal_duration} disabled={!editMM || is_superuser} className={"w-25"}/>
                            <Col className="d-flex gap-5">
                                <Link to={`/programms/${programm.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {showRemoveBtn &&
                                    <Button color="primary" onClick={handleRemoveFromDraftManufacture}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={programm.id}  style={{width: '18rem', margin: "0 auto 50px" }}>
            <img
                alt=""
                src={programm.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {programm.name}
                </CardTitle>
                <CardText>
                    Цена: {programm.price} руб.
                </CardText>
                <Col className="card-btns d-flex justify-content-between">
                    <Link to={`/programms/${programm.id}`}>
                        <Button color="primary" type="button">
                            Подробнее
                        </Button>
                    </Link>
                    {!is_superuser && showAddBtn &&
                        <Button color="primary" onClick={handeAddToDraftManufacture}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default ProgrammCard