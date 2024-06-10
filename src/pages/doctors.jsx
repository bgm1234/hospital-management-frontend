import React from "react";
import { useState , useCallback,useEffect} from "react";
import { AppBar, Toolbar, Box, Typography, Container, Grid, Card, CardContent, Button, Select, MenuItem, CardMedia } from '@mui/material';
import { useTranslation } from "react-i18next";
import axios from "axios";


const Doctors = () => {
    const [selectedBranch, setSelectedBranch] = useState("All");
    const [branches, setBranches] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const { t, i18n } = useTranslation();

    const loadBranches = useCallback(() => {
        axios.get("http://localhost:1337/api/braches?populate=*")
            .then(response => {
                setBranches(response.data.data);
            })
            .catch(error => {
                console.error("Bir hata oluştu:", error);
            });
    }, []);
    
    const filteredDoctors = useCallback(() => {
        if (selectedBranch === "All") {
            // Tüm doktorları göstermek için
            const allDoctors = branches.flatMap(branch =>
                branch.attributes.users.data.map(user => ({
                    ...user.attributes,
                    branchName: branch.attributes.name
                }))
            );
            setDoctors(allDoctors);
        } else {
            // Belirli bir branch'in doktorlarını göstermek için
            const branch = branches.find(branch => branch.attributes.name === selectedBranch);
            console.log(branch);
            if (branch && branch.attributes.users.data.length > 0) {
                const branchDoctors = branch.attributes.users.data.map(user => ({
                    ...user.attributes,
                    branchName: branch.attributes.name
                }));
                setDoctors(branchDoctors);
                console.log(branchDoctors);
            } else {
                setDoctors([]);
            }
        }
        
    }, [branches, selectedBranch]);
   
    useEffect(() => {
        loadBranches()
    }, [loadBranches])

    useEffect(() => {
        filteredDoctors();
    }, [branches, filteredDoctors,selectedBranch]);


    const handleBranchChange = (event) => {
        setSelectedBranch(event.target.value);
    };
   
    return (
        <div style={{ width: "1000px" }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {t("doctors")}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "20px" }}>
                    <Select
                        value={selectedBranch}
                        onChange={handleBranchChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        style={{ marginLeft: "auto" , width:"150px"}}
                    >
                        <MenuItem value="All">{t("all branches")}</MenuItem>
                        {branches.map(branch => (
                            <MenuItem key={branch.id} value={branch.attributes.name}>{t(branch.attributes.name)}</MenuItem>
                        ))}
                    </Select>
                </Box>
                <Grid container spacing={3}>
                    {doctors.map(doctor => (
                        <Grid item key={doctor.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <CardMedia
                                        component="img"
                                        height="230"
                                        image="https://w7.pngwing.com/pngs/954/328/png-transparent-computer-icons-user-profile-avatar-heroes-head-recruiter-thumbnail.png"
                                        alt="profil resmi"
                                    />
                                    <Typography variant="h6" component="h3">
                                      Dr.  {doctor.name} {doctor.surname}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {t(doctor.branchName)}
                                    </Typography>
                                    <Button style={{ marginTop: 10 }} variant="contained" color="primary">
                                        {t("createAnAppointment")}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}
export default Doctors