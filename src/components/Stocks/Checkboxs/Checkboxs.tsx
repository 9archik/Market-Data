import styles from './style.module.css';
import candleStickSvg from '../../../images/candleStick.svg';
import lineChartSvg from '../../../images/lineChart.svg';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { useAppDispatch } from './../../../hooks/redux';
import { setStockQueryParamsInterval } from '../../../redux/store/reducers/stockQueryParamsSlice';
import { setIntervalSlice, setType } from '../../../redux/store/reducers/chartInfoSlice';
export interface IChartType {
	src: string;
	value: 'candlestick' | 'line';
	checked: boolean;
}

export interface IIntervalType {
	value: string;
	checked: boolean;
	interval: number | undefined;
	typeInterval: 'INTRADAY' | 'DAILY_ADJUSTED' | 'WEEKLY' | 'MONTHLY';
	timeSeries: string;
}

const chartTypeList: IChartType[] = [
	{ src: candleStickSvg, value: 'candlestick', checked: true },
	{ src: lineChartSvg, value: 'line', checked: false },
];

const intervalTypeList: IIntervalType[] = [
	{ value: '1', checked: false, interval: 1, typeInterval: 'INTRADAY', timeSeries: '1min' },
	{ value: '5', checked: false, interval: 5, typeInterval: 'INTRADAY', timeSeries: '5min' },
	{ value: '15', checked: false, interval: 15, typeInterval: 'INTRADAY', timeSeries: '15min' },
	{ value: '30', checked: false, interval: 30, typeInterval: 'INTRADAY', timeSeries: '30min' },
	{
		value: '1D',
		checked: true,
		interval: undefined,
		typeInterval: 'DAILY_ADJUSTED',
		timeSeries: 'Daily',
	},
	{
		value: '1W',
		checked: false,
		interval: undefined,
		typeInterval: 'WEEKLY',
		timeSeries: 'Weekly',
	},
	{
		value: '1M',
		checked: false,
		interval: undefined,
		typeInterval: 'MONTHLY',
		timeSeries: 'Monthly',
	},
];
const Checkboxs = () => {
	const dispatch = useAppDispatch();
	const [typeList, setTypeList] = useState<IChartType[]>(chartTypeList);

	const [intervalList, setIntervalList] = useState<IIntervalType[]>(intervalTypeList);

	const queryParams = useAppSelector((state) => state.stockQueryParamsReducer);

	const { interval: intervalState } = useAppSelector((state) => state.chartInfoReducer);

	const handleType = (arr: IChartType[], index: number) => {
		let copy = [...arr];
		if (copy) {
			copy.map((el, i: number) => {
				if (index === i) {
					el.checked = true;
					dispatch(setType(el.value));
				} else {
					el.checked = false;
				}
			});
			setTypeList(copy);
		}
	};

	const handleInterval = (arr: IIntervalType[], index: number) => {
		let copy = [...arr];
		if (copy) {
			copy.map((el, i: number) => {
				if (index === i) {
					el.checked = true;
					dispatch(setIntervalSlice(el.timeSeries));
				} else {
					el.checked = false;
				}
			});
			setIntervalList(copy);
		}
	};

	useEffect(() => {
		dispatch(setStockQueryParamsInterval(intervalList));
	}, [intervalList]);

	return (
		<div className={styles.container}>
			<form className={styles.form}>
				<div className={styles.typeChartContainer}>
					{chartTypeList.map((el: IChartType, index: number) => {
						return (
							<label
								onClick={() => handleType(typeList, index)}
								className={styles.typeChart}
								id="typeChart">
								<input
									className={styles.checkbox}
									value={el.value}
									type="radio"
									name="type chart"
									checked={el.checked}
								/>
								<span>
									<img src={el.src} alt="" />
								</span>
							</label>
						);
					})}
				</div>
				<div className={styles.intervalContainer}>
					{intervalTypeList.map((el: IIntervalType, index: number) => {
						return (
							<label
								onClick={() => handleInterval(intervalList, index)}
								className={styles.interval}
								id="interval">
								<input
									className={styles.checkbox}
									type="radio"
									value={el.value}
									checked={el.checked}
									name="interval"
								/>
								<span>{el.value}</span>
							</label>
						);
					})}
				</div>
			</form>
		</div>
	);
};

export default Checkboxs;
