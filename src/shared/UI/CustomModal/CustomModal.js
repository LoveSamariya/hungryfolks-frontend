import React, { useRef, useEffect } from 'react';

import { useThemeAwareObject } from '../../../hooks/themeAwareObject';
import createStyles from './CustomModal.style';

import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

function CustomModal({
  modalVisible,
  setModalVisible,
  style,
  children,
  barProps = {},
  barColor = 'black',
  barStyle = '',
  onModalClosed,
  ...props
}) {
  const Styles = useThemeAwareObject(createStyles);

  const closeModal = () => {
    setModalVisible(false);
    onModalClosed && onModalClosed();
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}
        {...props}>
        <>
          <StatusBar
            backgroundColor={barColor}
            barStyle={barStyle}
            {...barProps}
          />
          <TouchableOpacity
            onPress={() => closeModal()}
            activeOpacity={1}
            style={Styles.backDrop}></TouchableOpacity>

          <View style={{ ...Styles.modalContentContainer, ...style }}>
            <TouchableOpacity
              style={Styles.modalCloseButton}
              onPress={closeModal}>
              <FontAwesomeIcon icon={faClose} size={24} />
            </TouchableOpacity>
            <SafeAreaView style={{ flex: 1, height: '100%', display: 'flex' }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                style={{ paddingTop: 4 }}>
                {children}
              </ScrollView>
            </SafeAreaView>
          </View>
        </>
      </Modal>
    </>
  );
}

export default CustomModal;
