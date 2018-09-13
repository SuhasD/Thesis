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
    title: "Home",
    header: null,
    gesturesEnabled: false   
  };

  componentDidMount() {
    setTimeout(() => {this.scrollView.scrollTo({x: -30}) }, 1) // scroll view position fix
  }

    takePicture() {  
    this.camera
      .capture()
      .then(data => { 
        this.props.navigation.navigate('Verify', Object.assign({}, { homeKey: this.props.navigation.state.key }, data))
      })
      .catch(err => console.error(err)); 
    }
  
  render() {
     const { Aspect, CaptureTarget, Orientation } = Camera.constants;
    const { navigate, dispatch, state } = this.props.navigation;

    return (
      <View>
      <ImageBackground
        source={ require("../../../assets/blue-background.png") }
        style={ styles.background}>

        <TouchableOpacity
          style={ styles.HeroCam }
          activeOpacity={ 0.5 }>

           <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={ styles.cam }
          aspect={ Aspect.fill }
          captureTarget={ CaptureTarget.disk }
          Orientation={ Orientation.auto }
          onFocusChanged={ (e) => {} }
          onZoomChanged={ (e) => {} }>
          <View style={ styles.bottomBar }> 

        <TouchableOpacity
          style={ styles.button }
          onPress={ () => navigate("Upload") } 
          activeOpacity={ 0.5 }>
          <Image
            source={ require("../../../assets/upload.png") }
            style={ [styles.doc, styles.camRollImg] }/>
        </TouchableOpacity> 

            <TouchableOpacity onPress={ this.takePicture.bind(this) }>
              <View style={ styles.camBtn } />
            </TouchableOpacity>

            <TouchableOpacity style={ [styles.submitBtn, styles.Btn] } />


            <TouchableOpacity
              style={ styles.button }
              onPress={ () => navigate("ImageResult", { from: "text" }) }
              activeOpacity={ 0.5 }>
              <Image
                source={ require("../../../assets/message-2.png") }
                style={styles.camTxtImg }/>
            </TouchableOpacity>
          </View>
        </Camera>

       
        </TouchableOpacity>
         </ImageBackground>  

       <View style={styles.beaconBg}>
       <Text style={styles.nearTxt}>Signs around you</Text>
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
                  onPress={ () => navigate("Beacon", { from: "text" }) }
                  activeOpacity={ 0.5 }>
                  
                    <Image 
                 source={{ uri:'https://arlingtonva.s3.amazonaws.com/wp-content/uploads/sites/17/2014/05/Andrew-Ellicott.jpg' }} 
                style={styles.cardImg}
              />
                    <Text style={styles.cardTxt}>Harbor NP (5 meters)</Text>
                        
                </TouchableOpacity>
            </View>

           <View  style={styles.view}>
              <Image 
                 source={{ uri:'https://res.cloudinary.com/nrpadev/image/upload/c_fill,f_auto,q_70/New-Signage-and-Maps-Make-Trails-and-Parks-More-Accessible-410.jpg' }}
                style={styles.cardImg}
              />
              <Text style={styles.cardTxt}>Trailhead (35 meters)</Text>
            </View>


            <View style={styles.view2}>  
               <TouchableOpacity
                  style={ styles.button }
                  onPress={ () => navigate("Beacon", { from: "text" }) }
                  activeOpacity={ 0.5 }>
                  
                    <Image 
                 source={{ uri:'https://greenwichfreepress.com/wp-content/uploads/2017/06/Screen-Shot-2017-06-29-at-2.43.36-PM.png' }}
                style={styles.cardImg}
                 />
                    <Text style={styles.cardTxt}>Restrooms (50 meters)</Text>
                        
                </TouchableOpacity> 

            </View>

          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({ 


cardImg:{
   paddingBottom:0,
   margin:0,
   height:115
 },

  beaconBg: {
    backgroundColor: '#000', 
    marginTop:5,
    paddingBottom:15
  },

  nearTxt: {
    marginTop: 15,
    marginLeft:15,
    alignItems:"center",
    justifyContent:"center",
    color:"#fff"
  },

  view: {
    marginTop: 10,
    backgroundColor: '#d8d8d8',
    width: width - 170,
    margin: 10,
    height: 140,
    borderRadius: 8,
    overflow:"hidden",
    paddingBottom:0
  },
  view2: {
    marginTop: 10,
    backgroundColor: '#bdbdbd',
    width: width - 170,
    margin: 10,
    height: 140,
    borderRadius: 8,
    overflow:"hidden",
     paddingBottom:0
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
    height: 28,
    width: 28,
    marginLeft:30,
    marginTop:15
  },

  camTxtImg: {
    height: 28,
    width: 28,
    marginTop:15,
    marginRight:15
  },


  rollTxt: {
    color:'white',
    marginLeft:15,
    marginTop:10
  },

  inpTxt: {
    color:'white',
    marginLeft:-25,
    marginTop:15
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
    width: 145,
    marginRight:40
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
    backgroundColor: "rgba(0,0,0,0.6)",
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    width: '100%'     
  },

  cardTxt:{
   alignSelf: 'flex-end',
    backgroundColor: "rgba(0,0,0,0.6)",
    flexDirection: 'row',
    justifyContent: 'space-between', 
    height: 25,
    width: '100%',
    fontSize:18,
    padding:3,
    color:'white'
  },

  camBtn: {
    height: 20,
    width: 20,
    borderRadius: 65,
    borderWidth: 20.3, 
    borderColor: "#26A69A",    
    marginLeft:90, 
    marginTop: 10
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
