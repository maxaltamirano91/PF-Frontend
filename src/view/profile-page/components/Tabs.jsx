import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Tabs.module.css';

const Tabs = ({ tabs }) => {
const [activeTab, setActiveTab] = useState(tabs[0].key);

return (
    <div className={styles.tabsContainer}>
    <div className={styles.tabs}>
        {tabs.map(tab => (
        <button
            key={tab.key}
            className={`${styles.tab} ${activeTab === tab.key ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.key)}
        >
            {tab.label}
        </button>
        ))}
    </div>
    <div className={styles.tabContent}>
        {tabs.map(tab => activeTab === tab.key && (
        <div key={tab.key}>
            {tab.content}
        </div>
        ))}
    </div>
    </div>
);
};

Tabs.propTypes = {
tabs: PropTypes.arrayOf(
    PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    })
).isRequired,
};

export default Tabs;
