import { StyleSheet, View } from 'react-native';

import { Body } from './components/Body';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export default function InstagramScreen() {
  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.bodyWrap}>
        <Body />
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bodyWrap: {
    flex: 1,
  },
});
