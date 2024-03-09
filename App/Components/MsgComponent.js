import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {useSelector} from 'react-redux';

const MsgComponent = props => {
  const {userData} = useSelector(state => state.User);
  const {sender, massage} = props;
  // console.log('message>',massage);

  return (
    <Pressable style={{marginVertical: 5}}>
      <View
        style={{
          flexDirection: 'row',
       
          alignSelf: sender ? 'flex-end' : 'flex-start',
        }}>
        {!sender ? (
          <Pressable
           
            style={[
              styles.time,
              {
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginLeft: 10,
              },
            ]}>
            <Image
              source={require('../Assets/user.png')}
              style={{
                // borderRadius: 40,
                borderRadius:15,
               marginBottom:8,
                opacity: 0.8,
                height: 30,
                width: 30,
                resizeMode: 'contain',
              }}
            />
          </Pressable>
        ) : null}

        <View
          style={[
            styles.masBox,
            {
              // borderWidth: 1,
              backgroundColor: sender ? 'blue' : 'grey',
              borderBottomLeftRadius: sender ? 16 : 0,
              borderBottomRightRadius: sender ? 0 : 16,
            },
          ]}>
          <Text
            style={{
              paddingLeft: 5,
              color: 'white',
              fontSize: 14,
              fontWeight:"700"
             
            }}>
            {massage}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  masBox: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    minWidth: 80,
    maxWidth: '70%',
    paddingHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
   
  },
  Img: {
    position: 'absolute',
    top: 22,
    left: 22,
  },
  time: {
    alignSelf: 'flex-end',
  },
  timeText: {
    fontSize: 7,
  },
  dayview: {
    alignSelf: 'center',
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.white,
    borderRadius: 30,
    marginTop: 10,
  },
  iconView: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: COLORS.themecolor,
  },
  TriangleShapeCSS: {
    position: 'absolute',
    // top: -3,
    width: 0,
    height: 0,
    // borderBottomLeftRadius:5,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 5,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    // borderBottomColor: '#757474'
  },
  left: {
    // borderBottomColor: COLORS.darksky,
    left: 2,
    bottom: 10,
    transform: [{rotate: '0deg'}],
  },
  right: {
    borderBottomColor: 'green',
    right: 2,
    // top:0,
    bottom: 5,
    transform: [{rotate: '103deg'}],
  },
  pdfView: {
    height: 70,
    width: 210,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // paddingHorizontal:(6),
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconStyle: {
    marginRight: 6,
    fontSize: 30,
    color: 'red',
    // marginTop: (10),
  },
  pdfText: {
    fontSize: 13,

    color: 'white',
    marginVertical: 10,
    // textAlign: 'center',
  },
  BtnView: {
    // backgroundColor:'red',
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  Btn: {
    height: 40,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
  },
  btnText: {
    fontSize: 14,
    color: 'white',
  },
});

export default MsgComponent;
