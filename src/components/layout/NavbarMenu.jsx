import React from "react";
import {Navbar, NavDropdown, Nav} from "react-bootstrap";

function NavbarMenu() {
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Gerenciamento</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
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

                    <NavDropdown title="Manutenções">
                        <NavDropdown.Item href="/manutencao">Lista de Manutenções</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/cadastrar-manutencao">Adicionar Manutenção</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarMenu;