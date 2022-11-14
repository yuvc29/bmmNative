import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Button } from 'react-native';

const theatreList = [
    {
        name :"INOX",
        address : "Shipra Mall , gh",
        timings : ["12:15 PM", "06:35 PM", "10:00 PM"],

    },
    {
        name : "Cinepolis", 
        address : "New Mall , gh",
        timings : ["12:15 PM", "06:35 PM", "10:00 PM", "10:00 PM"],
    },
]

export default function TheatreTimeSelection({route, navigation}) {
    const [selectedDate, setSelectedDate] = useState(0);

    useEffect (() => {
        navigation.setOptions({ headerTitle: route.params.movieName });
    }, []);
    
    const dateData = () => {
        let dateArr = [];
        Array.from({length:7}).map(function(_, i){
            var now = new Date(Date.now() + i* 24 * 60 * 60 * 1000)
            var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        
            var day = days[ now.getDay()];
            var month = months[ now.getMonth() ];
            var date = now.getDate();

            dateArr.push({
                    id:i,
                    day:day,
                    date:date,
                    month:month,
                })
        
        })
        return dateArr;
    }

    const renderDates = (data) => {
        console.log(data);
        const obj = data.item;
        return (
            <TouchableOpacity onPress={()=>setSelectedDate(obj.date)}>
                <View style = {{padding:15,
                                justifyContent:"center",
                                alignItems :"center",
                                backgroundColor:(selectedDate==obj.date?"#f84464":"white"),
                                }}>
                        <Text style = {{fontSize: 12,fontWeight: "light"}}>{obj.day.substring(0,3).toLocaleUpperCase()}</Text>
                        <Text style = {{fontSize: 20, fontWeight: "bold"}}>{obj.date}</Text>
                        <Text style = {{fontSize: 12,fontWeight: "light"}}>{obj.month.substring(0,3).toLocaleUpperCase()}</Text>
                </View> 
            </TouchableOpacity>
        )
    }

    const renderTheatre = (data) => {
        const obj = data.item;
        return (
            <View style = {styles.theatreItem}>
                <View >
                    <Text style = {{color:"black" , fontWeight: "bold"}}>{obj.name} : {obj.address}</Text>
                </View>

                <View>
                <FlatList
                    contentContainerStyle={{justifyContent: 'space-evenly' , width:"100%", marginTop:10}}
                    numColumns={3}
                    data={obj.timings}
                    renderItem={(data)=> {
                        const field = data.item;
                        return (<TouchableOpacity onPress={()=>navigation.navigate("Seating")}
                                style = {{borderWidth:1, width:80, padding:5, borderRadius:6, alignItems:'center', justifyContent:'center', margin:10}}>
                                    <Text style ={{color:"green" ,fontWeight: "bold"}}>{field}</Text>
                                </TouchableOpacity>
                        )
                    }}
                    // keyExtractor={(item) => item.id}
                />
                </View>
            </View>
        )
    }
    
  return (
    <View style = {styles.mainContainer}>

        <View style={styles.dateList_cont}>
            <FlatList
                contentContainerStyle={{justifyContent: 'space-evenly' , width:"100%", alignItems: "stretch"}}
                horizontal
                data={dateData()}
                renderItem={renderDates}
                keyExtractor={(item) => item.id}
            />
        </View>

        <View style = {styles.theatreList_cont}>
            <FlatList
                data = {theatreList}
                renderItem={renderTheatre}
                keyExtractor={(item) => item.id}
            />
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
      display:"flex",
      flexDirection:"column",
      flex:1,
    },
    theatreList_cont:{
        paddingHorizontal: 24,
        flex:15,
    },
    dateList_cont : {
        flex:2,
    },
    dateButton: {
        
      },
      theatreItem :{
        padding:15,
        backgroundColor:"white",
        borderWidth:1,
        borderRadius:15,
        margin:10,
      }
  });