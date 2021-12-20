import { FC, memo } from 'react';
import LoadingSpinner from './LoadingSpinner';
import styles from './PreviewImages.module.css';

const PreviewImages: FC<{
  isLoading?: boolean;
  classes?: string;
  images: string[];
  currentImage: string;
  onChangeImage: (src: string) => void;
}> = memo(({ isLoading, images, currentImage, onChangeImage, classes }) => {
  return (
    <div className={`${styles['preview-container']} ${classes}`}>
      <img src={currentImage} alt='img desc' />
      {isLoading && <LoadingSpinner className={styles.loading} />}
      <div className={styles.preview}>
        {images.slice(1).map((src: string, i: number) => (
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
});

export default PreviewImages;
