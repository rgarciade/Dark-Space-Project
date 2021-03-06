import { SET_NOTIFICATIONS } from './action-types';


export function registerListeners(a, id) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref1 = firebase.child(`points/${id}/notifications`);
    ref1.on('value', snapshot => dispatch({
      type: SET_NOTIFICATIONS,
      notifications: Object.keys(snapshot.val() || []).map( key => ({message: snapshot.val()[key].message, status: snapshot.val()[key].status, key: key}) )
    }));
  };
}
