import React, { useCallback, useEffect, useState } from "react";
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import axios from "axios";
import { useTranslation } from "react-i18next";

const alphabets = 'ABCÇDEFGHIJKLMNOPRSŞTUVWXYZ'.split('');

const HealthServices = () => {
    const { t, i18n } = useTranslation();
    const [medicalUnits, setMedicalUnits] = useState([]);
    const [filter, setFilter] = useState('');
    const [selectedLetter, setSelectedLetter] = useState('');

    const loadMedicalUnits = useCallback(() => {
        axios.get("http://localhost:1337/api/medical-units")
            .then(response => {
                setMedicalUnits(response.data.data);
            })
            .catch(error => {
                console.error("Bir hata oluştu:", error);
            });
    }, [])
    useEffect(() => {
        loadMedicalUnits();
    }, [loadMedicalUnits])
    medicalUnits.map(i=>console.log(i.attributes.Title))
    const filteredUnits = medicalUnits
        .filter(unit =>
            unit.attributes.Title.toLowerCase().includes(filter.toLowerCase()) &&
            (!selectedLetter || unit.attributes.Title[0].toUpperCase() === selectedLetter)
        )
        .sort((a, b) => a.attributes.Title.localeCompare(b.attributes.Title, 'tr'));

    const handleLetterClick = (letter) => {
        setSelectedLetter(letter);
        setFilter('');
    };
    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                {t("departments")}
            </Typography>
            <TextField
                label="Tıbbi Birim Ara"
                variant="outlined"
                fullWidth
                margin="normal"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    width: '100%'
                }}
            >
                {alphabets.map(letter => (
                    <Button
                        key={letter}
                        variant={selectedLetter === letter ? 'contained' : 'outlined'}
                        onClick={() => handleLetterClick(letter)}
                        sx={{ margin: '2px', minWidth: '30px', padding: '5px' }}
                    >
                        {letter}
                    </Button>
                ))}
                <Button
                    variant={selectedLetter === '' ? 'contained' : 'outlined'}
                    onClick={() => handleLetterClick('')}
                    sx={{ margin: '2px', minWidth: '30px', padding: '5px' }}
                >
                    Tümü
                </Button>
            </Box>
            <Grid container spacing={2}>
                {filteredUnits.map(unit => (
                    <Grid item xs={12} sm={6} md={4} key={unit}>
                        <Box sx={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                            {unit.attributes.Title}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
export default HealthServices