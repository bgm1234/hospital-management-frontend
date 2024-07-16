import React from "react";
import { Button, DialogActions, DialogContent, DialogContentText, Dialog, DialogTitle, Box } from "@mui/material";

const HomeDialog = ({ open, onClose, item }) => {
    const title = item?.attributes?.title || '';
    const descriptionArray = item?.attributes?.description;

    const processDescription = (description) => {
        if (!Array.isArray(description)) return '';

        return description.map(paragraph => {
            if (paragraph.type === 'paragraph' && Array.isArray(paragraph.children)) {
                return paragraph.children.map(child => child.text).join(' ');
            }
            return '';
        }).join('\n\n'); // Paragraflar arasında iki boşluk bırakmak için
    };

    const description = processDescription(descriptionArray);

    console.log(description);
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#3f51b5' }}>{title}</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <img width={200} src="https://www.imperialhastanesi.com/resimler/checkup1.jpg" alt="dialog visual" />
                    <DialogContentText style={{ textAlign: 'center', marginTop: '16px' ,fontSize: '18px'}}>
                        {description}
                    </DialogContentText>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Kapat
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default HomeDialog