import { StyleSheet } from 'react-native';

import colors from './colors';

const forumStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  list: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
    padding: 20,
    gap: 16,
    paddingBottom: 32,
  },
  header: {
    gap: 12,
    paddingBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  brand: {
    color: colors.green,
    fontSize: 18,
    fontWeight: '700',
  },
  title: {
    color: colors.graphite,
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  demo: {
    alignSelf: 'flex-start',
    borderLeftWidth: 3,
    borderLeftColor: colors.terracotta,
    paddingLeft: 10,
    color: colors.graphite,
    fontSize: 13,
    lineHeight: 20,
  },
  action: {
    minHeight: 48,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  actionText: {
    color: colors.graphite,
    fontSize: 15,
    fontWeight: '600',
  },
  back: {
    alignSelf: 'flex-start',
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 18,
    padding: 20,
    gap: 12,
  },
  pinnedCard: {
    borderColor: colors.green,
  },
  metadataRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  sector: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    flexShrink: 1,
  },
  metadata: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  postTitle: {
    color: colors.graphite,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  preview: {
    color: colors.graphite,
    fontSize: 15,
    lineHeight: 23,
  },
  pin: {
    alignSelf: 'flex-start',
    backgroundColor: colors.greenTint,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pinText: {
    color: colors.green,
    fontSize: 13,
    fontWeight: '600',
  },
  empty: {
    paddingVertical: 40,
    gap: 12,
    alignItems: 'center',
  },
  emptyTitle: {
    color: colors.graphite,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyDescription: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  detail: {
    gap: 20,
    paddingTop: 8,
  },
  body: {
    color: colors.graphite,
    fontSize: 17,
    lineHeight: 28,
  },
});

export default forumStyles;
