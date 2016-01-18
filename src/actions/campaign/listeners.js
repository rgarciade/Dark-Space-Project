import { SET_CAMPAIGN } from './action-types';
import {SET_POINTS } from '../points/action-types';
export function registerListeners() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child('campaign');
    const ref1 = firebase.child('points');
    ref.on('value', snapshot => dispatch({
      type: SET_CAMPAIGN,
      campaign: snapshot.val()
//      ships: Object.keys(snapshot.val() || []).map( id => ({id, name:snapshot.val()[id].name}) )
    }));
    ref1.on('value', snapshot => dispatch({
      type: SET_POINTS,
      points: snapshot.val()
//      ships: Object.keys(snapshot.val() || []).map( id => ({id, name:snapshot.val()[id].name}) )
    }));
  };
}
