import React, { useReducer } from 'react';
import {
  QueryReducer, QueryDispatchContext, QueryResponseContext,
  QueryTextDispatchContext, QueryTextResponseContext, QueryTextReducer,
  QueryResponseDispatchContext, QueryResponseResponseContext, QueryResponseReducer
} from '../reducers'

export default OrigComponent => props =>{
  const [response, dispatch] = useReducer(QueryReducer);
  const [queryTextResponse, queryTextDispatch] = useReducer(QueryTextReducer);
  const [queryResponseResponse, queryResponseDispatch] = useReducer(QueryTextReducer);

  return (
    <QueryDispatchContext.Provider value={dispatch}>
      <QueryResponseContext.Provider value={response}>
        <QueryTextDispatchContext.Provider value={queryTextDispatch}>
          <QueryTextResponseContext.Provider value={queryTextResponse}>
            <QueryResponseDispatchContext.Provider value={queryResponseDispatch}>
              <QueryResponseResponseContext.Provider value={queryResponseResponse}>
                <OrigComponent />
              </QueryResponseResponseContext.Provider>
            </QueryResponseDispatchContext.Provider>
          </QueryTextResponseContext.Provider>
        </QueryTextDispatchContext.Provider>
      </QueryResponseContext.Provider>
    </QueryDispatchContext.Provider>
  )
}
