import React, { useState, useEffect } from "react";
import { Table, Badge } from "react-bootstrap";

function EquipmentTable(props) {
    const [equipment, setEquipment] = useState([]);

    useEffect(() => {
        setEquipment(props.equipment);
    }, [props]);

    return(
        <Table striped bordered responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Localização</th>
                    <th>Status</th>
                    <th>Data de Criação</th>
                </tr>
            </thead>
            <tbody>
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
                    <td>{equipment.created_at}</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default EquipmentTable;