import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Animated
} from 'react-native';

import Camera from 'react-native-camera';

import Svg,{
  Line,
  Path,
  Polygon,
  Polyline,
  Rect
} from 'react-native-svg';


export default class App extends Component<{}> {
  state = {
    test:[{key: 0, name: "GQ"}, 
    {key: 1, name: "Ask not the Sparrow How the Eagle Flies" }, 
    {key: 2, name: "Not Nerdy, Super Hip"}, 
    {key: 3, name: "The Pratt 3"}, 
    {key: 4, name: "Spring 2015 - Chicago Incubator"},
    ],
    test2:[{key: 0, name: "GQ", quotes: [{text:"Hey guys, remember that time we were on TV???", author:{first:"Daniel", last:"Potter"}}]},
    {key: 1, name: "Ask not the Sparrow How the Eagle Flies", quotes: [{text: "You know Alex is back when the common room smells like dominos", author: {first: "Keshav", last:"Goel"}}] },
    {key: 2, name: 'Pushups at the Clark', quotes: [{text: 'I will put that on my tinder, but only with the other ones too', author: {first: 'Mark', last: 'Hay'}}]}
    ],
    test3: [
      {key: 0, text:"Hey guys, remember that time we were on TV???", author:{first:"Daniel", last:"Potter"}}, 
      {key: 1, text:"Merry Christmas everybody!! 🎁🎄⭐️", author:{first:"Eli", last:"Llera"}}, 
      {key: 2,text:"Why are you only singing three notes?", author:{first:"Patrick", last:""}}
    ],
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
    fadeOutAnim: new Animated.Value(1),

    moveAnim: new Animated.Value(200),
    marginAnim: new Animated.Value(15),
    fadeInOpacity: new Animated.Value(0.5),

    moveAnim2: new Animated.Value(150),
    marginAnim2: new Animated.Value(15),
    fadeOutAnim2: new Animated.Value(1),
    widthAnim: new Animated.Value(200),
    textAlign: 'right',

    itemAnimationValues: {}
  }
  
