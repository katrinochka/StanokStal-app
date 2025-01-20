import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {NavLink as RRNavLink} from "react-router-dom";
import {useState} from "react";

const Header = () => {

	const [collapsed, setCollapsed] = useState(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	const hideMenu = () => setCollapsed(true)

    return (
		<header>
			<Navbar collapseOnSelect className="p-0" expand="lg" dark>
				<Container className="p-0 d-flex align-items-center">
					<Navbar collapseOnSelect expand="lg" dark>
						<NavbarBrand tag={RRNavLink} to="/">
							<img src="http://localhost:9000/images/header.png" className="header-image"/>
						</NavbarBrand>
						<NavbarToggler aria-controls="responsive-navbar-nav" onClick={toggleNavbar} />
						<Collapse id="responsive-navbar-nav" navbar isOpen={!collapsed}>
							<Nav className="mr-auto fs-5 d-flex flex-grow-1 justify-content-end align-items-center" navbar>
								<NavItem>
									<NavLink tag={RRNavLink} onClick={hideMenu} to="/programms" className = "header-text">
										Программы
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</Navbar>
				</Container>
			</Navbar>
		</header>
    );
};

export default Header