import React from "react";
import { Row, Col } from "react-bootstrap";

function PageLayout(props) {
    return(
        <Row className="justify-content-md-center">
            <Col md="auto">
                <h3>{props.pageTitle}</h3>
                {props.children}
            </Col>
        </Row>
    );
}

export default PageLayout;