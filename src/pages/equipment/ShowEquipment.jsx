import React, {useState, useEffect} from "react";
import { Card, Row, Col, Badge, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import api from "../../services/api";

function ShowEquipment({ match }) {
    const [pageTitle] = useState("Detalhes do Equipamento");
    const [equipment, setEquipment] = useState([]);
    const [btnEdit] = useState("Editar");
    const [btnDelete] = useState("Excluir");
    const [maintenances, setMaintenances] = useState([]);
    const [errorMsg, setErrorMsg] = useState(false);

    useEffect(() => {
        let equipment_id = match.params.equipment_id;
        
        api.get('/equipments/' + equipment_id)
          .then((response) => {
            setEquipment(response.data);
          })
          .catch((error) => {
            setErrorMsg('Um erro ocorreu!')
            if (error.response.status === 401) {
                window.location.href = "/logout";
            }
          });
    }, [match.params.equipment_id]);

    useEffect(() => {
        let equipment_id = match.params.equipment_id;
        
        api.get("/equipments/" + equipment_id + "/maintenances")
          .then((response) => {
            setMaintenances(response.data.data);
          })
          .catch((error) => {
            setErrorMsg('Um erro ocorreu!')
            if (error.response.status === 401) {
                window.location.href = "/logout";
            }
          });
    }, [match.params.equipment_id]);

    return(
        <PageLayout pageTitle={pageTitle} size="lg">
            <FormAlertState
                success={false}
                error={errorMsg}
                errors={false}
                loading={false}
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

            <Button href={"/excluir-equipamento/" + equipment.id} variant="danger" type="reset" size="sm" block>
                { btnDelete }
            </Button>
        </PageLayout>
    );
}

export default ShowEquipment;