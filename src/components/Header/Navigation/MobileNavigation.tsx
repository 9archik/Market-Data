import { Link } from 'react-router-dom';
import { Links } from '..';
import { listLinks } from '../../../constants/header';
import styles from './style.module.css';
import { useState } from 'react';

const MobileNavigation = () => {
	const [burgerOpen, setBurgerOpen] = useState<boolean>(false);
	return (
		<nav>
			<button
				onClick={() => setBurgerOpen(!burgerOpen)}
				className={`${styles.mobileNavigationList} ${burgerOpen && styles.open}`}>
				<span className={`w-full block h-[2px] bg-slate-600 bottom-2/4 translate-y-1/2`}></span>
			</button>

			<ul 
				className={`fixed h-full text-5xl flex flex-col gap-12 py-6 w-full  bg-slate-100 top-[55px] left-[0px] ${
					!burgerOpen ? 'translate-x-[300%]' : 'translate-x-[0%]'} transition-all z-50 `}>
				{listLinks.map((el: Links, index: number) => {
					return (
						<li key={index}>
							<Link className="" to={`/${el.text}`}>
								{el.text}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};
export default MobileNavigation;
