import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';

class MyMGM extends Component {
  render() {
    return (
      <Text>Hello world!</Text>
    );
  }
}

AppRegistry.registerComponent('MyMGM', () => MyMGM);