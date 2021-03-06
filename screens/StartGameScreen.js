import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView} from 'react-native';
import Card from "../components/Card";
import colors from '../components/colors';
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = props => {
    const [value, setValue] = useState('');
    const [devWidth, setdevWidth] = useState(Dimensions.get('window').width);
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNum, setSelectedNum] = useState();

    useEffect(() => {
        const updateDevWidth = () => {
            setdevWidth(Dimensions.get('window').width);
        };

        Dimensions.addEventListener('change', updateDevWidth);

        return () => {
            Dimensions.removeEventListener('change', updateDevWidth);
        }

    });

    const numberInputHandler = inputValue => {
        setValue(inputValue.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setValue('');
        setConfirmed(false);
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
        Keyboard.dismiss();
    };

    let confirmOutput;

    if (confirmed) {
        confirmOutput = (
            <Card style={styles.summary}>
                <Text>Chosen Number</Text>
                <NumberContainer>{selectedNum}</NumberContainer>
                <Button title={'START GAME'} onPress={() => props.onStartGame(selectedNum)}/>
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <ScrollView>
                <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={30}>
                    <View style={styles.screen}>
                        <Text style={styles.walcome}>Start New Game!</Text>
                        <Card style={styles.inputContainer}>
                            <Text style={styles.title}>Select a Number</Text>
                            <Input keyboardType={'number-pad'} maxLength={2} autoCorrect={false} autoCapitalize={'none'} blurOnSubmit onChangeText={numberInputHandler} value={value} style={styles.input}/>
                            <View style={styles.buttonContainer}>
                                <View style={{width: devWidth / 4}}><Button title={'Reset'} color={colors.accent} onPress={resetInputHandler}/></View>
                                <View style={{width: devWidth / 4}}><Button title={'Confirm'} color={colors.primary} onPress={confirmInputHandler}/></View>
                            </View>
                        </Card>
                        {confirmOutput}
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    walcome: {
        color: colors.accent,
        fontSize: 27,
        marginVertical: 20,
        fontFamily: 'open-sans-bold',
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
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
        // width: 100,
        width: Dimensions.get('window').width / 4,
        // width: '40%',
    },
    input: {
        width: 100,
        textAlign: 'center',
        fontSize: 20,
    },
    summary: {
        marginTop: 20,
        alignItems: 'center',

    },
});

export default StartGameScreen;