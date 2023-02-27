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
import { marketInfoApi } from './reducers/API/marketInfo.api';
import stockQueryParamsReducer from './reducers/stockQueryParamsSlice';
import { detailedStockDataApi } from './reducers/API/detailedStockData.api';
import { newsMarketApi } from './reducers/API/newsMarket.api';
const rootReducer = combineReducers({
	mouseReducer,
	[stockToolsApi.reducerPath]: stockToolsApi.reducer,
	[stockDataApi.reducerPath]: stockDataApi.reducer,
	[marketInfoApi.reducerPath]: marketInfoApi.reducer,
	[detailedStockDataApi.reducerPath]:detailedStockDataApi.reducer,
	[newsMarketApi.reducerPath]: newsMarketApi.reducer,
	inputDebounceValueReducer,
	searchQueryValueReducer,
	toolListReducer,
	chartSizeReducer,
	chartInfoReducer,
	stockQueryParamsReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false }).concat([
				stockDataApi.middleware,
				stockToolsApi.middleware,
				marketInfoApi.middleware,
				detailedStockDataApi.middleware,
				newsMarketApi.middleware,
			]),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
