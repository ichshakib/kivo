import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const GOOGLE_ICON_URI =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="%23EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="%234285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="%23FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.79l7.97-6.2z"/><path fill="%2334A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

export default function AuthScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = Colors[isDark ? 'dark' : 'light'];

  const handleGoogleSignIn = () => {
    // Navigation placeholder - ready for Google Auth integration
    router.push('/editor');
  };

  return (
    <ThemedView
      style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 16 }]}
    >
      {/* Top Branding Section */}
      <View style={styles.topSection}>
        <Animated.View entering={FadeInDown.duration(600).delay(100)} style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/splash-icon.png')}
            style={styles.logoImage}
            contentFit="contain"
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.headerTextContainer}
        >
          <ThemedText style={styles.brandTitle}>Kivo</ThemedText>
          <ThemedText style={styles.tagline}>
            Focus on what matters. Distraction-free writing and rich document editing.
          </ThemedText>
        </Animated.View>
      </View>

      {/* Middle Feature Highlights */}
      <Animated.View
        entering={FadeInDown.duration(600).delay(350)}
        style={styles.featuresContainer}
      >
        <View
          style={[
            styles.featureCard,
            { backgroundColor: colors.backgroundElement, borderColor: colors.border },
          ]}
        >
          <View style={[styles.iconBadge, { backgroundColor: '#0085FF15' }]}>
            <Ionicons name="create-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.featureTextWrapper}>
            <ThemedText style={styles.featureTitle}>Prose & Markdown</ThemedText>
            <ThemedText style={styles.featureSubtitle}>
              Rich text formatting powered by modern Tiptap
            </ThemedText>
          </View>
        </View>

        <View
          style={[
            styles.featureCard,
            { backgroundColor: colors.backgroundElement, borderColor: colors.border },
          ]}
        >
          <View style={[styles.iconBadge, { backgroundColor: '#10B98115' }]}>
            <Ionicons name="cloud-done-outline" size={22} color="#10B981" />
          </View>
          <View style={styles.featureTextWrapper}>
            <ThemedText style={styles.featureTitle}>Instant Cloud Sync</ThemedText>
            <ThemedText style={styles.featureSubtitle}>
              Your notes and documents ready everywhere
            </ThemedText>
          </View>
        </View>
      </Animated.View>

      {/* Bottom Auth Actions */}
      <Animated.View entering={FadeInUp.duration(600).delay(450)} style={styles.bottomSection}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleGoogleSignIn}
          style={[
            styles.googleButton,
            {
              backgroundColor: isDark ? '#FFFFFF' : '#FFFFFF',
              borderColor: colors.border,
              shadowColor: colors.text,
            },
          ]}
        >
          <Image source={{ uri: GOOGLE_ICON_URI }} style={styles.googleIcon} contentFit="contain" />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <ThemedText style={styles.termsText}>
          {"By continuing, you agree to Kivo's Terms of Service and Privacy Policy."}
        </ThemedText>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'center',
    marginTop: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 22,
    backgroundColor: '#0085FF18',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 52,
    height: 52,
  },
  headerTextContainer: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.5,
    fontFamily: Fonts.sans,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
    opacity: 0.75,
    fontFamily: Fonts.sans,
  },
  featuresContainer: {
    gap: 12,
    marginVertical: 24,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  featureTextWrapper: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
    fontFamily: Fonts.sans,
  },
  featureSubtitle: {
    fontSize: 13,
    opacity: 0.65,
    lineHeight: 18,
    fontFamily: Fonts.sans,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    gap: 14,
  },
  googleButton: {
    width: '100%',
    height: 54,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  googleIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: Fonts.sans,
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.5,
    lineHeight: 18,
    paddingHorizontal: 16,
    fontFamily: Fonts.sans,
  },
});
