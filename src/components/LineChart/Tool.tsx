import styles from '../style.module.css';
import { CSSProperties, HTMLAttributes, SVGAttributes, useState } from 'react';
import { CandleProps, Flyout } from 'victory';

const Tool = ({ datum }: any) => {
	const [arrayValues] = useState<any[]>([{ x: datum.x, y: datum.y }]);

	return (
		<g>
			<foreignObject x={1300} width={100} height={140}>
				<div>212</div>
			</foreignObject>
		</g>
	);
};

export default Tool;
