import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface PaginationControlsProps {
  canGoBack: boolean;
  currentPage: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  styles: any;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  canGoBack,
  currentPage,
  onPreviousPage,
  onNextPage,
  styles,
}) => {
  return (
    <View style={styles.loadBtn}>
      <TouchableOpacity 
        onPress={onPreviousPage}
        disabled={!canGoBack}
        style={[
          styles.paginationBtn,
          !canGoBack && styles.disabledBtn
        ]}
      >
        <Text style={[
          styles.loadBtnTxt, 
          !canGoBack && styles.disabledText
        ]}>
          Back
        </Text>
      </TouchableOpacity>
      
      <Text style={styles.pageIndicator}>Page {currentPage}</Text>
      
      <TouchableOpacity 
        onPress={onNextPage} 
        style={styles.paginationBtn}
      >
        <Text style={styles.loadBtnTxt}>More</Text>
      </TouchableOpacity>
    </View>
  );
};