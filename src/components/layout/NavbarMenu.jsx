import React, {useState, useEffect} from "react";
import {Navbar, NavDropdown, Nav} from "react-bootstrap";
import AuthService from "../../services/AuthService"

function NavbarMenu() {
    const [username, setUsername] = useState(null);
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        let user = AuthService.getUser();
        if (user) {
            setUsername(user.user.username);
        }

        setLogged(AuthService.logged());
    }, []);

    return(
        <Navbar bg="success" variant="dark" expand="lg" className="bg-success mb-3">
            <Navbar.Brand href="/home">Gerenciamento</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {logged &&
                    <>
                    <NavDropdown title="Usuários">
                        <NavDropdown.Item href="/usuarios">Lista de Usuários</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/cadastrar-usuario">Cadastro de Usuário</NavDropdown.Item>
                    </NavDropdown>
                    

                    <NavDropdown title="Equipamentos">
                        <NavDropdown.Item href="/equipamentos">Lista de Equipamentos</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/cadastrar-equipamento">Cadastro de Equipamentos</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Componentes">
                        <NavDropdown.Item href="/componentes">Lista de Componentes</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/cadastrar-componente">Cadastro de Componentes</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Manutenções">
                        <NavDropdown.Item href="/manutencao">Lista de Manutenções</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/cadastrar-manutencao">Adicionar Manutenção</NavDropdown.Item>
                    </NavDropdown>
                    </>
                    }
                </Nav>
                {username &&
                        <Nav className="justify-content-end">
                            <NavDropdown title={username}>
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    }
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarMenu;