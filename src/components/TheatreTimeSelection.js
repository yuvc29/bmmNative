import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Button } from 'react-native';
import { GetTheatreList , GetShowsByTheatre} from '../api/GetTheatreList';
// const theatreList = [
//     {
//         name :"INOX",
//         address : "Shipra Mall , gh",
//         timings : [[1,"12:15 PM"], [2,"06:35 PM"], [3,"10:00 PM"]],

//     },
//     {
//         name : "Cinepolis", 
//         address : "New Mall , gh",
//         timings : [[1,"12:15 PM"], [2,"06:35 PM"], [3,"10:00 PM"]],
//     },data
// ]

export default function TheatreTimeSelection({route, navigation}) {
    const [selectedDate, setSelectedDate] = useState("");
    const [theatreList, setTheatreList] = useState([]);
    const [cityId, setCityId] = useState(route.params.cityId);

    useEffect(() => {
        const fetchTheatres = async() =>{
          const response = await GetTheatreList(cityId, route.params.movieItem.movieId, selectedDate);
          const temp = response.data;
          console.log("theater List:" ,temp);
            let finalTheatreList = [];
            setTheatreList([]);

            temp.map(async(field) =>{
                    theatreId = 0;
                    theatreName = "";
                    address = "";
                    timings = [];

                    const temp = field.split(',');

                    const showResponse = await GetShowsByTheatre(parseInt(temp[0]), route.params.movieItem.movieId, selectedDate);
                    console.log("show response %$^%$^%^$ for date",selectedDate," : ",showResponse.data);
                    timings = showResponse.data;

                    finalTimings = [];

                    timings.map(field => {
                        let temp1 = field.split(',');
                        let obj = {showId : temp1[0], timing:temp1[1]};
                        finalTimings.push(obj);
                    })

                    finalTheatreList.push({
                        theatreId : parseInt(temp[0]),
                        theatreName : temp[1],
                        address : temp[2],
                        timings: finalTimings,
                    });

                    setTheatreList(finalTheatreList);
                }
            )
      }
      fetchTheatres();
    }, [selectedDate]);

    useEffect (() => {
        navigation.setOptions({ headerTitle: route.params.movieItem.title });
    }, []);
    
    const handleFinalClick = (obj, field) => {
        console.log("Final Click", obj, field);
        navigation.navigate("Seating", {movieItem:route.params.movieItem, theaterItem: obj, showItem : field, date : selectedDate,  userDetails:route.params.userDetails});
    }

    const dateData = () => {
        let dateArr = [];
        Array.from({length:7}).map(function(_, i){
            var now = new Date(Date.now() + i* 24 * 60 * 60 * 1000)
            var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            
            var day = days[ now.getDay()];
            var month = months[ now.getMonth() ];
            var date = now.getDate();
            var year = now.getFullYear();

            var dd = String(now. getDate()). padStart(2, '0');
            var mm = String(now. getMonth() + 1). padStart(2, '0'); //January is 0!
            var yyyy = now. getFullYear();
            
            ddmmyyyy = dd + '/' + mm + '/' + yyyy;

            dateArr.push({
                    id:i,
                    day:day,
                    date:date,
                    month:month,
                    ddmmyyyy: ddmmyyyy,
                })
        
        })
        return dateArr;
    }

    const renderDates = (data) => {
        // console.log(data);
        const obj = data.item;
        return (
            <TouchableOpacity key = {obj.id} onPress={()=>setSelectedDate(obj.ddmmyyyy)}>
                <View style = {{padding:15,
                                justifyContent:"center",
                                alignItems :"center",
                                backgroundColor:(selectedDate==obj.ddmmyyyy?"#f84464":"white"),
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
            <View key = {obj.theatreId} style = {styles.theatreItem}>
                <View >
                    <Text style = {{color:"black" , fontWeight: "bold"}}>{obj.theatreName} : {obj.address}</Text>
                </View>

                <View>
                <FlatList
                    contentContainerStyle={{justifyContent: 'space-evenly' , width:"100%", marginTop:10}}
                    numColumns={3}
                    data={obj.timings}
                    renderItem={(data)=> {
                        const field = data.item;
                        
                        return (<TouchableOpacity key = {field.showId} onPress={()=>handleFinalClick(obj, field)} 
                                style = {{borderWidth:1, width:80, padding:5, borderRadius:6, alignItems:'center', justifyContent:'center', margin:10}}>
                                    <Text style ={{color:"green" ,fontWeight: "bold"}}>{field.timing}</Text>
                                </TouchableOpacity>
                        )
                    }}
                    
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
                
            />
        </View>

        <View style = {styles.theatreList_cont}>
            <FlatList
                data = {theatreList}
                renderItem={renderTheatre}
                
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