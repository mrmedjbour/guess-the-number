import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Card from "../components/Card";
import colors from '../components/colors';
import Input from "../components/Input";

const StartGameScreen = props => {
    const [value, setValue] = useState('');

    const numberInputHandler = inputValue => {
        setValue(inputValue.replace(/[^0-9]/g, ''));
    };

    return (
        <View style={styles.screen}>
            <Text>Start New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text style={styles.title}>Select a Number</Text>
                <Input keyboardType={'number-pad'} maxLength={2} autoCorrect={false} autoCapitalize={'none'} blurOnSubmit onChangeText={numberInputHandler} value={value} style={styles.input}/>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button title={'Reset'} color={colors.accent} onPress={() => {
                    }}/></View>
                    <View style={styles.button}><Button title={'Confirm'} color={colors.primary} onPress={() => {
                    }}/></View>
                </View>
            </Card>
        </View>
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
});

export default StartGameScreen;