import React, {useState, useEffect, useCallback} from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import ComponentService from "../../services/ComponentService";
import FormAlertState from "../../components/forms/FormAlertState";
import ContainerLayout from "../../components/layout/ContainerLayout";

function ListComponent() {
    const [pageTitle] = useState("Listagem de Componentes");
    const [components, setComponents] = useState([]);
    const [errorMsg, setErrorMsg] = useState(false);
    const [pagination, setPagination] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const listComponents = useCallback((pageNum) => {
        setIsLoading(true);
        
        ComponentService.all(pageNum).then((response) => {
            setIsLoading(false);
            switch(response.status) {
                case 200:
                    setPagination(response.data);
                    setComponents(response.data.data);
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
        listComponents();
    }, [listComponents]);

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
                        <th>Nº de Série</th>
                        <th>Nome</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {components.map((component) => (
                        <tr key={component.id}>
                            <td>{component.id}</td>
                            <td>{component.serial_number}</td>
                            <td>{component.name}</td>
                            <td>
                                <Button href={"/componente/" + component.id} size="sm">Visualizar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {components.length > 0 &&
                <Pagination>
                    {pagination.links.map((link) => (
                        <>
                        {link.label !== "pagination.next" && link.label !== "pagination.previous" && (
                            <>
                            {link.active &&
                                <Pagination.Item key={link.label} active onClick={() => listComponents(link.label)}>{link.label}</Pagination.Item>
                            }
                            {!link.active &&
                                <Pagination.Item key={link.label} onClick={() => listComponents(link.label)}>{link.label}</Pagination.Item>
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

export default ListComponent;