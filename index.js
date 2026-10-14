/**
 * Register FCM background handler before the router loads (required when app is killed).
 */
import { Platform } from 'react-native';

if (Platform.OS === 'ios') {
  require('./src/widgets/VisitTrackingLiveActivity');
}

import './src/lib/fcm-setup';
import { startLiveActivityHeadlessSync } from './src/lib/live-activity-headless';
import { registerVisitStatusNotifeeHandlers } from './src/lib/visit-status-notification';

registerVisitStatusNotifeeHandlers();
startLiveActivityHeadlessSync();

import 'expo-router/entry';
