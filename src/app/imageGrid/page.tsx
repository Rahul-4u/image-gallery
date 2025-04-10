"use client";
import React, { useState } from "react";
import { Grid, Card, CardMedia, IconButton, Dialog, DialogContent, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

type ImageData = {
  id: string;
  url: string;
  title?: string;
};

interface ImageGridProps {
  images: ImageData[];
}

 // Handle Open - To show the clicked image in a dialog
 
const ImageGrid: React.FC<ImageGridProps> = ({ images, handleDelete }) => {
    const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

    
    
     const handleOpen = (image: ImageData) => {
       setSelectedImage(image);
       setOpen(true);
     };

     // Handle Close - Close the dialog
     const handleClose = () => {
       setOpen(false);
       setSelectedImage(null);
     };

  return (
    <div   className="max-w-7xl mx-auto">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {images.map((img) => (
          <Grid size={{ xs: 2, sm: 4, md: 4 }} key={img.id}>
            <Card sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="100"
                image={img.url}
                alt={img.title || "Uploaded image"}
                sx={{ cursor: "pointer" }}
                onClick={() => handleOpen(img)}
              />
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(img.id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(255,255,255,0.8)",
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="zoom"
                onClick={() => handleOpen(img)}
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  backgroundColor: "rgba(255,255,255,0.8)",
                }}
              >
                <ZoomInIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Image Dialog for preview */}
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogContent>
          {selectedImage && (
            <>
              <img
                src={selectedImage.url}
                alt={selectedImage.title || "Preview"}
                style={{ width: "100%", borderRadius: 8 }}
              />
              {selectedImage.title && (
                <Typography variant="subtitle1" mt={1}>
                  {selectedImage.title}
                </Typography>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGrid;
