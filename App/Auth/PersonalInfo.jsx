//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Image, TextInput, Pressable, Alert, } from 'react-native';
import { moderateScale, verticalScale } from '../Components/PixalRatio/index';
import { COLORS } from '../Constants/Color';
import { Font } from '../Constants/FontFamily';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Card, Icon } from 'react-native-basic-elements';
import { Global_Style } from '../Constants/GlobalStyle';
import Toast from 'react-native-simple-toast';
import { useDispatch,useSelector } from 'react-redux';
import { setPersonalInfo, setuser } from '../Redux/reducer/User';
import NavigationService from '../Service/Navigation';

const { height, width } = Dimensions.get('window');

// create a component
const PersonalInfo = () => {
    const {userInfo} = useSelector((state)=>state.User)
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastname] = useState('')
    const [address, setAddress] = useState('')
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [addressError, setAddressError] = useState('');

    const dispatch = useDispatch();

    useEffect(()=>{
        if (userInfo != null) {
            setFirstName(userInfo.firstname)
            setLastname(userInfo.lastname)
            setAddress(userInfo.address)
        }
    },[])
    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z]{2,50}$/;
        return nameRegex.test(name);
    };

    const validateAddress = (address) => {
        return address.length >= 10;
    };
    const handleFirstNameChange = (text) => {
        setFirstName(text);
        if (!validateName(text)) {
          setFirstNameError('First name should only contain alphabets (2-50 characters)');
        } else {
          setFirstNameError('');
        }
      };
    
      const handleLastNameChange = (text) => {
        setLastname(text);
        if (text !== '' && !validateName(text)) {
          setLastNameError('Last name should only contain alphabets');
        } else {
          setLastNameError('');
        }
      };
    
      const handleAddressChange = (text) => {
        setAddress(text);
        if (!validateAddress(text)) {
          setAddressError('Address should be at least 10 characters long');
        } else {
          setAddressError('');
        }
      };
    const gotoNext = (type) => {
        if (validateName(firstname) && (lastname === '' || validateName(lastname)) && validateAddress(address)) {
            let data = {
                firstname:firstname,
                lastname:lastname,
                address:address
            }
            if (type == 'save') {
                dispatch(setPersonalInfo(data));
                Toast.show('Data Saved');
            } else {
                dispatch(setPersonalInfo(data));
                Toast.show('Data Saved');
                NavigationService.navigate('formThree')
            }
        }else{
            Toast.show('Invalid Form Details')
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.white}
                barStyle="dark-content"
                translucent={false}
            />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <Text
                    style={{
                        ...styles.boldtext,
                        marginTop: moderateScale(10),
                        color: COLORS.deepDark,
                    }}>
                    Welcome, {'\n'}
                    Form Two
                </Text>

                <Text
                    style={{
                        ...styles.text,
                        marginTop: moderateScale(20),
                        marginHorizontal: moderateScale(15),
                    }}>
                    update your account
                </Text>

                <Card style={styles.cardview}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Your Firstname"
                        placeholderTextColor={COLORS.gray33}
                        onChangeText={value => handleFirstNameChange(value)}
                        value={firstname}
                    />
                    <View style={styles.border} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Your Lastname"
                        placeholderTextColor={COLORS.gray33}
                        onChangeText={value => handleLastNameChange(value)}
                        value={lastname}
                    />
                    <View style={styles.border} />

                    <TextInput
                        style={styles.input}
                        placeholder="Enter Your Address"
                        placeholderTextColor={COLORS.gray33}
                        onChangeText={value => handleAddressChange(value)}
                        value={address}
                    />
                </Card>
                {firstname && firstNameError !=='' ?(
                    <View style={{ marginHorizontal: 15 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 5,
                                    alignItems: 'center',
                                }}>
                                
                                    <Icon name="cross" type="Entypo" color={'red'} size={19} />
                                <Text
                                    style={{
                                        color: 'red',
                                        marginLeft: 10,
                                    }}>
                                    {firstNameError}
                                </Text>
                            </View>
                    </View>
                ) : null}
                 {lastname && lastNameError !=='' ?(
                    <View style={{ marginHorizontal: 15 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 5,
                                    alignItems: 'center',
                                }}>
                                
                                    <Icon name="cross" type="Entypo" color={'red'} size={19} />
                                <Text
                                    style={{
                                        color: 'red',
                                        marginLeft: 10,
                                    }}>
                                    {lastNameError}
                                </Text>
                            </View>
                    </View>
                ) : null}
                {address && addressError !=='' ?(
                    <View style={{ marginHorizontal: 15 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 5,
                                    alignItems: 'center',
                                }}>
                                
                                    <Icon name="cross" type="Entypo" color={'red'} size={19} />
                                <Text
                                    style={{
                                        color: 'red',
                                        marginLeft: 10,
                                    }}>
                                    {addressError}
                                </Text>
                            </View>
                    </View>
                ) : null}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <Pressable
                        onPress={() => NavigationService.back()}
                        style={{
                            ...Global_Style.button,
                            backgroundColor: COLORS.lightBlue,
                            height: verticalScale(42),
                            width: '40%',
                            marginTop: moderateScale(20),
                            borderRadius: 30,
                        }}>
                        <Text style={styles.signText}>Back</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => gotoNext('save')}
                        style={{
                            ...Global_Style.button,
                            backgroundColor: COLORS.primaryYellow,
                            height: verticalScale(42),
                            width: '40%',
                            marginTop: moderateScale(20),
                            borderRadius: 30,
                        }}>
                        <Text style={styles.signText}>Save</Text>
                    </Pressable>
                </View>
                <Pressable
                    onPress={() => gotoNext('next')}
                    style={{
                        ...Global_Style.button,
                        backgroundColor: COLORS.primaryYellow,
                        height: verticalScale(42),
                        width: '90%',
                        marginTop: moderateScale(20),
                        borderRadius: 30,
                    }}>
                    <Text style={styles.signText}>Save & Next</Text>
                </Pressable>
            </KeyboardAwareScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.whiteShed,
    },
    boldtext: {
        fontSize: moderateScale(18),
        color: COLORS.dark11,
        fontFamily: Font.Bold,
        marginHorizontal: moderateScale(15),
    },
    iconStyle: {
        fontSize: moderateScale(18),
        alignSelf: 'center',
        color: COLORS.primaryYellow,
        paddingRight: moderateScale(10)
    },
    text: {
        color: COLORS.gray2,
        fontFamily: Font.Regular,
        fontSize: moderateScale(12),
    },
    input: {
        height: 60,
        marginHorizontal: moderateScale(10),
        color: COLORS.black
    },
    cardview: {
        width: '90%',
        alignSelf: 'center',
        marginTop: moderateScale(25),
        borderRadius: moderateScale(8),

    },
    border: {
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.gray33,
        opacity: 0.6,
    },
    signText: {
        fontSize: moderateScale(12),
        fontFamily: Font.Bold,
        color: COLORS.white,
    },

});


//make this component available to the app
export default PersonalInfo;
