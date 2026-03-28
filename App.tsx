import { StyleSheet, Text, View, Image, ImageBackground, ImageStyle, TouchableOpacity, Linking } from 'react-native';
import background from './assets/background.png';
import name from './assets/name.png';
import ticket from './assets/ticket.png';
import star from './assets/star.png';
import cat from './assets/cat.png';
import instagram from './assets/instagram.png';
import github from './assets/github.png';
import velog from './assets/velog.png';
import siri from './assets/siri.png';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';


SplashScreen.preventAutoHideAsync();


export default function App() {
  const [fontsLoaded] = useFonts({
    'Candal': require('./assets/fonts/Candal-Regular.ttf'),
  });

  // 2. 폰트 로드 완료 시 스플래시 화면 숨기기
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // 3. 폰트가 로딩되지 않았으면 아무것도 렌더링하지 않음
  if (!fontsLoaded) {
    return null;
  }

  //링크 여는 함수
  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("URL을 열 수 없어요!", err));
  };


  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground source={background} style={styles.background}>
        {/* //고정 이미지 */}
        <Image source={ticket} style={styles.ticket as ImageStyle} />
        <Image source={star} style={{ width: 75, height: 82, position: 'absolute', top: 50, right: 0 }} />
        <Image source={cat} style={{ width: 100, height: 100, position: 'absolute', bottom: 0, right: 0, top: 300 }} />


        {/* 이름, 텍스트  */}
        <View style={styles.mainWrapper}>
          <View style={styles.centerContainer}>
            <Image source={name} style={styles.name as ImageStyle} />
            <Text style={styles.connectText}>Let's Connect</Text>
          </View>

          {/* 아이콘 */}
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

          {/* info추가 */}
          <Text style={styles.contactInfo}>010-3856-2549 | iyubin284@gmail.com</Text>

        </View>

        {/* 하단 영역 */}
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
    gap: 11, // 
    // top: 180, // 전체적인 위치만 여기서 조절하세요
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
    fontSize: 32, // RN은 숫자만 적습니다.
    fontFamily: 'Candal', // ⚠️ 프로젝트에 폰트가 설치되어 있어야 적용됩니다.
    fontWeight: '400', 
    lineHeight: 40,
    // --- 텍스트 테두리(Stroke) 구현 ---
    // RN 기본 속성에는 테두리가 없어서 Shadow로 흉내냅니다 (iOS에서 더 잘 보임)
    textShadowColor: '#FFFFFF', // 테두리 색상 (#FFF)
    textShadowOffset: { width: -1, height: 1 }, // 테두리 두께 조절
    textShadowRadius: 4, // 피그마의 4px 반영 */
  },

  mainWrapper: {
    position: 'absolute',
    top: 140,           // 원래 centerContainer가 있던 높이
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
    justifyContent: 'center', // 아이콘을 세로 중앙에
    alignItems: 'center', // 아이콘을 가로 중앙에

    //그림자 설정
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
    color: '#C3679C',          // 메인 글자 색상
    textAlign: 'center',       // 텍스트 중앙 정렬
    fontFamily: 'Candal',      // 아까 설정한 Candal 폰트
    fontSize: 15,              // px 제거하고 숫자만
    fontWeight: '400',         // 따옴표 붙인 문자열
    lineHeight: 22,            // 줄 간격 (폰트보다 크므로 안 잘림)

    /* --- 테두리(Stroke) 효과 구현 --- */
    // RN은 테두리 속성이 없어서 그림자(Shadow)를 흰색으로 넓게 주어 테두리처럼 보이게 합니다.
    textShadowColor: '#FFFFFF', 
    textShadowOffset: { width: 0, height: 0 }, // 그림자 위치를 글자 정중앙에
    textShadowRadius: 4,
  },

  // 시리 섹션 (하단 고정)
  siriSection: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    alignItems: 'center',
    gap: 26,
  },
  bubbleRight: {
    backgroundColor: '#E67BB8', // 시안의 핑크색
    padding: 15,
    borderRadius: 20,
    alignSelf: 'flex-end',
    // maxWidth: '80%',
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



