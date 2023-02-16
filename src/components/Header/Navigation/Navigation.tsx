import { NavLink } from 'react-router-dom';
import { Links } from '..';
import { listLinks } from '../../../constants/header';
import styles from './style.module.css';

const Navigation: React.FC = () => {
	return (
		<nav>
			<ul>
				{listLinks.map((el: Links, index: number) => {
					return (
						<li key={index}>
							<NavLink className={styles.link} to={el.address}>
								{el.text}
							</NavLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navigation;
