import React, {useState, useEffect, useCallback} from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import MaintenanceService from "../../services/MaintenanceService";

function ShowMaintenance({ match }) {
    const [pageTitle] = useState("Detalhes da Manutenção");
    const [btnEdit] = useState("Editar");
    const [btnDelete] = useState("Excluir");
    const [errorMsg, setErrorMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [maintenance, setMaintenance] = useState({
        equipment: {
            name: ""
        },
        user: {
            name: ""
        }
    });

    useEffect(() => {
        let maintenance_id = match.params.maintenance_id;
        
        MaintenanceService.show(maintenance_id).then((response) => {
            switch(response.status) {
                case 200:
                    setMaintenance(response.data);
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
            }
        });
    }, [match.params.maintenance_id]);
    
    const handleDelete = useCallback((event)=>{
        event.preventDefault();

        setErrorMsg(false);
        setIsLoading(true);
    
        let id = match.params.maintenance_id;

        MaintenanceService.delete(id).then((response) => {
            setIsLoading(false);

            if (response.status === 204) {
                window.location.href = "/usuarios";
            }

            if (response.status === 401) {
                window.location.href = "/logout";
            }
            
            if (response.status === 500) {
                setErrorMsg('Um erro ocorreu!')
            }
        });
    }, [match.params.maintenance_id]);

    return(
        <PageLayout pageTitle={pageTitle} size="lg">
            <FormAlertState
                success={false}
                error={errorMsg}
                errors={false}
                loading={isLoading}
            />

            <Card body className="text-left mb-3">
                <Row>
                    <Col>
                        <h5>ID</h5>
                        <p>{maintenance.id}</p>
                    </Col>

                    <Col>
                        <h5>DATA DE INÍCIO</h5>
                        <p>{maintenance.start}</p>
                    </Col>

                    <Col>
                        <h5>DATA DO FIM</h5>
                        <p>{maintenance.end}</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h5>EQUIPAMENTO</h5>
                        <p>{maintenance.equipment.name}</p>
                    </Col>

                    <Col>
                        <h5>USUÁRIO RESPONSÁVEL</h5>
                        <p>{maintenance.user.name}</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h5>DESCRIÇÃO DO SERVIÇO</h5>
                        <p>{maintenance.description}</p>
                    </Col>
                </Row>
            </Card>

            <Button href={"/editar-manutencao/" + maintenance.id} variant="primary" size="sm" block>
                { btnEdit }
            </Button>

            <Button variant="danger" type="button" size="sm" block onClick={handleDelete}>
                { btnDelete }
            </Button>
        </PageLayout>
    );
}

export default ShowMaintenance;