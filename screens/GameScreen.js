import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import {Button} from "react-native-web";

const genRandNumBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randNum = Math.floor(Math.random() * (max - min)) + min;
    if (randNum === exclude) {
        return genRandNumBetween(min, max, exclude);
    } else {
        return randNum;
    }
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(genRandNumBetween(1, 100, props.userChoice));
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.btnContainer}>
                <Button onPress={() => {
                }} title={'LOWER'}/>
                <Button onPress={() => {
                }} title={'GREATER'}/>
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
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    },

});

export default GameScreen;
