//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const ErrorDeConexion = () => {

    return (

        <View>
        
            <Text style={[styles.text, {fontWeight:"bold", fontSize: 20}]}>
                There are no connection
            </Text>
            <Text style={styles.text}>
               you can try this:
            </Text>

            <Text style={styles.text}>
               ○ Check the modem and router
            </Text> 
            <Text style={styles.text}>
               ○ Reconnect to Wi-Fi
            </Text>

        </View>

    );
};

// define your styles
const styles = StyleSheet.create({

    text: {
        textAlign: 'center',
        fontSize: 18,
        paddingLeft:5,
        paddingRight: 5,
        paddingBottom: 5,
        color: 'gray',
      },
      image:{
          alignSelf: "center",
          width: 100,
          height: 100,
      },
});

//make this component available to the app
export default ErrorDeConexion;


