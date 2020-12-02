import React, { useState, useCallback, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import api from "../../services/api";

function EditMaintenance({ match }) {
    const [pageTitle] = useState("Editar Manutenção");
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

        let id = match.params.maintenance_id
    
        api.put('/maintenances' + id, {
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
                setHasError(false);
                setIsSuccess(true);
              })
              .catch((error) => {
                setIsLoading(false);
                setIsSuccess(false);
                setHasError(true);
                setErrors(error.response.data);
              });
    }, [start, end, description, equipment_id, match.params.maintenance_id]);

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

    useEffect(() => {
        let id = match.params.maintenance_id;
        
        api.get('/maintenances/' + id, {},{
            headers: {
                'Content-Type': 'application/json'
            }
        })
          .then((response) => {
            let maintenance = response.data;
            setStart(maintenance.start)
            setEnd(maintenance.end)
            setDescription(maintenance.description)
            setEquipmentId(maintenance.equipment_id)
          })
          .catch((error) => {
            console.log(error.response.data);
          });
    }, [match.params.maintenance_id]);
    
    return(
        <PageLayout pageTitle={pageTitle} size="md">
            <FormAlertState
                success={isSuccess}
                error={hasError}
                errors={errors}
                loading={isLoading}
            />

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

                <Button href={"/manutencao/" + match.params.maintenance_id} variant="danger" size="sm" block>
                    { btnCancel }
                </Button>
            </Form>
        </PageLayout>
    );
}

export default EditMaintenance;