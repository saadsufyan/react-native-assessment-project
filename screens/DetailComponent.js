import React, { Component } from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { AUTH_TOKEN } from '../constants/APIConstants';


export default class DetailComponent extends Component {

    constructor(props) {
      super(props);
      this.state = {
          details: this.props.route.params.details || {},
          readme: ""
      }
    }

    componentDidMount() {
        this.fetchReadme()
    }

    fetchReadme() {
        const { details } = this.state;
        const url = `https://raw.githubusercontent.com/${details.full_name}/master/readme.md`;

        fetch(url, { 
            method: 'get', 
            headers: new Headers({
              'Authorization': `token ${AUTH_TOKEN}`, 
            })
          })
        .then(res => { 
            return res.status == 200 ? res.text()  : ""
        })
        .then(res => {
            this.setState({readme: res});
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        const { details, readme } = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Text style={styles.text}><Text style={styles.bold}>Owner</Text>{'\n'+details.owner.login}</Text>
                    <Text style={styles.text}><Text style={styles.bold}>Repo Name</Text>{'\n'+details.name}</Text>
                    <Text style={styles.text}><Text style={styles.bold}>Description</Text>{'\n'+details.description}</Text>
                    <Text style={styles.text}><Text style={styles.bold}>Stars</Text>{'\n'+details.stargazers_count}</Text>
                    <Text style={styles.text}><Text style={styles.bold}>Watchers</Text>{'\n'+details.watchers}</Text>
                    { readme != "" &&
                        <Text style={styles.text}><Text style={styles.bold}>Readme</Text>{'\n\n'+readme}</Text>
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}


//==============
// Styles
//==============
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'flex-start',
        paddingTop: 20,
        backgroundColor: '#eee',
    },
    text: {
        fontSize: 14,
        paddingHorizontal: 10,
        marginTop: 10
    },
    bold: {
        fontWeight: 'bold'
    },
    readmeText: {
        marginTop: 20
    }
  })