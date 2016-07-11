import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
var WikiPages = require('./WikiPages');

class MyMGM extends Component {
  render() {
    return (
      <Text>Hello world!</Text>
    );
  }
}

AppRegistry.registerComponent('MyMGM', () => WikiPages);