import React from "react";
import { Row, Col } from "react-bootstrap";

function PageLayout(props) {
    return(
        <Row className={"justify-content-" + props.size + "-center"}>
            {props.size === "sm" &&
                <Col sm="auto">
                    <h3>{props.pageTitle}</h3>
                    {props.children}
                </Col>
            }

            {props.size === "md" &&
                <Col md="auto">
                    <h3>{props.pageTitle}</h3>
                    {props.children}
                </Col>
            }

            {props.size === "lg" &&
                <Col lg="auto">
                    <h3>{props.pageTitle}</h3>
                    {props.children}
                </Col>
            }

            {props.size === "xl" &&
                <Col xl="auto">
                    <h3>{props.pageTitle}</h3>
                    {props.children}
                </Col>
            }

            {props.size === "xs" &&
                <Col xs="auto">
                    <h3>{props.pageTitle}</h3>
                    {props.children}
                </Col>
            }
        </Row>
    );
}

export default PageLayout;