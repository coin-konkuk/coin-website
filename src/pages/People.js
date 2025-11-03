import React, { useEffect, useState } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import PersonCard from 'components/PersonCard';
import styles from 'styles/People.module.css';

const normalizeUrl = (url = '') =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;

const People = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/contents/people.yaml');
        const data = yaml.load(response.data);
        setPeople(data.PEOPLE);
      } catch (error) {
        console.error('Error fetching YAML data:', error);
      }
    };

    fetchData();
  }, []);

  const filterPeople = (position, isCurrent) =>
    people.filter(person => person.POSITION === position && person.ISCURRENT === isCurrent);

  const professors = filterPeople('Professor', true);
  const phdStudents = filterPeople('Ph.D.', true);
  const msStudents = filterPeople('M.S.', true);
  const undergraduateStudents = filterPeople('Undergraduate', true);

  const alumniPhD = filterPeople('Ph.D.', false);
  const alumniMS = filterPeople('M.S.', false);
  const alumniUndergraduate = filterPeople('Undergraduate', false);

  const renderSection = (title, people) => (
    people.length > 0 ?     
        <section>
            <h2>{title}</h2>
                <div className={styles.grid}>
                {people.map(person => <PersonCard key={person.ID} person={person} />)}
                </div>
        </section>
        : 
        <></>
  );

  const renderGraduateAlumniSection = (title, people) => (
    people.length > 0 ? 
        <section>
            <h3>{title}</h3>
            <ul>
                {people.map(person => (
                    <li key={person.ID}>
                        {person.WEBSITE ? (
                          <a href={normalizeUrl(person.WEBSITE)}
                            target="_blank"
                            rel="noopener noreferrer">
                          {person.NAME} </a>
                        ) : (person.NAME)}
                        <span className={styles.alumniInformation}>{person.POSITION}</span>
                        {person.CURRENT_WORKPLACE && (
                          <span className={styles.alumniInformation}> {' '} - {person.CURRENT_WORKPLACE} </span>)}
                    </li>
                ))}
            </ul>
        </section>
        : 
        <></>
  );

  const renderUnderGraduateAlumniSection = (title, people) => (
    people.length > 0 ? 
        <section>
            <h3>{title}</h3>
            <ul>
                {people.map(person => (
                    <li key={person.ID}>
                        {person.WEBSITE ? (
                          <a href={normalizeUrl(person.WEBSITE)}
                            target="_blank"
                            rel="noopener noreferrer">
                            {person.NAME} </a>
                        ) : (person.NAME)}
                        {person.CURRENT_WORKPLACE && (
                          <span className={styles.alumniInformation}> {' '} - {person.CURRENT_WORKPLACE} </span>)}
                    </li>
                ))}
            </ul>
        </section>
        : 
        <></>
  );

  return (
    <div className={styles.container}>
        <h1>PEOPLE</h1>
      {renderSection('Professor', professors)}
      {renderSection('Ph.D. Students', phdStudents)}
      {renderSection('M.S. Students', msStudents)}
      {renderSection('Undergraduate Students', undergraduateStudents)}
      <section>
        <h2>Alumni</h2>
        {renderGraduateAlumniSection('Graduate Students', [...alumniPhD, ...alumniMS])}
        {renderUnderGraduateAlumniSection('Undergraduate Students', alumniUndergraduate)}
      </section>
    </div>
  );
};

export default People;
