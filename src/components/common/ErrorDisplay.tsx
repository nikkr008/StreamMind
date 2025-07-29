import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
  styles: any;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry, styles }) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};