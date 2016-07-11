import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View } from 'react-native';

class WikiPages extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }
  render() {
    return (
      <View style={{ paddingTop: 22 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
          />
      </View>
    );
  }
  /*
   getPagesFromApiAsync() {
      return fetch('https://localwiki.org/api/v4/pages/?region__slug=mgm&format=json')
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  */
}

module.exports = WikiPages;