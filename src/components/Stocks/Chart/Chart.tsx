import { useEffect, useRef, useState } from 'react';
import {
	DomainTuple,
	LineSegment,
	VictoryAxis,
	VictoryCandlestick,
	VictoryChart,
	VictoryLabel,
	VictoryTheme,
	VictoryTooltip,
	VictoryZoomContainer,
} from 'victory';
import { months } from '../../../constants/stocks';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { stockDataApi } from '../../../redux/store/reducers/API/stockData.api';
import { calculateXY, Mouse } from '../../../redux/store/reducers/mouseSlice';
import { styleAxis, styleCandle } from '../../../styles/victory/stylesVictory';
import { IQueryDataParams } from '../../../redux/store/reducers/API/IQueryDataParams';

import Tool from '../Tool/Tool';
import { ICandlestick } from '../interfaces';
import { VictoryCursorContainer } from 'victory';
import { batch } from 'react-redux';
import Checkboxs from '../Checkboxs/Checkboxs';

const Chart = () => {
	const contRef = useRef<HTMLDivElement>(null!);

	const mouseCoordinate = useAppSelector((state) => state.mouseReducer);

	const [contWidth, setContWidth] = useState<number>(1440);

	const [contHeight, setContHeight] = useState<number>(720);

	const [chartInfo, setChartInfo] = useState<any[]>([]);

	const [zoom, setZoom] = useState<number>(1305241712);

	const [minDomain, setMinDomain] = useState<number>(0);

	const [maxDomain, setMaxDomain] = useState<number>(100);

	const dispatch = useAppDispatch();

	const searchValue = useAppSelector((state) => state.searchQueryValueReducer);

	const [queryParams, setQueryParams] = useState<IQueryDataParams>({
		function: 'TIME_SERIES_DAILY_ADJUSTED',
		symbol: searchValue,
		outputSize: 'compact',
		apiKey: '88WOO3GUK7BE4DU3',
	});

	const { data, isLoading, isError } = stockDataApi.useGetStockDataQuery(queryParams);

	useEffect(() => {
		setQueryParams({
			function: 'TIME_SERIES_DAILY_ADJUSTED',
			symbol: searchValue,
			outputSize: 'compact',
			apiKey: '88WOO3GUK7BE4DU3',
		});
	}, [searchValue]);

	useEffect(() => {
		if (data && data['Time Series (Daily)']) {
			let arrData = data['Time Series (Daily)'];
			let arr: ICandlestick[] = [];

			let highArr: number[] = [];

			let lowArr: number[] = [];

			for (const key in arrData) {
				let value: ICandlestick = { open: 0, close: 0, low: 0, high: 0, x: new Date(2020, 1) };
				value.open = arrData[key]['1. open'];
				value.high = arrData[key]['2. high'];
				value.low = arrData[key]['3. low'];
				value.close = arrData[key]['4. close'];
				let date: Date = new Date(key);
				let year: number = date.getFullYear();
				let day: number = date.getDate();
				let month: number = date.getMonth();

				value.x = new Date(year, month, day);

				arr.push(value);

				highArr.push(value.high);
				lowArr.push(value.low);
			}

			highArr.sort((a, b) => a - b);
			lowArr.sort((a, b) => a - b);

			setChartInfo(arr);
			setMaxDomain(highArr[highArr.length - 1]);
			setMinDomain(lowArr[0]);
		}
	}, [data]);

	window.addEventListener('resize', () => {
		const timer = setTimeout(() => {
			if (contRef && contRef.current) {
				setContHeight(contRef.current.offsetHeight);
				setContWidth(contRef.current.offsetWidth);
				contRef.current.children[0].children[0].children[0].attributes[3].nodeValue =
					'0 0 1480 720';
			}
		}, 300);
	});
	useEffect(() => {
		if (contRef && contRef.current) {
			setContHeight(contRef.current.offsetHeight);
			setContWidth(contRef.current.offsetWidth);
			contRef.current.children[0].children[0].children[0].attributes[3].nodeValue = '0 0 1480 720';
		} else {
			setContHeight(window.innerHeight);
			setContWidth(window.innerWidth);
		}
	}, [data, searchValue, contWidth, contHeight, chartInfo]);

	const handleZoomChange = (domain: DomainTuple) => {
		let startDate: Date = domain[0] as Date;
		let endDate: Date = domain[1] as Date;

		setZoom(() => endDate.getTime() - startDate.getTime());
	};

	const tickFormatInit = (t: any): string => {
		if (zoom > 305241712)
			return `${t.getDate() as string} ${months[t.getMonth()]} ${t.getFullYear()}`;
		else return `${t.getDate()} ${months[t.getMonth()]} ${t.getFullYear()} ${t.getHours()}:00`;
	};

	if (chartInfo && chartInfo.length === 0 && contRef) {
		return <></>;
	}

	return (
		<>  
		    
			<div
				ref={contRef}
				style={{
					display: 'flex',
					justifyContent: 'center',
					opacity: `${chartInfo.length > 0 ? '1' : '0'}`,
				}}>
				<div style={{ width: contWidth, height: contWidth * 0.5, maxWidth: 1440, maxHeight: 720 }}>
					<VictoryChart
						containerComponent={
							<VictoryZoomContainer
								onZoomDomainChange={(domain, props) => handleZoomChange(domain.x)}
							/>
						}
						minDomain={{ y: minDomain }}
						maxDomain={{ y: maxDomain }}
						height={720}
						theme={VictoryTheme.material}
						width={1440}
						domainPadding={{ x: 50 }}
						style={{ parent: { overflow: 'visible' } }}
						scale={{ x: 'time' }}>
						<VictoryAxis
							tickLabelComponent={<VictoryLabel dy={0} dx={-5} />}
							style={styleAxis}
							offsetX={48}
							orientation={'right'}
							tickComponent={<LineSegment />}
							dependentAxis
							tickCount={10}
							domainPadding={50}
							minDomain={{ y: 0 }}
							maxDomain={{ y: 300 }}
						/>
						<VictoryAxis
							tickLabelComponent={<VictoryLabel dy={5} dx={0} />}
							style={styleAxis}
							tickFormat={(t) => tickFormatInit(t)}
							height={200}
						/>
						<VictoryCandlestick
							style={styleCandle}
							labelComponent={
								<VictoryTooltip
									dx={0}
									dy={0}
									cornerRadius={0}
									pointerLength={0}
									flyoutStyle={{
										stroke: '#303030',
										strokeWidth: 1,
										fill: 'white',
									}}
									style={{ fontSize: 15, fontFamily: 'Open Sans' }}
									centerOffset={{ x: 0, y: 0 }}
									flyoutComponent={
										<Tool
											xC={((mouseCoordinate.x - 100) * 1440) / contWidth}
											yC={((mouseCoordinate.y - 50) * 720) / contHeight}
										/>
									}
								/>
							}
							labels={() => ''}
							events={[
								{
									target: 'data',
									eventHandlers: {
										onMouseEnter: (e: any) => {
											let mouseCoordinate: Mouse = { x: 0, y: 0 };
											let x: number = e.pageX;
											let y: number = e.pageY;

											mouseCoordinate.x = x - contRef.current.offsetLeft;
											mouseCoordinate.y = y - contRef.current.offsetTop;
											batch(() => dispatch(calculateXY(mouseCoordinate)));
										},
									},
								},
							]}
							candleColors={{ positive: '#00a000', negative: '#ff0000' }}
							x="x"
							y="y"
							open={'open'}
							close={'close'}
							high={'high'}
							low="low"
							width={200}
							data={chartInfo}
						/>
					</VictoryChart>
				</div>
			</div>
		</>
	);
};

export default Chart;
