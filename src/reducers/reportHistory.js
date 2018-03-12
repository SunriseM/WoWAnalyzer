import { LOCATION_CHANGE } from 'react-router-redux';
import Cookies from 'universal-cookie';

import { APPEND_REPORT_HISTORY } from 'actions/reportHistory';

const MAX_ITEMS = 3;
const cookies = new Cookies();
const COOKIE_NAME = 'REPORT_HISTORY';
const cookieOptions = {
  path: '/',
  maxAge: 86400 * 365, // 1 year
};
const defaultState = cookies.get(COOKIE_NAME) || [];

export default function reportHistory(state = defaultState, action) {
  // TODO: Fill default from cookie
  switch (action.type) {
    case APPEND_REPORT_HISTORY: {
      let newState = [
        ...state.filter(item => item.code !== action.payload.code), // remove existing report with this code
        action.payload,
      ];
      const numItems = newState.length;
      if (numItems > MAX_ITEMS) {
        newState = newState.slice(numItems - MAX_ITEMS);
      }
      cookies.set(COOKIE_NAME, newState, cookieOptions);
      return newState;
    }
    case LOCATION_CHANGE: {
      // state.find(item => item.code === )
      console.log(action);
      return state;
    }
    default:
      return state;
  }
}
