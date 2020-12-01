import React, { useState, useCallback, useEffect } from "react";
import { Form, ProgressBar, Alert, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import api from "../../services/api";

function EditUser({ match }) {
    const [pageTitle] = useState("Editar Usuário");
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

        setIsSuccess(false);
        setHasError(false);
        setIsLoading(true);
    
        let user_id = match.params.user_id;

        api.put('/users/' + user_id, {
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
                setIsSuccess(true);
              })
              .catch((error) => {
                setIsLoading(false);
                setHasError(true);
                setErrors(error.response.data);
              });
    }, [name, username, password, match.params.user_id]);

    useEffect(() => {
        let user_id = match.params.user_id;
        
        api.get('/users/' + user_id, {},{
            headers: {
                'Content-Type': 'application/json'
            }
        })
          .then((response) => {
            let user = response.data;
            setName(user.name);
            setUsername(user.username);
          })
          .catch((error) => {
            console.log(error.response.data);
          });
    }, [match.params.user_id]);

    return(
        <PageLayout pageTitle={pageTitle}>
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
                <ProgressBar animated now={100} className="mb-3"/>
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

export default EditUser;