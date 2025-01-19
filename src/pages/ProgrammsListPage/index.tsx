import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {T_Programm} from "src/modules/types.ts";
import ProgrammCard from "components/ProgrammCard";
import {ProgrammMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect} from "react";
import * as React from "react";

type Props = {
    programms: T_Programm[],
    setProgramms: React.Dispatch<React.SetStateAction<T_Programm[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    programmName: string,
    setProgrammName: React.Dispatch<React.SetStateAction<string>>
}

const ProgrammsListPage = ({programms, setProgramms, isMock, setIsMock, programmName, setProgrammName}:Props) => {

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/programms/?programm_name=${programmName.toLowerCase()}`)
            const data = await response.json()
            setProgramms(data.programms)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    const createMocks = () => {
        setIsMock(true)
        setProgramms(ProgrammMocks.filter(programm => programm.name.toLowerCase().includes(programmName.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Container className="programms-page">
            <Row className="mb-5 justify-content-center">
                <Col md="8">
                   <form className="search-bar" onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input
                                    type="text"
                                    className="form-control rounded-input"
                                    placeholder="Поиск программ"
                                    value={programmName}
                                    onChange={(e) => setProgrammName(e.target.value)}
                                />
                            </Col>
                             <Col md="4" className="col-md-4">
                                <Button type="submit" color="primary" className="btn btn-primary search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
            <div className="cards-wrapper card-body d-flex flex-column">
                <Row>
                    {programms?.map(programm => (
                       <Col key={programm.id} xs="12" md="4" className="mb-4">
                         <ProgrammCard programm={programm} isMock={isMock}/>
                       </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
};

export default ProgrammsListPage