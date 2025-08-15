import React, { useEffect, useState } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import styles from 'styles/Home.module.css';

const Home = () => {
  const [homeData, setHomeData] = useState([]);
  const [researchTopics, setResearchTopics] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get('/contents/home.yaml');
        const data = yaml.load(response.data);
        setHomeData(data.HOME);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    const fetchResearchTopics = async () => {
      try {
        const response = await axios.get('contents/research_topics.yaml');
        const data = yaml.load(response.data);
        setResearchTopics(data.TOPICS);
      } catch (error) {
        console.error('Error fetching research topics:', error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axios.get('contents/news.yaml');
        const data = yaml.load(response.data);
        setNews(data.NEWS);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchHomeData();
    fetchResearchTopics();
    fetchNews();
  }, []);

  return (
    <div className={styles.container}>
      {homeData.map((section, index) => (
        <div key={index} className={styles.section}>
          <h2>{section.TITLE}</h2>
          <ReactMarkdown rehypePlugins={[remarkBreaks]}>{section.TEXT}</ReactMarkdown>
        </div>
      ))}

      <div className={styles.section}>
        <h2>Research Topics</h2>
        <div className={styles.topicsContainer}>
          {researchTopics.map((topic, index) => (
            <div key={index} className={styles.topic}>
              <h3 className={styles.topicTitle}>{topic.TITLE}</h3>
              {topic.PICTURE && (
                <img
                  src={topic.PICTURE}
                  alt={topic.TITLE}
                  className={styles.topicImage}
                />
              )}
              {topic.DESCRIPTION && (
                <p className={styles.topicDesc}>{topic.DESCRIPTION}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>News</h2>
        {news.slice(0, 3).map((yearData, index) => (
          <div key={index}>
            <h3>{yearData.YEAR}</h3>
            <ul className={styles.newsList}>
              {yearData.ITEMS.map((item, index) => (
                <li key={index}>
                  <ReactMarkdown rehypePlugins={[remarkBreaks]}>{item.TEXT}</ReactMarkdown>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
