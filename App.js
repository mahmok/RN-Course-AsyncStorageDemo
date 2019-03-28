import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';


export default class App extends React.Component 
{

  constructor(props)
  {
    super(props);
    this.state = {user: null};
    
  }

  componentWillMount()
  {
    AsyncStorage.getItem("UserDataKey").then(userData => {
      if(!userData)
      {
        //No data in this key, set item
        let user = {
          name: "Mahmoud Mokhtar",
          age: "23",
          courses: ["React Native", "Angular", "NodeJS"]
        };

        AsyncStorage.setItem("UserDataKey", JSON.stringify(user)).then(data => { //Stringify the object to save it in the local storage.
          
        }).catch(err => {
          console.log(err);
        })
      }
      else
      {
        //Data found, parse data to object.
        let userObject = JSON.parse(userData);
        this.setState({user: userObject});
      }
    }).catch(err => {
      console.log(err);
    })
  }


  renderCourses()
  {
    let courses = [];
    if(this.state.user)
    {
      for(let i = 0; i < this.state.user.courses.length; i++)
      {
        courses.push(<Text>{this.state.user.courses[i]}</Text>)
      }
  
      return(courses);
    }
    else 
    {
      return(null)
    }

  }

  render() 
  {
    return (
      <View style={styles.container}>
        {this.state.user?<Text style={styles.welcome}>My name is {this.state.user.name} and I am {this.state.user.age} years old!</Text>: <Text style={styles.welcome}>Nothing saved yet</Text>}
        {this.renderCourses()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
