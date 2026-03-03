import React, { useEffect, useState } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import styles from 'styles/Contact.module.css';

const Contact = () => {
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(process.env.PUBLIC_URL + '/contents/contact.yaml');
        const data = yaml.load(response.data);
        setContactData(data.CONTACT);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchContactData();
  }, []);

  return (
    <div className={styles.container}>
      {contactData.map((section, index) => (
        <div key={index} className={styles.section}>
          <h2>{section.TITLE}</h2>
          <ReactMarkdown remarkPlugins={[remarkBreaks]}>{section.TEXT}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default Contact;
