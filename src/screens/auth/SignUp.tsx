import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { adjustedHeight, adjustedScale, adjustedWidth } from '../../utils/Dimensions';
import { COLORS } from '../../styles/colors';
import { TYPOGRAPHY } from '../../styles/typography';

interface SignUpFormData {
  name: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: string;
  gender: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  mobileNumber?: string;
  dateOfBirth?: string;
  gender?: string;
}

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    mobileNumber: '',
    dateOfBirth: '',
    gender: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  // Input refs for focus management
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const mobileInputRef = useRef<TextInput>(null);
  const dobInputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Entry animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
  };

  const validateMobile = (mobile: string): boolean => {
    const mobileRegex = /^(\+?1?[2-9]\d{2}[2-9]\d{2}\d{4})|(\+?[1-9]\d{1,14})$/;
    return mobileRegex.test(mobile.replace(/\s/g, ''));
  };

  const validateDateOfBirth = (dob: string): boolean => {
    const dobRegex = /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;
    if (!dobRegex.test(dob)) return false;
    
    const [day, month, year] = dob.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    return age >= 13 && age <= 120; // Reasonable age range
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Please enter a valid name (2-50 characters, letters only)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!validateMobile(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid mobile number';
    }

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (!validateDateOfBirth(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Please enter a valid date (DD-MM-YYYY) and age 13+';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = useCallback((field: keyof SignUpFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success!',
        'Account created successfully. You can now sign in.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('LoginScreen'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      mobileNumber: '',
      dateOfBirth: '',
      gender: '',
    });
    setErrors({});
  };

  const formatDateInput = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 4)}-${numbers.slice(4, 8)}`;
  };

  const formatMobileInput = (text: string) => {
    return text.replace(/[^+\d\s]/g, '');
  };

  const renderOptionPicker = (
    options: { label: string; value: string }[],
    selectedValue: string,
    onSelect: (value: string) => void,
    visible: boolean,
    onClose: () => void
  ) => {
    if (!visible) return null;

    return (
      <View style={styles.pickerOverlay}>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerTitle}>Select Option</Text>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.pickerOption,
                selectedValue === option.value && styles.pickerOptionSelected,
              ]}
              onPress={() => {
                onSelect(option.value);
                onClose();
              }}
            >
              <Text
                style={[
                  styles.pickerOptionText,
                  selectedValue === option.value && styles.pickerOptionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.pickerCancel} onPress={onClose}>
            <Text style={styles.pickerCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View 
            style={[
              styles.container,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Header Section */}
            <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join us today</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              {/* Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
                  <TextInput
                    ref={nameInputRef}
                    style={styles.textInput}
                    placeholder="Enter your full name"
                    placeholderTextColor={COLORS.textTertiary}
                    value={formData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => emailInputRef.current?.focus()}
                    editable={!isLoading}
                  />
                </View>
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                  <TextInput
                    ref={emailInputRef}
                    style={styles.textInput}
                    placeholder="Enter your email"
                    placeholderTextColor={COLORS.textTertiary}
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => mobileInputRef.current?.focus()}
                    editable={!isLoading}
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              {/* Mobile Number Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Mobile Number</Text>
                <View style={[styles.inputWrapper, errors.mobileNumber && styles.inputError]}>
                  <TextInput
                    ref={mobileInputRef}
                    style={styles.textInput}
                    placeholder="Enter your mobile number"
                    placeholderTextColor={COLORS.textTertiary}
                    value={formData.mobileNumber}
                    onChangeText={(text) => handleInputChange('mobileNumber', formatMobileInput(text))}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    onSubmitEditing={() => dobInputRef.current?.focus()}
                    editable={!isLoading}
                  />
                </View>
                {errors.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber}</Text>}
              </View>

              {/* Date of Birth Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Date of Birth</Text>
                <View style={[styles.inputWrapper, errors.dateOfBirth && styles.inputError]}>
                  <TextInput
                    ref={dobInputRef}
                    style={styles.textInput}
                    placeholder="DD-MM-YYYY"
                    placeholderTextColor={COLORS.textTertiary}
                    value={formData.dateOfBirth}
                    onChangeText={(text) => handleInputChange('dateOfBirth', formatDateInput(text))}
                    keyboardType="numeric"
                    maxLength={10}
                    returnKeyType="done"
                    editable={!isLoading}
                  />
                </View>
                {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}
              </View>

              {/* Gender Selector */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Gender</Text>
                <View style={styles.genderTilesContainer}>
                  <TouchableOpacity
                    style={[
                      styles.genderTile,
                      formData.gender === 'male' && styles.genderTileSelected,
                      errors.gender && styles.genderTileError,
                    ]}
                    onPress={() => handleInputChange('gender', 'male')}
                    disabled={isLoading}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.genderIcon}>👨</Text>
                    <Text style={[
                      styles.genderLabel,
                      formData.gender === 'male' && styles.genderLabelSelected,
                    ]}>
                      Male
                    </Text>
                    <View style={[
                      styles.checkbox,
                      formData.gender === 'male' && styles.checkboxSelected,
                    ]}>
                      {formData.gender === 'male' && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.genderTile,
                      formData.gender === 'female' && styles.genderTileSelected,
                      errors.gender && styles.genderTileError,
                    ]}
                    onPress={() => handleInputChange('gender', 'female')}
                    disabled={isLoading}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.genderIcon}>👩</Text>
                    <Text style={[
                      styles.genderLabel,
                      formData.gender === 'female' && styles.genderLabelSelected,
                    ]}>
                      Female
                    </Text>
                    <View style={[
                      styles.checkbox,
                      formData.gender === 'female' && styles.checkboxSelected,
                    ]}>
                      {formData.gender === 'female' && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
                {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.signUpButton, isLoading && styles.signUpButtonDisabled]}
                  onPress={handleSignUp}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  {isLoading ? (
                    <ActivityIndicator color={COLORS.white} size="small" />
                  ) : (
                    <Text style={styles.signUpButtonText}>Create Account</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.secondaryButtonContainer}>
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={handleReset}
                    disabled={isLoading}
                  >
                    <Text style={styles.resetButtonText}>Reset</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => navigation.navigate('LoginScreen')}
                    disabled={isLoading}
                  >
                    <Text style={styles.cancelButtonText}>Back to Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: adjustedHeight(3),
  },
  container: {
    flex: 1,
    paddingHorizontal: adjustedWidth(8),
    gap: adjustedHeight(4),
  },
  header: {
    alignItems: 'center',
    marginBottom: adjustedHeight(2),
    marginTop: adjustedHeight(2),
  },
  title: {
    ...TYPOGRAPHY.styles.title,
    fontSize: adjustedScale(32),
    fontWeight: '700' as any,
    color: COLORS.textPrimary,
    marginBottom: adjustedHeight(0.5),
  },
  subtitle: {
    ...TYPOGRAPHY.styles.body,
    fontSize: adjustedScale(16),
    color: COLORS.textTertiary,
    fontWeight: '400' as any,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: adjustedWidth(2),
    gap: adjustedHeight(1),
  },
  inputContainer: {
    marginBottom: adjustedHeight(3),
    gap: adjustedHeight(1),
  },
  inputLabel: {
    fontSize: adjustedScale(14),
    fontWeight: '500' as any,
    color: COLORS.textPrimary,
    marginBottom: adjustedHeight(1),
    marginLeft: adjustedWidth(1),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundPrimary,
    borderWidth: 1.5,
    borderColor: COLORS.backgroundLight,
    borderRadius: adjustedWidth(8),
    paddingHorizontal: adjustedWidth(4),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  textInput: {
    fontSize: adjustedScale(14),
    color: COLORS.textPrimary,
    fontWeight: '400' as any,
  },
  selectorText: {
    fontSize: adjustedScale(14),
    color: COLORS.textPrimary,
    fontWeight: '400' as any,
  },
  selectorPlaceholder: {
    color: COLORS.textTertiary,
  },
  selectorArrow: {
    fontSize: adjustedScale(12),
    color: COLORS.textTertiary,
    marginLeft: adjustedWidth(2),
  },
  errorText: {
    fontSize: adjustedScale(12),
    color: COLORS.error,
    marginTop: adjustedHeight(0.5),
    marginLeft: adjustedWidth(1),
    fontWeight: '400' as any,
  },
  buttonContainer: {
    marginTop: adjustedHeight(20),
    gap: adjustedHeight(10),
  },
  signUpButton: {
    backgroundColor: COLORS.primary,
    borderRadius: adjustedWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    height: adjustedHeight(40),
    width: '100%',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  signUpButtonDisabled: {
    backgroundColor: COLORS.backgroundLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  signUpButtonText: {
    ...TYPOGRAPHY.styles.button,
    fontSize: adjustedScale(18),
    fontWeight: '500' as any,
    color: COLORS.white,
  },
  secondaryButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: adjustedWidth(4),
  },
  resetButton: {
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: adjustedWidth(8),
    height: adjustedHeight(35),
    width: adjustedWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: adjustedScale(16),
    fontWeight: '500' as any,
    color: COLORS.textPrimary,
  },
  cancelButton: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: adjustedWidth(8),
    height: adjustedHeight(35),
    width: adjustedWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: adjustedScale(16),
    fontWeight: '500' as any,
    color: COLORS.primary,
  },
  pickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  pickerContainer: {
    backgroundColor: COLORS.backgroundPrimary,
    borderRadius: adjustedWidth(8),
    paddingVertical: adjustedHeight(3),
    paddingHorizontal: adjustedWidth(6),
    width: adjustedWidth(80),
    maxHeight: adjustedHeight(50),
  },
  pickerTitle: {
    fontSize: adjustedScale(18),
    fontWeight: '700' as any,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: adjustedHeight(2),
  },
  pickerOption: {
    paddingVertical: adjustedHeight(1.5),
    paddingHorizontal: adjustedWidth(4),
    borderRadius: adjustedWidth(6),
    marginBottom: adjustedHeight(1),
  },
  pickerOptionSelected: {
    backgroundColor: COLORS.primary,
  },
  pickerOptionText: {
    fontSize: adjustedScale(16),
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontWeight: '400' as any,
  },
  pickerOptionTextSelected: {
    color: COLORS.white,
    fontWeight: '500' as any,
  },
  pickerCancel: {
    marginTop: adjustedHeight(2),
    paddingVertical: adjustedHeight(1.5),
    borderTopWidth: 1,
    borderTopColor: COLORS.backgroundLight,
  },
  pickerCancelText: {
    fontSize: adjustedScale(16),
    color: COLORS.textTertiary,
    textAlign: 'center',
    fontWeight: '500' as any,
  },
  genderTilesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: adjustedWidth(4),
  },
  genderTile: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: COLORS.backgroundPrimary,
    borderWidth: 1.5,
    borderColor: COLORS.backgroundLight,
    borderRadius: adjustedWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    padding: adjustedWidth(4),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    position: 'relative',
  },
  genderTileSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  genderTileError: {
    borderColor: COLORS.error,
  },
  genderIcon: {
    fontSize: adjustedScale(32),
    marginBottom: adjustedHeight(1),
  },
  genderLabel: {
    fontSize: adjustedScale(14),
    fontWeight: '500' as any,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  genderLabelSelected: {
    color: COLORS.primary,
    fontWeight: '600' as any,
  },
  checkbox: {
    position: 'absolute',
    top: adjustedHeight(1),
    right: adjustedWidth(1),
    width: adjustedWidth(5),
    height: adjustedWidth(5),
    borderRadius: adjustedWidth(2.5),
    borderWidth: 1.5,
    borderColor: COLORS.backgroundLight,
    backgroundColor: COLORS.backgroundPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    fontSize: adjustedScale(10),
    color: COLORS.white,
    fontWeight: 'bold' as any,
  },
});

export default SignUpScreen; 