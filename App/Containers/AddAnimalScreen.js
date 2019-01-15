import React, { Component } from 'react'
import { Alert, ScrollView, Text, Image, View, Button, TouchableOpacity, TextInput } from 'react-native'
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
    this.state = { text: '' };
  }

  _onAdd() {
    if(this.state.text) {
      this.props.addAnimal(this.state.text)
      this.props.navigation.navigate('LaunchScreen')
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
              onChangeText={(text) => this.setState({text})}
            />
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
