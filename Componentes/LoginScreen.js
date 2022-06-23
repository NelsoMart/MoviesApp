

// //import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  ToastAndroid,
  AsyncStorage
} from 'react-native';

import {useNavigation} from '@react-navigation/native';


// create a component
class Login extends Component {

  constructor(props) {
    //todo: Constructor
    super(props);
  this.state = {
    email: "",
    password: "",
    errorMessage: null,
    data:[],
    test: "",
  };

    try{
      AsyncStorage.getItem('token').then((value) =>{ 
          this.setState({
            test:  JSON.parse(value)
          })
        })
    } catch(err){
        console.log(err)
    }

  }
  componentDidMount(){
    setTimeout(()=>{
         console.log("My Token: " + this.state.test)
    }, 10)
  }

  savingToken = async (token, navigation) => {
    try {
       await AsyncStorage.setItem("token", JSON.stringify(token));

       navigation.reset({ routes: [{name: 'Home'}] })

    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  fetchData(){
    if (this.state.connection_Status == 'Offline'){

      Alert.alert(' ', 'Network request failed')
   
   } else {
        this.authenticate();
   }
  }

  authenticate(navigation){

    const { email, password } = this.state;

    if (email, password == ""){
      ToastAndroid.show( "You must to fill all fields", ToastAndroid.LONG)
    } 
    else
    {

    return fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // email: 'eve.holt@reqres.in',
        // password: 'cityslicka',
        email: email,
        password: password
      })
    })
    .then((response) => response.json())
      .then((json) => {  
        // return json.movies;

        let initialToken = JSON.stringify(json)
        let finalToken = initialToken.substring(100,10); // De una cadena de 150 caracteres, no me muestre los primer 10 caracteres.
        let token = finalToken.replace('"}','');

        // console.log(token)
        // console.log(initialToken)

        if(JSON.stringify(json) == '{"error":"user not found"}')
        {
          ToastAndroid.show( "Hey, user not found!", ToastAndroid.LONG)
        } 
        else if(JSON.stringify(json) == '{"token":"QpwL5tke4Pnpja7X4"}')
        {
          // console.log("bonjour !")
          this.savingToken(token, navigation);
          ToastAndroid.show( "user right!", ToastAndroid.LONG);
        } 
      })
      .catch((error) => {
        console.error(error);
        // this.setState({ errorMessage: error })
      });
    }
  }

  render() {
    const { email, password, errorMessage } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Image 
          source={require('../assets/bgcSingIn.jpg')}
          style={{marginTop: -700, marginLeft: -50}}
        />
        <Text style={styles.greeting}>Hello! Welcome back</Text>

        <View style={styles.errorMessage}>
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
         <Text></Text>
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTile}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({email})}
              value={email}
            />
          </View>
          <View style={{marginTop: 32}}>
            <Text style={styles.inputTile}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(password) => this.setState({password})}
              value={password}
            />
          </View>
        </View>

        <TouchableOpacity 
        style={styles.button}
        onPress={() => this.authenticate(navigation)}
        >
          <Text style={{color: '#FFF', fontWeight: '500'}}>Sing in</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

  // define your styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      // backgroundColor: '#2c3e50',
    },
    greeting: {
      marginTop: 32,
      fontSize: 18,
      fontWeight: '400',
      textAlign: 'center',
    },
    errorMessage: {
      height: 72,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 30,
    },
    error: {
      color: '#e94464',
      fontSize: 13,
      fontWeight: '600',
      textAlign: 'center',
    },
    form: {
      marginBottom: 48,
      marginHorizontal: 30,
    },
    inputTile: {
      color: '#8A8FE9',
      fontSize: 10,
      textTransform: 'uppercase',
    },
    input: {
      borderBottomColor: '#8A8FE9',
      borderBottomWidth: StyleSheet.hairlineWidth,
      height: 40,
      fontSize: 15,
      color: '#161f3D',
    },
    button: {
      marginHorizontal: 30,
      backgroundColor: '#e9446a',
      borderRadius: 4,
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


  // Wrap and export
  function LoginScreen(props) {
    const navigation = useNavigation();
    return <Login {...props} navigation={navigation} />;
  }

export default LoginScreen;