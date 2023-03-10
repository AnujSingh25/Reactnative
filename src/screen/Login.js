import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, Text, View, StyleSheet, Pressable, Alert, KeyboardAvoidingView, Image } from "react-native";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const Login = (props) => {

    const [showComp, setShowComp] = useState(true)
    const Navigation = useNavigation()
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const onBack = useIsFocused()

    const [orientation, setOrientation] = useState("PORTRAIT");
    const size = orientation == "PORTRAIT"

    useEffect(() => {
        Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            if (width < height) {
                setOrientation("PORTRAIT")
            } else {
                setOrientation("LANDSCAPE")

            }
        })

    }, []);

    const clearData = () => {
        setName('')
    }

    useEffect(() => {
        if (onBack == true) {
            clearData()
        }
    }, [onBack])

    const checkTextInput = async () => {

        if (name == "" || name == " ") {
            Alert.alert("First Enter Only Your Name for Login  _________________ 😎 ________________ ")
        } else {
            await AsyncStorage.setItem("userIdName", JSON.stringify(name))
            Navigation.navigate("Root")
        }
    }

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', }}>

            <View style={{ height: '100%', width: '100%', }}>

                <View style={style.loginContainer}>

                    <Image source={require('../Constants/Images/cat.gif')}
                        style={{ height: 120, width: 120, resizeMode: 'contain' }} a
                    />

                    <Text style={{ color: 'white', fontSize: 26 }}>Hello ! 🌻</Text>
                    <Text style={{ color: 'white', fontSize: 26 }}>{name}</Text>

                </View>

                <View style={{
                    backgroundColor: '#85586F', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center'
                    , height: '5%'
                }}>

                    <Pressable onPress={() => {
                        setShowComp(!showComp)
                        setName("")
                    }} >
                        <Text style={{ fontSize: 20, color: 'white' }}>Login</Text>
                    </Pressable>

                    <Pressable onPress={() => {
                        setShowComp(!showComp)
                        setName("")
                    }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>SignUp</Text>
                    </Pressable>

                </View>

                <View style={{ backgroundColor: '#D0B8A8', height: '50%' }}>

                    <View style={showComp ? { flexDirection: 'row', backgroundColor: '#85586F', justifyContent: 'flex-end', paddingRight: 69 }
                        : { flexDirection: 'row', backgroundColor: '#85586F', paddingLeft: 69 }}>

                        {showComp ? null : (<View style={{
                            borderRadius: 40, borderColor: 'white', borderWidth: 30,
                            marginTop: 10, marginBottom: -20
                        }}></View>
                        )}

                        {showComp ? (<View style={{
                            borderRadius: 40, borderColor: 'white', borderWidth: 30,
                            marginTop: 10, marginBottom: -20,
                        }}></View>
                        ) : null}

                    </View>

                    <KeyboardAvoidingView style={{
                        backgroundColor: 'white', width: '90%', marginTop: -30, borderRadius: 10, justifyContent: 'center', padding: 10,
                        alignSelf: 'center', shadowColor: 'black', elevation: 15
                    }}>

                        <TextInput
                            placeholder="Email"
                            style={{ backgroundColor: 'transparent' }}
                            left={<TextInput.Icon icon={"email"} />}
                            value={name}
                            onChangeText={showComp ? ((userName) => {
                                setName(userName)
                            }) : ((userName) => {
                                setName(userName)
                            })}
                        />
                        <TextInput
                            placeholder="Password"
                            style={{ backgroundColor: 'transparent' }}
                            left={<TextInput.Icon icon={"lock"} />}
                            onChangeText={showComp ? ((userPass) => setPass(userPass)) : ((userPass) => setPass(userPass))}
                        />
                        {showComp ? (<TextInput
                            placeholder="Confirm Password"
                            style={{ backgroundColor: 'transparent', }}
                            left={<TextInput.Icon icon={"lock"} />}
                        />
                        ) : null}

                        <Pressable style={{
                            backgroundColor: '#85586F', width: 150, shadowColor: 'black', elevation: 15, paddingVertical: 5,
                            alignSelf: 'center', borderRadius: 8, alignItems: 'center', marginTop: 10,
                        }}
                            onPress={checkTextInput}
                        >
                            {showComp ? (<Text style={{ color: 'white', padding: 2 }}>SignUp</Text>) : (<Text style={{ color: 'white', padding: 2 }}>Login</Text>)}

                        </Pressable>

                    </KeyboardAvoidingView>

                    <Pressable style={{ paddingTop: 10, alignSelf: 'center' }}>
                        <Text style={{ color: 'white', }}>Need Help ?</Text>
                    </Pressable>

                </View>

            </View>

        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    loginContainer: {
        backgroundColor: '#85586F',
        justifyContent: 'center',
        alignItems: 'center',
        height: '45%'
    },
    loginText: {
        fontSize: 18
    }
})
export default Login