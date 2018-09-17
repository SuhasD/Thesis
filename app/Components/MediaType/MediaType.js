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
  ListView,
  DeviceEventEmitter
} from "react-native";
 import Cameras from "../Camera/Camera"; 
import Camera from "react-native-camera";
import Beacons from 'react-native-beacons-manager';
import BluetoothState from 'react-native-bluetooth-state'; 
import * as firebase from 'firebase';
import 'firebase/firestore';


import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
const { width } = Dimensions.get('window');


export default class MediaType extends Component { 

  constructor(props) {
    super(props);
    // Create our dataSource which will be displayed in the ListView
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2 }
    );
    this.state = {
      bluetoothState: '',
      // region information
      identifier: 'GemTot for iOS',
      uuid: 'E6FA79C7-804F-4742-863B-BD4D282ED9BA',
      // React Native ListView datasource initialization
      dataSource: ds.cloneWithRows([]),
      dbData:[]
    };
  }

  static navigationOptions = {
    title: "Home",
    header: null,
    gesturesEnabled: false   
  };

  componentWillMount(){ 

    var config = {
    apiKey: "AIzaSyDwmMoNmqzoxklCVW1V3FYZCDa1hJfvpYQ",
    authDomain: "thesis-7c0c5.firebaseapp.com",
    databaseURL: "https://thesis-7c0c5.firebaseio.com",
    projectId: "thesis-7c0c5",
    storageBucket: "thesis-7c0c5.appspot.com",
    messagingSenderId: "24760403967"
  };
  firebase.initializeApp(config);



    //
    // ONLY non component state aware here in componentWillMount
    //
    // Request for authorization while the app is open
    Beacons.requestWhenInUseAuthorization();
    // Define a region which can be identifier + uuid,
    // identifier + uuid + major or identifier + uuid + major + minor
    // (minor and major properties are numbers)
    const region = {
      identifier: 'GemTot for iOS',
      uuid: 'E6FA79C7-804F-4742-863B-BD4D282ED9BA' // => IMPORTANT: replace here with your beacon "uuid"
    };
    // Range for beacons inside the region
    Beacons.startRangingBeaconsInRegion(region);
  } 

  componentDidMount() {

  var self = this;
        // Get a reference to the database service
  var db = firebase.firestore();
  // Disable deprecated features
  db.settings({
    timestampsInSnapshots: true 
  });

  var temp = []; 




    //
    // component state aware here - attach events
    //
    // Ranging: Listen for beacon changes
    this.beaconsDidRange = DeviceEventEmitter.addListener( 
      'beaconsDidRange',
      (data) => {

      // setTimeout(function(){ 

       // console.log(data.beacons.length);

        var docRef = db.collection("park").doc("1111").collection('beacons').doc('9991'); 
        var beaconRef = db.collection("park").doc("1111").collection('beacons');
        var numToString = '';
        this.setState({
              dbData: []  
            });
        

        docRef.get().then(function(doc) {
            if (doc.exists) {
               // console.log("Document data:", doc.data());  
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });




        for(var i=0; i<data.beacons.length; i++){

          numToString = data.beacons[i].minor.toString();
         // console.log("data.beacons[i]",data.beacons[i]); 
          beaconRef.doc(numToString).get().then(function(doc) {
            if (doc.exists) {
                //console.log("Document name:", doc.data().name);
                var name =  doc.data();
               // dbData.push(name);
               temp.push(name);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
             


            this.setState({
              dbData: temp
            }); 
            console.log("dbData ",this.state.dbData); 
        }


        temp =[]; 
        

        

        


       // console.log(data.beacons[1]);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.beacons)
        });


      }



    );

        // listen bluetooth state change event
    BluetoothState.subscribe(
      bluetoothState => {
        this.setState({ bluetoothState: bluetoothState });
      }
    );
    BluetoothState.initialize();
    
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
    const { bluetoothState, dataSource } =  this.state;

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
            
      {this.state.dbData.map((number, index) =>
            <View style={styles.view2} key={index+number.name}>
                <TouchableOpacity
                  style={ styles.button }
                  onPress={ () => navigate("Beacon", { 
                    from: "text",
                    bData: number,
                  })
                  }
                  activeOpacity={ 0.5 }
                   key={index+number.name}>
                  
                    <Image 
                    key ={index+number.english} 
                 source={{ uri:number.img }} 
                style={styles.cardImg}
              />
                    <Text style={styles.cardTxt} key={index+number.name}>{number.name}</Text>
                        
                </TouchableOpacity>
            </View>

      )}
    </ScrollView>

        </View>
      </View>
    );
  }

   renderRow = rowData => {
    return (
      <View style={styles.row}>
        <Text style={styles.smallText}>
          UUID: {rowData.uuid ? rowData.uuid  : 'NA'} 
        </Text>
        <Text style={styles.smallText}>
          Major: {rowData.major ? rowData.major : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Minor: {rowData.minor ? rowData.minor : 'NA'}
        </Text>
        <Text>
          RSSI: {rowData.rssi ? rowData.rssi : 'NA'}
        </Text>
        <Text>
          Proximity: {rowData.proximity ? rowData.proximity : 'NA'}
        </Text>
        <Text>
          Distance: {rowData.accuracy ? rowData.accuracy.toFixed(2) : 'NA'}m
        </Text>
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
