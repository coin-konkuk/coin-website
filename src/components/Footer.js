import React, { useEffect, useState } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import styles from 'styles/Footer.module.css';

const toPublicUrl = (u = "") =>
  /^https?:\/\//i.test(u) ? u : (process.env.PUBLIC_URL + (u.startsWith("/") ? u : `/${u}`));


const Footer = () => {
  const [contact, setContact] = useState({});

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(process.env.PUBLIC_URL + '/contents/footer.yaml');
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
        <div className={styles.labInfo}>
          <p className={styles.labName}>Connected Intelligence Lab</p>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} CoIn Lab, Konkuk University. All rights reserved.
          </p>
        </div>
        <div className={styles.contactInfo}>
          <h4>Contact</h4>
          {contact.ADDRESS && <p>{contact.ADDRESS}</p>}
          {contact.PHONE && <p>{contact.PHONE}</p>}
          {contact.EMAIL && (
            <p>
              <a href={toPublicUrl(`mailto:${contact.EMAIL}`)}>{contact.EMAIL}</a>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
