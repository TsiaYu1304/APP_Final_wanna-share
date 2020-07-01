import React,{useContext, useState,useEffect}from 'react';
import { StyleSheet, Text, View, Image, ImageBackground ,TouchableOpacity,Dimensions} from 'react-native';
import { OrderTabNavigation} from "./index"
import {Button} from "react-native-elements";
import {StoreContext}from "../store/UserStore.js";
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import * as firebase from 'firebase'; 





  
  
const User = ({navigation}) => {

    const {userState} = useContext(StoreContext);
    const [user,setUser] = userState;
    const [Orderexist,setOrder] = useState(false);
    const [tabnumber,setNum] = useState(0);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
    { key: 'first', title: '尚未領取' },
    { key: 'second', title: '已領取' },
  ]);
  const FirstRoute = () => (
    Orderexist?(<View>
        <TouchableOpacity>
        <View style={{flexDirection:'row',height:88,marginTop:25}}>
            <Image
            source={{uri:img}}
            style={{height:88,width:88,borderRadius:10,marginLeft:26}}
            />
            <View style={{flexDirection:'column',marginTop:5,marginLeft:16}}>
                <Text>{salername}</Text>
                <Text style={{fontSize:18,marginTop:8}}>{food}</Text>            
                <Text style={{marginTop:8}}>領取期限:4/27 17:00前</Text>
            </View>
            <View>
                <Button
                title="聯絡他"
                buttonStyle={{backgroundColor:'#F0A202',borderRadius:10,height:36,width:82}}
                titleStyle={{fontSize:14}}
                />
            </View>

        </View>
        </TouchableOpacity>
        
    </View>):(
    <View></View>
    )
    
  );

  const SecondRoute = () => (
    <View><Text>2</Text></View> 
  );
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        
      });

    const [email,setEmail] = useState(null);
    const [name,setName] = useState(null);
    useEffect(()=>{
    storefirebaseauth();
    },[]);
    const storefirebaseauth = () => {
        setEmail(firebase.auth().currentUser.email);
        setName(firebase.auth().currentUser.displayName);
    };

    const [food,setFood] = useState("");
    const [salername,setSalername] = useState("");
    const [img,setImg] = useState("");
    useEffect(()=>{
        readData();
    },[]);
    const readData = () => {
        firebase.database().ref(firebase.auth().currentUser.uid).on('value', function(snapshot) {
           if(snapshot.exists()){
           setFood(snapshot.val().food);
           setSalername(snapshot.val().name);
           setImg(snapshot.val().img);
           setOrder(true);
           }else{
            setOrder(false);
           }
           
           
            
           
           console.log(`${food}`);
           console.log(`salername=${salername}`);
           console.log(`img=${img}`);
          });
    };


    
    const SetSegmentNumber = ({index}) =>{
        setNum(index);

    }
   

    return (
        <View >
            <View style={{ height: 70, width: 375, backgroundColor: '#F0A202F0', }}>

            </View>
            <View style={styles.user_profile}>
                <ImageBackground
                    style={{width:376,height:321,paddingTop:66}}
                    source={require("../img/userbg.png")}
                >
                    <View style={{height:162,alignItems:'center'}}>
                    <Image
                        style={styles.user_profile_img_}
                        source={require("../img/user_tomato.png")}
                    />
                    
                    <Text style={styles.user_profile_name}>{name}</Text>
                    <Text style={styles.user_profile_mail}>{email}</Text>
                    </View>
                    <View style={{flexDirection:'row',paddingLeft:30}}>
                        <View  style={styles.btn4_view}>
                            <TouchableOpacity style={styles.btn4_touchable}
                            onPress={() => navigation.navigate('Coin')}>
                                <Image
                                source={require("../icon/coin.png")}
                                style={{width:44,height:44}}
                                />
                            </TouchableOpacity>
                            <Text style={styles.btn4_text}>想享幣</Text>
                        </View>
                        <View  style={styles.btn4_view}>
                            <TouchableOpacity style={styles.btn4_touchable}>
                                <Image
                                source={require("../icon/messege.png")}
                                style={{width:44,height:44}}
                                />
                            </TouchableOpacity>
                            <Text style={styles.btn4_text}>聊天紀錄</Text>
                        </View>
                        <View  style={styles.btn4_view}>
                            <TouchableOpacity style={styles.btn4_touchable}>
                                <Image
                                source={require("../icon/coupon.png")}
                                style={{width:44,height:44}}
                                />
                            </TouchableOpacity>
                            <Text style={styles.btn4_text}>優惠券</Text>
                        </View>
                        <View  style={styles.btn4_view}>
                            <TouchableOpacity 
                            onPress={() => navigation.navigate('Setting')}
                            style={styles.btn4_touchable}>
                                <Image
                                source={require("../icon/setting.png")}
                                style={{width:44,height:44}}
                                />
                            </TouchableOpacity>
                            <Text style={styles.btn4_text}>設定</Text>
                        </View>
                        
                    </View>

                </ImageBackground>

                <View style={styles.user_profile_img}>
                    <Image
                        style={styles.user_profile_img_}
                        source={require("../img/user_img.png")}
                    />
                </View>
                <View style={styles.user_profile_name}>
                <Text style={styles.user_profile_name_}>{user.name}</Text>
                <Text style={styles.user_profile_name_}>{user.email}</Text>
                </View>
            </View>
            <View style={styles.order_view}>
            <TabView
            style={{top:13}}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={props=>
                <TabBar
                    {...props}
                    style={{backgroundColor:'#fff',color:'#656565',shadowColor:'#fff',elevation:0}}
                    indicatorStyle={{ backgroundColor: '#F0A202' ,width:94,marginLeft:49}}
                    labelStyle={{color:'#656565',fontSize:17}}
                />
            }

            />
            
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    order_view:{
        backgroundColor:'#fff',
        borderRadius:16,
        height:400,
        bottom:20
    },
    user_profile: {
        width: 375,
        height:356,
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor:'#F0A202'
    },
    user_profile_img: {
        width: 114,
        height: 132,
        // backgroundColor:'tomato',
    },
    user_profile_img_: {
        width: 88,
        height: 88,
        borderRadius: 50


    },
    user_profile_name:{
        color:'#fff',
        fontSize:22
    },
    user_profile_mail:{
        color:'#fff',
        fontSize:14
    },
    user_list: {
        width: 323,
        height: 130,
        backgroundColor: '#fff',
        top: -52,
        left: 26,
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop:16,

    },
    user_list_img: {
        width: 114,
        height: 130,
       // backgroundColor:'purple',
    },
    user_list_detail: {
        width: 209,
        height: 130,
        paddingTop:26,
        paddingLeft:16,
       // backgroundColor:'blue',
    },
    user_list_detail_medal:{
        width:323,
        height:130,
        left:-130,
        top:-95,
        //backgroundColor:'black',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    user_list_detail_medal_:{
        width:60,
        height:60,
        backgroundColor:'red',
        top:16,
        
        right:16
    },
    btn4_view:{
        flexDirection:'column',
        alignItems:'center',
        paddingLeft:19
    },
    btn4_touchable:{
        width:55,
        height:55,
        borderRadius:30,
        backgroundColor:'#fff',
        alignItems:'center',
        paddingTop:5,
        shadowColor:'#765104',
        shadowOpacity:0.4,
        elevation:24,
        shadowOffset:{width:10,height:10},
    },
    btn4_text:{
        color:'#fff',
        marginTop:10,
        fontSize:12
    }





});
export default User;