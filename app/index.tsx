import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('@/assets/images/profile.png')}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.bioSection}>
        <Text style={styles.name}>엄민서</Text>
        <Text style={styles.bio}>숙명여자대학교 IT공학전공</Text>
        <Text style={styles.bio}>iOS Developer</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  topSection: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },

  bioSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  name: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },

  bio: {
    fontSize: 14,
  },
});