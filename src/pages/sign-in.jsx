import { Container, TextField, Button, Typography, Box, Link, Avatar, Grid } from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";


const SignIn = () => {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post('http://localhost:1337/api/auth/local', { "identifier": email, "password": password });
            const { jwt, user } = response.data; // Gelen yanıtın token ve kullanıcı bilgilerini alıyoruz.
            console.log(jwt, user);
            const branchResponse = await axios.get(`http://localhost:1337/api/braches?populate=*`);
            const branch = branchResponse.data;
            let userBranch = null;

            branch.data.forEach(branch => {
                branch.attributes.users.data.forEach(userObj => {
                    if (userObj.id === user.id) {
                        userBranch = branch.attributes.name;
                    }
                });
            });
            if (userBranch) {
                user.branch = userBranch; // Branch bilgisini user nesnesine ekleyin
            }
            login(jwt, user); // login fonksiyonunu jwt ve güncellenmiş user nesnesi ile çağırın
            navigate('/');

        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t("login")}
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id='identifier'
                                label={t("email")}
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label={t("password")}
                                type="password"
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        {t("login")}
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                        onClick={() => {
                            setEmail('');
                            setPassword('');
                        }}
                    >
                        {t("clear")}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                {t("I forgot my password")}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default SignIn