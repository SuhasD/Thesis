import React, { Component } from "react";
import {
  AppRegistry,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { NavigationActions } from "react-navigation";

import Camera from "react-native-camera";
//import Key from '../../../assets/key/key';
import RNFS from 'react-native-fs';
import Spinner from 'react-native-spinkit';
import RNFetchBlob from 'react-native-fetch-blob';

export default class TakePhoto extends Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }

  static navigationOptions = {
    title: "Verify",
    header: null
  };

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  cleanData(data) {

    this.setState({
      loading: false
    })

    //alert(data._bodyText.responses[0].fullTextAnnotation.text);
    const cleanedData = JSON.parse(data._bodyText).responses[0].fullTextAnnotation.text;
    //Regex to remove all line breaks and extra white spaces
    const cleanedDatas = cleanedData.replace(/(\r\n\t|\n|\r\t)/gm," ");
    //alert(cleanedDatas); 
    this.props.navigation.navigate('ImageResult', {
      path: cleanedDatas,
      homeKey: this.props.navigation.state.params.homeKey,
      cameraKey: this.props.navigation.state.key
    })
  }

  usePhoto(imgPath) {

    this.setState({
      loading: true
    })

    fetch(`https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBLwBYTep8mm0D9F0bI3NYtd-belreAFGc`, {
      method: 'POST', 
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ 
              "requests": [ 
                { 
              "image": {
                "content": imgPath
              }, 
              "features": [
              { 
                "type": "DOCUMENT_TEXT_DETECTION"
              }
            ]
          }
        ]
      })
    })
    .then(data => this.cleanData(data))
    .catch(err => console.log('error ', err))

  }

  convertImg() {

    const imgPath = this.props.navigation.state.params.path

    RNFetchBlob.fs.readFile(imgPath, 'base64')
      .then((data) => {
     // alert('data')
      this.usePhoto(data)
      })
      .catch((error) => {
      alert('error')
      })

    // RNFS.readFile(imgPath, 'base64')
    //   .then((imgString) => {
    //     alert(imgString);
    //     this.usePhoto(imgString)
    //   })
    //   .catch(err => alert(err))
  }

  render() {
    
    console.log('key in verify', this.props.navigation.state.params.homeKey)

    const { state, goBack } = this.props.navigation;

    return (
      <View>
        <ImageBackground
          style={ styles.img }
          source={{
            uri: state.params.path
          }}>

          <View style={ styles.topBar } />

          <Spinner isVisible={ this.state.loading }
                   size={ 100 }
                   type={ 'Wave' }
                   color={ '#3DD8CE' } />

          <View style={ styles.bottomBar }> 

            <TouchableOpacity style={ [styles.goBackBtn, styles.Btn] } onPress={ () => goBack() }>
              <Image source={require("../../../assets/left-arrow.png")}
                  style={ styles.icon } />
              <Text style={ styles.btnTxt }>Go Back</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ [styles.submitBtn, styles.Btn] } onPress={ this.convertImg.bind(this) }>
              <Image source={require("../../../assets/send.png")}
                    style={ styles.icon } />
              <Text style={ styles.btnTxt }>Use Photo</Text>
            </TouchableOpacity>
            
          </View>

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },

  img: {
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: "space-between",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },

  topBar: {
    backgroundColor: "rgba(0,0,0,1)",
    height: 20,
    width: "100%"
  },

  bottomBar: {
    backgroundColor: "rgba(0,0,0,0.7)",
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    width: '100%'    
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
    marginRight: 15
  },

  icon: {
    height: 25,
    width: 25
  }
});

AppRegistry.registerComponent("TakePhoto", () => TakePhoto);