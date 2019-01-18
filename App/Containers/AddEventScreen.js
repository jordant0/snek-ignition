import React, { Component } from 'react'
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Form,
  Item,
  Label,
  Input,
  DatePicker,
  Textarea,
} from 'native-base'
import { TimePickerAndroid } from 'react-native'
import { connect } from 'react-redux'
import DatabaseActions from '../Redux/DatabaseRedux'
import { bindActionCreators } from 'redux'

// Styles
import styles from './Styles/LaunchScreenStyles'

class AddEventScreen extends Component {
  constructor(props) {
    super(props);
    let date = new Date(),
        animalId = this.props.navigation.getParam('animalId', 0),
        type = this.props.navigation.getParam('type', 'Feeding');

    this.state = {
      animalId,
      type,
      date,
      time: null,
      notes: '',
    };
  }

  _onAdd() {
    this.props.addEvent(this.state);
    this.props.navigation.goBack();
  }

  _onDateChange(newDate) {
    this.setState({
      ...this.state,
      date: newDate,
    })
  }

  async _onTimeChange() {
    let time = new Date();
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: time.getHours(),
        minute: time.getMinutes(),
        is24Hour: false,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        this.setState({
          ...this.state,
          time: {
            hour,
            minute,
          },
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }

  _onNotesInput(text) {
    this.setState({
      ...this.state,
      notes: text,
    })
  }

  _timeDisplay() {
    let hour, minute, suffix;
    if(this.state.time) {
      hour = this.state.time.hour <= 12 ? this.state.time.hour : this.state.time.hour -12;
      minute = this.state.time.minute;
      suffix = this.state.time.hour < 12 ? 'AM' : 'PM';
      return `${hour}:${minute} ${suffix}`;
    }
    else {
      return 'Select time';
    }
  }

  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-round-back' />
            </Button>
          </Left>
          <Body>
            <Title>Add { this.state.type } Event</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item>
              <Label>Date</Label>
              <DatePicker
                defaultDate={this.state.date}
                locale={"en"}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                onDateChange={(date) => this._onDateChange(date)}
              />
            </Item>

            <Item>
              <Label>Time</Label>
              <Text
                style={{ padding: 10 }}
                onPress={() => this._onTimeChange()}
              >
                { this._timeDisplay() }
              </Text>
            </Item>


            <Textarea
              rowSpan={5}
              bordered
              placeholder="Notes"
              style={{ margin: 15 }}
              onChangeText={(text) => this._onNotesInput(text)}
            />
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button full active onPress={() => this._onAdd()}>
              <Text>Add</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { database } = state
  return { database }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators(DatabaseActions, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEventScreen);
