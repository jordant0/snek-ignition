import React, { Component } from 'react'
import { ListView } from 'react-native';
import {
  Content,
  Button,
  Icon,
  Text,
  List,
  ListItem,
} from 'native-base'
import { connect } from 'react-redux'
import DatabaseActions from '../Redux/DatabaseRedux'
import { bindActionCreators } from 'redux'

// Styles
import styles from './Styles/LaunchScreenStyles'

class EventsListingTab extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
  }

  _eventsList() {
    return Object.values(this.props.database.events).filter((event) => {
      if(this.props.type) {
        return event.animalId === this.props.animalId && event.type === this.props.type;
      }
      else {
        return event.animalId === this.props.animalId;
      }
    }).sort((eventA, eventB) => {
      if (eventA.date.year === eventB.date.year) {
        if (eventA.date.month === eventB.date.month) {
          if (eventA.date.day === eventB.date.day) {
            if(eventA.time && eventB.time) {
              if(eventA.time.hour === eventB.time.hour) {
                return eventA.time.minute - eventB.time.minute;
              }
              else {
                return eventA.time.hour - eventB.time.hour;
              }
            }
            else {
              if(eventB.time) {
                return 1;
              }
              else {
                return -1;
              }
            }
          }
          else {
            return eventA.date.day - eventB.date.day;
          }
        }
        else {
          return eventA.date.month - eventB.date.month;
        }
      }
      else {
        return eventA.date.year - eventB.date.year;
      }
    });
  }

  _eventDisplay(event) {
    let date, timestamp, details, notes,
        animalName = this.props.database.animals[this.props.animalId].name;

    date = `${event.date.month}/${event.date.day}/${event.date.year}`;
    notes = event.notes ? ` ${event.notes}` : '';

    if(event.time) {
      hour = event.time.hour <= 12 ? event.time.hour : event.time.hour -12;
      minute = event.time.minute;
      suffix = event.time.hour < 12 ? 'AM' : 'PM';
      timestamp = ` at ${hour}:${minute} ${suffix}`;
    }

    switch(event.type) {
      case 'Feeding':
        details = `Fed ${animalName}${notes}${timestamp}`
        break;
      case 'Handling':
        details = `Handled ${animalName}${notes}`
        break;
      case 'Shedding':
        details = `${animalName} shed${notes}`
        break;
      default:
        details = `${animalName}${notes}`
    }
    return `${date} - ${details}`
  }

  _onRemoveEvent(eventId) {
    this.props.removeEvent(eventId)
  }

  render () {
    return (
      <Content>
        <List
          rightOpenValue={-75}
          dataSource={this.ds.cloneWithRows(this._eventsList())}
          renderRow={(data) =>
            <ListItem key={data.id}>
              <Text>
                { this._eventDisplay(data) }
              </Text>
            </ListItem>
          }
          renderRightHiddenRow={(data) =>
            <Button full danger onPress={() => this._onRemoveEvent(data.id)}>
              <Icon active name="trash" />
            </Button>
          }
        />
      </Content>
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
)(EventsListingTab);
