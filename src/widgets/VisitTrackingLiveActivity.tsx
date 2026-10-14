import { HStack, Text, VStack } from '@expo/ui/swift-ui';
import { font, foregroundStyle, padding } from '@expo/ui/swift-ui/modifiers';
import { createLiveActivity, type LiveActivityEnvironment } from 'expo-widgets';

export type VisitTrackingActivityProps = {
  etaMinutes: number;
  arrivalLabel: string;
  addressLine: string;
  lastUpdatedLabel: string;
  progress: number;
  carLabel: string;
};

const ACCENT = '#B8F035';
const WHITE = '#FFFFFF';
const MUTED = '#9CA3AF';

const VisitTrackingActivity = (
  rawProps: VisitTrackingActivityProps,
  _environment: LiveActivityEnvironment,
) => {
  'widget';

  const etaMinutes = Number(rawProps?.etaMinutes ?? 0);
  const etaDisplay = etaMinutes <= 0 ? '0' : String(etaMinutes);
  const addressLine = String(rawProps?.addressLine ?? 'Test drive on the way');
  const arrivalLabel = String(rawProps?.arrivalLabel ?? '—');
  const lastUpdatedLabel = String(rawProps?.lastUpdatedLabel ?? 'Updated now');
  const carLabel = String(rawProps?.carLabel ?? 'Concierge test drive');
  const progressPct = Math.round(Math.min(1, Math.max(0, Number(rawProps?.progress ?? 0))) * 100);

  const banner = (
    <VStack spacing={8} modifiers={[padding({ all: 14 })]}>
      <HStack spacing={8}>
        <Text modifiers={[font({ weight: 'bold', size: 14 }), foregroundStyle(WHITE)]}>
          Victory Tata · Test drive
        </Text>
        <Text modifiers={[font({ size: 11 }), foregroundStyle(MUTED)]}>{lastUpdatedLabel}</Text>
      </HStack>
      <Text modifiers={[font({ weight: 'bold', size: 16 }), foregroundStyle(WHITE)]}>
        {etaDisplay} min to arrival · by {arrivalLabel}
      </Text>
      <Text modifiers={[font({ size: 14 }), foregroundStyle(WHITE)]}>{addressLine}</Text>
      <Text modifiers={[font({ size: 12 }), foregroundStyle(MUTED)]}>
        {carLabel} · {progressPct}% complete
      </Text>
    </VStack>
  );

  const bannerSmall = (
    <VStack spacing={4} modifiers={[padding({ all: 10 })]}>
      <Text modifiers={[font({ weight: 'bold', size: 13 }), foregroundStyle(WHITE)]}>
        {etaDisplay} min · {addressLine}
      </Text>
    </VStack>
  );

  return {
    banner,
    bannerSmall,
    compactLeading: (
      <Text modifiers={[font({ weight: 'bold', size: 12 }), foregroundStyle(ACCENT)]}>VT</Text>
    ),
    compactTrailing: (
      <Text modifiers={[font({ weight: 'bold', size: 14 }), foregroundStyle(ACCENT)]}>
        {etaDisplay}m
      </Text>
    ),
    minimal: (
      <Text modifiers={[font({ weight: 'bold', size: 11 }), foregroundStyle(ACCENT)]}>{etaDisplay}m</Text>
    ),
    expandedTrailing: (
      <Text modifiers={[font({ weight: 'bold', size: 18 }), foregroundStyle(WHITE)]}>
        {etaDisplay} min
      </Text>
    ),
    expandedBottom: (
      <VStack spacing={4} modifiers={[padding({ horizontal: 12 })]}>
        <Text modifiers={[font({ size: 12 }), foregroundStyle(MUTED)]}>{addressLine}</Text>
      </VStack>
    ),
  };
};

export default createLiveActivity('VisitTrackingActivity', VisitTrackingActivity);
