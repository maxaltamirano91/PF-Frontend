import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/actions';
import styles from '../../utils/styles/Users.module.css';

const UserListPage = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.user);
    const authToken = useSelector(state => state.auth.authToken);

    const [sortBy, setSortBy] = useState('userName'); 
    const [sortDirection, setSortDirection] = useState('asc'); 
    
    useEffect(() => {
        if (authToken) {
            dispatch(getAllUsers(authToken));
        }
    }, [dispatch, authToken]);

    const handleSort = (field) => {
        if (field === sortBy) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDirection('asc');
        }
    };

    const sortedUsers = [...users].sort((a, b) => {
        const nameA = a[sortBy].toUpperCase();
        const nameB = b[sortBy].toUpperCase();

        if (sortDirection === 'asc') {
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        } else {
            return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
        }
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={styles.userListPage}>
            <h1>Lista de Usuarios</h1>
            <div>
                <button onClick={() => handleSort('userName')}>
                    Nombre {sortBy === 'userName' && (sortDirection === 'asc' ? '▲' : '▼')}
                </button>

            </div>
            <div className={styles.cardContainer}>
                {sortedUsers.map(user => (
                    <div className={styles.userCard} key={user.id}>
                        <img src={user.image} alt={user.userName} className={styles.userImage} />
                        <div className={styles.userDetails}>
                            <h3>{user.userName}</h3>
                            <p>{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserListPage;
