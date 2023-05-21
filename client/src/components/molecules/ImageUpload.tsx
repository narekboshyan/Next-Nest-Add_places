import React, {
 useRef,
 useState,
 useEffect,
 ChangeEvent,
 useCallback,
} from "react";

import Button from "@/components/atoms/Button";

import Image from "next/image";

interface Props {
 id: string;
 center?: boolean;
 onInput: (id: string, file: any, isValid: boolean) => void;
 errorText: string;
}

const ImageUpload: React.FC<Props> = ({ id, center, onInput, errorText }) => {
 const [file, setFile] = useState<File>();
 const [previewUrl, setPreviewUrl] = useState<string>();
 const [isValid, setIsValid] = useState<boolean>(false);

 const filePickerRef = useRef<HTMLInputElement>(null);

 useEffect(() => {
  if (!file) {
   return;
  }
  const fileReader = new FileReader();
  fileReader.onload = () => {
   setPreviewUrl(fileReader.result as string);
  };
  fileReader.readAsDataURL(file);
 }, [file]);

 const pickedHandler = useCallback(
  (event: ChangeEvent<HTMLInputElement>) => {
   let pickedFile;
   let fileIsValid = isValid;
   if (event.target.files && event.target.files.length === 1) {
    pickedFile = event.target.files[0];
    setFile(pickedFile);
    setIsValid(true);
    fileIsValid = true;
   } else {
    setIsValid(false);
    fileIsValid = false;
   }
   onInput(id, pickedFile as File, fileIsValid);
  },
  [id, isValid, onInput]
 );

 const pickImageHandler = useCallback(() => {
  if (filePickerRef.current) {
   filePickerRef.current.click();
  }
 }, []);

 return (
  <div className={`form-control imageUpload`}>
   <input
    id={id}
    ref={filePickerRef}
    style={{ display: "none" }}
    type="file"
    accept=".jpg,.png,.jpeg"
    onChange={pickedHandler}
   />
   <div className={`preview ${center && "center"}`}>
    {previewUrl && (
     <Image src={previewUrl} alt="Preview" width={80} height={80} />
    )}
    {!previewUrl && <p>Please pick an image.</p>}
   </div>
   <Button type="button" onClick={pickImageHandler}>
    PICK IMAGE
   </Button>
   {!isValid && <p>{errorText}</p>}
  </div>
 );
};

export default ImageUpload;
