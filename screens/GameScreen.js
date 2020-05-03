import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

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
    const [rounds,setRounds] = useState(0);
    const currentMin = useRef(1);
    const currentMax = useRef(100);

    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t Cheat!!', 'You Know that this is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
            return;
        }
        if (direction === 'lower') {
            currentMax.current = currentGuess;
        } else {
            currentMin.current = currentGuess;
        }
        const nextNumber = genRandNumBetween(currentMin.current, currentMax.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.btnContainer}>
                <Button onPress={nextGuessHandler.bind(this, 'lower')} title={'LOWER'}/>
                <Button onPress={nextGuessHandler.bind(this, 'greater')} title={'GREATER'}/>
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
