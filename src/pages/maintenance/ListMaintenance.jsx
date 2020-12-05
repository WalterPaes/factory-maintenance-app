import React, {useState, useEffect} from "react";
import { Table, Button } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import MaintenanceService from "../../services/MaintenanceService";

function ListMaintenance() {
    const [pageTitle] = useState("Listagem de Manutenções");
    const [maintenances, setMaintenances] = useState([]);
    const [errorMsg, setErrorMsg] = useState(false);

    useEffect(() => {
        MaintenanceService.all().then((response) => {
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
                        <th>Data de Início</th>
                        <th>Data de Fim</th>
                        <th>Responsável</th>
                        <th>Equipamento</th>
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