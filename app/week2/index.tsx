import { Body } from '@/components/Body';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Week2Screen() {
  return (
    <SafeAreaProvider>
      <View style={styles.screen}>
        <Header />
        <View style={styles.bodyWrap}>
          <Body />
        </View>
        <Footer />
      </View>
    </SafeAreaProvider>
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
