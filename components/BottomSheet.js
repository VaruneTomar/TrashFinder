// BottomSheet.js

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
          // Handle dismiss event (sheet goes off-screen)
          onClose();
        }
        // Handle sheet position changes
      }}
    >
      <View>
        <Text>{bin.Notes}</Text>
        {/* Add your bottom sheet content here */}
      </View>
    </BottomSheetModal>
  );
};

export default BottomSheet;





