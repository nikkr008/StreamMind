import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface LanguageFilterProps {
  availableLanguages: string[];
  selectedLanguage: string | null;
  onLanguageSelect: (language: string | null) => void;
  styles: any;
}

export const LanguageFilter: React.FC<LanguageFilterProps> = ({
  availableLanguages,
  selectedLanguage,
  onLanguageSelect,
  styles,
}) => {
  const getLanguageLabel = (lang: string): string => {
    const languageMap: Record<string, string> = {
      en: 'English',
      ko: 'Korean',
      de: 'German',
      fr: 'French',
      es: 'Spanish',
      ja: 'Japanese',
    };
    return languageMap[lang] || lang.toUpperCase();
  };

  return (
  <View style={styles.languageBtn}>
      <TouchableOpacity 
        onPress={() => onLanguageSelect(null)}
        style={[
          styles.languageButton,
          selectedLanguage === null && styles.selectedLanguageButton
        ]}
      >
        <Text style={[
          styles.languagetxt,
          selectedLanguage === null && styles.selectedLanguageText
        ]}>
          All
        </Text>
      </TouchableOpacity>
      
      {['en', 'ko', 'de'].map((lang) => (
        <TouchableOpacity
          key={lang}
          onPress={() => onLanguageSelect(lang)}
          style={[
            styles.languageButton,
            selectedLanguage === lang && styles.selectedLanguageButton
          ]}
        >
          <Text style={[
            styles.languagetxt,
            selectedLanguage === lang && styles.selectedLanguageText
          ]}>
            {getLanguageLabel(lang)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
)
};
