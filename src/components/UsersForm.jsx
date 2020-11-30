import React, { useState } from "react";
import { Form, Button, ProgressBar, Alert } from "react-bootstrap";
import PageLayout from "./layout/PageLayout";

function UsersForm() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [btnSave] = useState("Salvar");
    const [btnCancel] = useState("Cancelar");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(false);
    
    return(
        <PageLayout pageTitle="Cadastro de Usuário">
            <Alert variant='danger'>
                ERRO! Preencha corretamente o formulário!
            </Alert>

            {isLoading &&
                <ProgressBar animated now={100}/>
            }

            <Form onSubmit={onSubmit}>
                <Form.Group controlId="formName">
                    <Form.Control type="text" placeholder="Nome" value={name} 
                    onChange={(event) => {
                        setName(event.target.value)
                    }}
                    />
                </Form.Group>
                
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

                <Button variant="primary" type="submit" size="sm" block>
                    { btnSave }
                </Button>

                <Button variant="danger" type="reset" size="sm" block>
                    { btnCancel }
                </Button>
            </Form>
        </PageLayout>
    );

    function onSubmit(event) {
        event.preventDefault();
    
        setIsLoading(true);

        fetch("http://127.0.0.1:8001/api/users", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, username, password})
        })
        .then((response) => {
            if (response.status !== 201) {
                return response.json();
            }
            return true;
        })
        .then(
            (result) => {
                console.log(result);
                setIsLoading(false);
                setErrors(result);
            }
        );
    }
}

export default UsersForm;