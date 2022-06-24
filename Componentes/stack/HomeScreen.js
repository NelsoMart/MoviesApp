
import React, { PureComponent } from 'react';

import {StyleSheet, Text, Image, SafeAreaView,View,FlatList,TouchableOpacity,
         RefreshControl, Alert, ImageBackground, TextInput} from 'react-native';

import ErrorDeConexion from '../ErrorDeConexion';

import Lottie from 'lottie-react-native';
  import cancelledOnCanlendar from '../../Lotti_JSON_files/cancelled-event-on-canlendar';
  import avionAnimation from '../../Lotti_JSON_files/avionAnimation';
  import forPointAnimation from '../../Lotti_JSON_files/forPointAnimation';
  import movie_theatre from '../../Lotti_JSON_files/34590-movie-theatre.json';    

import { useNavigation } from '@react-navigation/native'; 

import NetInfo from "@react-native-community/netinfo";

import { TouchableHighlight } from 'react-native-gesture-handler';

 

  // Subscribe
  const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });


  // Unsubscribe
  unsubscribe(); 

class MoviesList extends PureComponent {

  constructor() {
    super();
    this.state = {
      data: null,
      dataBackup: null,
      fakedata: [1,2,3,4],
      refreshing: true,
      isLoading: true,
      false: false,
      connection_Status: '',
      loadingDisable: false,
      ListEmpty: true, 
      DefaultSpinner: true,
      spinner: false,

      interruptor: false,
      badConection: true,

      textInputSearch: '',

      tmpNotify: null,
    }

  } //todo: end constructor



      finActivityIndicator = () => {

        setTimeout(() => {
          // Alert.alert('Oops!');
          // this.onRefresh();
          this.setState({ DefaultSpinner: false, });
        }, 1000);

      }

      activatorSpinner () {

        this.setState({
          spinner: true
        });

        setTimeout(() => {
        // Alert.alert('Oops!');
        this.setState({ spinner: false })
      }, 15000);

      }

    


      fetchData(){
        // return fetch("https://reactnative.dev/movies.json")
        // return fetch("https://api.themoviedb.org/3/movie/300?api_key=852f0cc2950393b0017a359bafdec870")
        // return fetch("https://api.themoviedb.org/3/discover/movie?api_key=852f0cc2950393b0017a359bafdec870&with_genres=28,18")
        return fetch("https://api.themoviedb.org/3/discover/movie?api_key=852f0cc2950393b0017a359bafdec870&primary_release_year=2022&sort_by=vote_average.desc")
          .then((response) => response.json())
          .then((json) => {
            // return json.movies;
            this.setState({   
              data: json.results,
              dataBackup: json.results,
              ListEmpty: false, 
              isLoading: false,
              refreshing: false,
              interruptor: true,
              false: true
            })
            // console.error(this.state.data)
          })
          .catch((error) => {
            console.error(error);
          });
      };

