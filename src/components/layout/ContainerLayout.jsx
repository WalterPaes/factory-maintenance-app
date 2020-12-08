import React from "react";

function ContainerLayout(props) {
    return(
        <div className={"justify-content-lg-center"}>
            <h3>{props.pageTitle}</h3>
            {props.children}
        </div>
    );
}

export default ContainerLayout;