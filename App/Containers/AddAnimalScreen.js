import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TextInput, DatePickerAndroid } from 'react-native'
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
      date: {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getYear() + 1900,
      },
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

  async _openDatePicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(this.state.date.year, this.state.date.month - 1, this.state.date.day)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({
          ...this.state,
          date: {
            day,
            month: month + 1,
            year,
          },
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <View>
            <Text style={styles.headerText}>
              Add Animal
            </Text>

            <TextInput
              autoCapitalize='words'
              autoFocus={true}
              placeholder='Enter Name'
              editable={true}
              maxLength={40}
              onChangeText={(name) => this._onTextInput(name)}
            />

            <TouchableOpacity
              onPress={() => this._openDatePicker()}
            >
              <Text>
                Birthdate: { this.state.date.month }/{ this.state.date.day }/{ this.state.date.year }
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionsFooter}>
            <TouchableOpacity
              style={styles.link}
              onPress={() => this.props.navigation.navigate('LaunchScreen')}
            >
              <Text style={styles.LinkText}>
                Return
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this._onAdd()}
            >
              <Text style={styles.buttonText}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
