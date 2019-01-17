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

class AddAnimalScreen extends Component {
  constructor(props) {
    super(props);
    let date = new Date();
    this.state = {
      name: '',
      date: new Date(),
      type: 'Unknown',
      species: 'Unknown',
    };
  }

  _onNameInput(text) {
    this.setState({
      ...this.state,
      name: text,
    })
  }

  _onTypeChange(text) {
    this.setState({
      ...this.state,
      type: text,
    })
  }

  _onSpeciesInput(text) {
    this.setState({
      ...this.state,
      species: text,
    })
  }

  _onAdd() {
    if(this.state.name) {
      this.props.addAnimal(this.state)
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
              <Icon name='arrow-round-back' />
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
                onChangeText={(name) => this._onNameInput(name)}
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

            <Item>
              <Label>Type</Label>
              <Picker
                note
                mode="dropdown"
                selectedValue={this.state.type}
                onValueChange={(type) => this._onTypeChange(type)}
              >
                <Picker.Item label="Unknown" value="Unknown" />
                <Picker.Item label="Snake" value="Snake" />
                <Picker.Item label="Lizard" value="Lizard" />
                <Picker.Item label="Bird" value="Bird" />
                <Picker.Item label="Fish" value="Fish" />
              </Picker>
            </Item>

            <Item>
              <Label>Species</Label>
              <Input
                autoCapitalize='words'
                maxLength={160}
                onChangeText={(text) => this._onSpeciesInput(text)}
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
