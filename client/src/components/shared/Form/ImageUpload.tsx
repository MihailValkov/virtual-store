import { FC, useRef, useState, ChangeEvent } from 'react';
import Button from '../Button';
import styles from './ImageUpload.module.css';

const ImageUpload: FC<{
  onUploadFiles: (files: FileList) => void;
  errorMessage?: string;
  text: string;
  classes?: string;
}> = ({ onUploadFiles, text, classes, errorMessage }) => {
  // const [images, setImages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onPickFile = () => inputRef.current!.click();

  const onUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || files.length > 5) {
      return;
    }
    onUploadFiles(files);
    // const reader = new FileReader();
    // reader.readAsDataURL(files[0]);
    //     reader.onloadend = () => {
    //       onUploadFiles(files);
    //     };
    // const fileList = new Array(files.length).fill(0).map((x, i) => URL.createObjectURL(files[i]));
    // setImages(fileList);
    // onUploadFiles(fileList);
  };

  return (
    <>
      <div className={`${styles['upload-file']} ${classes}`}>
        <input
          type='file'
          ref={inputRef}
          onChange={onUploadFile}
          accept='image/*'
          name='photo'
          multiple
        />
        <Button type='button' onClick={onPickFile}>
          {text}
        </Button>
      </div>
      <p className={styles.error}>{errorMessage}</p>
    </>
  );
};

export default ImageUpload;
