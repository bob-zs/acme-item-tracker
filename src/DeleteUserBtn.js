
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const DeleteUserBtn = ({ deleteUser, user })=> {
  return (
    <button onClick={ ()=> deleteUser(user) }>Delete</button>
  );
}

const mapDispatchToProps = (dispatch)=> {
  return {
    deleteUser: async(user)=> {
      await axios.delete(`/api/users/${user.id}`);
      dispatch({ type: 'DELETE_USER', user });
    }
  };
}

export default connect(null, mapDispatchToProps)(DeleteUserBtn);
