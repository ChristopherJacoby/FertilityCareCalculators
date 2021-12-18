import { useState } from 'react';
import { Button, TextField, Table, TableHead, TableCell, TableRow, TableBody, TableContainer, Paper, Container, Checkbox } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { add, sub, lightFormat, addYears, subDays, subMonths } from 'date-fns';




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
    const [etcRange, setEtcRange] = useState("");
    const [etcMid, setEtcMid] = useState("");
    const [etaRange, setEtaRange] = useState("");
    const [etaMid, setEtaMid] = useState("");
    const [timeOfEval, setTimeOfEval] = useState("");

    //Global variables
    let { pSub4, pSub3, pSub2, pSub1, p, p1, p2, p3 } = pDate;

    const handleReset = () => {
        setEtaRange("");
        setEtaMid("");
        setEtcRange("");
        setEtcMid("");
        setTimeOfEval("");
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

        //setup etcRangeArray and push if had intercourse
        const etcRangeArr = [];
        checkState.pSub4Box && etcRangeArr.push(pSub4)
        checkState.pSub3Box && etcRangeArr.push(pSub3)
        checkState.pSub2Box && etcRangeArr.push(pSub2)
        checkState.pSub1Box && etcRangeArr.push(pSub1)
        checkState.pBox && etcRangeArr.push(p)
        checkState.p1Box && etcRangeArr.push(p1)
        checkState.p2Box && etcRangeArr.push(p2)
        checkState.p3Box && etcRangeArr.push(p3)

        //create other arrays
        const etcMidArr = etcRangeArr;


        //verify at least 1 day is selected and calc ETC Range dates based on intercourse dates and peak date.
        if (etcRangeArr.length < 1) {
            alert("Select the date(s) of intercourse.")
        } else {

            const firstDate = etcRangeArr[0];
            const lastDate = etcRangeArr[etcRangeArr.length - 1];

            if (lastDate < p) {
                setEtcRange(`${lightFormat(firstDate, "MM-dd-yyyy")} - ${lightFormat(p, "MM-dd-yyyy")}`)
            } else if (etcRangeArr.length === 1 && firstDate >= p) {
                setEtcRange(`${lightFormat(firstDate, "MM-dd-yyyy")}`)
            } else {
                setEtcRange(`${lightFormat(firstDate, "MM-dd-yyyy")} - ${lightFormat(lastDate, "MM-dd-yyyy")}`)
            }

            //calculate ETC midpoint
            let etcFirstDate
            let etcLastDate

            if (etcMidArr.length === 1 && etcMidArr[0] > p) {
                setEtcMid(`${lightFormat(etcMidArr[0], "MM-dd-yyyy")}`)
            } else {
                if (etcMidArr.length === 1 && etcMidArr[0] < p) {
                    etcFirstDate = etcMidArr[0];
                    etcLastDate = p;
                } else {
                    etcFirstDate = etcMidArr[0]
                    etcLastDate = etcMidArr[etcMidArr.length - 1];
                }
                do {
                    etcFirstDate = add(etcFirstDate, {
                        days: 1
                    })

                    etcLastDate = sub(etcLastDate, {
                        days: 1
                    })
                } while (etcFirstDate < etcLastDate);

                if (etcLastDate < etcFirstDate) {
                    lightFormat(etcFirstDate, "dd") % 2 === 0 ? setEtcMid(lightFormat(etcFirstDate, "MM-dd-yyyy")) : setEtcMid(lightFormat(etcLastDate, "MM-dd-yyyy"))
                } else {
                    setEtcMid(lightFormat(etcLastDate, "MM-dd-yyyy"))
                }
            }

            //calculate Duration of preg
            //1 day has 86,400,00 milliseconds.
            let milliSecAtEval = evalDate - new Date(etcMid)
            let daysForEval = milliSecAtEval / 86400000;
            let weeksAtEval = Math.floor(daysForEval / 7);
            let daysAtEval = Math.floor(daysForEval - weeksAtEval * 7);
            setTimeOfEval(`${weeksAtEval} week(s) and ${daysAtEval} day(s)`);

            //calculate ETA Range
            const etaFirstDateYear = addYears(firstDate, 1)
            const etaFirstDateMonth = subMonths(etaFirstDateYear, 3)
            const etaFirstDate = subDays(etaFirstDateMonth, 7);
            const etaLastDateYear = addYears(lastDate, 1)
            const etaLastDateMonth = subMonths(etaLastDateYear, 3)
            const etaLastDate = subDays(etaLastDateMonth, 7);

            if (etcRangeArr.length === 1) {
                setEtaRange(`${lightFormat(etaFirstDate, "MM-dd-yyyy")}`)
            } else {
                setEtaRange(`${lightFormat(etaFirstDate, "MM-dd-yyyy")} - ${lightFormat(etaLastDate, "MM-dd-yyyy")}`)
            }

            //calculate ETA MidPoint

            //calculate LMP Date

            //calculate Nagaele's Rule and LMP duedates

            //change state to allow table to display
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
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ETC MidPoint</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{etcMid}</TableCell>
                                    </TableRow>
                                </TableBody>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Duration of pregnancy at time of evaluation</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{timeOfEval}</TableCell>
                                    </TableRow>
                                </TableBody>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ETA Range</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{etaRange}</TableCell>
                                    </TableRow>
                                </TableBody>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ETA MidPoint</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{etaMid}</TableCell>
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