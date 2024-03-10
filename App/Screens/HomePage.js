//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import AuthService from '../Services/Auth';
import {logout, setuser} from '../Redux/reducer/User';
import database from '@react-native-firebase/database';

// create a component
const HomePage = ({navigation}) => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.User);
  const [allUsers, setAllUsers] = useState([]);
  const [userLoader, setUserLoader] = useState(true);
  const [refressing, setRefressing] = useState(false);

//   console.log('useriddd>>>',userData);
const onRefresh = async () => {
  setRefressing(true)
  GetAllUsers()
  setRefressing(false)
};

  useEffect(() => {
    getAccountDetails();
    GetAllUsers();
  }, []);

  const getAccountDetails = () => {
    AuthService.getAccount()
      .then(result => {
        if (result != null) {
          dispatch(setuser(result));
        }
      })
      .catch(err => {});
  };

  const GetAllUsers = () => {
    database()
      .ref('/users/')
      .on('value', snapshot => {
        if (snapshot.exists()) {
          let data = Object.values(snapshot.val());
              let filterData = data.filter(it => it.user_id != userData._id);
              setAllUsers(filterData);
              setUserLoader(false)
        } else {
    
        }
      });

      
  };

  const ChatInitiate = (item) => {
     database()
     .ref(`/chatlist/${userData._id}/${item.user_id}`)
     .on('value', snapshot => {
      if (snapshot.exists()) {
        let roomid = snapshot.val().roomID
            // console.log('rooooo>>>',roomid);
            navigation.navigate('SingleChatPage',{
              ROOMID:roomid,
              REMOTEID:item.user_id,
              DETAILS:item
            });
      } else {
        StartChat(item)
      }
    });


    //  .on('value')
    //  .then(res=>{
    //     // console.log('resss>>',res);
    //     if(res.exists()){
    //         let roomid = res.val().roomID
    //         // console.log('rooooo>>>',roomid);
    //         navigation.navigate('SingleChatPage',{
    //           ROOMID:roomid,
    //           REMOTEID:item.user_id,
    //           DETAILS:item
    //         });
                
             
    //     }else{
    //         StartChat(item)
    //     }
    //  })

  };

  const StartChat = (item)=>{
     const roomId = new Date().getTime()

     let data = {
        email_id : userData?.email,
        user_id: userData?._id,
        name: userData.name,
        roomID:roomId
     }

     let data2 = {
        email_id : item?.email_id,
        user_id: item?.user_id,
        name: item?.name,
        roomID:roomId
     }

    //  console.log('data , data2>>.',data,data2);

     database()
     .ref(`/chatlist/${userData?._id}/${item?.user_id}`)
     .set(data)

     database()
     .ref(`/chatlist/${item?.user_id}/${userData?._id}`)
     .set(data2)

     navigation.navigate('SingleChatPage',{
      ROOMID:roomId,
      REMOTEID:item?.user_id,
      DETAILS:item
    });


  }

  const LogOutFunc = () => {
    SimpleToast.show('Logged Out Successfully ', SimpleToast.LONG);
    AuthService.logout();
    dispatch(logout());
  };

  return (
    <ScrollView 
    refreshControl={
      <RefreshControl refreshing={refressing} onRefresh={onRefresh} />
    }
    style={styles.container}>
      <View style={styles.headerView}>
        <Text
          style={[
            styles.textStyle,
            {
              textAlign: 'center',
            },
          ]}>
          Welcome to homepage
        </Text>
        <Text
          style={[
            styles.textStyle,
            {
              textAlign: 'center',
            },
          ]}>
          Hellow {userData?.name}
        </Text>
      </View>
      {/* <TouchableOpacity>
        <View style={styles.chatView}>
          <Text style={styles.textStyle}>Go to my Chatlist</Text>
        </View>
      </TouchableOpacity> */}

      <Text
        style={[
          styles.textStyle,
          {
            color: 'black',
            paddingHorizontal: 20,
            marginVertical: 10,
            textDecorationLine: 'underline',
          },
        ]}>
        Start chat with users :
      </Text>

      {
      userLoader ? 
      <View
      style={{flex:1,
      alignItems:'center',
      justifyContent:"center",
    }}
      >
        <ActivityIndicator size={'large'} color={'blue'}/>
      </View>
      :
      allUsers && allUsers.length > 0 ? (
        allUsers.map((item, index) => {
          return (
            <View style={styles.usersList} key={index}>
              <Text style={styles.textStyle}>{item.name}</Text>
              <TouchableOpacity onPress={() => ChatInitiate(item)}>
                <Image
                  source={require('../Assets/chat.png')}
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={[
              styles.textStyle,
              {
                color: 'black',
              },
            ]}>
            No Data Found
          </Text>
        </View>
      )}

      <TouchableOpacity onPress={() => LogOutFunc()}>
        <View
          style={[
            styles.chatView,
            {
              marginTop: 60,
            },
          ]}>
          <Text style={styles.textStyle}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
  },

  headerView: {
    backgroundColor: 'blue',
    alignSelf: 'center',
    marginVertical: 40,
    borderRadius: 5,
    paddingVertical:15,
    paddingHorizontal:15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatView: {
    // height:30,
    width: '40%',
    alignItems: 'center',
    backgroundColor: 'blue',
    marginHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 6,

    borderRadius: 5,
  },
  usersList: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  imageStyle: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    tintColor: 'white',
  },
});

//make this component available to the app
export default HomePage;
