import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const instagramLogo = require('@/assets/week2/Instagram Logo.png');
const profileAvatar = require('@/assets/week2/profile.png');
const moreIcon = require('@/assets/week2/MoreIcon.png');


export function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      <View style={styles.logoRow}>
        <Image source={instagramLogo} style={styles.logo} contentFit="contain" />
      </View>

      <View style={styles.postHeader}>
        <Image source={profileAvatar} style={styles.avatar} contentFit="cover" />
        <View style={styles.postHeaderMain}>
          <View style={styles.usernameRow}>
            <Text style={styles.username}>yuvvinn</Text>
          </View>
          <Text style={styles.location}>Bali, Indonesia</Text>
        </View>
        <View style={styles.moreWrap}>
          <Image source={moreIcon} style={styles.moreIcon} contentFit="contain" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  logoRow: {
    alignItems: 'center',
    marginBottom: 50,

  },
  logo: {
    width: 104,
    height: 28,
    marginTop: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  postHeaderMain: {
    flex: 1,
    justifyContent: 'center',
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  location: {
    fontSize: 12,
    color: '#8E8E8E',
    marginTop: 2,
  },
  moreWrap: {
    padding: 4,
  },
  moreIcon: {
    width: 20,
    height: 20,
  },
});
