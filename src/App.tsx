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
  ChevronLeft,
  ChevronRight,
  Chrome,
  CreditCard,
  ExternalLink,
  Figma,
  Framer,
  Heart,
  Info,
  Layers,
  Mail,
  MapPin,
  Minus,
  Palette,
  Pause,
  PenTool,
  Phone,
  Play,
  Plus,
  Shirt,
  ShieldCheck,
  ShoppingCart,
  Sparkle,
  Trash2,
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
    title: 'Shiloh Grounds',
    label: 'Gate A',
    position: { x: 47.6, y: 39.8 },
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
    position: { x: 40.4, y: 37.6 },
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
    position: { x: 69.4, y: 25 },
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
    position: { x: 83.8, y: 27.8 },
    description: 'Dedicated access point for VIP Experience guests and hosted arrivals.',
    details: [
      'Reserved for VIP Experience delegates and hosted guests.',
      'Have VIP confirmation ready before reaching the access team.',
      'This route is closest to hosted arrival support and premium seating guidance.',
    ],
  },
  {
    title: 'Pillar of Fire',
    label: 'Site',
    position: { x: 80.1, y: 19.6 },
    description: 'A marked Shiloh grounds reference point for delegates exploring Fort Moriah.',
    details: [
      'Use this point as a visual landmark when moving around the grounds.',
      'Allow stewards to guide movement around marked sacred sites.',
      'Keep walkways clear for guests, families, and ministry teams.',
    ],
  },
  {
    title: 'Miracle Wall',
    label: 'Site',
    position: { x: 93.4, y: 34.2 },
    description: 'A highlighted site marker on the Fort Moriah grounds map.',
    details: [
      'Follow the marked pedestrian routes when visiting this area.',
      'Use the map marker to orient yourself from the nearby internal road.',
      'Check with stewards before stopping in high-traffic areas.',
    ],
  },
  {
    title: 'Car Stuck Miracle',
    label: 'Site',
    position: { x: 66.3, y: 53.3 },
    description: 'A Fort Moriah grounds reference point near the central route network.',
    details: [
      'Use this marker to identify the nearby route and surrounding gathering zones.',
      'Stay within guided paths when moving between major points.',
      'Ask the local event team for site-specific guidance during Shiloh Season.',
    ],
  },
  {
    title: 'Fellowship Court',
    label: 'Food',
    position: { x: 72, y: 67 },
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
    position: { x: 22, y: 71 },
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
      className={`group inline-flex items-center gap-2 rounded-full py-1 pl-5 pr-1 text-sm font-medium transition-all duration-300 hover:gap-3 sm:text-base ${isGlass
          ? 'border border-white/35 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl'
          : 'bg-white text-black'
        }`}
    >
      {children}
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10 ${isGlass ? 'bg-white text-black' : 'bg-black text-white'
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

function HeroHeader({ sticky = true, pageType }: { sticky?: boolean; pageType?: 'shop' | 'product' | '' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(() => {
    try {
      const stored = window.localStorage.getItem('shiloh-merch-cart');
      const items = stored ? JSON.parse(stored) : [];
      return items.reduce((acc: number, item: any) => acc + item.quantity, 0);
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const handleCartUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      const cartItems = customEvent.detail || [];
      const count = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);
      setCartCount(count);
    };

    const handleStorageChange = () => {
      try {
        const stored = window.localStorage.getItem('shiloh-merch-cart');
        const items = stored ? JSON.parse(stored) : [];
        setCartCount(items.reduce((acc: number, item: any) => acc + item.quantity, 0));
      } catch { }
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const navItems: HeaderNavItem[] = [
    { label: 'Home', href: '/' },
    {
      label: 'Plan', children: [
        { label: '2026 Shiloh Season Guide', href: '/journey' },
        { label: 'Events Schedule', href: '/schedule' },
        { label: 'Parking and Shuttle', href: '/passes' },
        { label: 'Shiloh Season VIP Experience', href: '/vip' },
      ]
    },
    { label: '2026 Shiloh Shop', href: '/merch' },
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

  const isShopOrProduct = pageType === 'shop' || pageType === 'product';

  const navClassName = `relative z-20 grid w-full max-w-none ${
    isShopOrProduct
      ? 'grid-cols-[1fr_auto_auto] gap-x-2 px-4 py-2 rounded-b-[1.75rem]'
      : 'grid-cols-[1fr_auto] gap-x-5 gap-y-5 px-6 py-5 rounded-b-[1.75rem]'
  } bg-black text-[#E1E0CC] shadow-[0_16px_40px_rgba(0,0,0,0.35)] md:flex md:w-[min(1160px,calc(100vw-3rem))] md:max-w-[calc(100vw-1.5rem)] md:justify-between md:gap-7 md:rounded-b-3xl md:px-7 md:py-2 md:text-white xl:w-[min(1240px,calc(100vw-4rem))] xl:px-8 2xl:w-[min(1880px,calc(100vw-8rem))] 2xl:px-10`;

  const hamburgerClassName = isShopOrProduct
    ? 'order-3 -mr-1 ml-1 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full text-[#E1E0CC] transition-transform duration-300 hover:scale-105 md:hidden'
    : 'order-2 -mr-4 ml-auto flex h-16 w-16 shrink-0 flex-col items-center justify-center gap-2 rounded-full text-[#E1E0CC] transition-transform duration-300 hover:scale-105 md:hidden';

  return (
    <header
      className={`${sticky ? 'fixed' : 'absolute'} inset-x-0 top-0 z-40 flex justify-center px-3`}
      data-page={pageType || ''}
    >
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
      <nav className={navClassName}>
        <a href="/" aria-label="Shiloh home" className="order-1 flex min-w-0 shrink-0 items-center gap-3 md:col-span-1 md:gap-3">
          <span className="flex flex-col text-left leading-[0.78] text-[#E1E0CC]">
            <span className="text-[18px] font-extrabold uppercase tracking-[0.2em] md:text-xs md:tracking-[0.22em]">Shiloh</span>
            <span className="font-serif text-[19px] italic tracking-normal md:text-base">Season 26</span>
          </span>
          <span className="h-11 w-px bg-primary/25 md:h-8" aria-hidden="true" />
          <span className="flex flex-col text-[15px] font-medium uppercase leading-[1.18] tracking-[0.08em] text-primary/60 min-[390px]:text-[17px] md:max-w-none md:flex-row md:gap-1 md:text-[9px] md:font-semibold md:tracking-[0.18em]">
            <span>31 Aug</span>
            <span className="hidden md:inline">-</span>
            <span>6 Sep</span>
          </span>
        </a>
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent('open-cart'));
          }}
          className={`items-center justify-center relative w-12 h-12 text-[#E1E0CC] active:scale-95 transition-transform ${
            isShopOrProduct
              ? 'order-2 ml-auto flex md:order-4 md:ml-0'
              : 'hidden'
          }`}
          aria-label="Open cart"
        >
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-extrabold text-black leading-none shadow-[0_2px_5px_rgba(0,0,0,0.3)] animate-scaleIn">
              {cartCount}
            </span>
          )}
        </button>
        <div className="order-2 hidden items-center gap-4 whitespace-nowrap text-[13px] text-[rgba(225,224,204,0.82)] md:flex lg:gap-6 lg:text-sm xl:gap-8 xl:text-[15px]">
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
                        className="block w-full rounded-xl px-4 py-3 text-left text-xs leading-tight text-primary/75 transition-colors hover:bg-white/10 hover:text-primary"
                      >
                        {child.label}
                      </button>
                    ) : (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={navigateTo(child.href)}
                        className="block rounded-xl px-4 py-3 text-xs leading-tight text-primary/75 transition-colors hover:bg-white/10 hover:text-primary"
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
        <div className="header-cta-wrapper order-4 col-span-2 grid min-w-0 grid-cols-2 gap-2 md:order-3 md:col-span-1 md:flex md:shrink-0 md:items-center md:justify-center md:gap-2">
          <button
            type="button"
            onClick={openSponsorModal}
            className="group inline-flex min-h-[3.75rem] min-w-0 items-center justify-center rounded-sm border border-white/15 bg-white/10 px-3 text-[#E1E0CC] backdrop-blur-xl transition-all duration-300 hover:bg-white/15 md:min-h-[3rem] md:min-w-[9.3rem] md:rounded-full md:border-white/20 md:px-4"
          >
            <span className="flex flex-col items-center text-center leading-none">
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary/60 md:text-[9px]">
                Bring Someone
              </span>
              <span className="mt-1 text-[17px] font-semibold md:mt-0.5 md:text-xs md:font-medium lg:text-sm">To Shiloh</span>
            </span>
          </button>
          <button
            type="button"
            data-registration-type="conference"
            className="group inline-flex min-h-[3.75rem] min-w-0 items-center justify-center rounded-sm bg-[#E1E0CC] px-3 text-black shadow-[0_8px_20px_rgba(225,224,204,0.16)] transition-all duration-300 hover:bg-white md:min-h-0 md:gap-2 md:rounded-full md:border md:border-white/25 md:bg-white/10 md:py-1 md:pl-3 md:pr-1 md:text-[#E1E0CC] md:shadow-none md:backdrop-blur-xl md:hover:bg-white/15 md:hover:gap-3"
          >
            <span className="flex flex-col items-start leading-none">
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-black/55 md:text-[9px] md:text-primary/60">
                Let Us Know
              </span>
              <span className="mt-1 text-[17px] font-semibold leading-none md:mt-0.5 md:text-xs md:font-medium lg:text-sm">
                You&apos;re Coming
              </span>
            </span>
            <span className="hidden h-8 w-8 items-center justify-center rounded-full bg-[#E1E0CC] text-black transition-transform duration-300 group-hover:scale-110 md:flex">
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </span>
          </button>
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
          className={hamburgerClassName}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block ${isShopOrProduct ? 'h-0.5 w-6' : 'h-1 w-9'} rounded-full bg-current transition-transform duration-300 ${menuOpen ? (isShopOrProduct ? 'translate-y-2 rotate-45' : 'translate-y-3 rotate-45') : ''}`} />
          <span className={`block ${isShopOrProduct ? 'h-0.5 w-6' : 'h-1 w-9'} rounded-full bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block ${isShopOrProduct ? 'h-0.5 w-6' : 'h-1 w-9'} rounded-full bg-current transition-transform duration-300 ${menuOpen ? (isShopOrProduct ? '-translate-y-2 -rotate-45' : '-translate-y-3 -rotate-45') : ''}`} />
        </button>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-x-3 top-[11.75rem] z-10 max-h-[calc(100vh-12.5rem)] overflow-y-auto rounded-[2rem] border border-white/10 bg-black/92 p-4 text-[22px] font-medium text-[#E1E0CC] shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:hidden"
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
                      className="flex w-full items-center justify-between rounded-xl px-5 py-5 text-left transition-colors hover:bg-white/10"
                      aria-expanded={mobileSubmenu === item.label}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${mobileSubmenu === item.label ? 'rotate-180' : ''
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
                                className="block w-full rounded-xl px-5 py-3 text-left text-lg text-primary/70 transition-colors hover:bg-white/10 hover:text-primary"
                              >
                                {child.label}
                              </button>
                            ) : (
                              <a
                                key={child.label}
                                href={child.href}
                                onClick={navigateTo(child.href)}
                                className="block rounded-xl px-5 py-3 text-lg text-primary/70 transition-colors hover:bg-white/10 hover:text-primary"
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
                    className="block w-full rounded-xl px-5 py-5 text-left transition-colors hover:bg-white/10"
                  >
                    {item.label}
                  </button>
                ) : 'href' in item ? (
                  <a
                    href={item.href}
                    onClick={navigateTo(item.href!)}
                    className="block rounded-xl px-5 py-5 transition-colors hover:bg-white/10"
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
          referrerPolicy="no-referrer"
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
              <span className="hero-title-wide font-serif italic normal-case tracking-[0.02em]">It&apos;s My Shiloh Season</span>
              <span className="mobile-hero-title flex flex-col items-center lg:hidden">
                <span className="font-serif italic normal-case tracking-[0.02em]">It&apos;s My</span>
                <span className="font-serif italic normal-case tracking-[0.02em]">Shiloh Season</span>
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
              className="hero-intro flex max-w-md flex-col gap-5 md:absolute md:bottom-0 md:left-0 xl:max-w-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.75, delay: 0.35, ease: customEase }}
            >
              <p className="text-sm leading-[1.45] text-white/88 sm:text-base">
                We are thrilled to officially announce that Shiloh 2026 is set to take place from August 31st -
                September 6th at Fort Moriah City and The Harare Hippodrome. Free entry available for all attendees,
                with free local shuttle transportation on <strong className="font-bold text-white">select routes</strong>.
                Premium air-conditioned coach transportation options are also available for regional and international
                attendees.{' '}
                <a href="/passes" className="font-semibold italic text-white underline decoration-white/35 underline-offset-4">
                  View parking and shuttle information.
                </a>
              </p>
            </motion.div>

            <motion.div
              className="hero-action z-30 flex flex-col items-start gap-5 md:absolute md:bottom-8 md:right-0 md:items-end"
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
              <PillButton href="/vip">VIP Experience</PillButton>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.a
        href="#features"
        aria-label="Scroll to Shiloh season events"
        className="absolute bottom-7 left-1/2 z-30 hidden h-12 w-7 -translate-x-1/2 items-center justify-center text-white drop-shadow-[0_0_18px_rgba(225,224,204,0.55)] md:flex"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: [0, 10, 0] } : { opacity: 0, y: 10 }}
        transition={{ duration: 2.2, delay: 0.9, repeat: Infinity, ease: customEase }}
      >
        <ArrowRight className="h-4 w-4 rotate-90" />
      </motion.a>
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
              className={`shrink-0 border-b pb-4 transition-colors ${activeIndex === index ? 'border-black text-black' : 'border-transparent hover:text-black/60'
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
            <img src={activeEvent.image} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
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
                  className={`rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.28em] transition-transform hover:-translate-y-0.5 ${index === 0
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
                  className={`flex w-full items-center justify-between rounded-full px-4 py-3 text-left text-xs uppercase tracking-[0.2em] transition-colors ${activeIndex === index ? 'bg-black text-white' : 'bg-black/[0.035] text-black/55 hover:bg-black/[0.07] hover:text-black'
                    }`}
                >
                  {location.title}
                  <MapPin className="h-4 w-4" />
                </button>
              ))}
            </div>
          </motion.div>

          <div className="order-1 overflow-hidden rounded-[1.5rem] border border-black/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.08)] lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/10]">
              <div className="absolute left-1/2 top-1/2 aspect-[6034/4525] w-[118%] -translate-x-1/2 -translate-y-1/2">
                <img src={fortMoriahMap} alt="Fort Moriah map" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
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
                      className={`absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d7aa43]/60 transition-all duration-300 ${activeIndex === index ? 'scale-125 opacity-100 shadow-[0_0_28px_rgba(215,170,67,0.55)]' : 'scale-100 opacity-60 group-hover:scale-125'
                        }`}
                    />
                    <span
                      className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${activeIndex === index ? 'border-[#f0c96f] bg-[#f0c96f] text-black' : 'border-[#d7aa43]/70 bg-black/55 text-[#f0c96f] backdrop-blur-sm'
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
                POS machines may be available for Visa and Mastercard payments. Bring a{' '}
                <span className="font-semibold text-black">physical card</span>. American Express cards may not be
                accepted by all local vendors and service providers during Shiloh Season 26.
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
      content: (
        <div className="space-y-4">
          <p>
            Comfortable casual wear is recommended for most Shiloh gatherings, including Shiloh T-Shirts, jeans,
            trousers, trainers, and comfortable walking shoes due to extended outdoor movement and dusty terrain in
            certain areas.
          </p>
          <p>
            Guests are encouraged to bring a light jacket or sweater as temperatures may become colder during evening
            services and night sessions.
          </p>
          <p>
            Official Shiloh merchandise and Shiloh T-Shirts can be purchased through the{' '}
            <a href="/merch" className="font-semibold text-black underline decoration-black/20 underline-offset-4">
              2026 Shop
            </a>{' '}
            on the website.
          </p>
          <p>For Shiloh Sunday, GoodNews World uniforms are recommended.</p>
          <p>
            Formal attire is required for the Ra&apos;ah Birthday Celebration. Full dress code details will be shared in
            the official invitation email following registration confirmation.
          </p>
        </div>
      ),
    },
    {
      title: 'Baptism Information',
      icon: Sparkle,
      content: (
        <div className="space-y-6">
          <p>
            Attendees participating in Baptism By The Ra&apos;ah are required to wear the official GoodNews World Baptism
            Set during the baptism experience.
          </p>
          <div>
            <p className="mb-4">
              For comfort, modesty, and ease during baptism, attendees are encouraged to wear appropriate clothing
              underneath the baptism gown, including:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Black leggings or long athletic bottoms</li>
              <li>A dark T-shirt or modest top</li>
              <li>Suitable footwear for outdoor terrain and water areas</li>
            </ul>
          </div>
          <div>
            <p className="mb-4">The official Baptism Set includes:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Baptism gown</li>
              <li>Slippers</li>
              <li>Baptism towel</li>
            </ul>
          </div>
          <a href="/merch" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-transform hover:-translate-y-0.5">
            Purchase Official Baptism Set
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      ),
    },
    {
      title: 'Food & Refreshments',
      icon: Info,
      content: (
        <p>
          Food courts and refreshment vendors will be available throughout Fort Moriah and Harare Hippodrome during the
          conference for attendee convenience.
        </p>
      ),
    },
    {
      title: 'Recommended Stay',
      icon: Building2,
      content: (
        <div id="recommended-stay" className="scroll-mt-32 space-y-5">
          <p className="text-xs leading-relaxed text-black/48 sm:text-sm">
            VIP transport services are exclusively available for guests staying at selected partner hotels listed below.
            Guests staying at non-partner accommodations will be required to arrange independent transportation to and
            from conference venues.
          </p>
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
                  className={`overflow-hidden rounded-[1.75rem] border bg-white transition-shadow ${isOpen ? 'border-black shadow-[0_18px_60px_rgba(0,0,0,0.08)]' : 'border-black/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.025)]'
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center gap-4 px-5 py-6 text-left sm:px-7 sm:py-8"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors ${isOpen ? 'bg-black text-white' : 'bg-black/[0.035] text-black/35'
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
        <p className="mt-20 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm leading-relaxed text-white/58 sm:px-7 sm:text-base">
          *VIP transport services are exclusively available for guests staying at selected partner hotels listed below.
          Guests staying at non-partner accommodations will be required to arrange independent transportation to and from
          conference venues.
        </p>
      </div>
    </section>
  );
}

function VipCompareSection() {
  const benefits = [
    {
      benefit: 'Seating',
      general: 'General Seating',
      vip: 'Reserved VIP Seating',
    },
    {
      benefit: 'VIP Lounge',
      general: '—',
      vip: 'Private VIP Lounge Access',
    },
    {
      benefit: 'Arrival Experience',
      general: 'Self-Arranged',
      vip: 'Priority VIP Check-In',
    },
    {
      benefit: 'Accommodation',
      general: 'Self-Arranged',
      vip: 'Preferred Hotel Access',
    },
    {
      benefit: 'Transport',
      general: 'Self-Arranged',
      vip: 'VIP Transport Access',
    },
    {
      benefit: 'Refreshments',
      general: 'Public Food Vendors',
      vip: 'Complimentary Drinks & Light Refreshments',
    },
    {
      benefit: 'Facilities',
      general: 'General Facilities',
      vip: 'Premium VIP Restrooms',
    },
    {
      benefit: 'Access',
      general: 'Standard Entry',
      vip: 'Fast-Track Entry Lane',
    },
    {
      benefit: 'Support',
      general: 'General Info Desk',
      vip: 'Dedicated VIP Concierge',
    },
    {
      benefit: 'Atmosphere',
      general: 'Open Grounds Experience',
      vip: 'Private Covered VIP Area',
    },
    {
      benefit: 'Merchandise',
      general: 'Standard Purchase Access',
      vip: 'Priority Merchandise Collection',
    },
  ];

  return (
    <section id="vip-register" className="bg-black px-4 py-8 text-white sm:px-8 md:py-14">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="vip-title gold-emboss mb-7 text-center text-4xl leading-none tracking-[-0.03em] sm:text-5xl md:mb-8 md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.75, ease: customEase }}
        >
          Compare Experience
        </motion.h2>

        <motion.div
          className="hidden overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#151515] shadow-[0_18px_60px_rgba(0,0,0,0.35)] md:block"
          initial={{ opacity: 0, y: 34, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
        >
          <div className="grid grid-cols-[0.9fr_0.9fr_1.25fr] bg-[#242424] text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
            <div className="border-r border-white/8 px-4 py-3 lg:px-5">Benefit</div>
            <div className="border-r border-white/8 px-4 py-3 text-center lg:px-5">General</div>
            <div className="px-4 py-3 text-center text-white lg:px-5">Shiloh VIP</div>
          </div>
          {benefits.map((item) => (
            <div
              key={item.benefit}
              className="grid min-h-[3.1rem] grid-cols-[0.9fr_0.9fr_1.25fr] border-t border-white/8 text-sm"
            >
              <div className="flex items-center border-r border-white/8 px-4 font-medium text-white/90 lg:px-5">
                {item.benefit}
              </div>
              <div className="flex items-center justify-center border-r border-white/8 px-4 text-center italic text-white/35 lg:px-5">
                {item.general}
              </div>
              <div className="flex items-center justify-center gap-2 px-4 font-medium text-white/85 lg:px-5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/12 text-white">
                  <Check className="h-3 w-3" />
                </span>
                <span>{item.vip}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.58, ease: customEase }}
        >
          {benefits.map((item) => (
            <article key={item.benefit} className="min-h-[9rem] w-[72vw] max-w-[19rem] shrink-0 snap-center rounded-2xl border border-white/10 bg-[#151515] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.26)]">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-[13px] font-semibold leading-tight text-white">{item.benefit}</p>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f0c96f]/15 text-[#f2cb62]">
                  <Check className="h-3 w-3" />
                </span>
              </div>
              <p className="text-xs font-medium leading-snug text-white/85">{item.vip}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/32">General</p>
              <p className="mt-1 text-[11px] italic leading-snug text-white/45">{item.general}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const vipPassOptions = [
  {
    label: 'Prophetic Retreat',
    date: '31 Aug - 3 Sep',
    price: '£4000',
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
    href: 'https://programs.uebertangel.org/product/shiloh-pass/',
    summary:
      'Premium conference access for guests seeking a more focused, elevated experience during the central Shiloh gathering.',
    note:
      '*VIP transport services are exclusively available for guests staying at selected partner hotels listed below. Guests staying at non-partner accommodations will be required to arrange independent transportation to and from conference venues.',
    features: [
      'VIP access for the Shiloh Conference sessions at Fort Moriah City.',
      'Reserved VIP seating with improved stage visibility and a more settled arrival experience.',
      'Official VIP Shuttle Access from selected partner hotels to the conference venue.',
      'Dedicated VIP check-in and hosted guest support during peak gathering periods.',
      'Private VIP lounge access with complimentary drinks and light refreshments.',
      'Premium covered VIP area with enhanced comfort throughout conference sessions.',
      'Access to preferred VIP facilities and priority movement areas.',
      'A refined conference experience designed for delegates prioritizing the main Shiloh gathering days.',
    ],
  },
  {
    label: 'Birthday VVIP',
    date: '6 Sep 7:00 PM',
    price: '$1000 USD',
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
    price: '$6999 USD',
    tag: 'Full Season',
    href: 'https://programs.uebertangel.org/product/shiloh-ultimate-pass/',
    summary:
      'A complete hosted experience for delegates who want premium access across every defining Shiloh Season moment.',
    features: [
      'Full VIP access to the Prophetic Retreat, Shiloh Conference, Sunday Service, and the Ra’ah Birthday Celebration.',
      'Reserved seating across major gatherings with priority arrival and hosted entry support.',
      'Official VIP transport coordination between selected partner hotels and Shiloh venues throughout the season.',
      'Access to private VIP lounges with complimentary refreshments and hospitality services.',
      'Dedicated VIP guest assistance for movement, scheduling, check-in, and conference support.',
      'Premium covered lounge areas and enhanced comfort spaces during conference sessions.',
      'Access to preferred VIP restroom and hospitality facilities across major venues.',
      'Priority movement support between high-capacity gathering locations and scheduled events.',
      'Exclusive VIP accreditation, welcome package, and priority merchandise collection.',
      'A single premium pass designed for guests wanting the most complete Shiloh Season 26 experience.',
    ],
  },
];

function VipFeaturesSection() {
  const [activePassIndex, setActivePassIndex] = useState(0);
  const activePass = vipPassOptions[activePassIndex];

  return (
    <section id="vip-passes" className="scroll-mt-28 bg-black px-4 py-12 text-white sm:px-6 md:px-12 md:py-14 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 grid gap-4 lg:grid-cols-[0.82fr_1fr] lg:items-end">
          <div>
            <p className="vip-copy mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-[#f0c96f]/70">
              VIP Passes
            </p>
            <h2 className="vip-title gold-emboss max-w-3xl text-4xl font-normal leading-[0.86] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
              Choose Your
              <span className="block">Access</span>
            </h2>
          </div>
          <p className="vip-copy max-w-2xl text-sm font-light leading-relaxed text-white/60 lg:ml-auto lg:text-right">
            Select the VIP pass that matches your Shiloh Season plans. Each option includes dates, clear benefits, and a
            direct registration path for the experience you are preparing for.
          </p>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.085),rgba(255,255,255,0.025))] p-3 shadow-[0_22px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-4 lg:p-5">
          <div className="grid grid-cols-2 gap-2 rounded-[1.1rem] bg-black/40 p-2 lg:grid-cols-4">
            {vipPassOptions.map((pass, index) => (
              <button
                key={pass.label}
                type="button"
                onClick={() => setActivePassIndex(index)}
                className={`rounded-[0.9rem] px-4 py-3 text-left transition-all duration-300 ${activePassIndex === index
                    ? 'bg-[#f0c96f] text-black shadow-[0_12px_34px_rgba(240,201,111,0.24)]'
                    : 'text-white/66 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <span className="block text-[9px] font-bold uppercase tracking-[0.22em] opacity-70 sm:text-[10px] sm:tracking-[0.28em]">
                  {pass.date}
                </span>
                <span className="mt-1.5 block text-xs font-semibold sm:text-sm">{pass.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={activePass.label}
              className="mt-4 grid gap-5 rounded-[1.2rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] p-5 sm:p-6 lg:grid-cols-[0.68fr_1fr] lg:p-7"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: customEase }}
            >
              <div className="flex flex-col">
                <p className="mb-4 w-max rounded-full bg-[#d5a238]/12 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#f0c96f]">
                  {activePass.tag}
                </p>
                <h3 className="vip-title text-3xl leading-none text-white sm:text-4xl">{activePass.label}</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl bg-white/[0.055] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/35">Date</p>
                    <p className="mt-2 text-xl text-white">{activePass.date}</p>
                  </div>
                  <div className="rounded-2xl bg-[#d5a238]/10 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#f0c96f]/70">Price</p>
                    <p className="mt-2 vip-title text-3xl leading-none text-[#f7d98e]">{activePass.price}</p>
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

              <div className="flex flex-col justify-between gap-5">
                <div className="space-y-3">
                  <p className="vip-copy text-sm leading-relaxed text-white/70 sm:text-base">{activePass.summary}</p>
                  {'note' in activePass && activePass.note ? (
                    <p className="rounded-xl border border-[#f0c96f]/15 bg-[#f0c96f]/10 p-3 text-xs leading-relaxed text-[#f7d98e]/82">
                      {activePass.note}
                    </p>
                  ) : null}
                </div>
                <ul className="grid grid-cols-2 gap-2">
                  {activePass.features.map((feature) => (
                    <li key={feature} className="flex gap-2 rounded-xl bg-white/[0.04] p-2 text-[11px] leading-snug text-white/72 sm:gap-3 sm:p-3 sm:text-sm">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f0c96f]/15 text-[#f0c96f]">
                        <Check className="h-3 w-3" />
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
              <details className="group relative mx-auto mt-3 w-max max-w-full">
                <summary
                  className="mx-auto flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-full border border-[#202A36]/18 bg-white/70 text-sm font-bold italic text-[#202A36] shadow-[0_10px_32px_rgba(0,0,0,0.12)] backdrop-blur-md transition-transform hover:scale-105 [&::-webkit-details-marker]:hidden"
                  aria-label="VIP transport information"
                >
                  i
                </summary>
                <div className="absolute left-1/2 top-11 z-30 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-[#202A36]/12 bg-white/92 p-4 text-left text-sm leading-6 text-[#202A36]/72 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                  <a href="/journey#recommended-stay" className="block transition-colors hover:text-[#202A36]">
                    VIP transport services are exclusively available for guests staying at our selected partner hotels.{' '}
                    <span className="font-semibold italic underline decoration-[#202A36]/28 underline-offset-4">
                      Explore recommended stay options.
                    </span>
                  </a>
                </div>
              </details>
              <p className="vip-copy mx-auto mb-6 mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-600 md:text-lg">
                Proximity to the vision. Every word, every moment, crystal clear.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <PillButton href="#vip-register">Compare the Experience</PillButton>
                <PillButton href="#vip-passes">Choose Your Access</PillButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <VipFeaturesSection />
      <VipCompareSection />
      <VipWhySection />
      <Footer />
    </main>
  );
}

function JourneyPage({ startAnimations }: { startAnimations: boolean }) {
  const actions = [
    { label: 'Shiloh Season 2026', href: '#journey-season' },
    { label: '2026 Maps', href: '#fort-moriah-map' },
    { label: '2026 Support & FAQs', href: '#journey-support' },
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
            <BlurText key={startAnimations ? 'journey-ready' : 'journey-wait'} text="Plan Your Journey" start={startAnimations} />
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
      <Footer />
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
          <PillButton href="/vip" variant="glass">
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
    image: '/discover-images/prophetic-retreat.jpg',
    href: 'https://programs.uebertangel.org/product/2026/',
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
    image: '/discover-images/shiloh-conference.jpg',
    registrationType: 'conference',
    items: [
      'A powerful gathering at Fort Moriah City.',
      'An encounter where every form of disappointment is averted.',
      'Every limitation is dealt with and completely eradicated.',
    ],
  },
  {
    number: '03',
    title: "The Ra'ah's Birthday Celebration",
    date: 'September 6',
    image: '/discover-images/birthday-gala.jpg',
    href: 'https://programs.uebertangel.org/product/birthday/',
    items: [
      "A royal birthday celebration honoring the Ra'ah, Prophet Uebert Angel.",
      'A special delegation with dance, thanksgiving, and joyful presentation.',
      'An elegant gala atmosphere for celebration, honor, and fellowship.',
    ],
  },
  {
    number: '04',
    title: 'Baptism by The Ra’ah',
    date: 'Date to be Decided',
    image: '/discover-images/baptism.jpg',
    items: [
      'A sacred moment of public faith, renewal, and spiritual transformation during Shiloh Season 26, led by The Ra’ah, Prophet Uebert Angel.',
      'Guests participating in baptism will be required to wear the official GoodNews World baptism garments for unity, order, and conference presentation purposes.',
      'Baptism garments are available separately through the Shiloh Shop.',
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
  const imagePosition =
    card.title === 'Prophetic Retreat'
      ? 'object-[50%_44%]'
      : card.title === 'Baptism by The Ra’ah'
        ? 'object-top'
        : 'object-center';

  return (
    <motion.article
      className="flex h-full min-h-[620px] flex-col overflow-hidden rounded-lg bg-[#212121] md:min-h-[660px] lg:min-h-[640px]"
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="flex h-48 shrink-0 items-center justify-center overflow-hidden border-b border-white/5 md:h-52 lg:h-48 xl:h-52">
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
        <a
          href={card.href ?? '#registration'}
          data-registration-type={card.registrationType}
          className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-primary"
        >
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
    <section id="features" className="relative min-h-screen overflow-hidden bg-black px-4 py-20 pb-32 sm:px-6 md:py-28 md:pb-40">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <WordsPullUp text="Discover Shiloh" className="justify-center font-serif text-3xl font-normal italic leading-none text-primary [&_*]:font-serif [&_*]:font-normal [&_*]:italic sm:text-4xl md:text-5xl" />
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
            What happens in Shiloh stays in Shiloh.
          </p>
        </div>
        <div ref={gridRef} className="grid items-stretch gap-3 sm:gap-2 md:auto-rows-fr md:grid-cols-2 md:gap-1 lg:grid-cols-4">
          {featureCards.map((card, index) => (
            <FeatureCard key={card.number} card={card} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Plan', href: '/journey' },
    { label: 'VIP', href: '/vip' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Passes', href: '/passes' },
    { label: 'Contact', href: '/contact' },
  ];

  const hotlines = [
    { label: 'USA', flag: '🇺🇸', phone: '+1 448 877 0344', href: 'tel:+14488770344' },
    { label: 'UK', flag: '🇬🇧', phone: '+44 1244 727242', href: 'tel:+441244727242' },
    { label: 'Zimbabwe', flag: '🇿🇼', phone: '+263 8677 211 645', href: 'tel:+2638677211645' },
    { label: 'South Africa', flag: '🇿🇦', phone: '+27 872 654 913', href: 'tel:+27872654913' },
  ];

  return (
    <footer id="footer" className="relative overflow-hidden bg-black px-4 pb-10 pt-16 text-primary sm:px-6 md:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(240,201,111,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.035),rgba(0,0,0,0)_34%)]" />
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-primary/12 bg-white/[0.035] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.36)] backdrop-blur-md sm:p-7 md:p-9">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr_0.9fr] lg:items-start">
          <div>
            <a href="/" className="mb-5 inline-flex items-center gap-4">
              <img src={logo} alt="Shiloh logo" className="h-12 w-12 rounded-full object-contain" referrerPolicy="no-referrer" />
              <span>
                <span className="block text-[11px] font-extrabold uppercase tracking-[0.34em] text-primary">Shiloh</span>
                <span className="mt-1 block font-serif text-xl italic leading-none text-primary/78">Season 26</span>
              </span>
            </a>
            <p className="max-w-2xl text-sm leading-6 text-primary/58">
              We are thrilled to officially announce that Shiloh 2026 is set to take place from August 31st - September
              6th at Fort Moriah City and The Harare Hippodrome. Free entry available for all attendees, with free local
              shuttle transportation on <strong className="font-bold text-primary/82">select routes</strong>. Premium
              air-conditioned coach transportation options are also available for regional and international attendees.{' '}
              <a href="/passes" className="font-semibold italic text-primary/82 underline decoration-primary/30 underline-offset-4">
                View parking and shuttle information.
              </a>
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.34em] text-primary/38">Explore</p>
              <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-primary/72">
                {footerLinks.map((link) => (
                  <a key={link.label} href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.34em] text-primary/38">Support</p>
              <div className="flex flex-col gap-3 text-sm text-primary/72">
                <a href="mailto:support@goodnewsworld.com" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                  <Mail className="h-4 w-4 text-primary/42" />
                  support@goodnewsworld.com
                </a>
                <a href="/contact" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                  <Phone className="h-4 w-4 text-primary/42" />
                  Contact support
                </a>
                <a href="https://shilohseason.com" className="transition-colors hover:text-primary">
                  Shilohseason.com
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-primary/10 bg-black/40 p-5">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.34em] text-primary/38">Call Center</p>
            <div className="grid gap-3 text-sm">
              {hotlines.map((hotline) => (
                <a key={hotline.label} href={hotline.href} className="group flex items-center justify-between gap-4 rounded-xl bg-white/[0.045] px-4 py-3 text-primary/76 transition-colors hover:bg-white/[0.08] hover:text-primary">
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-primary/35">
                    <span className="text-sm leading-none tracking-normal" aria-hidden="true">{hotline.flag}</span>
                    {hotline.label}
                  </span>
                  <span className="text-right">{hotline.phone}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-primary/10 pt-6 text-xs uppercase tracking-[0.2em] text-primary/42 sm:flex-row sm:items-center sm:justify-between">
          <p>Shiloh Season 2026</p>
          <div className="flex flex-wrap gap-4">
            <a href="/passes" className="transition-colors hover:text-primary">Parking & Shuttle</a>
            <a href="/schedule" className="transition-colors hover:text-primary">Schedule</a>
            <span>All rights reserved.</span>
          </div>
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
    'https://forms.zohopublic.eu/rikki/form/SimpleOrderForm/formperma/ygi0PjWj3QQC-FSgvE1HfiaATMsF7qzn3jVwuNd8c6g';

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
                aria-label={registrationTitle}
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
                  className={`rounded-full px-4 py-2 transition-colors ${activeTab === 'about' ? 'bg-black text-white' : 'hover:text-black'
                    }`}
                >
                  About
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('sponsor')}
                  className={`rounded-full px-4 py-2 transition-colors ${activeTab === 'sponsor' ? 'bg-black text-white' : 'hover:text-black'
                    }`}
                >
                  Sponsor Now
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4 sm:px-5">
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
                  className="h-[min(74svh,688px)] min-h-[560px] w-full rounded-2xl border border-black/10"
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
                    className={`rounded-full px-4 py-2 transition-colors ${activeSeed === option.id ? 'bg-black text-white' : 'hover:text-black'
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

type MerchProduct = {
  slug: string;
  name: string;
  priceUsd: number;
  priceLabel: string;
  checkoutProductId?: number;
  category?: string;
  subcategory?: string;
  oldPriceLabel?: string;
  description: string;
  detail: string;
  accent: string;
  icon: LucideIcon;
  image?: string;
  imagePosition?: string;
  variants?: MerchVariant[];
  sizes?: string[];
  colors?: Array<{ name: string; className: string }>;
  images?: string[];
};

type MerchVariant = {
  id: string;
  label: string;
  size?: string;
  color?: string;
  checkoutProductId?: number;
  priceUsd?: number;
  priceLabel?: string;
};

type CartItem = {
  slug: string;
  variantId?: string;
  size?: string;
  color?: string;
  quantity: number;
};

const merchProducts: MerchProduct[] = [
  {
    slug: 'shiloh-season-jumper',
    name: 'Pre Order - Shiloh Season Jumper',
    priceUsd: 35,
    priceLabel: '$35 USD',
    category: 'SHILOH 2026',
    description: 'Step into your Shiloh Season in style, a season of surrender, growth, breakthrough and divine encounter! The Shiloh Season Jumper is more than apparel, it\'s a statement of faith and expectation. Inspired by the biblical place of encounter and transformation, this piece represents a season where prayers are answered, purpose is revealed, and God\'s presence is experienced deeply. With a comfortable modern fit, this tee is designed for everyday wear while carrying a powerful message. Whether worn casually, to church gatherings, conferences or community events, it serves as a reminder that every season has purpose. And this Shiloh is YOUR Shiloh Season!',
    detail: 'Step into your Shiloh Season in style, a season of surrender, growth, breakthrough and divine encounter! The Shiloh Season Jumper is more than apparel, it\'s a statement of faith and expectation. Inspired by the biblical place of encounter and transformation, this piece represents a season where prayers are answered, purpose is revealed, and God\'s presence is experienced deeply. With a comfortable modern fit, this tee is designed for everyday wear while carrying a powerful message. Whether worn casually, to church gatherings, conferences or community events, it serves as a reminder that every season has purpose. And this Shiloh is YOUR Shiloh Season!',
    accent: 'from-[#E1E0CC] to-[#746C4F]',
    icon: Shirt,
    image: 'https://uebertangel.org/wp-content/uploads/2026/06/Jumper-Shiloh.webp',
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"],
    colors: [{ "name": "Black", "className": "#111111" }, { "name": "Charcoal Grey", "className": "#333333" }, { "name": "Pink", "className": "#ad1457" }, { "name": "Red", "className": "#d32f2f" }, { "name": "Blue", "className": "#1976d2" }, { "name": "Green", "className": "#2e7d32" }, { "name": "Maroon", "className": "#800000" }, { "name": "White", "className": "#ffffff" }, { "name": "Brown", "className": "#5d4037" }],
    variants: [
      {
        id: '33022',
        label: 'Size: S / Color: Black',
        checkoutProductId: 33022,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'S',
        color: 'Black'
      },
      {
        id: '33023',
        label: 'Size: M / Color: Black',
        checkoutProductId: 33023,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'M',
        color: 'Black'
      },
      {
        id: '33024',
        label: 'Size: L / Color: Black',
        checkoutProductId: 33024,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'L',
        color: 'Black'
      },
      {
        id: '33025',
        label: 'Size: XL / Color: Black',
        checkoutProductId: 33025,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XL',
        color: 'Black'
      },
      {
        id: '33026',
        label: 'Size: XXL / Color: Black',
        checkoutProductId: 33026,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXL',
        color: 'Black'
      },
      {
        id: '33027',
        label: 'Size: XXXL / Color: Black',
        checkoutProductId: 33027,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXL',
        color: 'Black'
      },
      {
        id: '33028',
        label: 'Size: XXXXL / Color: Black',
        checkoutProductId: 33028,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXXL',
        color: 'Black'
      },
      {
        id: '33029',
        label: 'Size: S / Color: Charcoal Grey',
        checkoutProductId: 33029,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'S',
        color: 'Charcoal Grey'
      },
      {
        id: '33030',
        label: 'Size: M / Color: Charcoal Grey',
        checkoutProductId: 33030,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'M',
        color: 'Charcoal Grey'
      },
      {
        id: '33031',
        label: 'Size: L / Color: Charcoal Grey',
        checkoutProductId: 33031,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'L',
        color: 'Charcoal Grey'
      },
      {
        id: '33032',
        label: 'Size: XL / Color: Charcoal Grey',
        checkoutProductId: 33032,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XL',
        color: 'Charcoal Grey'
      },
      {
        id: '33033',
        label: 'Size: XXL / Color: Charcoal Grey',
        checkoutProductId: 33033,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXL',
        color: 'Charcoal Grey'
      },
      {
        id: '33034',
        label: 'Size: XXXL / Color: Charcoal Grey',
        checkoutProductId: 33034,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXL',
        color: 'Charcoal Grey'
      },
      {
        id: '33035',
        label: 'Size: XXXXL / Color: Charcoal Grey',
        checkoutProductId: 33035,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXXL',
        color: 'Charcoal Grey'
      },
      {
        id: '33036',
        label: 'Size: S / Color: Pink',
        checkoutProductId: 33036,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'S',
        color: 'Pink'
      },
      {
        id: '33037',
        label: 'Size: M / Color: Pink',
        checkoutProductId: 33037,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'M',
        color: 'Pink'
      },
      {
        id: '33038',
        label: 'Size: L / Color: Pink',
        checkoutProductId: 33038,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'L',
        color: 'Pink'
      },
      {
        id: '33039',
        label: 'Size: XL / Color: Pink',
        checkoutProductId: 33039,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XL',
        color: 'Pink'
      },
      {
        id: '33040',
        label: 'Size: XXL / Color: Pink',
        checkoutProductId: 33040,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXL',
        color: 'Pink'
      },
      {
        id: '33041',
        label: 'Size: XXXL / Color: Pink',
        checkoutProductId: 33041,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXL',
        color: 'Pink'
      },
      {
        id: '33042',
        label: 'Size: XXXXL / Color: Pink',
        checkoutProductId: 33042,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXXL',
        color: 'Pink'
      },
      {
        id: '33043',
        label: 'Size: S / Color: Red',
        checkoutProductId: 33043,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'S',
        color: 'Red'
      },
      {
        id: '33044',
        label: 'Size: M / Color: Red',
        checkoutProductId: 33044,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'M',
        color: 'Red'
      },
      {
        id: '33045',
        label: 'Size: L / Color: Red',
        checkoutProductId: 33045,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'L',
        color: 'Red'
      },
      {
        id: '33046',
        label: 'Size: XL / Color: Red',
        checkoutProductId: 33046,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XL',
        color: 'Red'
      },
      {
        id: '33047',
        label: 'Size: XXL / Color: Red',
        checkoutProductId: 33047,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXL',
        color: 'Red'
      },
      {
        id: '33048',
        label: 'Size: XXXL / Color: Red',
        checkoutProductId: 33048,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXL',
        color: 'Red'
      },
      {
        id: '33049',
        label: 'Size: XXXXL / Color: Red',
        checkoutProductId: 33049,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXXL',
        color: 'Red'
      },
      {
        id: '33050',
        label: 'Size: S / Color: Blue',
        checkoutProductId: 33050,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'S',
        color: 'Blue'
      },
      {
        id: '33051',
        label: 'Size: M / Color: Blue',
        checkoutProductId: 33051,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'M',
        color: 'Blue'
      },
      {
        id: '33052',
        label: 'Size: L / Color: Blue',
        checkoutProductId: 33052,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'L',
        color: 'Blue'
      },
      {
        id: '33053',
        label: 'Size: XL / Color: Blue',
        checkoutProductId: 33053,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XL',
        color: 'Blue'
      },
      {
        id: '33054',
        label: 'Size: XXL / Color: Blue',
        checkoutProductId: 33054,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXL',
        color: 'Blue'
      },
      {
        id: '33055',
        label: 'Size: XXXL / Color: Blue',
        checkoutProductId: 33055,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXL',
        color: 'Blue'
      },
      {
        id: '33056',
        label: 'Size: XXXXL / Color: Blue',
        checkoutProductId: 33056,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXXL',
        color: 'Blue'
      },
      {
        id: '33057',
        label: 'Size: S / Color: Green',
        checkoutProductId: 33057,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'S',
        color: 'Green'
      },
      {
        id: '33058',
        label: 'Size: M / Color: Green',
        checkoutProductId: 33058,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'M',
        color: 'Green'
      },
      {
        id: '33059',
        label: 'Size: L / Color: Green',
        checkoutProductId: 33059,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'L',
        color: 'Green'
      },
      {
        id: '33060',
        label: 'Size: XL / Color: Green',
        checkoutProductId: 33060,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XL',
        color: 'Green'
      },
      {
        id: '33061',
        label: 'Size: XXL / Color: Green',
        checkoutProductId: 33061,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXL',
        color: 'Green'
      },
      {
        id: '33062',
        label: 'Size: XXXL / Color: Green',
        checkoutProductId: 33062,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXL',
        color: 'Green'
      },
      {
        id: '33063',
        label: 'Size: XXXXL / Color: Green',
        checkoutProductId: 33063,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXXL',
        color: 'Green'
      },
      {
        id: '33064',
        label: 'Size: S / Color: Maroon',
        checkoutProductId: 33064,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'S',
        color: 'Maroon'
      },
      {
        id: '33065',
        label: 'Size: M / Color: Maroon',
        checkoutProductId: 33065,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'M',
        color: 'Maroon'
      },
      {
        id: '33066',
        label: 'Size: L / Color: Maroon',
        checkoutProductId: 33066,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'L',
        color: 'Maroon'
      },
      {
        id: '33067',
        label: 'Size: XL / Color: Maroon',
        checkoutProductId: 33067,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XL',
        color: 'Maroon'
      },
      {
        id: '33068',
        label: 'Size: XXL / Color: Maroon',
        checkoutProductId: 33068,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXL',
        color: 'Maroon'
      },
      {
        id: '33069',
        label: 'Size: XXXL / Color: Maroon',
        checkoutProductId: 33069,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXL',
        color: 'Maroon'
      },
      {
        id: '33070',
        label: 'Size: XXXXL / Color: Maroon',
        checkoutProductId: 33070,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXXL',
        color: 'Maroon'
      },
      {
        id: '33071',
        label: 'Size: S / Color: White',
        checkoutProductId: 33071,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'S',
        color: 'White'
      },
      {
        id: '33072',
        label: 'Size: M / Color: White',
        checkoutProductId: 33072,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'M',
        color: 'White'
      },
      {
        id: '33073',
        label: 'Size: L / Color: White',
        checkoutProductId: 33073,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'L',
        color: 'White'
      },
      {
        id: '33074',
        label: 'Size: XL / Color: White',
        checkoutProductId: 33074,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XL',
        color: 'White'
      },
      {
        id: '33075',
        label: 'Size: XXL / Color: White',
        checkoutProductId: 33075,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXL',
        color: 'White'
      },
      {
        id: '33076',
        label: 'Size: XXXL / Color: White',
        checkoutProductId: 33076,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXL',
        color: 'White'
      },
      {
        id: '33077',
        label: 'Size: XXXXL / Color: White',
        checkoutProductId: 33077,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXXL',
        color: 'White'
      },
      {
        id: '33078',
        label: 'Size: S / Color: Brown',
        checkoutProductId: 33078,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'S',
        color: 'Brown'
      },
      {
        id: '33079',
        label: 'Size: M / Color: Brown',
        checkoutProductId: 33079,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'M',
        color: 'Brown'
      },
      {
        id: '33080',
        label: 'Size: L / Color: Brown',
        checkoutProductId: 33080,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'L',
        color: 'Brown'
      },
      {
        id: '33081',
        label: 'Size: XL / Color: Brown',
        checkoutProductId: 33081,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XL',
        color: 'Brown'
      },
      {
        id: '33082',
        label: 'Size: XXL / Color: Brown',
        checkoutProductId: 33082,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXL',
        color: 'Brown'
      },
      {
        id: '33083',
        label: 'Size: XXXL / Color: Brown',
        checkoutProductId: 33083,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXL',
        color: 'Brown'
      },
      {
        id: '33084',
        label: 'Size: XXXXL / Color: Brown',
        checkoutProductId: 33084,
        priceUsd: 35,
        priceLabel: '$35 USD',
        size: 'XXXXL',
        color: 'Brown'
      }
    ]
  },
  {
    slug: 'shiloh-season-long-sleeve-t-shirt',
    name: 'Pre Order - Shiloh Season Long Sleeve T-Shirt',
    priceUsd: 20,
    priceLabel: '$20 USD',
    category: 'SHILOH 2026',
    description: 'Step into your Shiloh Season in style, a season of surrender, growth, breakthrough and divine encounter! The Shiloh Season T-Shirt is more than apparel, it&#8217;s a statement of faith and expectation. Inspired by the biblical place of encounter and transformation, this piece represents a season where prayers are answered, purpose is revealed, and God&#8217;s presence is experienced deeply. With a comfortable modern fit, this tee is designed for everyday wear while carrying a powerful message. Whether worn casually, to church gatherings, conferences or community events, it serves as a reminder that every season has purpose. And this Shiloh is YOUR Shiloh Season!',
    detail: 'Step into your Shiloh Season in style, a season of surrender, growth, breakthrough and divine encounter! The Shiloh Season T-Shirt is more than apparel, it&#8217;s a statement of faith and expectation. Inspired by the biblical place of encounter and transformation, this piece represents a season where prayers are answered, purpose is revealed, and God&#8217;s presence is experienced deeply. With a comfortable modern fit, this tee is designed for everyday wear while carrying a powerful message. Whether worn casually, to church gatherings, conferences or community events, it serves as a reminder that every season has purpose. And this Shiloh is YOUR Shiloh Season!',
    accent: 'from-[#E1E0CC] to-[#746C4F]',
    icon: Shirt,
    image: 'https://uebertangel.org/wp-content/uploads/2026/06/Long-Sleeve-Shiloh.webp',
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"],
    colors: [{ "name": "Black/Silver Logo", "className": "linear-gradient(135deg, #111 50%, #c0c0c0 50%)" }, { "name": "White/Silver Logo", "className": "linear-gradient(135deg, #fff 50%, #c0c0c0 50%)" }, { "name": "Red/Blue Logo", "className": "linear-gradient(135deg, #d32f2f 50%, #1976d2 50%)" }, { "name": "Green/Gold Logo", "className": "linear-gradient(135deg, #2e7d32 50%, #ffd700 50%)" }, { "name": "Blue/Silver Logo", "className": "linear-gradient(135deg, #1976d2 50%, #c0c0c0 50%)" }, { "name": "Cream/Gold Logo", "className": "linear-gradient(135deg, #f5f5dc 50%, #ffd700 50%)" }, { "name": "Purple/Blue Logo", "className": "linear-gradient(135deg, #7b1fa2 50%, #1976d2 50%)" }, { "name": "Pink/Silver Logo", "className": "linear-gradient(135deg, #ad1457 50%, #c0c0c0 50%)" }, { "name": "Maroon/Gold Logo", "className": "linear-gradient(135deg, #800000 50%, #ffd700 50%)" }],
    variants: [
      {
        id: '32956',
        label: 'Size: S / Color: Black/Silver Logo',
        checkoutProductId: 32956,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Black/Silver Logo'
      },
      {
        id: '32957',
        label: 'Size: M / Color: Black/Silver Logo',
        checkoutProductId: 32957,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Black/Silver Logo'
      },
      {
        id: '32958',
        label: 'Size: L / Color: Black/Silver Logo',
        checkoutProductId: 32958,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Black/Silver Logo'
      },
      {
        id: '32959',
        label: 'Size: XL / Color: Black/Silver Logo',
        checkoutProductId: 32959,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Black/Silver Logo'
      },
      {
        id: '32960',
        label: 'Size: XXL / Color: Black/Silver Logo',
        checkoutProductId: 32960,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Black/Silver Logo'
      },
      {
        id: '32961',
        label: 'Size: XXXL / Color: Black/Silver Logo',
        checkoutProductId: 32961,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Black/Silver Logo'
      },
      {
        id: '32962',
        label: 'Size: XXXXL / Color: Black/Silver Logo',
        checkoutProductId: 32962,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Black/Silver Logo'
      },
      {
        id: '32963',
        label: 'Size: S / Color: White/Silver Logo',
        checkoutProductId: 32963,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'White/Silver Logo'
      },
      {
        id: '32964',
        label: 'Size: M / Color: White/Silver Logo',
        checkoutProductId: 32964,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'White/Silver Logo'
      },
      {
        id: '32965',
        label: 'Size: L / Color: White/Silver Logo',
        checkoutProductId: 32965,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'White/Silver Logo'
      },
      {
        id: '32966',
        label: 'Size: XL / Color: White/Silver Logo',
        checkoutProductId: 32966,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'White/Silver Logo'
      },
      {
        id: '32967',
        label: 'Size: XXL / Color: White/Silver Logo',
        checkoutProductId: 32967,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'White/Silver Logo'
      },
      {
        id: '32968',
        label: 'Size: XXXL / Color: White/Silver Logo',
        checkoutProductId: 32968,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'White/Silver Logo'
      },
      {
        id: '32969',
        label: 'Size: XXXXL / Color: White/Silver Logo',
        checkoutProductId: 32969,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'White/Silver Logo'
      },
      {
        id: '32970',
        label: 'Size: S / Color: Red/Blue Logo',
        checkoutProductId: 32970,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Red/Blue Logo'
      },
      {
        id: '32971',
        label: 'Size: M / Color: Red/Blue Logo',
        checkoutProductId: 32971,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Red/Blue Logo'
      },
      {
        id: '32972',
        label: 'Size: L / Color: Red/Blue Logo',
        checkoutProductId: 32972,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Red/Blue Logo'
      },
      {
        id: '32973',
        label: 'Size: XL / Color: Red/Blue Logo',
        checkoutProductId: 32973,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Red/Blue Logo'
      },
      {
        id: '32974',
        label: 'Size: XXL / Color: Red/Blue Logo',
        checkoutProductId: 32974,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Red/Blue Logo'
      },
      {
        id: '32975',
        label: 'Size: XXXL / Color: Red/Blue Logo',
        checkoutProductId: 32975,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Red/Blue Logo'
      },
      {
        id: '32976',
        label: 'Size: XXXXL / Color: Red/Blue Logo',
        checkoutProductId: 32976,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Red/Blue Logo'
      },
      {
        id: '32977',
        label: 'Size: S / Color: Green/Gold Logo',
        checkoutProductId: 32977,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Green/Gold Logo'
      },
      {
        id: '32978',
        label: 'Size: M / Color: Green/Gold Logo',
        checkoutProductId: 32978,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Green/Gold Logo'
      },
      {
        id: '32979',
        label: 'Size: L / Color: Green/Gold Logo',
        checkoutProductId: 32979,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Green/Gold Logo'
      },
      {
        id: '32980',
        label: 'Size: XL / Color: Green/Gold Logo',
        checkoutProductId: 32980,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Green/Gold Logo'
      },
      {
        id: '32981',
        label: 'Size: XXL / Color: Green/Gold Logo',
        checkoutProductId: 32981,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Green/Gold Logo'
      },
      {
        id: '32982',
        label: 'Size: XXXL / Color: Green/Gold Logo',
        checkoutProductId: 32982,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Green/Gold Logo'
      },
      {
        id: '32983',
        label: 'Size: XXXXL / Color: Green/Gold Logo',
        checkoutProductId: 32983,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Green/Gold Logo'
      },
      {
        id: '32984',
        label: 'Size: S / Color: Blue/Silver Logo',
        checkoutProductId: 32984,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Blue/Silver Logo'
      },
      {
        id: '32985',
        label: 'Size: M / Color: Blue/Silver Logo',
        checkoutProductId: 32985,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Blue/Silver Logo'
      },
      {
        id: '32986',
        label: 'Size: L / Color: Blue/Silver Logo',
        checkoutProductId: 32986,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Blue/Silver Logo'
      },
      {
        id: '32987',
        label: 'Size: XL / Color: Blue/Silver Logo',
        checkoutProductId: 32987,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Blue/Silver Logo'
      },
      {
        id: '32988',
        label: 'Size: XXL / Color: Blue/Silver Logo',
        checkoutProductId: 32988,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Blue/Silver Logo'
      },
      {
        id: '32989',
        label: 'Size: XXXL / Color: Blue/Silver Logo',
        checkoutProductId: 32989,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Blue/Silver Logo'
      },
      {
        id: '32990',
        label: 'Size: XXXXL / Color: Blue/Silver Logo',
        checkoutProductId: 32990,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Blue/Silver Logo'
      },
      {
        id: '32991',
        label: 'Size: S / Color: Cream/Gold Logo',
        checkoutProductId: 32991,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Cream/Gold Logo'
      },
      {
        id: '32992',
        label: 'Size: M / Color: Cream/Gold Logo',
        checkoutProductId: 32992,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Cream/Gold Logo'
      },
      {
        id: '32993',
        label: 'Size: L / Color: Cream/Gold Logo',
        checkoutProductId: 32993,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Cream/Gold Logo'
      },
      {
        id: '32994',
        label: 'Size: XL / Color: Cream/Gold Logo',
        checkoutProductId: 32994,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Cream/Gold Logo'
      },
      {
        id: '32995',
        label: 'Size: XXL / Color: Cream/Gold Logo',
        checkoutProductId: 32995,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Cream/Gold Logo'
      },
      {
        id: '32996',
        label: 'Size: XXXL / Color: Cream/Gold Logo',
        checkoutProductId: 32996,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Cream/Gold Logo'
      },
      {
        id: '32997',
        label: 'Size: XXXXL / Color: Cream/Gold Logo',
        checkoutProductId: 32997,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Cream/Gold Logo'
      },
      {
        id: '32998',
        label: 'Size: S / Color: Purple/Blue Logo',
        checkoutProductId: 32998,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Purple/Blue Logo'
      },
      {
        id: '32999',
        label: 'Size: M / Color: Purple/Blue Logo',
        checkoutProductId: 32999,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Purple/Blue Logo'
      },
      {
        id: '33000',
        label: 'Size: L / Color: Purple/Blue Logo',
        checkoutProductId: 33000,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Purple/Blue Logo'
      },
      {
        id: '33001',
        label: 'Size: XL / Color: Purple/Blue Logo',
        checkoutProductId: 33001,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Purple/Blue Logo'
      },
      {
        id: '33002',
        label: 'Size: XXL / Color: Purple/Blue Logo',
        checkoutProductId: 33002,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Purple/Blue Logo'
      },
      {
        id: '33003',
        label: 'Size: XXXL / Color: Purple/Blue Logo',
        checkoutProductId: 33003,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Purple/Blue Logo'
      },
      {
        id: '33004',
        label: 'Size: XXXXL / Color: Purple/Blue Logo',
        checkoutProductId: 33004,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Purple/Blue Logo'
      },
      {
        id: '33005',
        label: 'Size: S / Color: Pink/Silver Logo',
        checkoutProductId: 33005,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Pink/Silver Logo'
      },
      {
        id: '33006',
        label: 'Size: M / Color: Pink/Silver Logo',
        checkoutProductId: 33006,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Pink/Silver Logo'
      },
      {
        id: '33007',
        label: 'Size: L / Color: Pink/Silver Logo',
        checkoutProductId: 33007,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Pink/Silver Logo'
      },
      {
        id: '33008',
        label: 'Size: XL / Color: Pink/Silver Logo',
        checkoutProductId: 33008,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Pink/Silver Logo'
      },
      {
        id: '33009',
        label: 'Size: XXL / Color: Pink/Silver Logo',
        checkoutProductId: 33009,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Pink/Silver Logo'
      },
      {
        id: '33010',
        label: 'Size: XXXL / Color: Pink/Silver Logo',
        checkoutProductId: 33010,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Pink/Silver Logo'
      },
      {
        id: '33011',
        label: 'Size: XXXXL / Color: Pink/Silver Logo',
        checkoutProductId: 33011,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Pink/Silver Logo'
      },
      {
        id: '33012',
        label: 'Size: S / Color: Maroon/Gold Logo',
        checkoutProductId: 33012,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Maroon/Gold Logo'
      },
      {
        id: '33013',
        label: 'Size: M / Color: Maroon/Gold Logo',
        checkoutProductId: 33013,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Maroon/Gold Logo'
      },
      {
        id: '33014',
        label: 'Size: L / Color: Maroon/Gold Logo',
        checkoutProductId: 33014,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Maroon/Gold Logo'
      },
      {
        id: '33015',
        label: 'Size: XL / Color: Maroon/Gold Logo',
        checkoutProductId: 33015,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Maroon/Gold Logo'
      },
      {
        id: '33016',
        label: 'Size: XXL / Color: Maroon/Gold Logo',
        checkoutProductId: 33016,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Maroon/Gold Logo'
      },
      {
        id: '33017',
        label: 'Size: XXXL / Color: Maroon/Gold Logo',
        checkoutProductId: 33017,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Maroon/Gold Logo'
      },
      {
        id: '33018',
        label: 'Size: XXXXL / Color: Maroon/Gold Logo',
        checkoutProductId: 33018,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Maroon/Gold Logo'
      }
    ]
  },
  {
    slug: 'shiloh-season-silver-logo-t-shirt',
    name: 'Pre Order - Shiloh Season Silver Logo T-Shirt',
    priceUsd: 20,
    priceLabel: '$20 USD',
    category: 'SHILOH 2026',
    description: 'Step into your Shiloh Season in style, a season of surrender, growth, breakthrough and divine encounter! The Shiloh Season T-Shirt is more than apparel, it&#8217;s a statement of faith and expectation. Inspired by the biblical place of encounter and transformation, this piece represents a season where prayers are answered, purpose is revealed, and God&#8217;s presence is experienced deeply. With a comfortable modern fit, this tee is designed for everyday wear while carrying a powerful message. Whether worn casually, to church gatherings, conferences or community events, it serves as a reminder that every season has purpose. And this Shiloh is YOUR Shiloh Season!',
    detail: 'Step into your Shiloh Season in style, a season of surrender, growth, breakthrough and divine encounter! The Shiloh Season T-Shirt is more than apparel, it&#8217;s a statement of faith and expectation. Inspired by the biblical place of encounter and transformation, this piece represents a season where prayers are answered, purpose is revealed, and God&#8217;s presence is experienced deeply. With a comfortable modern fit, this tee is designed for everyday wear while carrying a powerful message. Whether worn casually, to church gatherings, conferences or community events, it serves as a reminder that every season has purpose. And this Shiloh is YOUR Shiloh Season!',
    accent: 'from-[#E1E0CC] to-[#746C4F]',
    icon: Shirt,
    image: 'https://uebertangel.org/wp-content/uploads/2026/06/Green-Silver.webp',
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"],
    colors: [{ "name": "Black", "className": "#111111" }, { "name": "White", "className": "#ffffff" }, { "name": "Green", "className": "#2e7d32" }, { "name": "Red", "className": "#d32f2f" }, { "name": "Cream", "className": "#f5f5dc" }, { "name": "Blue", "className": "#1976d2" }, { "name": "Purple", "className": "#7b1fa2" }, { "name": "Pink", "className": "#ad1457" }, { "name": "Maroon", "className": "#800000" }],
    variants: [
      {
        id: '32889',
        label: 'Size: S / Color: Black',
        checkoutProductId: 32889,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Black'
      },
      {
        id: '32890',
        label: 'Size: M / Color: Black',
        checkoutProductId: 32890,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Black'
      },
      {
        id: '32891',
        label: 'Size: L / Color: Black',
        checkoutProductId: 32891,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Black'
      },
      {
        id: '32892',
        label: 'Size: XL / Color: Black',
        checkoutProductId: 32892,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Black'
      },
      {
        id: '32893',
        label: 'Size: XXL / Color: Black',
        checkoutProductId: 32893,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Black'
      },
      {
        id: '32894',
        label: 'Size: XXXL / Color: Black',
        checkoutProductId: 32894,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Black'
      },
      {
        id: '32895',
        label: 'Size: XXXXL / Color: Black',
        checkoutProductId: 32895,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Black'
      },
      {
        id: '32896',
        label: 'Size: S / Color: White',
        checkoutProductId: 32896,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'White'
      },
      {
        id: '32897',
        label: 'Size: M / Color: White',
        checkoutProductId: 32897,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'White'
      },
      {
        id: '32898',
        label: 'Size: L / Color: White',
        checkoutProductId: 32898,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'White'
      },
      {
        id: '32899',
        label: 'Size: XL / Color: White',
        checkoutProductId: 32899,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'White'
      },
      {
        id: '32900',
        label: 'Size: XXL / Color: White',
        checkoutProductId: 32900,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'White'
      },
      {
        id: '32901',
        label: 'Size: XXXL / Color: White',
        checkoutProductId: 32901,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'White'
      },
      {
        id: '32902',
        label: 'Size: XXXXL / Color: White',
        checkoutProductId: 32902,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'White'
      },
      {
        id: '32904',
        label: 'Size: S / Color: Green',
        checkoutProductId: 32904,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Green'
      },
      {
        id: '32905',
        label: 'Size: M / Color: Green',
        checkoutProductId: 32905,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Green'
      },
      {
        id: '32906',
        label: 'Size: L / Color: Green',
        checkoutProductId: 32906,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Green'
      },
      {
        id: '32907',
        label: 'Size: XL / Color: Green',
        checkoutProductId: 32907,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Green'
      },
      {
        id: '32908',
        label: 'Size: XXL / Color: Green',
        checkoutProductId: 32908,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Green'
      },
      {
        id: '32909',
        label: 'Size: XXXL / Color: Green',
        checkoutProductId: 32909,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Green'
      },
      {
        id: '32910',
        label: 'Size: XXXXL / Color: Green',
        checkoutProductId: 32910,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Green'
      },
      {
        id: '32911',
        label: 'Size: S / Color: Red',
        checkoutProductId: 32911,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Red'
      },
      {
        id: '32912',
        label: 'Size: M / Color: Red',
        checkoutProductId: 32912,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Red'
      },
      {
        id: '32913',
        label: 'Size: L / Color: Red',
        checkoutProductId: 32913,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Red'
      },
      {
        id: '32914',
        label: 'Size: XL / Color: Red',
        checkoutProductId: 32914,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Red'
      },
      {
        id: '32915',
        label: 'Size: XXL / Color: Red',
        checkoutProductId: 32915,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Red'
      },
      {
        id: '32916',
        label: 'Size: XXXL / Color: Red',
        checkoutProductId: 32916,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Red'
      },
      {
        id: '32917',
        label: 'Size: XXXXL / Color: Red',
        checkoutProductId: 32917,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Red'
      },
      {
        id: '32918',
        label: 'Size: S / Color: Cream',
        checkoutProductId: 32918,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Cream'
      },
      {
        id: '32919',
        label: 'Size: M / Color: Cream',
        checkoutProductId: 32919,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Cream'
      },
      {
        id: '32920',
        label: 'Size: L / Color: Cream',
        checkoutProductId: 32920,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Cream'
      },
      {
        id: '32921',
        label: 'Size: XL / Color: Cream',
        checkoutProductId: 32921,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Cream'
      },
      {
        id: '32922',
        label: 'Size: XXL / Color: Cream',
        checkoutProductId: 32922,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Cream'
      },
      {
        id: '32923',
        label: 'Size: XXXL / Color: Cream',
        checkoutProductId: 32923,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Cream'
      },
      {
        id: '32924',
        label: 'Size: XXXXL / Color: Cream',
        checkoutProductId: 32924,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Cream'
      },
      {
        id: '32925',
        label: 'Size: S / Color: Blue',
        checkoutProductId: 32925,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Blue'
      },
      {
        id: '32926',
        label: 'Size: M / Color: Blue',
        checkoutProductId: 32926,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Blue'
      },
      {
        id: '32927',
        label: 'Size: L / Color: Blue',
        checkoutProductId: 32927,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Blue'
      },
      {
        id: '32928',
        label: 'Size: XL / Color: Blue',
        checkoutProductId: 32928,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Blue'
      },
      {
        id: '32929',
        label: 'Size: XXL / Color: Blue',
        checkoutProductId: 32929,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Blue'
      },
      {
        id: '32930',
        label: 'Size: XXXL / Color: Blue',
        checkoutProductId: 32930,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Blue'
      },
      {
        id: '32931',
        label: 'Size: XXXXL / Color: Blue',
        checkoutProductId: 32931,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Blue'
      },
      {
        id: '32932',
        label: 'Size: S / Color: Purple',
        checkoutProductId: 32932,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Purple'
      },
      {
        id: '32933',
        label: 'Size: M / Color: Purple',
        checkoutProductId: 32933,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Purple'
      },
      {
        id: '32934',
        label: 'Size: L / Color: Purple',
        checkoutProductId: 32934,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Purple'
      },
      {
        id: '32935',
        label: 'Size: XL / Color: Purple',
        checkoutProductId: 32935,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Purple'
      },
      {
        id: '32936',
        label: 'Size: XXL / Color: Purple',
        checkoutProductId: 32936,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Purple'
      },
      {
        id: '32937',
        label: 'Size: XXXL / Color: Purple',
        checkoutProductId: 32937,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Purple'
      },
      {
        id: '32938',
        label: 'Size: XXXXL / Color: Purple',
        checkoutProductId: 32938,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Purple'
      },
      {
        id: '32939',
        label: 'Size: S / Color: Pink',
        checkoutProductId: 32939,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Pink'
      },
      {
        id: '32940',
        label: 'Size: M / Color: Pink',
        checkoutProductId: 32940,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Pink'
      },
      {
        id: '32941',
        label: 'Size: L / Color: Pink',
        checkoutProductId: 32941,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Pink'
      },
      {
        id: '32942',
        label: 'Size: XL / Color: Pink',
        checkoutProductId: 32942,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Pink'
      },
      {
        id: '32943',
        label: 'Size: XXL / Color: Pink',
        checkoutProductId: 32943,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Pink'
      },
      {
        id: '32944',
        label: 'Size: XXXL / Color: Pink',
        checkoutProductId: 32944,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Pink'
      },
      {
        id: '32945',
        label: 'Size: XXXXL / Color: Pink',
        checkoutProductId: 32945,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Pink'
      },
      {
        id: '32946',
        label: 'Size: S / Color: Maroon',
        checkoutProductId: 32946,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Maroon'
      },
      {
        id: '32947',
        label: 'Size: M / Color: Maroon',
        checkoutProductId: 32947,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Maroon'
      },
      {
        id: '32948',
        label: 'Size: L / Color: Maroon',
        checkoutProductId: 32948,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Maroon'
      },
      {
        id: '32949',
        label: 'Size: XL / Color: Maroon',
        checkoutProductId: 32949,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Maroon'
      },
      {
        id: '32950',
        label: 'Size: XXL / Color: Maroon',
        checkoutProductId: 32950,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Maroon'
      },
      {
        id: '32951',
        label: 'Size: XXXL / Color: Maroon',
        checkoutProductId: 32951,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Maroon'
      },
      {
        id: '32952',
        label: 'Size: XXXXL / Color: Maroon',
        checkoutProductId: 32952,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Maroon'
      }
    ]
  },
  {
    slug: 'shiloh-season-gold-logo-t-shirt',
    name: 'Pre Order - Shiloh Season Gold Logo T-Shirt',
    priceUsd: 20,
    priceLabel: '$20 USD',
    category: 'SHILOH 2026',
    description: 'Step into your Shiloh Season in style, a season of surrender, growth, breakthrough and divine encounter! The Shiloh Season T-Shirt is more than apparel, it&#8217;s a statement of faith and expectation. Inspired by the biblical place of encounter and transformation, this piece represents a season where prayers are answered, purpose is revealed, and God&#8217;s presence is experienced deeply. With a comfortable modern fit, this tee is designed for everyday wear while carrying a powerful message. Whether worn casually, to church gatherings, conferences or community events, it serves as a reminder that every season has purpose. And this Shiloh is YOUR Shiloh Season!',
    detail: 'Step into your Shiloh Season in style, a season of surrender, growth, breakthrough and divine encounter! The Shiloh Season T-Shirt is more than apparel, it&#8217;s a statement of faith and expectation. Inspired by the biblical place of encounter and transformation, this piece represents a season where prayers are answered, purpose is revealed, and God&#8217;s presence is experienced deeply. With a comfortable modern fit, this tee is designed for everyday wear while carrying a powerful message. Whether worn casually, to church gatherings, conferences or community events, it serves as a reminder that every season has purpose. And this Shiloh is YOUR Shiloh Season!',
    accent: 'from-[#E1E0CC] to-[#746C4F]',
    icon: Shirt,
    image: 'https://uebertangel.org/wp-content/uploads/2026/06/Gold-Shiloh-Mock-Up.webp',
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"],
    colors: [{ "name": "Black", "className": "#111111" }, { "name": "Red", "className": "#d32f2f" }, { "name": "Green", "className": "#2e7d32" }, { "name": "White", "className": "#ffffff" }, { "name": "Blue", "className": "#1976d2" }, { "name": "Cream", "className": "#f5f5dc" }, { "name": "Purple", "className": "#7b1fa2" }, { "name": "Pink", "className": "#ad1457" }, { "name": "Maroon", "className": "#800000" }],
    variants: [
      {
        id: '32823',
        label: 'Size: S / Color: Black',
        checkoutProductId: 32823,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Black'
      },
      {
        id: '32824',
        label: 'Size: M / Color: Black',
        checkoutProductId: 32824,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Black'
      },
      {
        id: '32825',
        label: 'Size: L / Color: Black',
        checkoutProductId: 32825,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Black'
      },
      {
        id: '32826',
        label: 'Size: XL / Color: Black',
        checkoutProductId: 32826,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Black'
      },
      {
        id: '32827',
        label: 'Size: XXL / Color: Black',
        checkoutProductId: 32827,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Black'
      },
      {
        id: '32828',
        label: 'Size: XXXL / Color: Black',
        checkoutProductId: 32828,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Black'
      },
      {
        id: '32829',
        label: 'Size: XXXXL / Color: Black',
        checkoutProductId: 32829,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Black'
      },
      {
        id: '32830',
        label: 'Size: S / Color: Red',
        checkoutProductId: 32830,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Red'
      },
      {
        id: '32831',
        label: 'Size: M / Color: Red',
        checkoutProductId: 32831,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Red'
      },
      {
        id: '32832',
        label: 'Size: L / Color: Red',
        checkoutProductId: 32832,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Red'
      },
      {
        id: '32833',
        label: 'Size: XL / Color: Red',
        checkoutProductId: 32833,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Red'
      },
      {
        id: '32834',
        label: 'Size: XXL / Color: Red',
        checkoutProductId: 32834,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Red'
      },
      {
        id: '32835',
        label: 'Size: XXXL / Color: Red',
        checkoutProductId: 32835,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Red'
      },
      {
        id: '32836',
        label: 'Size: XXXXL / Color: Red',
        checkoutProductId: 32836,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Red'
      },
      {
        id: '32837',
        label: 'Size: S / Color: Green',
        checkoutProductId: 32837,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Green'
      },
      {
        id: '32838',
        label: 'Size: M / Color: Green',
        checkoutProductId: 32838,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Green'
      },
      {
        id: '32839',
        label: 'Size: L / Color: Green',
        checkoutProductId: 32839,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Green'
      },
      {
        id: '32840',
        label: 'Size: XL / Color: Green',
        checkoutProductId: 32840,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Green'
      },
      {
        id: '32841',
        label: 'Size: XXL / Color: Green',
        checkoutProductId: 32841,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Green'
      },
      {
        id: '32842',
        label: 'Size: XXXL / Color: Green',
        checkoutProductId: 32842,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Green'
      },
      {
        id: '32843',
        label: 'Size: XXXXL / Color: Green',
        checkoutProductId: 32843,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Green'
      },
      {
        id: '32844',
        label: 'Size: S / Color: White',
        checkoutProductId: 32844,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'White'
      },
      {
        id: '32845',
        label: 'Size: M / Color: White',
        checkoutProductId: 32845,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'White'
      },
      {
        id: '32846',
        label: 'Size: L / Color: White',
        checkoutProductId: 32846,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'White'
      },
      {
        id: '32847',
        label: 'Size: XL / Color: White',
        checkoutProductId: 32847,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'White'
      },
      {
        id: '32848',
        label: 'Size: XXL / Color: White',
        checkoutProductId: 32848,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'White'
      },
      {
        id: '32849',
        label: 'Size: XXXL / Color: White',
        checkoutProductId: 32849,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'White'
      },
      {
        id: '32850',
        label: 'Size: XXXXL / Color: White',
        checkoutProductId: 32850,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'White'
      },
      {
        id: '32851',
        label: 'Size: S / Color: Blue',
        checkoutProductId: 32851,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Blue'
      },
      {
        id: '32852',
        label: 'Size: M / Color: Blue',
        checkoutProductId: 32852,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Blue'
      },
      {
        id: '32853',
        label: 'Size: L / Color: Blue',
        checkoutProductId: 32853,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Blue'
      },
      {
        id: '32854',
        label: 'Size: XL / Color: Blue',
        checkoutProductId: 32854,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Blue'
      },
      {
        id: '32855',
        label: 'Size: XXL / Color: Blue',
        checkoutProductId: 32855,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Blue'
      },
      {
        id: '32856',
        label: 'Size: XXXL / Color: Blue',
        checkoutProductId: 32856,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Blue'
      },
      {
        id: '32857',
        label: 'Size: XXXXL / Color: Blue',
        checkoutProductId: 32857,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Blue'
      },
      {
        id: '32858',
        label: 'Size: S / Color: Cream',
        checkoutProductId: 32858,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Cream'
      },
      {
        id: '32859',
        label: 'Size: M / Color: Cream',
        checkoutProductId: 32859,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Cream'
      },
      {
        id: '32860',
        label: 'Size: L / Color: Cream',
        checkoutProductId: 32860,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Cream'
      },
      {
        id: '32861',
        label: 'Size: XL / Color: Cream',
        checkoutProductId: 32861,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Cream'
      },
      {
        id: '32862',
        label: 'Size: XXL / Color: Cream',
        checkoutProductId: 32862,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Cream'
      },
      {
        id: '32863',
        label: 'Size: XXXL / Color: Cream',
        checkoutProductId: 32863,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Cream'
      },
      {
        id: '32864',
        label: 'Size: XXXXL / Color: Cream',
        checkoutProductId: 32864,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Cream'
      },
      {
        id: '32865',
        label: 'Size: S / Color: Purple',
        checkoutProductId: 32865,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Purple'
      },
      {
        id: '32866',
        label: 'Size: M / Color: Purple',
        checkoutProductId: 32866,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Purple'
      },
      {
        id: '32867',
        label: 'Size: L / Color: Purple',
        checkoutProductId: 32867,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Purple'
      },
      {
        id: '32868',
        label: 'Size: XL / Color: Purple',
        checkoutProductId: 32868,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Purple'
      },
      {
        id: '32869',
        label: 'Size: XXL / Color: Purple',
        checkoutProductId: 32869,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Purple'
      },
      {
        id: '32870',
        label: 'Size: XXXL / Color: Purple',
        checkoutProductId: 32870,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Purple'
      },
      {
        id: '32871',
        label: 'Size: XXXXL / Color: Purple',
        checkoutProductId: 32871,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Purple'
      },
      {
        id: '32872',
        label: 'Size: S / Color: Pink',
        checkoutProductId: 32872,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Pink'
      },
      {
        id: '32873',
        label: 'Size: M / Color: Pink',
        checkoutProductId: 32873,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Pink'
      },
      {
        id: '32874',
        label: 'Size: L / Color: Pink',
        checkoutProductId: 32874,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Pink'
      },
      {
        id: '32875',
        label: 'Size: XL / Color: Pink',
        checkoutProductId: 32875,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Pink'
      },
      {
        id: '32876',
        label: 'Size: XXL / Color: Pink',
        checkoutProductId: 32876,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Pink'
      },
      {
        id: '32877',
        label: 'Size: XXXL / Color: Pink',
        checkoutProductId: 32877,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Pink'
      },
      {
        id: '32878',
        label: 'Size: XXXXL / Color: Pink',
        checkoutProductId: 32878,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Pink'
      },
      {
        id: '32879',
        label: 'Size: S / Color: Maroon',
        checkoutProductId: 32879,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Maroon'
      },
      {
        id: '32880',
        label: 'Size: M / Color: Maroon',
        checkoutProductId: 32880,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Maroon'
      },
      {
        id: '32881',
        label: 'Size: L / Color: Maroon',
        checkoutProductId: 32881,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Maroon'
      },
      {
        id: '32882',
        label: 'Size: XL / Color: Maroon',
        checkoutProductId: 32882,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Maroon'
      },
      {
        id: '32883',
        label: 'Size: XXL / Color: Maroon',
        checkoutProductId: 32883,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Maroon'
      },
      {
        id: '32884',
        label: 'Size: XXXL / Color: Maroon',
        checkoutProductId: 32884,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Maroon'
      },
      {
        id: '32885',
        label: 'Size: XXXXL / Color: Maroon',
        checkoutProductId: 32885,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Maroon'
      }
    ]
  },
  {
    slug: 'shiloh-season-blue-logo-t-shirt',
    name: 'Pre Order - Shiloh Season Blue Logo T-Shirt',
    priceUsd: 20,
    priceLabel: '$20 USD',
    category: 'SHILOH 2026',
    description: 'Step into your Shiloh Season in style, a season of surrender, growth, breakthrough and divine encounter! The Shiloh Season T-Shirt is more than apparel, it&#8217;s a statement of faith and expectation. Inspired by the biblical place of encounter and transformation, this piece represents a season where prayers are answered, purpose is revealed, and God&#8217;s presence is experienced deeply. With a comfortable modern fit, this tee is designed for everyday wear while carrying a powerful message. Whether worn casually, to church gatherings, conferences or community events, it serves as a reminder that every season has purpose. And this Shiloh is YOUR Shiloh Season!',
    detail: 'Step into your Shiloh Season in style, a season of surrender, growth, breakthrough and divine encounter! The Shiloh Season T-Shirt is more than apparel, it&#8217;s a statement of faith and expectation. Inspired by the biblical place of encounter and transformation, this piece represents a season where prayers are answered, purpose is revealed, and God&#8217;s presence is experienced deeply. With a comfortable modern fit, this tee is designed for everyday wear while carrying a powerful message. Whether worn casually, to church gatherings, conferences or community events, it serves as a reminder that every season has purpose. And this Shiloh is YOUR Shiloh Season!',
    accent: 'from-[#E1E0CC] to-[#746C4F]',
    icon: Shirt,
    image: 'https://uebertangel.org/wp-content/uploads/2026/06/Blue-Shiloh-Mock-Up.webp',
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"],
    colors: [{ "name": "Black", "className": "#111111" }, { "name": "White", "className": "#ffffff" }, { "name": "Red", "className": "#d32f2f" }, { "name": "Green", "className": "#2e7d32" }, { "name": "Blue", "className": "#1976d2" }, { "name": "Cream", "className": "#f5f5dc" }, { "name": "Purple", "className": "#7b1fa2" }, { "name": "Pink", "className": "#ad1457" }, { "name": "Maroon", "className": "#800000" }],
    variants: [
      {
        id: '32745',
        label: 'Size: S / Color: Black',
        checkoutProductId: 32745,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Black'
      },
      {
        id: '32746',
        label: 'Size: M / Color: Black',
        checkoutProductId: 32746,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Black'
      },
      {
        id: '32747',
        label: 'Size: L / Color: Black',
        checkoutProductId: 32747,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Black'
      },
      {
        id: '32748',
        label: 'Size: XL / Color: Black',
        checkoutProductId: 32748,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Black'
      },
      {
        id: '32749',
        label: 'Size: XXL / Color: Black',
        checkoutProductId: 32749,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Black'
      },
      {
        id: '32750',
        label: 'Size: XXXL / Color: Black',
        checkoutProductId: 32750,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Black'
      },
      {
        id: '32751',
        label: 'Size: XXXXL / Color: Black',
        checkoutProductId: 32751,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Black'
      },
      {
        id: '32764',
        label: 'Size: S / Color: White',
        checkoutProductId: 32764,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'White'
      },
      {
        id: '32765',
        label: 'Size: M / Color: White',
        checkoutProductId: 32765,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'White'
      },
      {
        id: '32766',
        label: 'Size: L / Color: White',
        checkoutProductId: 32766,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'White'
      },
      {
        id: '32767',
        label: 'Size: XL / Color: White',
        checkoutProductId: 32767,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'White'
      },
      {
        id: '32768',
        label: 'Size: XXL / Color: White',
        checkoutProductId: 32768,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'White'
      },
      {
        id: '32769',
        label: 'Size: XXXL / Color: White',
        checkoutProductId: 32769,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'White'
      },
      {
        id: '32770',
        label: 'Size: XXXXL / Color: White',
        checkoutProductId: 32770,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'White'
      },
      {
        id: '32771',
        label: 'Size: S / Color: Red',
        checkoutProductId: 32771,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Red'
      },
      {
        id: '32772',
        label: 'Size: M / Color: Red',
        checkoutProductId: 32772,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Red'
      },
      {
        id: '32773',
        label: 'Size: L / Color: Red',
        checkoutProductId: 32773,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Red'
      },
      {
        id: '32774',
        label: 'Size: XL / Color: Red',
        checkoutProductId: 32774,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Red'
      },
      {
        id: '32775',
        label: 'Size: XXL / Color: Red',
        checkoutProductId: 32775,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Red'
      },
      {
        id: '32776',
        label: 'Size: XXXL / Color: Red',
        checkoutProductId: 32776,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Red'
      },
      {
        id: '32777',
        label: 'Size: XXXXL / Color: Red',
        checkoutProductId: 32777,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Red'
      },
      {
        id: '32778',
        label: 'Size: S / Color: Green',
        checkoutProductId: 32778,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Green'
      },
      {
        id: '32779',
        label: 'Size: M / Color: Green',
        checkoutProductId: 32779,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Green'
      },
      {
        id: '32780',
        label: 'Size: L / Color: Green',
        checkoutProductId: 32780,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Green'
      },
      {
        id: '32781',
        label: 'Size: XL / Color: Green',
        checkoutProductId: 32781,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Green'
      },
      {
        id: '32782',
        label: 'Size: XXL / Color: Green',
        checkoutProductId: 32782,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Green'
      },
      {
        id: '32783',
        label: 'Size: XXXL / Color: Green',
        checkoutProductId: 32783,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Green'
      },
      {
        id: '32784',
        label: 'Size: XXXXL / Color: Green',
        checkoutProductId: 32784,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Green'
      },
      {
        id: '32785',
        label: 'Size: S / Color: Blue',
        checkoutProductId: 32785,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Blue'
      },
      {
        id: '32786',
        label: 'Size: M / Color: Blue',
        checkoutProductId: 32786,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Blue'
      },
      {
        id: '32787',
        label: 'Size: L / Color: Blue',
        checkoutProductId: 32787,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Blue'
      },
      {
        id: '32788',
        label: 'Size: XL / Color: Blue',
        checkoutProductId: 32788,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Blue'
      },
      {
        id: '32789',
        label: 'Size: XXL / Color: Blue',
        checkoutProductId: 32789,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Blue'
      },
      {
        id: '32790',
        label: 'Size: XXXL / Color: Blue',
        checkoutProductId: 32790,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Blue'
      },
      {
        id: '32791',
        label: 'Size: XXXXL / Color: Blue',
        checkoutProductId: 32791,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Blue'
      },
      {
        id: '32792',
        label: 'Size: S / Color: Cream',
        checkoutProductId: 32792,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Cream'
      },
      {
        id: '32793',
        label: 'Size: M / Color: Cream',
        checkoutProductId: 32793,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Cream'
      },
      {
        id: '32794',
        label: 'Size: L / Color: Cream',
        checkoutProductId: 32794,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Cream'
      },
      {
        id: '32795',
        label: 'Size: XL / Color: Cream',
        checkoutProductId: 32795,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Cream'
      },
      {
        id: '32796',
        label: 'Size: XXL / Color: Cream',
        checkoutProductId: 32796,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Cream'
      },
      {
        id: '32797',
        label: 'Size: XXXL / Color: Cream',
        checkoutProductId: 32797,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Cream'
      },
      {
        id: '32798',
        label: 'Size: XXXXL / Color: Cream',
        checkoutProductId: 32798,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Cream'
      },
      {
        id: '32799',
        label: 'Size: S / Color: Purple',
        checkoutProductId: 32799,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Purple'
      },
      {
        id: '32800',
        label: 'Size: M / Color: Purple',
        checkoutProductId: 32800,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Purple'
      },
      {
        id: '32801',
        label: 'Size: L / Color: Purple',
        checkoutProductId: 32801,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Purple'
      },
      {
        id: '32802',
        label: 'Size: XL / Color: Purple',
        checkoutProductId: 32802,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Purple'
      },
      {
        id: '32803',
        label: 'Size: XXL / Color: Purple',
        checkoutProductId: 32803,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Purple'
      },
      {
        id: '32804',
        label: 'Size: XXXL / Color: Purple',
        checkoutProductId: 32804,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Purple'
      },
      {
        id: '32805',
        label: 'Size: XXXXL / Color: Purple',
        checkoutProductId: 32805,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Purple'
      },
      {
        id: '32806',
        label: 'Size: S / Color: Pink',
        checkoutProductId: 32806,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Pink'
      },
      {
        id: '32807',
        label: 'Size: M / Color: Pink',
        checkoutProductId: 32807,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Pink'
      },
      {
        id: '32808',
        label: 'Size: L / Color: Pink',
        checkoutProductId: 32808,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Pink'
      },
      {
        id: '32809',
        label: 'Size: XL / Color: Pink',
        checkoutProductId: 32809,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Pink'
      },
      {
        id: '32810',
        label: 'Size: XXL / Color: Pink',
        checkoutProductId: 32810,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Pink'
      },
      {
        id: '32811',
        label: 'Size: XXXL / Color: Pink',
        checkoutProductId: 32811,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Pink'
      },
      {
        id: '32812',
        label: 'Size: XXXXL / Color: Pink',
        checkoutProductId: 32812,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Pink'
      },
      {
        id: '32813',
        label: 'Size: S / Color: Maroon',
        checkoutProductId: 32813,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'S',
        color: 'Maroon'
      },
      {
        id: '32814',
        label: 'Size: M / Color: Maroon',
        checkoutProductId: 32814,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'M',
        color: 'Maroon'
      },
      {
        id: '32815',
        label: 'Size: L / Color: Maroon',
        checkoutProductId: 32815,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'L',
        color: 'Maroon'
      },
      {
        id: '32816',
        label: 'Size: XL / Color: Maroon',
        checkoutProductId: 32816,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XL',
        color: 'Maroon'
      },
      {
        id: '32817',
        label: 'Size: XXL / Color: Maroon',
        checkoutProductId: 32817,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXL',
        color: 'Maroon'
      },
      {
        id: '32818',
        label: 'Size: XXXL / Color: Maroon',
        checkoutProductId: 32818,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXL',
        color: 'Maroon'
      },
      {
        id: '32819',
        label: 'Size: XXXXL / Color: Maroon',
        checkoutProductId: 32819,
        priceUsd: 20,
        priceLabel: '$20 USD',
        size: 'XXXXL',
        color: 'Maroon'
      }
    ]
  },
  {
    slug: 'goodnews-beanie',
    name: 'GoodNews Beanie',
    priceUsd: 13.39,
    priceLabel: '$13.39 USD',
    checkoutProductId: 28206,
    category: 'GOODNEWSWORLD',
    description: 'Perfect for those cold Shiloh nights, the GoodNewsWorld beanie hat is what you need.',
    detail: 'Perfect for those cold Shiloh nights, the GoodNewsWorld beanie hat is what you need. Branded with the famous Wild Custard Apple Tree logo of GoodNewsWorld, this is an ideal gift for your loved ones and for yourself.',
    accent: 'from-[#E1E0CC] to-[#101010]',
    icon: Shirt,
    image: 'https://uebertangel.org/wp-content/uploads/2024/12/Untitled-design-91-scaled.webp',
    imagePosition: 'object-center',
    sizes: [],
    colors: [],
    variants: []
  }
];

const formatUsd = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

const getCartKey = (slug: string, variantId = '', size = '', color = '') => `${slug}::${variantId}::${size}::${color}`;

const getProductVariant = (product: MerchProduct, variantId?: string) =>
  product.variants?.find((variant) => variant.id === variantId) ?? product.variants?.[0];

const getCartLinePrice = (product: MerchProduct, variant?: MerchVariant) => variant?.priceUsd ?? product.priceUsd;

const getCartLinePriceLabel = (product: MerchProduct, variant?: MerchVariant) =>
  variant?.priceLabel ?? product.priceLabel;

const getCartLineCheckoutProductId = (product: MerchProduct, variant?: MerchVariant) =>
  variant?.checkoutProductId ?? product.checkoutProductId;

const getCheckoutUrl = (cartLines: Array<{ product: MerchProduct; variant?: MerchVariant; quantity: number }>) => {
  const checkoutLine = cartLines.find((line) => getCartLineCheckoutProductId(line.product, line.variant));
  const checkoutProductId = checkoutLine
    ? getCartLineCheckoutProductId(checkoutLine.product, checkoutLine.variant)
    : undefined;

  if (!checkoutLine || !checkoutProductId) {
    return '';
  }

  return `https://uebertangel.org/checkout/?add-to-cart=${checkoutProductId}&quantity=${checkoutLine.quantity}`;
};

function FloatingCart({
  cart,
  onUpdateQuantity,
  onRemove,
  open: externalOpen,
  setOpen: externalSetOpen,
}: {
  cart: CartItem[];
  onUpdateQuantity: (slug: string, quantity: number) => void;
  onRemove: (slug: string) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}) {
  const [localOpen, setLocalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : localOpen;
  const setOpen = externalSetOpen !== undefined ? externalSetOpen : setLocalOpen;

  const cartLines: Array<{ product: MerchProduct; variant?: MerchVariant; quantity: number }> = cart.flatMap((item) => {
    const product = merchProducts.find((entry) => entry.slug === item.slug);
    if (!product) return [];
    const variant = getProductVariant(product, item.variantId);
    const labelBits = [variant?.label, item.size, item.color].filter(Boolean);
    const cartVariant = labelBits.length
      ? { ...variant, id: variant?.id ?? 'selection', label: labelBits.join(' / '), size: item.size, color: item.color }
      : variant;
    return cartVariant ? [{ product, variant: cartVariant, quantity: item.quantity }] : [{ product, quantity: item.quantity }];
  });
  const itemCount = cartLines.reduce((total, line) => total + line.quantity, 0);
  const subtotal = cartLines.reduce((total, line) => total + getCartLinePrice(line.product, line.variant) * line.quantity, 0);
  const checkoutUrl = getCheckoutUrl(cartLines);

  return (
    <div className="fixed bottom-5 right-4 z-[95] flex w-[calc(100vw-2rem)] max-w-sm flex-col items-end gap-3 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            className="w-full overflow-hidden rounded-2xl border border-primary/15 bg-[#080807]/95 text-primary shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="flex items-center justify-between border-b border-primary/10 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary/50">Cart</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8 text-primary/70 transition-colors hover:text-primary"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-4">
              {cartLines.length === 0 ? (
                <p className="text-sm leading-6 text-primary/55">Your cart is empty.</p>
              ) : (
                <div className="space-y-3">
                  {cartLines.map(({ product, variant, quantity }) => (
                    <div key={getCartKey(product.slug, variant?.id)} className="rounded-xl bg-white/[0.055] p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-primary">{product.name}</p>
                          <p className="mt-1 text-xs text-primary/50">{getCartLinePriceLabel(product, variant)}</p>
                          {variant ? <p className="mt-1 text-[11px] text-primary/42">{variant.label}</p> : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(getCartKey(product.slug, variant?.id, variant?.size, variant?.color))}
                          className="text-primary/38 transition-colors hover:text-primary"
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-primary/12 bg-black/30">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(getCartKey(product.slug, variant?.id, variant?.size, variant?.color), quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center text-primary/62 transition-colors hover:text-primary"
                            aria-label={`Decrease ${product.name} quantity`}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-7 text-center text-sm text-primary">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(getCartKey(product.slug, variant?.id, variant?.size, variant?.color), quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center text-primary/62 transition-colors hover:text-primary"
                            aria-label={`Increase ${product.name} quantity`}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-primary">{formatUsd(getCartLinePrice(product, variant) * quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-primary/10 p-4 flex flex-col items-center gap-3">
              <div className="flex w-full items-center justify-between text-sm mb-1">
                <span className="text-primary/52">Subtotal</span>
                <span className="font-semibold text-primary">{formatUsd(subtotal)}</span>
              </div>
              {checkoutUrl ? (
                <a
                  href={checkoutUrl}
                  className="w-full rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
                >
                  Checkout
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-black opacity-45"
                >
                  Checkout Coming Soon
                </button>
              )}
              <a
                href="/shop"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', '/shop');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  setOpen(false);
                }}
                className="text-white hover:text-white/80 text-xs font-bold uppercase tracking-[0.2em] transition-colors py-2 text-center"
              >
                Keep Shopping
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductMedia({ product }: { product: MerchProduct }) {
  const Icon = product.icon;

  return (
    <div className={`flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br ${product.accent}`}>
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover ${product.imagePosition ?? 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
        />
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-9 w-9" strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}

function useStretchInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function MerchPage({
  cart,
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
}: {
  cart: CartItem[];
  onAddToCart: (slug: string, quantity?: number, variantId?: string, selection?: { size?: string; color?: string }) => void;
  onUpdateQuantity: (cartKey: string, quantity: number) => void;
  onRemoveFromCart: (cartKey: string) => void;
}) {
  const products = merchProducts;
  const heroVideos = [
    'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/6a1045a7c363506b9a9a3020.mp4',
    'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/6a1041affe2210f89e3c3a87.mp4',
    'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/6a1044d7a33d272edabd7f44.mp4',
    'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/6a104a1db656b3edc43f0d93.mp4',
  ];
  const [activeTab, setActiveTab] = useState<'Shiloh' | 'GoodNewsWorld Merch'>('Shiloh');
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroContent = useStretchInView<HTMLDivElement>(0.2);
  const bestSellers = useStretchInView<HTMLDivElement>(0.15);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % heroVideos.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [heroVideos.length, paused]);

  const updateScrollProgress = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    setScrollProgress(maxScroll > 0 ? carousel.scrollLeft / maxScroll : 0);
  };

  const handleCarouselWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const carousel = carouselRef.current;
    if (!carousel || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    carousel.scrollLeft += event.deltaY;
    updateScrollProgress();
  };

  return (
    <main
      className="min-h-screen bg-black text-white"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <HeroHeader pageType="shop" />
      <section className="relative flex min-h-screen flex-col overflow-hidden lg:flex-row">
        <div className="relative flex min-h-[60vh] w-full items-end overflow-hidden px-6 pb-12 pt-32 lg:min-h-0 lg:w-1/2 lg:px-10 lg:pb-16">
          <img
            src="https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/6a1049b7df1cb25b061ad6b0.jpg"
            alt="Shiloh shop visual"
            className="absolute inset-0 h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div
            ref={heroContent.ref}
            className={`relative z-10 max-w-xl transform transition-all duration-1000 ${
              heroContent.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h1 className="mb-6 font-serif text-5xl font-normal italic leading-[0.92] tracking-[-0.045em] text-primary drop-shadow-lg sm:text-6xl md:text-7xl lg:text-[clamp(4.5rem,7vw,8rem)]">
              Shiloh Shop 2026
            </h1>
            <p className="mb-10 max-w-md text-sm text-white/80 md:text-base">
              Official Shiloh Merchandise Coming Soon. Please check back later for apparel, ceremonial wear, and
              exclusive conference merchandise.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#shop"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary inline-flex rounded-full bg-white px-10 py-4 text-sm font-medium text-black transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/90"
              >
                Know More
              </a>
              <a
                href="/merch/shiloh-season-blue-logo-t-shirt"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', '/merch/shiloh-season-blue-logo-t-shirt');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex rounded-full border border-white/20 bg-white/10 px-10 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 shadow-md"
              >
                Get now
              </a>
            </div>
          </div>
        </div>
        <div className="relative min-h-[40vh] w-full overflow-hidden lg:min-h-0 lg:w-1/2">
          {heroVideos.map((video, index) => (
            <video
              key={video}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                activeSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
              src={video}
              autoPlay
              loop
              muted
              playsInline
              {...({ referrerPolicy: 'no-referrer' } as any)}
            />
          ))}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
            <div className="flex gap-2">
              {heroVideos.map((video, index) => (
                <button
                  key={video}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                  className={`glass-exclude h-2 w-2 rounded-full transition-all ${
                    activeSlide === index ? 'scale-125 bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-white"
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
            >
              {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </section>

      <section id="shop" className="bg-[#F8F6F2] py-16 text-black lg:py-20">
        <div
          ref={bestSellers.ref}
          className={`transform transition-all duration-700 ${
            bestSellers.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* ── Section Header ── */}
          <div className="mb-10 flex items-end justify-between px-5 sm:px-8 lg:px-12">
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.32em] text-black/40"
                style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
              >
                Official Collection
              </p>
              <h2
                className="mt-2 text-4xl tracking-tight text-black sm:text-5xl"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'normal', fontWeight: 400 }}
              >
                Shiloh 2026
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <p
                className="hidden text-[11px] text-black/35 sm:block"
                style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
              >
                {products.filter((p) => p.category === 'SHILOH 2026').length} items
              </p>
            </div>
          </div>

          {/* ── Product Grid / Carousel ── */}
          {/* Desktop: 4-column grid with no horizontal scroll */}
          {/* Mobile/Tablet: horizontal scroll carousel */}
          <div className="border-t border-black/[0.08] mb-0" />
          <div
            ref={carouselRef}
            onWheel={handleCarouselWheel}
            onScroll={updateScrollProgress}
            className="scrollbar-hide flex gap-6 overflow-x-auto px-5 sm:px-8 lg:px-12"
            style={{ touchAction: 'pan-x' }}
          >
            {products
              .filter((p) => p.category === 'SHILOH 2026')
              .map((product, index) => {
                // Assign a badge label based on index for visual variety
                const badges = ['PRE-ORDER', 'PRE-ORDER', 'PRE-ORDER', 'PRE-ORDER', 'PRE-ORDER'];
                const badge = badges[index] ?? 'NEW';

                return (
                  <a
                    key={product.slug}
                    href={`/merch/${product.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.pushState({}, '', `/merch/${product.slug}`);
                      window.dispatchEvent(new PopStateEvent('popstate'));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`group flex w-[70vw] shrink-0 flex-col bg-[#F8F6F2] sm:w-[46vw] md:w-[34vw] lg:w-[24vw] xl:w-[22vw] max-w-[380px] ${
                      bestSellers.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    } transition-all duration-500`}
                    style={{ transitionDelay: `${index * 70}ms` }}
                    aria-label={`View ${product.name}`}
                  >
                    {/* ── Card Image Area ── */}
                    <div className="relative overflow-hidden bg-[#EDEAE5]" style={{ aspectRatio: '4/5' }}>
                      {/* Badge */}
                      <span
                        className="absolute left-4 top-4 z-10 bg-white px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-black"
                        style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
                      >
                        {badge}
                      </span>

                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${product.accent}`}>
                          <product.icon className="h-16 w-16 text-white/70" strokeWidth={1} />
                        </div>
                      )}
                    </div>

                    {/* ── Card Info Below Image ── */}
                    <div className="px-4 pt-4 pb-8 lg:px-5 lg:pt-5">
                      {/* Name + Price on one line */}
                      <div className="flex items-baseline gap-2">
                        <h3
                          className="flex-1 text-[0.82rem] uppercase leading-snug tracking-[0.08em] text-black"
                          style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
                        >
                          {product.name.replace(/^Pre Order - /i, '')}
                        </h3>
                        <span
                          className="shrink-0 text-[0.82rem] uppercase tracking-[0.05em] text-black"
                          style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
                        >
                          {product.priceLabel}
                        </span>
                      </div>

                      {/* Subcategory / description line */}
                      <p
                        className="mt-1 text-[0.75rem] leading-snug text-black/45"
                        style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
                      >
                        {product.subcategory || 'Shiloh Season Collection'}
                      </p>
                    </div>
                  </a>
                );
              })}
          </div>

          {/* ── Scroll Progress Bar ── */}
          <div className="mt-8 px-5 sm:px-8 lg:px-12">
            <div className="h-px bg-black/10 overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-150"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProductPage({
  product,
  cart,
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
  onOpenSponsor,
}: {
  product?: MerchProduct;
  cart: CartItem[];
  onAddToCart: (slug: string, quantity?: number, variantId?: string, selection?: { size?: string; color?: string }) => void;
  onUpdateQuantity: (cartKey: string, quantity: number) => void;
  onRemoveFromCart: (cartKey: string) => void;
  onOpenSponsor?: () => void;
}) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(product?.variants?.[0]?.id ?? '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name ?? 'Default');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? 'M');
  const [openProductSections, setOpenProductSections] = useState<string[]>(['About']);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);
  const mobileGalleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      setSelectedQuantity(1);
      setSelectedVariantId(product.variants?.[0]?.id ?? '');
      setSelectedColor(product.colors?.[0]?.name ?? 'Default');
      setSelectedSize(product.sizes?.[0] ?? 'M');
      setActiveImageIndex(0);
      setIsAddedSuccess(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product || !product.variants || product.variants.length === 0) return;
    const variant = product.variants.find((v) => {
      const matchSize = !v.size || v.size.toLowerCase() === selectedSize.toLowerCase();
      const matchColor = !v.color || v.color.toLowerCase() === selectedColor.toLowerCase();
      return matchSize && matchColor;
    });
    if (variant) {
      setSelectedVariantId(variant.id);
    }
  }, [selectedSize, selectedColor, product]);

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-primary">
        <HeroHeader pageType="product" />
        <section className="px-4 pb-24 pt-36 sm:px-6 md:px-10">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.055] p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary/45">Merch</p>
            <h1 className="mt-4 font-serif text-5xl italic leading-none text-primary">Product Not Found</h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-primary/58">
              This item is not currently listed in the Shiloh Season shop.
            </p>
            <a href="/merch" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black">
              Back to Merch
            </a>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const selectedVariant = getProductVariant(product, selectedVariantId);
  const selectedCartKey = getCartKey(product.slug, selectedVariant?.id, selectedSize, selectedColor);
  const productCartItem = cart.find((item) => getCartKey(item.slug, item.variantId, item.size, item.color) === selectedCartKey);
  const productInCart = Boolean(productCartItem);
  const updateSelectedQuantity = (quantity: number) => setSelectedQuantity(Math.max(1, Math.min(quantity, 99)));
  const selectedPriceLabel = getCartLinePriceLabel(product, selectedVariant);
  const displayProductName = product.name;

  const colorOptions = product.colors && product.colors.length > 0
    ? product.colors
    : [{ name: 'Default', className: 'bg-primary' }];
  const sizeOptions = product.sizes && product.sizes.length > 0
    ? product.sizes
    : [];
  const images = (product.images && product.images.length > 0
    ? product.images
    : [product.image].filter(Boolean)) as string[];

  const scrollGallery = (direction: 'left' | 'right') => {
    const container = mobileGalleryRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleMobileGalleryScroll = () => {
    const container = mobileGalleryRef.current;
    if (!container) return;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    setActiveImageIndex(index);
  };

  const accordionSections = [
    {
      title: 'About',
      copy: product.description || 'A premium quality Shiloh Season merchandise item.',
    },
    {
      title: 'Product details',
      copy: 'Made with fine materials, double-needle stitching, side-seamed construct, and optimized branding application.',
    },
    {
      title: 'Size & Fit',
      copy: 'Fits true to size. Choose your regular size for standard wear or size up for an oversized style statement.',
    },
  ];

  const toggleProductSection = (title: string) => {
    setOpenProductSections((sections) =>
      sections.includes(title) ? sections.filter((section) => section !== title) : [...sections, title],
    );
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] pb-64 lg:pb-24">
      <HeroHeader pageType="product" />
      
      <section className="px-4 pb-20 pt-32 sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          {/* Breadcrumb / Navigation */}
          <div className="mb-12 flex items-center gap-4" style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.4)' }}>
            <a
              href="/merch"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/merch');
                window.dispatchEvent(new PopStateEvent('popstate'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-black transition-colors"
            >
              Shop
            </a>
            <span>/</span>
            <span style={{ color: '#1a1a1a' }}>{product.name}</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Gallery Column */}
            <div className="min-w-0 overflow-hidden space-y-4">
              {images.map((img, idx) => (
                <div key={idx} className="aspect-[4/5] w-full max-w-full overflow-hidden rounded-2xl bg-[#F0EBE4] shadow-sm" style={{ boxSizing: 'border-box' }}>
                  <img src={img} alt={product.name} className="h-full w-full max-w-full object-cover block" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>

            {/* Info Column */}
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <h1
                className="text-[3rem] leading-[0.95] tracking-[-0.03em] text-[#1a1a1a] sm:text-[3.6rem]"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'normal', fontWeight: 400 }}
              >
                {product.name}
              </h1>
              <p
                className="mt-4 text-base text-black/60"
                style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
              >
                {selectedPriceLabel}
              </p>
              {product.description && (
                <p
                  className="mt-5 max-w-sm text-[0.85rem] leading-[1.8] text-black/55"
                  style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800 }}
                >
                  {product.description}
                </p>
              )}


              {/* Accordion */}
              <div className="mt-8 border-t border-black/8">
                {accordionSections.map((section) => (
                  <div key={section.title} className="border-b border-black/8">
                    <button
                      type="button"
                      onClick={() => toggleProductSection(section.title)}
                      className="flex w-full items-center justify-between py-5 text-left"
                    >
                      <span
                        className="text-[10px] uppercase tracking-[0.24em] text-black"
                        style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
                      >
                        {section.title}
                      </span>
                      <Plus
                        className={`h-3.5 w-3.5 text-black/40 transition-transform duration-300 ${
                          openProductSections.includes(section.title) ? 'rotate-45' : ''
                        }`}
                      />
                    </button>
                    {openProductSections.includes(section.title) && (
                      <p
                        className="pb-5 text-[0.82rem] leading-[1.8] text-black/50"
                        style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800 }}
                      >
                        {section.copy}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Add to Bag ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[90] border-t border-black/[0.07] backdrop-blur-xl"
        style={{ background: 'rgba(253,251,247,0.96)' }}
      >
        <AnimatePresence mode="wait">
          {!isAddedSuccess ? (
            <motion.div
              key="selector"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {/* ─── MOBILE / TABLET (< lg): 3-row layout ─── */}
              <div className="lg:hidden px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)] space-y-2.5">

                {/* Row 1 — Colour Swatches */}
                {colorOptions.length > 0 && (
                  <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                    <span
                      className="shrink-0 text-[9px] uppercase tracking-[0.22em] text-black/40 whitespace-nowrap"
                      style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
                    >
                      {selectedColor}
                    </span>
                    <div className="flex gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setSelectedColor(color.name)}
                          className={`h-7 w-7 shrink-0 rounded-full border-2 transition-all ${
                            selectedColor === color.name
                              ? 'border-black shadow-sm scale-110'
                              : 'border-transparent'
                          }`}
                          style={{ background: color.className }}
                          aria-label={`Select colour ${color.name}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Row 2 — Size Swatches (pill buttons, overflow collapses to scroll) */}
                {sizeOptions.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span
                      className="shrink-0 text-[9px] uppercase tracking-[0.22em] text-black/40"
                      style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
                    >
                      Size
                    </span>
                    <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
                      {sizeOptions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`shrink-0 h-8 min-w-[2.6rem] px-2 rounded border text-[10px] uppercase tracking-wider transition ${
                            selectedSize === s
                              ? 'bg-black border-black text-white'
                              : 'bg-white/60 border-black/15 text-black hover:border-black'
                          }`}
                          style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Row 3 — Qty (left) + Add to Bag (right) */}
                <div className="flex items-center gap-3">
                  {/* Qty stepper */}
                  <div className="flex h-11 w-28 shrink-0 items-center justify-between border border-black/10 rounded-md bg-white/60 overflow-hidden px-1">
                    <button
                      type="button"
                      onClick={() => updateSelectedQuantity(selectedQuantity - 1)}
                      className="flex h-full w-9 items-center justify-center text-black/35 hover:text-black transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span
                      className="text-xs text-black"
                      style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
                    >
                      {selectedQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateSelectedQuantity(selectedQuantity + 1)}
                      className="flex h-full w-9 items-center justify-center text-black/35 hover:text-black transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Add to Bag CTA */}
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(product.slug, selectedQuantity, selectedVariantId, { size: selectedSize, color: selectedColor });
                      setIsAddedSuccess(true);
                    }}
                    className="flex-1 h-11 bg-[#111] text-white rounded-md flex items-center justify-center gap-2 transition hover:bg-black active:scale-[0.98]"
                    style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  >
                    Add to Bag
                    <span className="opacity-60" style={{ fontWeight: 700 }}>— {selectedPriceLabel}</span>
                  </button>
                </div>
              </div>

              {/* ─── DESKTOP (lg+): Full single-row with swatches ─── */}
              <div className="hidden lg:flex items-center justify-between gap-6 px-10 xl:px-20 py-4 pb-[calc(env(safe-area-inset-bottom)+8px)] max-w-[1400px] mx-auto">

                {/* Left: product thumbnail + name/price */}
                <div className="flex items-center gap-4 shrink-0 min-w-0 max-w-[240px]">
                  <img
                    src={images[0] || ''}
                    alt={product.name}
                    className="h-12 w-12 rounded-xl object-cover bg-[#ede8df] border border-black/5 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <p
                      className="text-[1rem] leading-snug text-black line-clamp-1"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'normal', fontWeight: 400 }}
                    >
                      {displayProductName}
                    </p>
                    <p
                      className="text-[10px] text-black/45 mt-0.5"
                      style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
                    >
                      {selectedPriceLabel}
                    </p>
                  </div>
                </div>

                {/* Centre: Colour swatches + Size pills */}
                <div className="flex flex-1 items-center justify-center gap-8 min-w-0 overflow-hidden">

                  {/* Colour swatches */}
                  {colorOptions.length > 0 && (
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className="text-[9px] uppercase tracking-[0.22em] text-black/40 whitespace-nowrap"
                        style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
                      >
                        {selectedColor}
                      </span>
                      <div className="flex gap-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color.name}
                            type="button"
                            onClick={() => setSelectedColor(color.name)}
                            className={`h-7 w-7 shrink-0 rounded-full border-2 transition-all ${
                              selectedColor === color.name
                                ? 'border-black shadow-sm scale-110'
                                : 'border-transparent hover:border-black/30'
                            }`}
                            style={{ background: color.className }}
                            aria-label={`Select colour ${color.name}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size pills */}
                  {sizeOptions.length > 0 && (
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className="text-[9px] uppercase tracking-[0.22em] text-black/40 whitespace-nowrap"
                        style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
                      >
                        Size
                      </span>
                      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide max-w-[320px]">
                        {sizeOptions.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelectedSize(s)}
                            className={`shrink-0 h-8 min-w-[2.4rem] px-2 rounded border text-[10px] uppercase tracking-wider transition ${
                              selectedSize === s
                                ? 'bg-black border-black text-white'
                                : 'bg-white/60 border-black/15 text-black hover:border-black'
                            }`}
                            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Qty + CTA */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex h-11 items-center border border-black/10 rounded-md bg-white/60 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateSelectedQuantity(selectedQuantity - 1)}
                      className="flex h-full w-10 items-center justify-center text-black/35 hover:text-black transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span
                      className="min-w-[1.75rem] text-center text-xs text-black"
                      style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900 }}
                    >
                      {selectedQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateSelectedQuantity(selectedQuantity + 1)}
                      className="flex h-full w-10 items-center justify-center text-black/35 hover:text-black transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(product.slug, selectedQuantity, selectedVariantId, { size: selectedSize, color: selectedColor });
                      setIsAddedSuccess(true);
                    }}
                    className="h-11 px-10 bg-[#111] text-white rounded-md flex items-center justify-center transition hover:bg-black active:scale-[0.98] whitespace-nowrap"
                    style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase' }}
                  >
                    Add to Bag — {selectedPriceLabel}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="px-4 py-4 pb-[calc(env(safe-area-inset-bottom)+12px)] lg:px-20 lg:py-5 max-w-[1400px] mx-auto"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <span
                    className="text-[1rem] text-black"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'normal' }}
                  >
                    Added to your bag
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddedSuccess(false)}
                    className="flex-1 sm:flex-none h-11 px-6 border border-black/10 bg-transparent text-black rounded-md transition hover:border-black/25"
                    style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  >
                    Keep Shopping
                  </button>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent('open-cart'))}
                    className="flex-1 sm:flex-none h-11 px-6 bg-[#111] text-white rounded-md transition hover:bg-black"
                    style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  >
                    View Bag
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
                    <img src={product.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
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
      className={`flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/70 ${align === 'center' ? 'justify-center' : 'justify-start'
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
    ['4 September, 4:00 PM CAT', 'Shiloh Conference', 'Fort Moriah City'],
    ['5 September, 4:00 PM CAT', 'Shiloh Conference', 'Fort Moriah City'],
    ['6 September, 11 AM CAT', 'Sunday Service', 'Harare Hippodrome'],
    ['TBC', 'Baptism', 'Fort Moriah City'],
    ['6 Sep 7:00 PM CAT', "The Ra'ah Prophet Uebert Angel Birthday Celebration", 'Harare Hippodrome'],
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white antialiased" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <HeroHeader sticky />
      <section className="px-4 pb-8 pt-28 sm:px-6 md:px-10 md:pb-10 md:pt-32 lg:px-14">
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

          <article className="relative overflow-hidden rounded-2xl bg-black">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={scheduleBackgroundVideo}
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/80" />
            <div className="relative z-10 flex min-h-[560px] flex-col p-5 md:p-6">
              <ScheduleLabel>Shiloh Season 2026</ScheduleLabel>
              <div className="mt-auto space-y-4 rounded-2xl bg-black/35 p-4 backdrop-blur-sm sm:p-5">
                {timeline.map(([date, event, location]) => (
                  <div
                    key={`${date}-${event}`}
                    className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 border-b border-white/10 pb-4 text-sm text-white/85 last:border-b-0 last:pb-0 sm:grid-cols-[9.5rem_auto_1fr_auto] sm:items-center"
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
          <p className="max-w-4xl text-xs leading-relaxed text-white/45 sm:text-sm">
            * Programme details, venues, and timings are subject to adjustment throughout Shiloh Season 26. Guests are
            encouraged to confirm updated schedules with their local event team or ministry leaders during the conference
            period.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function PassesPage() {
  const [frameHeight, setFrameHeight] = useState(1200);
  const frameRef = useRef<HTMLIFrameElement>(null);

  const syncFrameHeight = () => {
    const frame = frameRef.current;
    const documentElement = frame?.contentDocument?.documentElement;
    const body = frame?.contentDocument?.body;

    if (!documentElement || !body) {
      return;
    }

    setFrameHeight(Math.max(documentElement.scrollHeight, body.scrollHeight));
  };

  const handleFrameLoad = () => {
    syncFrameHeight();

    const frameDocument = frameRef.current?.contentDocument;
    if (!frameDocument?.body) {
      return;
    }

    const observer = new ResizeObserver(syncFrameHeight);
    observer.observe(frameDocument.body);
    frameDocument.defaultView?.addEventListener('resize', syncFrameHeight);
  };

  return (
    <main className="min-h-screen bg-black pt-44 md:pt-28">
      <HeroHeader sticky />
      <iframe
        ref={frameRef}
        src="/component2.html?v=dark-passes-vip-content"
        title="Shiloh Passes"
        scrolling="no"
        onLoad={handleFrameLoad}
        style={{ height: `${frameHeight}px` }}
        className="block w-full border-0"
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
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = window.localStorage.getItem('shiloh-merch-cart');
      return stored ? (JSON.parse(stored) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [pathname, setPathname] = useState(window.location.pathname);
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/';
  const isJourneyPage = normalizedPathname === '/journey';
  const isVipPage = normalizedPathname === '/vip';
  const isMerchPage = normalizedPathname === '/merch' || normalizedPathname === '/shop';
  const productSlug = normalizedPathname.startsWith('/merch/')
    ? normalizedPathname.replace('/merch/', '').split('/')[0]
    : normalizedPathname.startsWith('/shop/')
      ? normalizedPathname.replace('/shop/', '').split('/')[0]
      : '';
  const merchProduct = productSlug ? merchProducts.find((product) => product.slug === productSlug) : undefined;
  const isProductPage = Boolean(productSlug);
  const isPartnersPage = normalizedPathname === '/partners';
  const isSchedulePage = normalizedPathname === '/schedule';
  const isPassesPage = normalizedPathname === '/passes';
  const isContactPage = normalizedPathname === '/contact';

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleOpenCart = () => setCartOpen(true);
    window.addEventListener('open-cart', handleOpenCart);
    return () => window.removeEventListener('open-cart', handleOpenCart);
  }, []);

  useEffect(() => {
    const updatePathname = () => setPathname(window.location.pathname);

    window.addEventListener('popstate', updatePathname);
    return () => window.removeEventListener('popstate', updatePathname);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('shiloh-merch-cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
  }, [cart]);

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

  const addToCart = (slug: string, quantity = 1, variantId?: string, selection?: { size?: string; color?: string }) => {
    const normalizedQuantity = Math.max(1, Math.min(quantity, 99));
    const cartKey = getCartKey(slug, variantId, selection?.size, selection?.color);

    setCart((items) => {
      const existing = items.find((item) => getCartKey(item.slug, item.variantId, item.size, item.color) === cartKey);
      if (existing) {
        return items.map((item) =>
          getCartKey(item.slug, item.variantId, item.size, item.color) === cartKey
            ? { ...item, quantity: Math.min(item.quantity + normalizedQuantity, 99) }
            : item,
        );
      }
      return [...items, { slug, variantId, size: selection?.size, color: selection?.color, quantity: normalizedQuantity }];
    });
  };

  const updateCartQuantity = (cartKey: string, quantity: number) => {
    setCart((items) => {
      if (quantity <= 0) {
        return items.filter((item) => getCartKey(item.slug, item.variantId, item.size, item.color) !== cartKey);
      }
      return items.map((item) => (getCartKey(item.slug, item.variantId, item.size, item.color) === cartKey ? { ...item, quantity } : item));
    });
  };

  const removeFromCart = (cartKey: string) => {
    setCart((items) => items.filter((item) => getCartKey(item.slug, item.variantId, item.size, item.color) !== cartKey));
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const actionable = target?.closest('a, button');
      const label = actionable?.textContent?.toLowerCase() ?? '';
      if (actionable?.getAttribute('data-direct-registration') === 'true') {
        return;
      }
      const requestedRegistration = actionable?.getAttribute('data-registration-type');
      if (requestedRegistration || label.includes('register') || label.includes('let us know')) {
        event.preventDefault();
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
      ) : isProductPage ? (
        <ProductPage
          product={merchProduct}
          cart={cart}
          onAddToCart={addToCart}
          onUpdateQuantity={updateCartQuantity}
          onRemoveFromCart={removeFromCart}
          onOpenSponsor={() => setSponsorOpen(true)}
        />
      ) : isMerchPage ? (
        <MerchPage
          cart={cart}
          onAddToCart={addToCart}
          onUpdateQuantity={updateCartQuantity}
          onRemoveFromCart={removeFromCart}
        />
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
      <FloatingSponsorButton
        onClick={() => setSponsorOpen(true)}
        visible={!isLoading && sponsorVisible && !registrationOpen && !sponsorOpen && !sowOpen && !isProductPage && (!isMobile || !isMerchPage)}
      />
      <RegistrationModal open={registrationOpen} onClose={() => setRegistrationOpen(false)} type={registrationType} />
      <SponsorModal open={sponsorOpen} onClose={() => setSponsorOpen(false)} />
      <SowModal open={sowOpen} onClose={() => setSowOpen(false)} />
      <CelebrationBurst active={celebrating} />
      <FloatingCart
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        open={cartOpen}
        setOpen={setCartOpen}
      />
    </>
  );
}
