import React, { useEffect, useState } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import styles from 'styles/Publication.module.css';

const toPublicUrl = (u = "") =>
  /^https?:\/\//i.test(u) ? u : (process.env.PUBLIC_URL + (u.startsWith("/") ? u : `/${u}`));

const Publication = ({ publication }) => {
  const [authors, setAuthors] = useState({});
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(process.env.PUBLIC_URL + '/contents/people.yaml');
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
        ? <span key={author.ID}><a className={styles.name} href={toPublicUrl(authorInfo.WEBSITE)} target="_blank" rel="noopener noreferrer">{authorInfo.NAME}</a>{separator}</span>
        : <span key={author.ID}>{authorInfo.NAME}{separator}</span>;
    } else {
      return <span key={author.ID}>{author.ID}{separator}</span>;
    }
  });

  return (
    <div className={styles.publication}>
      {publication.IMAGE && !imageFailed ? (
        <div className={styles.imageWrap}>
          <img
            src={process.env.PUBLIC_URL + publication.IMAGE}
            alt={publication.TITLE}
            className={styles.image}
            onError={() => setImageFailed(true)}
          />
        </div>
      ) : (
        <div className={styles.imagePlaceholder} aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="16" y2="13" />
            <line x1="8" y1="17" x2="13" y2="17" />
          </svg>
        </div>
      )}
      <div className={styles.details}>
        <h4 className={styles.title}>{publication.TITLE}</h4>
        <p className={styles.authors}>{renderAuthors}</p>
        <p className={styles.venue}>{publication.VENUE}</p>
        <div className={styles.links}>
          {publication.PDF && <a href={toPublicUrl(publication.PDF)} target="_blank" rel="noopener noreferrer">PDF</a>}
          {publication.CODE && <a href={toPublicUrl(publication.CODE)} target="_blank" rel="noopener noreferrer">Code</a>}
        </div>
      </div>
    </div>
  );
};

export default Publication;
