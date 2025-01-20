import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import ProgrammsListPage from "pages/ProgrammsListPage/ProgrammsListPage.tsx";
import ProgrammPage from "pages/ProgrammPage/ProgrammPage.tsx";
import ManufacturesPage from "pages/ManufacturesPage/ManufacturesPage.tsx";
import ManufacturePage from "pages/ManufacturePage/ManufacturePage.tsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.tsx";
import AccessDeniedPage from "pages/AccessDeniedPage/AccessDeniedPage.tsx";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import ProgrammsTablePage from "pages/ProgrammsTablePage/ProgrammsTablePage.tsx";
import ProgrammEditPage from "pages/ProgrammEditPage/ProgrammEditPage.tsx";
import ProgrammAddPage from "pages/ProgrammAddPage/ProgrammAddPage.tsx";

function App() {
    return (
        <div>
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} />
                        <Route path="/programms/" element={<ProgrammsListPage />} />
                        <Route path="/programms-table/" element={<ProgrammsTablePage />} />
                        <Route path="/programms/:id/" element={<ProgrammPage />} />
                        <Route path="/programms/:id/edit" element={<ProgrammEditPage />} />
                        <Route path="/programms/add" element={<ProgrammAddPage />} />
                        <Route path="/manufactures/" element={<ManufacturesPage />} />
                        <Route path="/manufactures/:id/" element={<ManufacturePage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/403/" element={<AccessDeniedPage />} />
                        <Route path="/404/" element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
