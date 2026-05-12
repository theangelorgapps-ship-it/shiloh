import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Aperture,
  Box,
  Brush,
  Building2,
  Camera,
  Car,
  Check,
  ChevronDown,
  Chrome,
  CreditCard,
  ExternalLink,
  Figma,
  Framer,
  Info,
  Layers,
  Mail,
  MapPin,
  Palette,
  PenTool,
  Phone,
  Shirt,
  ShieldCheck,
  Sparkle,
  Type as TypeIcon,
  Wand2,
  X,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion';
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import type { LucideIcon } from 'lucide-react';
import shilohPortrait from './assets/shiloh-portrait.png';

const primaryText = '#E1E0CC';
const customEase = [0.16, 1, 0.3, 1] as const;
const cardEase = [0.22, 1, 0.36, 1] as const;
const heroVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4';

const featureVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4';

const journeyVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260317_100335_dc625816-c3c1-4b00-b93e-4cb301cf5ea5.mp4';

const vipVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4';

const logo =
  'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/6995a97ff02fa4d694442b64.webp';

const heroLogo =
  'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/686f096a627f396723165ccf.png';

const fortMoriahMap =
  'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/69ea16acb1e59415755d35cc.png';

const mapLocations = [
  {
    title: 'Main Auditorium',
    label: 'Gate A',
    position: { x: 48, y: 39 },
    description: 'Primary gathering point for Shiloh Conference sessions, worship, and keynote ministry.',
    details: [
      'Best arrival point for evening sessions and main conference gatherings.',
      'Ushers will direct delegates to assigned seating zones from this entrance.',
      'Keep your registration confirmation ready for faster movement through the access point.',
    ],
  },
  {
    title: 'Prayer Grounds',
    label: 'Prayer',
    position: { x: 34, y: 47 },
    description: 'A quieter zone for prayer, reflection, and spiritual preparation throughout the week.',
    details: [
      'Recommended for quiet preparation before services begin.',
      'Please keep conversations low so the atmosphere remains prayerful.',
      'Use this point as a calm meeting place for small groups and families.',
    ],
  },
  {
    title: 'Registration Hub',
    label: 'Check-in',
    position: { x: 60, y: 52 },
    description: 'Delegate check-in, wristbands, information support, and arrival assistance.',
    details: [
      'Collect wristbands, event guidance, and daily access information here.',
      'Support teams can help with schedule questions and guest routing.',
      'Arrive early during peak session windows to avoid queues.',
    ],
  },
  {
    title: 'VIP Entrance',
    label: 'VIP',
    position: { x: 72, y: 42 },
    description: 'Dedicated access point for VIP Experience guests and hosted arrivals.',
    details: [
      'Reserved for VIP Experience delegates and hosted guests.',
      'Have VIP confirmation ready before reaching the access team.',
      'This route is closest to hosted arrival support and premium seating guidance.',
    ],
  },
  {
    title: 'Fellowship Court',
    label: 'Food',
    position: { x: 43, y: 64 },
    description: 'Refreshments, fellowship, and meeting point between conference moments.',
    details: [
      'A natural gathering zone between major programme moments.',
      'Ideal for connecting with friends, families, and ministry teams.',
      'Check this area for refreshments and short break coordination.',
    ],
  },
  {
    title: 'Parking & Shuttle',
    label: 'Parking',
    position: { x: 22, y: 70 },
    description: 'Parking coordination and transport support for delegates and families.',
    details: [
      'Use this point for vehicle guidance and shuttle coordination.',
      'Allow extra time before major services, especially on opening and closing days.',
      'Follow steward directions for drop-off, parking, and pedestrian routes.',
    ],
  },
];

const journeyEvents = [
  {
    tab: 'Prophetic Retreat',
    date: 'August 31 - Sep 3',
    title: 'Prophetic Retreat',
    image: 'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/69f21a466630fc6c0b48cb90.jpg',
    description:
      'Learn from highly esteemed Prophet Uebert Angel in the sacred atmosphere of Mount Moriah City. Deepen your understanding and spiritual journey where signs and wonders manifest.',
    buttons: [
      {
        label: 'Register Now',
        href: 'https://programs.uebertangel.org/product/2026/',
        external: true,
      },
    ],
  },
  {
    tab: 'Shiloh Conference',
    date: '4 - 6 September',
    title: 'Shiloh Conference',
    image: 'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/69f2171efab44d4020a08d69.jpg',
    description:
      "Shiloh Conference is here!\nJoin us from 4th - 6th September at Fort Moriah City, Zimbabwe.\nThis is more than a conference; it is a powerful encounter to ignite your faith, renew your purpose, and deepen your walk with God. Mark your calendar.\n\nWe can't wait to see you!",
    buttons: [
      {
        label: 'Register',
        href: 'https://programs.uebertangel.org/product/2026/',
        external: true,
      },
      {
        label: 'VIP Experience',
        href: '/vip',
        external: false,
      },
    ],
  },
  {
    tab: "The Ra'ah's Birthday Celebration",
    date: 'September 6',
    title: "The Ra'ah's Birthday Celebration",
    image: 'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/69f2171e590487fe57c2f87b.jpg',
    description:
      'Join us for an unforgettable evening of joy, thanksgiving, and honor as we celebrate the extraordinary life and ministry of our Prophet. Stay tuned for more details on this special event.',
    buttons: [
      {
        label: 'Register Now',
        href: 'https://programs.uebertangel.org/product/birthday/',
        external: true,
      },
    ],
  },
];

type Segment = {
  text: string;
  className?: string;
};

function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
}: {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const words = text.split(' ');

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;
        const finalCharacterIndex = Math.max(word.length - 1, 0);

        return (
          <motion.span
            key={`${word}-${index}`}
            className="mr-[0.08em] inline-block overflow-visible"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.85,
              delay: index * 0.08,
              ease: customEase,
            }}
          >
            {showAsterisk && isLastWord
              ? word.split('').map((character, characterIndex) => (
                  <span
                    key={`${character}-${characterIndex}`}
                    className={characterIndex === finalCharacterIndex ? 'relative inline-block' : undefined}
                  >
                    {character}
                    {characterIndex === finalCharacterIndex && (
                      <span className="absolute -right-[0.3em] top-[0.65em] text-[0.31em]">*</span>
                    )}
                  </span>
                ))
              : word}
          </motion.span>
        );
      })}
    </div>
  );
}

