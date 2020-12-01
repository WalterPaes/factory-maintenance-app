import React, { useState, useCallback } from "react";
import { Form, Button, ProgressBar, Alert } from "react-bootstrap";
import PageLayout from "./layout/PageLayout";
import api from "../services/api"

function UsersForm() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [btnSave] = useState("Salvar");
    const [btnCancel] = useState("Cancelar");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errors, setErrors] = useState(false);
    
    const handleSubmit = useCallback((event)=>{
        event.preventDefault();

        setIsLoading(true);
    
        api.post('/users', {
                name, 
                username, 
                password
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
              .then((response) => {
                setIsLoading(false);
                setHasError(false);
                setIsSuccess(true);
              })
              .catch((error) => {
                setIsLoading(false);
                setIsSuccess(false);
                setHasError(true);
                console.log(error.response);
                setErrors(error.response.data);
              });
    
      }, [name, username, password]);

    return(
        <PageLayout pageTitle="Cadastro de Usuário">
            {isSuccess &&
                <Alert variant="success">
                    <strong>SUCESSO!</strong>
                </Alert>
            }
            
            {hasError &&
                <Alert variant="danger">
                    <strong>ERRO!</strong> Preencha corretamente o formulário.
                    <ul className="text-left">
                        {Object.keys(errors).map((key) => (
                            <li>{errors[key]}</li>
                        ))}
                    </ul>
                </Alert>
            }
            
            {isLoading &&
                <ProgressBar animated now={100}/>
            }

            <Form onSubmit={handleSubmit}>
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

                <Button variant="primary" type="submit" size="sm" block disabled={isLoading}>
                    { btnSave }
                </Button>

                <Button variant="danger" type="reset" size="sm" block disabled={isLoading}>
                    { btnCancel }
                </Button>
            </Form>
        </PageLayout>
    );
}

export default UsersForm;