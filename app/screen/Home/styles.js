import {StyleSheet} from 'react-native';

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
        paddingTop:5  
    },
    modalView: {
        height: window.height * 0.8,
        width: window.width * 0.6,
        alignSelf: 'center'
    }

});

export default styles;
