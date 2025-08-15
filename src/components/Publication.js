import React, { useEffect, useState } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import styles from 'styles/Publication.module.css';

const Publication = ({ publication }) => {
  const [authors, setAuthors] = useState({});

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('/contents/people.yaml');
        const data = yaml.load(response.data);
        const authorMap = {};
        data.PEOPLE.forEach(person => {
          authorMap[person.ID] = person;
        });
        setAuthors(authorMap);
      } catch (error) {
        console.error('Error fetching author data:', error);
      }
    };

    fetchAuthors();
  }, []);

  const renderAuthors = publication.AUTHORS.map((author, index) => {
    const authorInfo = authors[author.ID];
    const isLast = index === publication.AUTHORS.length - 1;
    const separator = isLast ? '' : (index === publication.AUTHORS.length - 2 ? ' and ' : ', ');

    if (authorInfo) {
      return authorInfo.WEBSITE 
        ? <span key={author.ID}><a className={styles.name} href={authorInfo.WEBSITE} target="_blank" rel="noopener noreferrer">{authorInfo.NAME}</a>{separator}</span>
        : <span key={author.ID}>{authorInfo.NAME}{separator}</span>;
    } else {
      return <span key={author.ID}>{author.ID}{separator}</span>;
    }
  });

  return (
    <div className={styles.publication}>
      <img src={publication.IMAGE} alt={publication.TITLE} className={styles.image} />
      <div className={styles.details}>
        <h4>{publication.TITLE}</h4>
        <p>{renderAuthors}</p>
        <p>{publication.VENUE}</p>
        <div className={styles.links}>
          {publication.PDF && <a href={publication.PDF} target="_blank" rel="noopener noreferrer">[PDF]</a>}
          {publication.CODE && <a href={publication.CODE} target="_blank" rel="noopener noreferrer">[Code]</a>}
        </div>
      </div>
    </div>
  );
};

export default Publication;
