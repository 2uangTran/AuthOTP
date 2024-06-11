import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigation = useNavigation();

  const signInWithPhoneNumber = async () => {
    try {
      const comfirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log('Error sending code: ', error);
    }
  };
  const confirmCode = async () => {
    try {
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;

      //check if the user is new or existing
      const userDocument = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();

      if (userDocument.exists) {
        //User is existing, navigate to Dashboard
        navigation.navigate('Dashboard');
      } else {
        //User is new, navigate to Detail
        navigation.navigate('Detail', {uid: user.uid});
      }
    } catch (error) {
      console.log('Invalid code.', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        Phone Number Authentication Using Firebase
      </Text>
      {!confirm ? (
        <>
          <Text style={styles.title}> Enter your phone number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g, +1 650-555-3434"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity onPress={signInWithPhoneNumber} style={styles.btn}>
            <Text style={styles.textBtn}>Send Code</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 18,
            }}>
            {' '}
            Enter the code sent to your phone
          </Text>
          <TextIput
            style={styles.textInput}
            placeholder="Enter code"
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity onPress={confirmCode} style={styles.btn}>
            <Text style={styles.textBtn}>Confirm Code</Text>
          </TouchableOpacity>
        </>
      )}
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
    fontWeight: 'hold',
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
