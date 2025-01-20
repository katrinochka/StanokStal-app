import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {CardImg, Col, Container, Row} from "reactstrap";
import mockImage from "assets/mock.png";
import {T_Programm} from "modules/types.ts";
import {ProgrammMocks} from "modules/mocks.ts";

type Props = {
    selectedProgramm: T_Programm | null,
    setSelectedProgramm: React.Dispatch<React.SetStateAction<T_Programm | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const ProgrammPage = ({selectedProgramm, setSelectedProgramm, isMock, setIsMock}: Props) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const env = await import.meta.env;
            const response = await fetch(`${env.VITE_API_URL}/api/programms/${id}`)
            const data = await response.json()
            setSelectedProgramm(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedProgramm(ProgrammMocks.find(programm => programm?.id == parseInt(id as string)) as T_Programm)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedProgramm(null)
    }, []);

    if (!selectedProgramm) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <CardImg src={isMock ? mockImage as string : selectedProgramm.image} className="mb-3" />
                </Col>
                <Col md="6" className="d-flex flex-md-column gap-md-3">
                    <div className="header-text" style={{ fontSize: '40px' }}>{selectedProgramm.name}</div>
                    <p className="fs-5">Цена: {selectedProgramm.price} руб.</p>
                    <p className="fs-5">Описание: {selectedProgramm.description}</p>
                    <p className="fs-5">Материал: {selectedProgramm.material} </p>
                </Col>
            </Row>
        </Container>
    );
};

export default ProgrammPage