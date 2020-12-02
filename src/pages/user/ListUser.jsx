import React, {useState, useEffect} from "react";
import { Table, Button, Badge } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import api from "../../services/api";

function ListUser() {
    const [pageTitle] = useState("Listagem de Usuários");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get('/users', {},{
            headers: {
                'Content-Type': 'application/json'
            }
        })
          .then((response) => {
            setUsers(response.data.data);
          })
          .catch((error) => {
            console.log(error.response)
          });
    }, []);

    return(
        <PageLayout pageTitle={pageTitle} size="lg">
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