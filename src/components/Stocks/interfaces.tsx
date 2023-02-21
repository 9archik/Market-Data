import { PaddingProps } from "victory";

export interface StyleAxis {
	axis?: {
		stroke?: string;
		strokeWidth?: number;
		strokeLinecap?: 'butt' | 'round' | 'square';
		strokeLinejoin?: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
	};
	axisLabel?: {
		fontSize?: number;
		fontFamily?: string;
		padding?: number;
		paddingRight?: number;
		paddingLeft?: number;
		paddingTop?: number;
		paddingBottom?: number;
	};
	grid?: {
		stroke?: string;
		fill?: string;
		strokeDasharray?: string;
		strokeLinecap?: 'butt' | 'round' | 'square';
		pointerEvents?:
			| 'auto'
			| 'bounding-box'
			| 'visiblePainted'
			| 'visibleFill'
			| 'visibleStroke'
			| 'visible'
			| 'painted'
			| 'fill'
			| 'stroke'
			| 'all'
			| 'none';
		strokeLinejoin?: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
	};
	ticks?: {
		fill?: string;
		stroke?: string;
		strokeWidth?: number;
		strokeLinecap?: 'butt' | 'round' | 'square';
		strokeLinejoin?: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
		size?: number;
	};
	tickLabels?: {
		fontSize?: number;
		fontFamily?: string;
		fontWeight?: number | string;
		letterSpacing?: string;
		padding?: number | { top?: number; bottom?: number; left?: number, right?:number };
		stroke?: string;
		strokeWidth?: number;
		fill?: string;
	};
}

export interface IPropType {
	xC?: number | 0;
	yC?: number | 0;
	datum?: any;
};

export interface IToolValues {
	name: string;
	value: number;
};

export interface ICandlestick
{
    open: number,
	high: number,
	low: number,
	close: number,
	x: Date,
}


