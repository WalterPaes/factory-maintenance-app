import React, {useState, useEffect, useCallback} from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import FormAlertState from "../../components/forms/FormAlertState";
import MaintenanceService from "../../services/MaintenanceService";
import ContainerLayout from "../../components/layout/ContainerLayout";

function ListMaintenance() {
    const [pageTitle] = useState("Listagem de Manutenções");
    const [maintenances, setMaintenances] = useState([]);
    const [errorMsg, setErrorMsg] = useState(false);
    const [pagination, setPagination] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const listMaintenances = useCallback((pageNum) => {
        setIsLoading(true);

        MaintenanceService.all(pageNum).then((response) => {
            setIsLoading(false);
            switch(response.status) {
                case 200:
                    setPagination(response.data);
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

    useEffect(() => {
        listMaintenances();
    }, [listMaintenances]);

    return(
        <ContainerLayout pageTitle={pageTitle}>
            <FormAlertState
                success={false}
                error={errorMsg}
                errors={false}
                loading={isLoading}
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

            {maintenances.length > 0 &&
                <Pagination>
                    {pagination.links.map((link) => (
                        <>
                        {link.label !== "pagination.next" && link.label !== "pagination.previous" && (
                            <>
                            {link.active &&
                                <Pagination.Item key={link.label} active onClick={() => listMaintenances(link.label)}>{link.label}</Pagination.Item>
                            }
                            {!link.active &&
                                <Pagination.Item key={link.label} onClick={() => listMaintenances(link.label)}>{link.label}</Pagination.Item>
                            }
                            </>
                        )}
                        </>
                    ))}
                </Pagination>
            }
        </ContainerLayout>
    );
}

export default ListMaintenance;