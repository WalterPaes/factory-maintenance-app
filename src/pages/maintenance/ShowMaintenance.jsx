import React, {useState, useEffect} from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import api from "../../services/api";

function ShowMaintenance({ match }) {
    const [pageTitle] = useState("Detalhes da Manutenção");
    const [btnEdit] = useState("Editar");
    const [btnDelete] = useState("Excluir");
    const [errorMsg, setErrorMsg] = useState(false);
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
        
        api.get('/maintenances/' + maintenance_id)
          .then((response) => {
            setMaintenance(response.data);
          })
          .catch((error) => {
            setErrorMsg('Um erro ocorreu!')
            if (error.response.status === 401) {
                window.location.href = "/logout";
            }
          });
    }, [match.params.maintenance_id]);

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

            <Button href={"/excluir-manutencao/" + maintenance.id} variant="danger" type="reset" size="sm" block>
                { btnDelete }
            </Button>
        </PageLayout>
    );
}

export default ShowMaintenance;