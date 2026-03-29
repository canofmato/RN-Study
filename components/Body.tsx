import { StyleSheet, View } from 'react-native';

/** 포스트 본문(이미지, 액션바, 캡션 등) — 다음 커밋에서 구현 */
export function Body() {
  return <View style={styles.placeholder} />;
}

const styles = StyleSheet.create({
  placeholder: {
    minHeight: 1,
    backgroundColor: '#FFFFFF',
  },
});
