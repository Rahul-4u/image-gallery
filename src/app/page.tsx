"use client";
import React, { useState } from "react";
import UploadForm from "./uploadForm/page";
import ImageGrid from "./imageGrid/page";
import Swal from "sweetalert2";


const page = () => {
  const [images, setImages] = useState<ImageData[]>([]); 

  const handleImageUpload = (newImages: ImageData[]) => {
    setImages((prevImages) => [...prevImages, ...newImages]); 
  };
  const handleDelete = (id: string) => {

    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    setImages(images.filter((image) => image.id !== id)); 
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});


    
  };

  return (
    <div className="mt-10 mb-5">
      <UploadForm onImageUpload={handleImageUpload} />{" "}
      <ImageGrid images={images} handleDelete={handleDelete} />
    </div>
  );
};

export default page;
