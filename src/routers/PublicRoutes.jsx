import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PublicRoutes = ({ isLoggedIn, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			component={(props) =>
				!isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
};

PublicRoutes.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
};

export default PublicRoutes;
