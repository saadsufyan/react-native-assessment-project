import React, { Component, Fragment } from 'react';
import { 
  View, 
  Text,
  TextInput,
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ActivityIndicator } from 'react-native';
import { AUTH_TOKEN } from '../constants/APIConstants';


export default class ListComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      username: '',
      error: null
    };
  }

  fetchData = async () => {
    if (this.state.username == '') {return}

    const { username } = this.state;
    const url = `https://api.github.com/users/${username}/repos`;

    this.setState({ 
      loading: true,
      data: []
    });
   
    fetch(url, { 
      method: 'get', 
      headers: new Headers({
        'Authorization': `token ${AUTH_TOKEN}`, 
      })
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        data: res
          // Filter out forked repos
          .filter(item => item.fork == false)
          // Sort by Star count descending
          .sort((it1, it2) => it2.stargazers_count - it1.stargazers_count),
        error: res.length == 0 ? "No Data Found" : null,
        loading: false
      });
    })
    .catch(error => {
      this.setState({ error: 'No Data Found', loading: false })
      console.log(error);
    });
    
  }


  renderHeader = () => {
    if (this.state.loading) return null
    return (
      <View
        style={styles.searchBarContainer}>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => this.setState({username: text})}
          value={this.state.username}
          placeholder='Github username'
          style={styles.searchBarInput}
          textStyle={{ color: '#000' }}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={this.fetchData}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    )
  }


  renderSeparator = () => {
    return (
      <View
        style={styles.listSeparator}
      />
    )
  }

  renderEmptyContainer = () => {
    const { error } = this.state;
    return (
      <Text style={styles.noDataText}>{error}</Text>
    )
  }


  renderFooter = () => {
    if (!this.state.loading) return null
  
    return (
      <View
        style={styles.listFooter}>
        <ActivityIndicator animating size='large' />
        <Text style={{textAlign: 'center'}}>Loading</Text>
      </View>
    )
  }


  renderItem = item => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('detail' , { details: item.item }) }>
        <View
          style={styles.listItemContainer}>
          <Text
            style={styles.repoTitle}>{`${item.item.name}`}</Text>
            {/* Conditional Render if description not null */}
            { item.item.description &&
              <Fragment>
                  <Text style={styles.repoDescription}>{item.item.description}</Text>
              </Fragment>
            }
            <Text style={styles.repoLanguage}>{item.item.language || 'No languagges detected'}</Text>
        </View>
      </TouchableOpacity>
    )
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.listView}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderHeader}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmptyContainer}
        />
      </SafeAreaView>
    );
  }


}


//==============
// Styles
//==============
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  listView: {
    width: '100%',
    paddingHorizontal: 20,
  },
  listSeparator: {
    height: 10,
  },
  listFooter: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE'
  },
  listItemContainer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  searchBarContainer: {
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchBarInput: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: '#ddd',
    width: '100%',
    fontSize: 18,
    padding: 10,
    flex: 3
  },
  searchButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#ddd',
    backgroundColor: '#03a9f4',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  searchButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  repoTitle: {
    color: '#000',
    textAlign: 'left',
    width: '100%',
    fontWeight: 'bold'
  },
  repoDescription: {
    marginTop: 10, 
    textAlign: 'left', 
    width: '100%', 
    fontSize: 12,
    color: '#aaa'
  },
  repoLanguage: {
    textAlign: 'left', 
    width: '100%', 
    marginTop: 10,
    fontSize: 10,
    fontStyle: 'italic'
  },
  noDataText: {
    width: '100%', 
    textAlign: 'center'
  }
})