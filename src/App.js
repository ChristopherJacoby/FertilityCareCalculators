import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

//pages
import BreastfeedingPostpartumDate from './pages/calcs/breastfeeding/breastfeeding.page';
import PregCalc from './pages/calcs/PregDueDate/pregDueDate.page';

//style
import './App.css';


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
        <PregCalc />
      </div>
    </LocalizationProvider>
  );
}

export default App;
