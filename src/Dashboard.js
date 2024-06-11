import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export default function Dashboard() {
  const navigation = useNavigation();

  const handlerLogout = async () => {
    try {
      await auth().signOut();

      //Reset the navigation stack to 'Login' and remove the OTP-related screens
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      console.log('Error during logout: ', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Welcome to the Dashboard</Text>
      <TouchableOpacity style={styles.btn} onPress={handlerLogout}>
        <Text style={styles.textBtn}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#BEBDB8',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 150,
  },
  title: {
    marginBottom: 20,
    fontSize: 18,
  },
  textInput: {
    height: 50,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  btn: {
    backgroundColor: '#841584',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  textBtn: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