      fetchData2(){
        // return fetch("https://reactnative.dev/movies.json")
        // return fetch("https://api.themoviedb.org/3/movie/300?api_key=852f0cc2950393b0017a359bafdec870")
        // return fetch("https://api.themoviedb.org/3/discover/movie?api_key=852f0cc2950393b0017a359bafdec870&with_genres=28,18")
        // return fetch("https://api.themoviedb.org/3/discover/movie?api_key=852f0cc2950393b0017a359bafdec870&primary_release_year=2022&sort_by=vote_average.desc")
        // return fetch("https://api.themoviedb.org/3/search/movie?api_key=852f0cc2950393b0017a359bafdec870&query=the avengers")
        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=852f0cc2950393b0017a359bafdec870&query=${this.state.textInputSearch}`)
          .then((response) => response.json())
          .then((json) => {  
            // return json.movies;
            this.setState({   
              data: json.results,
              dataBackup: json.results,
              ListEmpty: false, 
              isLoading: false,
              refreshing: false,
              interruptor: true,
              false: true
            })
            // console.error(this.state.data)
          })
          .catch((error) => {
            console.error(error);
          });
      }


    componentDidMount() {

        NetInfo.addEventListener(this.handleConnectivityChange);

        this.fetchData();

        setTimeout(() => {
          // Alert.alert('Oops!');
          this.setState({ spinner: false, badConection: false });

          if (this.state.badConection == false && this.state.interruptor == false 
                        && this.state.connection_Status == 'Online') {
            // Alert.alert('Alert','Network request failed')
          }

        }, 40000);

      }

      componentWillUnmount() {
        this.fetchData();
        // this.unsubscribe();
      }

      handleConnectivityChange = (isConnected) => {
      if (isConnected == true) {
      this.setState({ connection_Status: "Online" });
      this.setState({ loadingDisable: true });
      this.fetchData();
      
      }
      else {
      this.setState({ connection_Status: "Offline" });
      // this.setState({ loadingDisable: true });
      }
        };
      
        
        handleConnectivityChange = state => {
        if (state.isConnected) {
        // Alert.alert('online');
        this.setState({connection_Status: 'Online'});
        this.setState({ loadingDisable: true });
        // this.setState({connection_Status: 'Online'});
        this.fetchData();
        // this.unsubscribe();
        } else {
        // Alert.alert('offline');
        this.setState({connection_Status: 'Offline'});
        }
        }; 
        
        
        Go_toDetailScreen (id, backdrop_path, title, overview, release_date, vote_average, navigation, ) {
           if (this.state.connection_Status == 'Offline'){
       
             Alert.alert(' ', 'You can\'t access movie description offline')
       
         } else {
       
           navigation.navigate('Movie Detail',{
             id:id,
             backdrop_path:backdrop_path,
             title:title,
             overview:overview,
             release_date:release_date,
             vote_average:vote_average,
           })
       
         }
       
       }


      onRefresh() {
        //Clear old data of the list
        this.setState({ data: [], dataBackup: [],  false: false,  isLoading: true  });
        //Call the Service to get the latest data
        this.componentDidMount();
      }

      onRefresh2() {
        //Clear old data of the list
        this.setState({ data: [], dataBackup: [] });
        //Call the Service to get the latest data
        this.fetchData2();
      }


      Hello(mes, día){
        Alert.alert('info', mes + ' ' + día);
      }

      //todo: Render Item for FlatList
        renderItem = ( item, navigation ) => { 

          let pat_image = "https://image.tmdb.org/t/p/w200";

          return (

          <View style={{backgroundColor: '#E5E7E9'}}>

            { this.state.false === false?
              <View  style={[styles.card, {backgroundColor: '#ffffff'}]}>
                <Text style={{color: 'blue', fontSize: 30}}>Cargando...</Text>
              </View>
            : null
          }
          {this.state.false === true?
          
          <View style={[styles.card, {backgroundColor:  '#ffffff'}]}>
              <TouchableOpacity activeOpacity = {0.7}  
              // onPress={() => navigation.navigate('DetailScreen')}
              onPress={this.Go_toDetailScreen.bind(this,
                  item.id,
                  item.backdrop_path,
                  item.title,
                  item.overview,
                  item.release_date,
                  item.vote_average,
                  navigation )}
              style ={{flex:1, flexDirection: 'row', /*marginBottom: 3,margin: 5*/ }}
            >
                                
            
                <ImageBackground source={require('../../assets/img_load.jpg')} 
                                        style={styles.image} >
                    <Image //!Imagen 
                    source={ {uri: pat_image+item.backdrop_path} } style = {styles.image}/>
                </ImageBackground>
                  
        
                <View style={{ flex:1, justifyContent: 'center', marginLeft: 10}}>

                    <Text //! Nombre
                        style={[styles.nombre, {color: '#218242'}]} >
                      {item.title}
                    </Text>

                    <Text //! Fecha
                        style={{color:'darkblue', fontSize: 16}} >
                      Release Date: {item.release_date }
                    </Text>
                  
                  <Text //! Hora
                  style={{color:'gold', fontSize: 16}}>
                    The Average vote: {item.vote_average}
                  </Text>
                    
                </View>
                </TouchableOpacity>
            </View>
            : 
            null
            }

            </View>
            
          )
        };


      //todo: for the input de search
      getHeader = () => {

          return (
            <SafeAreaView>
            {this.state.false === false?
              <Text>loading seach...</Text>
              :
              null
            }
            { this.state.false === true?
            <View style={{flexDirection:'row',}}>
            <View style={[styles.SectionStyle, {backgroundColor: '#ffffff'}]}>
            <Image
              source={require('../../assets/search.png')} 
              style={styles.ImageStyle} />
      
                <TextInput
                  placeholder= "Buscar"
                  placeholderTextColor= "gray"
                  value={this.state.query}
                  // onChange={this.filterItem.bind(this)}
      
                  onChangeText={
                          TextInputValue => [
                            this.setState({textInputSearch: TextInputValue}),
                            // this.validate(TextInputValue, 'TextInputNombreUsuario'),
                          ]
                        }
      
                  style={{ flexDirection: 'row', paddingRight:"65%", color:'black',
                              // borderWidth:1, borderColor:'red'
                  }} />
                { this.state.textInputSearch != ''?
                  <View style={{flex: 1}}>
                  <TouchableOpacity onPress={()=> this.clearTextInput()}>
                    <Image 
                  source={require('../../assets/cancelBlack.png')} 
                      style={styles.ImageCloseStyle} />
                  </TouchableOpacity>
                </View>
                : null
                }
               
              </View>
              <View style={{flex:1, justifyContent: 'center', alignContent: 'center',}}>
              <TouchableOpacity style={styles.Recargar2}
                       onPress={this.onRefresh2.bind(this)}
                         >
                <Text style={{color:'blue', }}>Search</Text>
            </TouchableOpacity> 
                </View>
            </View>      
              : null 
          }
          </SafeAreaView>
            );
          };

      clearTextInput(){
        this.setState({
          textInputSearch: '',
          query: '',
          data: this.state.dataBackup,
        })  

        this.fetchData();

      }

      render() {

        const { navigation } = this.props;

        let { DefaultSpinner } = this.state
        let { ListEmpty } = this.state

      if (this.state.connection_Status == 'Online' || this.state.loadingDisable) {
        
      return (

          this.state.isLoading
          ?

          <View style={{ flex:1, justifyContent:'center', alignItems:'center',
                          backgroundColor: '#E5E7E9' 
              }}>

            <Lottie resizeMode= "contain" style={{width:700, height: 120}} 
                autoSize source={forPointAnimation} autoPlay loop />
                
            <Text style = {{color:'gray', fontFamily: 'Arial',
                            fontWeight:'bold', fontSize: 19}}>
                  L O A D I N G . . .
            </Text>
            <Text style = {{color:'gray', margin:15,
                            textAlign:'center', fontSize: 17}}>
                 Just best movies
            </Text>

            <TouchableHighlight style={styles.Recargar}
                        onPress={this.onRefresh.bind(this)} >
                <Text style={{color:'#C0C0C0'}}>Refresh</Text>
            </TouchableHighlight> 
          </View>
            
            : 

      <View style={[  styles.MainContainer, { backgroundColor: '#F8F9F9'} ]}
              // style= {styles.MainContainer}
        // style={[styles.MainContainer],
      >
            
        {
            this.finActivityIndicator()
        }

        {

          DefaultSpinner == true ? //* debe ir este lotie por si la lista está vacía
          <View style= {{backgroundColor: '#F8F9F9'}}>
            <Lottie  style={{alignItems: "center", alignSelf: "center", alignContent: "center", height: "70%"}}
                              autoSize source={movie_theatre} autoPlay loop />
          </View>
        
          :
            ListEmpty == true && DefaultSpinner == false

          ?

          <View style={[  styles.containerNoEvent, { backgroundColor: '#F8F9F9'} ]}>

          <Lottie resizeMode= "contain" style={{width:350, height: 180}} 
                autoSize source={cancelledOnCanlendar} autoPlay loop />

          <Text style={{color:'#566573', 
                          textAlign: 'center', fontSize: 18, paddingTop: 20}}>
                Por ahora no hay eventos en Sonsonate; pero regresa aquí con 
                frecuencia, porque pronto habrán muchos eventos que, seguro,
                no querrás perderte. 
          </Text>
      

          <TouchableHighlight style={styles.Recargar}
            onPress={this.onRefresh.bind(this)} >
              <Text style={{color:'skyblue'}}> Actualizar </Text>
          </TouchableHighlight> 

        </View>

        :


          <View style= {{ backgroundColor: '#F8F9F9' }} //? debe ir este backgorund aquí
            >
          
            <FlatList //! Este es el FlatList que muestra los eventos como una lista de items seleccionables
              //ItemSeparatorComponent={this.ListViewItemSeparator}
              data={this.state.isLoading? this.state.fakedata : this.state.data}
              // renderItem={this.renderItem}
              renderItem={({ item }) => (this.renderItem(item, navigation))}
              ListHeaderComponent={this.getHeader()} //? Obtendrá el componente de búsqueda para que éste  se desplace con la lista
              keyExtractor={(item, index) => index.toString()}
              windowSize={10} 
              removeClippedSubviews={true} // Unmount components when outside of window 
              maxToRenderPerBatch={1} // Reduce number in each render batch

              legacyImplementation = {true}
              
              onEndReachedThreshold={50}
              getItemLayout={(data, index) => ( //* para optimizar la velocidad de renderizado omitiendo la medición de los elementos renderizados.
                  {length: 40, offset: 40 * index, index}
                )}
            
                refreshControl={
                  <RefreshControl
                    //refresh control used for the Pull to Refresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                  />
                }
                //! Hasta aquí termina el FlatList
              />
              
          </View>

          }
          </View>

        );
      }
      else {

            return (
              <View style={[styles.container, {backgroundColor: '#EAFAF1'}]}>
                <ErrorDeConexion />
                <TouchableHighlight
                  style={styles.Recargar}
                  onPress={this.onRefresh.bind(this)}>
                  <Text style={{color: 'skyblue'}}>Touch for refresh</Text>
                </TouchableHighlight>
              </View>
            );

        }
      }
}


// Wrap and export
function HomeScreen(props) {

  const navigation = useNavigation();

  return <MoviesList {...props} navigation={navigation} />;
}

export default HomeScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',

  },
  image:{
      width:120,
      height:120,
      // margin: 5,
      marginRight: 5,
      marginLeft: 3,
      marginTop: 2,
      marginBottom:10,
      // paddingBottom: 10,
      borderRadius: 10
  },
   nombre:{
      color:'black', 
      fontSize: 18, 
      fontWeight:'bold', 
      // color: '#218242', 
      marginBottom: 15,
  },
  ShimmerPlaceHolderStyle:{
    width: 150, 
    margin: 7
  },
  card:{
      borderColor: "gray",
      borderWidth: 0.4,
      borderRadius: 7,
      padding: 3,
      flexDirection: "row",
      marginTop: 5,
      marginLeft: 5,
      marginRight: 5,
      paddingBottom: 3,
      // backgroundColor: "#323436",

  },
  rowViewContainer: {
    fontSize: 20,
    padding: 10,
  },

  container: {  
  flex: 1,    
  justifyContent: 'center',    
  alignItems: 'center',    
//  backgroundColor: '#ECF9F1',  
},
containerNoEvent: {  
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  alignContent: 'center',
  // resizeMode:     
},   
lottie: {    
 width: 100,    
 height: 100,  
},

Recargar: {
 borderRadius:7,
 marginTop: 7,
 paddingTop: 20
//  marginBottom: 220,
},

Recargar2: {
  // borderRadius:7,
  // marginTop: 7,
  paddingLeft: 5,
  paddingVertical: 10,
  borderWidth: 1,
  borderColor: 'lightgray'
 //  marginBottom: 220,
 },

//todo: Styles for search filter

SectionStyle: {
  flexDirection: 'row',
  height: 45,
  width: '85%',
  marginTop: 5,
  marginBottom: 7,
  // backgroundColor: '#fff',
  borderRadius: 5,
  borderEndWidth: 0.5,
  borderRightWidth: 0.5,
  borderBottomWidth: 0.4,
  borderTopWidth: 1.5,
  alignContent: "center",
  alignSelf: "center",
  borderWidth: 1,
  borderColor: 'gray',
},

ImageStyle: {

  marginTop: 10,
  marginRight: 3,
  marginLeft: 3,
  height: 17,
  width: 17,
  resizeMode: 'stretch',
  tintColor: 'gray',
},
ImageCloseStyle: {
  marginTop: 10,
  marginRight: 10,
  height: 17,
  width: 17,
  padding: 3,
  resizeMode: 'stretch',
  tintColor: 'gray',
  alignSelf: 'flex-end',
}

}); 


