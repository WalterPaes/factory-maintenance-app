import React, { useState, useCallback, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import api from "../../services/api";

function EditUser({ match }) {
    const [pageTitle] = useState("Editar Usuário");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [btnSave] = useState("Salvar");
    const [btnCancel] = useState("Cancelar");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [errors, setErrors] = useState(false);
    
    const handleSubmit = useCallback((event)=>{
        event.preventDefault();

        setIsSuccess(false);
        setErrorMsg(false);
        setIsLoading(true);
    
        let user_id = match.params.user_id;

        api.put('/users/' + user_id, {
                name, 
                username, 
                password,
                status
            })
              .then((response) => {
                setIsLoading(false);
                setIsSuccess(true);
              })
              .catch((error) => {
                if (error.response.status === 401) {
                    window.location.href = "/logout";
                }

                setIsLoading(false);
                if (error.response.status === 422) {
                    setErrorMsg('Preencha corretamente o formulário!')
                    setErrors(error.response.data);
                }
                
                if (error.response.status === 500) {
                    setErrorMsg('Um erro ocorreu!')
                }
              });
    }, [name, username, password, status, match.params.user_id]);

    useEffect(() => {
        let user_id = match.params.user_id;
        
        api.get('/users/' + user_id)
          .then((response) => {
            let user = response.data;
            setName(user.name);
            setUsername(user.username);
            setStatus(user.status);
          })
          .catch((error) => {
            setErrorMsg('Um erro ocorreu!')
            if (error.response.status === 401) {
                window.location.href = "/logout";
            }
          });
    }, [match.params.user_id]);

    return(
        <PageLayout pageTitle={pageTitle} size="md">
            <FormAlertState
                success={isSuccess}
                error={errorMsg}
                errors={errors}
                loading={isLoading}
            />

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

                <Form.Group controlId="formStatus">
                    <Form.Control as="select" onChange={(event) => {
                        setStatus(event.target.value);
                    }}>
                        <option value={1}>Ativo</option>
                        <option value={0}>Inativo</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" size="sm" block disabled={isLoading}>
                    { btnSave }
                </Button>

                <Button href={"/usuario/" + match.params.user_id} variant="danger" size="sm" block disabled={isLoading}>
                    { btnCancel }
                </Button>
            </Form>
        </PageLayout>
    );
}

export default EditUser;