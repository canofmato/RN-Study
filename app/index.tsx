import { Link, type Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const weekLinks = [
  { href: '/week1', label: '1주차 과제 보러가기' },
  { href: '/week2', label: '2주차 과제 보러가기' },
  { href: '/week3', label: '3주차 과제 보러가기' },
  { href: '/week5', label: '5주차 과제 보러가기' },
];

export default function Index() {
  return (
    <View style={styles.container}>
      {weekLinks.map((week) => (
        <Link key={week.href} href={week.href as Href} style={styles.link}>
          <Text style={styles.linkText}>{week.label}</Text>
        </Link>
      ))}
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
