import React from "react";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import trLocale from '@fullcalendar/core/locales/tr'; // Türkçe dil dosyası
import enLocale from '@fullcalendar/core/locales/en-gb'; // İngilizce dil dosyası
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";


const MyAppointments = () => {
    const { t, i18n } = useTranslation();

    const locale = i18n.language === 'tr' ? trLocale : enLocale;
    return (
        <div>
            <Box p={2} bgcolor="background.paper" borderRadius={4}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    initialView="timeGridWeek" // Haftalık görünüm
                    slotDuration="01:00:00" // Saatlik zaman dilimi (1 saat)
                    slotMinTime="08:00:00" // Gösterilecek en erken saat (08:00)
                    slotMaxTime="18:00:00" // Gösterilecek en son saat (18:00)
                    height="auto"
                    locale={locale}
                    events={[
                        { title: 'Randevu 1', start: '2024-05-20T09:00:00', end: '2024-05-20T10:00:00' },
                        { title: 'Randevu 2', start: '2024-05-21T10:00:00', end: '2024-05-21T11:00:00' },
                    ]}
                    slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false // 24 saat formatı kullan
                    }}
                    slotLabelInterval={{ hours: 1 }}
                /> </Box>
        </div>
    )
}

export default MyAppointments