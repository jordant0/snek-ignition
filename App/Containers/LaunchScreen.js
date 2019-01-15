import React, { Component } from 'react'
import { Alert, ScrollView, Text, Image, View, Button, TouchableOpacity } from 'react-native'
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

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <View>
            <Text style={styles.headerText}>
              Snek Ignition
            </Text>

            {Object.values(this.props.database.animals).map((animal) =>
              <View key={animal.id}>
                <Text style={styles.sectionText}>
                  {animal.id}: { animal.name } - { animal.birthdate.month }/{ animal.birthdate.day }/{ animal.birthdate.year }
                </Text>

                <Button
                  onPress={() => this._onRemove(animal.id)}
                  title="Remove"
                  color="#841584"
                />
              </View>
            )}
          </View>

          <View style={styles.actionsFooter}>
            <TouchableOpacity
              style={styles.link}
              onPress={() => this._onReset()}
            >
              <Text style={styles.LinkText}>
                Reset
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('AddAnimalScreen')}
            >
              <Text style={styles.buttonText}>
                Add Animal
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
)(LaunchScreen);
