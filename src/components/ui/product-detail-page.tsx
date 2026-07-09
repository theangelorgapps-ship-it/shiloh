import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, Share2, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface ProductTag {
  label: string;
  icon?: React.ElementType;
}

interface Product {
  name: string;
  price: number;
  shippingCost: number;
  currency: string;
  images: string[];
  description: string;
  tags: ProductTag[];
  priceLabel?: string;
  imageFit?: 'cover' | 'contain';
}

const premiumEase = [0.4, 0, 0.2, 1] as const;

export interface ProductDetailPageProps {
  product: Product;
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
  details?: React.ReactNode;
  onNavigate?: (href: string) => void;
  onShare?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  breadcrumbs,
  actions,
  details,
  onNavigate,
  onShare,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [galleryOpen, setGalleryOpen] = React.useState(false);
  const image = product.images[currentImageIndex] ?? product.images[0];
  const priceLabel = product.priceLabel ?? `${product.currency}${product.price}`;
  const hasMultipleImages = product.images.length > 1;

  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [product.images[0], product.name]);

  React.useEffect(() => {
    if (!galleryOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setGalleryOpen(false);
      }
      if (event.key === 'ArrowRight' && hasMultipleImages) {
        setCurrentImageIndex((index) => (index + 1) % product.images.length);
      }
      if (event.key === 'ArrowLeft' && hasMultipleImages) {
        setCurrentImageIndex((index) => (index - 1 + product.images.length) % product.images.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [galleryOpen, hasMultipleImages, product.images.length]);

  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(href);
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((index) => (index - 1 + product.images.length) % product.images.length);
  };

  const showNextImage = () => {
    setCurrentImageIndex((index) => (index + 1) % product.images.length);
  };

  return (
    <div className="shadcn-product-page w-full bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center overflow-x-auto text-sm text-muted-foreground">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={`${item.href}-${item.label}`}>
              <a href={item.href} onClick={(event) => handleNavigate(event, item.href)} className="shrink-0 hover:text-primary">
                {item.label}
              </a>
              {index < breadcrumbs.length - 1 && <ChevronRight className="mx-1 h-4 w-4 shrink-0" />}
            </React.Fragment>
          ))}
        </nav>

        <div className="mb-6 flex items-center justify-end gap-2">
          <Button type="button" variant="ghost" size="icon" onClick={onShare}>
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
        </div>

        <main className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.99 }}
                transition={{ duration: 0.32, ease: premiumEase }}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-muted"
              >
                <img
                  src={image}
                  alt={`${product.name} image ${currentImageIndex + 1}`}
                  className={cn('h-full w-full', product.imageFit === 'contain' ? 'object-contain' : 'object-cover')}
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {product.images.map((thumbnail, index) => (
                  <button
                    key={`${thumbnail}-${index}`}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      'h-2.5 w-2.5 rounded-full transition-colors',
                      currentImageIndex === index ? 'bg-primary' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50',
                    )}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => setGalleryOpen(true)}>
                <Camera className="h-4 w-4" /> View Gallery
              </Button>
            </div>
          </div>

          <div className="flex min-w-0 flex-col">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{product.name}</h1>
            <div className="mt-3 flex flex-wrap items-end gap-x-2 gap-y-1">
              <span className="text-4xl font-bold">{priceLabel}</span>
              {product.shippingCost > 0 && (
                <span className="text-sm text-muted-foreground">
                  + {product.currency}
                  {product.shippingCost.toFixed(2)} shipping
                </span>
              )}
            </div>

            {actions && <div className="my-6">{actions}</div>}

            <div className="mb-6 flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <Badge key={`${tag.label}-${index}`} variant="secondary" className="gap-2 px-3 py-1 text-sm font-normal">
                  {tag.icon && <tag.icon className="h-4 w-4" />}
                  {tag.label}
                </Badge>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {details && <div className="mt-8">{details}</div>}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            className="fixed inset-0 z-[120] flex min-h-dvh items-center justify-center bg-zinc-950/95 px-4 py-5 text-white"
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} gallery`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: premiumEase }}
          >
            <button
              type="button"
              className="absolute inset-0 cursor-zoom-out"
              onClick={() => setGalleryOpen(false)}
              aria-label="Close gallery"
            />

            <motion.div
              className="relative z-10 flex h-full w-full max-w-6xl flex-col"
              initial={{ y: 24, scale: 0.985 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 14, scale: 0.99 }}
              transition={{ duration: 0.34, ease: premiumEase }}
            >
              <div className="flex items-center justify-between gap-3 pb-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{product.name}</p>
                  <p className="mt-1 text-xs text-white/55">
                    Image {currentImageIndex + 1} of {product.images.length}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setGalleryOpen(false)}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close gallery</span>
                </Button>
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg bg-white/5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={image}
                    src={image}
                    alt={`${product.name} gallery image ${currentImageIndex + 1}`}
                    className="h-full w-full object-contain"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.01 }}
                    transition={{ duration: 0.24, ease: premiumEase }}
                  />
                </AnimatePresence>

                {hasMultipleImages && (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-zinc-950/55 text-white hover:bg-zinc-950/75 hover:text-white"
                      onClick={showPreviousImage}
                    >
                      <ChevronLeft className="h-6 w-6" />
                      <span className="sr-only">Previous image</span>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-zinc-950/55 text-white hover:bg-zinc-950/75 hover:text-white"
                      onClick={showNextImage}
                    >
                      <ChevronRight className="h-6 w-6" />
                      <span className="sr-only">Next image</span>
                    </Button>
                  </>
                )}
              </div>

              {hasMultipleImages && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((thumbnail, index) => (
                    <button
                      key={`${thumbnail}-gallery-${index}`}
                      type="button"
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        'h-16 w-16 shrink-0 overflow-hidden rounded-md border transition sm:h-20 sm:w-20',
                        currentImageIndex === index
                          ? 'scale-[1.03] border-white'
                          : 'border-white/20 opacity-65 hover:scale-[1.03] hover:opacity-100',
                      )}
                      aria-label={`View gallery image ${index + 1}`}
                    >
                      <img src={thumbnail} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
