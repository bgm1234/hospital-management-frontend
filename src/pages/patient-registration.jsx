import { Typography, Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const PatientRegistration = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        phone: '',
        tc: '',
        email: '',
        birthday: null,
        sex: '',
        bloodType: ''
    });

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }, [data, setData]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        axios.post('http://localhost:1337/api/patients', {
            data: data
        })
            .then(response => {
                console.log('Başarıyla eklendi:', response.data);
                setData({
                    name: '',
                    phone: '',
                    tc: '',
                    email: '',
                    birthday: '',
                    sex: '',
                    bloodType: ''
                });
                navigate('/patient-profile');
            })
            .catch(error => {
                console.error('Bir hata oluştu:', error);
            });
    }, [data]);
    return (

        <div style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
                Yeni Hasta Kayıt
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <TextField
                    label="Adı Soyadı"
                    variant="outlined"
                    margin="normal"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    sx={{ width: 430 }}
                />

                <TextField
                    label="TC"
                    variant="outlined"
                    margin="normal"
                    name="tc"
                    value={data.tc}
                    onChange={handleChange}
                    sx={{ width: 430 }}
                />
                <TextField
                    label="Telefon"
                    type="phone"
                    variant="outlined"
                    margin="normal"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    sx={{ width: 430 }}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    fullWidth
                    margin="normal"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    sx={{ width: 430 }}
                />
                <TextField
                    label="Doğum Tarihi"
                    type="date"
                    variant="outlined"
                    margin="normal"
                    name="birthday"
                    value={data.birthday}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ width: 328 }}
                />

                <TextField
                    label="Kan Grubu"
                    variant="outlined"
                    margin="normal"
                    name="bloodType"
                    value={data.bloodType}
                    onChange={handleChange}
                    sx={{ width: 328 }}
                />
                <FormControl variant="outlined" margin="normal" sx={{ width: 190 }}>
                    <InputLabel id="demo-simple-select-label">Cinsiyet</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        label="Cinsiyet"
                        name="sex"
                        value={data.sex}
                        onChange={handleChange}
                    >
                        <MenuItem value="Erkek">Erkek</MenuItem>
                        <MenuItem value="Kadın">Kadın</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Button onClick={handleSubmit} variant="contained" color="primary" style={{marginTop:15 , marginLeft:810}}>
                Ekle
            </Button>

        </div>
    )
}

export default PatientRegistration