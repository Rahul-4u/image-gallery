"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  Input,
} from "@mui/material";

type ImageData = {
  id: string;
  url: string;
  title?: string;
};

interface UploadFormProps {
  onImageUpload: (newImages: ImageData[]) => void; 
}

const UploadForm: React.FC<UploadFormProps> = ({ onImageUpload }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      alert("Please select at least one image");
      return;
    }

    const newImages: ImageData[] = Array.from(files).map((file, index) => ({
      id: `${Date.now() + index}`,
      url: URL.createObjectURL(file),
      title: title || `Image ${index + 1}`,
    }));

    onImageUpload(newImages);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        maxWidth: "500px",
        mx: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        Upload Image
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Tags (comma separated)"
          variant="outlined"
          fullWidth
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <Input
          type="file"
          inputProps={{ multiple: true, accept: "image/*" }}
          onChange={(e) => setFiles(e.target.files)}
        />

        <Button type="submit" variant="contained" color="primary">
          Upload
        </Button>
      </Stack>
    </Box>
  );
};

export default UploadForm;
