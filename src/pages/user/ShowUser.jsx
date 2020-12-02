import React, {useState, useEffect} from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import api from "../../services/api";

function ShowUser({ match }) {
    const [pageTitle] = useState("Detalhes do Usuário");
    const [user, setUser] = useState([]);
    const [btnEdit] = useState("Editar");
    const [btnDelete] = useState("Excluir");
    const [errorMsg, setErrorMsg] = useState(false);

    useEffect(() => {
        let user_id = match.params.user_id;
        
        api.get('/users/' + user_id)
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            setErrorMsg('Um erro ocorreu!')
            if (error.response.status === 401) {
                window.location.href = "/logout";
            }
          });
    }, [match.params.user_id]);

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
                        <p>{user.id}</p>
                    </Col>

                    <Col>
                        <h5>NOME</h5>
                        <p>{user.name}</p>
                    </Col>

                    <Col>
                        <h5>USERNAME</h5>
                        <p>{user.username}</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h5>DATA DE CRIAÇÃO</h5>
                        <p>{user.created_at}</p>
                    </Col>

                    <Col>
                        <h5>STATUS</h5>
                        {user.status ? (
                            <Badge variant="success">Ativo</Badge>
                        ) : (
                            <Badge variant="danger">Inativo</Badge>
                        )}
                    </Col>
                </Row>
            </Card>

            <Button href={"/editar-usuario/" + user.id} variant="primary" size="sm" block>
                { btnEdit }
            </Button>

            <Button href={"/excluir-usuario/" + user.id} variant="danger" type="reset" size="sm" block>
                { btnDelete }
            </Button>
        </PageLayout>
    );
}

export default ShowUser;