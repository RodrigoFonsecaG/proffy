import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';

const GiveClasses = () => {

      const { goBack } = useNavigation();

      function handleNavigateBack() {
          goBack();
      }
    
  return (
    <GestureHandlerRootView style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={giveClassesBgImage}
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web
        </Text>
          </ImageBackground>
          
          <RectButton onPress={handleNavigateBack} style={styles.okButton}>
              <Text style={styles.okButtonText}>Tudo bem!</Text>
          </RectButton> 
    </GestureHandlerRootView>
  );
};

export default GiveClasses;