  _testRender = (entry) => {
    var photo = null
    
    if (entry.item.name === "GQ") {
      photo = require('./assets/photos/gq.jpg')
      return <TouchableHighlight onPress={()=>{
        Animated.parallel([
        Animated.timing(
      this.state.fadeOutAnim,
      {
        toValue:0,
        duration: 300
      }
    ),
      Animated.timing(
        this.state.moveAnim,
        {
          toValue:50,
          duration:300
        }
      ),
      Animated.timing(
        this.state.marginAnim,
        {
          toValue: 450,
          duration: 300
        }
      ),
        ]).start(() => {
      this.setState({intro:false}, () => {
        Animated.timing(
        this.state.fadeInOpacity,
        {
          toValue:1,
          duration:200
        }
      ).start()  
      });
    });
      }} key={entry.item.key} ><Animated.View style={{height: 125, width: 350, marginBottom: this.state.marginAnim, flexDirection: 'row'}}><Animated.Image style={{width: 150, height: 125, borderRadius: 5, opacity:this.state.fadeOutAnim}} source={photo}/><Animated.Text style={{fontSize: 26, width:this.state.moveAnim, textAlign:'right', fontFamily: 'Amiko-Regular'}}>{entry.item.name}</Animated.Text></Animated.View></TouchableHighlight>
    }
    else if (entry.item.name === "Ask not the Sparrow How the Eagle Flies") {
      photo = require('./assets/photos/sparrow.jpg')
/*
() => {
          Animated.parallel([
        Animated.timing(
      this.state.fadeOutAnim,
      {
        toValue:0,
        duration: 300
      }
    ),
      Animated.timing(
        this.state.moveAnim,
        {
          toValue:50,
          duration:300
        }
      ),
      Animated.timing(
        this.state.marginAnim,
        {
          toValue: 450,
          duration: 300
        }
      ),
        ]).start(() => {
      this.setState({intro:false}, () => {
        Animated.timing(
        this.state.fadeInOpacity,
        {
          toValue:1,
          duration:200
        }
      ).start()  
      });
    });
        }});

*/
    }
    else if (entry.item.name === "Not Nerdy, Super Hip") {
      photo = require('./assets/photos/choir.jpg')
    }
    else if (entry.item.name === "The Pratt 3"){
      photo = require('./assets/photos/pratt.jpg')
    }
    else {
      photo = require('./assets/photos/catapult.png')
    }

      this.state.itemAnimationValues[entry.item.key] = {}
      this.state.itemAnimationValues[entry.item.key].fadeOutAnim = new Animated.Value(1)
      this.state.itemAnimationValues[entry.item.key].moveAnim = new Animated.Value(150)
      this.state.itemAnimationValues[entry.item.key].marginAnim = new Animated.Value(15)
      this.state.itemAnimationValues[entry.item.key].widthAnim = new Animated.Value(200)
      this.state.itemAnimationValues[entry.item.key].textAlign = 'right'


      //onPress={()=>{this.refs.screen1List.scrollToIndex({viewPosition: 0, index:1, viewOffset:0})}}
      return <TouchableHighlight onPressOut = {() => {
        this.setState((prevState) => {
          thisObject = Object.assign({}, prevState.itemAnimationValues[entry.item.key])
          thisObject = {...thisObject, textAlign:'center'}
          //thisObject.itemAnimationValues[entry.item.key].textAlign = 'center'
          //alert(JSON.stringify(thisObject.itemAnimationValues[entry.item.key].textAlign))
          //return {'itemAnimationValues':thisObject.itemAnimationValues, changed:entry.item.key}
          //return {'itemAnimationValues': Object.assign(this.state.itemAnimationValues, {entry.item.key: Object.assign(this.state.itemAnimationValues[entry.item.key], {'textAlign': 'center'})} )}
          //alert(JSON.stringify({...this.state, itemAnimationValues: {...this.state.itemAnimationValues, [entry.item.key]:{...this.state.itemAnimationValues[entry.item.key], textAlign:'center'}}}))
          return thisObject
          //{...prevState, itemAnimationValues: {...prevState.itemAnimationValues, [entry.item.key]:thisObject}}
      }, 
          () => {
            
        Animated.parallel([
        Animated.timing(
      this.state.itemAnimationValues[entry.item.key].fadeOutAnim,
      {
        toValue:0,
        duration: 300
      }
    ),
      Animated.timing(
        this.state.itemAnimationValues[entry.item.key].moveAnim,
        {
          toValue: 0,
          duration:150
        }
      ),
      Animated.timing(
        this.state.itemAnimationValues[entry.item.key].marginAnim,
        {
          toValue: 450,
          duration: 300
        }
      ),
      Animated.timing(
        this.state.itemAnimationValues[entry.item.key].widthAnim,
        {
          toValue: 350,
          duration:150
        }
      )
        ], {'stopTogether':false}).start(() => {
      this.setState({intro:false}, () => {
        Animated.timing(
        this.state.fadeInOpacity,
        {
          toValue:1,
          duration:200
        }
      ).start()  
      });
    })
        });
          
        }} onPress={()=>{this.refs.screen1List.scrollToIndex({viewPosition: 0, index:entry.item.key, viewOffset:0})}} key={entry.item.key}>
        <Animated.View style={{height: 125, width: 350, marginBottom: this.state.itemAnimationValues[entry.item.key].marginAnim, flexDirection: 'row'}}>
          <Animated.Image style={{width: 150, height: 125, borderRadius: 5, opacity:this.state.itemAnimationValues[entry.item.key].fadeOutAnim}} source={photo}/>
          <Animated.Text style={{position: 'absolute', left:this.state.itemAnimationValues[entry.item.key].moveAnim, fontSize: 26, width:this.state.itemAnimationValues[entry.item.key].widthAnim, textAlign:this.state.itemAnimationValues[entry.item.key].textAlign, fontFamily: 'Amiko-Regular'}}>
          {entry.item.name}
          </Animated.Text>
        </Animated.View>
        </TouchableHighlight>
    //return <TouchableHighlight key={entry.item.key}><View style={{height: 125, width: 350, marginBottom: 15, flexDirection: 'row'}}><Image style={{width: 150, height: 125, borderRadius: 5}} source={photo}/><Text style={{fontSize: 26, width:200, textAlign:'right', fontFamily: 'Amiko-Regular'}}>{entry.item.name}</Text></View></TouchableHighlight>
  }

