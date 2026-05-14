import { Link, type Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const assignmentLinks = [
  { href: '/info-card', label: 'InfoCard' },
  { href: '/instagram', label: 'Instagram' },
  { href: '/wishlist', label: 'Wishlist' },
  { href: '/weather-api', label: 'Weather API' },
];

export default function Index() {
  return (
    <View style={styles.container}>
      {assignmentLinks.map((assignment) => (
        <Link key={assignment.href} href={assignment.href as Href} style={styles.link}>
          <Text style={styles.linkText}>{assignment.label}</Text>
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
