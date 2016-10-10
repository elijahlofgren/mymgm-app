import React, { Component } from 'react';
import {
  AppRegistry, ListView, Text, View, TouchableOpacity, Linking, Stylesheet,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var moment = require('moment');

class LocalEventsList extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds.cloneWithRows([
        { title: 'Loading...' }])
    };
    // Attempt to read from cache first
    this.readCacheData();
  }
  render() {
    return (
      <View style={{ paddingTop: 22 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={[styles.eventCard]}>
              <View>
                <TouchableOpacity onPress={() => this.openEventLink(rowData) }>
                  <Text>{rowData.title}</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.eventDateAndCategory]}>
                <View>
                  <Text style={[styles.eventCategoryText]}>{rowData.category}</Text>
                </View>
                <View>
                  <Text style={[styles.eventDateText]}>
                    {moment(rowData.startDate).format("ddd, MMM Do h:mm a") } ({moment(rowData.startDate).fromNow() })
                  </Text>
                </View>
                <View>
                  <TouchableOpacity onPress={ () => this.openEventAddress(rowData) } style={[styles.eventDirectionsIcon]}>
                    <Icon name="map-marker" ></Icon>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
          />
      </View>
    );
  }

  openEventAddress(rowData) {
    if (rowData.address) {
      Linking.openURL('https://maps.google.com?q=' + encodeURIComponent(rowData.address));
    }
  }
  openEventLink(rowData) {
    if (rowData.url) {
      Linking.openURL(rowData.url);
    }
  }

  async cacheData(localEvents) {
    console.log('cacheData() called');
    try {
      await AsyncStorage.setItem('@mymgmDataCache:localevents', JSON.stringify(localEvents));
    } catch (error) {
      console.error(error);
    }
  }

  async readCacheData() {
    console.log('readCacheData() called');
    try {
      const value = await AsyncStorage.getItem('@mymgmDataCache:localevents');
      if (value !== null) {
        var localEvents = JSON.parse(value);
        this.setState({
          dataSource: this.ds.cloneWithRows(localEvents)
        });
      }
      try {
        // Now fetch live data
        this.getEventsFromApiAsync();
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      // Error retrieving data from cache
      this.getEventsFromApiAsync();
    }
  }

  getEventsFromApiAsync() {
    console.log('getEventsFromApiAsync() called');
    // Couldn't get catch of network error in airplane mode working using fetch() so using XMLHttpRequest
    // so that we prevent app from crashing in airplane mode.
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        console.log('success', request.responseText);
        var responseJson = JSON.parse(request.responseText);
        console.log("Successfully loaded!");
        this.setState({
          dataSource: this.ds.cloneWithRows(responseJson)
        });
        this.cacheData(responseJson);
      } else {
        console.warn('error');
      }
    };
    try {
      request.open('GET', 'https://www.mymgm.org/api/localeventsapi');
      request.send();
    } catch (error) {
      console.error(error);
    }
  }
}

// TO DO: Get Stylesheet.create working
var styles = {
  eventCard: {
    borderRadius: 8,
    margin: 2,
    padding: 5,
    backgroundColor: '#99CCFF'
  },
  eventDateAndCategory: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  eventDateText: {
    fontStyle: 'italic',
    fontSize: 10
  },
  eventCategoryText: {
    fontStyle: 'italic',
    fontSize: 10
  },
  eventDirectionsIcon: {
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10
  }
};


module.exports = LocalEventsList;