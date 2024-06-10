import React from 'react'
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";


const Home = () => {

    const location = useLocation();
    const [outletActive, setOutletActive] = useState(location.pathname == '/');
    const { t, i18n } = useTranslation();



    useEffect(() => {
        setOutletActive(location.pathname == '/');
    }, [location.pathname]);
    return (
        <div style={{ display: "flex" }}>
            <p>{(Home.body)}</p>
            <div style={{ width: 150, backgroundColor: "#f0f0f0", padding: 20, minHeight: 600 }}>
                <ul style={{ fontWeight: "bold" }}>
                    <li style={{ marginBottom: '8px' }}><Link to={"/healty-services"}>{t("departments")}</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/doctors"}>{t("doctors")}</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/my-patients"} >{t("myPatients")}</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/my-appointments"} >{t("myAppointments")}</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/patient-registration"} >{t("patientRegistration")}</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/patient-list"}>{t("patientList")}</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/appointments"} >{t("appointments")}</Link></li>
                </ul>
            </div>
            <div style={{ padding: 20 }}>
                {outletActive && (
                    <div>
                        Outlet aktif olduğunda görüntülenmeyecek.
                    </div>
                )}
                <Outlet />
            </div>
        </div>
    )
}

export default Home