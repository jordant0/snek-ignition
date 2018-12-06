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
      id: 1
    };
  }

  _onPressButton() {
    this.props.addAnimal(this.state.id, 'A')
    this.setState({
      text: 'Button Pressed',
      id: this.state.id + 1
    });
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={styles.sectionText}>
              { this.state.text }
            </Text>

            <Text style={styles.sectionText}>
              State: { this.props.database.test }
            </Text>

            {Object.values(this.props.database.animals).map((animal) =>
              <Text key={animal.id} style={styles.sectionText}>
                {animal.id}: { animal.name }
              </Text>

            )}

            <Button
              onPress={() => this._onPressButton()}
              title="Click here"
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
