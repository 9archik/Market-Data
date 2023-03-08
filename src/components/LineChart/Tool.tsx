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

	useEffect(() => {
		setValue(valueProp && valueProp.current && valueProp.current.y);
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
		</g>
	);
};

export default Tool;
