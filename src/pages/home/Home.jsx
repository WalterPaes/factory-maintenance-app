import React, { useState } from "react";
import PageLayout from "../../components/layout/PageLayout";
import AuthService from "../../services/AuthService";

function LoginForm() {
    const [title] = useState("Home");
    const [user] = useState(AuthService.getUser);

    return(
        <PageLayout pageTitle={title} size="lg">
            <div className="text-left">
                <h3>{"Olá, " + user.user.username}</h3>
            </div>
        </PageLayout>
    );
}

export default LoginForm;