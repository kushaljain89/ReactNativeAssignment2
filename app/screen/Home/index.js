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
            selectorStart: true,
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

    closeCalender() {
        const newState = {
            startDateTemp: this.state.initialStatus ? moment().endOf('day') : this.state.startDate,
            endDateTemp: this.state.initialStatus ? moment().add(1, 'days').endOf('day') : this.state.endDate,
            modalVisible: false
        };
        newState.markedDates = this.getMarkedDates(moment(newState.startDateTemp), moment(newState.endDateTemp));
        this.setState(newState);
    }

    changeDateState(status) {
        this.setState({
            selectorStart: status
        })
    }

    dayPressed(day) {
        const dateObj = moment(day['timestamp']).endOf('day');
        let newState = {};
        if (this.state.startDateTemp && this.state.endDateTemp && (this.state.startDateTemp.diff(dateObj, 'days') !== 0) && (this.state.endDateTemp.diff(dateObj, 'days') !== 0)) {
            if ((this.state.startDateTemp.diff(dateObj, 'days') < 0) && (this.state.endDateTemp.diff(dateObj, 'days') > 0)) {
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
                if (this.state.selectorStart) {
                    newState = {
                        startDateTemp: dateObj,
                        endDateTemp: this.state.endDateTemp,
                        selectorStart: false
                    }
                } else {
                    newState = {
                        startDateTemp: dateObj,
                        endDateTemp: moment(dateObj).add(1, 'days'),
                        selectorStart: false
                    }
                }
            } else if (this.state.endDateTemp.diff(dateObj, 'days') < 0) {
                if (this.state.selectorStart) {
                    newState = {
                        startDateTemp: dateObj,
                        endDateTemp: moment(dateObj).add(1, 'days'),
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
            newState.markedDates = this.getMarkedDates(moment(newState.startDateTemp), moment(newState.endDateTemp));
            this.setState(newState);
        }
    }

    getMarkedDates(start, end) {
        if (end.diff(start, 'days') > 0) {
            const result = {
                [start.format(formatString)]: {
                    color: colorsData.orange,
                    textColor: colorsData.white,
                    startingDay: true,
                    endingDay: true
                }
            };
            let temp = start.add(1, 'days');
            while (temp.format(formatString) !== end.format(formatString)) {
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
            return result;
        }
    }

    confirmDateSelection() {
        this.setState({
            initialStatus: false,
            startDate: this.state.startDateTemp,
            endDate: this.state.endDateTemp,
            modalVisible: false
        });
    }

    renderCustomDay({date, state, marking}) {
        const currentTime = moment();
        const format = 'hh:mm:ss';
        const beforeTime = moment('00:00:00', format);
        const afterTime = moment('04:00:00', format);
        const styleObj = {
            textAlign: 'center',
            color: state === 'disabled' ? 'gray' : 'black',
            height: 25,
            width: 25,
            paddingTop: 4
        };
        const styleObjView = {flex: 1, justifyContent: 'center', alignItems: 'center'};
        if (marking && marking.endingDay && marking.endingDay) {
            styleObj['backgroundColor'] = marking.color;
            styleObj['borderRadius'] = 15;
            styleObj['color'] = marking.textColor;
        } else if (marking && marking.textColor) {
            styleObj['color'] = marking.textColor;
        }
        if (currentTime.isBetween(beforeTime, afterTime) && (state !== 'disabled') && moment().endOf('day').diff(moment(date['timestamp']).endOf('day'), 'days') > 0) {
            return (<View style={styleObjView}><Text style={styleObj}
                                                     onPress={this.dayPressed.bind(this, date)}>{date.day}</Text>
                <FontAwesome name="moon-o" style={{
                    fontSize: 8,
                    padding: 0,
                    margin: 0,
                    position: 'absolute',
                    bottom: -1,
                    right: 15,
                    color: (marking || {}).textColor || 'black'
                }}></FontAwesome></View>);
        } else {
            if (state === 'disabled') {
                return (<View style={styleObjView}><Text style={styleObj}>{date.day}</Text></View>);
            } else {
                return (<View style={styleObjView}><Text style={styleObj}
                                                         onPress={this.dayPressed.bind(this, date)}>{date.day}</Text></View>);
            }
        }
    }

    render() {
        const currentDate = moment().format();
        const format = 'hh:mm:ss';
        const currentTime = moment();
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
                                value={(this.state.startDate && this.state.endDate) ? `${moment(this.state.startDate).format('DD-MMM-YY')} - ${moment(this.state.endDate).format('DD-MMM-YY')}` : ''}
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
                            <View style={Styles.modalBackDrop}/>
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
                                                <View style={{flex: 1, paddingBottom: 0, marginBottom: 0}}>
                                                    {
                                                        this.state.selectorStart ?
                                                            <FontAwesome name="caret-up" style={Styles.caretIcon}/> :
                                                            <View/>
                                                    }
                                                </View>
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
                                                <View style={{flex: 1, paddingBottom: 0, marginBottom: 0}}>
                                                    {
                                                        !this.state.selectorStart ?
                                                            <FontAwesome name="caret-up" style={Styles.caretIcon}/> :
                                                            <View/>
                                                    }
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <Calendar
                                        current={this.state.selectorStart ? (new Date(this.state.startDateTemp)) : (new Date(this.state.endDateTemp))}
                                        minDate={currentTime.isBetween(beforeTime, afterTime) ? new Date(moment().subtract(1, 'days')) : new Date(currentDate)}
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
                                        style={Styles.calenderComponent}
                                        dayComponent={this.renderCustomDay.bind(this)}
                                    />
                                    <View style={Styles.calenderFooter}>
                                        <View style={Styles.footerBlock}>
                                            <Text style={Styles.buttonCancel}
                                                  onPress={this.closeCalender.bind(this)}>Cancel</Text>
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

export default homeScreen;
