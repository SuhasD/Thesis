import React from "react";
import { AppRegistry,
         StyleSheet,
         View,
         ScrollView,
         Text,
         TextInput,
         Image,
         TouchableOpacity,
         Dimensions } from "react-native";
import { NavigationActions } from 'react-navigation';
import Share from 'react-native-share'

const LangResult = (props) => { 

  const { goBack, dispatch } = props.navigation;
  
  const { cameraKey, homeKey } = props.navigation.state.params;

  const backToCamera = NavigationActions.back({
    key: cameraKey
  })

  const backToHome = NavigationActions.back({
    key: homeKey
  })

  const shareOptions = {
    title: "Translated Doc",
    message: props.navigation.state.params.translation,
    subject: "Sharing Translated Document"
  };

  return (
    <View style={ styles.container }>

        <ScrollView  style={ styles.textContainer }>
           <Text style={styles.realHeadline}>The translated text is: </Text>
           <Text style={styles.resTxt}>{ props.navigation.state.params.translation }</Text>
        </ScrollView>


      <View style={ styles.bottomBar }> 

        <TouchableOpacity style={ [styles.goBackBtn, styles.Btn] } onPress={ () => goBack() }>
          <Image source={ require("../../../assets/left-arrow.png") }
                 style={ styles.icon } />
          <Text style={ styles.btnTxt }>Go Back</Text>
        </TouchableOpacity>

        {
          cameraKey ? <TouchableOpacity style={ [styles.cameraBtn, styles.Btn] } onPress={ () => dispatch(backToCamera) }>
          <Image source={ require("../../../assets/small-camera.png") }
                 style={ styles.smallIcon } />
          <Text style={ styles.btnTxt }>Camera</Text>
          </TouchableOpacity>
          : null
        }

        <TouchableOpacity style={ [styles.cameraBtn, styles.Btn] } onPress={ () => Share.open(shareOptions).catch(err => console.log(err)) }>
          <Image source={ require("../../../assets/message.png") }
                 style={ styles.smallIcon } />
          <Text style={ styles.btnTxt }>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ [styles.homeBtn, styles.Btn] } onPress={ () => dispatch(backToHome) }>
        <Image source={ require("../../../assets/home2.png") }
                style={ styles.smallIcon } />          
        <Text style={ styles.btnTxt }>Home</Text>
        </TouchableOpacity>
         

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height:500,
    width: Dimensions.get("window").width,
  },

 container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },

textContainer:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 500,
    width: Dimensions.get("window").width
},

  textContainer: {
    flexDirection: 'column'
  },
 
  resTxt: {
    fontSize: 22,
    width: Dimensions.get("window").width,
    padding: 25,
    marginTop: 15
  },

  bottomBar: {
    alignSelf: 'flex-end',
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    width: '100%'    
  },

  btnTxt: {
    color: '#fff'
  },


  realText: {
      fontSize: 24,
      padding:24
  },

  realHeadline:{
      fontSize:24,
      fontWeight:"bold",
      padding:24,
      paddingBottom:0,
      marginTop:30
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

  cameraBtn: {
    height: 50,
    marginTop: 15,
    marginRight: 15
  },

  homeBtn: {
    height: 50,
    marginTop: 15,
    marginRight: 15
  },

  icon: {
    height: 25,
    width: 25
  },

  smallIcon: {
    height: 30,
    width: 30
  },
});

AppRegistry.registerComponent("LangResult", () => LangResult);

export default LangResult;