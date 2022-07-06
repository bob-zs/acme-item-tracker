import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const RankUpBtn = ({ rankUp, thing })=> {
  return (
    <button onClick={ ()=> rankUp(thing) }>
    🟢 Rank Up
    </button>
  );
}

const RankDownBtn = ({ rankDown, thing })=> {
  return (
    <button onClick={ ()=> rankDown(thing) }>
    🔻 Rank Down
    </button>
  );
}

const RankForm = ({ rankUp, rankDown, thing })=> {
  const isNotRank1 = thing.rank !== 1;
  return (
    <div>
      <RankDownBtn rankDown={ rankDown } thing={ thing } />
      { isNotRank1 && <RankUpBtn rankUp={ rankUp } thing={ thing } /> }
    </div>
  );
}

const mapDispatchToProps = (dispatch)=> {
  return {
    rankDown: async(higherRankThing)=> {
      const response = await axios.put('/api/things/rankDown', { thingId: higherRankThing.id });
      const lowerRankThing = response.data;
      dispatch({ type: 'RANK_DOWN', lowerRankThing });
    },
    rankUp: async(lowerRankThing)=> {
      if (lowerRankThing.rank === 1) {
        return;
      }
      const response = await axios.put('/api/things/rankUp', { thingId: lowerRankThing.id });
      const higherRankThing = response.data;
      dispatch({ type: 'RANK_UP', higherRankThing });
    },
  };
}

export default connect(null, mapDispatchToProps)(RankForm);
