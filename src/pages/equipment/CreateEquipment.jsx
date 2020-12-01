import React, { useState, useCallback } from "react";
import { Form, ProgressBar, Alert, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import api from "../../services/api";

function CreateEquipment() {
    const [pageTitle] = useState("Cadastro de Equipamento");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
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
    
        api.post('/equipments', {
                name, 
                description,
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
    }, [name, description]);
    
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

                <Button variant="danger" type="reset" size="sm" block>
                    { btnCancel }
                </Button>
            </Form>
        </PageLayout>
    );
}

export default CreateEquipment;