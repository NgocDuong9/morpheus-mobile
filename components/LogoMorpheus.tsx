import { useEffect } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';

const AnimatedG = Animated.createAnimatedComponent(G);

interface MorpheusIconProps {
  loop?: boolean;
  loopDelay?: number;
  width?: number;
  height?: number;
}

interface LetterDef {
  d: string;
  cx: number;
  cy: number;
}

const STAGGER_MS = 50;
const RISE_MS = 400;
const FALL_MS = 600;
const ROTATE_MS = 1000;
const RISE_AMOUNT = -10;
const START_ROTATION = -360;
const GRADIENT_ID = 'morpheus-logo-gradient';
const BASE_W = 255;
const BASE_H = 27;
const VBOX_PAD = 24;
const VBOX_W = BASE_W + VBOX_PAD * 2;
const VBOX_H = BASE_H + VBOX_PAD * 2;

const LETTERS: LetterDef[] = [
  { cx: 18.02, cy: 13.21, d: 'M0 25.8926L0 0.527344H10.4414L17.9648 16.4531H18.0879L25.5938 0.527344H36.0352V25.8926H28.0898V11.0566H24.873L30.4277 5.36133L20.8301 25.8926H15.2051L5.60742 5.36133L11.1621 11.0566H7.96289V25.8926H0Z' },
  { cx: 59.75, cy: 13.20, d: 'M59.7438 26.4023C56.4274 26.4023 53.5387 25.8691 51.0778 24.8027C48.6286 23.7246 46.736 22.2012 45.4001 20.2324C44.0641 18.252 43.3962 15.9141 43.3962 13.2188V13.1836C43.3962 10.4883 44.0641 8.15625 45.4001 6.1875C46.7477 4.20703 48.6462 2.68359 51.0954 1.61719C53.5446 0.539062 56.4274 0 59.7438 0C63.0602 0 65.943 0.539062 68.3923 1.61719C70.8415 2.68359 72.7399 4.20703 74.0876 6.1875C75.4352 8.15625 76.1091 10.4883 76.1091 13.1836V13.2188C76.1091 15.9141 75.4352 18.252 74.0876 20.2324C72.7399 22.2012 70.8415 23.7246 68.3923 24.8027C65.9548 25.8691 63.072 26.4023 59.7438 26.4023ZM59.7438 19.7754C61.2555 19.7754 62.5622 19.5117 63.6637 18.9844C64.7653 18.457 65.6149 17.7012 66.2126 16.7168C66.822 15.7324 67.1266 14.5664 67.1266 13.2188V13.1836C67.1266 11.8359 66.822 10.6758 66.2126 9.70312C65.6149 8.71875 64.7595 7.96289 63.6462 7.43555C62.5446 6.9082 61.2438 6.64453 59.7438 6.64453C58.2321 6.64453 56.9255 6.9082 55.8239 7.43555C54.7223 7.96289 53.8669 8.71875 53.2575 9.70312C52.6598 10.6758 52.361 11.8359 52.361 13.1836V13.2188C52.361 14.5664 52.6598 15.7324 53.2575 16.7168C53.8669 17.7012 54.7223 18.457 55.8239 18.9844C56.9255 19.5117 58.2321 19.7754 59.7438 19.7754Z' },
  { cx: 97.89, cy: 13.21, d: 'M83.4525 25.8926V0.527344H100.011C102.507 0.527344 104.587 0.861328 106.251 1.5293C107.927 2.18555 109.181 3.15234 110.013 4.42969C110.857 5.69531 111.279 7.23047 111.279 9.03516V9.07031C111.279 10.8633 110.827 12.4043 109.925 13.6934C109.035 14.9824 107.751 15.9258 106.076 16.5234L112.333 25.8926H102.472L97.515 17.9824C97.4564 17.9824 97.392 17.9824 97.3216 17.9824C97.2513 17.9824 97.1869 17.9824 97.1283 17.9824H92.2767V25.8926H83.4525ZM92.2767 12.3574H99.1322C100.163 12.3574 100.972 12.0996 101.558 11.584C102.156 11.0684 102.454 10.3594 102.454 9.45703V9.42188C102.454 8.54297 102.156 7.8457 101.558 7.33008C100.96 6.80273 100.152 6.53906 99.1322 6.53906H92.2767V12.3574Z' },
  { cx: 134.38, cy: 13.21, d: 'M119.062 25.8926V0.527344H127.886V9.84375H140.894V0.527344H149.7V25.8926H140.894V16.3652H127.886V25.8926H119.062Z' },
  { cx: 169.84, cy: 13.21, d: 'M157.729 25.8926V0.527344H181.952V6.69727H166.553V10.3711H180.862V15.9082H166.553V19.7227H181.952V25.8926H157.729Z' },
  { cx: 204.25, cy: 13.44, d: 'M204.237 26.3496C201.366 26.3496 198.852 25.9043 196.696 25.0137C194.539 24.1113 192.858 22.7812 191.651 21.0234C190.455 19.2656 189.858 17.0801 189.858 14.4668V0.527344H198.682V14.291C198.682 15.4746 198.887 16.4707 199.297 17.2793C199.719 18.0762 200.34 18.6797 201.161 19.0898C201.993 19.4883 203.024 19.6875 204.254 19.6875C205.473 19.6875 206.493 19.4883 207.313 19.0898C208.145 18.6797 208.766 18.0762 209.176 17.2793C209.598 16.4707 209.809 15.4746 209.809 14.291V0.527344H218.633V14.4668C218.633 17.0684 218.03 19.2539 216.823 21.0234C215.627 22.7812 213.952 24.1113 211.795 25.0137C209.639 25.9043 207.12 26.3496 204.237 26.3496Z' },
  { cx: 240.33, cy: 13.21, d: 'M240.848 26.4199C237.883 26.4199 235.334 26.1035 233.201 25.4707C231.08 24.8379 229.399 23.9121 228.156 22.6934C226.926 21.4629 226.182 19.957 225.924 18.1758L225.889 17.9297H234.309L234.344 18.0527C234.473 18.5684 234.813 19.0078 235.363 19.3711C235.914 19.7344 236.658 20.0098 237.596 20.1973C238.533 20.3848 239.652 20.4785 240.953 20.4785C242.008 20.4785 242.91 20.3906 243.66 20.2148C244.41 20.0273 244.99 19.7695 245.4 19.4414C245.811 19.1133 246.016 18.7266 246.016 18.2812V18.2637C246.016 17.7012 245.764 17.291 245.26 17.0332C244.768 16.7637 243.889 16.5586 242.623 16.418L236.154 15.9609C232.932 15.668 230.512 14.9062 228.895 13.6758C227.289 12.4336 226.486 10.7109 226.486 8.50781V8.47266C226.486 6.70312 227.025 5.18555 228.104 3.91992C229.182 2.6543 230.729 1.6875 232.744 1.01953C234.76 0.339844 237.162 0 239.951 0C242.752 0 245.154 0.310547 247.158 0.931641C249.174 1.55273 250.762 2.45508 251.922 3.63867C253.082 4.82227 253.791 6.25781 254.049 7.94531L254.102 8.29688H245.682L245.647 8.15625C245.529 7.66406 245.242 7.25977 244.785 6.94336C244.328 6.61523 243.701 6.36914 242.904 6.20508C242.119 6.0293 241.176 5.94141 240.074 5.94141C238.996 5.94141 238.094 6.02344 237.367 6.1875C236.652 6.33984 236.113 6.56836 235.75 6.87305C235.399 7.16602 235.223 7.51758 235.223 7.92773V7.94531C235.223 8.48438 235.492 8.89453 236.031 9.17578C236.57 9.44531 237.473 9.64453 238.738 9.77344L245.348 10.248C247.457 10.4473 249.209 10.8457 250.604 11.4434C251.998 12.0293 253.041 12.832 253.732 13.8516C254.424 14.8711 254.77 16.1191 254.77 17.5957V17.6133C254.77 19.4414 254.219 21.0176 253.117 22.3418C252.016 23.6543 250.422 24.6621 248.336 25.3652C246.262 26.0684 243.766 26.4199 240.848 26.4199Z' },
];

