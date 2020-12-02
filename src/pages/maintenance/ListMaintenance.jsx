import React, {useState, useEffect} from "react";
import { Table, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import api from "../../services/api";

function ListMaintenance() {
    const [pageTitle] = useState("Listagem de Manutenções");
    const [maintenances, setMaintenances] = useState([]);

    useEffect(() => {
        api.get('/maintenances', {},{
            headers: {
                'Content-Type': 'application/json'
            }
        })
          .then((response) => {
            setMaintenances(response.data.data);
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
                        <th>Data de Início</th>
                        <th>Data de Fim</th>
                        <th>Equipamento</th>
                        <th>Responsável</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {maintenances.map((maintenance) => (
                        <tr key={maintenance.id}>
                            <td>{maintenance.id}</td>
                            <td>{maintenance.start}</td>
                            <td>{maintenance.end}</td>
                            <td>{maintenance.user.name}</td>
                            <td>{maintenance.equipment.name}</td>
                            <td>
                                <Button href={"/manutencao/" + maintenance.id} size="sm">Visualizar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </PageLayout>
    );
}

export default ListMaintenance;