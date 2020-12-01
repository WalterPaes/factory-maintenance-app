import React, { useState, useCallback, useEffect } from "react";
import { Form, ProgressBar, Alert, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import api from "../../services/api";

function CreateMaintenance() {
    const [pageTitle] = useState("Cadastro de Manutenção");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [description, setDescription] = useState("");
    const [equipments, setEquipments] = useState([]);
    const [equipment_id, setEquipmentId] = useState("");
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
    
        api.post('/maintenances', {
                start,
                end,
                description,
                equipment_id
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
    }, [start, end, description, equipment_id]);

    useEffect(() => {
        api.get('/equipments', {},{
            headers: {
                'Content-Type': 'application/json'
            }
        })
          .then((response) => {
            setEquipments(response.data.data);
          })
          .catch((error) => {
            console.log(error.response)
          });
    }, []);
    
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
                <Form.Group controlId="formStartDate">
                    <Form.Control type="text" placeholder="Horário de Início" value={start} 
                    onChange={(event) => {
                        setStart(event.target.value)
                    }}
                    />
                </Form.Group>
                
                <Form.Group controlId="formEndDate">
                    <Form.Control type="text" placeholder="Horário do Fim" value={end} 
                    onChange={(event) => {
                        setEnd(event.target.value)
                    }}/>
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Control as="textarea" rows={3}
                    placeholder="Descrição" value={description}
                    onChange={(event) => {
                        setDescription(event.target.value)
                    }}/>
                </Form.Group>

                <Form.Group controlId="formEquipment">
                    <Form.Control as="select" onChange={(event) => {
                        setEquipmentId(event.target.value);
                    }}>
                        <option disabled selected>Selecione...</option>
                        {equipments.map((equipment) => (
                            <option value={equipment.id}>{equipment.name}</option>
                        ))}
                    </Form.Control>
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

export default CreateMaintenance;