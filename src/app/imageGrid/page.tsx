"use client";
import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

type ImageData = {
  id: string;
  url: string;
  title?: string;
  tags?: string[];
};

interface ImageGridProps {
  images: ImageData[];
  handleDelete: (id: string) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, handleDelete }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const imagesPerPage = 6;

  const filteredImages = images.filter((img) => {
    const titleMatch = img.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const tagMatch = img.tags?.some((tag) =>
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return titleMatch || tagMatch;
  });

  const paginatedImages = filteredImages.slice(
    (page - 1) * imagesPerPage,
    page * imagesPerPage
  );

  const handleOpen = (image: ImageData) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-2">
      <TextField
        label="Search by title or tag"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setPage(1); // search করলে pagination reset
        }}
      />
      <Grid container spacing={2}>
        {paginatedImages.map((img) => (
          <Grid item xs={12} sm={6} md={4} key={img.id}>
            <Card sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                image={img.url}
                alt={img.title || "Uploaded image"}
                sx={{
                  cursor: "pointer",
                  height: 200, // Fixed height
                  width: "100%", // Full width of the card
                  objectFit: "cover", // Crops nicely
                }}
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

      {/* Pagination */}
      {filteredImages.length > imagesPerPage && (
        <div className="flex justify-center my-4">
          <Pagination
            count={Math.ceil(filteredImages.length / imagesPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}

      {/* Dialog for image preview */}
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
