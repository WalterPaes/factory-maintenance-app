// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import PageLayout from "./layout/PageLayout";

// function LoginForm() {
//     const [title] = useState("Login");
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [btnLogin] = useState("Acessar");
    
//     return(
//         <PageLayout pageTitle={title}>
//             <Form onSubmit={(event) => {
//                 event.preventDefault();
//                 console.log({username, password})
//             }}>
//                 <Form.Group controlId="formUserName">
//                     <Form.Control type="text" placeholder="Username" value={username} 
//                     onChange={(event) => {
//                         setUsername(event.target.value)
//                     }}/>
//                 </Form.Group>

//                 <Form.Group controlId="formPassword">
//                     <Form.Control type="password" placeholder="Senha" value={password}
//                     onChange={(event) => {
//                         setPassword(event.target.value)
//                     }}/>
//                 </Form.Group>

//                 <Button variant="primary" type="submit" block>
//                     { btnLogin }
//                 </Button>
//             </Form>
//         </PageLayout>
//     );
// }

// export default LoginForm;