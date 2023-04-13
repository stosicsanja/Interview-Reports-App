import { Link } from 'react-router-dom';
import styles from './css/Card.module.css';

function Card({ id, name, email, avatar }) {
	return (
		<div className={styles.cardContainer}>
			<div className={styles.card}>
				<h2>{name}</h2>
				<img className={styles.avatar} src={avatar} alt={id} />
				<p>Email: {email}</p>
				<Link to={`/singlecandidate/${id}`}>View Details</Link>
			</div>
		</div>
	);
}

export default Card;
