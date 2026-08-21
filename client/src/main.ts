import "./index.css";

const typedPre = document.getElementById("typed-pre");
const typedLink = document.getElementById("typed-link");
const typedPost = document.getElementById("typed-post");
if (
  typedPre &&
  typedLink &&
  typedPost &&
  document.documentElement.classList.contains("corporate") &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const pre = typedPre.textContent ?? "";
  const link = typedLink.textContent ?? "";
  const post = typedPost.textContent ?? "";
  const total = pre.length + link.length + post.length;
  typedPre.textContent = "";
  typedLink.textContent = "";
  typedPost.textContent = "";
  let n = 0;
  const timer = window.setInterval(() => {
    n += 1;
    typedPre.textContent = pre.slice(0, n);
    typedLink.textContent = link.slice(0, Math.max(0, n - pre.length));
    typedPost.textContent = post.slice(0, Math.max(0, n - pre.length - link.length));
    if (n >= total) clearInterval(timer);
  }, 45);
}

const detailsToggle = document.getElementById("details-toggle");
if (detailsToggle) {
  const details = document.querySelectorAll<HTMLElement>(".detail");
  detailsToggle.addEventListener("click", () => {
    const show = detailsToggle.getAttribute("aria-expanded") === "false";
    for (const el of details) el.hidden = !show;
    detailsToggle.setAttribute("aria-expanded", String(show));
    detailsToggle.textContent = show ? "Hide details" : "Show details";
  });
}

type RigPart = {
  id: string;
  path: string;
  origin: [number, number];
  motion: "swing" | "step" | "float";
  from: number;
  to: number;
  lift?: number;
  duration: number;
  delay: number;
};

type Character = {
  id: string;
  name: string;
  line: string;
  actionLabel: string;
  actionAnnouncement: string;
  image: string;
  rig: {
    width: number;
    height: number;
    parts: RigPart[];
  };
};

