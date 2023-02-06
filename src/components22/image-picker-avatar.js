import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
} from 'react-native';

import { images } from '../../assets';

export function ImagePickerAvatar({ uri, onPress }) {
  return (
    <ImageBackground
      style={styles.imageBackground}
      >
      <View style={styles.avatar}>

        <TouchableOpacity style={styles.addButton} onPress={onPress}>
          <Image style={styles.addButtonIcon} source={images.addButton} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  avatar: {
    alignItems: 'center',
    marginTop: '40%',
  },
  avatarImage: {
    height: 260,
    width: 260,
    overflow: 'hidden',
    borderColor: '#ffffff',
    borderWidth: 4,
    borderRadius: 260 / 2,
  },
  addButton: {
    height: 54,
    width: 54,
    backgroundColor: '#f2f2fC',
    borderRadius: 50,
    position: 'absolute',
    right: 128,
    bottom: 40,
  },
  addButtonIcon: {
    height: 54,
    width: 54,
    paddingRight: 60,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 12,
  },
});
