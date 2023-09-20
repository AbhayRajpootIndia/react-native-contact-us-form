import { ScrollView, Text, View, StyleSheet, Alert } from 'react-native';

import { TextInput, Button, HelperText } from 'react-native-paper';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setEmail,
  setMessage,
  setName,
  setNumber,
  validateAll,
} from '../store/redux/contactUsSlice';

function ErrorText({ isValid, label, message }) {
  if (message) {
    return (
      <View style={{ height: !isValid ? 30 : 20 }}>
        {!isValid && <HelperText type="error">{message}</HelperText>}
      </View>
    );
  }
  return (
    <View style={{ height: !isValid ? 30 : 20 }}>
      {!isValid && <HelperText type="error">{label} is invalid.</HelperText>}
    </View>
  );
}

export default function ContactUsScreen() {
  const dispatch = useDispatch();

  const isKeyboardVisible = useSelector(
    (state) => state.keyboard.isKeyboardVisible
  );

  const name = useSelector((state) => state.contactUs.name);
  const isNameValid = useSelector((state) => state.contactUs.isNameValid);

  const number = useSelector((state) => state.contactUs.number);
  const isNumberValid = useSelector((state) => state.contactUs.isNumberValid);

  const email = useSelector((state) => state.contactUs.email);
  const isEmailValid = useSelector((state) => state.contactUs.isEmailValid);

  const message = useSelector((state) => state.contactUs.message);
  const isMessageValid = useSelector((state) => state.contactUs.isMessageValid);

  const isFormValid = useSelector((state) => state.contactUs.isFormValid);

  const handleSubmit = () => {
    dispatch(validateAll());

    if (isFormValid) {
      Alert.alert(
        'Success',
        'API for sending the email will be implemented at this stage.'
      );
    } else {
      Alert.alert(
        'Couldnt send message',
        'One or more fields are invalid. Please check all the fields before submitting.'
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>{!isKeyboardVisible ? 'Contact Us' : ' '}</Text>

      <View style={styles.textInputContainer}>
        <TextInput
          mode="outlined"
          value={name}
          label="Full Name"
          placeholder="Enter your name"
          onChangeText={(text) => dispatch(setName({ name: text }))}
          error={!isNameValid}
        />
        <ErrorText label={'Name'} isValid={isNameValid} />
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          mode="outlined"
          value={number}
          label="Mobile Number"
          placeholder="Enter your number"
          onChangeText={(text) => dispatch(setNumber({ number: text }))}
          keyboardType="number-pad"
          maxLength={10}
          error={!isNumberValid}
        />
        <ErrorText label={'Mobile Number'} isValid={isNumberValid} />
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          mode="outlined"
          value={email}
          label="Email"
          placeholder="Enter your email"
          onChangeText={(text) => dispatch(setEmail({ email: text }))}
          error={!isEmailValid}
        />
        <ErrorText label={'Email'} isValid={isEmailValid} />
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          mode="outlined"
          multiline={true}
          value={message}
          label="Message"
          placeholder="Write a message"
          numberOfLines={5}
          onChangeText={(text) => dispatch(setMessage({ message: text }))}
          error={!isMessageValid}
        />
        <ErrorText
          message={'Message must be between 100-1000 words.'}
          isValid={isMessageValid}
        />
      </View>

      <Button
        mode="contained-tonal"
        style={styles.button}
        onPress={handleSubmit}
      >
        Submit
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 28,
    fontWeight: '400',
    marginVertical: 10,
    height: 40,
  },
  textInputContainer: {
    width: '80%',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
  },
});
