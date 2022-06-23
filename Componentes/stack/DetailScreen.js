
import React, { useEffect } from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';


import {useNavigation} from '@react-navigation/native';

export default function DetailScreen({route}) {

  //* que vienen de la pantalla anterior
  const {id} = route.params;
  const {backdrop_path} = route.params;
  const {title} = route.params;
  const {overview} = route.params;
  const {release_date} = route.params;
  const {vote_average} = route.params;

  let pat_image = "https://image.tmdb.org/t/p/w200";

  useEffect(() => {
    fetchData();
  }, []);

  const navigation = useNavigation(); 

  const fetchData = async () => {
    return fetch('http://api.themoviedb.org/3/movie/361743?api_key=852f0cc2950393b0017a359bafdec870')
      .then(response => response.json())
      .then(json => {
        // return json.movies;

        // let MyJson = Array.from(json);
        let MyJson = Object.values(json)
        // setData(MyJson);
        // console.error(MyJson);
        console.log(MyJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>

          <SafeAreaView>
          <ScrollView>
              <Image style={styles.image} source={{uri: pat_image+backdrop_path}} />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>
                  {title}
                </Text>
                <View style={{flexDirection: 'row',}}>
                  <Text style={styles.price1}>Release date: {release_date}</Text>
                  <Text style={styles.price2}>Popularity: {vote_average}</Text>
                </View>
                
                <Text style={styles.description0}>Overview:</Text>
                <Text style={styles.description}>{overview}</Text>
              </View>
            </ScrollView>
          </SafeAreaView>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: '100%',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price1: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 10,
    marginRight: 10,
    color:"#787845"
  },
  price2: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 10,
    marginHorizontal: 5,
    color:"tomato",
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
    lineHeight: 25,

  },
  description0: {
    fontSize: 20,
    fontWeight: '400',
    color: '#527878',
    marginBottom: 5,
  },
  viewCantidad: {
     flexDirection: 'row',
     marginVertical: 10,
     marginBottom: 20,
  },
  txtCantidad: {
    fontSize: 20,
    // fontWeight: 'bold',
    marginHorizontal: 5
  }
});
