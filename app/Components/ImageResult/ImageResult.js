import React, { Component } from "react";
import {
  AppRegistry,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Picker,
  StyleSheet,
  Dimensions
} from "react-native";
import { NavigationActions } from "react-navigation";

// import key from '../../../assets/key/key';
import languages from '../../../assets/languages/languages';
import Spinner from 'react-native-spinkit';

export default class ImageResult extends Component {
  constructor() {
    super()
    this.state = {
      picker: true,
      editable: false,
      loading: false,
      selectedLanguage: 'af',
      text: '',
      fromTyping:false
    }
  }

  static navigationOptions = {
    title: "Image Result",
    header: null
  };

  componentDidMount() {
    if (this.props.navigation.state.params.from === 'text') {
      this.setState({ text: "Type here..." })
      this.setState({ fromTyping: true })
    } else {
      this.setState({
        text: this.props.navigation.state.params.path
      })
    }
  }

  togglePicker() {
    this.setState({
      picker: !this.state.picker
    })
  }

  createNavKey() {
    if (!this.props.navigation.state.params.homeKey) {
     return { homeKey: this.props.navigation.state.key }
    }

    return { homeKey: this.props.navigation.state.params.homeKey }
  }

  cleanText(res) {
    this.setState({
      loading: false
    })

    this.props.navigation.navigate('LangResult', Object.assign({}, { translation: res.data.translations[0].translatedText },
      this.createNavKey(),
      { cameraKey: this.props.navigation.state.params.cameraKey }
    ))}

  makeEdit() {
    this.setState({
      editable: true
    })
  }

  translateText() {
    this.setState({
      loading: true
    })

    fetch(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyBLwBYTep8mm0D9F0bI3NYtd-belreAFGc`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: this.state.text,
        target: this.state.selectedLanguage
      })
    })
    .then(data => data.json())
    .then(res => this.cleanText(res))
    .catch(err => console.log(err))
  }


  render() {
    
    const { goBack } = this.props.navigation;
    const { text } = this.state;

    const mappedLanguages = languages.map(lang => <Picker.Item key={ lang.code }
                                                               label={ lang.language }
                                                               value={ lang.code }
                                                               style={ styles.pickerItem } />)

    return (
      <View style={ styles.container }>

        <ScrollView style={ styles.textContainer }
                     keyboardDismissMode={'on-drag'}>


            

            { this.state.fromTyping ?
                  
                  <View>
                    <Text style={styles.realHeadline}>Type the message to be converted: </Text>
                    <TextInput style={ styles.resTxt }
                     clearTextOnFocus={true}
                     onChangeText={ text => this.setState({ text }) }
                     multiline={ true }
                     onFocus={ () => this.makeEdit }
                     value={ this.state.text } />

                  </View>

                : 
                <ScrollView>

                  <Text style={styles.realHeadline}>The text in the image is: </Text>
                  <Text style={styles.realText} >{this.state.text}</Text> 
                </ScrollView>
            }
            



        </ScrollView>

        { this.state.picker || this.state.fromTyping ?
        <View style={ styles.pickerContainer }>

          <Picker selectedValue={ this.state.selectedLanguage }
                  onValueChange={ itemValue => this.setState({ selectedLanguage: itemValue })}
                  prompt='Choose a Language'
                  style={ styles.picker }
                  itemStyle={ styles.langStyle }>
            { mappedLanguages }
          </Picker>
          <TouchableOpacity style={ styles.translateBtn } onPress={ () => this.translateText() }>
            <Text style={ styles.translateTxt }>GO</Text>
          </TouchableOpacity>
        </View>
            : null
        }


          <Spinner style={ styles.loader }
                   isVisible={ this.state.loading }
                   size={ 100 }
                   type={ 'Wave' }
                   color={ '#3DD8CE' } />

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

  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },

  textContainer: {
    flexDirection: 'column'
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
  
  resTxt: {
    fontSize: 22,
    padding: 40,
    marginTop: 65,
    height: Dimensions.get("window").height - 95,    
    width: Dimensions.get("window").width
  },
  
  loader: {
    position: 'absolute',

  },

  pickerContainer: {
    position: 'absolute',
    bottom:0
  },
  
  picker: {
    backgroundColor: '#e9e9ef',
    shadowColor: '#000',
    width: Dimensions.get("window").width,
    opacity:0.9,
    height:180
  },

  translateBtn: {
    alignItems: 'center',
    marginTop: 0,
    borderWidth: 1,
    borderRadius:30,
    paddingLeft:60,
    paddingRight:60,
    margin:"auto",
     flexDirection: 'row',
    justifyContent:"center",
     backgroundColor: '#e9e9ef',
     marginBottom:50,
     opacity:0.9
  },

  translateTxt: {
    fontSize: 18,
    padding: 10,
    color:"green",
    opacity:0.9
  },

  bottomBar: {
    alignSelf: 'flex-end',
    backgroundColor: "#000",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '100%'    
  },

  Btn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 18,
    marginTop: 8,
    marginBottom:8
  },

  btnTxt: {
    color: 'white',
  },

  submitBtn: {
    marginRight: 15
  },

  icon: {
    height: 25,
    width: 25
  }
});

AppRegistry.registerComponent("ImageResult", () => ImageResult);