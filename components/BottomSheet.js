import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const BottomSheet = ({ isOpen, onClose, bin }) => {
  const bottomSheetModalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isOpen]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={['10%', '50%']}
      onChange={(index) => {
        if (index === -1) {
          onClose();
        }
      }}
    >
      <View>
        <Text>{bin.Notes}</Text>
      </View>
    </BottomSheetModal>
  );
};

export default BottomSheet;





