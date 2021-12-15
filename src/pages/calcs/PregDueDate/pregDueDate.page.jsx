import { useState } from 'react';
import { Button, TextField, Table, TableHead, TableCell, TableRow, TableBody, TableContainer, Paper, Container, Checkbox } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { add, sub, lightFormat } from 'date-fns';




const PregCalc = () => {
    //states
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
    const [checkState, setCheckState] = useState({
        pSub4Box: false,
        pSub3Box: false,
        pSub2Box: false,
        pSub1Box: false,
        pBox: false,
        p1Box: false,
        p2Box: false,
        p3Box: false
    });
    const [calculated, setCalculated] = useState(false);
    const [userInfo, setUserInfo] = useState({
        etcRange: ""
    });

    //Global variables
    const { etcRange } = userInfo
    let { pSub4, pSub3, pSub2, pSub1, p, p1, p2, p3 } = pDate;

    const handleReset = () => {

        setEvalDate(null);
        setLmpDate(null);
        setPDate({
            pSub4: null,
            pSub3: null,
            pSub2: null,
            pSub1: null,
            p: null,
            p1: null,
            p2: null,
            p3: null
        });
        setDatesSelected(false);
        setCalculated(false);
    }

    const handleChecks = (event) => {
        const { name, checked } = event.target

        setCheckState((prevData) => {
            return {
                ...prevData,
                [name]: checked
            };
        });
    }

    const handleCalc = () => {
        const arr = [];
        checkState.pSub4Box && arr.push(pSub4)
        checkState.pSub3Box && arr.push(pSub3)
        checkState.pSub2Box && arr.push(pSub2)
        checkState.pSub1Box && arr.push(pSub1)
        checkState.pBox && arr.push(p)
        checkState.p1Box && arr.push(p1)
        checkState.p2Box && arr.push(p2)
        checkState.p3Box && arr.push(p3)

        if (arr.length < 1) {
            alert("Select the date(s) of intercourse.")
        } else {
            const firstDate = arr[0];
            const lastDate = arr[arr.length - 1];

            if (lastDate < p) {
                setUserInfo({ etcRange: `${lightFormat(firstDate, "MM-dd-yyyy")} - ${lightFormat(p, "MM-dd-yyyy")}` })
            } else if (arr.length === 1 && firstDate > p) {
                setUserInfo({
                    etcRange: `${lightFormat(firstDate, "MM-dd-yyyy")}`
                })
            } else {
                setUserInfo({ etcRange: `${lightFormat(firstDate, "MM-dd-yyyy")} - ${lightFormat(lastDate, "MM-dd-yyyy")}` })
            }
            setCalculated(true)
        }
    }

    const handleFormCreation = () => {

        // if (evalDate && lmpDate && pDate) {
        if (pDate) {

            //evalDate error check
            const evalDateErrorCheck = sub(evalDate, {
                months: 10
            })
            if (lmpDate > p) {
                alert("The Peak Date needs to be after the LMP.")
            } else if (evalDate < p) {
                alert("The Date of Evaluation needs to be after the Peak Date")
            } else if (evalDateErrorCheck > p) {
                alert("The Date of Evaluation can't be more than 10 months after the Peak Date.")
            } else {
                console.log('pSub4', pSub4);
                console.log('pSub3', pSub3);
                console.log('pSub2', pSub2);
                console.log('pSub1', pSub1);
                console.log('p', p);
                console.log('p1', p1);
                console.log('p2', p2);
                console.log('p3', p3);

                setDatesSelected(true);
            }
        } else {
            alert("Please select required dates.")
        }
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
            <div>
                <Button color="warning" onClick={handleReset}>Reset</Button>
                <Button onClick={handleFormCreation}>Done</Button>
            </div>
            <div>
                {datesSelected ?
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" border="1px">
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
                                    <TableRow onChange={handleChecks}>
                                        <TableCell><Checkbox name="pSub4Box" icon={<FavoriteBorder />} checkedIcon={<Favorite />} /></TableCell>
                                        <TableCell><Checkbox name="pSub3Box" icon={<FavoriteBorder />} checkedIcon={<Favorite />} /></TableCell>
                                        <TableCell><Checkbox name="pSub2Box" icon={<FavoriteBorder />} checkedIcon={<Favorite />} /></TableCell>
                                        <TableCell><Checkbox name="pSub1Box" icon={<FavoriteBorder />} checkedIcon={<Favorite />} /></TableCell>
                                        <TableCell><Checkbox name="pBox" icon={<FavoriteBorder />} checkedIcon={<Favorite />} /></TableCell>
                                        <TableCell><Checkbox name="p1Box" icon={<FavoriteBorder />} checkedIcon={<Favorite />} /></TableCell>
                                        <TableCell><Checkbox name="p2Box" icon={<FavoriteBorder />} checkedIcon={<Favorite />} /></TableCell>
                                        <TableCell><Checkbox name="p3Box" icon={<FavoriteBorder />} checkedIcon={<Favorite />} /></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button onClick={handleCalc}>Calculate</Button>
                    </div>
                    : null
                }
                {
                    calculated ?
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" border="1px">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ETC Range</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{etcRange}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        null
                }
            </div>
        </Container>
    );
}

export default PregCalc;