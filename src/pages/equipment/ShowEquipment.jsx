import React, {useState, useEffect, useCallback} from "react";
import { Card, Row, Col, Badge, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import EquipmentService from "../../services/EquipmentService";

function ShowEquipment({ match }) {
    const [pageTitle] = useState("Detalhes do Equipamento");
    const [equipment, setEquipment] = useState([]);
    const [btnEdit] = useState("Editar");
    const [btnDelete] = useState("Excluir");
    const [maintenances, setMaintenances] = useState([]);
    const [errorMsg, setErrorMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let equipment_id = match.params.equipment_id;
        
        EquipmentService.show(equipment_id).then((response) => {
            switch(response.status) {
                case 200:
                    setEquipment(response.data);
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
            }
        });
    }, [match.params.equipment_id]);

    const handleDelete = useCallback((event)=>{
        event.preventDefault();

        setErrorMsg(false);
        setIsLoading(true);
    
        let id = match.params.equipment_id;

        EquipmentService.delete(id).then((response) => {
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
    }, [match.params.equipment_id]);

    useEffect(() => {
        let equipment_id = match.params.equipment_id;
        
        EquipmentService.maintenances(equipment_id).then((response) => {
            switch(response.status) {
                case 200:
                    setMaintenances(response.data.data);
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
            }
        });
    }, [match.params.equipment_id]);

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
                        <p>{equipment.id}</p>
                    </Col>

                    <Col>
                        <h5>NOME</h5>
                        <p>{equipment.name}</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h5>DATA DE CRIAÇÃO</h5>
                        <p>{equipment.created_at}</p>
                    </Col>

                    <Col>
                        <h5>STATUS</h5>
                        {equipment.status ? (
                            <Badge variant="success">Ativo</Badge>
                        ) : (
                            <Badge variant="danger">Inativo</Badge>
                        )}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h5>DESCRIÇÃO</h5>
                        <p>{equipment.description}</p>
                    </Col>
                </Row>

                {maintenances.length > 0 &&
                    <Row>
                        <Col>
                            <h5>MANUTENÇÕES DESSE EQUIPAMENTO</h5>
                            <ListGroup>
                                {maintenances.map((maintenance) => (
                                    <ListGroup.Item>
                                        <Link to={"/manutencao/" + maintenance.id}>
                                            Manutenção #{maintenance.id}
                                        </Link>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                }
            </Card>

            <Button href={"/editar-equipamento/" + equipment.id} variant="primary" size="sm" block>
                { btnEdit }
            </Button>

            <Button variant="danger" type="button" size="sm" block onClick={handleDelete}>
                { btnDelete }
            </Button>
        </PageLayout>
    );
}

export default ShowEquipment;