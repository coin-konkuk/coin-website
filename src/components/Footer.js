import React, { useEffect, useState } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import styles from 'styles/Footer.module.css';

const Footer = () => {
  const [contact, setContact] = useState({});

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get('/contents/footer.yaml');
        const data = yaml.load(response.data);
        setContact(data.INFORMATION);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.contactInfo}>
          <h4>Contact</h4>
          <p>Address: {contact.ADDRESS}</p>
          <p>Phone: {contact.PHONE}</p>
          <p>Email: <a href={`mailto:${contact.EMAIL}`}>{contact.EMAIL}</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
