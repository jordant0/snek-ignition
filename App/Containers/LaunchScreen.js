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
  List,
  ListItem,
} from 'native-base'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import DatabaseActions from '../Redux/DatabaseRedux'
import github from '../Redux/GithubRedux'
import { bindActionCreators } from 'redux'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Initial state',
    };
  }

  _onPressButton() {
    this.props.addAnimal('A')
    this.setState({
      text: 'Button Pressed',
    });
  }

  _onRemove(id) {
    this.props.removeAnimal(id)
  }

  _onReset() {
    this.props.reset()
  }

  _birthdateDisplay(animal) {
    if(animal.birthdate) {
      return new Date(animal.birthdate.year, animal.birthdate.month, animal.birthdate.day).toDateString()
    } else {
      return '';
    }
  }

  render () {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Snek Ignition</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this._onReset()}>
              <Icon name='sync' />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            {Object.values(this.props.database.animals).map((animal) =>
              <ListItem key={animal.id}>
                <Left>
                  <Text style={styles.sectionText}>
                    {animal.id}: { animal.name } - { this._birthdateDisplay(animal) }
                  </Text>
                </Left>

                <Right>
                  <Button danger onPress={() => this._onRemove(animal.id)}
                  >
                    <Text>Remove</Text>
                  </Button>
                </Right>
              </ListItem>
            )}
          </List>
        </Content>
        <Footer>
          <FooterTab>
            <Button full active onPress={() => this.props.navigation.navigate('AddAnimalScreen')}>
              <Text>Add Animal</Text>
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
)(LaunchScreen);
