import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Programm} from "modules/types.ts";

interface Props {
    selectedProgramm: T_Programm | null
}

const Breadcrumbs = ({ selectedProgramm }: Props) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{location.pathname == "/" &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/programms") &&
                <BreadcrumbItem active>
                    <Link to="/programms">
						Программы
                    </Link>
                </BreadcrumbItem>
			}
            {selectedProgramm &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedProgramm.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs