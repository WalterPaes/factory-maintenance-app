import React, {useState, useEffect, useCallback} from "react";
import { Card, Button, Table, Form, Modal, Alert } from "react-bootstrap";
import ContainerLayout from "../../components/layout/ContainerLayout";
import FormAlertState from "../../components/forms/FormAlertState";
import EquipmentService from "../../services/EquipmentService";
import ComponentService from "../../services/ComponentService";
import EquipmentTable from "../../components/tables/EquipmentTable";

function ShowEquipment({ match }) {
    const [pageTitle] = useState("Detalhes do Equipamento");
    const [equipment, setEquipment] = useState([]);
    const [btnEdit] = useState("Editar");
    const [btnDelete] = useState("Excluir");
    const [maintenances, setMaintenances] = useState([]);
    const [component_id, setComponentId] = useState(0);
    const [components, setComponents] = useState([]);
    const [componentsList, setComponentsList] = useState([]);
    const [errorMsg, setErrorMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let equipment_id = match.params.equipment_id;
        
        EquipmentService.show(equipment_id).then((response) => {
            switch(response.status) {
                case 200:
                    setEquipment(response.data);
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
            }
        });
    }, [match.params.equipment_id]);

    const listComponents = useCallback(() => {
        let equipment_id = match.params.equipment_id;

        EquipmentService.components(equipment_id).then((response) => {
            switch(response.status) {
                case 200:
                    setComponents(response.data[0].components);
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
            }
        });
    }, [match.params.equipment_id]);

    useEffect(() => {
        let equipment_id = match.params.equipment_id;
        
        EquipmentService.maintenances(equipment_id).then((response) => {
            switch(response.status) {
                case 200:
                    setMaintenances(response.data);
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
            }
        });

        ComponentService.actives().then((response) => {
            switch(response.status) {
                case 200:
                    setComponentsList(response.data);
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
            }
        });

        listComponents();
    }, [match.params.equipment_id, listComponents]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleSelect = (event) => setComponentId(event.target.value);

    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        
        setErrorMsg(false);
        setIsLoading(true);
        
        let equipment_id = match.params.equipment_id;
        
        EquipmentService.storeComponents(equipment_id, {component_id}).then((response) => {
            setIsLoading(false);
            switch(response.status) {
                case 200:
                    listComponents();
                    handleCloseModal();
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
                    break;
            }
        });
    }, [component_id, match.params.equipment_id, listComponents]);

    const handleDelete = useCallback((event) => {
        event.preventDefault();

        setErrorMsg(false);
        setIsLoading(true);
    
        let id = match.params.equipment_id;

        EquipmentService.delete(id).then((response) => {
            setIsLoading(false);
            switch(response.status) {
                case 204:
                    window.location.href = "/equipamentos";
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
                    break;
            }
        });
    }, [match.params.equipment_id]);

    const handleRemoveComponent = useCallback((component_id) => {
        let id = match.params.equipment_id;
        
        EquipmentService.removeComponents(id, component_id).then((response) => {
            switch(response.status) {
                case 204:
                    listComponents()
                    break;
                case 401:
                    window.location.href = "/logout";
                    break;
                default:
                    setErrorMsg('Um erro ocorreu!');
                    break;
            }
        });
    }, [match.params.equipment_id, listComponents]);

    return(
        <ContainerLayout pageTitle={pageTitle}>
            {(equipment.length > 0)}
            
            <FormAlertState
                success={false}
                error={errorMsg}
                errors={false}
                loading={isLoading}
            />

            <EquipmentTable equipment={equipment}/>

            <Card body className="text-left mb-3">
                <b>Descrição:</b> {equipment.description}
            </Card>

            <div className="mb-3">
                <Button href={"/editar-equipamento/" + equipment.id} variant="primary" size="sm">
                    { btnEdit }
                </Button>
                {' '}
                <Button variant="danger" type="button" size="sm" onClick={handleDelete}>
                    { btnDelete }
                </Button>
            </div>
            
            {(components.length > 0) &&
                <Table striped bordered responsive>
                    <thead>
                        <tr>
                            <th colSpan={5}>Componentes do Equipamento</th>
                        </tr>
                        <tr>
                            <th>Nome</th>
                            <th>Nº de Série</th>
                            <th>Modelo</th>
                            <th>Fabricante</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {components.map((component) => (
                            <tr key={component.id}>
                                <td>{component.name}</td>
                                <td>{component.serial_number}</td>
                                <td>{component.model}</td>
                                <td>{component.manufacturer}</td>
                                <td>
                                    <Button variant="danger" type="button" size="sm" onClick={() => handleRemoveComponent(component.id)}>Remover</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
            {(components.length < 1) && 
                <Alert variant="info">
                    Nenhum Equipamento relacionado à este equipamento
                </Alert>
            }

            <div className="text-right mb-3">
                <Button variant="primary" size="sm" onClick={handleShowModal}>Adicionar Componente</Button>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastro de Componentes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <FormAlertState
                                success={false}
                                error={errorMsg}
                                errors={false}
                                loading={isLoading}
                            />
                            <Form.Label>Selecione o Componente</Form.Label>
                            <Form.Control as="select" onChange={handleSelect}>
                                    {componentsList.map((component) => (
                                        <option key={component.id} value={component.id}>{component.name}</option>
                                    ))}
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseModal}>Cancelar</Button>
                        <Button variant="primary" onClick={handleSubmit}>Salvar</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            {maintenances.length > 0 &&
            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th colSpan={3}>Manutenções desse Equipamento</th>
                    </tr>
                    <tr>
                        <th>Horário de Início</th>
                        <th>Horário Final</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {maintenances.map((maintenance) => (
                        <tr key={maintenance.id}>
                            <td>{maintenance.start}</td>
                            <td>{maintenance.end}</td>
                            <td>
                                <Button href={"/manutencao/" + equipment.id} size="sm">Mais Detalhes</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            }
            {(maintenances.length < 1) && 
                <Alert variant="info">
                    Nenhuma manutenção relacionada à este equipamento
                </Alert>
            }
        </ContainerLayout>
    );
}

export default ShowEquipment;