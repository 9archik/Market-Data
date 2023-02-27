import { CSSProperties, useEffect, useState } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons';
import { IQueryDataParams } from '../../../redux/store/reducers/API/IQueryDataParams';
import { stockDataApi } from '../../../redux/store/reducers/API/stockData.api';
import { negColor, posColor } from '../../../constants/CompanyInfo';
import style from './MainCompanyInfo.module.css';
import { useAppSelector } from '../../../hooks/redux';
import { createContainer } from 'victory';
import { useParams } from 'react-router-dom';
import { stockToolsApi } from '../../../redux/store/reducers/API/stocksTools.api';
import { IStockData } from '../../../models/IStockData';
import { IStockTools } from '../../../models/IStockTools';
import { marketInfoApi } from './../../../redux/store/reducers/API/marketInfo.api';

interface IStockMainInfo {
	symbol: string;
	price: number;
	change: number;
	changePercent: number;
}

const MainCompanyInfo: React.FC = React.memo(() => {
	const searchValue = useAppSelector((state) => state.searchQueryValueReducer);

	const { name } = useParams();

	const VictoryContainer = createContainer('zoom', 'cursor');

	const [queryParams, setQueryParams] = useState<
		Pick<IQueryDataParams, 'symbol' | 'outputSize' | 'apiKey'>
	>({
		symbol: name,
		outputSize: 'compact',
		apiKey: 'UYWA0OMDMCKUSCJ3',
	});

	const {
		data: stockData,
		isFetching: stockLoading,
		isError: stockError,
	} = stockToolsApi.useGetStockToolsQuery(name);

	const {
		data: marketData,
		isFetching: marketLoading,
		isError: marketError,
	} = marketInfoApi.useGetMarketInfoQuery(queryParams);
	const marketStatus = (): string => {
		if (marketData && marketData.markets) {
			for (let i = 0; i < marketData.markets.length; i++) {
				if (
					stockData &&
					stockData.bestMatches &&
					stockData.bestMatches[0]['4. region'] === marketData.markets[i].region
				) {
					return marketData.markets[i].current_status as string;
				}
			}
		}
		return 'error';
	};

	const {
		data: mainData,
		isFetching: mainDataLoading,
		isError: mainDataError,
	} = stockDataApi.useGetStockQuoteDataQuery(queryParams);

	const [stockInfo, setStockInfo] = useState<IStockMainInfo | null>(null);

	const [styleIcon, setStyleIcon] = useState<CSSProperties>({});

	const [styleChangeNum, setStyleChangeNum] = useState<CSSProperties>({});

	useEffect(() => {
		setQueryParams({
			symbol: name,
			outputSize: 'compact',
			apiKey: 'UYWA0OMDMCKUSCJ3',
		});
	}, [name]);

	useEffect(() => {
		if (mainData && mainData['Global Quote'] && !mainDataLoading) {
			setStockInfo({
				symbol: mainData['Global Quote']['01. symbol'],
				price: Number(parseFloat(mainData['Global Quote']['08. previous close']).toFixed(2)),
				change: Number(parseFloat(mainData['Global Quote']['09. change']).toFixed(2)),
				changePercent: Number(
					parseFloat(mainData['Global Quote']['10. change percent']).toFixed(2),
				),
			});

			const num: number = Number(parseFloat(mainData['Global Quote']['09. change']).toFixed(2));

			setStyleIcon({
				color: `${num > 0 ? `${posColor}` : `${negColor}`}`,
				transform: `${num > 0 ? `` : `rotate(180deg)`}`,
			});

			setStyleChangeNum({
				color: `${num > 0 ? `${posColor}` : `${negColor}`}`,
			});
		}
	}, [searchValue, mainData, mainDataLoading, mainDataError]);

	if (mainDataLoading) {
		return <div>Loading</div>;
	}

	if (mainDataError) {
		return <div>Error</div>;
	}

	if (!(mainData && mainData['Global Quote'] && Object.keys(mainData['Global Quote']).length !== 0)) {
		return <div>Stock is not found</div>;
	}

	return (
		<>
			{!mainDataLoading && (
				<div className={style.container}>
					<div className={style.info}>
						<div className={style.symb}>{stockInfo?.symbol}</div>
						<div className={style.mainStaticBlock}>
							<span className="text-3xl">{stockInfo?.price}</span>
							<FontAwesomeIcon style={styleIcon} className="text-2xl" icon={faUpLong} />
							<span style={styleChangeNum}>
								{stockInfo &&
									(stockInfo.change > 0 ? `+${stockInfo.change}` : `${stockInfo.change}`)}
							</span>
							<span style={styleChangeNum}>
								{'('}
								{stockInfo &&
									(stockInfo.changePercent > 0
										? `+${stockInfo.changePercent}`
										: `${stockInfo.changePercent}`)}
								{'%)'}
							</span>
						</div>
						{stockData ? (
							<div className="text-3xl">currency: {stockData.bestMatches[0]['8. currency']}</div>
						) : (
							<></>
						)}
						{marketStatus() !== 'error' && <div className="text-3xl">status: {marketStatus()}</div>}
					</div>
				</div>
			)}
		</>
	);
});

export default MainCompanyInfo;
