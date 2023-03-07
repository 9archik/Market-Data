import { newsMarketApi, INewsList, INews } from '../../redux/store/reducers/API/newsMarket.api';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './style.module.css';

export interface INewsListProp {
	newsList: INews[] | null | undefined;
	isFetching: any;
	isError: any;
}

const NewsList = ({ newsList, isFetching, isError }: INewsListProp) => {
	const [pageCount, setPageCount] = useState<number>(
		newsList ? Math.ceil(newsList?.length / 10) : 0,
	);

	const [currentPage, setCurrentPage] = useState<number>(0);

	const handlePageClick = ({ selected }: { selected: number }) => {
		setCurrentPage(selected);
	};

	const [listPaginate, setListPaginate] = useState<INews[] | null | undefined>(null);

	useEffect(() => {
		setListPaginate(newsList?.slice(currentPage*10, currentPage*10 + 10));
		setPageCount(newsList ? Math.ceil(newsList?.length / 10) : 0);
		window.scrollTo(0, 0);
	}, [currentPage, newsList]);

	useEffect(() => {
		setCurrentPage(0);
	}, [newsList]);

	if (pageCount === 0) {
		return <></>;
	}
	
	return (
		<>
			<ul className="flex flex-col gap-10 mt-10">
				{listPaginate &&
					listPaginate.map((el) => {
						return (
							<li className="flex items-center gap-14 pb-10 border-b-2 border-[#9b9b9b] ">
								<div>
									<img
										className="max-w-none object-scale-down h-[200px]"
										src={el.banner_image}
										alt=""
										height="200"
										width="260"
									/>
								</div>

								<div className="text-2xl flex flex-col gap-10 justify-center">
									<a
										target="_blank"
										href={el.url}
										className="text-[#033deb] font-bold hover: text-[#ff0000]">
										{el.title}
									</a>
									<span className="">{el.summary}</span>
								</div>
							</li>
						);
					})}
			</ul>

			<ReactPaginate
				previousLabel="<"
				pageRangeDisplayed={2}
				breakLabel="..."
				nextLabel=">"
				pageCount={pageCount}
				containerClassName={'mt-10 mb-10 flex gap-12 flex-wrap justify-center'}
				onPageChange={handlePageClick}
				pageLinkClassName={styles.disabledPage}
				activeLinkClassName={styles.activePage}
				previousClassName={styles.previousBtn}
				nextLinkClassName={styles.nextBtn}
				forcePage={currentPage}
			/>
		</>
	);
};

export default NewsList;
