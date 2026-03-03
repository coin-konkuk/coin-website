import React from 'react';
import styles from 'styles/PersonCard.module.css';

const normalizeUrl = (url='') => (/^https?:\/\//i.test(url) ? url : `https://${url}`);

const PersonCard = ({ person }) => (
  <div className={styles.card}>
    {/* 이미지 클릭 → WEBSITE로 이동 (있을 때만) */}
    {person.ISCURRENT && (
      person.WEBSITE ? (
        <a
          href={normalizeUrl(person.WEBSITE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${person.NAME} website`}
        >
          <img src={process.env.PUBLIC_URL + person.IMAGE} alt={person.NAME} className={styles.clickableImg} />
        </a>
      ) : (
        <img src={process.env.PUBLIC_URL + person.IMAGE} alt={person.NAME} />
      )
    )}
  
    {person.WEBSITE ? (
        <a href={normalizeUrl(person.WEBSITE)} className={styles.name} target="_blank" rel="noopener noreferrer">
          <p className={styles.nameText}>{person.NAME}</p>
        </a>
      ) : (
        <p className={styles.nameText}>{person.NAME}</p>
      )}
      <p className={styles.email}>{person.EMAIL}</p>
      {person.FIELD && <p className={styles.field}>{person.FIELD}</p>}
      {!person.ISCURRENT && <p>Current Workplace: {person.CURRENT_WORKPLACE}</p>}
  </div>
);

export default PersonCard;
