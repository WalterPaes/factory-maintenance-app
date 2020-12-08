import React, { useState, useCallback, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import ComponentService from "../../services/ComponentService";

function EditEquipment({ match }) {
    const [pageTitle] = useState("Editar Componente");
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

        let component_id = match.params.component_id;

        ComponentService.edit(component_id, {name, serial_number, model, manufacturer}).then((response) => {
            setIsLoading(false);

            if (response.status === 200) {
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
    }, [name, serial_number, model, manufacturer, match.params.component_id]);

    useEffect(() => {
        let component_id = match.params.component_id;
        
        ComponentService.show(component_id).then((response) => {
            switch(response.status) {
                case 200:
                    let component = response.data;
                    setName(component.name);
                    setSerialNumber(component.serial_number);
                    setModel(component.model);
                    setManufacturer(component.manufacturer);
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
            }
        });
    }, [match.params.component_id]);
    
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

                <Button href={"/equipamento/" + match.params.equipment_id} variant="danger" size="sm" block>
                    { btnCancel }
                </Button>
            </Form>
        </PageLayout>
    );
}

export default EditEquipment;