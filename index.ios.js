import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
var WikiPagesList = require('./WikiPagesList');

class MyMGM extends Component {
  render() {
    return (
      <Text>Hello world!</Text>
    );
  }
}

AppRegistry.registerComponent('MyMGM', () => WikiPagesList);