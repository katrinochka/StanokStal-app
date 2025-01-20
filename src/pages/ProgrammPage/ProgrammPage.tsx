import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchProgramm, removeSelectedProgramm} from "store/slices/programmsSlice.ts";

const ProgrammPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {programm} = useAppSelector((state) => state.programms)

    useEffect(() => {
        dispatch(fetchProgramm(id))
        return () => dispatch(removeSelectedProgramm())
    }, []);

    if (!programm) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={programm.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6" className="d-flex flex-md-column gap-md-3">
                    <div className="header-text" style={{ fontSize: '40px' }}>{programm.name}</div>
                    <p className="fs-5">Описание: {programm.description}</p>
                    <p className="fs-5">Цена: {programm.price} руб.</p>
                    <p className="fs-5">Материал: {programm.material}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ProgrammPage