import React, {useState, useEffect} from "react";
import { Table, Button, Badge } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import api from "../../services/api";

function ListEquipment() {
    const [pageTitle] = useState("Listagem de Equipamentos");
    const [equipments, setEquipments] = useState([]);

    useEffect(() => {
        api.get('/equipments', {},{
            headers: {
                'Content-Type': 'application/json'
            }
        })
          .then((response) => {
            setEquipments(response.data.data);
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
                    {equipments.map((equipment) => (
                        <tr key={equipment.id}>
                            <td>{equipment.id}</td>
                            <td>{equipment.name}</td>
                            <td>
                                {equipment.status ? (
                                    <Badge variant="success">Ativo</Badge>
                                ) : (
                                    <Badge variant="danger">Inativo</Badge>
                                )}
                            </td>
                            <td>
                                <Button href={"/equipamento/" + equipment.id} size="sm">Visualizar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </PageLayout>
    );
}

export default ListEquipment;