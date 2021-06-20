import { BrowserRouter as Router} from 'react-router-dom';

import Routes from './routes/routes';

import './styles/index.css';
 
function App() {
  return (
    <Router>
      <Routes/>
    </Router>
  );
}

export default App;
