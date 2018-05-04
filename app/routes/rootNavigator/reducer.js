import AppNavigator from './index';

const initialNav = AppNavigator.router.getStateForAction(
	AppNavigator.router.getActionForPathAndParams('Home')
);

const navReducer = (state = initialNav, action) => {
	let nextState = AppNavigator.router.getStateForAction(action, state);
	return nextState || state;
};

export default navReducer;
