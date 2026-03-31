import { StyleSheet, Text, View, Image, ImageBackground, ImageStyle, TouchableOpacity, Linking } from 'react-native';
import background from '../../assets/background.png';
import name from '../../assets/name.png';
import ticket from '../../assets/ticket.png';
import star from '../../assets/star.png';
import cat from '../../assets/cat.png';
import instagram from '../../assets/instagram.png';
import github from '../../assets/github.png';
import velog from '../../assets/velog.png';
import siri from '../../assets/siri.png';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';


SplashScreen.preventAutoHideAsync();


export default function Week1Screen() {
  const [fontsLoaded] = useFonts({
    'Candal': require('../../assets/fonts/Candal-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("URL을 열 수 없어요!", err));
  };


  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground source={background} style={styles.background}>
        <Image source={ticket} style={styles.ticket as ImageStyle} />
        <Image source={star} style={{ width: 75, height: 82, position: 'absolute', top: 50, right: 0 }} />
        <Image source={cat} style={{ width: 100, height: 100, position: 'absolute', bottom: 0, right: 0, top: 300 }} />


        <View style={styles.mainWrapper}>
          <View style={styles.centerContainer}>
            <Image source={name} style={styles.name as ImageStyle} />
            <Text style={styles.connectText}>Let's Connect</Text>
          </View>

          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconBackground}
              onPress={() => handlePress('https://www.instagram.com/yuvvinn?igsh=MWtwcGdjOXV2ZXc1MQ%3D%3D&utm_source=qr')}>
              <Image source={instagram} style={styles.iconImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBackground}
              onPress={() => handlePress('https://github.com/yuvvinn')}>
              <Image source={github} style={styles.iconImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBackground}
              onPress={() => handlePress('https://velog.io/@yuvvinn/posts')}>
              <Image source={velog} style={{width:37, height:37}} />
            </TouchableOpacity>
          </View>

          <Text style={styles.contactInfo}>010-3856-2549 | iyubin284@gmail.com</Text>

        </View>

        <View style={styles.siriSection}>
          <View style={styles.bubbleRight}><Text style={styles.bubbleText}>Hey Siri, Show me the best FE developer in the world?</Text></View>
          <View style={styles.bubbleLeft}><Text style={styles.bubbleText}>Sure thing, they're on your screen now.</Text></View>
          <Image source={siri} style={styles.siriIcon as ImageStyle} />
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },


  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 11,
  },


  name: {
    width: 400,
    height: 200,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',

  },

  connectText: {
    color: '#B54F8A',
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'Candal',
    fontWeight: '400',
    lineHeight: 40,
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 4,
  },

  mainWrapper: {
    position: 'absolute',
    top: 140,
    alignItems: 'center',
    gap: 30,
  },


  ticket: {
    width: 189,
    height: 91,
    top: 40,
    alignItems:'flex-start',
    position: 'absolute',
    left  : 0,

  },

  iconRow: {
    flexDirection: 'row',
    gap: 15,
  },

  iconBackground: {
    backgroundColor: '#E7E4E4',
    borderRadius: 16,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

  },


  iconImage: {
    width: 47,
    height: 47,
  },


  contactInfo: {
    color: '#C3679C',
    textAlign: 'center',
    fontFamily: 'Candal',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,

    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },

  siriSection: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    alignItems: 'center',
    gap: 26,
  },
  bubbleRight: {
    backgroundColor: '#E67BB8',
    padding: 15,
    borderRadius: 20,
    alignSelf: 'flex-end',
    width: 239,
  },
  bubbleLeft: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
    width:219,
    height:74,
  },
  bubbleText: { fontSize: 17, color: '#333' },
  siriIcon: { width: 60, height: 60, marginTop: 10 },


});