const characterPool: Character[] = [
  {
    id: "potato",
    name: "PRODUCT POTATO",
    line: "Makes the plan, then loses it near the bar.",
    actionLabel: "Make Product Potato dance",
    actionAnnouncement: "Product Potato dances.",
    image: new URL("../assets/characters/product-potato.avif", import.meta.url).href,
    rig: {
      width: 1194,
      height: 1317,
      parts: [
        { id: "arm-left", path: "M24 92H174L224 348L292 452L288 520L340 578L332 650L250 612L178 548L92 430L24 322Z", origin: [326, 582], motion: "swing", from: -3, to: 5, duration: 2.8, delay: 0 },
        { id: "arm-right", path: "M895 300H1194V790H890V710Q830 694 782 640L810 568Q852 596 905 615Z", origin: [817, 620], motion: "swing", from: 3, to: -4, duration: 2.8, delay: -1.4 },
        { id: "leg-left", path: "M345 890Q420 920 485 955L475 1045L515 1290H175L210 1015Z", origin: [428, 950], motion: "step", from: 1, to: -3, lift: -7, duration: 2.8, delay: 0 },
        { id: "leg-right", path: "M690 945Q770 910 850 885L1015 1290H625L705 1020Z", origin: [775, 950], motion: "step", from: -2, to: 3, lift: -7, duration: 2.8, delay: -1.4 },
      ],
    },
  },
  {
    id: "hatopus",
    name: "HATOPUS",
    line: "Wears multiple hats, but not quite the right ones.",
    actionLabel: "Make Hatopus juggle the hats",
    actionAnnouncement: "Hatopus juggles the hats.",
    image: new URL("../assets/characters/hatopus.avif", import.meta.url).href,
    rig: {
      width: 1060,
      height: 1484,
      parts: [
        { id: "tentacle-upper-left", path: "M115 35H350L345 250L300 315L295 420L325 505L260 525L190 440L145 330L115 245Z M5 390H225L220 485L165 530L185 600L280 625L300 690L225 725L120 680L50 610L5 545Z", origin: [310, 575], motion: "float", from: -2, to: 3, lift: -5, duration: 3.8, delay: 0 },
        { id: "tentacle-upper-right", path: "M545 15H810V270L755 330L745 420L705 520L655 505L665 420L625 320L545 250Z M730 200H1025V425L940 455L900 535L875 625L810 600L820 500L780 420L730 395Z M835 470H1060V700L990 710L980 760L910 800L865 760L890 690Z", origin: [825, 610], motion: "float", from: 2, to: -3, lift: -5, duration: 4.1, delay: -1.9 },
        { id: "tentacle-lower-left", path: "M0 690H230L305 720L390 710L410 800L350 842L320 925L245 990L120 980L55 915L0 850Z M130 970L285 950L365 885L420 805L450 860L430 1010L390 1120L295 1240L160 1200L125 1090Z", origin: [385, 835], motion: "swing", from: -1.5, to: 2.5, duration: 3.7, delay: -0.9 },
        { id: "tentacle-lower-right", path: "M720 785L825 830L985 800L1060 895V1080L990 1090L860 1140L760 1085L720 975Z", origin: [745, 850], motion: "swing", from: 2, to: -2, duration: 3.9, delay: -2 },
        { id: "leg-left", path: "M260 1060L492 1045L488 1215L455 1484H180L185 1210Z", origin: [395, 1135], motion: "step", from: 0.7, to: -1.5, lift: -4, duration: 3.8, delay: 0 },
        { id: "leg-right", path: "M575 1090L800 1070L850 1484H500L565 1210Z", origin: [660, 1140], motion: "step", from: -0.7, to: 1.5, lift: -4, duration: 3.8, delay: -1.9 },
      ],
    },
  },
  {
    id: "avo",
    name: "AVO JANITOR",
    line: "Cleans up the backlog nobody else wants.",
    actionLabel: "Make Avo Janitor mop the floor",
    actionAnnouncement: "Avo Janitor mops the floor.",
    image: new URL("../assets/characters/avo-janitor.avif", import.meta.url).href,
    rig: {
      width: 1101,
      height: 1429,
      parts: [
        { id: "arm-left", path: "M0 230H326L318 485L392 525L380 686L315 706L250 650L225 930L298 1220L272 1429H0V1050L115 980L175 680L210 520Z", origin: [354, 590], motion: "swing", from: -1.5, to: 2.5, duration: 3.3, delay: 0 },
        { id: "arm-right", path: "M710 475L830 500L920 590L1028 720L1015 925L895 890L830 750L720 675Z", origin: [755, 585], motion: "swing", from: 1.5, to: -2.5, duration: 3.3, delay: -1.65 },
        { id: "leg-left", path: "M350 875L535 900L525 1085L485 1165L475 1429H260L255 1160L335 1055Z", origin: [460, 930], motion: "step", from: 0.7, to: -2, lift: -6, duration: 3.3, delay: 0 },
        { id: "leg-right", path: "M535 875L690 890L725 1060L725 1280H560L530 1075Z", origin: [610, 930], motion: "step", from: -0.7, to: 2, lift: -5, duration: 3.3, delay: -1.65 },
      ],
    },
  },
  {
    id: "pm1",
    name: "PMSTATION",
    line: "Owns the launch but controls almost nothing.",
    actionLabel: "Make P M Station power cycle",
    actionAnnouncement: "P M Station performs a power cycle.",
    image: new URL("../assets/characters/pm-one.avif", import.meta.url).href,
    rig: {
      width: 1103,
      height: 1426,
      parts: [
        { id: "arm-left", path: "M0 0H325V335H205L205 510Q225 610 365 655L350 770Q185 755 72 640Q22 520 28 305H0Z", origin: [329, 694], motion: "swing", from: -1.2, to: 2.2, duration: 3.4, delay: 0 },
        { id: "arm-right", path: "M820 625H1103V1165H785V865H900Q910 760 820 720Z", origin: [850, 706], motion: "swing", from: 1.2, to: -2.2, duration: 3.4, delay: -1.7 },
        { id: "leg-left", path: "M280 875L430 880L455 1025L455 1426H110V1040L235 975Z", origin: [355, 920], motion: "step", from: 0.6, to: -1.5, lift: -4, duration: 3.4, delay: 0 },
        { id: "leg-right", path: "M610 875L780 860L850 1025L945 1426H555L570 1030Z", origin: [685, 920], motion: "step", from: -0.6, to: 1.5, lift: -4, duration: 3.4, delay: -1.7 },
      ],
    },
  },
  {
    id: "routary",
    name: "ROUTARY",
    line: "Sends every question to the person who can answer it.",
    actionLabel: "Make Routary route a call",
    actionAnnouncement: "Routary routes a call.",
    image: new URL("../assets/characters/routary-phone.avif", import.meta.url).href,
    rig: {
      width: 1105,
      height: 1424,
      parts: [
        { id: "receiver", path: "M280 80H925V225H280Z M245 140H440V350H245Z M755 140H955V380H755Z", origin: [600, 240], motion: "float", from: -0.7, to: 0.7, lift: -7, duration: 3.2, delay: -0.4 },
        { id: "dial", path: "M500 545A165 165 0 1 1 499 875A165 165 0 1 1 500 545Z", origin: [500, 710], motion: "float", from: -3, to: 3, lift: 0, duration: 3.2, delay: 0 },
        { id: "arm-left", path: "M0 165H225V330L205 430L340 575V750H235L155 690L75 570L0 455Z", origin: [302, 650], motion: "swing", from: -3, to: 5, lift: -5, duration: 3.2, delay: 0 },
        { id: "arm-right", path: "M755 590H895L940 690L1025 770L1105 850V1060H865L820 930L780 805Z", origin: [790, 680], motion: "swing", from: 3, to: -5, lift: -5, duration: 3.2, delay: -1.6 },
        { id: "leg-left", path: "M220 850H515V1424H120V1050Z", origin: [370, 940], motion: "step", from: 1, to: -3, lift: -8, duration: 3.2, delay: 0 },
        { id: "leg-right", path: "M520 850H925V1424H520Z", origin: [660, 940], motion: "step", from: -1, to: 3, lift: -8, duration: 3.2, delay: -1.6 },
      ],
    },
  },
  {
    id: "apricot",
    name: "APRICOT ORCHESTRATOR",
    line: "Keeps a tiny robot team working in time.",
    actionLabel: "Make Apricot Orchestrator conduct the bots",
    actionAnnouncement: "Apricot Orchestrator conducts the bots.",
    image: new URL("../assets/characters/apricot-orchestrator.avif", import.meta.url).href,
    rig: {
      width: 1102,
      height: 1427,
      parts: [
        { id: "baton-arm", path: "M430 55L510 90L325 430L330 610L410 855L350 955L235 915L115 790L125 500L215 375Z", origin: [350, 825], motion: "swing", from: -2, to: 4, lift: -6, duration: 3.6, delay: 0 },
        { id: "bots-left", path: "M0 0H330V390H0Z M0 790H350V1280H0Z", origin: [260, 720], motion: "float", from: -1, to: 2, lift: -12, duration: 3.6, delay: -0.9 },
        { id: "bots-right", path: "M690 0H1102V500H690Z M805 880H1102V1390H805Z", origin: [840, 720], motion: "float", from: 1, to: -2, lift: -12, duration: 3.6, delay: -2.7 },
        { id: "leg-left", path: "M320 940H590V1427H280Z", origin: [455, 1030], motion: "step", from: 0.8, to: -2.5, lift: -7, duration: 3.6, delay: 0 },
        { id: "leg-right", path: "M590 940H870V1427H590Z", origin: [675, 1030], motion: "step", from: -0.8, to: 2.5, lift: -7, duration: 3.6, delay: -1.8 },
      ],
    },
  },
];

