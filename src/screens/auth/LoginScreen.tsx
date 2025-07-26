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
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { adjustedHeight, adjustedScale, adjustedWidth } from '../../utils/Dimensions';
import { COLORS } from '../../styles/colors';
import { TYPOGRAPHY } from '../../styles/typography';

interface LoginFormData {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const iconFadeAnim = useRef(new Animated.Value(0)).current;
  
  // Input refs for focus management
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

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
      Animated.timing(iconFadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = useCallback((field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Demo credentials check
      if (formData.email === 'email@gmail.com' && formData.password === 'Pass') {
        navigation.navigate('MainScreen');
      } else {
        Alert.alert(
          'Login Failed',
          'Invalid credentials. Please check your email and password.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
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
          <View style={styles.container}>
            {/* Welcome Text - Top Left */}
            <Animated.View 
              style={[
                styles.welcomeContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Text style={styles.title}>Welcome</Text>
              <Text style={styles.subtitle}>Sign in to continue</Text>
            </Animated.View>

            {/* Movies Icon - Center */}
            <Animated.View 
              style={[
                styles.iconContainer,
                {
                  opacity: iconFadeAnim,
                },
              ]}
            >
              <Image 
                source={require('../../assets/images/MoviesIcon.png')} 
                style={styles.moviesIcon}
                resizeMode="contain"
              />
            </Animated.View>

            {/* Form Section - Bottom 40% */}
            <Animated.View 
              style={[
                styles.formContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
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
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    editable={!isLoading}
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                  <TextInput
                    ref={passwordInputRef}
                    style={[styles.textInput, styles.passwordInput]}
                    placeholder="Enter your password"
                    placeholderTextColor={COLORS.textTertiary}
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    secureTextEntry={!showPassword}
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                    editable={!isLoading}
                  />
                  <TouchableOpacity
                    style={styles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    <Text style={styles.passwordToggleText}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>

              {/* Forgot Password - Below Password Field */}
              <TouchableOpacity 
                style={styles.forgotPasswordContainer}
                onPress={handleForgotPassword}
                disabled={isLoading}
              >
                <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <Text style={styles.loginButtonText}>Sign In</Text>
                )}
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpPrefix}>Don't have an account? </Text>
                <TouchableOpacity onPress={handleSignUp} disabled={isLoading}>
                  <Text style={styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
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
    minHeight: adjustedHeight(100),
  },
  container: {
    flex: 1,
    paddingHorizontal: adjustedWidth(8),
    gap: adjustedHeight(4),
  },
  welcomeContainer: {
    alignSelf: 'flex-start',
    marginTop: adjustedHeight(3),
    marginBottom: adjustedHeight(2),
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
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: adjustedHeight(25),
  },
  moviesIcon: {
    height: adjustedWidth(320),
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: adjustedWidth(2),
    paddingBottom: adjustedHeight(4),
    minHeight: adjustedHeight(180),
  },
  inputContainer: {
    marginBottom: adjustedHeight(4),
    gap: adjustedHeight(4),
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
  passwordInput: {
    paddingRight: adjustedWidth(2),
  },
  passwordToggle: {
    paddingHorizontal: adjustedWidth(2),
    paddingVertical: adjustedHeight(1),
    position: 'absolute',
    right: adjustedWidth(10),
  },
  passwordToggleText: {
    fontSize: adjustedScale(14),
    color: COLORS.primary,
    fontWeight: '500' as any,
  },
  errorText: {
    fontSize: adjustedScale(12),
    color: COLORS.error,
    marginTop: adjustedHeight(0.5),
    marginLeft: adjustedWidth(1),
    fontWeight: '400' as any,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: adjustedHeight(3),
    paddingVertical: adjustedHeight(1),
  },
  forgotPasswordText: {
    fontSize: adjustedScale(14),
    color: COLORS.primary,
    fontWeight: '500' as any,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: adjustedWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: adjustedHeight(3),
    height: adjustedHeight(35),
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonDisabled: {
    backgroundColor: COLORS.backgroundLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonText: {
    ...TYPOGRAPHY.styles.button,
    fontSize: adjustedScale(18),
    fontWeight: '500' as any,
    color: COLORS.white,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: adjustedHeight(2),
  },
  signUpPrefix: {
    fontSize: adjustedScale(15),
    color: COLORS.textTertiary,
    fontWeight: '400' as any,
  },
  signUpText: {
    fontSize: adjustedScale(15),
    color: COLORS.primary,
    fontWeight: '700' as any,
  },
});

export default LoginScreen; 