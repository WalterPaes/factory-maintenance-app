import React, { useState, useCallback, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import api from "../../services/api";

function EditEquipment({ match }) {
    const [pageTitle] = useState("Editar Equipamento");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
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

        let equipment_id = match.params.equipment_id;
    
        api.put('/equipments/' + equipment_id, {
                name, 
                description,
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
    }, [name, description, match.params.equipment_id]);

    useEffect(() => {
        let equipment_id = match.params.equipment_id;
        
        api.get('/equipments/' + equipment_id)
          .then((response) => {
            let equipment = response.data;
            setName(equipment.name);
            setDescription(equipment.description);
          })
          .catch((error) => {
            setErrorMsg('Um erro ocorreu!')
            if (error.response.status === 401) {
                window.location.href = "/logout";
            }
          });
    }, [match.params.equipment_id]);
    
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

                <Form.Group controlId="formDescription">
                    <Form.Control as="textarea" rows={3}
                    placeholder="Descrição" value={description}
                    onChange={(event) => {
                        setDescription(event.target.value)
                    }}/>
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