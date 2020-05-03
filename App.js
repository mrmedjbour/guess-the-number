import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded){
        return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
    }

    const NewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    };

    const startGameHandler = (selectedNum) => {
        setUserNumber(selectedNum);
        setGuessRounds(0);
    };

    const gameOverHandler = numOfRounds => {
        setGuessRounds(numOfRounds);
    };

    let screen = <StartGameScreen onStartGame={startGameHandler} />;

    if (userNumber && guessRounds <= 0) {
        screen = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
    }else if (guessRounds > 0) {
        screen = <GameOver roundsNumber={guessRounds} userNumber={userNumber} onRestart={NewGameHandler} />
    }

    return (
        <View style={styles.screen}>
            <Header title={'Guess The Number'}/>
            { screen }
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
});
