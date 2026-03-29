import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tab1 = require('@/assets/images/Tab 1.png');
const tab2 = require('@/assets/images/Tab 2.png');
const tab3 = require('@/assets/images/Tab 3.png');
const tab4 = require('@/assets/images/Tab 4.png');
const profileAvatar = require('@/assets/images/profile.png');

const TAB_ICON_SIZE = 56;

export function Footer() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View style={styles.row}>
        <View style={styles.tabSlot}>
          <Image source={tab1} style={styles.tabIcon} contentFit="contain" />
        </View>
        <View style={styles.tabSlot}>
          <Image source={tab2} style={styles.tabIcon} contentFit="contain" />
        </View>
        <View style={styles.tabSlot}>
          <Image source={tab3} style={styles.tabIcon} contentFit="contain" />
        </View>
        <View style={styles.tabSlot}>
          <Image source={tab4} style={styles.tabIcon} contentFit="contain" />
        </View>
        <View style={styles.tabSlot}>
          <Image source={profileAvatar} style={styles.profileTab} contentFit="cover" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#DBDBDB',
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
  },
  tabSlot: {
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: TAB_ICON_SIZE,
    height: TAB_ICON_SIZE,
  },
  profileTab: {
    width: 25,
    height: 25,
  
  },
});
