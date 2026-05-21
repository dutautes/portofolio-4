import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete,
  isReady = true
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  // Kita wajib nunggu font selesai di-load browser dulu. Kalo ngga, kalkulasi lebar huruf dari GSAP bisa meleset dan bikin layout berantakan!
  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  // useGSAP itu hook aman bawaan GreenSock khusus buat React
  useGSAP(
    () => {
      if (!isReady || !ref.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;
      
      const el = ref.current;

      // Konversi rootMargin dan threshold jadi format pemicu (start-point) ScrollTrigger
      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets;
      // Nentuin target elemen mana yang mau dipecah: per huruf (chars), per kata (words), atau per baris (lines)
      const assignTargets = self => {
        if (splitType.includes('chars') && self.chars.length) targets = self.chars;
        if (!targets && splitType.includes('words') && self.words.length) targets = self.words;
        if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines;
        if (!targets) targets = self.chars || self.words || self.lines;
      };

      // Bikin instance SplitText dari GSAP buat motong string teks di DOM
      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: self => {
          assignTargets(self);
          // Jalankan animasi transisi dari posisi 'from' ke 'to'
          return gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000, // Stagger ngasih jeda waktu animasi antar huruf/kata biar berurutan
              scrollTrigger: {
                trigger: el,
                start,
                once: true, // Cukup sekali jalan aja pas di-scroll
                fastScrollEnd: true,
                anticipatePin: 0.4
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();
              },
              willChange: 'transform, opacity',
              force3D: true // Pake GPU akselerasi biar lancar
            }
          );
        }
      });

      // Cleanup function: matiin ScrollTrigger dan balikin teks utuh lagi pas komponen dibongkar (unmount)
      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch (_) {}
      };
    },
    {
      dependencies: [
        isReady,
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded
      ],
      scope: ref
    }
  );

  const style = {
    textAlign,
    wordWrap: 'break-word',
    willChange: 'transform, opacity'
  };
  const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;
  const Tag = tag || 'p';

  return (
    <Tag ref={ref} style={style} className={classes}>
      {text}
    </Tag>
  );
};

export default SplitText;
