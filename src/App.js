import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

//pages
import BreastfeedingPostpartumDate from './pages/calcs/breastfeeding/breastfeeding.page';
import PregCalc from './pages/calcs/PregDueDate/pregDueDate.page';
import MCS from './pages/calcs/MCS/mcs.page';

//style
import './App.css';


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
        <MCS />
      </div>
    </LocalizationProvider>
  );
}

export default App;
