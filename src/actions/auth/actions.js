import { pushState } from 'redux-router';
import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from './action-types.js';

export function createUserIfNotExists(authData, firebase){
  let a = '';
  let i  = 0;
  firebase.child('campaign').on('value', snapshot =>
      a = Object.keys(snapshot.val() || []).map(id => ({id, name: snapshot.val()[id].name, missionpoints: snapshot.val()[id].missionpoints }))
    );
  let name = '';

  if (authData.provider === 'github')  name = authData.github.username;

  if (authData.provider === 'twitter') name = authData.twitter.username;

  if (authData.provider === 'google') name = authData[authData.provider].displayName;

  firebase.child(`points/${authData.uid}`).update({name, missionpoints: 'asdasd' });
  while ( i < a.length){
   firebase.child(`points/${authData.uid}/missionpoints`).push(0);
   i++;
  }
}

function authenticate(provider) {
  return (dispatch, getState) => {
    const { firebase } = getState();
     const points = firebase.child('points');

      firebase.authWithOAuthPopup(provider, (error, authData) => {
      if (error) {
        console.error('ERROR @ authWithOAuthPopup :', error); // eslint-disable-line no-console
      }
      else {
        let greet = '';
        points.orderByKey().equalTo(authData.uid).once('value', snap => {
          if (!snap.val()) greet = createUserIfNotExists(authData, firebase);
        });
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: authData,
          meta: {
            timestamp: Date.now()
          },
           greet: greet
        });
      }
      setTimeout( () => dispatch(pushState(null, '/')), 0);
    });
  };
}

export function initAuth() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    dispatch({
      type: INIT_AUTH,
      payload: firebase.getAuth(),
      meta: {
        timestamp: Date.now()
      }
    });
  };
}


export function signInWithGithub() {
  return authenticate('github');
}

export function signInWithGoogle() {
  return authenticate('google');
}

export function signInWithTwitter() {
  return authenticate('twitter');
}

export function signOut() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.unauth();
    dispatch(pushState(null, '/'));
    dispatch({
      type: SIGN_OUT_SUCCESS
    });
  };
}


export function cancelSignIn() {
  return dispatch => {
    return setTimeout( () => dispatch(pushState(null, '/')), 0);
  };
}
