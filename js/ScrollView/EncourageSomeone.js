/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Swipeout from 'react-native-swipeout'
import {Button, Icon, Text} from 'react-native-elements'



  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  });



  const ACCESS_TOKEN = 'access_token';

    const messages = [
  "Hello1",
  "Hello2",
  "Hello3",
  "Hello4",
  "Hello5"
  ];

export default class EncourageSomeone extends Component {
  constructor(props) {
    super(props);
    //definition of listview datasource
    this.state = {
      //this code use for simple list view
      //dataSource: ds.cloneWithRows(data_array),
      //this code use for listview with sectionHeader
      //dataSource: ds.cloneWithRowsAndSections(data_array),
      //filter_string:'',
      happiness:0,
      text:""
    };
  }
  componentWillMount() {
    this.getToken();
  }
  getToken = async () => 
    {
        try 
        {
            let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
            if(!accessToken) 
            {
                console.log("Token not set");
            } 
            else 
            {
                //this.verifyToken(accessToken)
                console.log("getting token from storage");
                console.log(accessToken);
                return(accessToken);
            }
        } 
        catch(error) 
        {
            console.log("Something went wrong");
        }
    } 
  
  pressOne = () => {
    this.setState({happiness:1});
  }

  pressTwo = () => {
    this.setState({happiness:2});
  }

  pressThree = () => {
    this.setState({happiness:3});
  }

  pressFour = () => {
    this.setState({happiness:4});
  }

  pressFive = () => {
    this.setState({happiness:5});
  }



  submit = () => {
    let PushNotification = require('react-native-push-notification');
    
    PushNotification.configure({
    
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token) {
            console.log( 'TOKEN:', token );
        },
    
        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
            console.log( 'NOTIFICATION:', notification );
        },
    
        // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
        senderID: "YOUR GCM SENDER ID",
    
        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },
    
        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,
    
        /**
          * (optional) default: true
          * - Specified if permissions (ios) and token (android and ios) will requested or not,
          * - if not, you must call PushNotificationsHandler.requestPermissions() later
          */
        requestPermissions: true,
    });

    PushNotification.localNotification({
      /* Android Only Properties */
      id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      ticker: "My Notification Ticker", // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText: "This is a subText", // (optional) default: none
      color: "red", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: "group", // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification
  
      /* iOS only properties */
      //alertAction: // (optional) default: view
      //category: // (optional) default: null
      //userInfo: // (optional) default: null (object containing additional notification data)
  
      /* iOS and Android properties */
      title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
      message: "My Notification Message", // (required)
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      //number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
      actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
  });
  }

  getRandomInt() {
    return Math.floor(Math.random() * (4 - 0 + 1));
  }

  deleteRow(rowId)
  {
    let index = data_array.indexOf(rowId);
    if(index>-1)
    {
      data_array.splice(index, 1);
    }
    this.setState({dataSource:ds.cloneWithRows(data_array)});
  }
  _handleSwipeout(sectionID, rowID) {
  for (var i = 0; i < data_array.length; i++) 
  {
    if (i != rowID) data_array[i].active = false
    else data_array[i].active = true
  }
  this._updateDataSource(data_array)
  }
  _updateDataSource(data) 
  {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
  })
  }
  _renderRow(rowData,sectionId,rowId)
  {
      let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => { this.deleteRow(rowData) }
    }];
    return(
      <Swipeout right={swipeBtns}
                autoClose='true'
                backgroundColor= 'transparent'>
              <TouchableHighlight 
              onPress={() => {
                if(data_array[rowId] == "Me")
                {
                  //render map of self location
                  this.props.navigator.push({index: 1});
                }
                  /* this is sample to show alert when you click on item
                  Alert.alert(
                    'Enter title here..',
                    'You click on '+rowData,
                  );
                  */
              }}>
                <View style={styles.row}>
                  <Text style={styles.row_style}>{rowData}</Text>
                </View>
              </TouchableHighlight>
            </Swipeout>
    );

  }

  render() {

    return (
      <View style={styles.Container}>
      <View style={styles.ContainerHeader}>
        <Icon
        size={32}
        name='chat'
        color='#00b764'
        containerStyle={{position: "absolute", left:5}}
      />
      <Text style={styles.header} h3>This person needs your help</Text>
      </View>
       <View style={styles.Container2}>
        <Text style={styles.sadMessage}>{messages[this.getRandomInt()]}</Text>
         </View>
        <View style={styles.Container3}>

          <TextInput
          underlineColorAndroid='transparent'
          style={{color: '#9d9d9d', marginTop: 5, fontSize: 18, backgroundColor: "#e6e7ea", height:80}}
          onChangeText={(text) => this.setState({text})}
          multiline={true}
          placeholder="Enter your message here"
          placeholderTextColor="#9d9d9d"
          value={this.state.text}/>
        </View>
        <View style={styles.Container4}>
          <TouchableOpacity style={styles.buttonSignup}
            onPress={this.submit.bind(this)}>
                   <Button
                    borderRadius={5}
                    large={true}
                    fontWeight="bold"
                    fontSize={20}
                    backgroundColor="#377df6"
                    title="Submit"
                    />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    color: "black",
    marginTop: -7,
    marginLeft: 40
  },
  sadMessage: {
    margin: 10,
    fontSize: 20,
    color: "#000000"
  },
  Container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column'
  },
  ContainerHeader: {
    flex: 0.1,
    marginTop: 5
  },
  Container2: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column'
  },
  Container3: {
    flex: 0.25,

    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  Container4: {
    marginTop: 10,
    flex: 0.3,
    backgroundColor: '#FFFFFF',
  },
  buttonBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow:1,
    justifyContent: 'center'
  },
  sectionHeader: {
    backgroundColor: '#48D1CC'
  },
  sectionHeaderText: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16,
    color: 'white',
    paddingLeft: 10
  },
  listview_header: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  listview_style: {
    padding: 10,
    paddingTop: 20,
    backgroundColor: '#34495e',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#34495e',
  },
  row_style: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
    margin: 10,
    color: '#fff'
  },
  separator_style: {
   flex: 1,
   height: StyleSheet.hairlineWidth,
   backgroundColor: '#fff',
  },
  input: {
    height: 40,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  loginText: {
    color: '#fff',
    fontWeight: '700',
    paddingHorizontal: 30,
    justifyContent: 'flex-start'
},
signupText: {
    color: '#fff',
    fontWeight: '700',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
},
});