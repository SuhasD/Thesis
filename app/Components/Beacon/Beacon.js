// This is the Home page


import React, { Component } from "react";
import { NavigationActions } from 'react-navigation'
import {
  AppRegistry,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text, 
  View,
  Button
} from "react-native";

import Cameras from "../Camera/Camera";
import Camera from "react-native-camera";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
const { width } = Dimensions.get('window');

export default class MediaType extends Component { 
  static navigationOptions = {
    title: "Beacon",
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
      ),
    gesturesEnabled: false
  };

  componentDidMount() {  
 
  }

  
  render() {
    const { Aspect, CaptureTarget, Orientation } = Camera.constants;
    const { navigate, dispatch, state } = this.props.navigation;
    const { goBack } = this.props.navigation;


    return (
      <View>
       <ScrollView>

       <View style={styles.beaconBg}>
           <Image source={{uri: 'https://arlingtonva.s3.amazonaws.com/wp-content/uploads/sites/17/2014/05/Andrew-Ellicott.jpg'}}
            style={{width: 400, height: 350}} />  
        </View>  

         <View style={styles.nameBar}>
            <Text style={styles.nameTxt}>Park Rules </Text>  
            <Text style={styles.metresAway}> 20 metres away </Text>
         </View>   

          <View style={styles.desc}>
              <Text style={styles.descTxt}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text> 
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  beaconBg: {

  },

  metresAway :{
    fontSize:14,
    fontWeight: 'bold',
    marginRight:15,
    marginTop:12,
    color:"#e8d8d8"
  },

  descTxt: {
    color:'black',
    fontSize:18,
    padding:15,
    letterSpacing:0.1
  },

  nearTxt: {
    marginTop: 15,
    marginLeft:15,
    alignItems:"center",
    justifyContent:"center"
  },

  view: {
    marginTop: 10,
    backgroundColor: '#d8d8d8',
    width: width - 130,
    margin: 10,
    height: 130,
    borderRadius: 10,
    paddingHorizontal : 10
  },
  view2: {
    marginTop: 10,
    backgroundColor: '#bdbdbd',
    width: width - 130,
    margin: 10,
    height: 130,
    borderRadius: 10,
    paddingHorizontal : 10
  },


  background: {
    alignItems: "center",
    height: 470,
    width: Dimensions.get("window").width
  },

  beacon: {
  },

  beaconList: {
    backgroundColor: 'blue',
    flex: 1, 
    flexDirection: "row",
    alignContent:"flex-end",
  }, 

  options:{
    flex: 1, 
    flexDirection: "row",
    alignContent:"flex-end",
    margin:20,
    marginTop:250
  },

  HeroCam: {
    height: 290,
    width: 300,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },

  button: {

  },

  img: {
    height: 60,
    width: 60
  },

  camRollImg: {
    height: 35,
    width: 35,
    marginLeft:30,
    marginTop:15
  },

  camTxtImg: {
    height: 35,
    width: 35,
    marginLeft:25,
    marginTop:10
  },


  rollTxt: {
    color:'white',
    marginLeft:15,
    marginTop:10
  },

  inpTxt: {
    color:'white',
    marginRight:15,
    marginTop:10
  },

  bar: {
    height: 1,
    width: "80%"
  },

  picText: {
    height: 28,
    width: 127
  },

  docText: {
    height: 35,
    width: 145
  },

  msgText: {
    height: 35,
    width: 91
  },

  cam: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },

  bottomBar: {
    alignSelf: 'flex-end',
    backgroundColor: "rgba(0,0,0,0.7)",
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    width: '100%'    
  },

  nameBar:{
    alignSelf: 'flex-end',
    backgroundColor: "rgba(0.5,0.5,0.5,0.6)",
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    width: '100%'
  },

  nameTxt:{
    color:'white',
    fontSize:20,
    paddingLeft:15,
    paddingTop:5
  },

  camBtn: {
    height: 50,
    width: 50,
    borderRadius: 65,
    borderWidth: 4.3,
    borderColor: "green",
    marginLeft:83,
    marginTop: 15
  },

  Btn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60,
    marginTop: 10
  },

  goBackBtn: {
    marginLeft: 15
  },

  btnTxt: {
    color: 'white'
  },

  submitBtn: {
    marginRight: 15,
    width: 55
  },

  icon: {
    height: 30,
    width: 30
  }
});

AppRegistry.registerComponent("MediaType", () => MediaType);
