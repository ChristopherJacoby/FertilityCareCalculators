import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const PregCalc = () => {
    const [value, setValue] = useState(new Date());

    return (
        <div>
            <h2>Creighton Model System Pregnancy Due Date Calculator</h2>
            <DesktopDatePicker
                label="Date of Evaluation"
                value={value}
                minDate={new Date('2017-01-01')}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />

        </div>
    );
}

export default PregCalc;