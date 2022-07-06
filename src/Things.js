import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import DeleteThingBtn from './DeleteThingBtn';
import RankForm from './RankForm';
import ChooseOwnerSelector from './ChooseOwnerSelector';

const Things = ({ things, users })=> {
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things
            .sort((thingA, thingB)=> thingA.rank - thingB.rank)
            .map( thing => {
              return (
                <li key={ thing.id }>
                  Rank #{ thing.rank }: { thing.name }
                  <br />
                  { thing.owner && <span>Owner: {thing.owner.name}<br /></span> }
                  <ChooseOwnerSelector thing={ thing } users={ users } /><br />
                  <DeleteThingBtn thing={ thing } /><br />
                  <RankForm thing={ thing } /><br />
                </li>            
              );
          })
        }
      </ul>
      <ThingForm />
    </div>
  );
};

const getThingsWithOwner = state => state.things.map((thing) => {
  const owner = state.users.find(u => u.id === thing.userId);
  return {...thing, owner };
});

const mapStateToProps = state => {
  return {
    users: state.users,
    things: getThingsWithOwner(state),
  }
}

export default connect(mapStateToProps)(Things);
