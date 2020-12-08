import React, {useState, useEffect, useCallback} from "react";
import { Table, Button, Badge, Pagination } from "react-bootstrap";
import FormAlertState from "../../components/forms/FormAlertState";
import EquipmentService from "../../services/EquipmentService";
import ContainerLayout from "../../components/layout/ContainerLayout";

function ListEquipment() {
    const [pageTitle] = useState("Listagem de Equipamentos");
    const [equipments, setEquipments] = useState([]);
    const [errorMsg, setErrorMsg] = useState(false);
    const [pagination, setPagination] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const listEquipments = useCallback((pageNum) => {
        setIsLoading(true);
        
        EquipmentService.all(pageNum).then((response) => {
            setIsLoading(false);
            switch(response.status) {
                case 200:
                    setPagination(response.data);
                    setEquipments(response.data.data);
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
        listEquipments();
    }, [listEquipments]);

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
                        <th>Nome</th>
                        <th>Localização</th>
                        <th>Status</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {equipments.map((equipment) => (
                        <tr key={equipment.id}>
                            <td>{equipment.id}</td>
                            <td>{equipment.name}</td>
                            <td>{equipment.localization}</td>
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

            {equipments.length > 0 &&
                <Pagination>
                    {pagination.links.map((link) => (
                        <>
                        {link.label !== "pagination.next" && link.label !== "pagination.previous" && (
                            <>
                            {link.active &&
                                <Pagination.Item key={link.label} active onClick={() => listEquipments(link.label)}>{link.label}</Pagination.Item>
                            }
                            {!link.active &&
                                <Pagination.Item key={link.label} onClick={() => listEquipments(link.label)}>{link.label}</Pagination.Item>
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

export default ListEquipment;