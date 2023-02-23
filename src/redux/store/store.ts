import mouseReducer from './reducers/mouseSlice';
import inputDebounceValueReducer from './reducers/inputDebounceValueSlice';
import toolListReducer from './reducers/toolListSlice';
import searchQueryValueReducer from './reducers/searchQueryValueSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { stockToolsApi } from './reducers/API/stocksTools.api';
import { stockDataApi } from './reducers/API/stockData.api';
import chartSizeReducer from './reducers/chartSizeSlice';
import chartInfoReducer from './reducers/chartInfoSlice';
const rootReducer = combineReducers({
	mouseReducer,
	[stockToolsApi.reducerPath]: stockToolsApi.reducer,
	[stockDataApi.reducerPath]: stockDataApi.reducer,
	inputDebounceValueReducer,
	searchQueryValueReducer,
	toolListReducer,
	chartSizeReducer,
	chartInfoReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false }).concat([
				stockDataApi.middleware,
				stockToolsApi.middleware,
			]),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
