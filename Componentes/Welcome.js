

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';

import Lottie from 'lottie-react-native';
   import movie_theatre from '../Lotti_JSON_files/34590-movie-theatre.json';

import {useNavigation} from '@react-navigation/native'; 

 import SplashScreen from 'react-native-splash-screen';
  SplashScreen.hide();

// create a component
 class ComponentWelcome extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      MyToken: null,
  };

    try{
      AsyncStorage.getItem('token').then((value) =>{ 
          this.setState({
            MyToken:  JSON.parse(value)
          })
        })
    } catch(err){
        console.log(err)
    }

  } // end constructor

   switchNaviation() {


    const { navigation } = this.props;
    // const { myToken } = this.state;

        console.log("Here un Token: " + this.state.MyToken);

        if(this.state.MyToken!=null){
          //  navigation.reset({ routes: [{name: 'Home'}] })
        } 
        else{
          // navigation.reset({ routes: [{name: 'LoginScreen'}] })
        }
   }

   componentDidMount(){
    setTimeout(() => {
        this.switchNaviation();
    }, 900)
   }

  render(){
    
    return (
    <View style={styles.container}>
      <Lottie
            resizeMode="contain"
            style={{width: 200, height: 200}}
            autoSize
            source={movie_theatre}
            autoPlay
            loop
      />
    </View>
  );
};

}


// define your styles
const styles = StyleSheet.create({
  container: {
    // marginTop: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
  },
});

// Wrap and export
function Welcome(props) {

  const navigation = useNavigation();

  return <ComponentWelcome {...props} navigation={navigation} />;
}

export default Welcome;



// import React, { useEffect,useState } from 'react';
// import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, AsyncStorage} from 'react-native';

// import Lottie from 'lottie-react-native';
//    import movie_theatre from '../Lotti_JSON_files/34590-movie-theatre.json';

// import {useNavigation} from '@react-navigation/native'; //! fundamental para una navegación full


//  import SplashScreen from 'react-native-splash-screen'
// // import { TouchableOpacity } from 'react-native-gesture-handler';
//   SplashScreen.hide();

// // create a component
// export default function Welcome() {
  

//   const navigation = useNavigation();

//   let [myToken, setMyToken] = useState("");
//   let [isVisible, setIsVisible] = useState(false);


//   const getToken = async () => { //! Get
//     try {
//       AsyncStorage.getItem('token').then((value) => {
//         setMyToken(JSON.parse(value));

//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {

//     getToken();

//       setTimeout(() => {
//         switchNaviation();
//         console.log("This is My Token: " + myToken);
//         }, 900);

//     return () => {
//     };
//   }, []);

  

//   const switchNaviation = () => {
//     if(myToken!=""){
//        navigation.reset({ routes: [{name: 'Home'}] })
//     } 
//     else{
//       navigation.reset({ routes: [{name: 'LoginScreen'}] })
//     }
  

//   }

//   return (
//     <View style={styles.container}>
//       <Lottie
//             resizeMode="contain"
//             style={{width: 300, height: 300}}
//             autoSize
//             source={movie_theatre}
//             autoPlay
//             loop
//       />
//       <View style={{flex: 1,}}>
//             <TouchableOpacity
//               // onPress={() => Alert.alert("","Hello!")}
//               onPress={() => navigation.reset({ routes: [{name: 'LoginScreen'}] })}
//               style={{width: 100, height: 100}}
//               >
//               <Text>
//                 {/* {myToken} */}
//               </Text>
//               </TouchableOpacity>
//           </View>
//     </View>
//   );
// };
// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     // marginTop: 100,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     alignContent: 'center',
//     alignItems: 'center',
//   },
// });


