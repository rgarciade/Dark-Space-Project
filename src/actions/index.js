import { pushState } from 'redux-router';

/*
 * action types
 */

export const ADD_CAMPAIGN = 'ADD_CAMPAIGN';
export const REMOVE_CAMPAIGN = 'REMOVE_CAMPAIGN';
export const PREPARE_FIGHT = 'PREPARE_FIGHT';

/*
 * Campaign action creators
 */

export function addCampaign(title) {
  return { type: ADD_CAMPAIGN, title };
}

export function removeCampaign(idCampaign) {
    return { type: REMOVE_CAMPAIGN, idCampaign };
}

/*
 * Player fleet action creators
 */

export function prepareToFight(playerSpaceFleetArray){
		return { type: PREPARE_FIGHT, playerSpaceFleetArray};
}
