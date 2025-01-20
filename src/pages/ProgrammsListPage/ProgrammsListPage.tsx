import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchProgramms, updateProgrammName} from "store/slices/programmsSlice.ts";
import ProgrammCard from "components/ProgrammCard/ProgrammCard.tsx";
import Bin from "components/Bin/Bin.tsx";

const ProgrammsListPage = () => {

    const dispatch = useAppDispatch()

    const {programms, programm_name} = useAppSelector((state) => state.programms)

    const {is_authenticated} = useAppSelector((state) => state.user)

    const {draft_manufacture_id, programms_count} = useAppSelector((state) => state.manufactures)

    const hasDraft = draft_manufacture_id != null

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

    return (
        <Container className="programms-page">
            <Row className="mb-5 justify-content-center">
                <Col md="6">
                    <Form className="search-bar" onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={programm_name} onChange={handleChange} className="form-control rounded-input" placeholder="Поиск программ"></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="btn btn-primary search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                {is_authenticated &&
                    <Col className="d-flex flex-row justify-content-end" md="6">
                        <Bin isActive={hasDraft} draft_manufacture_id={draft_manufacture_id} programms_count={programms_count} />
                    </Col>
                }
            </Row>
            <Row className="mt-5 d-flex">
                {programms?.map(programm => (
                    <Col key={programm.id} className="mb-4 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <ProgrammCard programm={programm} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProgrammsListPage