import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../../redux/actions";
import Cards from "../../components/cards/Cards";

const ProfilePage = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { userProfile } = useSelector(state => state.user)
  const { authToken } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getUserProfile(authToken))
  },[])
  
  if (isLoading & !userProfile) return <div>Loading ...</div>;
  
  console.log(userProfile);
  if (isAuthenticated) return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <hr />
      </div>
    )
  
  if (userProfile) return (
    <div>
        <img src={userProfile.image} alt={userProfile.userName} />
        <h2>{userProfile.userName}</h2>
        <p>{userProfile.email}</p>
        <hr />
        <Cards projects={userProfile.projects} />
      </div>
  ) 
}

export default ProfilePage;

//TENGO QUE REVISAR QUE REALMENTE FUNCIONE Y NO TIRE ERROR 

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useAuth0 } from '@auth0/auth0-react';
// import { getUserProfile } from '../../redux/actions'; 

// const Profile = () => {
// const { user, isAuthenticated } = useAuth0();
// const dispatch = useDispatch();
// const userProfile = useSelector((state) => state.userProfile); 

// useEffect(() => {
//     if (isAuthenticated && user.email) {
//     dispatch(getUserProfile(user.email)); 
//     }
// }, [dispatch, isAuthenticated, user.email]);

// if (!isAuthenticated) {
//     return null;
// }

// return (
//     <div>
//     <img src={user.picture} alt={user.name} />
//     <h2>{user.name}</h2>
//     <p>{user.email}</p>
//     {userProfile && (
//         <div>
//         <h3>Información adicional:</h3>
//         <p>Nombre de usuario: {userProfile.userName}</p>
//         <p>Email: {userProfile.email}</p>
//         <p>Username: {userProfile.userName}</p>
//         <p>Bio: {userProfile.bio}</p>
//         <p>Rol: {userProfile.role}</p>
//         </div>
//     )}
//     </div>
// );
// };

// export default Profile;