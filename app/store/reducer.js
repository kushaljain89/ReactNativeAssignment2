import { combineReducers } from 'redux';
import navReducer from '@routes/rootNavigator/reducer';
import { commonReducer, commonSaga } from '@modules/Common';

export default appReducer = combineReducers({
	nav: navReducer,
	commonReducer,
});
