import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import Card from "../components/Card";
import colors from '../components/colors';
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = props => {
    const [value, setValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNum, setSelectedNum] = useState();

    const numberInputHandler = inputValue => {
        setValue(inputValue.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setValue('');
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(value);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', [{text: 'Okey', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }
        setConfirmed(true);
        setSelectedNum(chosenNumber);
        setValue('');
    };

    let confirmOutput;

    if (confirmed) {
        confirmOutput = (
            <Card style={styles.summary}>
                <Text>Chosen Number</Text>
                <NumberContainer>{selectedNum}</NumberContainer>
                <Button title={'START GAME'}/>
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text>Start New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text style={styles.title}>Select a Number</Text>
                    <Input keyboardType={'number-pad'} maxLength={2} autoCorrect={false} autoCapitalize={'none'} blurOnSubmit onChangeText={numberInputHandler} value={value} style={styles.input}/>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title={'Reset'} color={colors.accent} onPress={resetInputHandler}/></View>
                        <View style={styles.button}><Button title={'Confirm'} color={colors.primary} onPress={confirmInputHandler}/></View>
                    </View>
                </Card>
                {confirmOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        paddingTop: 5,
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width: 100,
    },
    input: {
        width: 100,
        textAlign: 'center',
    },
    summary: {
        marginTop: 20,

    },
});

export default StartGameScreen;