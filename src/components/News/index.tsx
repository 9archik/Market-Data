import { useState, RefObject, useRef, LegacyRef, CSSProperties, useEffect } from 'react';
import filterSvg from '../../images/filter.svg';
import styles from './style.module.css';
import checkboxCheckSvg from '../../images/CheckboxCheck.svg';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { INewsList, newsMarketApi } from '../../redux/store/reducers/API/newsMarket.api';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import NewsList from '../NewsList/NewsList';

export interface IFilterNewsForm {
	tickers: INewsTickers[];
	topics: INewsTopics[];
	sort: INewsSort[];
}

export interface INewsTickers {
	name: string;
	checked: boolean;
	input: boolean;
	inputValue?: string;
}

export interface INewsTopics {
	name: string;
	checked: boolean;
	value: string;
}

export interface INewsSort {
	name: string;
	checked: boolean;
}

export interface IFormFields {
	tickers: HTMLInputElement[];
	topics: HTMLInputElement[];
	sort: HTMLInputElement[];
}

const FilterNewsForm: IFilterNewsForm = {
	tickers: [
		{ name: 'COIN', checked: false, input: false },
		{ name: 'CRYPTO', checked: false, input: true, inputValue: '' },
		{ name: 'FOREX', checked: false, input: true, inputValue: '' },
	],
	topics: [
		{ name: 'Blockchain', value: 'blockchain', checked: false },
		{ name: 'Earnings', value: 'earnings', checked: false },
		{ name: 'IPO', value: 'ipo', checked: false },
		{ name: 'Mergers & Acquisitions', value: 'mergers_and_acquisitions', checked: false },
		{ name: 'Financial Markets', value: 'financial Markets', checked: false },
		{ name: 'Economy - Fiscal Policy', value: 'economy_fiscal', checked: false },
		{ name: 'Economy - Monetary Policy', value: 'economy_monetary', checked: false },
		{ name: 'Economy - Macro/Overall', value: 'economy_macro', checked: false },
		{ name: 'Energy & Transportation', value: 'energy_transportation', checked: false },
		{ name: 'Finance', value: 'finance', checked: false },
		{ name: 'Life Sciences', value: 'life_sciences', checked: false },
		{ name: 'Manufacturing', value: 'manufacturing', checked: false },
		{ name: 'Retail & Wholesale', value: 'retail_wholesale', checked: false },
		{ name: 'Technology', value: 'technology', checked: false },
	],
	sort: [
		{ name: 'LATEST', checked: true },
		{ name: 'RELEVANCE', checked: false },
		{ name: 'EARLIEST', checked: false },
	],
};

