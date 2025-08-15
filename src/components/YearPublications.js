import React from 'react';
import Publication from './Publication';
import styles from 'styles/YearPublications.module.css';

const YearPublications = ({ year, publications }) => {
  return (
    <div className={styles.yearContainer}>
      <h2>{year}</h2>
      <div className={styles.publications}>
        {publications.map((pub, index) => (
          <Publication key={index} publication={pub} />
        ))}
      </div>
    </div>
  );
};

export default YearPublications;
