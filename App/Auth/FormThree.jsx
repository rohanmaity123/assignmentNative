//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Image, TextInput, Pressable, Alert, Modal, } from 'react-native';
import { moderateScale, verticalScale } from '../Components/PixalRatio/index';
import { COLORS } from '../Constants/Color';
import { Font } from '../Constants/FontFamily';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Card, Icon } from 'react-native-basic-elements';
import { Global_Style } from '../Constants/GlobalStyle';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setContactlInfo, setPersonalInfo, setuser } from '../Redux/reducer/User';
import NavigationService from '../Service/Navigation';
import { Picker, CheckBox } from 'react-native-basic-elements';

const { height, width } = Dimensions.get('window');

// create a component
const FormThree = () => {
    const { contactInfo,userInfo,userData } = useSelector((state) => state.User)

    const [phoneno, setPhoneNumber] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [termCondition, setTermsCondition] = useState(false)
    const [phonenoError, setPhonenoError] = useState('');
    const [modalVisible, setModalVisible] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        if (contactInfo != null) {
            setPhoneNumber(contactInfo.phoneno)
            setCountryCode(contactInfo.countryCode)
        }
    }, [])

    const validatePhoneNo = (phoneno) => {
        return phoneno.length >= 10;
    };


    const handlePhoneNoChange = (text) => {
        setPhoneNumber(text);
        if (!validatePhoneNo(text)) {
            setPhonenoError('Allow only 10 digit numeric phone number');
        } else {
            setPhonenoError('');
        }
    };
    const gotoNext = (type) => {
        if (!termCondition) {
           return Toast.show('Please Accept Terms & Condition');
        }
        if (validatePhoneNo(phoneno) && countryCode !== '' && termCondition == true) {
            let data = {
                phoneno: phoneno,
                countryCode: countryCode,
            }
            if (type == 'save') {
                dispatch(setContactlInfo(data));
                Toast.show('Data Saved');
                setModalVisible(true)
            } else {
                dispatch(setContactlInfo(data));
                Toast.show('Data Saved');
                setModalVisible(true)
            }
        } else {
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
                    Form Three
                </Text>

                <Text
                    style={{
                        ...styles.text,
                        marginTop: moderateScale(20),
                        marginHorizontal: moderateScale(15),
                    }}>
                    update your Contact Details
                </Text>

                <Card style={styles.cardview}>
                    <Picker
                        options={[
                            {
                                label: 'India(+91)',
                                value: '+91'
                            },
                            {
                                label: 'America(+1)',
                                value: '+1'
                            },
                        ]}
                        placeholder="Country Code"
                        textStyle={{
                            fontSize: 15
                        }}
                        selectedValue={countryCode}
                        onValueChange={(val) => setCountryCode(val)}
                    />
                    <View style={styles.border} />
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={10}
                        placeholder="Enter Your Phone Number"
                        placeholderTextColor={COLORS.gray33}
                        onChangeText={value => handlePhoneNoChange(value)}
                        value={phoneno}
                    />
                </Card>
                <View style={{ flexDirection: 'row', padding: 20 }}>
                    <CheckBox
                        checked={termCondition}
                        onChange={() => setTermsCondition(!termCondition)}
                        size={25}
                    />
                    <Text
                        style={{ fontWeight: 'bold' }}
                    > Accept Terms & Condition</Text>
                </View>
                {phoneno && phonenoError !== '' ? (
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
                                {phonenoError}
                            </Text>
                        </View>
                    </View>
                ) : null}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                }}>
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
                    disabled={true}
                    onPress={() => gotoNext('next')}
                    style={{
                        ...Global_Style.button,
                        backgroundColor: COLORS.gray1,
                        height: verticalScale(42),
                        width: '90%',
                        marginTop: moderateScale(20),
                        borderRadius: 30,
                    }}>
                    <Text style={styles.signText}>Save & Next</Text>
                </Pressable>
            </KeyboardAwareScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.pointingText}>Email Id: <Text style={styles.valueText}>{userData.email}</Text></Text>
                        <Text style={styles.pointingText}>Password: <Text style={styles.valueText}>{userData.password}</Text></Text>
                        <Text style={styles.pointingText}>First Name: <Text style={styles.valueText}>{userInfo.firstname}</Text></Text>
                        <Text style={styles.pointingText}>Last Name: <Text style={styles.valueText}>{userInfo.lastname}</Text></Text>
                        <Text style={styles.pointingText}>Address: <Text style={styles.valueText}>{userInfo.address}</Text></Text>
                        <Text style={styles.pointingText}>Country Code: <Text style={styles.valueText}>{contactInfo.countryCode}</Text></Text>
                        <Text style={styles.pointingText}>Phone No: <Text style={styles.valueText}>{contactInfo.phoneno}</Text></Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={{textAlign:'center',fontWeight:'bold'}}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
    pointingText: {
        fontSize: moderateScale(18),
        color: COLORS.dark11,
        fontWeight:'bold',
        marginTop:5
    },
    valueText: {
        fontSize: moderateScale(18),
        color: COLORS.gray11,
        marginTop:5
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#000000ab'
    },
    modalView: {
        height:'50%',
        width:'90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        alignSelf:'center',
        marginTop:20,
        width:100
    },
});

//make this component available to the app
export default FormThree;
