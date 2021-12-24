import { useState } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, TableContainer, Container, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const MCS = () => {

    const [p5Data, setP5Data] = useState({
        stretch: "",
        specialConsistency: "",
        color: "",
        sensation: "",
        desc: ""
    });
    const handleP5Change = (event) => {
        const { name, value } = event.target
        setP5Data((prevData) => {
            return {
                ...prevData,
                [name]: value
            };
        });
    }

    const handleCheckState = () => {
        console.log(p5Data);

    }

    return (
        <Container disableGutters={true}>
            <h2>Mucus Cycle Score Calculator</h2>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Cycle Day</TableCell>
                            <TableCell>Stretch</TableCell>
                            <TableCell>Special Consistencies</TableCell>
                            <TableCell>Color</TableCell>
                            <TableCell>Sensation</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow onChange={handleP5Change}>
                            <TableCell>Day P-5:</TableCell>
                            <TableCell>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel>Stretch</InputLabel>
                                    <Select
                                        name="stretch"
                                        value={p5Data.stretch}
                                        label="Stretch"
                                        onChange={handleP5Change}
                                    >
                                        <MenuItem value="">Select Stretch</MenuItem>
                                        <MenuItem value="Sticky (6)">Sticky (6)</MenuItem>
                                        <MenuItem value="Tacky (8)">Tacky (8)</MenuItem>
                                        <MenuItem value="Stretchy (10)">Stretchy (10)</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel>Consistency</InputLabel>
                                    <Select
                                        name="specialConsistency"
                                        value={p5Data.specialConsistency}
                                        label="Consistency"
                                        onChange={handleP5Change}
                                    >
                                        <MenuItem value="">Select Consistency</MenuItem>
                                        <MenuItem value="Pasty, Cloudy (PC)">Pasty, Cloudy (PC)</MenuItem>
                                        <MenuItem value="Sticky, Pasty, Cloudy (6PC)">Sticky, Pasty, Cloudy (6PC)</MenuItem>
                                        <MenuItem value="Gummy, No Color (G)">Gummy, No Color (G)</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel>Color</InputLabel>
                                    <Select
                                        name="color"
                                        value={p5Data.color}
                                        label="Color"
                                        onChange={handleP5Change}
                                    >
                                        <MenuItem value="">Select Color</MenuItem>
                                        <MenuItem value="Cloudy (C)">Cloudy (C)</MenuItem>
                                        <MenuItem value="Yellow Only (Y)">Yellow Only (Y)</MenuItem>
                                        <MenuItem value="Clear (K) or Cloudy/Clear (C/K)">Clear (K) or Cloudy/Clear (C/K)</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel>Sensation</InputLabel>
                                    <Select
                                        name="sensation"
                                        value={p5Data.sensation}
                                        label="Sensation"
                                        onChange={handleP5Change}
                                    >
                                        <MenuItem value="">Select Sensation</MenuItem>
                                        <MenuItem value="Dry">Dry</MenuItem>
                                        <MenuItem value="Non-Lubricative">Non-Lubricative</MenuItem>
                                        <MenuItem value="Lubricative">Lubricative</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>{p5Data.desc}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <button onClick={handleCheckState}>Check state</button>
        </Container>
    );
}

export default MCS;