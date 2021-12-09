import { FC } from 'react';
import styles from './PreviewImages.module.css';

const PreviewImages: FC<{
  classes?:string,
  images: string[];
  currentImage: string;
  onChangeImage: (src: string) => void;
}> = ({ images, currentImage, onChangeImage, classes }) => {
  return (
    <div className={`${styles['preview-container']} ${classes}`}>
      <img src={currentImage} alt='img desc' />
      <div className={styles.preview}>
        {images.map((src:string, i:number) => (
          <img
            className={src === currentImage ? styles.active : ''}
            key={i}
            src={src}
            alt='img desc'
            onMouseOver={onChangeImage.bind(null, src)}
          />
        ))}
      </div>
    </div>
  );
};

export default PreviewImages;
