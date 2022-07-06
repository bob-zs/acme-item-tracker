
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const DeleteThingBtn = ({ deleteThing, thing })=> {
  return (
    <button onClick={ ()=> deleteThing(thing) }>Delete</button>
  );
}

const mapDispatchToProps = (dispatch)=> {
  return {
    deleteThing: async(thing)=> {
      await axios.delete(`/api/things/${thing.id}`);
      dispatch({ type: 'DELETE_THING', thing });
    }
  };
}

export default connect(null, mapDispatchToProps)(DeleteThingBtn);
