import styles from '../style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faSearch } from '@fortawesome/free-solid-svg-icons';
import ToolInput from '../Tool/ToolInput';
import useDebounce from '../../../hooks/useDebounce';
import { useEffect } from 'react';
import { stockToolsApi } from '../../../redux/store/reducers/API/stocksTools.api';
import { useDispatch } from 'react-redux';
import { setInputValue } from '../../../redux/store/reducers/searchValueSlice';
const Input: React.FC = () => {
	const [debounceSearchValue, searchValue, setSearchValue] = useDebounce('', 2000);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setInputValue(debounceSearchValue));
	}, [debounceSearchValue]);

	return (
		<div className={styles.input}>
			<button>
				<FontAwesomeIcon
					className={styles.search}
					icon={faSearch}
					aria-hidden="true"></FontAwesomeIcon>
			</button>

			<input
				value={searchValue}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
				type="text"
				placeholder="enter text for search company"
			/>

			<ToolInput />
		</div>
	);
};

export default Input;
