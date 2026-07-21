import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const runtime = 'edge';
export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #004346 0%, #001F1D 100%)',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#d4b74a',
            marginBottom: 32,
          }}
        >
          {SITE.city}, {SITE.country}
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: '#f5f0e6',
            textAlign: 'center',
            lineHeight: 1.05,
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#c9b98a',
            marginTop: 32,
            textAlign: 'center',
          }}
        >
          {SITE.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
