import React, { useState } from "react";
import { Form, Button, ProgressBar, Alert } from "react-bootstrap";
import PageLayout from "./layout/PageLayout";

function MaintenanceForm() {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [description, setDescription] = useState("");
    const [btnSave] = useState("Salvar");
    const [btnCancel] = useState("Cancelar");
    
    return(
        <PageLayout pageTitle="Cadastro de Manutenção">
            <Form>
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

export default MaintenanceForm;