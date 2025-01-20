import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchProgramms, updateProgrammName} from "store/slices/programmsSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import ProgrammsTable from "components/ProgrammsTable/ProgrammsTable.tsx";

const ProgrammsTablePage = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {programms, programm_name} = useAppSelector((state) => state.programms)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateProgrammName(e.target.value))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchProgramms())
    }

    useEffect(() => {
        dispatch(fetchProgramms())
    }, [])

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_authenticated, is_superuser]);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={programm_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col className="d-flex flex-row justify-content-end" md="6">
                    <Link to="/programms/add">
                        <Button color="primary">Создать программа</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {programms.length > 0 ? <ProgrammsTable programms={programms} fetchProgramms={fetchProgramms}/> : <h3 className="text-center mt-5">Программы не найдены</h3>}
            </Row>
        </Container>
    );
};

export default ProgrammsTablePage