import React, { useState, useCallback, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import api from "../../services/api";

function LoginForm() {
    const [title] = useState("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [btnLogin] = useState("Acessar");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errors, setErrors] = useState(false);

    const handleSubmit = useCallback((event)=>{
        event.preventDefault();

        setHasError(false);
        setIsLoading(true);
    
        api.post('/login', {username, password},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
              .then((response) => {
                setIsLoading(false);
              })
              .catch((error) => {
                setIsLoading(false);
                setHasError(true);
                setErrors(error.response.data);
              });
    }, [username, password]);

    return(
        <PageLayout pageTitle={title} size="sm">
            <FormAlertState
                success={isSuccess}
                error={hasError}
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