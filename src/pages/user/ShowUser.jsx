import React, {useState, useEffect, useCallback} from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import UserService from "../../services/UserService";

function ShowUser({ match }) {
    const [pageTitle] = useState("Detalhes do Usuário");
    const [user, setUser] = useState([]);
    const [btnEdit] = useState("Editar");
    const [btnDelete] = useState("Excluir");
    const [errorMsg, setErrorMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let user_id = match.params.user_id;
        
        UserService.show(user_id).then((response) => {
            switch(response.status) {
                case 200:
                    setUser(response.data);
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
            }
        });
    }, [match.params.user_id]);

    const handleDelete = useCallback((event)=>{
        event.preventDefault();

        setErrorMsg(false);
        setIsLoading(true);
    
        let user_id = match.params.user_id;

        UserService.delete(user_id).then((response) => {
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
    }, [match.params.user_id]);

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

            <Button variant="danger" type="button" size="sm" block onClick={handleDelete}>
                { btnDelete }
            </Button>
        </PageLayout>
    );
}

export default ShowUser;