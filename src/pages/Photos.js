import React, { useEffect, useState } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import "react-photo-album/masonry.css";
import styles from 'styles/Photos.module.css';

const Photos = () => {
  const [photosData, setPhotosData] = useState([]);

  useEffect(() => {
    const fetchPhotosData = async () => {
      try {
        const response = await axios.get(process.env.PUBLIC_URL + '/contents/photos.yaml');
        const data = yaml.load(response.data);
        
        // Fetch the photo data directly with width and height from YAML
        const photosWithDimensions = data.PHOTOS.map((yearData) => {
          const workshopsWithDimensions = yearData.WORKSHOPS.map((workshop) => {
            const filesWithDimensions = workshop.FILES.map((file) => ({
              src: file.FILE,
              width: file.WIDTH,
              height: file.HEIGHT,
            }));
            return { ...workshop, FILES: filesWithDimensions };
          });
          return { ...yearData, WORKSHOPS: workshopsWithDimensions };
        });

        setPhotosData(photosWithDimensions);
      } catch (error) {
        console.error('Error fetching photos data:', error);
      }
    };

    fetchPhotosData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>PHOTOS</h1>
      {photosData.map((yearData, index) => (
        <div key={index} className={styles.yearSection}>
          <h2>{yearData.YEAR}</h2>
          {yearData.WORKSHOPS.map((workshop, idx) => (
            <div key={idx} className={styles.workshopSection}>
              <h3>{workshop.TITLE}</h3>
              <MasonryPhotoAlbum
                photos={workshop.FILES}
                columns={(containerWidth) => {
                  if (containerWidth < 600) return 2;
                  return 3;
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Photos;
