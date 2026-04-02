import { Image, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('@/assets/images/profile.png')}
          style={styles.profileImage}
        />
        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text>게시물</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>100</Text>
            <Text>팔로워</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>100</Text>
            <Text>팔로잉</Text>
          </View>
        </View>
      </View>

      <View style={styles.bioSection}>
        <Text style={styles.name}>엄민서</Text>
        <Text style={styles.bio}>숙명여자대학교 IT공학전공</Text>
         <Pressable style={styles.wishButton} onPress={() => router.push('/wishlist')}>
          <Text style={styles.wishButtonText}>Wish List</Text>
        </Pressable>
      </View>

      <View style={styles.grid}>
        <Pressable style={styles.gridItem} onPress={() => router.push('/post')}>
          <Image
            source={require('@/assets/images/post.png')}
            style={styles.gridImage}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable style={styles.gridItem} onPress={() => router.push('/post')}>
          <Image
            source={require('@/assets/images/post.png')}
            style={styles.gridImage}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable style={styles.gridItem} onPress={() => router.push('/post')}>
          <Image
            source={require('@/assets/images/post.png')}
            style={styles.gridImage}
            resizeMode="contain"
          />
        </Pressable>
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
    marginTop: 60,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },

  stats: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },

  statBox: {
    alignItems: 'center',
  },

  statNumber: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  
  bioSection: {
    paddingHorizontal: 20,
    marginBottom: 0,
  },

  name: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },

  bio: {
    fontSize: 14,
  },

   wishButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },

  wishButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },

  gridItem: {
    width: '32%',
},

  gridImage: {
    width: '100%',
  },
});