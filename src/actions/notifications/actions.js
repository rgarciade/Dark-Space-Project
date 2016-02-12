import {
  SET_NOTIFICATIONS
} from './action-types';

export function setNotifications(notifications) {
  return { type: SET_NOTIFICATIONS, notifications };
}


export function reed(iduser){
	return (dispatch, getState) => {
    const { firebase } = getState();
    let id;
    let x;
    firebase.child(`points/${iduser}/notifications`).on('value', snapshot =>
      x = Object.keys(snapshot.val() || []).map( key => firebase.child(`points/${iduser}/notifications/${key}`).update({ message: snapshot.val()[key].message, status: snapshot.val()[key].status = true }) ) );
    };
}
