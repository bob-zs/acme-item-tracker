import React from 'react';
import { connect } from 'react-redux';
import DeleteUserBtn from './DeleteUserBtn';
import UserForm from './UserForm';


const Users = ({ users, things })=> {

  const getThingsOwned = user => things.filter((thing) => thing.userId === user.id);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.map( (user) => {

            const thingsOwned = getThingsOwned(user); // maybe deal with it above like in things

            return (
              <li key={ user.id }>
                { user.name }
                  { thingsOwned.length !== 0 ? // Maybe this should be it's own component
                    <span>
                      {' '}owns
                      <ul>
                      { thingsOwned.map((thing) => 
                          <li key={ thing.id }>{ thing.name }</li>
                      ) }
                      </ul>
                    </span> 
                    : // if nothings owned, then line break
                    <br />
                  }

                <DeleteUserBtn user={ user } />
              </li>
            );
          })
        }
      </ul>
      <UserForm />
    </div>
  );
}

const mapStateToProps = (state)=> {
  return {
    users: state.users,
    things: state.things,
  };
}
export default connect(mapStateToProps)(Users);
