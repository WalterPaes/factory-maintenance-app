import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarMenu from './components/layout/NavbarMenu';
import { Container, Jumbotron } from 'react-bootstrap';
import Routes from './router';

function App() {
  return (
    <div className="App">
      <NavbarMenu></NavbarMenu>
      <Jumbotron>
        <Container>
          <Routes></Routes>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default App;
