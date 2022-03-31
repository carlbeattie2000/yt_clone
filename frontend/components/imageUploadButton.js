import styles from "../static/styles/components/buttons.module.scss";
import { useState } from "react";
import crypto from "crypto";

/* 

  Takes in the elements event, which we get the files from
  then make sure the file has the correct mime type
  after make sure the file does not exceed the max size
  finally load the image into a Image object and max sure it does not
  exceed the min-max height and width.
  if none of the issues above ocurred return the file object


  @return fileObject or ""
*/
async function handleImageUpload(e, maxFileSize, minWidth, maxWidth, minHeight, maxHeight) {
  const validMimeTypes = [
    "image/png", 
    "image/jpg", 
    "image/jpeg", 
    "image/webp"
  ]

  const file = e.target.files[0];

  const fileSizeToMb = file.size / (1024*1024);

  if (!validMimeTypes.includes(file.type) || fileSizeToMb > maxFileSize) {
    e.target.files = null;

    return ""
  }

  const image = await getImageDimensions(file);
  
  file.width = image.width;
  file.height = image.height;


  if (!imageDimensionsMeetRequirements(minWidth, maxWidth, minHeight, maxHeight, file)) {
    e.target.files = null;

    return ""
  }

  return file
}

/* 

  Load the image from the file into a image object
  and then return the width and height of the image

  @return width, height of image

*/
async function getImageDimensions(file) {
  const imageUrl = URL.createObjectURL(file);

  const image = new Image();
  image.src = imageUrl;

  await image.decode();

  return {
    width: image.width,
    height: image.height
  }
}


/*

  Check to see if the image dimensions exceed the min-max limit


  @return true or false
*/

function imageDimensionsMeetRequirements(minWidth, maxWidth, minHeight, maxHeight, file) {
  if (file.width < parseInt(minWidth) || file.width > parseInt(maxWidth)) {
    console.log("width");
    return false
  }

  if (file.height < parseInt(minHeight) || file.height > parseInt(maxHeight)) {
    console.log("height");
    return false
  }

  return true
}

export default function ImageUploadButton({ content, maxFileSize, minWidth, maxWidth, minHeight, maxHeight }) {
  const [file, setFile] = useState("");
  const id = crypto.randomBytes(16).toString("hex");

  return (
    <div className={styles.imageUploadButton}>
      <label htmlFor={id}>{content}</label>
      <input 
        type="file" 
        id={id}
        onInput={async (e) => {
          const file = await handleImageUpload(
            e, 
            maxFileSize,
            minWidth,
            maxWidth,
            minHeight,
            maxHeight);

          setFile(file);
        }}></input>
      {file ? <input type="text" value={file.name} disabled /> : ""}
    </div>
  )
}