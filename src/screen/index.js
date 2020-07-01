import React from "react";
import {View, Text,Image,TouchableOpacity} from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SigninScreen from "./SigninScreen";
import SignupScreen from "./SignupScreen";
import HomeTabNavigation from "../navigations/MainTab.js";
import HomeScreen from "../screen/HomeScreen.js";
import SearchScreen from "../screen/SearchScreen.js";
import PostScreen from "../screen/PostScreen";
import FinishorderScreen from "./FinishorderScreen";
import UnfinishorderScreen from "./UnfinishScreen";
import FooddetailScreen from "./FooddetailScreen";
import AddScreen from "../screen/AddScreen.js";
import UserScreen from "../screen/UserScreen";
import SettingScreen from "../screen/SettingScreen";
import SharecoinScreen from "../screen/sharecoin"



export const TopTab = createMaterialTopTabNavigator();

export const Stack = createStackNavigator();
export const Tab = createBottomTabNavigator();

//登入頁面

const BackImage =()=>{
    return(
    <Image
        source={require('../icon/back.png')}
        style={{width:24,height:24,marginLeft:16}}
        
    />
    )
}
export const SignStackNavigation = ({navigation}) => {

    return(
        <Stack.Navigator>
            <Stack.Screen name="Signin" component={SigninScreen} options={{headerShown: false}} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export const HomeStackTabNavigation = ({navigation}) => {

    return(
        <Stack.Navigator>
            
            <Stack.Screen name="Home" component={HomeTabNavigation} options={{headerShown: false}} />
            <Stack.Screen name="Food" component = {FooddetailScreen}  options={{
                headerShown: false,
                headerStyle:{
                    backgroundColor:"#F0A202F0",
                    height:88
                },
                headerBackTitleVisible:false,
                title:'吐司',
                
               
                headerBackImage:()=> (<BackImage/>)
            }}/>
            <Stack.Screen name="Coin" component={SharecoinScreen} options={{title:"想享幣"}} />
        </Stack.Navigator>
    );
};

export const HomeStackNavigation = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component = {HomeScreen} options={{headerShown: false}}/>
            
        </Stack.Navigator>
    )
}

const AddRightHeader =()=>{
    return(
    <Text style={{marginRight:16}}>分享</Text>
    )
}


export const PostStackNavigation = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Add" component = {AddScreen}
            options={{
                title:'新增',
                headerStyle:{
                    backgroundColor:'#F0A202F0',
                
                },
                headerRight:()=>(<AddRightHeader/>)
            }}
            />
        </Stack.Navigator>
    )
}

export const OrderStackNavigation = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Order" component = {OrderTabNavigation} options={{
                title:'我的訂單',
                headerStyle:{
                    backgroundColor:"#F0A202F0",
                    height:88
                }
            }}/>
        </Stack.Navigator>
    )
}

export const OrderTabNavigation = ({navigation}) => {
    return (
        <TopTab.Navigator
        tabBarOptions={{
            indicatorStyle:{
                backgroundColor:'#F0A202F0'
            }
            
        }}
        >
            <TopTab.Screen name="unfinishorder" component={UnfinishorderScreen} 
            options={{
                title:'尚未領取',
            }} />
            <TopTab.Screen name="finishorder" component={FinishorderScreen}
            options={{
                title:'已領取'
            }}/>
        </TopTab.Navigator>
    )
}

const Chatbtn = () => 
{
    return(
        <View style={{flexDirection:'row'}}>
        <Image
        source ={require('../icon/chat-bubble.png')}
        style={{width:25,height:24,marginRight:16}}
        />
        <Image
        source ={require('../icon/settings.png')}
        style={{width:24,height:24,marginRight:16}}
        />
        </View>
    )
}
export const UserNavigation = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="User" component = {UserScreen} options={{
                title:'我的帳號',
                headerStyle:{
                    backgroundColor:"#F0A202F0",
                    height:88
                    
                },
                headerShown: false
                
            }}/>
            <Stack.Screen name="Setting" component = {SettingScreen} options={{
                title:'設定',
                headerStyle:{
                    backgroundColor:"#F0A202F0",
                    height:88
                    
                }
            }}/>
        </Stack.Navigator>
    )
}

//主頁面
