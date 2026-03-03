import React, { useEffect, useState } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import YearPublications from 'components/YearPublications';
import styles from 'styles/Publications.module.css';

const Publications = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.PUBLIC_URL + '/contents/publications.yaml');
        const data = yaml.load(response.data);
        setPublications(data.PUBLICATIONS);
      } catch (error) {
        console.error('Error fetching YAML data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
        <h1>PUBLICATIONS</h1>
      {publications.map((yearData) => (
        <YearPublications key={yearData.YEAR} year={yearData.YEAR} publications={yearData.PUBLICATIONS} />
      ))}
    </div>
  );
};

export default Publications;
