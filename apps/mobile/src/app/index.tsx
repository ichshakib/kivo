import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KivoLogo } from '@/components/kivo-logo';
import { Fonts } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AuthScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [email, setEmail] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { signInWithGoogle, isGoogleSigningIn, user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace('/editor');
    }
  }, [user, router]);

  const handleContinue = () => {
    // Navigate to editor
    router.push('/editor');
  };

  const handleOAuthLogin = async (provider: string) => {
    if (provider === 'google') {
      try {
        const result = await signInWithGoogle();
        if (result.success) {
          router.push('/editor');
        } else if (result.error && !result.cancelled) {
          Alert.alert('Google Sign-In', result.error);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Google sign-in failed.';
        Alert.alert('Google Sign-In', msg);
      }
      return;
    }
    // Auth provider placeholder -> routes to editor
    router.push('/editor');
  };

  // Exact theme palette aligned with desktop app design
  const colors = isDark
    ? {
        bg: '#111111',
        cardBg: '#1c1c1c',
        cardBorder: 'rgba(255, 255, 255, 0.08)',
        cardBorderActive: 'rgba(255, 255, 255, 0.16)',
        inputBg: '#222222',
        inputBorder: 'rgba(255, 255, 255, 0.12)',
        inputBorderFocus: '#0085FF',
        inputText: '#FFFFFF',
        placeholder: '#666666',
        label: '#8b8b8b',
        subtext: '#707070',
        title: '#FFFFFF',
        subtitle: '#9b9b9b',
        divider: 'rgba(255, 255, 255, 0.08)',
        dividerText: '#6e6e6e',
        btnText: '#d4d4d4',
        footerText: '#666666',
        footerLink: '#888888',
      }
    : {
        bg: '#f8f9fa',
        cardBg: '#ffffff',
        cardBorder: 'rgba(0, 0, 0, 0.08)',
        cardBorderActive: 'rgba(0, 0, 0, 0.16)',
        inputBg: '#ffffff',
        inputBorder: '#d1d5db',
        inputBorderFocus: '#0085FF',
        inputText: '#111827',
        placeholder: '#9ca3af',
        label: '#6b7280',
        subtext: '#9ca3af',
        title: '#111827',
        subtitle: '#6b7280',
        divider: '#e5e7eb',
        dividerText: '#9ca3af',
        btnText: '#374151',
        footerText: '#6b7280',
        footerLink: '#374151',
      };

  // Vector icons in SVG data URI format
  const GOOGLE_ICON_URI =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%234285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/><path fill="%2334A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/><path fill="%23FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/><path fill="%23EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>';

  const APPLE_ICON_URI = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170"><path fill="${isDark ? '%23FFFFFF' : '%23000000'}" d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.59-7.79-11.72-14.25-6.25-9.8-11.08-20.73-14.48-32.8-3.4-12.07-5.1-23.36-5.1-33.87 0-14.25 3.69-26.04 11.08-35.37 7.39-9.33 16.59-14.12 27.6-14.38 4.8 0 10.33 1.25 16.59 3.75 6.26 2.5 10.35 3.8 12.27 3.89 1.57 0 5.86-1.39 12.87-4.17 7.01-2.78 12.82-3.95 17.43-3.5 13.04.88 23.34 5.92 30.89 15.12-11.45 6.94-17.06 16.51-16.83 28.71.22 9.58 3.96 17.65 11.22 24.21 7.26 6.56 15.93 10.23 26.02 11.01-2.01 6.18-4.63 12.56-7.87 19.14zM119.22 33.15c0-7.17 2.62-13.88 7.87-20.12 5.25-6.24 11.75-10.25 19.5-12.03.35 1.5.53 2.92.53 4.25 0 7.17-2.7 13.88-8.1 20.12-5.4 6.25-11.99 10.13-19.79 11.64-.02-1.32-.01-2.6-.01-3.86z"/></svg>`;

  const MICROSOFT_ICON_URI =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23"><path fill="%23f25022" d="M1 1h10v10H1z"/><path fill="%2300a4ef" d="M1 12h10v10H1z"/><path fill="%237fba00" d="M12 1h10v10H12z"/><path fill="%23ffb900" d="M12 12h10v10H12z"/></svg>';

  const iconStroke = isDark ? '%23FFFFFF' : '%231F2937';

  const PASSKEY_ICON_URI = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconStroke}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="4"/><path d="M17 11v6m0-3h3m-3 3h2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>`;

  const SSO_ICON_URI = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${iconStroke}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/></svg>`;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.screen, { backgroundColor: colors.bg }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + 20, 36),
            paddingBottom: Math.max(insets.bottom + 24, 36),
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.contentWrapper}>
          {/* 1. Standalone Kivo Logo */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(100)}
            style={styles.logoContainer}
          >
            <KivoLogo size={48} isDark={isDark} />
          </Animated.View>

          {/* 2. Header Title & Subtitle */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(200)}
            style={styles.headerContainer}
          >
            <Text style={[styles.title, { color: colors.title }]}>
              Your AI workspace.
            </Text>
            <Text style={[styles.subtitle, { color: colors.subtitle }]}>
              Log in to your Kivo account
            </Text>
          </Animated.View>

          {/* 3. Email Input & Continue Form */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(300)}
            style={styles.formContainer}
          >
            <Text style={[styles.inputLabel, { color: colors.label }]}>EMAIL</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email address..."
              placeholderTextColor={colors.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              style={[
                styles.textInput,
                {
                  backgroundColor: colors.inputBg,
                  borderColor: isInputFocused ? colors.inputBorderFocus : colors.inputBorder,
                  color: colors.inputText,
                },
              ]}
            />
            <Text style={[styles.helperText, { color: colors.subtext }]}>
              Use an organization email to easily collaborate with teammates
            </Text>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleContinue}
              style={styles.continueButton}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* 4. Divider */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(400)}
            style={styles.dividerContainer}
          >
            <View style={[styles.dividerLine, { backgroundColor: colors.divider }]} />
            <View style={[styles.dividerBadge, { backgroundColor: colors.bg }]}>
              <Text style={[styles.dividerText, { color: colors.dividerText }]}>
                or continue with
              </Text>
            </View>
          </Animated.View>

          {/* 5. OAuth & Auth Providers Grid */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(500)}
            style={styles.authGridContainer}
          >
            {/* Row 1: Google, Apple, Microsoft */}
            <View style={styles.gridRow}>
              {/* Google */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleOAuthLogin('google')}
                disabled={isGoogleSigningIn}
                style={[
                  styles.oauthButton,
                  {
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                    opacity: isGoogleSigningIn ? 0.6 : 1,
                  },
                ]}
              >
                {isGoogleSigningIn ? (
                  <ActivityIndicator
                    size="small"
                    color="#0085FF"
                    style={styles.oauthIcon}
                  />
                ) : (
                  <Image
                    source={{ uri: GOOGLE_ICON_URI }}
                    style={styles.oauthIcon}
                    contentFit="contain"
                  />
                )}
                <Text style={[styles.oauthButtonText, { color: colors.btnText }]}>
                  {isGoogleSigningIn ? 'Signing in...' : 'Google'}
                </Text>
              </TouchableOpacity>

              {/* Apple */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleOAuthLogin('apple')}
                style={[
                  styles.oauthButton,
                  {
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                  },
                ]}
              >
                <Image
                  source={{ uri: APPLE_ICON_URI }}
                  style={styles.oauthIcon}
                  contentFit="contain"
                />
                <Text style={[styles.oauthButtonText, { color: colors.btnText }]}>
                  Apple
                </Text>
              </TouchableOpacity>

              {/* Microsoft */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleOAuthLogin('microsoft')}
                style={[
                  styles.oauthButton,
                  {
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                  },
                ]}
              >
                <Image
                  source={{ uri: MICROSOFT_ICON_URI }}
                  style={styles.oauthIcon}
                  contentFit="contain"
                />
                <Text style={[styles.oauthButtonText, { color: colors.btnText }]}>
                  Microsoft
                </Text>
              </TouchableOpacity>
            </View>

            {/* Row 2: Passkey, SSO */}
            <View style={[styles.gridRow, styles.gridRowCentered]}>
              {/* Passkey */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleOAuthLogin('passkey')}
                style={[
                  styles.oauthButton,
                  {
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                  },
                ]}
              >
                <Image
                  source={{ uri: PASSKEY_ICON_URI }}
                  style={styles.oauthIcon}
                  contentFit="contain"
                />
                <Text style={[styles.oauthButtonText, { color: colors.btnText }]}>
                  Passkey
                </Text>
              </TouchableOpacity>

              {/* SSO */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleOAuthLogin('sso')}
                style={[
                  styles.oauthButton,
                  {
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                  },
                ]}
              >
                <Image
                  source={{ uri: SSO_ICON_URI }}
                  style={styles.oauthIcon}
                  contentFit="contain"
                />
                <Text style={[styles.oauthButtonText, { color: colors.btnText }]}>
                  SSO
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* 6. Footer Terms & Privacy */}
          <Animated.View
            entering={FadeInUp.duration(600).delay(600)}
            style={styles.footerContainer}
          >
            <Text style={[styles.footerText, { color: colors.footerText }]}>
              By continuing, you acknowledge that you understand and agree to the{' '}
              <Text
                style={[styles.footerLink, { color: colors.footerLink }]}
                onPress={() => {}}
              >
                Terms &amp; Conditions
              </Text>{' '}
              and{' '}
              <Text
                style={[styles.footerLink, { color: colors.footerLink }]}
                onPress={() => {}}
              >
                Privacy Policy
              </Text>
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: -0.5,
    fontFamily: Fonts.sans,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.sans,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
    fontFamily: Fonts.sans,
  },
  textInput: {
    width: '100%',
    height: 46,
    borderRadius: 9,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 14,
    fontFamily: Fonts.sans,
  },
  helperText: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 8,
    fontFamily: Fonts.sans,
  },
  continueButton: {
    width: '100%',
    height: 46,
    borderRadius: 9,
    backgroundColor: '#0085FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    shadowColor: '#0085FF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
    elevation: 3,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.sans,
  },
  dividerContainer: {
    width: '100%',
    height: 30,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    width: '100%',
    height: 1,
  },
  dividerBadge: {
    position: 'absolute',
    paddingHorizontal: 12,
  },
  dividerText: {
    fontSize: 12,
    fontFamily: Fonts.sans,
  },
  authGridContainer: {
    width: '100%',
    gap: 10,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  gridRowCentered: {
    maxWidth: 280,
    alignSelf: 'center',
  },
  oauthButton: {
    flex: 1,
    paddingVertical: 13,
    paddingHorizontal: 6,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  oauthIcon: {
    width: 21,
    height: 21,
  },
  oauthButtonText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Fonts.sans,
  },
  footerContainer: {
    marginTop: 26,
    paddingHorizontal: 12,
  },
  footerText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    fontFamily: Fonts.sans,
  },
  footerLink: {
    textDecorationLine: 'underline',
  },
});
