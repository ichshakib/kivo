import {
  CodeBridge,
  CoreBridge,
  PlaceholderBridge,
  RichText,
  TenTapStartKit,
  Toolbar,
  darkEditorTheme,
  defaultEditorTheme,
  useEditorBridge,
} from '@10play/tentap-editor';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const INITIAL_CONTENT = `
<h2>✨ Kivo Document Editor</h2>
<p>TenTap is a typed, customizable, and extendable rich text editor for React Native based on <b>Tiptap</b> and <b>ProseMirror</b>.</p>
<p>You can format text with ease:</p>
<ul>
  <li><b>Bold</b>, <i>Italic</i>, <u>Underline</u>, and <s>Strike</s></li>
  <li>Custom bullet points, numbered lists, and quotes</li>
  <li>Code blocks and inline syntax formatting</li>
</ul>
<blockquote>"Simplicity is the soul of efficiency." – Austin Freeman</blockquote>
<pre><code>// Enjoy full-screen distraction-free writing
const app = 'Kivo';
console.log('Ready!');</code></pre>
`;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const themeKey = colorScheme === 'dark' ? 'dark' : 'light';
  const colors = Colors[themeKey];
  const isDark = themeKey === 'dark';

  const editorTheme = useMemo(() => {
    const baseTheme = isDark ? darkEditorTheme : defaultEditorTheme;
    return {
      ...baseTheme,
      webview: {
        backgroundColor: colors.background,
        flex: 1,
      },
      webviewContainer: {
        backgroundColor: colors.background,
        flex: 1,
      },
      toolbar: {
        ...baseTheme.toolbar,
        toolbarBody: {
          ...baseTheme.toolbar.toolbarBody,
          backgroundColor: colors.toolbarBackground,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          height: 48,
          minHeight: 48,
          maxHeight: 48,
          flexGrow: 0,
        },
        toolbarButton: {
          ...baseTheme.toolbar.toolbarButton,
          backgroundColor: colors.toolbarBackground,
          paddingHorizontal: 8,
          height: 48,
          minWidth: 40,
          justifyContent: 'center',
          alignItems: 'center',
        },
        iconWrapper: {
          ...baseTheme.toolbar.iconWrapper,
          backgroundColor: colors.toolbarBackground,
          borderRadius: 6,
        },
        iconWrapperActive: {
          ...baseTheme.toolbar.iconWrapperActive,
          backgroundColor: colors.toolbarActiveBackground,
        },
        icon: {
          ...baseTheme.toolbar.icon,
          tintColor: colors.toolbarIcon,
          width: 24,
          height: 24,
        },
        iconDisabled: {
          ...baseTheme.toolbar.iconDisabled,
          tintColor: colors.toolbarIconDisabled,
        },
        linkBarTheme: {
          ...baseTheme.toolbar.linkBarTheme,
          addLinkContainer: {
            ...baseTheme.toolbar.linkBarTheme.addLinkContainer,
            backgroundColor: colors.toolbarBackground,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            height: 48,
          },
          linkInput: {
            ...baseTheme.toolbar.linkBarTheme.linkInput,
            backgroundColor: colors.backgroundSelected,
            color: colors.text,
            borderRadius: 6,
          },
          placeholderTextColor: colors.textPlaceholder,
          doneButton: {
            ...baseTheme.toolbar.linkBarTheme.doneButton,
            backgroundColor: colors.primary,
            borderRadius: 6,
          },
          doneButtonText: {
            ...baseTheme.toolbar.linkBarTheme.doneButtonText,
            color: colors.primaryText,
            fontWeight: '600',
          },
        },
      },
    };
  }, [colors, isDark]);

  const customCSS = useMemo(() => {
    return `
      html, body {
        background-color: ${colors.background};
        color: ${colors.text};
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 100%;
        overflow-x: hidden;
        -webkit-text-size-adjust: 100%;
      }
      .ProseMirror {
        padding: 8px 16px 24px 16px;
        min-height: 100%;
        outline: none;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: ${colors.text};
        box-sizing: border-box;
        word-break: break-word;
      }
      .ProseMirror > *:first-child {
        margin-top: 0 !important;
      }
      .ProseMirror p.is-editor-empty:first-child::before {
        color: ${colors.textPlaceholder};
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
      }
      h1, h2, h3, h4, h5, h6 {
        color: ${colors.text};
        font-weight: 700;
        margin-top: 1.2em;
        margin-bottom: 0.5em;
        line-height: 1.3;
      }
      blockquote {
        border-left: 4px solid ${colors.editorBlockquoteBorder};
        padding-left: 1rem;
        margin: 1rem 0;
        color: ${colors.textSecondary};
        font-style: italic;
      }
      pre {
        background-color: ${colors.editorCodeBackground};
        border-radius: 8px;
        padding: 12px 16px;
        margin: 1rem 0;
        overflow-x: auto;
      }
      code {
        background-color: ${colors.editorCodeBackground};
        border-radius: 4px;
        padding: 2px 6px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 0.9em;
      }
      ul, ol {
        padding-left: 1.5rem;
      }
      li {
        margin-bottom: 0.35em;
      }
    `;
  }, [colors]);

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: INITIAL_CONTENT,
    theme: editorTheme,
    bridgeExtensions: [
      ...TenTapStartKit,
      PlaceholderBridge.configureExtension({
        placeholder: 'Start writing your document...',
      }),
      CodeBridge.configureCSS(`
        pre, code {
          background-color: ${colors.editorCodeBackground};
          color: ${colors.text};
        }
      `),
      CoreBridge.configureCSS(customCSS),
    ],
  });

  useEffect(() => {
    editor.injectCSS?.(customCSS);
  }, [customCSS, editor]);

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.editorContainer}>
        <RichText editor={editor} style={styles.editor} />
      </View>

      <KeyboardStickyView offset={{ closed: 0, opened: 0 }}>
        <View
          style={[
            styles.toolbarContainer,
            {
              backgroundColor: colors.toolbarBackground,
            },
          ]}
        >
          <Toolbar editor={editor} hidden={false} />
        </View>
      </KeyboardStickyView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  editorContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  editor: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  toolbarContainer: {
    width: '100%',
    height: 48,
    overflow: 'hidden',
  },
});
