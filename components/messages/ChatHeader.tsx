import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { COLORS } from '../../constants';

interface DataProps {
  userData: {
    id: number;
    name: string;
  };
}

const ChatHeader: React.FC<DataProps> = ({ userData }) => {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <View style={styles.mainContainer}>
      <AntDesign
        testID="backButton"
        name="arrowleft"
        style={styles.backButton}
        onPress={(): void => navigation.goBack()}
      />
      <Pressable style={styles.innerContainer} android_ripple={{ color: COLORS.primary70 }}>
        <View>
          <Image
            testID="userProfile"
            source={require('../../assets/icon.png')}
            style={styles.avatar}
          />
          <View
            style={[
              styles.circle,
              { backgroundColor: true ? COLORS.primary100 : COLORS.darkGray }, // TODO: for online status
            ]}
          />
        </View>
        <Text testID="userName" style={styles.nameText}>
          {userData.name}
        </Text>
      </Pressable>
      <Pressable
        onPress={handleMenu}
        style={styles.threeDotIconContainer}
        android_ripple={{ borderless: true }}
      >
        <Entypo testID="menuIcon" name="dots-three-vertical" style={styles.threeDotIcon} />
      </Pressable>
      {showMenu && (
        <>
          <Pressable onPress={handleMenu} style={styles.menuBackground} />
          <View style={styles.menuContainer}>
            <Pressable style={styles.menuButton} android_ripple={{ color: COLORS.primary10 }}>
              <Ionicons name="person-add-sharp" style={styles.menuIcon} />
              <Text style={styles.menuText}>Add to Collection</Text>
            </Pressable>
            <Pressable style={styles.menuButton} android_ripple={{ color: COLORS.primary10 }}>
              <MaterialCommunityIcons name="message-bulleted-off" style={styles.menuIcon} />
              <Text style={styles.menuText}>Clear Conversation</Text>
            </Pressable>
            <Pressable style={styles.menuButton} android_ripple={{ color: COLORS.primary10 }}>
              <MaterialCommunityIcons name="hand-back-right-off" style={styles.menuIcon} />
              <Text style={styles.menuText}>Terminate Flows</Text>
            </Pressable>
            <Pressable style={styles.menuButton} android_ripple={{ color: COLORS.primary10 }}>
              <Entypo name="block" style={[styles.menuIcon, { color: COLORS.error100 }]} />
              <Text style={[styles.menuText, { color: COLORS.error100 }]}>Block Contact </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2%',
    backgroundColor: COLORS.primary400,
  },
  backButton: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontSize: 22,
    color: 'white',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  circle: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    height: 15,
    width: 15,
    borderRadius: 7.5,
    borderWidth: 2,
    borderColor: COLORS.primary400,
  },
  nameText: {
    fontSize: 18,
    marginLeft: 10,
    color: 'white',
    fontWeight: '500',
    letterSpacing: 1,
  },
  threeDotIconContainer: {
    paddingHorizontal: 6,
  },
  threeDotIcon: {
    fontSize: 20,
    color: '#fff',
  },
  menuBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 500,
    height: 800,
  },
  menuContainer: {
    width: 220,
    height: 190,
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    right: 16,
    bottom: -180,
    borderRadius: 4,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { height: 4, width: 0 },
    shadowRadius: 4,
    paddingVertical: 10,
  },
  menuIcon: {
    marginRight: 10,
    fontSize: 22,
    color: COLORS.primary100,
  },
  menuButton: {
    width: '100%',
    height: 40,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: COLORS.black,
  },
});
