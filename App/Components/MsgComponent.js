
import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Font} from '../../Constants/FontFamily';
import moment from 'moment';
import {FONTS} from '../../Constants/Fonts';
import {Icon, useTheme} from 'react-native-basic-elements';
import NavigationService from '../../Services/Navigation';
import RNmodal from 'react-native-modal';
import Pdf from 'react-native-pdf';
import { useSelector } from 'react-redux';

const MsgComponent = props => {
  const {userData} = useSelector(state => state.User);
  // console.log('userdaatattaa>>>',userData)
  const colors = useTheme();
  const [pdfOpen, setpdfOpen] = useState(false);
  const {
    sender,
    massage,
    roomId,
    sendTime,
    time,
    tstatus,
    image,
    messageType,
    onOpen,
    type,
    item,
  } = props;

  // console.log('itemmm>>.',item)

  return (
    <Pressable style={{marginVertical: 5}}>
      {/* <View
                style={[styles.TriangleShapeCSS,
                sender ?
                    styles.right
                    :
                    [styles.left]
                ]}
            /> */}
      <View
        style={{
          flexDirection: 'row',
          alignSelf: sender ? 'flex-end' : 'flex-start',
        }}>
        {!sender ? (
          <Pressable
            onPress={() =>
              NavigationService.navigate('UserProfile', {
                userId: item.sender_id,
              })
            }
            style={[
              styles.time,
              {
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginLeft: moderateScale(10),
                // borderWidth:1,
                // backgroundColor: sender ? '#C9C9C9' : '#DADADA'
              },
            ]}>
            <Image
              source={{uri: image}}
              style={{
                borderRadius: 40,
                opacity: 0.8,
                height: 40,
                width: 40,
                resizeMode: 'cover',
              }}
            />
            {/* <View style={styles.Img}>
              <Image source={require('../../Assets/Images/circle.png')} />
            </View> */}
          </Pressable>
        ) : null}

        {messageType == 'Image' ? (
          <Image
            source={{uri: massage}}
            style={{
              height: 200,
              width: 180,
              borderRadius: 6,
              borderWidth: 4,
              marginLeft: 10,
              borderColor: COLORS.white,
            }}
          />
        ) : messageType == 'Agreement' ? (
          <>
            <Pressable
              onPress={() =>
                NavigationService.navigate('AgreementSingle', {
                  pdfdoc: massage,
                  remoteID: props.remoteId,
                  pdfiD: item.pdfID,
                })
              }
              style={[
                styles.pdfView,
                {
                  backgroundColor: sender ? COLORS.buttonColor : COLORS.dark11,
                },
              ]}>
              {type == 'Agreement' ? (
                <Text
                  style={{
                    color: 'grey',
                    position: 'absolute',
                    top: 0,
                    left: 15,
                    fontSize: moderateScale(12),
                    fontFamily: FONTS.medium,
                  }}>
                  Agreement
                </Text>
              ) : null}

              <Text
                style={[
                  styles.pdfText,
                  {
                    width: '70%',
                  },
                ]}>
                
              { item.profileType == 'Influencer' ? 'I have sent you an offer for your approval.' : 
               'Thanks for your offer. I accept your offer.'
              }
              </Text>
              <Icon
                name="file-pdf-o"
                type="FontAwesome"
                style={styles.iconStyle}
              />
            </Pressable>
          </>
        ) : (
          <View
            style={[
              styles.masBox,
              {
                // borderWidth: 1,
                backgroundColor: sender ? COLORS.buttonColor
               :
                COLORS.gray33,
                borderBottomLeftRadius: sender ? 16 : 0,
                borderBottomRightRadius: sender ? 0 : 16,
                borderWidth:massage == 'Thanks for your offer. Currently I cannot agree with your offer.' ? 
                3:0,
                borderColor:massage == 'Thanks for your offer. Currently I cannot agree with your offer.' ? 'red' : 'grey'
              },
            ]}>

            <Text
              style={{
                paddingLeft: 5,
                color: sender ? COLORS.white : '#0C0020',
                fontFamily: FONTS.medium,
                fontSize: 12,
                lineHeight: moderateScale(15),
                
              }}>
              {massage}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          alignSelf: sender ? 'flex-end' : 'flex-start',
          marginLeft: sender ? 15 : 65,
          marginRight: 15,
        }}>
        <Text style={{...styles.timeText, color: colors.primaryThemeColor}}>
          {moment(time).format('hh:mm a')}
        </Text>
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
    top:22,
    left:22,
  },
  time: {
    alignSelf: 'flex-end',
  },
  timeText: {
    fontFamily: 'Montserrat-Regular',
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
    width:210,
    backgroundColor: COLORS.dark11,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // paddingHorizontal:moderateScale(6),
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: moderateScale(10),
  },
  iconStyle: {
    marginRight: moderateScale(6),
    fontSize: moderateScale(30),
    color: 'red',
    // marginTop: moderateScale(10),
  },
  pdfText: {
    fontSize: moderateScale(13),
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginVertical: moderateScale(10),
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
    height: verticalScale(40),
    width: moderateScale(80),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryThemeColor,
    borderRadius: 30,
  },
  btnText: {
    fontSize: moderateScale(14),
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
});

export default MsgComponent;
