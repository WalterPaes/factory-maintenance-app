import React, {useState, useEffect, useCallback} from "react";
import { Button, Table } from "react-bootstrap";
import PageLayout from "../../components/layout/PageLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import ComponentService from "../../services/ComponentService";

function ShowComponent({ match }) {
    const [pageTitle] = useState("Detalhes do Componente");
    const [component, setComponent] = useState([]);
    const [btnEdit] = useState("Editar");
    const [btnDelete] = useState("Excluir");
    const [errorMsg, setErrorMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let component_id = match.params.component_id;
        
        ComponentService.show(component_id).then((response) => {
            switch(response.status) {
                case 200:
                    setComponent(response.data);
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
            }
        });
    }, [match.params.component_id]);

    const handleDelete = useCallback((event)=>{
        event.preventDefault();

        setErrorMsg(false);
        setIsLoading(true);
    
        let id = match.params.component_id;

        ComponentService.delete(id).then((response) => {
            setIsLoading(false);

            if (response.status === 204) {
                window.location.href = "/componentes";
            }

            if (response.status === 401) {
                window.location.href = "/logout";
            }
            
            if (response.status === 500) {
                setErrorMsg('Um erro ocorreu!')
            }
        });
    }, [match.params.component_id]);

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
                        <th>#</th>
                        <th>Nº de Série</th>
                        <th>Nome</th>
                        <th>Fabricante</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={component.id}>
                        <td>{component.id}</td>
                        <td>{component.serial_number}</td>
                        <td>{component.name}</td>
                        <td>{component.manufacturer}</td>
                    </tr>
                </tbody>
            </Table>

            <Button href={"/editar-componente/" + component.id} variant="primary" size="sm" block>
                { btnEdit }
            </Button>

            <Button variant="danger" type="button" size="sm" block onClick={handleDelete}>
                { btnDelete }
            </Button>
        </PageLayout>
    );
}

export default ShowComponent;