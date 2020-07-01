import React ,{useState,useEffect}from "react";
import {View, Text, FlatList, Button, TextInput ,Image,ScrollView,StyleSheet,ImageBackground} from "react-native"
import Shopdetail from "../json/Shopdetail.json"
import Fooddata from "../json/fooddetail.json"
import ShopFooddata from "../json/shopfooddetail.json"
import Foodcard from "../component/foodcard.js"
import * as firebase from 'firebase';


const ShopCard = (props) => {
    return(
        <ScrollView>
            <View style={styles.Scrollcard}>
                <Image
                    style={styles.shopimage}
                    source={{uri:props.image}}
                />
            </View>
        </ScrollView>
    )
}


  
const HomeScreen = ({navigation}) =>{

    const [name,setName] = useState(null);
    useEffect(()=>{
    storefirebaseauth();
    },[]);

    const storefirebaseauth = () => {
        setName(firebase.auth().currentUser.displayName);
    };

    const [saler, setSaler] = useState(true);
    const changesaler = () => {
    if(saler===true){
        setSaler(false)
    }
    else{
        setSaler(true)
    }
    }

    const UserShopFoodcard =({navigation}) =>{
    return saler ? (
        <FlatList
            data = {Fooddata}
            renderItem = {({item})=>
            <Foodcard
            post = {item}
            navigation = {navigation}
            />}
            keyExtractor = {item => item.name}
            contentContainerStyle={{overflow: 'hidden'}}
        />
    ) :(
        <FlatList
            data = { ShopFooddata}
            renderItem = {({item})=>
            <Foodcard
            post = {item}
            navigation = {navigation}
            />}
            keyExtractor = {item => item.name}
            contentContainerStyle={{overflow: 'hidden'}}
        />
    )
    }
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <ScrollView scrollEventThrottle = {16} style={{height:450}}>
            <View style={{backgroundColor:'#F0A202',height:422,paddingTop:28}}>
            <ImageBackground source={require('../img/homebg1.png')} style = {{width:375,height:422}}>
                <View style={{height:91,paddingTop:17,paddingLeft:26}}>
    <Text style={{color:'#fff',fontSize:22}}>Hello,{name}!</Text>
                    <Text style={{color:'#fff',fontSize:14,marginTop:8}}>歡迎使用想享!</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                   
                    <View style = {styles.Searchsection}>
                    <Image
                    source={require('../icon/search.png')}
                    style={{width:12,height:12,marginTop:12,marginLeft:12,marginRight:12}}
                    />
                    <TextInput
                    placeholder="找食物"
                    placeholderTextColor ="#fff"
                    />
                    </View>
                </View>
            
                <View style={styles.RowScrollsection}>
                    <View style={{alignItems:"center",paddingTop:16}}>
                    <Text style={styles.ScrollText}>精選商家</Text>
                    </View>
                    <View >
                    <ScrollView 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollsection}
                    >
                    
                        <View style={styles.Scrollcard}>
                            <ImageBackground
                                imageStyle={{borderRadius:10}}
                                style={styles.shopimage}
                                source={{uri:Shopdetail[0].image}}
                            />
                            <Text style={styles.shopname}>{Shopdetail[0].name}</Text>
                            <Text style={styles.shopname}>{Shopdetail[0].addre}</Text>
                        </View>
                        <View style={styles.Scrollcard}>
                            <ImageBackground
                                imageStyle={{borderRadius:10}}
                                style={styles.shopimage}
                                source={{uri:Shopdetail[1].image}}
                            />
                            <Text style={styles.shopname}>{Shopdetail[1].name}</Text>
                            <Text style={styles.shopname}>{Shopdetail[1].addre}</Text>
                        </View>
                        <View style={styles.Scrollcard}>
                            <ImageBackground
                                imageStyle={{borderRadius:10}}
                                style={styles.shopimage}
                                source={{uri:Shopdetail[2].image}}
                            />
                            <Text style={styles.shopname}>{Shopdetail[2].name}</Text>
                            <Text style={styles.shopname}>{Shopdetail[2].addre}</Text>
                        </View>
                    </ScrollView>       
                    </View>
                </View>
            </ImageBackground>
            </View>
            <View style={styles.near_View}>
                <Text style={styles.FlatListtext}>離你最近</Text>
                <Button
                title = "press"
                onPress={changesaler}
                />
            </View>
            <UserShopFoodcard navigation = {navigation}/>
        </ScrollView>
             
        </View>
    )
};

const styles = StyleSheet.create({
    near_View:{
        height:80,
        marginTop:28,
        paddingTop:26,
        backgroundColor:'#FDF8E1',
        flexDirection:'row'
    },
    Searchsection:{
        flex:1,
        fontWeight:"700",
        backgroundColor:'#F6C45D',
        width:1,
        height:36,
        marginLeft:26,
        marginRight:26,
        flexDirection:'row',
        borderRadius:10
    },
    Searchinput:{},
    RowScrollsection:{
        flex:1,
        
    },
    FlatListtext:{
        fontSize:18,
        fontWeight:'600',
        color:'#F0A202',
        marginLeft:26,
    },
    ScrollText:{
        fontSize:18,
        fontWeight:'600',
        color:'#fff',
        height:40,
        
    },
    Scrollcard:{
        height:192,
        width:278,
        marginRight:16,
        shadowColor:"#9A9A9A",
        elevation:24,
        shadowOffset:{width:5,height:5},
        shadowOpacity:0.4,

        
    },
    shopimage:{
        flex:1,
        width:278,
        height:192,
        resizeMode:'cover',
        borderRadius:10
        
    },
    shopname:{
        bottom:30,
        color:'white',
        marginLeft:16,
        fontSize:18

    },
    scrollsection:{
        marginTop:20,
        paddingLeft:48,
        
    }

})

export default HomeScreen;