import { useState } from 'react';
import { FormControl, FormLabel, RadioGroup, Radio, Button, FormControlLabel } from '@mui/material';

const BreastfeedingPostpartumDate = () => {
    const [breastfeeding, setBreastfeeding] = useState(true);
    const [babyBirthday, setBabyBirthday] = useState('');
    const [suppliment, setSuppliment] = useState('');
    const [menses, setMenses] = useState('');
    const [mensesDate, setMensesDate] = useState("");
    const [suppDate, setSuppDate] = useState("");

    const handleRadioChange = event => {
        const { value } = event.target;
        value === "Breastfeeding" ?
            (
                setBreastfeeding(true)
            ) :
            (
                setBreastfeeding(false)
            )
    }

    const handleDateChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'babyBirthday':
                setBabyBirthday(prevValue => {
                    return {
                        ...prevValue,
                        [name]: value
                    }
                })
                break;
            case 'supplimentDate':
                setSuppliment(prevValue => {
                    return {
                        ...prevValue,
                        [name]: value
                    }
                })
                break;
            case 'mensesDate':
                setMenses(prevValue => {
                    return {
                        ...prevValue,
                        [name]: value
                    }
                })
                break;
            default:
                console.log('error');
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (breastfeeding) {
            calcMenses()
            calcSuppliment()
        } else {
            calcMenses()
        }
    }

    const calcMenses = () => {
        if (babyBirthday && menses) {
            const date = new Date(babyBirthday.babyBirthday)
            const date2 = new Date(menses.mensesDate);
            let mensDate = Math.abs(date2 - date) / (1000 * 60 * 60 * 24);
            setMensesDate(`${mensDate} days between delivery date and menses date.`)
        } else {
            alert("Please select Baby Birthdate and Menses Date.")
        }
    }

    const calcSuppliment = () => {
        if (babyBirthday && suppliment) {
            const date = new Date(babyBirthday.babyBirthday)
            const date2 = new Date(suppliment.supplimentDate);
            let suppDate = Math.abs(date2 - date) / (1000 * 60 * 60 * 24);
            setSuppDate(`${suppDate} days between delivery date and suppliment date.`)
        } else {
            alert("Please select Baby Birthdate and Suppliment Date.")
        }
    }

    return (
        <div>
            <h1>BreastFeeding PostPartum Date</h1>
            <form>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Please select if breastfeeding</FormLabel>
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group" defaultValue="Breastfeeding">
                        <FormControlLabel value="Breastfeeding" control={<Radio />} label="Breastfeeding" onChange={handleRadioChange} />
                        <FormControlLabel value="Postpartum" control={<Radio />} label="Postpartum" onChange={handleRadioChange} />
                    </RadioGroup>
                </FormControl>
                <div>
                    <label>Baby Birthday</label>
                    <input type="date" name="babyBirthday" onChange={handleDateChange} />
                </div>
                <div>
                    <label>Suppliment Date</label>
                    <input type="date" name="supplimentDate" onChange={handleDateChange} />
                </div>
                <div>
                    <label>Menses Date</label>
                    <input type="date" name="mensesDate" onChange={handleDateChange} />
                </div>
                <Button variant="contained" onClick={handleSubmit}>Calculate</Button>
            </form>
            <div><span>{suppDate}</span></div>
            <div><span>{mensesDate}</span></div>
        </div>
    );
}

export default BreastfeedingPostpartumDate;