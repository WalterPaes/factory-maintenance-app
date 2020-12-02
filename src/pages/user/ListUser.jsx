import React, {useState, useEffect} from "react";
import { Table, Button, Badge } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import api from "../../services/api";

function ListUser() {
    const [pageTitle] = useState("Listagem de Usuários");
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState(false);

    useEffect(() => {
        api.get('/users')
          .then((response) => {
            setUsers(response.data.data);
          })
          .catch((error) => {
            setErrorMsg('Um erro ocorreu!')
            if (error.response.status === 401) {
                window.location.href = "/logout";
            }
          });
    }, []);

    return(
        <PageLayout pageTitle={pageTitle} size="lg">
            <FormAlertState
                success={false}
                error={errorMsg}
                errors={false}
                loading={false}
            />

            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Status</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>
                                {user.status ? (
                                    <Badge variant="success">Ativo</Badge>
                                ) : (
                                    <Badge variant="danger">Inativo</Badge>
                                )}
                            </td>
                            <td>
                                <Button href={"/usuario/" + user.id} size="sm">Visualizar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </PageLayout>
    );
}

export default ListUser;