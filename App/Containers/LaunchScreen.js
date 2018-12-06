import React, { Component } from 'react'
import { Alert, ScrollView, Text, Image, View, Button } from 'react-native'
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
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={styles.sectionText}>
              { this.state.text }
            </Text>

            <Text style={styles.sectionText}>
              State: { JSON.stringify(this.props.database) }
            </Text>

            <Text style={styles.sectionText}>
              State: { this.props.database.test }
            </Text>

            {Object.values(this.props.database.animals).map((animal) =>
              <View key={animal.id}>
                <Text style={styles.sectionText}>
                  {animal.id}: { animal.name }
                </Text>

                <Button
                  onPress={() => this._onRemove(animal.id)}
                  title="Remove"
                  color="#841584"
                />
              </View>
            )}

            <Button
              onPress={() => this._onPressButton()}
              title="Add"
            />

            <Button
              onPress={() => this._onReset()}
              title="Reset"
              color="red"
            />
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
