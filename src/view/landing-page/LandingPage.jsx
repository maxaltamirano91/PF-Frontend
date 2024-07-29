import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles['landing-page']}>
      <div className={styles['hero-section']}>
        <img
          src="https://i.ibb.co/z2Pg2h5/modern-gradient-background-picjumbo-com.jpg"
          alt="Modern gradient background"
          className={styles['hero-image']}
        />
        <div className={styles['hero-text']}>
          <h1>
            Los mejores programadores están en ForDevs
          </h1>
          <Link to="/home" className={`${styles.btn} ${styles['btn-purple-moon']}`}>
            Empezá
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
