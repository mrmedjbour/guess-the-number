import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import colors from "../components/colors";

const GameOver = props => {
    return (
        <View style={styles.screen}>
            <Text>The Game Is Over!</Text>
            <Text>Number of Rounds: {props.roundsNumber} </Text>
            <Text>Number was: {props.userNumber}</Text>
            <Button onPress={props.onRestart} title={'Start New Game'} color={colors.accent} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GameOver;