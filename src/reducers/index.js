import React from 'react';

export const QueryDispatchContext = React.createContext();
export const QueryResponseContext = React.createContext();
export function QueryReducer(state, action) {
  return JSON.stringify(action, null, 2)
}
