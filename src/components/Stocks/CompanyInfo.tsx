import { CSSProperties, useEffect, useState } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons';
import { IQueryDataParams } from '../../redux/store/reducers/API/IQueryDataParams';
import { stockDataApi } from '../../redux/store/reducers/API/stockData.api';
import { negColor, posColor } from '../../constants/CompanyInfo';
import style from './companyInfo.module.css';

interface IStockMainInfo {
	symbol: string;
	price: number;
	change: number;
	changePercent: number;
}

const CompanyInfo: React.FC = React.memo(() => {
	const a: IQueryDataParams = {
		symbol: 'TSLA',
		outputSize: 'compact',
		apiKey: 'UYWA0OMDMCKUSCJ3',
	};

	const { data: dannye, isLoading: dannyeLoading } = stockDataApi.useGetStockQuoteDataQuery(a);

	const [stockInfo, setStockInfo] = useState<IStockMainInfo | null>(null);

	const [styleIcon, setStyleIcon] = useState<CSSProperties>({});

	const [styleChangeNum, setStyleChangeNum] = useState<CSSProperties>({});

	useEffect(() => {
		if (dannye) {
			setStockInfo({
				symbol: dannye['Global Quote']['01. symbol'],
				price: Number(parseFloat(dannye['Global Quote']['08. previous close']).toFixed(2)),
				change: Number(parseFloat(dannye['Global Quote']['09. change']).toFixed(2)),
				changePercent: Number(parseFloat(dannye['Global Quote']['10. change percent']).toFixed(2)),
			});

			const num: number = Number(parseFloat(dannye['Global Quote']['09. change']).toFixed(2));

			setStyleIcon({
				color: `${num > 0 ? `${posColor}` : `${negColor}`}`,
				transform: `${num > 0 ? `` : `rotate(180deg)`}`,
			});

			setStyleChangeNum({
				color: `${num > 0 ? `${posColor}` : `${negColor}`}`,
			});
		}
	}, [dannyeLoading]);
	return (
		<>
			{!dannyeLoading && (
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
					</div>
				</div>
			)}
		</>
	);
});

export default CompanyInfo;
