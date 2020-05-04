import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert, FlatList} from 'react-native';
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

const renderListItem = (listLength, itemData) => (
    <View style={styles.list}>
        <Text style={styles.listText}>#{listLength - itemData.index} : </Text>
        <Text style={styles.listText}>{itemData.item}</Text>
    </View>
);

const GameScreen = props => {
    const initialGuess = genRandNumBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses,setPastGuesses] = useState([initialGuess.toString()]);
    const currentMin = useRef(1);
    const currentMax = useRef(100);

    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
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
            currentMin.current = currentGuess + 1;
        }
        const nextNumber = genRandNumBetween(currentMin.current, currentMax.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.btnContainer}>
                <Button onPress={nextGuessHandler.bind(this, 'lower')} title={'LOWER'}/>
                <Button onPress={nextGuessHandler.bind(this, 'greater')} title={'GREATER'}/>
            </Card>
            <View style={styles.listview}>
                <FlatList keyExtractor={(item) => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} />
            </View>
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
    listview: {
        marginTop: 20,
        flex: 1,
        width: '50%',
    },
    list: {
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 12,
        padding: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    listText: {
        fontSize: 15,
    },
});

export default GameScreen;
