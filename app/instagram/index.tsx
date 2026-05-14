import { StyleSheet, View } from 'react-native';

import { Body } from '@/src/features/instagram/components/Body';
import { Footer } from '@/src/features/instagram/components/Footer';
import { Header } from '@/src/features/instagram/components/Header';

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
