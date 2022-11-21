import { Button, Image, StyleSheet, Text, TouchableOpacity, View , Modal, Dimensions, TextInput} from "react-native";
import { useEffect, useState } from "react"

import { GetSeatsbyShowId, PostMyOrder, ReserveBookedSeats } from "../api/Seating";

const { width } = Dimensions.get("window");

const Seating = ({route, navigation}) => {
    const r= [0,1,2,3,4,5,6,7,8];
    const c= [0,1,2,3,4,5,6,7,8];
    const [enabledPaymentRedirect, setEnabledPaymentRedirect] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0);
    const [isModalVisible, setModalVisible] = useState(true);
    const [booked , setBooked] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [amount, setAmount ] = useState(0);
    const [couponId, setCouponId] = useState(1);             // hard coded , change after coupon integration
    

    const [ticket, setTicket] = useState({
        seats :[],
        seatCount:1,
        seatPrice : 100,
    })

    useEffect(() => {
        setAmount(selectedCount*ticket.seatPrice);
    }, [selectedCount])

    useEffect(() => {
        const fetchData = async() => {
            let response = await GetSeatsbyShowId( route.params.showItem.showId);
            const seatList = response.data;
            console.log("Seat Lists", seatList);
            setBooked(seatList);
        }
        fetchData();
    }, [])
    
    const handleSubmit = async() => {
        // if(!authenticated){
        //     navigation.navigate("Login");
        // }
        // ReserveBookedSeats();                         //hold seats for some time
        orderObj = {
            showId:route.params.showItem.showId,
            userId:route.params.userDetails.userId,                                 // hard Coded , have to change after log in integration
            amount : amount,
            couponId: couponId,
            amountAfterDiscount : amount,  
        }

        const response = await PostMyOrder(orderObj);
        console.log("Order Post Response" ,response);
        orderObj =  response.data;
        console.log("Order Post Response Data" ,orderObj);  

        const seatList= [];

        ticket.seats.map((seat)=> {
            const temp = parseInt(seat.row.toString() + seat.col.toString());
            seatList.push(temp);
        })

        navigation.navigate("PaymentPage", { seatList : seatList, ticket : ticket , orderObj: orderObj , movieItem:route.params.movieItem,  theaterItem: route.params.theaterItem, showItem : route.params.showItem, date : route.params.date, userDetails:route.params.userDetails});
    };

    const onSelect = (index, cindex ) => {
        if(selectedCount >= ticket.seatCount){
            return;
        }
        const s = {
            row: index,
            col: cindex
        }

        const data = [...ticket.seats, s];

        setTicket({...ticket, seats: data})

        if(selectedCount +1 >= ticket.seatCount){
            setEnabledPaymentRedirect(true);
        }   

        setSelectedCount(selectedCount+1);
    }

    const unSelect = (index, cindex) => {
        if(selectedCount -1 < ticket.seatCount){
            setEnabledPaymentRedirect(false);
        }   
        setSelectedCount(selectedCount-1);
        const tick = [...ticket.seats]
        const ans = tick.filter((se) => (se.row != index || se.col != cindex))
        setTicket({...ticket, seats: ans})
    }

    const isOccupied = (index, cindex) => {
        const temp = parseInt(index.toString() + cindex.toString());
        // console.log("booked ",booked,"temp", temp);
        let ans= false;
        booked.map((book) => ans|=(book.seatNo === temp && book.orderId!==null));
        return ans;
    }

    const isSelected = (index, cindex) => {
        const ans = ticket.seats.find((book) => book.row == index && book.col == cindex)
        if(ans)
            return true;
        return false;
    }
    
    const toggleModalVisibility = () => {
        console.log("Toggling Count Seat Modal");
        setModalVisible(!isModalVisible);
    };

    return (
        <View style = {styles.body}>

            <View style = {styles.topBar} >
                <Text style = {{color:"black", fontWeight:"bold"}}>Left to Select: {ticket.seatCount - selectedCount}</Text>
                <TouchableOpacity onPress={()=> toggleModalVisibility()}><Image style = {{alignSelf:"flex-end", marginBottom:10}} source = {require('/home/tushar/Desktop/BookMyMovie/bmmNative/src/static/icons8-pencil-24.png')} ></Image></TouchableOpacity>
            </View>
            

            <View style={styles.cont_screen}>
                <Image style = {{resizeMode: "center"}} source={require('/home/tushar/Desktop/BookMyMovie/bmmNative/src/static/cinema.png')} />
            </View> 

            <View style = {styles.hall}>
            {
                r.map((index) => ( 
                    <View key={index} style= {{flex:1}}>
                        {
                            c.map((cindex) => {
                                return <View style = {{justifyContent:"space-evenly", margin:5}}>
                                    {
                                        isOccupied(index, cindex)
                                        ? <TouchableOpacity style = {styles.occupied}><Text >{index}-{cindex}</Text></TouchableOpacity> 
                                        : isSelected(index, cindex)
                                            ? <TouchableOpacity  style = {styles.selected} onPress={() => unSelect( index, cindex)}><Text >{index}-{cindex}</Text></TouchableOpacity> 
                                            : <TouchableOpacity style = {styles.seat} onPress={() => onSelect( index, cindex)}><Text >{index}-{cindex}</Text></TouchableOpacity> 
                                    }
                                </View>
                                })
                        }
                    </View>
                ))
            }
            </View>
            {enabledPaymentRedirect?(
                    <TouchableOpacity style = {styles.paymentBar} onPress = {() => {handleSubmit()}}> 
                        <Text style = {{color:"white"}}>
                            Total         :            {amount}
                        </Text>
                    </TouchableOpacity> 
                ):<></>}  
            
            {/** This is our modal component containing textinput and a button */}
            <Modal animationType="slide" 
                    transparent visible={isModalVisible} 
                    presentationStyle="overFullScreen" 
                    onDismiss={toggleModalVisibility}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <TextInput placeholder="Enter no of Seats" 
                                    keyboardType="numeric"
                                    value={ticket.seatCount} style={styles.textInput} 
                                    onChangeText={(value) => setTicket({...ticket, seatCount: value})} />

                        {/** This button is responsible to close the modal */}
                        <Button title="Done" onPress={toggleModalVisibility} />
                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    body : {
        display:"flex",
        flexDirection:"column",
        flex:1,
    },
    cont_screen :{
        flex:4,
        justifyContent: "center",
        alignItems:"center",
    },
    screen:{
        elevation:10,
        alignItems: "center",
        backgroundColor: "#03c6fc",
        height: 40,
        width: "70%",
    },
    hall:{
        width: "100%",
        flex:10,
        display: "flex",
        flexDirection:"row",
        justifyContent: "center",
        alignItems:"center",
        padding:10,
    } ,  
    seat:{
        width: 30,
        height: 30,
        borderWidth: 1,
        alignItems: "center",
        justifyContent:"center",
        borderTopLeftRadius: 10,borderTopRightRadius: 10,
    },
    selected :{
        width: 30,
        height: 30,
        backgroundColor: "#03fc2d",
        borderTopLeftRadius: 10,borderTopRightRadius: 10,
        alignItems: "center",
        justifyContent:"center",
    },
    occupied :{
        width: 30,
        height: 30,
        backgroundColor: "#F84464",
        borderTopLeftRadius: 10,borderTopRightRadius: 10,
        alignItems: "center",
        justifyContent:"center",
    },
    
    paymentBar :{
        flex:1,
        width:"100%",
        backgroundColor:"#f84464",
        alignItems: "center",
        justifyContent:"center",
    },

    topBar : {
        flexDirection:"row",
        justifyContent:"center",
        flex:1,
        alignItems:"center",
        backgroundColor:"pink",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        height: 180,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
})

export default Seating;