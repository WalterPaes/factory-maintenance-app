import React, { useState } from "react";
import { Form, Button, ProgressBar, Alert } from "react-bootstrap";
import PageLayout from "./layout/PageLayout";

function MaintenanceForm() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [btnSave] = useState("Salvar");
    const [btnCancel] = useState("Cancelar");
    
    return(
        <PageLayout pageTitle="Cadastro de Manutenção">
            <Form>
                

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