import img from "../pictures/suchEmpty.jpg";
import classes from "./css/NoData.module.css";
import Button from "./Button";

function NoData() {
	return (
		<div className={classes.container}>
			<Button disabled='false' onClick={() => window.location.reload()}>Refresh</Button>
			<div className={classes.imgContainer}>
				<img
					src={img}
					alt="No data from database"
					className={classes.img}
				></img>
			</div>
		</div>
	);
}

export default NoData;
