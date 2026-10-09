import React, { useId } from 'react';

// 원본: public/brand/coinlab-*.svg
// 인라인 SVG로 그려야 웹폰트(Barlow Condensed)가 적용되고, 색을 CSS 토큰으로 바꿀 수 있음.
const INK = { stroke: 'var(--logo-ink)' };
const INK_FILL = { fill: 'var(--logo-ink)' };
const ACCENT = { stroke: 'var(--logo-accent)' };
const ACCENT_FILL = { fill: 'var(--logo-accent)' };
const BRAND_FONT = { ...INK_FILL, fontFamily: 'var(--font-brand)' };
const BRAND_TEXT_FONT = { ...INK_FILL, fontFamily: 'var(--font-brand-text)' };

const HEX_POINTS = '100,66 129.44,83 129.44,117 100,134 70.56,117 70.56,83';
const SPOKES =
  'M100,100 L100,66 M100,100 L129.44,83 M100,100 L129.44,117 M100,100 L100,134 M100,100 L70.56,117 M100,100 L70.56,83';
const NODES = [
  [100, 66], [129.44, 83], [129.44, 117], [100, 134], [70.56, 117], [70.56, 83],
];

const Hexagon = () => (
  <>
    <polygon points={HEX_POINTS} fill="none" strokeWidth="1.6" style={INK} />
    <path d={SPOKES} fill="none" strokeWidth="1.6" style={ACCENT} />
    <g style={INK_FILL}>
      {NODES.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.2" />)}
    </g>
    <circle cx="100" cy="100" r="6.5" style={ACCENT_FILL} />
  </>
);

const Emblem = () => {
  const id = useId().replace(/:/g, '');
  return (
    <>
      <g fill="none" style={INK}>
        <circle cx="100" cy="100" r="97" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="91" strokeWidth="6" strokeDasharray="1.3 2.5" />
        <circle cx="100" cy="100" r="84" strokeWidth="1" />
        <circle cx="100" cy="100" r="56" strokeWidth="1" />
      </g>
      <path id={`${id}t`} d="M34,100 A66,66 0 0,1 166,100" fill="none" />
      <path id={`${id}b`} d="M25,100 A75,75 0 0,0 175,100" fill="none" />
      <g fontWeight="600" fontSize="13" textAnchor="middle" style={BRAND_FONT}>
        <text letterSpacing="2.4"><textPath href={`#${id}t`} startOffset="50%">CONNECTED INTELLIGENCE</textPath></text>
        <text letterSpacing="4"><textPath href={`#${id}b`} startOffset="50%">LABORATORY</textPath></text>
      </g>
      <Hexagon />
    </>
  );
};

// 가로형 로고 (coinlab-lockup-horizontal.svg)
export const LogoLockup = ({ className, title = 'Connected Intelligence LAB' }) => (
  <svg className={className} viewBox="0 0 400 140" role="img" aria-label={title}>
    <g transform="translate(6 6) scale(0.64)">
      <Emblem />
    </g>
    <text x="152" y="78" fontWeight="600" fontSize="56" letterSpacing="0.5" style={BRAND_FONT}>
      COIN LAB
    </text>
    <g fontWeight="500" fontSize="11" letterSpacing="1.6" style={BRAND_TEXT_FONT}>
      <text x="153" y="100">CONNECTED INTELLIGENCE</text>
      <text x="153" y="115">LABORATORY</text>
    </g>
  </svg>
);

// 원형 엠블럼 (coinlab-emblem-full.svg)
export const LogoEmblem = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
    <Emblem />
  </svg>
);
