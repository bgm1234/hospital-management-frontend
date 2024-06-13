import React from "react";
import { Button ,DialogActions,DialogContent,DialogContentText,Dialog,DialogTitle } from "@mui/material";

const HomeDialog =({open , onClose ,item})=>{
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
    return(
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {description}
            </DialogContentText>
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