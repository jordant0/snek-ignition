import { createStackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import AddAnimalScreen from '../Containers/AddAnimalScreen'
import AnimalDetailsScreen from '../Containers/AnimalDetailsScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  AddAnimalScreen: { screen: AddAnimalScreen },
  AnimalDetailsScreen: { screen: AnimalDetailsScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
