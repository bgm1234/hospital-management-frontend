import React from 'react'
import { useState , useEffect } from 'react';
import { Link, Outlet , useLocation} from 'react-router-dom'

const Home = () => {
    const location = useLocation();
    const [outletActive, setOutletActive] = useState(location.pathname == '/');

    useEffect(() => {
        setOutletActive(location.pathname == '/');
      }, [location.pathname]);
    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: 150, backgroundColor: "#f0f0f0", padding: 20, minHeight: 600 }}>
                <ul style={{ fontWeight: "bold" }}>
                    <li style={{ marginBottom: '8px' }}><Link to={"/doctors"}>Doktorlar</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/healty-services"}>Hizmetler</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/my-patients"} >Hastalarım</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/my-appointments"} >Randevularım</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/patient-registration"} >Hasta Kayıt</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/patient-list"}>Hasta Listesi</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/appointments"} >Randevular</Link></li>
                </ul>
            </div>
            <div  style={{ padding: 20 }}>
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