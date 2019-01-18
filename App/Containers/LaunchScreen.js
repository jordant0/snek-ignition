import React, { Component } from 'react'
import { ListView } from 'react-native';
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
import { connect } from 'react-redux'
import DatabaseActions from '../Redux/DatabaseRedux'
import { bindActionCreators } from 'redux'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
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
          <Left>
            <Icon name='analytics' style={{color: 'white'}} />
          </Left>
          <Body>
            <Title>Snek Ignition</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this._onReset()}>
              <Icon name='warning' />
            </Button>
          </Right>
        </Header>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(Object.values(this.props.database.animals))}
            renderRow={(data) =>
              <ListItem key={data.id} onPress={() => this.props.navigation.navigate('AnimalDetailsScreen', { id: data.id })}>
                <Text>
                  { data.name } - { this._birthdateDisplay(data) }
                </Text>
              </ListItem>
            }
            renderLeftHiddenRow={data =>
              <Button full info onPress={() => alert(data)}>
                <Icon active name="information-circle" />
              </Button>
            }
            renderRightHiddenRow={(data) =>
              <Button full danger onPress={() => this._onRemove(data.id)}>
                <Icon active name="trash" />
              </Button>
            }
          />
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
