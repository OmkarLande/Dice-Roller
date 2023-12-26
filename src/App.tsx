import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import React, {useState, useRef} from 'react';
import type {PropsWithChildren} from 'react';
import ReactNativeHapticFeedback  from "react-native-haptic-feedback";

import DiceOne from '../assets/One.png';
import DiceTwo from '../assets/Two.png';
import DiceThree from '../assets/Three.png';
import DiceFour from '../assets/Four.png';
import DiceFive from '../assets/Five.png';
import DiceSix from '../assets/Six.png';

type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType;
}>;

const Dice = ({imageUrl}: DiceProps): JSX.Element => {
  return (
    <View>
      <Image style={styles.diceImage} source={imageUrl} />
    </View>
  );
};

// Optional configuration
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function App(): JSX.Element {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne);
  const rotationValue = useRef(new Animated.Value(0)).current;

  const rollDice = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    let newImage: ImageSourcePropType;
    switch (randomNumber) {
      case 1:
        newImage = DiceOne;
        break;
      case 2:
        newImage = DiceTwo;
        break;
      case 3:
        newImage = DiceThree;
        break;
      case 4:
        newImage = DiceFour;
        break;
      case 5:
        newImage = DiceFive;
        break;
      case 6:
        newImage = DiceSix;
        break;
      default:
        newImage = DiceOne;
        break;
    }

    // rotation animation
    Animated.timing(rotationValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setDiceImage(newImage);
      rotationValue.setValue(0);
    });

    // Trigger haptic feedback
    ReactNativeHapticFeedback.trigger("impactHeavy", options);  };

  const rotateInterpolation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyles = {
    transform: [{rotate: rotateInterpolation}],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.diceContainer, animatedStyles]}>
        <Dice imageUrl={diceImage} />
      </Animated.View>
      <Pressable onPress={rollDice}  style={styles.btnContainer}>
        <Text style={styles.rollBtnText}>Roll the Dice</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  diceImage: {
    width: 300,
    height: 300,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fbfbfb',
  },
  diceContainer: {
    alignItems: 'center',
  },
  btnContainer: {
    margin: 52,
  },
  rollBtnText: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#E5E0FF',
  },
});
