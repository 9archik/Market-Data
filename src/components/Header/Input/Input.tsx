import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faSearch } from '@fortawesome/free-solid-svg-icons';
import ToolInput from '../ToolInput/ToolInput';
import useDebounce from '../../../hooks/useDebounce';
import { useEffect } from 'react';
import { stockToolsApi } from '../../../redux/store/reducers/API/stocksTools.api';
import { useDispatch } from 'react-redux';
import { setInputDebounceValue } from '../../../redux/store/reducers/inputDebounceValueSlice';
import { setSearchQueryValue } from '../../../redux/store/reducers/searchQueryValueSlice';

import { useAppDispatch } from '../../../hooks/redux';
import { setToolList } from '../../../redux/store/reducers/toolListSlice';
import { IStockToolsList } from '../../../models/IStockTools';

const Input: React.FC = () => {
	const [debounceSearchValue, inputValue, setInputValue] = useDebounce('', 2000);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setInputDebounceValue(debounceSearchValue));
	}, [debounceSearchValue]);

	const onClickSearch = () => {
		dispatch(setSearchQueryValue(inputValue));
		dispatch(setToolList(null));
		setInputValue('');
	};

	return (
		<div className={styles.input}>
			<button onClick={() => onClickSearch()}>
				<FontAwesomeIcon
					className={styles.search}
					icon={faSearch}
					aria-hidden="true"></FontAwesomeIcon>
			</button>

			<input
				value={inputValue}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
				type="text"
				placeholder="enter text for search company"
				onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
					if(event.key === "Enter")
					{
                         onClickSearch();
					}
				}}
			/>

			<ToolInput setInputValue={setInputValue} />
		</div>
	);
};

export default Input;
