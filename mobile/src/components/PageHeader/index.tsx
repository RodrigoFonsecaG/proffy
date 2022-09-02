import React, { ReactNode } from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';
import {
  BorderlessButton,
  GestureHandlerRootView
} from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';

interface PageHeaderProps {
  title: string;
  children?: any;
  headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  children,
  headerRight
}) => {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate('Landing');
  }

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>

        <Image source={logoImg} resizeMode="contain" />
      </GestureHandlerRootView>
      <GestureHandlerRootView style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </GestureHandlerRootView>
      {children}
    </View>
  );
};

export default PageHeader;
