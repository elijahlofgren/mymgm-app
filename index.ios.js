import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
var WikiPagesList = require('./WikiPagesList');
var LocalEventsList = require('./LocalEventsList');

class MyMGM extends Component {
  render() {
    return (
      <View>
        <Text>Hello world!</Text>
        <LocalEventsList />
      </View>
    );
  }
}

//AppRegistry.registerComponent('MyMGM', () => WikiPagesList);
AppRegistry.registerComponent('MyMGM', () => LocalEventsList);