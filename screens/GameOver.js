import React from 'react';
import {View, Text, Button, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import colors from "../components/colors";

const GameOver = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={styles.title}>The Game Is Over <FontAwesome name={'exclamation'} size={18} color={'black'}/> </Text>
                <View style={styles.imageConatiner}>
                    <Image source={require('../assets/game-over.png')} style={styles.image} resizeMode={'cover'}/>
                </View>
                <Text style={styles.textSummry}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></Text>
                <Button onPress={props.onRestart} title={'Start New Game'} color={colors.accent} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: Dimensions.get('window').height / 15,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    highlight: {
        color: colors.accent,
    },
    textSummry: {
        fontSize: 15,
        padding: 15,
        textAlign: 'center',
    },
    imageConatiner: {
        width: Dimensions.get('window').width > 500 ? Dimensions.get('window').width * 0.4 : Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width > 500 ? Dimensions.get('window').width * 0.4 : Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width > 500 ? Dimensions.get('window').width * 0.4 / 2 : Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default GameOver;