const characterOrder = ["avo", "apricot", "hatopus", "pm1", "routary", "potato"];
const characters = characterOrder.map((id) => {
  const character = characterPool.find((item) => item.id === id);
  if (!character) throw new Error(`Missing character: ${id}`);
  return character;
});

const playMode = document.getElementById("play-mode");
const siteShell = document.getElementById("site-shell");
const corporateToggle = document.getElementById("corporate-toggle");
const corporateToggleLabel = corporateToggle?.querySelector<HTMLElement>(".corporate-toggle-label") ?? null;
const characterSelector = document.getElementById("character-selector");
const characterStage = document.getElementById("character-stage");
const characterImage = document.getElementById("character-image") as SVGSVGElement | null;
const characterPrev = document.getElementById("character-prev");
const characterNext = document.getElementById("character-next");
const characterName = document.getElementById("character-name");
const characterLine = document.getElementById("character-line");
const characterStatus = document.getElementById("character-status");
const playSound = document.getElementById("play-sound");
const playSoundLabel = playSound?.querySelector("span") ?? null;
const characterButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-character-index]"),
);

if (
  playMode &&
  siteShell &&
  corporateToggle &&
  corporateToggleLabel &&
  characterSelector &&
  characterStage &&
  characterImage &&
  characterPrev &&
  characterNext &&
  characterName &&
  characterLine &&
  characterStatus &&
  playSound &&
  playSoundLabel
) {
  type ClubAudio = {
    ctx: AudioContext;
    timer: number;
    master: GainNode;
    accent: () => void;
  };

  let audio: ClubAudio | null = null;
  let soundEnabled = false;
  let danceTimer: number | null = null;
  let switchTimer: number | null = null;
  let swipePointer: number | null = null;
  let swipeStartX = 0;
  let swipeStartY = 0;
  let swipeTravel = 0;
  let suppressStageClick = false;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const midiToFrequency = (note: number) => 440 * 2 ** ((note - 69) / 12);

  const readStorage = (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const writeStorage = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch {}
  };

  const savedSound = readStorage("pv-play-sound");
  soundEnabled = savedSound === null ? true : savedSound === "true";

  const savedCharacter = readStorage("pv-character");
  const legacyCharacterIds: Record<string, string> = {
    angler: "routary",
    compost: "apricot",
  };
  const savedCharacterId = savedCharacter
    ? (legacyCharacterIds[savedCharacter] ?? savedCharacter)
    : null;
  let currentIndex = Math.max(
    0,
    characters.findIndex((character) => character.id === savedCharacterId),
  );

  const syncSoundButton = () => {
    playSound.setAttribute("aria-pressed", String(soundEnabled));
    playSoundLabel.textContent = soundEnabled ? "Sound on" : "Sound off";
  };

  const stopMusic = () => {
    if (!audio) return;
    const { ctx, timer, master } = audio;
    audio = null;
    clearInterval(timer);
    const finish = () => {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      window.setTimeout(() => void ctx.close(), 100);
    };
    if (ctx.state === "suspended") {
      void ctx.resume().then(finish).catch(() => void ctx.close());
    } else {
      finish();
    }
  };

  const startMusic = async () => {
    if (audio) {
      if (audio.ctx.state === "suspended") {
        try {
          await audio.ctx.resume();
        } catch {}
      }
      return;
    }

    try {
      const ctx = new AudioContext();
      const bpm = 118;
      const sixteenth = 60 / bpm / 4;
      const lookAhead = 0.2;
      let next = ctx.currentTime + 0.06;
      let step = 0;

      const master = ctx.createGain();
      const compressor = ctx.createDynamicsCompressor();
      const musicBus = ctx.createGain();
      master.gain.setValueAtTime(0.0001, ctx.currentTime);
      compressor.threshold.value = -18;
      compressor.knee.value = 14;
      compressor.ratio.value = 5;
      compressor.attack.value = 0.004;
      compressor.release.value = 0.18;
      musicBus.gain.value = 0.82;
      musicBus.connect(compressor).connect(master).connect(ctx.destination);

      const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const noiseData = noise.getChannelData(0);
      for (let i = 0; i < noiseData.length; i += 1) noiseData[i] = Math.random() * 2 - 1;

      const kick = (time: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(155, time);
        osc.frequency.exponentialRampToValueAtTime(44, time + 0.12);
        gain.gain.setValueAtTime(0.86, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.23);
        osc.connect(gain).connect(musicBus);
        osc.start(time);
        osc.stop(time + 0.25);
      };

      const hat = (time: number, open = false, velocity = 1) => {
        const source = ctx.createBufferSource();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        const duration = open ? 0.14 : 0.035;
        source.buffer = noise;
        filter.type = "highpass";
        filter.frequency.value = open ? 5200 : 7200;
        gain.gain.setValueAtTime((open ? 0.065 : 0.045) * velocity, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        source.connect(filter).connect(gain).connect(musicBus);
        source.start(time);
        source.stop(time + duration + 0.01);
      };

      const clap = (time: number) => {
        const source = ctx.createBufferSource();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        source.buffer = noise;
        filter.type = "bandpass";
        filter.frequency.value = 1650;
        filter.Q.value = 0.7;
        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(0.13, time + 0.004);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
        source.connect(filter).connect(gain).connect(musicBus);
        source.start(time);
        source.stop(time + 0.17);
      };

      const bassNote = (time: number, note: number) => {
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        const saw = ctx.createOscillator();
        const sine = ctx.createOscillator();
        const frequency = midiToFrequency(note);
        saw.type = "sawtooth";
        sine.type = "sine";
        saw.frequency.value = frequency;
        sine.frequency.value = frequency / 2;
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(950, time);
        filter.frequency.exponentialRampToValueAtTime(170, time + sixteenth * 0.82);
        gain.gain.setValueAtTime(0.13, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + sixteenth * 0.9);
        saw.connect(filter);
        sine.connect(filter);
        filter.connect(gain).connect(musicBus);
        saw.start(time);
        sine.start(time);
        saw.stop(time + sixteenth);
        sine.stop(time + sixteenth);
      };

      const chord = (time: number, notes: number[]) => {
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2100, time);
        filter.frequency.exponentialRampToValueAtTime(650, time + 0.13);
        gain.gain.setValueAtTime(0.027, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);
        filter.connect(gain).connect(musicBus);
        for (const note of notes) {
          const osc = ctx.createOscillator();
          osc.type = "triangle";
          osc.frequency.value = midiToFrequency(note);
          osc.connect(filter);
          osc.start(time);
          osc.stop(time + 0.18);
        }
      };

      const flourish = (time: number) => {
        const gain = ctx.createGain();
        const osc = ctx.createOscillator();
        osc.type = "square";
        osc.frequency.setValueAtTime(midiToFrequency(69), time);
        osc.frequency.exponentialRampToValueAtTime(midiToFrequency(81), time + 0.18);
        gain.gain.setValueAtTime(0.035, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.21);
        osc.connect(gain).connect(musicBus);
        osc.start(time);
        osc.stop(time + 0.23);
      };

      const roots = [45, 41, 36, 43];
      const bassPattern: Array<number | null> = [0, null, 0, 7, null, 0, 12, null, 0, null, 7, null, 12, 7, null, 0];
      const chords = [[57, 60, 64, 67], [53, 57, 60, 64], [48, 52, 55, 59], [55, 59, 62, 65]];

      const timer = window.setInterval(() => {
        if (ctx.state !== "running") return;
        while (next < ctx.currentTime + lookAhead) {
          const barStep = step % 16;
          const bar = Math.floor(step / 16) % 4;
          if (barStep % 4 === 0) kick(next);
          if (barStep === 4 || barStep === 12) clap(next);
          if (barStep % 2 === 1) hat(next, false, barStep % 4 === 1 ? 0.82 : 1);
          if (barStep === 6 || barStep === 14) hat(next, true, 0.8);
          const offset = bassPattern[barStep];
          if (offset !== null) bassNote(next, roots[bar] + offset);
          if (barStep === 2 || barStep === 10) chord(next, chords[bar]);
          if (step % 64 === 62) flourish(next);
          step += 1;
          next += sixteenth;
        }
      }, 80);

      audio = { ctx, timer, master, accent: () => flourish(ctx.currentTime + 0.015) };
      master.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 0.08);
      try {
        await ctx.resume();
      } catch {}
    } catch {
      soundEnabled = false;
      playSound.setAttribute("disabled", "");
      playSoundLabel.textContent = "Audio unavailable";
    }
  };

  const setSound = (enabled: boolean, persist = true) => {
    soundEnabled = enabled;
    syncSoundButton();
    if (persist) writeStorage("pv-play-sound", String(enabled));
    if (enabled) {
      if (!document.documentElement.classList.contains("corporate")) void startMusic();
    } else {
      stopMusic();
    }
  };

  const svgNamespace = "http://www.w3.org/2000/svg";
  const makeSvgElement = <K extends keyof SVGElementTagNameMap>(name: K) =>
    document.createElementNS(svgNamespace, name);

  const renderRig = (character: Character) => {
    const { width, height } = character.rig;
    characterImage.replaceChildren();
    characterImage.setAttribute("viewBox", `0 0 ${width} ${height}`);
    characterImage.removeAttribute("aria-labelledby");
    characterImage.setAttribute("aria-hidden", "true");
    characterImage.dataset.character = character.id;

    const artwork = makeSvgElement("image");
    artwork.classList.add("rig-complete");
    artwork.setAttribute("href", character.image);
    artwork.setAttribute("width", String(width));
    artwork.setAttribute("height", String(height));
    artwork.setAttribute("preserveAspectRatio", "xMidYMid meet");
    characterImage.append(artwork);
  };

  const renderCharacter = (index: number, announce = true, animate = true) => {
    currentIndex = (index + characters.length) % characters.length;
    const character = characters[currentIndex];
    if (danceTimer !== null) clearTimeout(danceTimer);
    danceTimer = null;
    characterStage.classList.remove("is-dancing");
    if (switchTimer !== null) clearTimeout(switchTimer);
    characterImage.classList.remove("is-switching");
    renderRig(character);
    characterName.textContent = character.name;
    characterLine.textContent = character.line;
    characterStage.setAttribute("aria-label", character.actionLabel);
    playMode.dataset.character = character.id;
    for (const [buttonIndex, button] of characterButtons.entries()) {
      if (buttonIndex === currentIndex) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
    }
    writeStorage("pv-character", character.id);
    if (animate && !reducedMotion.matches) {
      void characterImage.getBoundingClientRect();
      characterImage.classList.add("is-switching");
      switchTimer = window.setTimeout(() => {
        characterImage.classList.remove("is-switching");
        switchTimer = null;
      }, 380);
    }
    if (announce) characterStatus.textContent = `${character.name}. ${character.line}`;
  };

  const triggerSpecialMove = () => {
    if (reducedMotion.matches) {
      characterStatus.textContent = characters[currentIndex].actionAnnouncement;
      audio?.accent();
      return;
    }
    if (danceTimer !== null) clearTimeout(danceTimer);
    characterStage.classList.remove("is-dancing");
    void characterStage.offsetWidth;
    characterStage.classList.add("is-dancing");
    characterStatus.textContent = characters[currentIndex].actionAnnouncement;
    audio?.accent();
    danceTimer = window.setTimeout(() => {
      characterStage.classList.remove("is-dancing");
      danceTimer = null;
    }, 1450);
  };

  const isCorporate = () => document.documentElement.classList.contains("corporate");
  const isFunMode = () => !isCorporate();
  const setFunMode = (funMode: boolean, persist = true) => {
    const corporate = !funMode;
    document.documentElement.classList.toggle("corporate", corporate);
    corporateToggle.setAttribute("aria-pressed", String(funMode));
    corporateToggleLabel.textContent = `Fun ${funMode ? "on" : "off"}`;
    if (corporate) {
      playMode.setAttribute("inert", "");
      playMode.setAttribute("aria-hidden", "true");
      siteShell.removeAttribute("inert");
      siteShell.removeAttribute("aria-hidden");
      stopMusic();
    } else {
      siteShell.setAttribute("inert", "");
      siteShell.setAttribute("aria-hidden", "true");
      playMode.removeAttribute("inert");
      playMode.removeAttribute("aria-hidden");
      if (soundEnabled) void startMusic();
    }
    if (persist) writeStorage("pv-corporate-mode", String(corporate));
  };

  renderCharacter(currentIndex, false, false);
  syncSoundButton();
  setFunMode(!document.documentElement.classList.contains("corporate"), false);
  document.documentElement.classList.toggle("club-paused", document.hidden);

  let audioUnlocked = false;
  const unlockAudio = () => {
    if (audioUnlocked || !soundEnabled || isCorporate()) return;
    void startMusic().then(() => {
      if (audio?.ctx.state === "running") audioUnlocked = true;
    });
  };
  document.addEventListener("pointerdown", unlockAudio, { capture: true, passive: true });
  document.addEventListener("keydown", unlockAudio, { capture: true });

  corporateToggle.addEventListener("click", () => setFunMode(!isFunMode()));
  characterPrev.addEventListener("click", () => renderCharacter(currentIndex - 1));
  characterNext.addEventListener("click", () => renderCharacter(currentIndex + 1));
  characterStage.addEventListener("click", () => {
    if (suppressStageClick) {
      suppressStageClick = false;
      return;
    }
    triggerSpecialMove();
  });
  playSound.addEventListener("click", () => setSound(!soundEnabled));

  for (const button of characterButtons) {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.characterIndex);
      if (Number.isInteger(index)) renderCharacter(index);
    });
  }

  characterStage.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.pointerType === "mouse") return;
    swipePointer = event.pointerId;
    swipeStartX = event.clientX;
    swipeStartY = event.clientY;
    swipeTravel = 0;
    characterStage.setPointerCapture(event.pointerId);
  });

  characterStage.addEventListener("pointermove", (event) => {
    if (event.pointerId !== swipePointer) return;
    swipeTravel = Math.max(
      swipeTravel,
      Math.hypot(event.clientX - swipeStartX, event.clientY - swipeStartY),
    );
  });

  characterStage.addEventListener("pointerup", (event) => {
    if (event.pointerId !== swipePointer) return;
    const deltaX = event.clientX - swipeStartX;
    const deltaY = event.clientY - swipeStartY;
    swipePointer = null;
    if (characterStage.hasPointerCapture(event.pointerId)) {
      characterStage.releasePointerCapture(event.pointerId);
    }
    if (swipeTravel > 10) {
      suppressStageClick = true;
      window.setTimeout(() => { suppressStageClick = false; }, 80);
    }
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      renderCharacter(currentIndex + (deltaX < 0 ? 1 : -1));
    }
  });

  characterStage.addEventListener("pointercancel", (event) => {
    swipePointer = null;
    if (characterStage.hasPointerCapture(event.pointerId)) {
      characterStage.releasePointerCapture(event.pointerId);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      isCorporate() ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    ) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      renderCharacter(currentIndex - 1);
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      renderCharacter(currentIndex + 1);
    }
  });

  document.addEventListener("visibilitychange", () => {
    document.documentElement.classList.toggle("club-paused", document.hidden);
    if (!audio) return;
    if (document.hidden || isCorporate() || !soundEnabled) {
      void audio.ctx.suspend();
    } else {
      void audio.ctx.resume();
    }
  });
}

const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  const syncThemeToggle = () => {
    themeToggle.setAttribute(
      "aria-pressed",
      String(document.documentElement.classList.contains("dark")),
    );
  };

  syncThemeToggle();
  themeToggle.addEventListener("click", () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("pv-theme", dark ? "dark" : "light");
    } catch {}
    syncThemeToggle();
  });
}