function WordsPullUpMultiStyle({
  segments,
  className = '',
  delayStep = 0.05,
  duration = 0.62,
}: {
  segments: Segment[];
  className?: string;
  delayStep?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const words = segments.flatMap((segment, segmentIndex) =>
    segment.text
      .trim()
      .split(/\s+/)
      .map((word) => ({
        word,
        className: segment.className,
        segmentIndex,
      })),
  );

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map(({ word, className: wordClassName, segmentIndex }, index) => (
        <motion.span
          key={`${word}-${segmentIndex}-${index}`}
          className={`mr-[0.22em] inline-block overflow-hidden ${wordClassName ?? ''}`}
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{
            duration,
            delay: index * delayStep,
            ease: customEase,
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

function BlurText({
  text,
  className = '',
  start = true,
}: {
  text: string;
  className?: string;
  start?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const words = text.split(' ');

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="mr-[0.18em] inline-block"
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={start && inView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : { filter: 'blur(10px)', opacity: 0, y: 50 }}
          transition={{
            duration: 0.35,
            delay: index * 0.1,
            ease: customEase,
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

function PillButton({
  href,
  children,
  variant = 'solid',
}: {
  href: string;
  children: string;
  variant?: 'solid' | 'glass';
}) {
  const isGlass = variant === 'glass';

  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full py-1 pl-5 pr-1 text-sm font-medium transition-all duration-300 hover:gap-3 sm:text-base ${
        isGlass
          ? 'border border-white/35 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl'
          : 'bg-white text-black'
      }`}
    >
      {children}
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10 ${
          isGlass ? 'bg-white text-black' : 'bg-black text-white'
        }`}
      >
        <ArrowRight className="h-4 w-4" />
      </span>
    </a>
  );
}

function AnimatedLetter({
  character,
  index,
  totalChars,
  scrollYProgress,
}: {
  character: string;
  index: number;
  totalChars: number;
  scrollYProgress: MotionValue<number>;
}) {
  const charProgress = index / totalChars;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(charProgress - 0.1, 0), Math.min(charProgress + 0.05, 1)],
    [0.2, 1],
  );

  return (
    <motion.span style={{ opacity }} className="whitespace-pre-wrap">
      {character}
    </motion.span>
  );
}

type HeaderNavItem =
  | { label: string; href: string; children?: never; action?: never }
  | {
      label: string;
      children: Array<{ label: string; href: string; action?: never } | { label: string; action: 'sponsor'; href?: never }>;
      href?: never;
      action?: never;
    }
  | { label: string; action: 'sow' | 'sponsor'; href?: never; children?: never };

function HeroHeader({ sticky = true }: { sticky?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const navItems: HeaderNavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Plan', children: [
      { label: '2026 Shiloh Season Guide', href: '/journey' },
      { label: 'Events Schedule', href: '/schedule' },
      { label: 'Bring Someone To Shiloh', action: 'sponsor' },
      { label: 'Parking and Shuttle', href: '/passes' },
      { label: 'Shiloh Season VIP Experience', href: '/vip' },
    ] },
    { label: '2026 Shop', href: '/merch' },
    { label: 'Giving', action: 'sow' },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileSubmenu(null);
  };

  const navigateTo = (href: string) => (event: ReactMouseEvent<HTMLAnchorElement>) => {
    closeMenu();

    if (!href.startsWith('/')) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));

    const targetHash = href.split('#')[1];
    if (targetHash) {
      window.setTimeout(() => {
        document.getElementById(targetHash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
      return;
    }

    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };

  const openSowModal = () => {
    closeMenu();
    window.dispatchEvent(new CustomEvent('open-sow-modal'));
  };

  const openSponsorModal = () => {
    closeMenu();
    window.dispatchEvent(new CustomEvent('open-sponsor-modal'));
  };

  return (
    <header className={`${sticky ? 'fixed' : 'absolute'} inset-x-0 top-0 z-40 flex justify-center px-3`}>
      <AnimatePresence>
        {menuOpen && (
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-0 bg-black/45 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: customEase }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      <nav className="relative z-20 flex w-full max-w-[calc(100vw-1.5rem)] items-center justify-between gap-2 rounded-b-2xl bg-black px-2.5 py-2 text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:gap-4 sm:px-5 md:w-[min(1120px,calc(100vw-3rem))] md:gap-7 md:rounded-b-3xl md:px-7 xl:w-[min(1180px,calc(100vw-4rem))] xl:px-8">
        <a href="/" aria-label="Shiloh home" className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="flex flex-col text-left leading-[0.78] text-[#E1E0CC]">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] sm:text-xs">Shiloh</span>
            <span className="font-serif text-[15px] italic tracking-normal sm:text-base">Season 26</span>
          </span>
          <span className="h-8 w-px bg-primary/25" aria-hidden="true" />
          <span className="max-w-[4.8rem] text-[7px] font-semibold uppercase leading-[1.25] tracking-[0.12em] text-primary/60 min-[420px]:text-[8px] sm:max-w-[7.5rem] sm:text-[9px] lg:tracking-[0.18em]">
            31 Aug - 6 Sep
          </span>
        </a>
        <div className="hidden items-center gap-5 whitespace-nowrap text-xs text-[rgba(225,224,204,0.8)] md:flex lg:gap-7 xl:gap-8">
          {navItems.map((item) => (
            <div key={item.label} className="group relative py-2">
              {'children' in item && item.children ? (
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#E1E0CC]"
                  aria-haspopup="menu"
                >
                  {item.label}
                  <ChevronDown className="h-3 w-3 text-primary/45 transition-transform duration-200 group-hover:rotate-180" />
                </button>
              ) : item.action === 'sow' || item.action === 'sponsor' ? (
                <button
                  type="button"
                  onClick={item.action === 'sow' ? openSowModal : openSponsorModal}
                  className="transition-colors hover:text-[#E1E0CC]"
                >
                  {item.label}
                </button>
              ) : 'href' in item ? (
                <a
                  href={item.href}
                  onClick={navigateTo(item.href!)}
                  className="transition-colors hover:text-[#E1E0CC]"
                >
                  {item.label}
                </a>
              ) : null}
              {'children' in item && item.children ? (
                <div className="pointer-events-none absolute left-1/2 top-full w-64 -translate-x-1/2 translate-y-2 rounded-2xl border border-white/10 bg-black/90 p-2 opacity-0 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    'action' in child && child.action === 'sponsor' ? (
                      <button
                        key={child.label}
                        type="button"
                        onClick={openSponsorModal}
                        className="block w-full rounded-xl px-4 py-3 text-left text-[11px] leading-tight text-primary/75 transition-colors hover:bg-white/10 hover:text-primary"
                      >
                        {child.label}
                      </button>
                    ) : (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={navigateTo(child.href)}
                        className="block rounded-xl px-4 py-3 text-[11px] leading-tight text-primary/75 transition-colors hover:bg-white/10 hover:text-primary"
                      >
                        {child.label}
                      </a>
                    )
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setMenuOpen((current) => {
              if (current) {
                setMobileSubmenu(null);
              }

              return !current;
            });
          }}
          className="shrink-0 rounded-full bg-white/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E1E0CC]/80 transition-all duration-300 hover:bg-white/10 hover:text-[#E1E0CC] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={openSponsorModal}
            className="hidden rounded-full border border-white/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#E1E0CC]/85 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-[#E1E0CC] sm:inline-flex sm:px-4 sm:text-[11px] lg:tracking-[0.12em]"
          >
            <span>Bring</span>
            <span className="hidden sm:inline">&nbsp;Someone</span>
            <span className="hidden xl:inline">&nbsp;to Shiloh</span>
          </button>
          <button
            type="button"
            data-registration-type="conference"
            className="group inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 py-1 pl-3 pr-1 text-xs text-[#E1E0CC] backdrop-blur-xl transition-all duration-300 hover:bg-white/15 sm:gap-2 sm:pl-4 sm:text-sm md:hover:gap-3"
          >
            <span>Register</span>
            <span className="hidden xl:inline">Now</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E1E0CC] text-black transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8">
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-x-3 top-[4.75rem] z-10 max-h-[calc(100vh-5.5rem)] overflow-y-auto rounded-[2rem] border border-white/10 bg-black/92 p-3 text-sm text-[#E1E0CC] shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:hidden"
            initial={{ y: -24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -18, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.32, ease: customEase }}
          >
            {navItems.map((item) => (
              <div key={item.label}>
                {'children' in item && item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setMobileSubmenu((current) => (current === item.label ? null : item.label))}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors hover:bg-white/10"
                      aria-expanded={mobileSubmenu === item.label}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          mobileSubmenu === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileSubmenu === item.label && (
                        <motion.div
                          className="ml-3 border-l border-white/10 pl-3"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: customEase }}
                        >
                          {item.children.map((child) => (
                            'action' in child && child.action === 'sponsor' ? (
                              <button
                                key={child.label}
                                type="button"
                                onClick={openSponsorModal}
                                className="block w-full rounded-xl px-4 py-2 text-left text-xs text-primary/65 transition-colors hover:bg-white/10 hover:text-primary"
                              >
                                {child.label}
                              </button>
                            ) : (
                              <a
                                key={child.label}
                                href={child.href}
                                onClick={navigateTo(child.href)}
                                className="block rounded-xl px-4 py-2 text-xs text-primary/65 transition-colors hover:bg-white/10 hover:text-primary"
                              >
                                {child.label}
                              </a>
                            )
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : item.action === 'sow' || item.action === 'sponsor' ? (
                  <button
                    type="button"
                    onClick={item.action === 'sow' ? openSowModal : openSponsorModal}
                    className="block w-full rounded-xl px-4 py-3 text-left transition-colors hover:bg-white/10"
                  >
                    {item.label}
                  </button>
                ) : 'href' in item ? (
                  <a
                    href={item.href}
                    onClick={navigateTo(item.href!)}
                    className="block rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
                  >
                    {item.label}
                  </a>
                ) : null}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: customEase }}
    >
      <div className="flex flex-col items-center text-center text-white">
        <motion.img
          src={heroLogo}
          alt="Shiloh logo"
          className="h-20 w-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: customEase }}
        />
        <motion.h2
          className="mt-6 text-sm uppercase tracking-[0.5em] text-white/85"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: customEase }}
        >
          Shiloh 2026
        </motion.h2>
        <motion.div
          className="mt-6 h-px w-40 overflow-hidden rounded-full bg-white/20"
          initial={{ scaleX: 0.35, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: customEase }}
        >
          <motion.span
            className="block h-full w-1/3 bg-white"
            animate={{ x: ['-120%', '320%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-black px-4 pb-6 pt-20 text-white sm:px-6 md:h-screen md:min-h-[640px] md:px-10 md:pb-6 md:pt-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="noise-overlay absolute inset-0 opacity-55 mix-blend-overlay" />
        <div className="absolute bottom-8 left-[-6rem] h-[300px] w-[600px] rounded-full bg-[#F4791B] opacity-35 blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-10 right-[-2rem] h-[300px] w-[300px] rounded-full bg-[#F4791B] opacity-30 blur-[100px] mix-blend-screen" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[24vw] font-extrabold uppercase tracking-[0.22em] text-white/[0.08] blur-[4px]">
          SHILOH
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.12)_34%,rgba(0,0,0,0.58)_76%,#000000_100%)]" />
      </div>
      <div className="hero-gradient pointer-events-none absolute inset-0 z-[15] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.08)_42%,rgba(0,0,0,0.48)_74%,#000000_100%)]" />

      <HeroHeader />

      <div className="relative z-20 mx-auto flex max-w-7xl flex-col md:h-full md:justify-end">
        <div className="hero-layout flex flex-col gap-5 md:gap-6">
          <div className="hero-centerpiece relative flex flex-col items-center md:min-h-[520px] md:justify-center">
            <motion.h1
              className="hero-display relative z-20 w-full text-center font-extrabold uppercase leading-[0.82] tracking-[0.06em] text-white md:tracking-[0.08em]"
              initial={{ y: 24, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
            >
              <span className="mobile-hero-title flex flex-col items-center">
                <span className="font-serif italic normal-case tracking-[0.02em]">It&apos;s My Shiloh Season</span>
              </span>
            </motion.h1>

            <div className="hero-portrait pointer-events-none relative z-50 mt-6">
              <motion.div
                className="w-full"
                initial={{ y: 28, opacity: 0, scale: 0.97 }}
                animate={inView ? { y: 0, opacity: 1, scale: 1 } : { y: 28, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.95, delay: 0.2, ease: customEase }}
              >
                <img
                  src={shilohPortrait}
                  alt=""
                  className="hero-portrait-img block w-full object-contain drop-shadow-[0_28px_44px_rgba(0,0,0,0.32)]"
                />
              </motion.div>
            </div>
          </div>

          <div className="hero-support relative z-20 flex flex-col gap-5 md:min-h-[150px]">
            <motion.div
              className="hero-intro flex max-w-sm flex-col gap-5 md:absolute md:bottom-0 md:left-0"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.75, delay: 0.35, ease: customEase }}
            >
              <p className="text-sm leading-[1.45] text-white/88 sm:text-base">
                We are thrilled to officially announce that Shiloh is set to take place from August 31st -
                September 6th at Fort Moriah City and The Harare Hippodrome!
              </p>
            </motion.div>

            <motion.div
              className="hero-action flex flex-col items-start gap-5 md:absolute md:bottom-0 md:right-0 md:items-end"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.75, delay: 0.45, ease: customEase }}
            >
              <a
                href="#about"
                className="hero-discover text-[10px] uppercase tracking-[0.5em] text-white/80 transition-colors hover:text-white"
                aria-label="Scroll to about section"
              >
                Discover
              </a>
              <PillButton href="#features">VIP Experience</PillButton>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-32 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#000000_82%)] md:h-40" />
    </section>
  );
}

function JourneyCarouselSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const activeEvent = journeyEvents[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + journeyEvents.length) % journeyEvents.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % journeyEvents.length);
  };

  useEffect(() => {
    const timer = window.setInterval(goToNext, 7300);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section ref={sectionRef} id="journey-season" className="journey-carousel-section bg-white px-4 py-16 text-black sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-5 md:mb-16">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.45em] text-black/40">2026 Planning Information</p>
            <h2 className="journey-section-heading text-3xl leading-none tracking-[-0.035em] text-black sm:text-4xl md:text-5xl">
              Shiloh Season
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goToPrevious}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-black transition-colors hover:bg-black hover:text-white"
              aria-label="Previous journey event"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-black text-white transition-colors hover:bg-black/80"
              aria-label="Next journey event"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-10 flex gap-7 overflow-x-auto pb-3 text-xs font-light uppercase tracking-normal text-black/30 md:justify-center md:gap-14">
          {journeyEvents.map((event, index) => (
            <button
              key={event.tab}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`shrink-0 border-b pb-4 transition-colors ${
                activeIndex === index ? 'border-black text-black' : 'border-transparent hover:text-black/60'
              }`}
            >
              {event.tab}
            </button>
          ))}
        </div>

        <motion.article
          key={activeEvent.title}
          className="grid overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:grid-cols-[1.05fr_0.95fr]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: customEase }}
        >
          <div className="min-h-[300px] overflow-hidden md:min-h-[560px]">
            <img src={activeEvent.image} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center bg-white px-6 py-10 text-black sm:px-10 md:px-14">
            <p className="mb-6 text-xs font-light uppercase tracking-[0.45em] text-black/40">{activeEvent.date}</p>
            <h3 className="journey-card-title mb-7 text-3xl leading-[0.95] tracking-[-0.035em] text-black sm:text-4xl">
              {activeEvent.title}
            </h3>
            <p className="whitespace-pre-line text-sm leading-[1.65] text-black/55 sm:text-base md:text-lg">
              {activeEvent.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {activeEvent.buttons.map((button, index) => (
                <a
                  key={button.label}
                  href={button.href}
                  data-direct-registration={button.external ? 'true' : undefined}
                  className={`rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.28em] transition-transform hover:-translate-y-0.5 ${
                    index === 0
                      ? 'bg-black text-white shadow-[0_18px_40px_rgba(0,0,0,0.14)]'
                      : 'border border-black/10 bg-white text-black'
                  }`}
                >
                  {button.label}
                </a>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

function FortMoriahMapSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const infoRef = useRef<HTMLDivElement>(null);
  const activeLocation = mapLocations[activeIndex];

  const selectLocation = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="fort-moriah-map" className="bg-white px-4 py-16 text-black sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.45em] text-black/40">Fort Moriah</p>
            <h2 className="journey-section-heading text-3xl leading-none tracking-[-0.035em] text-black sm:text-4xl md:text-5xl">
              Interactive Map
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-black/55 md:text-right">
            Tap a golden marker to reveal directions, access notes, and the closest arrival point.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.34fr_0.66fr]">
          <motion.div
            ref={infoRef}
            id="fort-moriah-map-info"
            className="order-2 rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)] lg:order-1 lg:min-h-[520px] lg:p-8"
            key={activeLocation.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: customEase }}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-black/40">{activeLocation.label}</p>
            <h3 className="journey-card-title mb-6 text-3xl leading-[0.95] tracking-[-0.035em] text-black">
              {activeLocation.title}
            </h3>
            <p className="mb-8 text-sm leading-relaxed text-black/60 sm:text-base">{activeLocation.description}</p>
            <div className="mb-8 space-y-3">
              {activeLocation.details.map((detail) => (
                <div key={detail} className="flex gap-3 text-sm leading-snug text-black/55">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-black" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {mapLocations.map((location, index) => (
                <button
                  key={location.title}
                  type="button"
                  onClick={() => selectLocation(index)}
                  className={`flex w-full items-center justify-between rounded-full px-4 py-3 text-left text-xs uppercase tracking-[0.2em] transition-colors ${
                    activeIndex === index ? 'bg-black text-white' : 'bg-black/[0.035] text-black/55 hover:bg-black/[0.07] hover:text-black'
                  }`}
                >
                  {location.title}
                  <MapPin className="h-4 w-4" />
                </button>
              ))}
            </div>
          </motion.div>

          <div className="order-1 overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#f6f6f6] shadow-[0_24px_80px_rgba(0,0,0,0.08)] lg:order-2">
            <div className="relative aspect-[4/3] md:aspect-[16/10]">
              <img src={fortMoriahMap} alt="Fort Moriah map" className="h-full w-full object-cover md:scale-125" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.04)_56%,rgba(255,255,255,0.35)_100%)]" />
              {mapLocations.map((location, index) => (
                <button
                  key={location.title}
                  type="button"
                  onClick={() => selectLocation(index)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${location.position.x}%`, top: `${location.position.y}%` }}
                  aria-label={`Show ${location.title}`}
                >
                  <span
                    className={`absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d7aa43]/60 transition-all duration-300 ${
                      activeIndex === index ? 'scale-125 opacity-100 shadow-[0_0_28px_rgba(215,170,67,0.55)]' : 'scale-100 opacity-60 group-hover:scale-125'
                    }`}
                  />
                  <span
                    className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                      activeIndex === index ? 'border-[#f0c96f] bg-[#f0c96f] text-black' : 'border-[#d7aa43]/70 bg-black/55 text-[#f0c96f] backdrop-blur-sm'
                    }`}
                  >
                    <MapPin className="h-4 w-4" />
                  </span>
                </button>
              ))}
              <motion.div
                key={activeLocation.title}
                className="absolute left-1/2 top-1/2 z-20 w-[min(84%,20rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-black p-5 text-white shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:hidden"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28, ease: customEase }}
              >
                <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/40">{activeLocation.label}</p>
                <h3 className="journey-card-title mb-3 text-2xl leading-none text-white">{activeLocation.title}</h3>
                <p className="mb-4 text-xs leading-relaxed text-white/70">{activeLocation.description}</p>
                <a href="#fort-moriah-map-info" className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-black">
                  Read more
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneySupportSection({
  theme = 'light',
  showAside = true,
}: {
  theme?: 'light' | 'dark';
  showAside?: boolean;
} = {}) {
  const [openIndex, setOpenIndex] = useState(0);
  const isDark = theme === 'dark';
  const faqItems = [
    {
      title: 'Entry Requirements to Zimbabwe',
      icon: ShieldCheck,
      content: (
        <div className="space-y-8">
          <p className="text-sm leading-relaxed text-black/65 sm:text-base lg:text-lg">
            Visa requirements vary depending on your country of departure and passport origin. We recommend checking the
            official Zimbabwe immigration website at{' '}
            <a href="https://www.evisa.gov.zw" className="inline-flex items-center gap-1 font-semibold text-black">
              www.evisa.gov.zw <ExternalLink className="h-4 w-4" />
            </a>{' '}
            under the Visa Regime section to confirm your
            specific requirements.
          </p>
          <div className="rounded-[1.35rem] border border-black/8 bg-[#fbfbfb] p-6 shadow-[inset_0_1px_0_rgba(0,0,0,0.03)] sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm text-white">1</span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-black sm:text-sm sm:tracking-[0.24em]">For those who require a visa, please note:</p>
            </div>
            <ul className="ml-6 list-disc space-y-3 text-sm leading-relaxed text-black/60 sm:text-base">
              <li>
                The minimum visa fee starts at <span className="font-semibold text-black">$30</span>, payable on arrival.
              </li>
              <li>
                All visa applications must be submitted online by <span className="font-semibold text-black">25 August 2026</span>.
              </li>
            </ul>
            <p className="mt-8 text-sm italic text-black/45">
              Questions: contact <span className="font-semibold text-black">tendai.murumbi@opeaal.co.zw.</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Currency & Payment Cards',
      icon: CreditCard,
      content: (
        <div className="space-y-8">
          <p className="text-sm leading-relaxed text-black/65 sm:text-base lg:text-lg">
            Please note that in Zimbabwe, transactions are predominantly conducted in cash, and the US dollar is commonly
            accepted.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.25rem] border border-black/8 bg-[#fbfbfb] p-6">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-black sm:text-sm">Cash Transactions</p>
              <p className="text-sm leading-relaxed text-black/60 sm:text-base">
                Transactions are mostly done in cash. The US dollar is widely accepted for convenience.
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-black/8 bg-[#fbfbfb] p-6">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-black sm:text-sm">Card Payments</p>
              <p className="text-sm leading-relaxed text-black/60 sm:text-base">
                POS machines at Exodus Night for Visa/MC. Bring <span className="font-semibold text-black">physical card.</span>
              </p>
            </div>
          </div>
          <div className="flex gap-4 rounded-[1.25rem] border border-black/10 bg-[#fbfbfb] p-5 text-sm uppercase tracking-[0.08em] text-black/60">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-black" />
            <p>
              <span className="font-bold text-black">Important:</span> Bring smaller denominations{' '}
              <span className="font-bold text-black">($1 and $5)</span>. No change for 50-cent coins.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Recommended Dress Code',
      icon: Shirt,
      content: <p>Shiloh T-Shirt, jeans, trousers, trainers, and comfortable shoes are recommended.</p>,
    },
    {
      title: 'Recommended Stay',
      icon: Building2,
      content: (
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              name: 'Rainbow Towers Hotel',
              tag: 'Conference hotel',
              detail: 'RTG hotel at 1 Pennefather Avenue, positioned for major conference and business travel in Harare.',
              href: 'https://rtgafrica.com/',
            },
            {
              name: 'Cresta Jameson',
              tag: 'Central Harare',
              detail: 'A four-star Cresta property in Harare’s central business district with accommodation and conference options.',
              href: 'https://www.crestahotels.com/hotels/zimbabwe/cresta-jameson',
            },
            {
              name: 'Holiday Inn Harare',
              tag: 'IHG hotel',
              detail: 'Comfort-focused hotel on Samora Machel Avenue with parking, restaurants, pool, gym, and Wi-Fi.',
              href: 'https://www.ihg.com/holidayinn/hotels/us/en/harare/harsf/hoteldetail',
            },
            {
              name: 'Hyatt Regency Harare The Meikles',
              tag: 'Luxury stay',
              detail: 'Five-star city hotel in central Harare with dining, spa, pool, meeting facilities, and concierge services.',
              href: 'https://www.hyatt.com/hyatt-regency/en-US/hrerh-hyatt-regency-harare-the-meikles',
            },
          ].map((stay) => (
            <a
              key={stay.name}
              href={stay.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[12rem] flex-col justify-between rounded-[1.25rem] border border-black/8 bg-[#fbfbfb] p-5 transition-all hover:-translate-y-1 hover:border-black/20 hover:bg-white hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
            >
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-black/35">{stay.tag}</p>
                <h4 className="journey-card-title mb-4 text-xl leading-none text-black sm:text-2xl">{stay.name}</h4>
                <p className="text-sm leading-relaxed text-black/55">{stay.detail}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-black">
                View stay
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </a>
          ))}
        </div>
      ),
    },
    {
      title: 'Recommended Taxi',
      icon: Car,
      content: (
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              name: 'Easy Transit',
              tag: 'Airport + chauffeur',
              detail: 'Harare-based airport transfers, chauffeur drive, corporate transfers, point-to-point travel, tours, and long-distance trips.',
              href: 'https://www.easytransit.co.zw/',
            },
            {
              name: 'Bolt Harare',
              tag: 'Ride-hailing app',
              detail: 'Bolt lists ride services in Harare, letting guests request a pickup from the app when available.',
              href: 'https://bolt.eu/en-fi/cities/harare/',
            },
            {
              name: 'inDrive Zimbabwe',
              tag: 'Ride-hailing + intercity',
              detail: 'inDrive has announced ride-hailing across Harare, Bulawayo, Gweru, and Mutare, plus courier and intercity services.',
              href: 'https://www.indrive.com/',
            },
            {
              name: 'Airport Transfer Portal',
              tag: 'Airport transfer booking',
              detail: 'Compare and book Robert Gabriel Mugabe International Airport transfers with verified local suppliers.',
              href: 'https://www.airporttransferportal.com/airport/hre',
            },
          ].map((taxi) => (
            <a
              key={taxi.name}
              href={taxi.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[12rem] flex-col justify-between rounded-[1.25rem] border border-black/8 bg-[#fbfbfb] p-5 transition-all hover:-translate-y-1 hover:border-black/20 hover:bg-white hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
            >
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-black/35">{taxi.tag}</p>
                <h4 className="journey-card-title mb-4 text-xl leading-none text-black sm:text-2xl">{taxi.name}</h4>
                <p className="text-sm leading-relaxed text-black/55">{taxi.detail}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-black">
                Open service
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </a>
          ))}
        </div>
      ),
    },
  ];

  const hotlines = [
    { flag: '🇺🇸', country: 'USA', phone: '+1 448 877 0344' },
    { flag: '🇬🇧', country: 'UK', phone: '+44 1244 727242' },
    { flag: '🇿🇼', country: 'Zimbabwe', phone: '+263 8677 211 645' },
    { flag: '🇿🇦', country: 'S. Africa', phone: '+27 872 654 913' },
  ];

  return (
    <section
      id="journey-support"
      className={`${isDark ? 'bg-black text-[#E1E0CC]' : 'bg-white text-black'} px-4 py-16 sm:px-6 md:py-24`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <p className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.45em] ${isDark ? 'text-primary/45' : 'text-black/40'}`}>
              <ShieldCheck className="h-4 w-4" />
              Guidance
            </p>
            <h2 className={`journey-section-heading text-4xl leading-[0.9] tracking-[-0.045em] sm:text-5xl md:text-6xl ${isDark ? 'text-primary' : 'text-black'}`}>
              Experience
              <span className={`block ${isDark ? 'text-primary/30' : 'text-black/25'}`}>Support</span>
            </h2>
          </div>
          <p className={`max-w-2xl text-left text-sm font-light uppercase leading-loose tracking-[0.32em] md:ml-auto md:text-right md:text-base ${isDark ? 'text-primary/45' : 'text-black/45'}`}>
            Essential logistics for travel, finance, and security during your visit.
          </p>
        </div>

        <div className={`grid gap-8 lg:items-start ${showAside ? 'lg:grid-cols-[1.35fr_0.65fr]' : ''}`}>
          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const Icon = item.icon;
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.title}
                  className={`overflow-hidden rounded-[1.75rem] border bg-white transition-shadow ${
                    isOpen ? 'border-black shadow-[0_18px_60px_rgba(0,0,0,0.08)]' : 'border-black/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.025)]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center gap-4 px-5 py-6 text-left sm:px-7 sm:py-8"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors ${
                        isOpen ? 'bg-black text-white' : 'bg-black/[0.035] text-black/35'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="journey-card-title flex-1 text-sm uppercase leading-tight tracking-[0.04em] text-black/75 sm:text-lg lg:text-xl">
                      {item.title}
                    </span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-black/30 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: customEase }}
                      >
                        <div className="border-t border-black/5 px-5 pb-8 pt-7 text-sm leading-relaxed text-black/58 sm:px-7 sm:pb-10 sm:pt-8">
                          {item.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {showAside ? (
            <aside className="rounded-[2rem] bg-black p-7 text-white shadow-[0_30px_90px_rgba(0,0,0,0.18)] sm:p-9 lg:sticky lg:top-28">
              <div className="mb-10 flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] text-white/55">
                  <Phone className="h-5 w-5" />
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.45em] text-white/80">Hotlines</p>
              </div>
              <div className="space-y-8">
                {hotlines.map((hotline) => (
                  <div key={hotline.country}>
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">
                      <span className="mr-3">{hotline.flag}</span>
                      {hotline.country}
                    </p>
                    <a href={`tel:${hotline.phone.replace(/\s/g, '')}`} className="journey-card-title text-xl leading-none text-white">
                      {hotline.phone}
                    </a>
                  </div>
                ))}
              </div>
              <div className="my-10 h-px bg-white/12" />
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Concierge</p>
                <a href="mailto:support@goodnewsworld.com" className="flex items-center gap-3 text-base text-white/80 transition-colors hover:text-white">
                  <Mail className="h-5 w-5 text-white/35" />
                  support@goodnewsworld.com
                </a>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function JourneyFooter() {
  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Plan Your Shiloh', href: '/journey' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-white px-4 pb-4 text-black sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-black px-5 py-10 text-white sm:px-8 md:px-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-start">
          <div>
            <a href="/" className="mb-8 inline-flex items-center gap-4">
              <img src={logo} alt="Shiloh logo" className="h-12 w-12 rounded-full object-contain" />
              <span className="text-xs font-bold uppercase tracking-[0.42em] text-white/55">Shiloh Season</span>
            </a>
            <h2 className="journey-section-heading max-w-3xl text-4xl leading-[0.9] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl">
              Plan Your
              <span className="block text-white/35">Journey</span>
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Explore</p>
              <div className="flex flex-col gap-3 text-sm text-white/70">
                {footerLinks.map((link) => (
                  <a key={link.label} href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">Support</p>
              <div className="flex flex-col gap-3 text-sm text-white/70">
                <a href="tel:+14488770344" className="transition-colors hover:text-white">
                  🇺🇸 +1 448 877 0344
                </a>
                <a href="mailto:support@goodnewsworld.com" className="transition-colors hover:text-white">
                  support@goodnewsworld.com
                </a>
                <a href="https://shilohseason.com" className="transition-colors hover:text-white">
                  Shilohseason.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.22em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>Shiloh 2026</p>
          <p>Copyrights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function ScrollRevealLine({
  children,
  start,
  end,
  scrollYProgress,
}: {
  children: string;
  start: number;
  end: number;
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1]);
  const backgroundOpacity = useTransform(scrollYProgress, [start, end, Math.min(end + 0.18, 1)], [0, 0.5, 0]);

  return (
    <motion.span
      style={{ opacity, backgroundColor: useTransform(backgroundOpacity, (value) => `rgba(46, 59, 78, ${value})`) }}
      className="inline box-decoration-clone px-1"
    >
      {children}
    </motion.span>
  );
}

function VipWhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lines = [
    'Why worry about logistics when you can focus on the message?',
    'This year, we are offering an exclusive VIP tier designed for those',
    'who value time, comfort, and proximity.',
  ];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'center 0.35'],
  });

  return (
    <section id="vip-discover" ref={sectionRef} className="bg-black px-4 py-24 text-white sm:px-8 md:py-32">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center text-center">
        <h2 className="vip-title gold-emboss mb-14 text-5xl leading-none tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-8xl">
          WHY VIP?
        </h2>
        <p className="vip-copy max-w-3xl text-balance text-lg font-light leading-[1.35] tracking-normal text-white sm:text-xl md:text-2xl lg:text-3xl">
          {lines.map((line, index) => (
            <span key={line} className="block">
              <ScrollRevealLine start={index * 0.28} end={index * 0.28 + 0.22} scrollYProgress={scrollYProgress}>
                {line}
              </ScrollRevealLine>
            </span>
          ))}
        </p>
        <div className="mt-20">
          <PillButton href="#vip-register">Register Now</PillButton>
        </div>
      </div>
    </section>
  );
}

function VipCompareSection() {
  const benefits = [
    {
      benefit: 'Seating',
      general: 'General Seating',
      vip: 'Reserved Front Row',
    },
    {
      benefit: 'Lounge Access',
      general: '—',
      vip: 'Exclusive Access',
    },
    {
      benefit: 'Transport',
      general: 'Self-Arranged',
      vip: 'Hotel-to-Venue Shuttle',
    },
    {
      benefit: 'Refreshments',
      general: 'Public Stalls',
      vip: 'Complimentary Drinks/Snacks',
    },
    {
      benefit: 'Support',
      general: 'General Info Desk',
      vip: 'Dedicated VIP Assistant',
    },
  ];

  return (
    <section id="vip-register" className="bg-black px-4 py-20 text-white sm:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="vip-title gold-emboss mb-12 text-center text-5xl leading-none tracking-[-0.03em] sm:text-6xl md:mb-14 md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.75, ease: customEase }}
        >
          Compare Experience
        </motion.h2>

        <motion.div
          className="hidden overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#151515] shadow-[0_28px_90px_rgba(0,0,0,0.45)] md:block"
          initial={{ opacity: 0, y: 34, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
        >
          <div className="grid grid-cols-[1fr_0.92fr_1.4fr] bg-[#242424] text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
            <div className="border-r border-white/8 px-7 py-5 lg:px-9">Benefit</div>
            <div className="border-r border-white/8 px-7 py-5 text-center lg:px-9">General</div>
            <div className="px-7 py-5 text-center text-white lg:px-9">Shiloh VIP</div>
          </div>
          {benefits.map((item) => (
            <div
              key={item.benefit}
              className="grid min-h-[5.85rem] grid-cols-[1fr_0.92fr_1.4fr] border-t border-white/8 text-base lg:text-lg"
            >
              <div className="flex items-center border-r border-white/8 px-7 font-medium text-white/90 lg:px-9">
                {item.benefit}
              </div>
              <div className="flex items-center justify-center border-r border-white/8 px-7 text-center italic text-white/35 lg:px-9">
                {item.general}
              </div>
              <div className="flex items-center justify-center gap-4 px-7 font-medium text-white/85 lg:px-9">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/12 text-white">
                  <Check className="h-4 w-4" />
                </span>
                <span>{item.vip}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid gap-4 md:hidden">
          {benefits.map((item, index) => (
            <motion.article
              key={item.benefit}
              className="rounded-3xl border border-white/10 bg-[#151515] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.58, delay: index * 0.06, ease: customEase }}
            >
              <p className="text-lg font-semibold text-white">{item.benefit}</p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl bg-white/[0.04] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">General</p>
                  <p className="mt-2 italic text-white/50">{item.general}</p>
                </div>
                <div className="rounded-2xl border border-[#d5a238]/25 bg-[#d5a238]/10 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f2cb62]">Shiloh VIP</p>
                  <div className="mt-2 flex items-center gap-3 text-white">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/12">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="font-medium">{item.vip}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

const vipPassOptions = [
  {
    label: 'Prophetic Retreat',
    date: '31 Aug - 3 Sep',
    price: '$1000 USD',
    tag: 'Retreat',
    href: 'https://programs.uebertangel.org/product/2026/',
    summary:
      'A retreat pass shaped for focused teaching, spiritual preparation, and hosted retreat support.',
    features: [
      'Prophetic Retreat access from 31 August to 3 September.',
      'Single occupancy needs and registration support for delegates preparing for the retreat.',
      'Teaching moments, spiritual alignment, and guided preparation at Fort Moriah City.',
      'A dedicated pass for retreat guests who want clarity before arrival.',
    ],
  },
  {
    label: 'Shiloh VIP',
    date: '4 Sep - 5 Sep',
    price: '$1000 USD',
    tag: 'Conference',
    href: 'https://programs.uebertangel.org/product/2026/',
    summary:
      'Premium conference access for guests who want a focused, elevated experience during the central Shiloh gathering.',
    features: [
      'VIP access for the Shiloh Conference sessions at Fort Moriah City.',
      'Reserved seating support for clearer sightlines and a more settled arrival experience.',
      'Hosted guidance for conference movement, check-in, and guest support during peak gathering moments.',
      'A refined pass for delegates prioritizing the main conference days.',
    ],
  },
  {
    label: 'Birthday VVIP',
    date: '6 Sep 7:00 PM',
    price: '£4000 GBP',
    tag: 'Celebration',
    href: 'https://programs.uebertangel.org/product/birthday/',
    summary:
      'VIP access for the royal birthday celebration honoring the Ra’ah, Prophet Uebert Angel.',
    features: [
      'Birthday VVIP access for the Prophet birthday celebration.',
      'Gala arrival guidance, seating support, and a smoother hosted experience for the evening.',
      'Designed for guests joining the thanksgiving, honor, presentation, and celebration moments.',
      'A focused pass for the Ra’ah birthday gala experience.',
    ],
  },
  {
    label: 'VIP Ultimate Passes',
    date: '31 Aug - 6 Sep',
    price: '$5000 USD',
    tag: 'Full Season',
    href: 'https://programs.uebertangel.org/product/2026/',
    summary:
      'A complete hosted experience for delegates who want premium access across every defining Shiloh Season moment.',
    features: [
      'Premium VIP access for Prophetic Retreat, Shiloh Conference, Sunday Service, and the Ra’ah birthday celebration.',
      'Reserved seating guidance and dedicated arrival support across the full Shiloh Season programme.',
      'Priority movement between key venues so every major service, teaching moment, and celebration is easier to attend.',
      'A single pass designed for guests who want the most complete Shiloh 2026 experience.',
    ],
  },
];

function VipFeaturesSection() {
  const [activePassIndex, setActivePassIndex] = useState(0);
  const activePass = vipPassOptions[activePassIndex];

  return (
    <section id="vip-passes" className="bg-black px-4 py-20 text-white sm:px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-end">
          <div>
            <p className="vip-copy mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-[#f0c96f]/70">
              VIP Passes
            </p>
            <h2 className="vip-title gold-emboss max-w-3xl text-5xl font-normal leading-[0.86] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl">
              Choose Your
              <span className="block">Access</span>
            </h2>
          </div>
          <p className="vip-copy max-w-2xl text-sm font-light leading-relaxed text-white/60 lg:ml-auto lg:text-right">
            Select the VIP pass that matches your Shiloh Season plans. Each option includes dates, clear benefits, and a
            direct registration path for the experience you are preparing for.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.085),rgba(255,255,255,0.025))] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-5 lg:p-7">
          <div className="grid gap-2 rounded-[1.4rem] bg-black/40 p-2 sm:grid-cols-2 lg:grid-cols-4">
            {vipPassOptions.map((pass, index) => (
              <button
                key={pass.label}
                type="button"
                onClick={() => setActivePassIndex(index)}
                className={`rounded-[1.1rem] px-4 py-4 text-left transition-all duration-300 ${
                  activePassIndex === index
                    ? 'bg-[#f0c96f] text-black shadow-[0_12px_34px_rgba(240,201,111,0.24)]'
                    : 'text-white/66 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="block text-[10px] font-bold uppercase tracking-[0.28em] opacity-70">
                  {pass.date}
                </span>
                <span className="mt-2 block text-sm font-semibold sm:text-base">{pass.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={activePass.label}
              className="mt-5 grid gap-8 rounded-[1.6rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] p-6 sm:p-8 lg:grid-cols-[0.72fr_1fr] lg:p-10"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: customEase }}
            >
              <div className="flex flex-col">
                <p className="mb-4 w-max rounded-full bg-[#d5a238]/12 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#f0c96f]">
                  {activePass.tag}
                </p>
                <h3 className="vip-title text-4xl leading-none text-white sm:text-5xl">{activePass.label}</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl bg-white/[0.055] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/35">Date</p>
                    <p className="mt-2 text-2xl text-white">{activePass.date}</p>
                  </div>
                  <div className="rounded-2xl bg-[#d5a238]/10 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#f0c96f]/70">Price</p>
                    <p className="mt-2 vip-title text-4xl leading-none text-[#f7d98e]">{activePass.price}</p>
                  </div>
                </div>
                <a
                  href={activePass.href}
                  data-direct-registration="true"
                  className="mt-7 inline-flex w-max items-center gap-3 rounded-full bg-[#E1E0CC] px-6 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Register Now
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div className="flex flex-col justify-between gap-8">
                <p className="vip-copy text-base leading-relaxed text-white/70 sm:text-lg">{activePass.summary}</p>
                <ul className="grid gap-4">
                  {activePass.features.map((feature) => (
                    <li key={feature} className="flex gap-4 rounded-2xl bg-white/[0.04] p-4 text-sm leading-relaxed text-white/72">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f0c96f]/15 text-[#f0c96f]">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  const hotlines = [
    { flag: '🇺🇸', country: 'USA', phone: '+1 448 877 0344' },
    { flag: '🇬🇧', country: 'UK', phone: '+44 1244 727242' },
    { flag: '🇿🇼', country: 'Zimbabwe', phone: '+263 8677 211 645' },
    { flag: '🇿🇦', country: 'South Africa', phone: '+27 872 654 913' },
  ];

  return (
    <main className="min-h-screen bg-black text-[#E1E0CC]">
      <HeroHeader sticky />
      <section className="px-4 py-16 sm:px-6 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-primary/55">Contact</p>
              <h1 className="font-serif text-5xl italic leading-none text-primary sm:text-6xl md:text-7xl">
                Shiloh Support
              </h1>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-primary/62 sm:text-base lg:ml-auto lg:text-right">
              Reach the Shiloh Season support team for registration guidance, travel questions, and guest assistance.
              The frequently asked questions below are the same planning notes from Plan Your Journey.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {hotlines.map((hotline) => (
              <a
                key={hotline.country}
                href={`tel:${hotline.phone.replace(/\s/g, '')}`}
                className="group rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-white/[0.09]"
              >
                <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.35em] text-primary/35">
                  <span className="mr-3">{hotline.flag}</span>
                  {hotline.country}
                </p>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xl text-primary">{hotline.phone}</span>
                  <Phone className="h-5 w-5 text-primary/35 transition-colors group-hover:text-primary" />
                </div>
              </a>
            ))}
          </div>

          <a
            href="mailto:support@goodnewsworld.com"
            className="mt-4 flex flex-col gap-4 rounded-[1.5rem] border border-primary/15 bg-primary px-6 py-6 text-black transition-transform duration-300 hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.35em] text-black/45">Email</span>
              <span className="mt-2 block text-xl font-semibold">support@goodnewsworld.com</span>
            </span>
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </section>
      <JourneySupportSection theme="dark" showAside={false} />
      <Footer />
    </main>
  );
}

function VipPage() {
  return (
    <main className="vip-page min-h-screen bg-black text-[#202A36]">
      <section className="relative h-screen overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={vipVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-b from-transparent via-black/30 to-black" />
        <HeroHeader />

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex flex-1 items-start justify-center px-4 pt-[25vh] text-center md:pt-[35vh]">
            <motion.div
              className="max-w-5xl -translate-y-1/2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: customEase }}
            >
              <p className="vip-copy mb-4 text-sm font-semibold uppercase tracking-wider text-gray-600">Shiloh 2026</p>
              <h1 className="vip-title select-text text-5xl leading-none tracking-tighter md:text-6xl lg:text-7xl">
                <span className="gold-emboss block">VIP</span>
                <span className="-mt-3 block text-[#202A36]">Experience</span>
              </h1>
              <p className="vip-copy mx-auto mb-6 mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-600 md:text-lg">
                Proximity to the vision. Every word, every moment, crystal clear.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <PillButton href="#vip-discover">Discover</PillButton>
                <PillButton href="#vip-register">Register Now</PillButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <VipWhySection />
      <VipCompareSection />
      <VipFeaturesSection />
      <Footer />
    </main>
  );
}

function JourneyPage({ startAnimations }: { startAnimations: boolean }) {
  const actions = [
    { label: 'Shiloh Season 2026', href: '#journey-season' },
    { label: '2026 Maps', href: '#fort-moriah-map' },
    { label: "2026 Support & FAQ'S", href: '#journey-support' },
  ];

  return (
    <main className="journey-page min-h-screen bg-black">
      <section className="relative flex min-h-screen overflow-hidden text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={journeyVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.45)_58%,#000_100%)]" />

        <HeroHeader />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-[200px] pt-24 text-center">
          <motion.div
            className="liquid-glass rounded-full px-3 py-2 text-sm text-white/90"
            initial={{ opacity: 0, y: 14 }}
            animate={startAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.45, ease: customEase }}
          >
            Shiloh Season 2026
          </motion.div>

          <h1 className="journey-heading mt-6 max-w-4xl text-5xl leading-[0.9] tracking-[-3px] text-[hsl(var(--heading))] md:text-6xl lg:text-[4.7rem]">
            <BlurText key={startAnimations ? 'journey-ready' : 'journey-wait'} text="Plan You Journey" start={startAnimations} />
          </h1>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={startAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.45, delay: 0.35, ease: customEase }}
          >
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="liquid-glass group inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                {action.label}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-110">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>
      <JourneyCarouselSection />
      <FortMoriahMapSection />
      <JourneySupportSection />
      <JourneyFooter />
    </main>
  );
}

function About() {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const aboutText =
    'Shiloh Conference is far more than just a church event - it is a powerful spiritual encounter designed to ignite your faith, renew your purpose, and deepen your walk with God. Prepare for a life-transforming experience filled with divine revelation, uplifting worship, and meaningful fellowship.';
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  return (
    <section id="about" className="bg-black px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl rounded-[1.5rem] bg-[#101010] px-5 py-14 text-center sm:px-10 md:py-20">
        <p className="mb-7 text-[10px] uppercase tracking-[0.3em] text-primary sm:text-xs">Shiloh 2026</p>
        <h2 className="mx-auto max-w-4xl text-[clamp(1.45rem,3.1vw,2.85rem)] leading-[1.12] text-primary sm:leading-[1.08]">
          <WordsPullUpMultiStyle
            delayStep={0.035}
            duration={0.5}
            segments={[
              { text: 'Shiloh 2026 Is Here', className: 'font-serif italic' },
              {
                text: "Join us from August 31st - September 6th at GoodNews City, Zimbabwe. This is more than a conference; it is a powerful encounter to ignite your faith, renew your purpose, and deepen your walk with God. Mark your calendar. We can't wait to see you!",
                className: 'font-normal',
              },
            ]}
          />
        </h2>
        <p
          ref={paragraphRef}
          className="relative mx-auto mt-12 max-w-3xl text-xs leading-relaxed text-[#DEDBC8] sm:text-sm md:text-base"
        >
          {aboutText.split('').map((character, index) => (
            <AnimatedLetter
              key={`${character}-${index}`}
              character={character}
              index={index}
              totalChars={aboutText.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </p>
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: customEase }}
        >
          <PillButton href="#features">Let Us Know You&apos;re Coming</PillButton>
          <PillButton href="#features" variant="glass">
            VIP Experience
          </PillButton>
        </motion.div>
      </div>
    </section>
  );
}

const featureCards = [
  {
    number: '01',
    title: 'Prophetic Retreat',
    date: 'August 31 - September 3',
    image: 'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/69f215eb590487fe57c29406.jpg',
    items: [
      'Teaching for every level, whether you are beginning or already attending as a student.',
      'Learning sessions with the highly esteemed Prophet Uebert Angel at Mount Moriah City.',
      'A sacred atmosphere where signs, wonders, and prophetic manifestations take place.',
      'An extraordinary retreat experience you will not want to miss.',
    ],
  },
  {
    number: '02',
    title: 'Shiloh Conference',
    date: 'September 4 - September 6',
    image: 'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/69f2171efab44d4020a08d69.jpg',
    items: [
      'A powerful gathering at Fort Moriah City.',
      'An encounter where every form of disappointment is averted.',
      'Every limitation is dealt with and completely eradicated.',
    ],
  },
  {
    number: '03',
    title: "The Ra'ah's Birthday Gala",
    date: 'September 6',
    image: 'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/69f2171e590487fe57c2f87b.jpg',
    items: [
      "A royal birthday celebration honoring the Ra'ah, Prophet Uebert Angel.",
      'A special delegation with dance, thanksgiving, and joyful presentation.',
      'An elegant gala atmosphere for celebration, honor, and fellowship.',
    ],
  },
];

function FeatureCard({
  card,
  index,
  inView,
}: {
  card: (typeof featureCards)[number];
  index: number;
  inView: boolean;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: index * 0.15, ease: cardEase },
    },
  };
  const imagePosition = card.title === 'Prophetic Retreat' ? 'object-[50%_44%]' : 'object-center';

  return (
    <motion.article
      className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-lg bg-[#212121] md:min-h-0"
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="flex h-48 shrink-0 items-center justify-center overflow-hidden border-b border-white/5 lg:h-44">
        <img
          src={card.image}
          alt=""
          className={`h-full w-full object-cover ${imagePosition}`}
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs text-gray-500">{card.date}</p>
            <h3 className="text-lg leading-tight text-primary sm:text-xl">{card.title}</h3>
          </div>
          <span className="text-sm text-primary/60">{card.number}</span>
        </div>
        <ul className="space-y-3">
          {card.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-snug text-gray-400">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <a href="#footer" className="mt-auto inline-flex items-center gap-2 pt-8 text-sm text-primary">
          Learn more
          <ArrowRight className="h-4 w-4 -rotate-45" />
        </a>
      </div>
    </motion.article>
  );
}

function Features() {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: '-100px' });

  return (
    <section id="features" className="relative min-h-screen overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-4xl text-center text-lg font-normal leading-tight sm:text-xl md:text-2xl lg:text-3xl">
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Discover Shiloh Season', className: 'font-serif italic text-primary' },
              { text: '🤫 What happerns in Shiloh Stays in Shiloh', className: 'text-gray-300' },
            ]}
          />
        </div>
        <div ref={gridRef} className="grid gap-3 sm:gap-2 md:auto-rows-fr md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4">
          <motion.a
            href="/journey"
            className="group relative h-full min-h-[420px] overflow-hidden rounded-lg md:min-h-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: cardEase }}
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={featureVideo}
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/10" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <h3 className="text-xl leading-none" style={{ color: primaryText }}>
                Plan Your Journey
              </h3>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-black/35 text-primary backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </motion.a>
          {featureCards.map((card, index) => (
            <FeatureCard key={card.number} card={card} index={index + 1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer" className="bg-black px-4 pb-10 pt-6 sm:px-6">
      <div className="mx-auto max-w-7xl border-t border-primary/15 pt-8 text-primary">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-primary/70">Call Center</p>
        <div className="grid gap-3 text-sm sm:grid-cols-2 md:grid-cols-4 md:text-base">
          <a href="tel:+14488770344" className="text-primary/90 transition-colors hover:text-primary">
            🇺🇸 +1 448 877 0344
          </a>
          <a href="tel:+441244727242" className="text-primary/90 transition-colors hover:text-primary">
            🇬🇧 +44 1244 727242
          </a>
          <a href="tel:+2638677211645" className="text-primary/90 transition-colors hover:text-primary">
            🇿🇼 +263 8677 211 645
          </a>
          <a href="tel:+27872654913" className="text-primary/90 transition-colors hover:text-primary">
            🇿🇦 +27 872 654 913
          </a>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-primary/10 pt-6 text-sm text-primary/60 sm:flex-row sm:items-center sm:justify-between">
          <a href="https://shilohseason.com" className="text-primary transition-colors hover:text-primary/80">
            Shilohseason.com
          </a>
          <p>Copyrights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function CelebrationBurst({ active }: { active: boolean }) {
  const particles = Array.from({ length: 34 }, (_, index) => index);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[130] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="rounded-full bg-white px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.28em] text-black shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
            initial={{ scale: 0.82, y: 18 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.45, ease: customEase }}
          >
            Thank you
          </motion.div>
          {particles.map((particle) => {
            const angle = (particle / particles.length) * Math.PI * 2;
            const distance = 180 + (particle % 6) * 28;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const colors = ['#f2cb62', '#ffffff', '#d5a238', '#e1e0cc', '#8b5b12'];

            return (
              <motion.span
                key={particle}
                className="absolute h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: colors[particle % colors.length] }}
                initial={{ x: 0, y: 0, scale: 0.3, opacity: 0 }}
                animate={{ x, y, scale: [0.3, 1, 0.2], opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: customEase }}
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RegistrationModal({
  open,
  onClose,
  type,
}: {
  open: boolean;
  onClose: () => void;
  type: 'conference' | 'birthday';
}) {
  const registrationTitle = "Let Us Know You're Coming";
  const registrationUrl =
    'https://forms.zohopublic.eu/rikki/form/ShilohConference/formperma/J6C7fbe7BrKqBwpANMaW8npFSckhVhrh5UubLKzyTro';

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <motion.div
            className="relative flex max-h-[88svh] w-full max-w-3xl flex-col overflow-hidden rounded-[1.6rem] bg-white text-black shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.42, ease: customEase }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-black/10 px-5 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-black/45">Registration</p>
                <h2 className="journey-card-title mt-1 text-2xl text-black">{registrationTitle}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105"
                aria-label="Close registration form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden bg-white p-2">
              <iframe
                aria-label="Shiloh Conference"
                title={registrationTitle}
                className="h-[72svh] w-full rounded-2xl border-0"
                src={registrationUrl}
                loading="eager"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FloatingSponsorButton({ onClick, visible }: { onClick: () => void; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] z-[200] flex justify-center px-4 md:bottom-10"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.45, ease: customEase }}
        >
          <button
            type="button"
            onClick={onClick}
            className="liquid-glass pointer-events-auto rounded-full border border-white/25 bg-[#061923]/90 p-1 text-white shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl transition-transform duration-300 hover:scale-[1.02] sm:p-1.5"
          >
            <span className="block whitespace-nowrap rounded-full border border-white/10 bg-[#061923] px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.28em] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:px-9 sm:py-3 sm:text-xs sm:tracking-[0.34em] md:px-12 md:text-sm">
              Bring Someone to Shiloh
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SponsorModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'about' | 'sponsor'>('about');
  const givingTiers = [
    { amount: '$25', impact: '1 person' },
    { amount: '$100', impact: '4 people' },
    { amount: '$500', impact: '20 people' },
    { amount: '$2,500', impact: '65 people' },
  ];

  useEffect(() => {
    if (open) {
      setActiveTab('about');
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/65 p-3 backdrop-blur-sm sm:p-5">
          <motion.div
            className="relative flex max-h-[94svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[2rem] bg-white text-black shadow-[0_-24px_100px_rgba(0,0,0,0.35)] sm:rounded-[2rem]"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            exit={{ y: '105%' }}
            transition={{ duration: 0.42, ease: customEase }}
          >
            <div className="shrink-0 bg-white px-5 pb-4 pt-5 sm:px-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/40">Giving</p>
                  <h2 className="journey-card-title mt-1 text-3xl leading-none text-black sm:text-4xl">
                    Bring Someone to Shiloh
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105"
                  aria-label="Close sponsor form"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-5 inline-flex rounded-full bg-black/5 p-1 text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                <button
                  type="button"
                  onClick={() => setActiveTab('about')}
                  className={`rounded-full px-4 py-2 transition-colors ${
                    activeTab === 'about' ? 'bg-black text-white' : 'hover:text-black'
                  }`}
                >
                  About
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('sponsor')}
                  className={`rounded-full px-4 py-2 transition-colors ${
                    activeTab === 'sponsor' ? 'bg-black text-white' : 'hover:text-black'
                  }`}
                >
                  Sponsor Now
                </button>
              </div>
            </div>
            <div className="px-3 pb-4 sm:px-5">
              {activeTab === 'about' ? (
                <div className="rounded-2xl border border-black/10 bg-[#f7f7f2] p-5 text-black shadow-inner sm:p-7">
                  <p className="max-w-3xl text-base leading-7 text-black/70 sm:text-lg">
                    Thousands are ready to come to Shiloh, but for many, transport is the only barrier. A single bus
                    carries 65 people, and every seat is an opportunity to bring someone onto Shiloh grounds who
                    otherwise would not make it. For $25, you can cover one seat and directly change someone&apos;s
                    ability to attend.
                  </p>
                  <p className="mt-5 max-w-3xl text-base leading-7 text-black/70 sm:text-lg">
                    This is not just about funding a bus. It is about removing the one obstacle standing between
                    someone and their deliverance or breakthrough. Sponsor a seat and bring someone to Shiloh.
                  </p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {givingTiers.map((tier) => (
                      <div key={tier.amount} className="rounded-2xl border border-black/10 bg-white p-4">
                        <p className="journey-card-title text-3xl leading-none text-black">{tier.amount}</p>
                        <p className="mt-2 text-sm uppercase tracking-[0.22em] text-black/45">{tier.impact}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('sponsor')}
                    className="mt-8 rounded-full bg-black px-6 py-3 text-xs font-bold uppercase tracking-[0.26em] text-white transition-transform hover:-translate-y-0.5"
                  >
                    Sponsor Now
                  </button>
                </div>
              ) : (
                <iframe
                  src="https://crm.goodnewsworld.com/widget/form/WBglmsiMfAfsGPSlyekb"
                  className="h-[min(74svh,688px)] w-full rounded-2xl border border-black/10"
                  id="inline-WBglmsiMfAfsGPSlyekb"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Sponsor A Bus"
                  data-height="688"
                  data-layout-iframe-id="inline-WBglmsiMfAfsGPSlyekb"
                  data-form-id="WBglmsiMfAfsGPSlyekb"
                  title="Sponsor A Bus"
                  loading="eager"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DonorboxWidget({ campaign }: { campaign: string }) {
  useEffect(() => {
    if (document.querySelector('script[data-donorbox-widget="true"]')) {
      return;
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://donorbox.org/widgets.js';
    script.async = true;
    script.dataset.donorboxWidget = 'true';
    document.body.appendChild(script);
  }, []);

  return (
    <div
      key={campaign}
      className="mx-auto flex min-h-[620px] w-full max-w-2xl justify-center overflow-hidden rounded-2xl bg-white"
      dangerouslySetInnerHTML={{
        __html: `<dbox-widget campaign="${campaign}" type="donation_form" enable-auto-scroll="true"></dbox-widget>`,
      }}
    />
  );
}

function SowModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeSeed, setActiveSeed] = useState<'shiloh' | 'birthday'>('shiloh');
  const seedOptions = [
    {
      id: 'shiloh' as const,
      label: 'Shiloh Seed',
      campaign: 'birthday-seed-raah-2026',
    },
    {
      id: 'birthday' as const,
      label: "The Ra'ah Birthday Seed",
      campaign: 'birthday-seed-raah-2026',
    },
  ];
  const activeOption = seedOptions.find((option) => option.id === activeSeed) ?? seedOptions[0];

  useEffect(() => {
    if (open) {
      setActiveSeed('shiloh');
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[130] flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-5">
          <motion.div
            className="relative flex max-h-[94svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[2rem] bg-[#f3f0e7] text-black shadow-[0_-24px_100px_rgba(0,0,0,0.45)] sm:rounded-[2rem]"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            exit={{ y: '105%' }}
            transition={{ duration: 0.42, ease: customEase }}
          >
            <div className="shrink-0 px-5 pb-4 pt-5 sm:px-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/40">Giving</p>
                  <h2 className="journey-card-title mt-1 text-3xl leading-none text-black sm:text-4xl">
                    Shiloh Giving
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105"
                  aria-label="Close sow form"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-5 grid gap-2 rounded-full bg-black/5 p-1 text-xs font-semibold uppercase tracking-[0.16em] text-black/50 sm:inline-grid sm:grid-cols-2">
                {seedOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setActiveSeed(option.id)}
                    className={`rounded-full px-4 py-2 transition-colors ${
                      activeSeed === option.id ? 'bg-black text-white' : 'hover:text-black'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4 sm:px-5">
              <DonorboxWidget campaign={activeOption.campaign} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MerchPage() {
  const products = [
    {
      name: 'Shiloh Season Tee',
      price: '$35',
      description: 'Soft event tee placeholder for the Shiloh Season 2026 collection preview.',
      accent: 'from-[#E1E0CC] to-[#746C4F]',
      icon: Shirt,
      image: 'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/6a037b6882125b987483840d.jpeg',
    },
    {
      name: 'Shiloh Cap',
      price: '$24',
      description: 'Embroidered cap concept with temporary details for merch planning.',
      accent: 'from-[#D8A945] to-[#4B3314]',
      icon: Sparkle,
      image: 'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/6a037b6882125b987483840c.jpeg',
    },
    {
      name: 'Conference Tote',
      price: '$28',
      description: 'Everyday tote preview for carrying notes, essentials, and conference materials.',
      accent: 'from-[#BFD3E8] to-[#263A4A]',
      icon: CreditCard,
    },
    {
      name: 'Season Hoodie',
      price: '$68',
      description: 'Warm hoodie placeholder for late evenings, travel days, and fellowship moments.',
      accent: 'from-[#F4791B] to-[#1B1110]',
      icon: Shirt,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-[#E1E0CC]">
      <section className="relative min-h-screen overflow-hidden px-4 pb-20 pt-28 sm:px-6 md:px-10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-55"
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="noise-overlay absolute inset-0 opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),rgba(0,0,0,0.82)_62%,#000_100%)]" />
        </div>
        <HeroHeader />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl pt-10 text-left md:pt-16">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.45em] text-primary/65">
              Shiloh Season 2026
            </p>
            <h1 className="font-serif text-5xl italic leading-none text-primary sm:text-6xl md:text-7xl">
              2026 Shop
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              Temporary product previews for the upcoming Shiloh Season store. These dummy items help review the page
              layout before real merchandise, photos, inventory, and checkout are connected.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const Icon = product.icon;

              return (
                <article
                  key={product.name}
                  className="group flex min-h-[23rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className={`flex min-h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${product.accent}`}>
                    {'image' in product && product.image ? (
                      <img src={product.image} alt="" className="h-full min-h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-9 w-9" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <h2 className="text-xl leading-tight text-primary">{product.name}</h2>
                      <span className="rounded-full border border-primary/15 px-3 py-1 text-xs text-primary/80">
                        {product.price}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-primary/60">{product.description}</p>
                    <button
                      type="button"
                      disabled
                      className="mt-auto w-max rounded-full border border-primary/15 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary/55"
                    >
                      Preview Only
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function PartnersPage() {
  const partnerProducts = [
    {
      name: 'Partner Heritage Tee',
      price: '$45',
      detail: 'Limited partner tee with royal Shiloh Season finishing.',
      image: 'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/6a037b6882125b987483840d.jpeg',
    },
    {
      name: 'Partner Signature Cap',
      price: '$32',
      detail: 'Exclusive cap preview reserved for partner pickup.',
      image: 'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/6a037b6882125b987483840c.jpeg',
    },
    {
      name: 'Royal Partner Tote',
      price: '$38',
      detail: 'A refined tote concept for notes, essentials, and daily movement.',
      image: null,
    },
    {
      name: 'Partner Evening Hoodie',
      price: '$78',
      detail: 'Premium hoodie placeholder for cool evenings at Shiloh Season.',
      image: null,
    },
  ];

  return (
    <main className="min-h-screen bg-[#070604] text-[#E1E0CC]">
      <HeroHeader />
      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 md:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(216,169,69,0.2),transparent_36%),linear-gradient(180deg,#11100b_0%,#070604_60%,#000_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[#d8a945]/35" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.45em] text-[#d8a945]/70">
              Partner Exclusives
            </p>
            <h1 className="font-serif text-5xl italic leading-none text-primary sm:text-6xl md:text-7xl">
              Partners Shop
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-primary/68 sm:text-base">
              Partners, access exclusive items and enjoy free on-site pickup. No waiting in line. Order by August 6 and
              pick up at the GoodNews Shop, Harare Hippodrome. Merchandise is available while supplies last. Terms apply.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnerProducts.map((product) => (
              <article
                key={product.name}
                className="group overflow-hidden rounded-2xl border border-[#d8a945]/20 bg-white/[0.055] shadow-[0_24px_90px_rgba(0,0,0,0.32)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(216,169,69,0.28),rgba(255,255,255,0.06))]">
                  {product.image ? (
                    <img src={product.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <Sparkle className="h-12 w-12 text-[#d8a945]" strokeWidth={1.5} />
                  )}
                </div>
                <div className="p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h2 className="text-xl leading-tight text-primary">{product.name}</h2>
                    <span className="rounded-full border border-[#d8a945]/25 px-3 py-1 text-xs text-[#f1d98d]">
                      {product.price}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-primary/58">{product.detail}</p>
                  <button
                    type="button"
                    disabled
                    className="mt-8 rounded-full border border-[#d8a945]/25 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#f1d98d]/70"
                  >
                    Preview Only
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

const scheduleBackgroundVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_025849_5f3a84a7-bcc0-4279-8876-675fbe04e106.mp4';
const scheduleRaisedVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4';
const scheduleSoftwareVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4';

function ScheduleLabel({ children, align = 'center' }: { children: string; align?: 'center' | 'start' }) {
  return (
    <div
      className={`flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/70 ${
        align === 'center' ? 'justify-center' : 'justify-start'
      }`}
    >
      <Sparkle className="h-3 w-3" strokeWidth={1.5} />
      <span>{children}</span>
      <Sparkle className="h-3 w-3" strokeWidth={1.5} />
    </div>
  );
}

function ScheduleMarqueeRow({
  icons,
  direction,
}: {
  icons: LucideIcon[];
  direction: 'left' | 'right';
}) {
  const duplicatedIcons = [...icons, ...icons];

  return (
    <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max gap-3 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
      >
        {duplicatedIcons.map((Icon, index) => (
          <span
            key={`${direction}-${index}`}
            className="liquid-glass flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white/85 md:h-16 md:w-16"
          >
            <Icon className="h-6 w-6" strokeWidth={1.5} />
          </span>
        ))}
      </div>
    </div>
  );
}

function SchedulePage() {
  const timeline = [
    ['31 Aug - 3 Sep', 'Prophetic Retreat', 'Fort Moriah City'],
    ['4 Sep - 5 Sep', 'Shiloh Conference', 'Fort Moriah City'],
    ['6 September', 'Sunday Service', 'Harare Hippodrome'],
    ['6 September', 'Baptism', 'Fort Moriah City'],
    ['6 Sep 7:00 PM', "The Ra'ah Prophet Uebert Angel Birthday Celebration", 'Harare Hippodrome'],
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white antialiased" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <HeroHeader sticky />
      <section className="px-4 py-8 sm:px-6 md:px-10 md:py-10 lg:px-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <div className="max-w-3xl pt-4">
            <h1 className="text-[28px] font-normal leading-[1.15] tracking-tight sm:text-3xl md:text-4xl lg:text-[44px]">
              Schedule
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-[1.6] text-white/60 md:text-[15px]">
              Shiloh Season 2026 gathers every moment of encounter into one clear journey. From Prophetic Retreat to
              the conference, Sunday service, and the Ra&apos;ah birthday celebration, plan your arrival with confidence
              and prepare for a week of worship, teaching, honor, and transformation.
            </p>
          </div>

          <article className="relative min-h-[560px] overflow-hidden rounded-2xl bg-black">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={scheduleBackgroundVideo}
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/80" />
            <div className="absolute inset-0 z-10 p-5 md:p-6">
              <ScheduleLabel>Shiloh Season 2026</ScheduleLabel>
              <div className="absolute inset-x-5 bottom-5 space-y-4 rounded-2xl bg-black/35 p-4 backdrop-blur-sm sm:p-5 md:inset-x-6 md:bottom-6">
                {timeline.map(([date, event, location]) => (
                  <div
                    key={`${date}-${event}`}
                    className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 border-b border-white/10 pb-4 text-sm text-white/85 last:border-b-0 last:pb-0 sm:grid-cols-[8.5rem_auto_1fr_auto] sm:items-center"
                  >
                    <span className="text-white/70">{date}</span>
                    <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
                    <span className="col-span-2 font-medium sm:col-span-1">{event}</span>
                    <span className="col-span-2 text-white/55 sm:col-span-1 sm:text-right">{location}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function PassesPage() {
  return (
    <main className="min-h-screen bg-[#F0EFED]">
      <HeroHeader sticky />
      <iframe
        src="/component2.html"
        title="Shiloh Passes"
        className="block h-[calc(100svh-5rem)] w-full border-0"
      />
      <Footer />
    </main>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState<'conference' | 'birthday'>('conference');
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const [sowOpen, setSowOpen] = useState(false);
  const [sponsorVisible, setSponsorVisible] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);
  const isJourneyPage = pathname === '/journey';
  const isVipPage = pathname === '/vip';
  const isMerchPage = pathname === '/merch';
  const isPartnersPage = pathname === '/partners';
  const isSchedulePage = pathname === '/schedule';
  const isPassesPage = pathname === '/passes';
  const isContactPage = pathname === '/contact';

  useEffect(() => {
    const updatePathname = () => setPathname(window.location.pathname);

    window.addEventListener('popstate', updatePathname);
    return () => window.removeEventListener('popstate', updatePathname);
  }, []);

  useEffect(() => {
    const openSowModal = () => setSowOpen(true);

    window.addEventListener('open-sow-modal', openSowModal);
    return () => window.removeEventListener('open-sow-modal', openSowModal);
  }, []);

  useEffect(() => {
    const openSponsorModal = () => setSponsorOpen(true);

    window.addEventListener('open-sponsor-modal', openSponsorModal);
    return () => window.removeEventListener('open-sponsor-modal', openSponsorModal);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  useEffect(() => {
    let isMounted = true;
    const minimumTimer = window.setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, 2200);

    return () => {
      isMounted = false;
      window.clearTimeout(minimumTimer);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      setSponsorVisible(false);
      return;
    }

    const updateSponsorVisibility = () => {
      const heroSection = document.querySelector('main > section:first-of-type') as HTMLElement | null;
      const heroHeight = heroSection?.offsetHeight ?? window.innerHeight;
      const heroTop = heroSection?.offsetTop ?? 0;
      const revealPoint = heroTop + heroHeight * 0.88;

      setSponsorVisible(window.scrollY >= revealPoint);
    };

    updateSponsorVisibility();
    window.addEventListener('scroll', updateSponsorVisibility, { passive: true });
    window.addEventListener('resize', updateSponsorVisibility);

    return () => {
      window.removeEventListener('scroll', updateSponsorVisibility);
      window.removeEventListener('resize', updateSponsorVisibility);
    };
  }, [pathname, isLoading]);

  const triggerCelebration = () => {
    setCelebrating(true);
    window.setTimeout(() => setCelebrating(false), 1800);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const actionable = target?.closest('a, button');
      const label = actionable?.textContent?.toLowerCase() ?? '';
      if (actionable?.getAttribute('data-direct-registration') === 'true') {
        return;
      }
      if (label.includes('register') || label.includes('let us know')) {
        event.preventDefault();
        const requestedRegistration = actionable?.getAttribute('data-registration-type');
        const registrationContext = target?.closest('article, section, div')?.textContent?.toLowerCase() ?? '';
        setRegistrationType(
          requestedRegistration === 'birthday' || registrationContext.includes('birthday') ? 'birthday' : 'conference',
        );
        setRegistrationOpen(true);
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!registrationOpen && !sponsorOpen && !sowOpen) return;
      if (!/forms\.zohopublic\.eu|crm\.goodnewsworld\.com|donorbox\.org/.test(event.origin)) return;
      const data = typeof event.data === 'string' ? event.data : JSON.stringify(event.data ?? {});
      if (/thank\s*you|success(?:ful)?|submitted|submission\s*complete|formSubmitted/i.test(data)) {
        triggerCelebration();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [registrationOpen, sponsorOpen, sowOpen]);

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
      {isVipPage ? (
        <VipPage />
      ) : isMerchPage ? (
        <MerchPage />
      ) : isPartnersPage ? (
        <PartnersPage />
      ) : isSchedulePage ? (
        <SchedulePage />
      ) : isPassesPage ? (
        <PassesPage />
      ) : isContactPage ? (
        <ContactPage />
      ) : isJourneyPage ? (
        <JourneyPage startAnimations={!isLoading} />
      ) : (
        <main className="bg-black">
          <Hero />
          <About />
          <Features />
          <Footer />
        </main>
      )}
      <FloatingSponsorButton onClick={() => setSponsorOpen(true)} visible={!isLoading && sponsorVisible} />
      <RegistrationModal open={registrationOpen} onClose={() => setRegistrationOpen(false)} type={registrationType} />
      <SponsorModal open={sponsorOpen} onClose={() => setSponsorOpen(false)} />
      <SowModal open={sowOpen} onClose={() => setSowOpen(false)} />
      <CelebrationBurst active={celebrating} />
    </>
  );
}
