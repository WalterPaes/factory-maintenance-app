import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//import LoginForm from './components/LoginForm';
import UsersForm from './components/UsersForm';
import NavbarMenu from './components/layout/NavbarMenu';
import { Container, Jumbotron } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <NavbarMenu></NavbarMenu>
      <Jumbotron>
        <Container>
          <UsersForm></UsersForm>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default App;
