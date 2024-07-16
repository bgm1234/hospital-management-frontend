import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import HomeCard from '../component/cards/home-card';


const Home = () => {

    const location = useLocation();
    const [outletActive, setOutletActive] = useState(location.pathname == '/');
    const [healthPacks, setHealthPacks] = useState([])
    const [healthLibraries, setHealthLibraries] = useState({})
    const { t, i18n } = useTranslation();

    const loadHealthPacks = useCallback(() => {
        axios.get("http://localhost:1337/api/heatlh-packs?populate=*")
            .then(response => {
                setHealthPacks(response.data.data);
            })
            .catch(error => {
                console.error("Bir hata oluştu:", error);
            });
    }, []);
    useEffect(() => {
        loadHealthPacks()
    }, [loadHealthPacks])

    const loadHealthLibraries = useCallback(() => {
        axios.get("http://localhost:1337/api/health-libraries?populate=*")
            .then(response => {
                setHealthLibraries(response.data.data);
            })
            .catch(error => {
                console.error("Bir hata oluştu:", error);
            });
    }, []);
    useEffect(() => {
        loadHealthLibraries()
    }, [loadHealthLibraries])
   
    useEffect(() => {
        setOutletActive(location.pathname == '/');
    }, [location.pathname]);
    return (
        <div >
            <div style={{ width: 150, backgroundColor: "#f0f0f0", padding: 20, position: "fixed", minHeight: '100vh' }}>
                <ul style={{ fontWeight: "bold" }}>
                    <li style={{ marginBottom: '8px' }}><Link to={"/health-services"}>{t("departments")}</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/doctors"}>{t("doctors")}</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/my-patients"} >{t("myPatients")}</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/my-appointments"} >{t("myAppointments")}</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/patient-registration"} >{t("patientRegistration")}</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/patient-list"}>{t("patientList")}</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/appointments"} >{t("appointments")}</Link></li>
                </ul>
            </div>
            <div style={{ marginLeft: 190, padding: 20 }}>
                {outletActive && (
                    <div>
                        <HomeCard title={"Sağlık Paketleri"} items={healthPacks} />
                        <HomeCard title={"Sağlık Kütüphanesi"} items={healthLibraries} />
                    </div>
                )}
                <Outlet />
            </div>
        </div>
    )
}

export default Home