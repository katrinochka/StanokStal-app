import {Link} from "react-router-dom";
import {Badge, Button} from "reactstrap";

type Props = {
    isActive: boolean,
    draft_manufacture_id: string,
    programms_count: number
}

const Bin = ({isActive, draft_manufacture_id, programms_count}:Props) => {

    if (!isActive) {
        return <Button color={"secondary"} className="bin-wrapper" disabled>
            <img src="http://localhost:9000/images/busket.png"/>
        </Button>
    }

    return (
        <Link to={`/manufactures/${draft_manufacture_id}/`} className="bin-wrapper col md-4 justify-end">
            <Button color={"primary"} className="row justify-content-between align-items-center w-100 bin col-md-2">
                <Badge class="badge position-relative badge rounded-pill" style={{float: "right"}}>
                    {programms_count}
                </Badge>
                <img src="http://localhost:9000/images/busket.png"/>
            </Button>
        </Link>
    )
}

export default Bin