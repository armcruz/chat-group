import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			component={(props) =>
				isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

PrivateRoute.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
};

export default PrivateRoute;