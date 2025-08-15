import React from 'react';
import styles from 'styles/PersonCard.module.css';

const PersonCard = ({ person }) => (
  <div className={styles.card}>
    {person.ISCURRENT && <img src={person.IMAGE} alt={person.NAME} />}
    <a href={person.WEBSITE} className={styles.name} target='_blank'>
        <p className={styles.nameText}>{person.NAME}</p>
    </a>
    <p className={styles.email}>{person.EMAIL}</p>
    {person.FIELD && (
        <p className={styles.field}>{person.FIELD}</p>
      )}
    {!person.ISCURRENT && <p>Current Workplace: {person.CURRENT_WORKPLACE}</p>}
  </div>
);

export default PersonCard;
