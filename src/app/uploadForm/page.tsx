// UploadForm.tsx
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
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      alert("Please select at least one image");
      return;
    }

    setLoading(true);

    try {
      const uploadedImages: ImageData[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await uploadToCloudinary(file);
        uploadedImages.push({
          id: `${Date.now() + i}`,
          url,
          title: title || `Image ${i + 1}`,
        });
      }

      onImageUpload(uploadedImages);
      setTitle("");
      setTags("");
      setFiles(null);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    }

    setLoading(false);
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </Stack>
    </Box>
  );
};

export default UploadForm;
