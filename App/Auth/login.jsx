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
import { setuser } from '../Redux/reducer/User';
import NavigationService from '../Service/Navigation';

const { height, width } = Dimensions.get('window');

// create a component
const Login = () => {
    const {userData} = useSelector((state)=>state.User)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [hidePass, sethidePass] = useState(true)
    const [loader, setLoader] = useState(false)
    const [PasswordFocus, setPasswordFocus] = useState(false);
    const dispatch = useDispatch();
    const cheakPassword = isPasswordValid(pass).every(
        item => item.isValid == true,
    );

    useEffect(()=>{
        if (userData !=null) {
            setEmail(userData.email)
            setPass(userData.pass)
        }
    },[])
    function isPasswordValid(password) {
        const validationPoints = [];
        const lowercaseMatches = password.match(/[a-z]/g);
        if (!lowercaseMatches || lowercaseMatches.length < 2) {
            validationPoints.push({
                isValid: false,
                error: 'Password must contain at least two lowercase letters',
            });
        } else {
            validationPoints.push({
                isValid: true,
                error: 'Password must contain at least two lowercase letters',
            });
        }
        const uppercaseMatches = password.match(/[A-Z]/g);
        if (!uppercaseMatches || uppercaseMatches.length < 2) {
            validationPoints.push({
                isValid: false,
                error: 'Password must contain at least two uppercase letters',
            });
        } else {
            validationPoints.push({
                isValid: true,
                error: 'Password must contain at least two uppercase letters',
            });
        }
        const numberMatches = password.match(/[0-9]/g);
        if (!numberMatches || numberMatches.length < 2) {
            validationPoints.push({
                isValid: false,
                error: 'Password must contain at least two numbers',
            });
        } else {
            validationPoints.push({
                isValid: true,
                error: 'Password must contain at least two numbers',
            });
        }
        const specialCharMatches = password.match(/[!@#$%^&*]/g);
        if (!specialCharMatches || specialCharMatches.length < 2) {
            validationPoints.push({
                isValid: false,
                error: 'Password must contain at least two special characters (!@#$%^&*)',
            });
        } else {
            validationPoints.push({
                isValid: true,
                error: 'Password must contain at least two special characters (!@#$%^&*)',
            });
        }
        if (password.length < 8) {
            validationPoints.push({
                isValid: false,
                error: 'Password must be at least 8 characters long',
            });
        } else {
            validationPoints.push({
                isValid: true,
                error: 'Password must be at least 8 characters long',
            });
        }

        return validationPoints;
    }

    const userLogin = (type) => {
        let pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;
        let emailresult = pattern.test(email);
        if (!emailresult) {
            return Toast.show('Please Enter Valid Email')
        }
        if (pass == "") {
            return Toast.show('Please Enter Password')
        }
        if (!cheakPassword) {
            return Toast.show('Password Validation faild')
        }
        let data = {
            email: email,
            password: pass
        }
        if (type == 'save') {
            dispatch(setuser(data));
            Toast.show('Data Saved');
        }else{
            dispatch(setuser(data));
            Toast.show('Data Saved');
            NavigationService.navigate('PersonalInfo')
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
                <View style={styles.logoImgView}>
                    <Image
                        source={{ uri: 'https://www.carlogos.org/logo/Volkswagen-emblem-2014-1920x1080.png' }}
                        style={styles.logoImg}
                    />
                </View>
                <Text
                    style={{
                        ...styles.boldtext,
                        marginTop: moderateScale(10),
                        color: COLORS.deepDark,
                    }}>
                    Welcome, {'\n'}
                    Form One
                </Text>

                <Text
                    style={{
                        ...styles.text,
                        marginTop: moderateScale(20),
                        marginHorizontal: moderateScale(15),
                    }}>
                    Sign in to your account
                </Text>

                <Card style={styles.cardview}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Your Email"
                        placeholderTextColor={COLORS.gray33}
                        onChangeText={value => setEmail(value)}
                        value={email}
                    />
                    <View style={styles.border} />
                    <View
                        style={{
                            ...styles.input,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <TextInput
                            style={{ color: COLORS.black }}
                            placeholderTextColor={COLORS.gray33}
                            onChangeText={value => setPass(value)}
                            value={pass}
                            secureTextEntry={hidePass}
                            placeholder="Enter Your Password"
                            onFocus={() => setPasswordFocus(true)}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Pressable onPress={() => sethidePass(!hidePass)}>
                                <Icon
                                    name={hidePass ? 'eye-with-line' : 'eye'}
                                    type="Entypo"
                                    style={styles.iconStyle}
                                />
                            </Pressable>
                            <Text
                                style={{
                                    fontSize: moderateScale(12),
                                    color: COLORS.PrimaryOrange,
                                    fontFamily: Font.Bold,
                                }}>
                                {/* Forgot? */}
                            </Text>
                        </View>
                    </View>
                </Card>
                {!cheakPassword && PasswordFocus ? (
                    <View style={{ marginHorizontal: 15 }}>
                        {isPasswordValid(pass).map(item => (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 5,
                                    alignItems: 'center',
                                }}>
                                {item.isValid ? (
                                    <Icon
                                        name="check"
                                        type="AntDesign"
                                        color={'green'}
                                        size={17}
                                    />
                                ) : (
                                    <Icon name="cross" type="Entypo" color={'red'} size={19} />
                                )}
                                <Text
                                    style={{
                                        color: item.isValid ? 'green' : 'red',
                                        marginLeft: 10,
                                    }}>
                                    {item.error}
                                </Text>
                            </View>
                        ))}
                    </View>
                ) : null}
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
                    <Pressable
                        disabled={true}
                        style={{
                            ...Global_Style.button,
                            backgroundColor: COLORS.gray1,
                            height: verticalScale(42),
                            width: '40%',
                            marginTop: moderateScale(20),
                            borderRadius: 30,
                        }}>
                        <Text style={styles.signText}>Back</Text>
                    </Pressable>
                    <Pressable
                        onPress={()=>userLogin('save')}
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
                    onPress={()=>userLogin('next')}
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
    img: {
        resizeMode: 'center',
    },

    signText: {
        fontSize: moderateScale(12),
        fontFamily: Font.Bold,
        color: COLORS.white,
    },

    logoImgView: {
        paddingHorizontal: moderateScale(16),
        alignSelf: 'center',
        resizeMode: 'contain'

    },

    logoImg: {
        height: verticalScale(200),
        width: width,
        resizeMode: 'cover',
        marginBottom: moderateScale(20),
    },
});

//make this component available to the app
export default Login;
