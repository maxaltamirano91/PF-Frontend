import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchTechnologies,
    filterTechnologies,
    getAllProjects,
} from '../../redux/actions';
import styles from './Filter.module.css';

const Filter = () => {
    const dispatch = useDispatch();
    const { technologies } = useSelector((state) => state.technologies);
    const { token } = useSelector((state) => state.auth);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('new');
    const pagination = 10;

    const options = technologies.map((tech) => ({
        value: tech.name,
        label: tech.name,
        key: tech.name,
    }));

    const handleInputChange = (select) => {
        setSelectedOptions(select);
    };

    const handleSortChange = (sort) => {
        setSortOrder(sort);
    };

    const handleSubmit = () => {
        const selectedTechnologies = selectedOptions.map((option) => option.value);
        dispatch(filterTechnologies(selectedTechnologies));
        dispatch(getAllProjects(pagination, search, selectedTechnologies, sortOrder));
    };

    useEffect(() => {
        dispatch(fetchTechnologies(token));
    }, [dispatch, token]);

    return (
        <section className={styles.section}>
            <div>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
                    integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </div>
            <div className={styles.selectsContainer}>
                <Select
                    options={options}
                    onChange={handleInputChange}
                    value={selectedOptions}
                    isMulti={true}
                    placeholder="Selecciona tecnología"
                    styles={customStylesSelectReact}
                />
            </div>
            <div className={styles.searchContainer}>
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Nombre del proyecto"
                />
            </div>
            <div className={styles.btnContainer}>
                <button className="btn btn-light" onClick={handleSubmit}>
                    Filtrar
                </button>
            </div>
            <div className={styles.sortButtons}>
                <button
                    className={sortOrder === 'a-z' ? styles.selected : ''}
                    onClick={() => handleSortChange('a-z')}
                >
                    A-Z
                </button>
                <button
                    className={sortOrder === 'z-a' ? styles.selected : ''}
                    onClick={() => handleSortChange('z-a')}
                >
                    Z-A
                </button>
                <button
                    className={sortOrder === 'new' ? styles.selected : ''}
                    onClick={() => handleSortChange('new')}
                >
                    Recientes
                </button>
                <button
                    className={sortOrder === 'old' ? styles.selected : ''}
                    onClick={() => handleSortChange('old')}
                >
                    Viejos
                </button>
            </div>
        </section>
    );
};

export default Filter;

const customStylesSelectReact = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#fff',
        color: '#333',
        borderColor: state.isFocused ? '#aaa' : '#a8a8a88e',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#333',
        color: '#fff',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused
            ? '#757575'
            : state.isSelected
            ? '#555'
            : '#333',
        color: '#fff',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#fff',
    }),
};
