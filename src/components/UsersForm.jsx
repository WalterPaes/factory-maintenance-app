import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

function UsersForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    return(
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Form onSubmit={(event) => {
                        event.preventDefault();
                        console.log({username, password})
                    }}>
                        <Form.Group controlId="formUserName">
                            <Form.Control type="text" placeholder="Username" value={username} 
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}/>
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Control type="password" placeholder="Senha" value={password}
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" block>
                            Acessar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default UsersForm;