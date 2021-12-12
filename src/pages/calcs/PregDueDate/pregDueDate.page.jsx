import { useState } from 'react';
import { TextField, Table, TableHead, TableCell, TableRow, TableBody, TableContainer, Paper, Container } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { add, sub, lightFormat } from 'date-fns';




const PregCalc = (props) => {
    const [evalDate, setEvalDate] = useState(null);
    const [lmpDate, setLmpDate] = useState(null);
    const [pDate, setPDate] = useState({
        pSub4: null,
        pSub3: null,
        pSub2: null,
        pSub1: null,
        p: null,
        p1: null,
        p2: null,
        p3: null
    });
    const [datesSelected, setDatesSelected] = useState(false);

    let { pSub4, pSub3, pSub2, pSub1, p, p1, p2, p3 } = pDate;
    const handleReset = () => {

        //clear dates (dates have to clear, not set new date)
        setEvalDate(null);
        setLmpDate(null);
        setPDate(null);
        setDatesSelected(false);
        //make table disappear if it exists 
    }

    const handleFormCreation = () => {

        // if (evalDate && lmpDate && pDate) {
        if (pDate) {

            //evalDate error check

            //lmpDate error check

            //pDate error check
            console.log('pSub4', pSub4);
            console.log('pSub3', pSub3);
            console.log('pSub2', pSub2);
            console.log('pSub1', pSub1);
            console.log('p', p);
            console.log('p1', p1);
            console.log('p2', p2);
            console.log('p3', p3);

            setDatesSelected(true);
        } else {
            alert("Please select required dates.")
        }

        //check if Dates are selected and create table. Error is no dates

        //create table for P dates

    }

    return (
        <Container fixed>
            <h2>Creighton Model System Pregnancy Due Date Calculator</h2>
            <DesktopDatePicker
                name="evalDatePicker"
                label="Evaluation Date"
                value={evalDate}
                onChange={(newValue) => {
                    setEvalDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
                label="LMP Date"
                value={lmpDate}
                onChange={(newValue) => {
                    setLmpDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
                label="P Date"
                value={pDate.p}
                onChange={(newValue) => {
                    setPDate({
                        p: newValue,
                        pSub4: sub(new Date(newValue), {
                            days: 4
                        }),
                        pSub3: sub(new Date(newValue), {
                            days: 3
                        }),
                        pSub2: sub(new Date(newValue), {
                            days: 2
                        }),
                        pSub1: sub(new Date(newValue), {
                            days: 1
                        }),
                        p1: add(new Date(newValue), {
                            days: 1
                        }),
                        p2: add(new Date(newValue), {
                            days: 2
                        }),
                        p3: add(new Date(newValue), {
                            days: 3
                        })
                    });
                }}
                renderInput={(params) => <TextField {...params} />}
            />

            <button onClick={handleReset}>Reset</button>
            <button onClick={handleFormCreation}>Done</button>

            <div>
                {datesSelected ?
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>P-4</TableCell>
                                    <TableCell>P-3</TableCell>
                                    <TableCell>P-2</TableCell>
                                    <TableCell>P-1</TableCell>
                                    <TableCell>P</TableCell>
                                    <TableCell>P+1</TableCell>
                                    <TableCell>P+2</TableCell>
                                    <TableCell>P+3</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{lightFormat(pSub4, "MM-dd-yyyy")}</TableCell>
                                    <TableCell>{lightFormat(pSub3, "MM-dd-yyyy")}</TableCell>
                                    <TableCell>{lightFormat(pSub2, "MM-dd-yyyy")}</TableCell>
                                    <TableCell>{lightFormat(pSub1, "MM-dd-yyyy")}</TableCell>
                                    <TableCell>{lightFormat(p, "MM-dd-yyyy")}</TableCell>
                                    <TableCell>{lightFormat(p1, "MM-dd-yyyy")}</TableCell>
                                    <TableCell>{lightFormat(p2, "MM-dd-yyyy")}</TableCell>
                                    <TableCell>{lightFormat(p3, "MM-dd-yyyy")}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : null
                }
            </div>
        </Container>
    );
}

export default PregCalc;