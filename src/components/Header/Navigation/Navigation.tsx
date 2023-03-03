import { NavLink, Link } from 'react-router-dom';
import { Links } from '..';
import { listLinks } from '../../../constants/header';
import styles from './style.module.css';

const Navigation: React.FC = () => {
	return (
		<nav>
			<ul className={styles.desktopList}>
				{listLinks.map((el: Links, index: number) => {
					return (
						<li key={index}>
							<Link className={styles.link} to={`/${el.text}`}>
								{el.text}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navigation;
