import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

const postImage = require('@/assets/week2/post.png');
const likeIcon = require('@/assets/week2/Like.png');
const commentIcon = require('@/assets/week2/Comment.png');
const shareIcon = require('@/assets/week2/Messanger.png');
const saveIcon = require('@/assets/week2/Save.png');
const likesAvatar = require('@/assets/week2/Oval.png');
const paginationPng = require('@/assets/week2/Pagination.png');

export function Body() {
  return (
    <View style={styles.root}>
      <View style={styles.mediaBlock}>
        <Image source={postImage} style={styles.postImage}/>
        <View style={styles.paginationRow}>
          <Image source={paginationPng} style={styles.pagination} contentFit="contain" />
        </View>
      </View>

      <View style={styles.padded}>
        <View style={styles.actions}>
          <View style={styles.actionsLeft}>
            <Image source={likeIcon} style={styles.actionIcon} contentFit="contain" />
            <Image source={commentIcon} style={styles.actionIcon} contentFit="contain" />
            <Image source={shareIcon} style={styles.actionIcon} contentFit="contain" />
          </View>
          <Image source={saveIcon} style={styles.actionIcon} contentFit="contain" />
        </View>

        <View style={styles.likesRow}>
          <Image source={likesAvatar} style={styles.likesAvatar} contentFit="cover" />
          <Text style={styles.likesText}>
            Liked by <Text style={styles.bold}>prince_12</Text> and{' '}
            <Text style={styles.bold}>44,686 others</Text>
          </Text>
        </View>

        <Text style={styles.captionBlock}>
          <Text style={styles.bold}>yuvvinn </Text>
          <Text style={styles.caption}>
            발리의 노을
          </Text>
        </Text>

        <Text style={styles.timestamp}>September 19</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
  },
  mediaBlock: {
    width: '100%',
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F2F2F2',
  },
  paginationRow: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  pagination: {
    width: 44,
    height: 8,
  },
  padded: {
    paddingHorizontal: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actionsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  likesAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  likesText: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    lineHeight: 18,
  },
  bold: {
    fontWeight: '600',
  },
  captionBlock: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 18,
    marginBottom: 8,
  },
  caption: {
    fontWeight: '400',
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E8E',
  },
});