export function MorpheusIcon({
  loop = true,
  loopDelay = 2000,
  width = BASE_W,
  height = BASE_H,
}: MorpheusIconProps) {
  const renderedW = (width / BASE_W) * VBOX_W;
  const renderedH = (height / BASE_H) * VBOX_H;
  return (
    <Svg
      width={renderedW}
      height={renderedH}
      viewBox={`${-VBOX_PAD} ${-VBOX_PAD} ${VBOX_W} ${VBOX_H}`}
      fill="none"
    >
      <Defs>
        <LinearGradient
          id={GRADIENT_ID}
          x1="4.56657"
          y1="-1.35742"
          x2="149.288"
          y2="64.0451"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0} stopColor="white" />
          <Stop offset={1} stopColor="#999999" />
        </LinearGradient>
      </Defs>
      {LETTERS.map((letter, i) => (
        <AnimatedLetter
          key={i}
          letter={letter}
          index={i}
          loop={loop}
          loopDelay={loopDelay}
        />
      ))}
    </Svg>
  );
}

interface AnimatedLetterProps {
  letter: LetterDef;
  index: number;
  loop: boolean;
  loopDelay: number;
}

function AnimatedLetter({ letter, index, loop, loopDelay }: AnimatedLetterProps) {
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(START_ROTATION);

  const animatedProps = useAnimatedProps(() => ({
    transform: [
      { translateX: letter.cx },
      { translateY: letter.cy + translateY.value },
      { rotate: `${rotation.value}deg` },
      { translateX: -letter.cx },
      { translateY: -letter.cy },
    ],
  }));

  useEffect(() => {
    const head = index * STAGGER_MS;
    const tail = (LETTERS.length - 1 - index) * STAGGER_MS;
    const pause = tail + loopDelay;

    const riseFall = withSequence(
      withDelay(
        head,
        withTiming(RISE_AMOUNT, { duration: RISE_MS, easing: Easing.out(Easing.exp) }),
      ),
      withTiming(0, { duration: FALL_MS, easing: Easing.bounce }),
    );
    const spin = withDelay(
      head,
      withTiming(0, { duration: ROTATE_MS, easing: Easing.inOut(Easing.circle) }),
    );

    if (loop) {
      translateY.value = withRepeat(
        withSequence(riseFall, withDelay(pause, withTiming(0, { duration: 1 }))),
        -1,
        false,
      );
      rotation.value = withRepeat(
        withSequence(spin, withDelay(pause, withTiming(START_ROTATION, { duration: 1 }))),
        -1,
        false,
      );
    } else {
      translateY.value = riseFall;
      rotation.value = spin;
    }

    return () => {
      cancelAnimation(translateY);
      cancelAnimation(rotation);
    };
  }, [index, loop, loopDelay, rotation, translateY]);

  return (
    <AnimatedG animatedProps={animatedProps}>
      <Path d={letter.d} fill={`url(#${GRADIENT_ID})`} />
    </AnimatedG>
  );
}
