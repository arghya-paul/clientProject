//import liraries
import {useRoute} from '@react-navigation/native';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import database from '@react-native-firebase/database';
import MsgComponent from '../Components/MsgComponent';
import moment from 'moment';

// create a component
const SingleChatPage = ({navigation}) => {
  useEffect(() => {
    FetchChats();
    setTimeout(() => {
      setFullLoader(false);
    }, 1000);
  }, []);
  const {userData} = useSelector(state => state.User);
  const route = useRoute();
  const [msgInputArea, setMsgInputArea] = useState('');
  const [AllChats, setAllChats] = useState([]);
  const Roomid = route.params.ROOMID;
  const Remoteid = route.params.REMOTEID;
  const RemoteDetails = route.params.DETAILS;
  const [fullLoader, setFullLoader] = useState(true);
  // console.log('RemoteDetails>>>',RemoteDetails);

  const FetchChats = () => {
    database()
      .ref(`/Chat/${Roomid}/messages`)
      .on('value', snapshot => {
        if (snapshot.exists()) {
          console.log('Object.values(snapshot.val())', snapshot.val());
          setAllChats(Object.values(snapshot.val()));
  
        } else {
    
        }
      });
  };

  const sorted = () => {
    let a;
    a = AllChats.sort(function (a, b) {
      return b.send_time < a.send_time ? -1 : b.send_time > a.send_time ? 1 : 0;
    });
    return a;
  };

  const SendMessage = () => {
    let utcTime = moment().utc().format().split('Z');
    let smsdata = {
      roomId: Roomid,
      msgId: uuid.v4(),
      sender_id: userData?._id,
      message: msgInputArea,
      send_time: `${utcTime[0]}+00:00`,
      name: `${userData?.name}`,
    };

    database().ref(`/Chat/${Roomid}/messages/`).push(smsdata);

    FetchChats();
    setMsgInputArea('');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'blue'} barStyle={'light-content'} />
      <View style={styles.headerView}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconView}>
          <Image
            source={require('../Assets/back.png')}
            style={styles.backIcon}
          />
        </Pressable>
        <Text style={styles.headerText}>{RemoteDetails.name}</Text>
      </View>

      {fullLoader ? (
        <View
          style={{
            flex: 1,

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'blue'} />
        </View>
      ) : sorted() && sorted().length > 0 ? (
        <FlatList
          style={{marginBottom: 70}}
          data={sorted()}
          keyExtractor={(item, index) => index}
          inverted
          renderItem={({item}) => {
            return (
              <MsgComponent
                sender={item.sender_id == userData?._id}
                massage={item.message}
                //   time={item.send_time}
                //   image={Info.image}
                //   messageType={item.messageType}
                //   remoteId = {remoteId}
                //   type = {item.messageType}
                //   item={item}
              />
            );
          }}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={[
              styles.textStyle,
              {
                fontSize: 20,
                color: 'black',
              },
            ]}>
            No Chats Yet
          </Text>
        </View>
      )}

      <View
        style={{
          backgroundColor: '#DEDEDE',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Write something"
          onChangeText={val => setMsgInputArea(val)}
          value={msgInputArea}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => SendMessage()}>
          <Image
            source={require('../Assets/send.png')}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backIcon: {
    height: 30,
    width: 30,
    tintColor: 'white',
  },
  headerView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: 'blue',
    paddingVertical: 20,
  },
  iconView: {
    // width:"23%"
    marginRight: 20,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  sendIcon: {
    height: 30,
    width: 30,
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
  },
});

//make this component available to the app
export default SingleChatPage;
