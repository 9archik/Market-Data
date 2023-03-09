import styles from '../style.module.css';
import { CSSProperties, HTMLAttributes, SVGAttributes, useEffect, useState } from 'react';
import { CandleProps, Flyout } from 'victory';
import { useAppSelector } from '../../hooks/redux';

export interface IToolLineProps {
	maxDomain: number;
	minDomain: number;
	valueProp: any;
}

const Tool = ({ maxDomain, minDomain, valueProp }: IToolLineProps) => {
	// const [arrayValues] = useState<any[]>([{ x: datum.x, y: datum.y }]);

	const mouseCoordinate = useAppSelector((state) => state.mouseReducer);

	const chartSizeState = useAppSelector((state) => state.chartSizeReducer);

	const [value, setValue] = useState<number | null>(0);

	const [date, setDate] = useState<Date | null>(null);

	useEffect(() => {
		setValue(valueProp && valueProp.current && valueProp.current.y);
		setDate(valueProp && valueProp.current && valueProp.current.x);
	}, [mouseCoordinate]);

	if (!value) {
		return <></>;
	}

	return (
		<g>
			<foreignObject
				x={1381}
				y={(mouseCoordinate.y * 710) / chartSizeState.height}
				width={80}
				height={20}>
				<div className="bg-slate-50 font-bold pr-2">{Math.round(Number(value) * 100) / 100}</div>
			</foreignObject>

			<foreignObject
				x={((mouseCoordinate.x - (40 * chartSizeState.width) / 1440) * 1440) / chartSizeState.width}
				y={683}
				width={80}
				height={40}>
				<div className="bg-slate-50 font-bold flex flex-col items-center pr-2">
					<span>{`${date?.getDate()}/${
						date?.getMonth() !== undefined ? date?.getMonth() + 1 : ''
					}/${date?.getFullYear() ? date?.getFullYear() : ''}`}</span>
					<span>{`${date?.getHours()}:${
						date?.getMinutes() && date?.getMinutes() < 10
							? `0${date.getMinutes()}`
							: `${date && date.getMinutes()}`
					}`}</span>
				</div>
			</foreignObject>
		</g>
	);
};

export default Tool;
