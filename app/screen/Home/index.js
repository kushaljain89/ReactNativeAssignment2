import React from 'react'
import {Container, Header, Title, Content, Button, Right, Body} from 'native-base';
import {Modal, View, TextInput, Text, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Feather, FontAwesome} from '@expo/vector-icons';
import moment from 'moment';
import Styles from './styles';

const colorsData = {
    orange: '#FF7F50',
    white: '#ffffff'
};

const formatString = 'YYYY-MM-DD';

class homeScreen extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: 'Home'
    }

    constructor() {
        super();
        this.state = {
            modalVisible: false,
            startDate: null,
            endDate: null,
            startDateTemp: moment().endOf('day'),
            endDateTemp: moment().add(1, 'days').endOf('day'),
            selectorStart: false,
            markedDates: {
                [moment().format(formatString)]: {
                    color: colorsData.orange,
                    textColor: colorsData.white,
                    startingDay: true,
                    endingDay: true
                },
                [moment().add(1, 'days').format(formatString)]: {
                    color: colorsData.orange,
                    textColor: colorsData.white,
                    startingDay: true,
                    endingDay: true
                }
            },
            initialStatus: true
        }
    }

    toggleCalender() {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    changeDateState(status) {
        console.log('changeDateState', status)
        this.setState({
            selectorStart: status
        })
    }

    dayPressed(day) {
        console.log('pressed called');
        const dateObj = moment(day['timestamp']).endOf('day');
        let newState = {};
        console.log(dateObj, (this.state.startDateTemp.diff(dateObj, 'days')), (this.state.endDateTemp.diff(dateObj, 'days')));
        if (this.state.startDateTemp && this.state.endDateTemp) {
            if ((this.state.startDateTemp.diff(dateObj, 'days') < 0) && (this.state.endDateTemp.diff(dateObj, 'days') > 0)) {
                console.log('between');
                if (this.state.selectorStart) {
                    newState = {
                        startDateTemp: dateObj,
                        endDateTemp: this.state.endDateTemp,
                        selectorStart: false
                    }
                } else {
                    newState = {
                        startDateTemp: this.state.startDateTemp,
                        endDateTemp: dateObj,
                        selectorStart: false
                    }
                }
            } else if (this.state.startDateTemp.diff(dateObj, 'days') > 0) {
                console.log('less');
                if (this.state.selectorStart) {
                    newState = {
                        startDateTemp: dateObj,
                        endDateTemp: this.state.endDateTemp,
                        selectorStart: false
                    }
                } else {
                    newState = {
                        startDateTemp: dateObj,
                        endDateTemp: dateObj.add(1, 'days'),
                        selectorStart: false
                    }
                }
            } else if (this.state.endDateTemp.diff(dateObj, 'days') < 0) {
                console.log('greater');
                console.log(this.state.selectorStart);
                if (this.state.selectorStart) {
                    newState = {
                        startDateTemp: dateObj,
                        endDateTemp: dateObj.add(1, 'days'),
                        selectorStart: false
                    }
                } else {
                    newState = {
                        startDateTemp: this.state.startDateTemp,
                        endDateTemp: dateObj,
                        selectorStart: false
                    }
                }
            }
        } else if (this.state.startDateTemp || this.state.endDateTemp) {
            console.log('never coming case')
        } else {
            console.log('no date selected');
            newState = {
                startDateTemp: dateObj,
                endDateTemp: dateObj.add(1, 'days'),
                selectorStart: false
            }
        }
        const markedDates = this.getMarkedDates(moment(newState.startDateTemp), moment(newState.endDateTemp));
        newState.markedDates = markedDates;
        this.setState(newState);
    }

    getMarkedDates(start, end) {
        console.log(start, end);
        const result = {
            [start.format(formatString)]: {
                color: colorsData.orange,
                textColor: colorsData.white,
                startingDay: true,
                endingDay: true
            }
        };
        let temp = start.add(1, 'days');
        while(temp.format(formatString) !== end.format(formatString)) {
            result[temp.format(formatString)] = {
                color: colorsData.white,
                textColor: colorsData.orange
            };
            temp = temp.add(1, 'days');
        }
        result[end.format(formatString)] = {
            color: colorsData.orange,
            textColor: colorsData.white,
            startingDay: true,
            endingDay: true
        };
        console.log(result)
        return result;
    }

    confirmDateSelection() {
        this.setState({
            initialStatus: false,
            startDate: this.state.startDateTemp,
            endDate: this.state.endDateTemp,
            modalVisible: false
        });
    }

    render() {
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
                            <View style={Styles.modalBackDrop}></View>
                            <View style={Styles.modalParent}>
                                <View style={Styles.modalView}>
                                    <View style={Styles.calenderHeader}>
                                        <TouchableOpacity activeOpacity={1}
                                                          onPress={this.changeDateState.bind(this, true)}>
                                            <View style={Styles.headerBlock}>
                                                <View style={{flex: 1}}>
                                                    <Text style={[Styles.textCheck, {
                                                        textAlign: 'left',
                                                        paddingLeft: 10
                                                    }]}>Check In</Text>
                                                </View>
                                                <View style={{flex: 1}}>
                                                    <Text style={[Styles.textDate, {
                                                        textAlign: 'left',
                                                        paddingLeft: 10
                                                    }]}>{
                                                        this.state.startDateTemp.format('ddd, D MMM')
                                                    }</Text>
                                                </View>
                                                {
                                                    this.state.selectorStart ?
                                                        <View style={{flex: 1, paddingBottom: 0, marginBottom: 0}}>
                                                            <FontAwesome name="caret-up" style={Styles.caretIcon}/>
                                                        </View> : <View/>
                                                }
                                            </View>
                                        </TouchableOpacity>
                                        <View style={Styles.headerBlock}>
                                            <Feather name="arrow-right" style={Styles.textIcon}/>
                                        </View>
                                        <TouchableOpacity activeOpacity={1}
                                                          onPress={this.changeDateState.bind(this, false)}>
                                            <View style={Styles.headerBlock}>
                                                <View style={{flex: 1}}>
                                                    <Text style={[Styles.textCheck, {
                                                        textAlign: 'right',
                                                        paddingRight: 10
                                                    }]}>Check Out</Text>
                                                </View>
                                                <View style={{flex: 1}}>
                                                    <Text style={[Styles.textDate, {
                                                        textAlign: 'right',
                                                        paddingRight: 10
                                                    }]}>{
                                                        this.state.endDateTemp.format('ddd, D MMM')
                                                    }</Text>
                                                </View>
                                                {
                                                    !this.state.selectorStart ?
                                                        <View style={{flex: 1, paddingBottom: 0, marginBottom: 0}}>
                                                            <FontAwesome name="caret-up" style={Styles.caretIcon}/>
                                                        </View> : <View/>
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <Calendar
                                        current={new Date(moment())}
                                        minDate={new Date(moment())}
                                        maxDate={new Date(moment().add(1, 'year'))}
                                        onDayPress={this.dayPressed.bind(this)}
                                        monthFormat={'MMM yyyy'}
                                        markingType={'period'}
                                        markedDates={this.state.markedDates}
                                        theme={{
                                            arrowColor: 'rgb(29,37,72)',
                                            textDayFontSize: 12,
                                            textMonthFontSize: 12,
                                            textMonthFontWeight: 'bold',
                                            textDayHeaderFontSize: 12,
                                            selectedDayBackgroundColor: '#FF7F50',
                                            selectedDayTextColor: '#ffffff',
                                        }}
                                    />
                                    <View style={Styles.calenderFooter}>
                                        <View style={Styles.footerBlock}>
                                            <Text style={Styles.buttonCancel} onPress={this.toggleCalender.bind(this)}>Cancel</Text>
                                        </View>
                                        <View style={Styles.footerBlock}>
                                            <Text style={Styles.buttonDone}
                                                  onPress={this.confirmDateSelection.bind(this)}>Done</Text>
                                        </View>
                                    </View>
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