  _testRender2 = (entry) => {
    var photo = null
    if (entry.item.name === "GQ") {
      photo = require('./assets/photos/gq.jpg')
    }
    else if (entry.item.name === "Ask not the Sparrow How the Eagle Flies") {
      photo = require('./assets/photos/sparrow.jpg')
    }
    else {
        photo = require('./assets/photos/clark.jpg')
    }
    //CB: replacing amiko for smaller font sizes
    //CB: making the font not suck ass
    return <View key={entry.item.key} style={{height: 125, width: 350, marginBottom: 15, flexDirection: 'row'}}><Image style={{width: 150, height: 125, borderRadius: 5}} source={photo}/><Text style={{fontSize: 18, width:200, textAlign:'right', fontFamily:'Amiko-Regular'}}><Text style={{fontSize: 32}}>"</Text>{entry.item.quotes[0]['text']}<Text style={{fontSize: 32}}>"</Text></Text></View>
  }

  _testRender3 = (entry) => {
    var photo = null
    if (entry.item.author.first === "Daniel") {
      photo = require('./assets/photos/daniel.jpg')
    }
    else if (entry.item.author.first === "Eli") {
      photo = require('./assets/photos/eli.jpg')
    }
    else {
        photo = require('./assets/photos/patrick.jpg')
    }
    //CB: replacing amiko for smaller font sizes
    //CB: making the font not suck ass
    return <View key={entry.item.key} style={{height: 125, width: 350, marginBottom: 15, flexDirection: 'row'}}>
      <Text style={{fontSize: 18, width:200, textAlign:'right', fontFamily:'Amiko-Regular'}}><Text style={{fontSize: 32}}>"</Text>{entry.item.text}<Text style={{fontSize: 32}}>"</Text></Text>
        <View style={{flexDirection:'column', width:150, justifyContent:'flex-end', alignItems:'flex-end'}}>
        <Image style={{width: 100, height: 100, borderRadius: 50}} source={photo}/>
          <Text style={{fontSize:18, fontFamily: 'Amiko-Regular'}}>{"-" + entry.item.author.first}</Text>
        </View>
      </View>
  }
  _testRender4 = (entry) => {
    var photo = null
    var you = null
    var imageStyleExtra = null

    if (entry.item.author === "Alex") {
      photo = require('./assets/photos/alex.jpg')
      you = true
    }
    else {
      you = false
    if (entry.item.author === "Frankie") {
      photo = require('./assets/photos/frankie.jpg')
    }
    else if (entry.item.author === "Eli") {
      photo = require('./assets/photos/eli.jpg')
    }
    else if (entry.item.author === "Patrick") {
        photo = require('./assets/photos/patrick.jpg')
    }
    else  {
        photo = require('./assets/photos/nadiya.jpg')
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
//
  _handleTextChange = (inputValue) => {
      this.setState({ inputValue });
    }
  _submitMessage = () => {
      this.setState({inputValue:""});
    }

  screen1Render = () => {
    return (
      <View style={styles.container}>
        <View id="topBar" style={styles.topBar}>
          <Svg height="30" width="30">
            <Polyline points="3,30 9.8,13 0,5 9.8,13 15,0 20.2,13 30,5 20.2,13 27,30" fill="none" stroke="white" strokeWidth="2.5"/>
          </Svg>
          <Text style={{fontSize:30, color:'white', textAlign:'right', fontFamily: 'Amiko-Regular'}}>mico</Text>
        </View>
        <View id="list" style={styles.list}>
          <FlatList ref="screen1List" getItemLayout={(data, index) => {return {length: 140, offset: 140*index, index}}} style={{flex:1}} data={this.state.test} extraData={this.state.test} renderItem={this._testRender}/>
        </View>
      </View>
    );
  }

  screen4Render = () => {
    return (
  <View style={styles.container}>
        <TouchableHighlight onPress={()=>{this.setState({intro:true, fadeOutAnim: new Animated.Value(1),
    moveAnim: new Animated.Value(200),
    marginAnim: new Animated.Value(15),
    fadeInOpacity: new Animated.Value(0.5),
    moveAnim2: new Animated.Value(150),
    marginAnim2: new Animated.Value(15),
    fadeOutAnim2: new Animated.Value(1),
    widthAnim: new Animated.Value(200),
    textAlign: 'right'})}}>
        <View id="topBar" style={styles.topBar}>
                  <Svg height="30" width="30">
                    <Polyline points="3,30 9.8,13 0,5 9.8,13 15,0 20.2,13 30,5 20.2,13 27,30" fill="none" stroke="white" strokeWidth="2.5"/>
                  </Svg>

                  <Text style={{fontSize:30, color:'white', textAlign:'right', fontFamily: 'Amiko-Regular'}}>mico</Text>
        </View>
        </TouchableHighlight>
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
          <FlatList inverted={true} style={{flex:1}} data={this.state.test4} extraData={this.state.test4} renderItem={this._testRender4}/>
          <Text style={{fontSize:30, color:'black', textAlign: 'center', fontFamily: 'Amiko-Regular'}}>GQ</Text>
        </Animated.View>
        </View>
  </View>
  );
  }
  render() {
     return (
    this.state.intro ? this.screen1Render() : this.screen4Render()
    );
    /*
    return (
      <View style={styles.container}>
        <View id="topBar" style={styles.topBar}>
          <Svg height="30" width="30">
            <Polyline points="3,30 9.8,13 0,5 9.8,13 15,0 20.2,13 30,5 20.2,13 27,30" fill="none" stroke="white" strokeWidth="2.5"/>
          </Svg>
          <Text style={{fontSize:30, color:'white', textAlign:'right', fontFamily: 'Amiko-Regular'}}>mico</Text>
        </View>
        <View id="list" style={styles.list}>
          <FlatList style={{flex:1}} data={this.state.test} extraData={this.state.test} renderItem={this._testRender}/>
        </View>
      </View>
    );
*/
/*
return (
      <View style={styles.container}>
        <View id="topBar" style={styles.topBar}>
                  <Svg height="30" width="30">
                    <Polyline points="3,30 9.8,13 0,5 9.8,13 15,0 20.2,13 30,5 20.2,13 27,30" fill="none" stroke="white" strokeWidth="2.5"/>
                  </Svg>

                  <Text style={{fontSize:30, color:'white', textAlign:'right', fontFamily: 'Amiko-Regular'}}>mico</Text>
        </View>
        <View id="list" style={styles.list}>
          <FlatList style={{flex:1}} data={this.state.test2} extraData={this.state.test2} renderItem={this._testRender2}/>
        </View>
      </View>
    );
*/
/*
return (
  <View style={styles.container}>
        <View id="topBar" style={styles.topBar}>
                  <Svg height="30" width="30">
                    <Polyline points="3,30 9.8,13 0,5 9.8,13 15,0 20.2,13 30,5 20.2,13 27,30" fill="none" stroke="white" strokeWidth="2.5"/>
                  </Svg>

                  <Text style={{fontSize:30, color:'white', textAlign:'right', fontFamily: 'Amiko-Regular'}}>mico</Text>
        </View>
        <View id="list" style={styles.list}>
          <Text style={{fontSize:30, color:'black', textAlign: 'center', fontFamily: 'Amiko-Regular'}}>GQ</Text>
          <FlatList style={{flex:1}} data={this.state.test3} extraData={this.state.test3} renderItem={this._testRender3}/>
        </View>
  </View>
  );*/
  
  //CB if svg rounds pixels
  
  

  /*
  return(
    <View>
      <Camera/>
    </View>
    )*/
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
