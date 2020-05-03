import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";

export default function App() {
    const [userNumber, setUserNumber] = useState();

    const startGameHandler = (selectedNum) => {
        setUserNumber(selectedNum);
    };

    let screen = <StartGameScreen onStartGame={startGameHandler}/>;

    if (userNumber) {
        screen = <GameScreen userChoice={userNumber}/>;
    }

    return (
        <View style={styles.screen}>
            <Header title={'Guess The Number'}/>
            {screen}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
});
