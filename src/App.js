import Calendar from './components/Calendar/Calendar';
import './App.css';


function App() {
  const now = new Date();
  return (
    <Calendar date={now} />
    
  );
}

export default App;
