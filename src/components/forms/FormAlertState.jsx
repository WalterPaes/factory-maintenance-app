import React, { useState, useEffect } from "react";
import { ProgressBar, Alert } from "react-bootstrap";

function FormAlertState(props) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errors, setErrors] = useState(false);

    useEffect(() => {
        setIsSuccess(props.success);
        setIsLoading(props.loading);
        setHasError(props.error);
        setErrors(props.errors);
    }, [isSuccess, isLoading, hasError, errors, props]);

    return(
        <>
        {isSuccess &&
            <Alert variant="success">
                <strong>SUCESSO!</strong>
            </Alert>
        }
        
        {hasError &&
            <Alert variant="danger">
                <strong>ERRO!</strong> Preencha corretamente o formulário.
                <ul className="text-left">
                    {Object.keys(errors).map((key) => (
                        <li>{errors[key]}</li>
                    ))}
                </ul>
            </Alert>
        }
        
        {isLoading &&
            <ProgressBar animated now={100} className="mb-3"/>
        }
        </>
    );
}

export default FormAlertState;