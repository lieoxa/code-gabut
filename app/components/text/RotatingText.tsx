'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Transition, VariantLabels, TargetAndTransition } from 'motion/react';
import './RotatingText.css';

// Fungsi helper untuk gabung class names
function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(' ');
}

// ✅ Tipe untuk semua props yang bisa kamu atur dari luar
export interface RotatingTextProps {
  texts: string[];                                          // array teks yang diputar
  style?: React.CSSProperties;                              // inline style untuk root span
  transition?: Transition;                                  // animasi spring/tween
  initial?: VariantLabels | TargetAndTransition; // state awal tiap huruf
  animate?: VariantLabels | TargetAndTransition; // state saat tampil
  exit?: VariantLabels | TargetAndTransition;    // state saat hilang
  animatePresenceMode?: 'wait' | 'popLayout' | 'sync';
  animatePresenceInitial?: boolean;
  rotationInterval?: number;                                // jeda antar teks (ms)
  staggerDuration?: number;                                 // delay antar huruf (detik)
  staggerFrom?: 'first' | 'last' | 'center' | number | 'random';
  loop?: boolean;                                           // ulangi terus?
  auto?: boolean;                                           // otomatis putar?
  splitBy?: 'characters' | 'words' | 'lines' | string;     // cara memecah teks
  onNext?: (index: number) => void;
  mainClassName?: string;                                   // class untuk box utama
  splitLevelClassName?: string;                             // class untuk tiap kata
  elementLevelClassName?: string;                           // class untuk tiap huruf
}

// ✅ Ref API — bisa kontrol dari luar pakai ref
export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>((props, ref) => {
  const {
    texts,
    transition = { type: 'spring', damping: 25, stiffness: 300 },
    initial = { y: '100%', opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: '-120%', opacity: 0 },
    animatePresenceMode = 'wait',
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0.025,
    staggerFrom = 'first',
    loop = true,
    auto = true,
    splitBy = 'characters',
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const splitIntoCharacters = (text: string) => {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), (s) => s.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === 'characters') {
      const words = currentText.split(' ');
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    if (splitBy === 'words') {
      return currentText.split(' ').map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    if (splitBy === 'lines') {
      return currentText.split('\n').map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }
    return [{ characters: splitIntoCharacters(currentText), needsSpace: false }];
  }, [currentTextIndex, splitBy, texts]);

  const handleIndexChange = useCallback(
    (newIndex: number) => {
      setCurrentTextIndex(newIndex);
      onNext?.(newIndex);
    },
    [onNext]
  );

  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop ? 0 : currentTextIndex
        : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
  }, [currentTextIndex, loop, texts.length, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0
        ? loop ? texts.length - 1 : currentTextIndex
        : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
  }, [currentTextIndex, loop, texts.length, handleIndexChange]);

  const jumpTo = useCallback(
    (index: number) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) handleIndexChange(validIndex);
    },
    [currentTextIndex, texts.length, handleIndexChange]
  );

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) handleIndexChange(0);
  }, [currentTextIndex, handleIndexChange]);

  const getStaggerDelay = useCallback(
    (index: number, total: number) => {
      if (staggerFrom === 'first') return index * staggerDuration;
      if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
      if (staggerFrom === 'center') {
        const center = (total - 1) / 2;
        return Math.abs(index - center) * staggerDuration;
      }
      if (staggerFrom === 'random') return Math.random() * total * staggerDuration;
      if (typeof staggerFrom === 'number') return Math.abs(index - staggerFrom) * staggerDuration;
      return 0;
    },
    [staggerDuration, staggerFrom]
  );

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
    next, previous, jumpTo, reset,
  ]);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(next, rotationInterval);
    return () => clearInterval(id);
  }, [next, rotationInterval, auto]);

  return (
    <motion.span
      className={cn('text-rotate', mainClassName)}
      {...rest}
      layout
      transition={transition}
    >
      <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span
          key={currentTextIndex}
          className={cn(splitBy === 'lines' ? 'text-rotate-lines' : 'text-rotate')}
          layout
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, array) => {
            const prevCharsCount = array
              .slice(0, wordIndex)
              .reduce((sum, w) => sum + w.characters.length, 0);

            return (
              <span key={wordIndex} className={cn('text-rotate-word', splitLevelClassName)}>
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(
                        prevCharsCount + charIndex,
                        array.reduce((sum, w) => sum + w.characters.length, 0)
                      ),
                    }}
                    className={cn('inline-block', elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingText.displayName = 'RotatingText';

export default RotatingText;
