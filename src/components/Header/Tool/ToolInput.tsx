import React, { useEffect } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { stockToolsApi } from '../../../redux/store/reducers/API/stocksTools.api';
import styles from '../style.module.css';

const ToolInput: React.FC = React.memo(() => {
	const searchValue = useAppSelector((state) => state.searchValueReducer);

	console.log(searchValue);

	const {data} = stockToolsApi.useGetStockToolsQuery(searchValue);

	// const list = data?.bestMatches;


	useEffect(() => {
	// console.log(list);
	}, [searchValue]);

	return (
		<div className={styles.toolList}>
			<li>TSLA</li>
			<li>AAPL</li>
			<li>IBM</li>
		</div>
	);
});

export default ToolInput;
