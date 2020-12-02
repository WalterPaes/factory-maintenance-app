import React, {useState, useEffect} from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import api from "../../services/api";

function ShowUser({ match }) {
    const [pageTitle] = useState("Detalhes do Usuário");
    const [user, setUser] = useState([]);
    const [btnEdit] = useState("Editar");
    const [btnDelete] = useState("Excluir");

    useEffect(() => {
        let user_id = match.params.user_id;
        
        api.get('/users/' + user_id, {},{
            headers: {
                'Content-Type': 'application/json'
            }
        })
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.log(error.response)
          });
    }, [match.params.user_id]);

    return(
        <PageLayout pageTitle={pageTitle} size="lg">
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