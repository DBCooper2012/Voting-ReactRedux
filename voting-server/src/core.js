import {List,Map} from 'immutable'

export const INITIAL_STATE = Map();

export function setEntries(state,entries) {
    return state.set('entries',List(entries));
}

export function next(state) {
    const entries = state.get('entries').concat(getWinners(state.get('vote')));
    //could do this, but there may be other things is state that need to be passed through.
    //if (entries.size == 1) return Map({
    //    winner : entries.first()
    //});
    if (entries.size == 1){
        return state.remove('entries')
            .remove('vote')
            .set('winner',entries.first());
    }
    else {
        return state.merge({
            vote: Map({pair: entries.take(2)}),
            entries: entries.skip(2)
        });
    }
}

export function vote(voteState,entry) {
    //reach into the nested structure and apply the function.
    //If any part of the path is missing, create it, and set a default value, 0, for it.
    return voteState.updateIn(
        ['tally',entry], 0, tally => tally+1
    );
}

function getWinners(vote) {
    if (!vote) return [];
    const [a,b] = vote.get('pair');
    const aVotes = vote.getIn(['tally',a],0);
    const bVotes = vote.getIn(['tally',b],0);
    if (aVotes > bVotes) return [a];
    else if (aVotes < bVotes) return [b];
    else return [a,b];
}