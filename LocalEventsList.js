import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, TouchableOpacity, Linking } from 'react-native';

class LocalEventsList extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds.cloneWithRows([
        {name: 'Loading...'}])
    };
    this.getEventsFromApiAsync();
  }
  render() {
    return (
      <View style={{ paddingTop: 22 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TouchableOpacity onPress={() => this.openEventLink(rowData)}>
              <Text>{rowData.title}</Text>
            </TouchableOpacity>
          }
          />
      </View>
    );
  }
  
  openEventLink(rowData) {
    console.log(new Date() + ': openEventLink() called!');
    console.log('rowData =');
    console.log(rowData);
    if (rowData.url) {
      Linking.openURL(rowData.url);
    }
  
  }

  getEventsFromApiAsync() {
    return fetch('https://www.mymgm.org/api/localeventsapi')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: this.ds.cloneWithRows(responseJson)
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

}

module.exports = LocalEventsList;