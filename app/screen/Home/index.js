import React from 'react'
import {Container, Header, Title, Content, Button, Right, Body} from 'native-base';
import {Modal, Dimensions, View, Text, TextInput} from 'react-native';
import DatepickerRange from 'react-native-range-datepicker';
import moment from 'moment';
import Styles from './styles';

const window = Dimensions.get('window');

class homeScreen extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: 'Home'
    }

    constructor() {
        super();
        this.state = {
            modalVisible: false,
            startDate: '',
            untilDate: ''
        }
    }

    toggleCalender() {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    closeModal() {
        this.toggleCalender();
    }

    setDates() {
        this.toggleCalender();
    }

    onSelectDate(startDate, untilDate) {
        let years = moment(startDate).diff(untilDate, 'years');

        //Check if Data Booking Time Date is Less Than a Year and More Than 3 Days
        if (!Number.isNaN(years) && years === 0) {
            this.setState({startDate, untilDate});
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const currentDate = moment().format();
        const format = 'hh:mm:ss';
        const currentTime = moment()
        const beforeTime = moment('00:00:00', format);
        const afterTime = moment('04:00:00', format);

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Calender</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content style={Styles.content}>
                    <View style={Styles.contentView}>
                        <Button transparent onPress={this.toggleCalender.bind(this)}
                                style={Styles.button}>
                            <TextInput
                                editable={false}
                                maxLength={40}
                                onClick={this.toggleCalender.bind(this)}
                                value={(this.state.startDate && this.state.untilDate) ? `${moment(this.state.startDate).format('DD-MMM-YY')} - ${moment(this.state.untilDate).format('DD-MMM-YY')}` : ''}
                                placeholder={'Select Date'}
                                style={Styles.dateSelect}
                                underlineColorAndroid='transparent'
                            />
                        </Button>
                        <Modal animationType="fade"
                               transparent={true}
                               hardwareAccelerated={true}
                               visible={this.state.modalVisible}
                               onRequestClose={this.toggleCalender.bind(this)}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={Styles.modalView}>
                                    <DatepickerRange
                                        startDate={this.state.startDate ? moment(this.state.startDate).format() : ''}
                                        untilDate={this.state.untilDate ? moment(this.state.untilDate).format() : ''}
                                        onClose={this.closeModal.bind(this)}
                                        onConfirm={this.setDates.bind(this)}
                                        onSelect={this.onSelectDate.bind(this)}
                                        buttonColor={'rgb(29,37,72)'}
                                        todayColor={'#1D2548'}
                                        minDate={currentTime.isBetween(beforeTime, afterTime) ? moment().subtract(1, 'days').format() : currentDate}
                                        infoContainerStyle={{
                                            marginRight: 20,
                                            paddingHorizontal: 20,
                                            paddingVertical: 5,
                                            backgroundColor: '#1D2548',
                                            borderRadius: 20,
                                            alignSelf: 'center'
                                        }}/>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </Content>
            </Container>
        )
    }
}

export default homeScreen
