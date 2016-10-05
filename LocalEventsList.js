import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, TouchableOpacity, Linking, Stylesheet } from 'react-native';
var moment = require('moment');




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
            <View style={[styles.eventCard]}>
              <Text>{rowData.title}</Text>
              <Text style={[styles.eventDate]}>
              {moment(rowData.startDate).format("ddd, MMM Do h:mm a")} ({moment(rowData.startDate).fromNow()})</Text>
              </View>
            </TouchableOpacity>
          }
          />
      </View>
    );
  }
  
  openEventLink(rowData) {
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

// TO DO: Get Stylesheet.create working
var styles = {
  eventCard: {
    borderRadius: 8,
    margin:2,
    padding:5,
    backgroundColor: '#99CCFF'
  },
  eventDate: {
    fontStyle:'italic',
    fontSize: 10,
    textAlign: 'right'
  }
};


module.exports = LocalEventsList;