import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import ProgrammCard from "components/ProgrammCard";
import {ChangeEvent, FormEvent, useEffect} from "react";
import * as React from "react";
import {useAppSelector} from "src/store/store.ts";
import {updateProgrammName} from "src/store/slices/programmsSlice.ts";
import {T_Programm} from "modules/types.ts";
import {ProgrammMocks} from "modules/mocks.ts";
import {useDispatch} from "react-redux";

type Props = {
    programms: T_Programm[],
    setProgramms: React.Dispatch<React.SetStateAction<T_Programm[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const ProgrammsListPage = ({programms, setProgramms, isMock, setIsMock}:Props) => {

    const dispatch = useDispatch()

    const {programm_name} = useAppSelector((state) => state.programms)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateProgrammName(e.target.value))
    }

    const createMocks = () => {
        setIsMock(true)
        setProgramms(ProgrammMocks.filter(programm => programm.name.toLowerCase().includes(programm_name.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        await fetchProgramms()
    }

    const fetchProgramms = async () => {
        try {
            const env = await import.meta.env;
            const response = await fetch(`${env.VITE_API_URL}/api/programms/?programm_name=${programm_name.toLowerCase()}`)
            const data = await response.json()
            setProgramms(data.programms)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    useEffect(() => {
        fetchProgramms()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
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
            </Row>
            <Row>
                {programms?.map(programm => (
                    <Col key={programm.id} sm="12" md="6" lg="4" className="mb-4">
                        <ProgrammCard programm={programm} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProgrammsListPage