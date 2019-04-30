import React from 'react';

export const QueryDispatchContext = React.createContext();
export const QueryResponseContext = React.createContext();
export function QueryReducer(state, action) {
  return JSON.stringify(action, null, 2)
}

export const QueryTextDispatchContext = React.createContext();
export const QueryTextResponseContext = React.createContext();
export function QueryTextReducer(state, action) {
  return action
}

export const QueryResponseDispatchContext = React.createContext();
export const QueryResponseResponseContext = React.createContext();
export function QueryResponseReducer(state, action) {
  return action
}
