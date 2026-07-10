import React, { useEffect, useState } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import styles from 'styles/Home.module.css';

const Home = () => {
  const [homeData, setHomeData] = useState([]);
  const [hero, setHero] = useState(null);
  const [researchTopics, setResearchTopics] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get(process.env.PUBLIC_URL + '/contents/home.yaml');
        const data = yaml.load(response.data);
        setHomeData(data.HOME);
        setHero(data.HERO || null);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    const fetchResearchTopics = async () => {
      try {
        const response = await axios.get(process.env.PUBLIC_URL + '/contents/research_topics.yaml');
        const data = yaml.load(response.data);
        setResearchTopics(data.TOPICS);
      } catch (error) {
        console.error('Error fetching research topics:', error);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axios.get(process.env.PUBLIC_URL + '/contents/news.yaml');
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
      {hero && (
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            {hero.EYEBROW && <p className={styles.heroEyebrow}>{hero.EYEBROW}</p>}
            {hero.TITLE && <h1 className={styles.heroTitle}>{hero.TITLE}</h1>}
            {hero.SUBTITLE && <p className={styles.heroSubtitle}>{hero.SUBTITLE}</p>}
            {hero.KEYWORDS && (
              <div className={styles.heroKeywords}>
                {hero.KEYWORDS.map((keyword, index) => (
                  <span key={index} className={styles.heroKeyword}>{keyword}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {homeData.map((section, index) => (
        <div key={index} className={styles.section}>
          <h2>{section.TITLE}</h2>
          <div className={styles.sectionBody}>
            <ReactMarkdown rehypePlugins={[remarkBreaks]}>{section.TEXT}</ReactMarkdown>
          </div>
        </div>
      ))}

      <div className={styles.section}>
        <h2>Research Topics</h2>
        <div className={styles.topicsContainer}>
          {researchTopics.map((topic, index) => (
            <div key={index} className={styles.topic}>
              {topic.PICTURE && (
                <div className={styles.topicImageWrap}>
                  <img
                    src={process.env.PUBLIC_URL + topic.PICTURE}
                    alt={topic.TITLE}
                    className={styles.topicImage}
                  />
                </div>
              )}
              <h3 className={styles.topicTitle}>{topic.TITLE}</h3>
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
          <div key={index} className={styles.newsYearBlock}>
            <h3 className={styles.newsYear}>{yearData.YEAR}</h3>
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
