import React from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, TableContainer, Paper, Container } from '@mui/material';

const MCS = () => {

    const handleChange = (event) => {
        console.log(event);

    }

    return (
        <Container>
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
                        <TableRow>
                            <TableCell>Day P-5:</TableCell>
                            <TableCell>
                                <select name="stretch" onChange={handleChange}>
                                    <option value="err">Select Stretch</option>
                                    <option value="2">Sticky (6)</option>
                                    <option value="2">Tacky (8)</option>
                                    <option value="4">Stretchy (10)</option>
                                </select>
                            </TableCell>
                            <TableCell>
                                <select name="specialConsistencies">
                                    <option value="err">Select Consistency</option>
                                    <option value="2">Pasty, Cloudy (PC)</option>
                                    <option value="2">Sticky, Pasty, Cloudy (6PC)</option>
                                    <option value="2">Gummy, No Color (G)</option>
                                </select>
                            </TableCell>
                            <TableCell>
                                <select name="specialConsistencies">
                                    <option value="err">Select Color</option>
                                    <option value="2">Cloudy (C)</option>
                                    <option value="2">Yellow Only (Y)</option>
                                    <option value="4">Clear (K) or Cloudy/Clear (C/K)</option>
                                </select>
                            </TableCell>
                            <TableCell>
                                <select name="specialConsistencies">
                                    <option value="err">Select Lubrication</option>
                                    <option value="0">Dry</option>
                                    <option value="2">Non-Lubricative</option>
                                    <option value="8">Lubricative</option>
                                </select>
                            </TableCell>
                            <TableCell>Data</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default MCS;