import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TextInput,
  Animated
} from 'react-native';


import Svg,{
  Line,
  Path,
  Polygon,
  Polyline,
  Rect
} from 'react-native-svg';


export default class App extends Component<{}> {
  state = {
    test4: [
    {key:5, author:"Alex", message:"Hurry!"},
    {key:4, author:"Patrick", message:"Sorry was running late"},
    {key:3, author:"Frankie", message:"Probably at kofa again"},
    {key:2, author:"Nadiya", message:"Where's Patrick?"},
      {key:1, author:"Alex", message:"Got it"},
      {key:0, author:"Eli", message:"Rehearsal at 10, don't be late!"}
      ],

    inputValue: '',
    intro: true,

    moveAnim2: new Animated.Value(150),
    marginAnim2: new Animated.Value(15),
    fadeOutAnim2: new Animated.Value(1),

    textAlign: 'right',

    itemAnimationValues: {}
  }
  


 
  _renderMessageBar = (entry) => {
    var photo = null
    var you = null
    var imageStyleExtra = null


    if (entry.item.author === this.props.username) {
      you = true
    }
    else {
      you = false
    }

    if (entry.item.author === "Alex") {
      photo = require('./assets/photos/alex.jpg')
    }
    else {
    if (entry.item.author === "Frankie") {
      photo = require('./assets/photos/frankie.jpg')
    }
    else if (entry.item.author === "Eli") {
      photo = require('./assets/photos/eli.jpg')
    }
    else if (entry.item.author === "Patrick") {
        photo = require('./assets/photos/patrick.jpg')
    }
    else if (entry.item.author === 'Nadiya')  {
        photo = require('./assets/photos/nadiya.jpg')
    }
    else {
      photo = undefined
    }

    }

    if (you === true) {
      imageStyleExtra = {marginLeft: 20}
    }
    else {
      imageStyleExtra = {marginRight: 20}
    }
    return  <View key={entry.item.key} style={you ? {flexDirection:'row-reverse', marginBottom: 20, justifyContent:'flex-start'} : {flexDirection:'row', marginBottom: 20, justifyContent:'flex-start'}}>
    <Image style={{...imageStyleExtra, width: 50, height: 50, borderRadius: 25}} source={photo}/><Text>{entry.item.message}</Text>
    </View>
  }

  _handleTextChange = (inputValue) => {
      this.setState({ inputValue });
    }
  _submitMessage = () => {
      this.props.sendMessage(this.state.inputValue);
      this.setState({inputValue:""});
    }

  render() {
     return (
  <View style={styles.container}>
        <TouchableWithoutFeedback onPress={()=>{this.setState({intro:true,
    //fadeInOpacity: new Animated.Value(0.5),
    moveAnim2: new Animated.Value(150),
    marginAnim2: new Animated.Value(15),
    fadeOutAnim2: new Animated.Value(1),
    textAlign: 'right'})}}>
        <View id="topBar" style={styles.topBar}>
                  <Svg height="30" width="30">
                    <Polyline points="3,30 9.8,13 0,5 9.8,13 15,0 20.2,13 30,5 20.2,13 27,30" fill="none" stroke="white" strokeWidth="2.5"/>
                  </Svg>

                  <Text style={{fontSize:30, color:'white', textAlign:'right', fontFamily: 'Amiko-Regular'}}>mico</Text>
        </View>
        </TouchableWithoutFeedback>
        <View id="messageContainer" style={{flex:1,backgroundColor: '#FFFFFF', overflow:'hidden',paddingTop: 25, flexDirection:'column-reverse'}}>
          <Animated.View style={{flex:1, opacity:this.state.fadeInOpacity, flexDirection:'column-reverse'}}>
          <View style={{backgroundColor: 'white', borderTopWidth: 1, borderColor:'grey', height: 46, width:375, flexDirection: 'row'}}>
            <TextInput
          value={this.state.inputValue}
          onChangeText={this._handleTextChange}
          style={styles.messageBox}
          underlineColorAndroid="transparent"
          placeholder="Write a message"
          onSubmitEditing = {
            this._submitMessage
          }/>
            <Svg style ={{marginLeft: 2}} height="44" width="44">
            <Rect
              x="0"
              y="0"
              width="44"
              height="44"
              
              fill="#FFFFFF"
              onPress = { this._submitMessage }
            />
            <Polygon
              points="5,5 39,22 5,39 13, 22"
              fill = "#22A7F0"
              stroke="#22A7F0"
              strokeWidth="1"
              onPress = {this._submitMessage}
              />
          </Svg>
          </View>
          <FlatList inverted={true} style={{flex:1}} data={this.props.messages} extraData={this.props.messages} renderItem={this._renderMessageBar}/>
          <Text style={{fontSize:30, color:'black', textAlign: 'center', fontFamily: 'Amiko-Regular'}}>GQ</Text>
        </Animated.View>
        </View>
  </View>
  );
  }}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22A7F0',
    paddingTop: 20
  },
  topBar: {
    height: 50,
    flexWrap: 'wrap',
    alignItems:'flex-start',
    flexDirection:'row',
    justifyContent: 'center'
  },
  list: {
    flex:1,
    backgroundColor: '#FFFFFF',
    overflow:'hidden',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    paddingTop: 25,
    paddingLeft: 1,
    paddingRight: 1
  },
  messageContainer: {
    flex:1,
    backgroundColor: '#FFFFFF',
    overflow:'hidden',
    paddingTop: 25,
    flexDirection:'column-reverse'
  },
  messageBox: {
    width: 300, 
    height: 44, 
    padding: 8,
    textAlign: 'center',
    //backgroundColor: '#ecf0f1',
    borderRadius: 5,
    overflow: 'hidden'
  },
  yourMessage: {
    backgroundColor: '#19B5FE', 
    margin: 10, 
    marginLeft: 50,  
    padding: 5,
    height: 60, 
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden'
  },
  theirMessage: {
    backgroundColor: '#F9BF3B', 
    margin: 10, 
    marginRight: 50, 
    padding: 5,
    height: 60, 
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden'
  },
});
