
import mouseReducer from './reducers/mouseSlice';
import searchValueReducer from './reducers/searchValueSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { stockToolsApi } from './reducers/API/stocksTools.api';
import { stockDataApi } from './reducers/API/stockData.api';

const rootReducer = combineReducers({
	mouseReducer,
	[stockToolsApi.reducerPath]: stockToolsApi.reducer,
	[stockDataApi.reducerPath]: stockDataApi.reducer,
    searchValueReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat([stockDataApi.middleware, stockToolsApi.middleware]),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
