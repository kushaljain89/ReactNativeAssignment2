import {StyleSheet, Dimensions} from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'rgb(29,37,72)',
        flex: 1
    },
    contentView: {
        padding: 20,
        flex: 1
    },
    button: {
        backgroundColor: 'rgb(255,255,255)',
        flex: 1
    },
    dateSelect: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
        paddingTop: 5
    },
    modalParent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBackDrop: {
        height: window.height,
        width: window.width,
        backgroundColor: '#000000',
        opacity: 0.7,
        position: 'absolute',
        top: 0,
        left: 0
    },
    modalView: {
        height: window.height * 0.7,
        width: window.width * 0.8,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        zIndex: 1000,
        opacity: 1
    },
    calenderHeader: {
        height: window.height * 0.7 * 0.15,
        width: window.width * 0.8,
        backgroundColor: 'rgb(29,37,72)',
        flexDirection: 'row'
    },
    headerBlock: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 16,
        paddingBottom: 18
    },
    textIcon: {
        color: '#ffffff',
        alignSelf: 'center',
        fontSize: 34
    },
    caretIcon: {
        color: '#ffffff',
        alignSelf: 'center',
        fontSize: 24,
        marginBottom: 0,
        marginTop: 5
    },
    textCheck: {
        color: '#ffffff',
        fontSize: 12
    },
    textDate: {
        color: '#ffffff',
        fontSize: 18
    },
    calenderFooter: {
        height: window.height * 0.7 * 0.15,
        width: window.width * 0.8,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    footerBlock: {
        flex: 0.25,
        alignItems: 'center',
        paddingBottom: 10
    },
    buttonCancel: {
        color: '#7C7C7C',
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonDone: {
        color: 'rgb(29,37,72)',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default styles;
