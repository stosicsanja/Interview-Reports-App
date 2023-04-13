import classes from './css/Loading.module.css';

function Loading (){
    return (
        <div className={classes.spinnerContainer}>
          <div className={classes.loadingSpinner}>
          </div>
        </div>
    )
}

export default Loading;