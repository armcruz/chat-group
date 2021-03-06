import { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AlertCircle, AlertTriangle, CheckCircle } from 'react-feather';
import styles from './Alert.module.css';
import { UiContext } from '../../context/UiContext';
import types from '../../types';

function Alert({ message, severity, show, autoHideDuration, onHide }) {
	const [, uiDispatch] = useContext(UiContext);
	const [shouldRender, setRender] = useState(show);

	const hideAlert = useCallback(() => {
		uiDispatch({
			type: types.UI_SET_MESSAGE,
			payload: null,
		});
	}, [uiDispatch]);

	useEffect(() => {
		if (show) {
			setRender(true);
		}
	}, [show]);

	useEffect(() => {
		if (autoHideDuration && show) {
			const timeout = setTimeout(onHide || hideAlert, autoHideDuration);
			return () => clearTimeout(timeout);
		}
	}, [show, autoHideDuration, hideAlert, onHide]);

	const handleAnimationEnd = () => {
		if (!show) {
			setRender(false);
		}
	};

	if (!shouldRender) return null;

	return (
		<div
			role="alert"
			onAnimationEnd={handleAnimationEnd}
			className={`${styles.alert} ${styles[severity]} ${
				show ? styles.show : styles.hide
			}`}
		>
			{severity === 'error' ? (
				<AlertCircle size={24} />
			) : severity === 'warning' ? (
				<AlertTriangle size={24} />
			) : (
				<CheckCircle size={24} />
			)}
			{message}
			{/* <button onClick={hideAlert} className={styles.close}>
				<X size={18} color="currentColor" />
			</button> */}
		</div>
	);
}

Alert.propTypes = {
	message: PropTypes.string.isRequired,
	severity: PropTypes.oneOf(['success', 'error', 'warning']).isRequired,
	show: PropTypes.bool.isRequired,
	autoHideDuration: PropTypes.number,
	onHide: PropTypes.func,
};

export default Alert;
