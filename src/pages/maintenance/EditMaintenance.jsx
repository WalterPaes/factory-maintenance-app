import React, { useState, useCallback, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import MaintenanceService from "../../services/MaintenanceService";
import EquipmentService from "../../services/EquipmentService";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBr from 'date-fns/locale/pt-BR'
registerLocale('pt-BR', ptBr)

function EditMaintenance({ match }) {
    const [pageTitle] = useState("Editar Manutenção");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(start);
    const [description, setDescription] = useState("");
    const [equipments, setEquipments] = useState([]);
    const [equipment_id, setEquipmentId] = useState("");
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

        let id = match.params.maintenance_id

        MaintenanceService.edit(id, {start, end, description, equipment_id}).then((response) => {
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
    }, [start, end, description, equipment_id, match.params.maintenance_id]);

    useEffect(() => {
        EquipmentService.actives().then((response) => {
            switch(response.status) {
                case 200:
                    setEquipments(response.data.data);
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
            }
        });
    }, []);

    useEffect(() => {
        let id = match.params.maintenance_id;
        
        MaintenanceService.show(id).then((response) => {
            switch(response.status) {
                case 200:
                    let maintenance = response.data;
                    setStart(new Date(maintenance.start))
                    setEnd(new Date(maintenance.end))
                    setDescription(maintenance.description)
                    setEquipmentId(maintenance.equipment_id)
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
            }
        });
    }, [match.params.maintenance_id]);
    
    return(
        <PageLayout pageTitle={pageTitle} size="md">
            <FormAlertState
                success={isSuccess}
                error={errorMsg}
                errors={errors}
                loading={isLoading}
            />

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formStartDate">
                    <Form.Label>Horário Inicial</Form.Label>
                    <br/>
                    <DatePicker
                        dateFormat="yyyy-MM-dd HH:mm"
                        selected={start}
                        onChange={date => setStart(date)}
                        customInput={<Form.Control />}
                        timeInputLabel="Horário:"
                        showTimeInput
                        locale="pt-BR"
                    ></DatePicker>
                </Form.Group>
                
                <Form.Group controlId="formEndDate">
                <Form.Label>Horário Final</Form.Label>
                    <br/>
                    <DatePicker
                        dateFormat="yyyy-MM-dd HH:mm"
                        selected={end}
                        onChange={date => setEnd(date)}
                        customInput={<Form.Control />}
                        timeInputLabel="Horário:"
                        showTimeInput
                        locale="pt-BR"
                    ></DatePicker>
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