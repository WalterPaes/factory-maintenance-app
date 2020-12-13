import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarMenu from './components/layout/NavbarMenu';
import { Container } from 'react-bootstrap';
import Routes from './router';

function App() {
  return (
    <div className="App">
      <NavbarMenu></NavbarMenu>
      <Container>
        <Routes></Routes>
      </Container>
    </div>
  );
}

export default App;
