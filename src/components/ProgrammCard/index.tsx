import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import mockImage from "assets/mock.png";
import {Link} from "react-router-dom";
import {T_Programm} from "modules/types.ts";

interface ProgrammCardProps {
    programm: T_Programm,
    isMock: boolean
}

const ProgrammCard = ({programm, isMock}: ProgrammCardProps) => {
    return (
        <Card key={programm.id} style={{width: '18rem', margin: "0 auto 50px" }}>
            <CardImg
                src={isMock ? mockImage as string : programm.image}
                style={{"height": "200px"}}
            />
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle tag="h5">
                    {programm.name}
                </CardTitle>
                <CardText>
                    Цена: {programm.price} руб.
                </CardText>
                <Link to={`/programms/${programm.id}`}>
                    <Button color="primary">
                        Подробнее
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default ProgrammCard