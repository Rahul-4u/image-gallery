"use client";
import React, { useState } from "react";
import UploadForm from "./uploadForm/page";
import ImageGrid from "./imageGrid/page";


const page = () => {
  const [images, setImages] = useState<ImageData[]>([]); 

  const handleImageUpload = (newImages: ImageData[]) => {
    setImages((prevImages) => [...prevImages, ...newImages]); 
  };
  const handleDelete = (id: string) => {
    setImages(images.filter((image) => image.id !== id)); 
  };

  return (
    <div>
      <UploadForm onImageUpload={handleImageUpload} />{" "}
      <ImageGrid images={images} handleDelete={handleDelete} />
    </div>
  );
};

export default page;
