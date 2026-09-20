import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface KivoLogoProps {
  size?: number;
  isDark?: boolean;
}

export function KivoLogo({ size = 46, isDark = true }: KivoLogoProps) {
  const fillColor = isDark ? '%23FFFFFF' : '%230D0D0D';
  const notchColor = isDark ? '%23111111' : '%23F8F9FA';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
    <g fill="${fillColor}">
      <rect x="136" y="112" width="52" height="288" rx="10" />
      <path d="M 216,220 L 328,116 C 342,103 364,113 364,132 L 364,180 C 364,192 357,203 347,210 L 256,276 Z" />
      <path d="M 216,252 L 347,368 C 357,377 364,388 364,401 C 364,420 341,430 327,416 L 216,308 Z" opacity="0.9" />
      <polygon points="216,236 272,256 216,276" fill="${notchColor}" />
      <circle cx="340" cy="256" r="14" opacity="0.95" />
    </g>
  </svg>`;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={{ uri: `data:image/svg+xml;utf8,${svg}` }}
        style={{ width: size, height: size }}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default KivoLogo;
