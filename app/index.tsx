import { Link, type Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href={'/week1' as Href} style={styles.link}>
        <Text style={styles.linkText}>1주차 과제 보러가기</Text>
      </Link>
      <Link href={'/week2' as Href} style={styles.link}>
        <Text style={styles.linkText}>2주차 과제 보러가기</Text>
      </Link>
      <Link href={'/week3' as Href} style={styles.link}>
        <Text style={styles.linkText}>3주차 과제 보러가기</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  link: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  linkText: {
    fontSize: 17,
    color: '#2563eb',
  },
});
