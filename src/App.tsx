import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import ProgrammPage from "pages/ProgrammPage";
import ProgrammsListPage from "pages/ProgrammsListPage";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import {useState} from "react";
import {T_Programm} from "modules/types.ts";

function App() {

    const [programms, setProgramms] = useState<T_Programm[]>([])

    const [selectedProgramm, setSelectedProgramm] = useState<T_Programm | null>(null)

    const [isMock, setIsMock] = useState(false);

    return (
        <>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedProgramm={selectedProgramm}/>
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/programms/" element={<ProgrammsListPage programms={programms} setProgramms={setProgramms} isMock={isMock} setIsMock={setIsMock} />} />
                        <Route path="/programms/:id" element={<ProgrammPage selectedProgramm={selectedProgramm} setSelectedProgramm={setSelectedProgramm} isMock={isMock} setIsMock={setIsMock} />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App
