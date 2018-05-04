import { StackNavigator } from 'react-navigation';

import Home from '@containers/Home';

const RootNavigator = StackNavigator(
	{
        Home: {
			screen: Home,
		},
	},
	{
		initialRouteName: 'Home',
	}
);

export default RootNavigator;
