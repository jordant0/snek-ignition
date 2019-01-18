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
  ActionSheet,
  Tabs,
  Tab,
  ScrollableTab,
} from 'native-base'
import { connect } from 'react-redux'
import DatabaseActions from '../Redux/DatabaseRedux'
import { bindActionCreators } from 'redux'
import EventsListingTab from './EventsListingTab'

// Styles
import styles from './Styles/LaunchScreenStyles'

var BUTTONS = [
  'Feeding',
  'Handling',
  'Shedding',
  'Other',
  'Cancel',
];

var CANCEL_INDEX = 4;

class AnimalDetailsScreen extends Component {
  constructor(props) {
    super(props);
    let animalId = this.props.navigation.getParam('id', -1),
        animal = animalId >= 0 ? this.props.database.animals[animalId] : {};

    this.state = {
      animalId,
      animal,
    };
  }

  _onNewEvent(eventIndex) {
    if(eventIndex !== CANCEL_INDEX) {
      this.props.navigation.navigate('AddEventScreen', {
        animalId: this.state.animalId,
        type: BUTTONS[eventIndex],
      })
    }
  }

  render () {
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('LaunchScreen')}>
              <Icon name='arrow-round-back' />
            </Button>
          </Left>
          <Body>
            <Title>{ this.state.animal.name }</Title>
          </Body>
          <Right />
        </Header>

        <Tabs locked={true} renderTabBar={()=> <ScrollableTab />}>
          <Tab heading='All'>
            <EventsListingTab animalId={ this.state.animalId } />
          </Tab>
          <Tab heading='Feeding'>
            <EventsListingTab animalId={ this.state.animalId } type='Feeding' />
          </Tab>
          <Tab heading='Handling'>
            <EventsListingTab animalId={ this.state.animalId } type='Handling' />
          </Tab>
          <Tab heading='Shedding'>
            <EventsListingTab animalId={ this.state.animalId } type='Shedding' />
          </Tab>
          <Tab heading='Other'>
            <EventsListingTab animalId={ this.state.animalId } type='Other' />
          </Tab>
        </Tabs>

        <Footer>
          <FooterTab>
            <Button full active onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                },
                buttonIndex => {
                  this._onNewEvent(buttonIndex);
                }
              )}
            >
              <Text>New Event</Text>
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
)(AnimalDetailsScreen);
