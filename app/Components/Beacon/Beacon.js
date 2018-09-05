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
  View
} from "react-native";
 import Cameras from "../Camera/Camera";
import Camera from "react-native-camera";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
const { width } = Dimensions.get('window');

export default class MediaType extends Component { 
  static navigationOptions = {
    title: "Beacon",
    header: null,
    gesturesEnabled: false
  };

  componentDidMount() {
    setTimeout(() => {this.scrollView.scrollTo({x: -30}) }, 1) // scroll view position fix
  }

  
  render() {
    const { Aspect, CaptureTarget, Orientation } = Camera.constants;
    const { navigate, dispatch, state } = this.props.navigation;
    const { goBack } = this.props.navigation;

    return (
      <View>


       <View style={styles.beaconBg}>
       <Text style={styles.nearTxt}>Nearby Beacons </Text>
        <ScrollView 
            ref={(scrollView) => { this.scrollView = scrollView; }}
            style={styles.container}
            //pagingEnabled={true}
            horizontal= {true}
            decelerationRate={0}
            snapToInterval={width - 60}
            snapToAlignment={"center"}
            contentInset={{
              top: 0,
              left: 30,
              bottom: 0,
              right: 30,
            }}>
            <View style={styles.view2}>
                <TouchableOpacity
                  style={ styles.button }
                  onPress={ () => navigate("ImageResult", { from: "text" }) }
                  activeOpacity={ 0.5 }>
                  <Image
                    source={ require("../../../assets/message-2.png") }
                    style={ [styles.doc, styles.camTxtImg] }/>
                  <Text style={styles.inpTxt}>Translate Text</Text> 
                </TouchableOpacity>
            </View>
            <View style={styles.view} />
            <View style={styles.view2} />
            <View style={styles.view} />
          </ScrollView>
        </View>


        <TouchableOpacity  style={styles.bottomBar}  onPress={ () => goBack() }> 



          <View style={ [styles.goBackBtn, styles.Btn] }>
            <Image source={require("../../../assets/left-arrow.png")}
                  style={ styles.icon } />
          </View>

        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  beaconBg: {
    backgroundColor: '#000',
    marginTop:5
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
    height: 140,
    borderRadius: 10,
    paddingHorizontal : 10
  },
  view2: {
    marginTop: 10,
    backgroundColor: '#bdbdbd',
    width: width - 130,
    margin: 10,
    height: 140,
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
