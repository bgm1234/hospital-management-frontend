import "./App.css";
import { AppBar, Toolbar, Button, ButtonGroup, Typography } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import Doctors from "./pages/doctors";
import HealthServices from "./pages/health-services";
import MyPatient from "./pages/my-patients";
import MyAppointments from "./pages/my-appointments";
import PatientRegistration from "./pages/patient-registration";
import PatientList from "./pages/patient-list";
import Appointments from "./pages/appointments";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../src/context/AuthContext";

function App() {
  const { t, i18n } = useTranslation();
  const { authData, logout } = useAuthContext();
  console.log("aktıf dıl" + i18n.language);
  console.log(authData?.user);
  return (
    <div>
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <Button component={Link} to={"/"}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXd13FJJ9NvzUpsCE8BU1HP0GQnf_Pvgc45w&usqp=CAU"
                style={{ marginLeft: "30px", width: "60px", height: "auto" }}
              />
            </Button>
            <Button color="inherit"></Button>
            <div style={{ flexGrow: 1 }} />
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button onClick={() => i18n.changeLanguage("en")}>EN</Button>
              <Button onClick={() => i18n.changeLanguage("tr")}>TR</Button>
            </ButtonGroup>
            {authData?.user ? (
              <div style={{ display: 'flex', alignItems: 'center' , flexDirection:"column" , marginLeft:15}}>
                <Typography>{authData?.user.name} {authData?.user.surname}</Typography>
                 <Button
                  style={{ textTransform: "none" }}
                  color="inherit"
                  onClick={logout}
                >
                  {t("logout")}
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  style={{ textTransform: "none" }}
                  color="inherit"
                  component={Link}
                  to={"/sign-in"}
                >
                  {t("login")}
                </Button>
                <Button
                  style={{ textTransform: "none" }}
                  color="inherit"
                  component={Link}
                  to={"/sign-up"}
                >
                  {t("register")}
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <div style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/doctors" element={<Doctors />}></Route>
            <Route path="/health-services" element={<HealthServices />}></Route>
            <Route path="/my-patients" element={<MyPatient />}></Route>
            <Route path="/my-appointments" element={<MyAppointments />}></Route>
            <Route
              path="/patient-registration"
              element={<PatientRegistration />}
            ></Route>
            <Route path="/patient-list" element={<PatientList />}></Route>
            <Route path="/appointments" element={<Appointments />}></Route>
          </Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
