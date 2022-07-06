import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const ChooseOwnerSelector = function({ thing, users, onSelectedNewOwner }) {
  return (
    <span>
      <select defaultValue={ thing.userId ? thing.userId : false } onChange={event => onSelectedNewOwner(event, thing) } >
        <option>Choose an Owner</option>
        {
          users.map((user) => {
            return (
              <option key={user.id} value={user.id}>{user.name}</option>
            )
          })
        }
      </select>
    </span>
  );

}

const mapDispatchToProps = dispatch => {
  return {
    onSelectedNewOwner:  async function(e, thing) {
      const newOwnerId = parseInt(e.target.value);
      if (thing.userId === newOwnerId) {
        console.warn('Same owner, no need to make a request nor change state');
        return;
      }
      const response = await axios.put('/api/things/user', 
      { thingId: thing.id, newOwnerId })
    
      const ownerChanges = response.data;
      dispatch({ type: 'SET_USER_FOR_THING', ownerChanges }); 
    }
  }
};

const mapStateToProps = state => {
  return {
    users: state.users,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseOwnerSelector);
