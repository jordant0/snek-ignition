import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.background
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      margin: Metrics.section,
      padding: Metrics.baseMargin,
      backgroundColor: Colors.transparent,
      justifyContent: 'space-between'
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin,
      flex: 1,
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.text,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    headerText: {
      ...Fonts.style.h1,
      color: Colors.text,
      textAlign: 'center'
    },
    button: {
      alignItems: 'center',
      backgroundColor: Colors.button,
      paddingVertical: Metrics.buttonPaddingY,
      paddingHorizontal: Metrics.buttonPaddingX,
    },
    buttonText: {
      ...Fonts.style.h5,
      fontWeight: 'bold',
      color: Colors.buttonText,
    },
    link: {
      backgroundColor: Colors.snow,
      paddingVertical: Metrics.buttonPaddingY,
      paddingHorizontal: Metrics.buttonPaddingX,
    },
    LinkText: {
      ...Fonts.style.h5,
      color: Colors.gray,
    },
    actionsFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  }
}

export default ApplicationStyles
