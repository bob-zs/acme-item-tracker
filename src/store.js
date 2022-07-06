import { createStore } from 'redux';

const initialState = {
  view: window.location.hash.slice(1),
  users: [],
  things: []
};

const store = createStore((state = initialState, action)=> { 
  if(action.type === 'SET_THINGS'){
    return {...state, things: action.things };
  }
  if(action.type === 'SET_USERS'){
    return {...state, users: action.users }; 
  }
  if(action.type === 'SET_VIEW'){
    return {...state, view: action.view }; 
  }
  if(action.type === 'CREATE_THING'){
    return {...state, things: [...state.things, action.thing ]}; 
  }
  if(action.type === 'DELETE_THING'){
    return {...state, things: state.things.filter(thing => thing.id !== action.thing.id)};
  }
  if(action.type === 'RANK_UP'){
    // thing's rank decremented in db, storing the new thing
    return {...state, things: [...state.things.filter(thing => thing.id !== action.higherRankThing.id), action.higherRankThing]};
  }
  if(action.type === 'RANK_DOWN'){
    // thing's rank incremented in db, storing the new thing
    return {...state, things: [...state.things.filter(thing => thing.id !== action.lowerRankThing.id), action.lowerRankThing]};
  }
  if(action.type === 'CREATE_USER'){
    return {...state, users: [...state.users, action.user ]};
  }
  if(action.type === 'DELETE_USER'){
    return {...state, users: state.users.filter(user => user.id !== action.user.id)};
  }
  if(action.type === 'SET_USER_FOR_THING'){
    return {...state, things: state.things.map(thing => {
      // if the thing is the one we're setting the owner of
      const needNewOwnerThing = thing.id === action.ownerChanges.thingId;
      if(needNewOwnerThing){
        // update the thing with the new owner
        return {...thing, userId: action.ownerChanges.newOwnerId};
      }
      return thing;
    })};
  }
  return state;
});

export default store;

