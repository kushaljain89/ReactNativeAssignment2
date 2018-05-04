import React from 'react'
import {Font} from 'expo'
import {addNavigationHelpers} from 'react-navigation'
import {connect} from 'react-redux'
import {SafeAreaView, StyleSheet, StatusBar, View} from 'react-native'
import RootNavigator from '@routes/rootNavigator'
import {StyleProvider} from 'native-base'
import getTheme from '@customTheme/components'
import platform from '@customTheme/variables/platform'
import Splash from '@screen/Splash'
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';


const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

const addListener = createReduxBoundAddListener("root");


class AppRoot extends React.Component {
    state = {
        loaded: false,
    }

    componentWillMount() {
        this._loadAssetsAsync()
    }

    _loadAssetsAsync = async () => {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        })
        this.onLoad()
    }

    onLoad = () => {
        let _self = this
        setTimeout(() => {
            _self.setState(({
                loaded: true
            }))
        }, 1000)
    }

    render() {
        if (!this.state.loaded) {
            return (
                <Splash ref='splash'/>
            )
        }
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="blue"
                           barStyle="light-content"
                />
                <View style={{height: StatusBar.currentHeight}}/>
                <StyleProvider style={getTheme(platform)}>
                    <RootNavigator navigation={addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.nav,
                        addListener: addListener
                    })}/>
                </StyleProvider>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const mapStateToProps = (state) => ({
    nav: state.nav
})

const mapDispatchToProps = dispatch => ({
    dispatch,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppRoot)
