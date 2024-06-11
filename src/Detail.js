import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function Detail({route, navigation}) {
  const {uid} = route.params;
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');

  const saveDetails = async () => {
    try {
      await firestore().collection('users').doc(uid).set({
        name,
        dob,
        gender,
      });
      // After saving details, navigate to Dashboard
      navigation.navigate('Dashboard');
    } catch (error) {
      console.log('Error saving details: ', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Enter your details</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Date of Birth"
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      <TouchableOpacity style={styles.btn} onPress={saveDetails}>
        <Text style={styles.textBtn}>Save Details</Text>
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
