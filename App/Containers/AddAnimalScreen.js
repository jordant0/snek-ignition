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
} from 'native-base'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import DatabaseActions from '../Redux/DatabaseRedux'
import github from '../Redux/GithubRedux'
import { bindActionCreators } from 'redux'

// Styles
import styles from './Styles/LaunchScreenStyles'

class AddAnimalScreen extends Component {
  constructor(props) {
    super(props);
    let date = new Date();
    this.state = {
      name: '',
      date: new Date(),
    };
  }

  _onTextInput(name) {
    this.setState({
      ...this.state,
      name: name,
    })
  }

  _onAdd() {
    if(this.state.name) {
      this.props.addAnimal(this.state.name, this.state.date)
      this.props.navigation.navigate('LaunchScreen')
    }
  }

  _onDateChange(newDate) {
    this.setState({
      ...this.state,
      date: newDate,
    })
  }

  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('LaunchScreen')}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Add Animal</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item>
              <Label>Name</Label>
              <Input
                autoCapitalize='words'
                maxLength={40}
                onChangeText={(name) => this._onTextInput(name)}
              />
            </Item>
            <Item>
              <Label>Birthdate</Label>
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
)(AddAnimalScreen);
