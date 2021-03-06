import React, { useState, useCallback } from "react";
import { Form, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import ComponentService from "../../services/ComponentService";

function CreateComponent() {
    const [pageTitle] = useState("Cadastro de Componente");
    const [name, setName] = useState("");
    const [serial_number, setSerialNumber] = useState("");
    const [model, setModel] = useState("");
    const [manufacturer, setManufacturer] = useState("");
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
    
        ComponentService.create({name, serial_number, model, manufacturer}).then((response) => {
            setIsLoading(false);

            if (response.status === 201) {
                setIsSuccess(true);
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
    }, [name, serial_number, model, manufacturer]);
    
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

                <Form.Group controlId="formSerialNumber">
                    <Form.Control type="text" placeholder="Nº de Série" value={serial_number} 
                    onChange={(event) => {
                        setSerialNumber(event.target.value)
                    }}
                    />
                </Form.Group>

                <Form.Group controlId="formModel">
                    <Form.Control type="text" placeholder="Modelo" value={model} 
                    onChange={(event) => {
                        setModel(event.target.value)
                    }}
                    />
                </Form.Group>

                <Form.Group controlId="formManufacturer">
                    <Form.Control type="text" placeholder="Fabricante" value={manufacturer} 
                    onChange={(event) => {
                        setManufacturer(event.target.value)
                    }}
                    />
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
}

export default CreateComponent;