const News = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [memoData, setMemoData] = useState<INewsList | null>(null);

	const tickersQuery = searchParams.get('tickers') || '';

	const topicsQuery = searchParams.get('topics') || '';

	const sortQuery = searchParams.get('sort') || '';

	const ref = useRef<any>();

	const [openFilters, setOpenFilters] = useState<Boolean>(false);

	const [filterNewsFormState, setFilterNewsFormState] = useState<IFilterNewsForm>(FilterNewsForm);

	const [tickersFilter, setTickersFilter] = useState<INewsTickers[]>(FilterNewsForm.tickers);

	const [topicsFilter, setTopicsFilter] = useState<INewsTopics[]>(FilterNewsForm.topics);

	const [sortFilter, setSortFilter] = useState<INewsSort[]>(FilterNewsForm.sort);

	const [heightState, setHeightState] = useState<number>(0);

	const [skip, setSkip] = useState<boolean>(false);

	const [inputValue, setInputValue] = useState<string>('');

	const { data, isFetching, isError } = newsMarketApi.useGetNewsQuery(
		{
			tickers: tickersQuery,
			sort: sortQuery,
			topics: topicsQuery,
		},
		{ skip: skip },
	);

	useEffect(() => {
		if (data) {
			setMemoData(data);
		}
	}, [data, isFetching, isError]);

	useEffect(() => {
		if (ref && ref.current) setHeightState(ref.current.scrollHeight);
	}, [openFilters]);

	useEffect(() => {
		const tickers = [...tickersFilter];

		const tickersArray: string[] = tickersQuery.split(/\,|:/);

		console.log(tickersArray);

		for (let i = 0; i < tickers.length; i++) {
			for (let j = 0; j < tickersArray.length; j++) {
				if (tickers[i].name === tickersArray[j]) {
					tickers[i].checked = true;
					delete tickersArray[j];
				}
			}
		}

		const topics = [...topicsFilter];

		const topicsArray: string[] = topicsQuery.split(',');

		for (let i = 0; i < topics.length; i++) {
			for (let j = 0; j < topicsArray.length; j++) {
				if (topics[i].value === topicsArray[j]) {
					topics[i].checked = true;
					delete topicsArray[j];
				}
			}
		}
		const sort = [...sortFilter];

		for (let i = 0; i < sort.length; i++) {
			if (sortQuery === sort[i].name) {
				sort[i].checked = true;
			} else {
				sort[i].checked = false;
			}
		}

		window.addEventListener('resize', () => {
			if (ref && ref.current) setHeightState(ref.current.scrollHeight);
		});

		return () =>
			window.addEventListener('resize', () => {
				if (ref && ref.current) setHeightState(ref.current.scrollHeight);
			});
	}, []);

	const handleTickers = (index: number) => {
		let copy = [...tickersFilter];

		copy[index].checked = !copy[index].checked;

		setSkip(true);

		setTickersFilter(copy);
	};

	const handleTopics = (index: number) => {
		let copy = [...topicsFilter];

		copy[index].checked = !copy[index].checked;
		setSkip(true);

		setTopicsFilter(copy);
	};

	const handleSort = (index: number) => {
		let copy = [...sortFilter];

		copy.map((el, i) => {
			if (i === index) el.checked = true;
			else el.checked = false;
		});

		setSkip(true);

		setSortFilter(copy);
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement & IFormFields> = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		let tickerQuery = '';
		let topicsQuery = '';
		let sortQuery = '';
		form.tickers.forEach((el, index) => {
			if (el.checked) {
				if (tickerQuery.length === 0) {
					tickerQuery =
						tickerQuery + el.value + `${index > 0 ? `:${tickersFilter[index].inputValue}` : ''}`;
				} else {
					tickerQuery =
						tickerQuery +
						',' +
						el.value +
						`${index > 0 ? `:${tickersFilter[index].inputValue}` : ''}`;
				}
			}
		});
		form.topics.forEach((el, index) => {
			if (el.checked) {
				if (topicsQuery.length === 0) {
					topicsQuery = topicsQuery + el.value;
				} else {
					topicsQuery = topicsQuery + ',' + el.value;
				}
			}
		});
		form.sort.forEach((el) => {
			if (el.checked) {
				sortQuery = el.value;
			}
		});

		setSearchParams({ tickers: tickerQuery, topics: topicsQuery, sort: sortQuery });
	};

	return (
		<>
			<div className="container">
				<div className="py-5 mb-5 border-b-2 border-[#b2b2b2]">
					<button
						onClick={() => {
							setSkip(true);
							setOpenFilters(() => !openFilters);
						}}
						className="flex gap-4 items-center text-2xl ">
						<img src={filterSvg} width="32" height="32" /> Filters
					</button>
				</div>
				<form
					autoComplete="off"
					onSubmit={handleSubmit}
					className={`${styles.contAccordion} ${openFilters && styles.open} overflow-hidden ${
						openFilters && 'border-b-2 border-[#c1c1c1]'
					} `}
					ref={ref}
					style={{
						height: openFilters ? heightState + 20 : 0,
					}}>
					<ul className={`${styles.accordion} ${openFilters && styles.open}`}>
						<li className="flex flex-col order-1 gap-5" key="tickers">
							<h3 className="text-4xl font-bold mb-5">Tickers</h3>
							{tickersFilter.map((el, index) => {
								return (
									<>
										<label className="flex gap-5 items-center cursor-pointer" key={index}>
											<div className={styles.newsCategory}>
												<div>
													<input
														name="tickers"
														onClick={() => handleTickers(index)}
														value={el.name}
														type="checkbox"
														checked={el.checked}
													/>
													<span>{el.checked && <img src={checkboxCheckSvg} />}</span>
												</div>
											</div>
											<span>{el.name}</span>
										</label>

										{el.input && (
											<input
												name={`tickersText`}
												placeholder={`enter ${el.name}`}
												type="text"
												disabled={!el.checked}
												onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
													let copy = [...tickersFilter];
													copy[index].inputValue = e.target.value;
													setTickersFilter(copy);
												}}
												value={`${!el.checked ? '' : el.inputValue}`}
											/>
										)}
									</>
								);
							})}
						</li>

						<li className="flex flex-col sm:order-2 order-3 gap-5" key="topics">
							<h3 className="text-4xl font-bold mb-5">Topics</h3>
							{topicsFilter.map((el, index) => {
								return (
									<label className="flex cursor-pointer w-[200px] gap-5 items-center" key={index}>
										<div className={styles.newsCategory}>
											<input
												name="topics"
												onClick={() => handleTopics(index)}
												value={el.value}
												type="checkbox"
												checked={el.checked}
											/>
											<span>{el.checked && <img src={checkboxCheckSvg} />}</span>
										</div>
										<span>{el.name}</span>
									</label>
								);
							})}
							<button
								onClick={() => setSkip(false)}
								type="submit"
								className="text-3xl py-4 bg-slate-900 rounded-[12px] text-[white] mt-5">
								Search
							</button>
						</li>

						<li className="flex order-2 sm:order-3 flex-col gap-5" key="sort">
							<h3 className="text-4xl font-bold mb-5">Sort</h3>
							{sortFilter.map((el, index) => {
								return (
									<label className="flex cursor-pointer w-100 gap-5 items-center" key={index}>
										<div className={styles.newsSort}>
											<input
												onClick={() => handleSort(index)}
												name="sort"
												type="radio"
												checked={el.checked}
												value={el.name}
											/>
											<span className="w-3 h-3 bg-slate-500"></span>
										</div>
										<span>{el.name}</span>
									</label>
								);
							})}
						</li>
					</ul>
					{/* <div className="flex  justify-center">
						<button className="text-3xl py-4 px-12 border-2 border-[#000]">Search</button>
					</div> */}
				</form>
				<NewsList newsList={memoData?.feed} isError={isError} isFetching={isFetching} />
			</div>
		</>
	);
};

export default News;
