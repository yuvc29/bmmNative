import React from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Ticket({navigation}) {
  return (
    <View style = {styles.ticketPage}>

      <View style = {styles.ticketContainer}>
        <Image style = {{width: 150, height: 50, alignSelf:"center"}}
          source={{ uri:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8b466e9f-26b4-4f40-a5ff-7eaa4b314014/dfady0s-54ea7126-3a05-4619-b38f-fb23a2bcb887.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhiNDY2ZTlmLTI2YjQtNGY0MC1hNWZmLTdlYWE0YjMxNDAxNFwvZGZhZHkwcy01NGVhNzEyNi0zYTA1LTQ2MTktYjM4Zi1mYjIzYTJiY2I4ODcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.G49pFsWPgF1-5CMAl_jXaxiqZEi_EwMmQ3VnM40CkkY"}}
         />
                <View style = {styles.insidetkt}>
                <Image style = {{width: 150, height: 200, alignSelf:"center"}}
                        source={{uri:"https://i2.cinestaan.com/image-bank/1500-1500/136001-137000/136340.jpg"}}
                        
                        />
                    <View style = {styles.ticketHead}>
                            <View style = {styles.movieInfo}>
                                <Text>U/A,2D,Hindi</Text>
                                <Text>Zero</Text>
                                <Text>R-City, Delhi</Text>
                                <Text>Fri, 32 Oct</Text>
                            </View>
                    </View>
                    <View style = {styles.ticketMid}>
                            <View>
                            <Text>SCREEN</Text>
                            <Text>Audi 2</Text>
                            </View>
                            <View>
                            <Text>SEATS</Text>
                            <Text>A1,A2</Text>
                            </View>
                    </View>
                <Image style = {{width: 250, height: 250, alignSelf:"center"}}
                    source={{uri:"https://s3.eu-central-1.amazonaws.com/qrcg-free-editor.egodit.org/main/assets/images/websiteQRCode_noFrame.png"}}
                    
                />
                </View>
      </View>

        <TouchableOpacity style = {styles.navigateHome} onPress= {() => navigation.navigate("Home")}>
            <Text style = {{alignSelf:"center", fontSize:20, fontWeight:"bold", color:"white"}}> Payment Success : Go to Home !</Text>
        </TouchableOpacity>

    </View>
  )
}


const styles = StyleSheet.create({
    ticketPage :{
        display: "flex",
        flexDirection: "column",
        flex:1,
    },
    
    booklogo :{
        height: 60,
        width: 200,
    },
    
    ticketContainer :{
        flex:1,
        padding:"1%",
        backgroundColor: "grey",
    },
    
    insidetkt :{
        backgroundColor: "#fff",
    },
    
    ticketHead :{
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignSelf:"center",
    },
    
    movieInfo :{
        marginLeft: 30,
        alignSelf:"center",
    },
    
    moviePoster :{
        height: 200,
        width: 180,
        borderRadius: 10,
    },
    
    ticketMid :{
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    
    navigateHome :{
        width:"100%",
        height:50,
        alignSelf:'flex-end',
        backgroundColor:"#03D668",
        justifyContent:"center",
    },
})
