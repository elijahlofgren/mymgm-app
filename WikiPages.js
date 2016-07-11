import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View } from 'react-native';

class WikiPages extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds.cloneWithRows([
        {name: 'Loading...'}])
    };
    this.getPagesFromApiAsync();
  }
  render() {
    return (
      <View style={{ paddingTop: 22 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.name}</Text>}
          />
      </View>
    );
  }

  getPagesFromApiAsync() {
    return fetch('https://localwiki.org/api/v4/pages/?region__slug=mgm&format=json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: this.ds.cloneWithRows(responseJson.results)
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

}

module.exports = WikiPages;