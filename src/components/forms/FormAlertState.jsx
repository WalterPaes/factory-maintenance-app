import React, { useState, useEffect } from "react";
import { ProgressBar, Alert } from "react-bootstrap";

function FormAlertState(props) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [errors, setErrors] = useState(false);

    useEffect(() => {
        setIsSuccess(props.success);
        setIsLoading(props.loading);
        setErrorMsg(props.error);
        setErrors(props.errors);
    }, [isSuccess, isLoading, errorMsg, errors, props]);

    return(
        <>
        {isSuccess &&
            <Alert variant="success">
                <strong>SUCESSO!</strong>
            </Alert>
        }
        
        {errorMsg &&
            <Alert variant="danger">
                <strong>ERRO!</strong> {errorMsg}
                <ul className="text-left">
                    {Object.keys(errors).map((i) => (
                        <li key={errors[i]}>{errors[i]}</li>
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