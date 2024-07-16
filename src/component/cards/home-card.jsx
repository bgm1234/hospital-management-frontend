import React, { useState } from 'react'
import { Button, CardActions, Typography, CardContent, CardMedia, Card, CardActionArea } from '@mui/material'
import HomeDialog from '../dialogs/home-dialog';
const HomeCard = ({ title, items }) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    

    const handleClickOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
    };
    console.log(selectedItem , open);  
    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
    };
    return (
        <div>
            <h1>{title}</h1>
            <div style={{
                display: "flex",
                flexWrap: "wrap", // gerektiğinde kartın alt satıra geçmesını sağlar.

            }}>
                {Array.isArray(items) && items.map(item => (
                    <Card sx={{ maxWidth: 345, margin: 5 }}>
                        <CardActionArea onClick={() => handleClickOpen(item)}>
                            <CardMedia
                                component="img"
                                height="200"
                                image="https://www.imperialhastanesi.com/resimler/checkup1.jpg"
                            />
                            <CardContent style={{ height: 80 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.attributes.title}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button style={{ marginTop: 10 }} size="small" color="primary" onClick={() => handleClickOpen(item)}>
                                Detay
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
            <HomeDialog
                open={open}
                onClose={handleClose}
                item={selectedItem}></HomeDialog>
        </div>
    )
}

export default HomeCard