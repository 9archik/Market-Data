import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IStockTools, IStockToolsList } from '../../../models/IStockTools';
import { stockToolsApi } from '../../../redux/store/reducers/API/stocksTools.api';
import { setSearchQueryValue } from '../../../redux/store/reducers/searchQueryValueSlice';
import { setToolList } from '../../../redux/store/reducers/toolListSlice';
import styles from './style.module.css';

export type PropTool = {
	setInputValue: React.Dispatch<string>
};

const ToolInput: React.FC<PropTool> = React.memo(({setInputValue}) => {
	const searchValue = useAppSelector((state) => state.inputDebounceValueReducer);

	const { data, isLoading, isError } = stockToolsApi.useGetStockToolsQuery(searchValue);

	const list = useAppSelector((state) => state.toolListReducer);

	const dispatch = useAppDispatch();

	useEffect(() => {
       dispatch(setToolList(data));        
	},  [data])
    
	if (isLoading) {
		return <></>;
	}

	if (isError) {
		return <></>;
	}

	if (list && list.length > 0) {
		return (
			<ul className={styles.toolList}>
				{list.map((el: string, index: number) => {
					return (
						<li
							onClick={() => {
								let str: string = el as string;
								dispatch(setSearchQueryValue(str));
								setInputValue('');
								dispatch(setToolList(null));
							}}>
							{<>{el}</>}
						</li>
					);
				})}
			</ul>
		);
	}

	return <></>;
});

export default ToolInput;
