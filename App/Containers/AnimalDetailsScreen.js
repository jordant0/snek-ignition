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
  Picker,
} from 'native-base'
import { connect } from 'react-redux'
import DatabaseActions from '../Redux/DatabaseRedux'
import { bindActionCreators } from 'redux'

// Styles
import styles from './Styles/LaunchScreenStyles'

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

  render () {
    return (
      <Container>
        <Header>
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
        <Content />
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
