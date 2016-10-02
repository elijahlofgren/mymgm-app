import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, TouchableOpacity, Linking } from 'react-native';

class WikiPagesList extends Component {
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
          renderRow={(rowData) =>
            <TouchableOpacity onPress={() => this.openWikiPage(rowData)}>
              <Text>{rowData.name}</Text>
            </TouchableOpacity>
          }
          />
      </View>
    );
  }
  
  openWikiPage(rowData) {
    // TO DO: Read
    // http://stackoverflow.com/questions/35465021/simple-goto-page-in-a-listview-in-react-native
    console.log(new Date() + ': openWikiPage() called!');
    console.log('rowData =');
    console.log(rowData);
    if (rowData.url) {
      Linking.openURL(rowData.url);
    }
  
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

module.exports = WikiPagesList;