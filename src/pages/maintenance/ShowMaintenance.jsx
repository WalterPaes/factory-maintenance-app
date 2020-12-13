import React, {useState, useEffect, useCallback} from "react";
import { Card, Button, Table } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import MaintenanceService from "../../services/MaintenanceService";

function ShowMaintenance({ match }) {
    const [pageTitle] = useState("Detalhes da Manutenção");
    const [btnEdit] = useState("Editar");
    const [btnDelete] = useState("Excluir");
    const [errorMsg, setErrorMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        
        MaintenanceService.show(maintenance_id).then((response) => {
            switch(response.status) {
                case 200:
                    setMaintenance(response.data);
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
            }
        });
    }, [match.params.maintenance_id]);
    
    const handleDelete = useCallback((event)=>{
        event.preventDefault();

        setErrorMsg(false);
        setIsLoading(true);
    
        let id = match.params.maintenance_id;

        MaintenanceService.delete(id).then((response) => {
            setIsLoading(false);

            if (response.status === 204) {
                window.location.href = "/manutencao";
            }

            if (response.status === 401) {
                window.location.href = "/logout";
            }
            
            if (response.status === 500) {
                setErrorMsg('Um erro ocorreu!')
            }
        });
    }, [match.params.maintenance_id]);

    return(
        <PageLayout pageTitle={pageTitle} size="lg">
            <FormAlertState
                success={false}
                error={errorMsg}
                errors={false}
                loading={isLoading}
            />

            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data de Início</th>
                        <th>Data de Fim</th>
                        <th>Responsável</th>
                        <th>Equipamento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={maintenance.id}>
                        <td>{maintenance.id}</td>
                        <td>{maintenance.start}</td>
                        <td>{maintenance.end}</td>
                        <td>{maintenance.user.name}</td>
                        <td>{maintenance.equipment.name}</td>
                    </tr>
                </tbody>
            </Table>

            <Card body className="text-left mb-3">
                <b>Descrição:</b> {maintenance.description}
            </Card>

            <Button href={"/editar-manutencao/" + maintenance.id} variant="primary" size="sm" block>
                { btnEdit }
            </Button>

            <Button variant="danger" type="button" size="sm" block onClick={handleDelete}>
                { btnDelete }
            </Button>
        </PageLayout>
    );
}

export default ShowMaintenance;