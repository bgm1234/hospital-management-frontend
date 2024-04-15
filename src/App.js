import "./App.css";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Routes, Route , Link} from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import Doctors from "./pages/doctors";
import HealtyServices from "./pages/healty-services";

function App() {
  
  return (
    <div>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button
            component={Link} to={"/"}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXd13FJJ9NvzUpsCE8BU1HP0GQnf_Pvgc45w&usqp=CAU"
                style={{ width: "60px", height: "auto" }}
              />
            </Button>
            <Button color="inherit"></Button>
            <div style={{ flexGrow: 1 }} />
            <Button color="inherit" component={Link} to={"/sign-in"}>Giriş Yap</Button>
            <Button color="inherit" component={Link} to={"/sign-up"}>Kayıt Ol</Button>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} >
            <Route path="/doctors" element={<Doctors/>}></Route>
            <Route path="/healty-services" element={<HealtyServices/>}></Route>
          </Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
