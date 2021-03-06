import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import AuthService from "../../services/AuthService";

function LoginForm() {
    const [title] = useState("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [btnLogin] = useState("Acessar");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [errors, setErrors] = useState(false);

    const handleSubmit = useCallback((event)=>{
        event.preventDefault();

        setErrorMsg(false);
        setIsLoading(true);

        AuthService.login({username, password}).then((response) => {
            setIsLoading(false);

            if (response.status === 200) {
                AuthService.saveUser(response.data);
                window.location.href = "/home";
            }

            if (response.status === 401) {
                window.location.href = "/logout";
            }

            if (response.status === 422) {
                setErrorMsg('Preencha corretamente o formulário!')
                setErrors(response.data);
            }
            
            if (response.status === 500) {
                setErrorMsg('Um erro ocorreu!')
            }
        });
    }, [username, password]);

    return(
        <PageLayout pageTitle={title} size="sm">
            {!AuthService.logged &&
                <Redirect to="/home"/>
            }

            <FormAlertState
                success={isSuccess}
                error={errorMsg}
                errors={errors}
                loading={isLoading}
            />

            <Form onSubmit={handleSubmit}>
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
                    { btnLogin }
                </Button>
            </Form>
        </PageLayout>
    );
}

export default LoginForm;