'use strict';

/* =============================================================================
   MOBILE GUARDS — блокируем всё, что браузер делает поверх игры.
   Ставится до инициализации, слушатели на document в capture-фазе.
   ============================================================================= */
(function installMobileGuards() {
    const block = (e) => e.preventDefault();
    const opts = { passive: false, capture: true };

    // iOS Safari: pinch-zoom страницы (gesture* — проприетарные события WebKit)
    ['gesturestart', 'gesturechange', 'gestureend'].forEach((type) => {
        document.addEventListener(type, block, opts);
    });

    // Любой мультитач — не наш жест: гасим до того как браузер решит зумить/панорамировать
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) e.preventDefault();
    }, opts);

    document.addEventListener('touchmove', (e) => {
        // e.scale есть только в WebKit, !== 1 означает начавшийся pinch
        if (e.touches.length > 1 || (typeof e.scale === 'number' && e.scale !== 1)) {
            e.preventDefault();
        }
    }, opts);

    // Долгий тап: контекстное меню / «сохранить изображение» / лупа выделения
    document.addEventListener('contextmenu', block, opts);

    // Выделение текста и нативный drag&drop элементов
    document.addEventListener('selectstart', block, opts);
    document.addEventListener('dragstart', block, opts);
    document.addEventListener('drop', block, opts);

    // Ctrl/⌘ + колесо и Ctrl/⌘ +/-/0 — зум на десктопе и трекпадах
    window.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) e.preventDefault();
    }, { passive: false });

    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && ['+', '-', '=', '_', '0'].includes(e.key)) {
            e.preventDefault();
        }
        // пробел и стрелки не должны пытаться скроллить документ
        if ([' ', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) {
            e.preventDefault();
        }
    }, { passive: false });

    // Если что-то всё же сдвинуло документ (клавиатура, focus, iOS) — возвращаем на место
    const resetScroll = () => {
        if (window.scrollX !== 0 || window.scrollY !== 0) window.scrollTo(0, 0);
        if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
    };
    window.addEventListener('scroll', resetScroll, { passive: true });
    window.addEventListener('orientationchange', () => setTimeout(resetScroll, 200));
    window.addEventListener('resize', resetScroll);

    // Есть ли настоящая мышь — от этого зависят hover-подсказки
    window.HAS_HOVER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
})();


/* =============================================================================
   Звук
   ============================================================================= */
class SoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.enabled) return;
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx({ latencyHint: 'interactive' });
        }
        if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    }

    /** Один затухающий тон — база для всех эффектов. */
    tone({ from, to, dur, gain = 0.15, at = 0 }) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx || this.ctx.state !== 'running') return;

        const now = this.ctx.currentTime + at;
        const osc = this.ctx.createOscillator();
        const amp = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(from, now);
        if (to !== from) osc.frequency.exponentialRampToValueAtTime(to, now + dur);

        amp.gain.setValueAtTime(gain, now);
        amp.gain.exponentialRampToValueAtTime(0.001, now + dur);

        osc.connect(amp);
        amp.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + dur);
    }

    playSlide() { this.tone({ from: 200, to: 420, dur: 0.07, gain: 0.12 }); }
    playDrop()  { this.tone({ from: 520, to: 180, dur: 0.14, gain: 0.2 }); }
    playUndo()  { this.tone({ from: 380, to: 190, dur: 0.09, gain: 0.1 }); }

    playWin() {
        [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
            this.tone({ from: freq, to: freq, dur: 0.22, gain: 0.15, at: i * 0.08 });
        });
    }
}


/* =============================================================================
   Данные
   ============================================================================= */
const COLOR_CONFIG = {
    neutral: {
        name: 'Нейтральный', hex: '#FFCC4D', chipClass: 'chip-neutral',
        centerColor: '#FFCC4D',
        womanEmojis: ['👩', '👱‍♀️', '👩‍🦰', '👩‍🦱', '👩‍🦳']
    },
    skin1: {
        name: 'Светлый', hex: '#FADCBC', chipClass: 'chip-skin1',
        centerColor: '#E3A090',
        womanEmojis: ['👩🏻', '👱🏻‍♀️', '👩🏻‍🦰', '👩🏻‍🦱', '👩🏻‍🦳']
    },
    skin2: {
        name: 'Св-средний', hex: '#E0BB95', chipClass: 'chip-skin2',
        centerColor: '#B86F5D',
        womanEmojis: ['👩🏼', '👱🏼‍♀️', '👩🏼‍🦰', '👩🏼‍🦱', '👩🏼‍🦳']
    },
    skin3: {
        name: 'Средний', hex: '#BF8F68', chipClass: 'chip-skin3',
        centerColor: '#994F40',
        womanEmojis: ['👩🏽', '👱🏽‍♀️', '👩🏽‍🦰', '👩🏽‍🦱', '👩🏽‍🦳']
    },
    skin4: {
        name: 'Тем-средний', hex: '#9B643D', chipClass: 'chip-skin4',
        centerColor: '#6E3429',
        womanEmojis: ['👩🏾', '👱🏾‍♀️', '👩🏾‍🦰', '👩🏾‍🦱', '👩🏾‍🦳']
    },
    skin5: {
        name: 'Темный', hex: '#594539', chipClass: 'chip-skin5',
        centerColor: '#421D17',
        womanEmojis: ['👩🏿', '👱🏿‍♀️', '👩🏿‍🦰', '👩🏿‍🦱', '👩🏿‍🦳']
    }
};

const LEVELS = [
    {
        id: 1,
        title: 'Уровень 1: Основная гамма',
        cols: 4, rows: 4,
        colors: ['neutral', 'skin1', 'skin2', 'skin3'],
        chipsPerColor: 2,
        containerCapacities: [2, 2, 2, 2]
    },
    {
        id: 2,
        title: 'Уровень 2: Оттенки Фицпатрика',
        cols: 4, rows: 4,
        colors: ['skin1', 'skin2', 'skin3', 'skin4'],
        chipsPerColor: 3,
        containerCapacities: [3, 3, 3, 3]
    },
    {
        id: 3,
        title: 'Уровень 3: Полная палитра',
        cols: 4, rows: 5,
        colors: ['skin2', 'skin3', 'skin4', 'skin5'],
        chipsPerColor: 3,
        containerCapacities: [3, 3, 3, 3]
    }
];

/** Длительность переезда фишки между клетками. */
const MOVE_MS = 180;
/**
 * Коэффициент «живости» при системном «Уменьшении движения».
 *
 * Настройка НЕ выключает анимацию. В этой игре сдвиг фишки — обратная связь
 * (какая именно фишка поехала и куда), а не декор: убрать его целиком значит
 * сделать игру менее понятной, а не более доступной. Поэтому длительность
 * переезда остаётся полной, а ослабляется только упругость качания.
 * Гасится отдельно лишь НЕПРЕРЫВНОЕ движение (покачивание стрелки и эмодзи) —
 * именно оно и вызывает дискомфорт.
 *
 * Поставь 1, чтобы игнорировать системную настройку полностью.
 */
const REDUCED_MOTION_SCALE = 0.6;
const DROP_MS = 520;
const JELLY_MS = 650;

/**
 * Кадры желе как [scaleX, scaleY, offset]. Offset'ы обязательны: animate()
 * по умолчанию раскладывает кадры равномерно, а у исходных @keyframes ритм
 * был неравномерный (0/22/45/68/85/100%) — без них качание теряет характер.
 */
const JELLY_H = [
    [1.45, 0.65, 0], [0.7, 1.3, 0.22], [1.18, 0.85, 0.45],
    [0.9, 1.08, 0.68], [1.04, 0.96, 0.85], [1, 1, 1]
];
const JELLY_V = [
    [0.65, 1.45, 0], [1.3, 0.7, 0.22], [0.85, 1.18, 0.45],
    [1.08, 0.9, 0.68], [0.96, 1.04, 0.85], [1, 1, 1]
];
const JELLY_EASING = 'cubic-bezier(0.25, 0.1, 0.25, 1)';

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');

const TAP_SLOP = 18;
const HISTORY_LIMIT = 20;

const DIRS = [
    { dr: -1, dc: 0, dir: 'UP' },
    { dr: 1, dc: 0, dir: 'DOWN' },
    { dr: 0, dc: -1, dir: 'LEFT' },
    { dr: 0, dc: 1, dir: 'RIGHT' }
];


/* =============================================================================
   Игра
   ============================================================================= */
class ColorSlideGame {
    constructor() {
        this.sound = new SoundFX();

        this.dom = {
            grid: document.getElementById('board-grid'),
            tilesLayer: document.getElementById('tiles-layer'),
            arrowsBar: document.getElementById('arrows-bar'),
            jarsBar: document.getElementById('containers-bar'),
            levelTitle: document.getElementById('level-title'),
            movesCounter: document.getElementById('moves-counter'),
            btnUndo: document.getElementById('btn-undo'),
            btnNext: document.getElementById('btn-next-level'),
            modal: document.getElementById('victory-modal'),
            finalMoves: document.getElementById('final-moves'),
            finalStars: document.getElementById('final-stars')
        };

        this.currentLevelIdx = 0;
        this.moves = 0;
        this.history = [];
        this.chipSeq = 0;

        this.cols = 4;
        this.rows = 4;
        this.grid = [];
        this.containers = [];

        /** chip.id -> { chip, el, body, r, c, baseX, baseY } */
        this.tiles = new Map();
        /** [r][c] -> элемент клетки */
        this.cellEls = [];
        /** [r][c] -> { x, y, w, h } относительно сетки */
        this.cellRects = [];
        this.tileSize = 0;

        this.arrows = [];
        this.jars = [];

        /** Форсированный множитель анимации в обход системной настройки. */
        this.motionOverride = null;

        /** id пальца, который сейчас тащит фишку; второй палец игнорируется */
        this.activePointer = null;
        this.isDropping = false;
        /** фишки, которые ещё доезжают до новой клетки */
        this.settling = new Set();

        this.bindStaticUI();
        this.observeResize();
        this.loadLevel(0);
    }

    /* ------------------------------ Инициализация ------------------------- */

    bindStaticUI() {
        // capture-фаза: фишки гасят события preventDefault'ом, но до capture
        // они доходят всегда — иначе первый тап по фишке не разблокирует звук
        const unlockAudio = () => {
            this.sound.init();
            window.removeEventListener('pointerdown', unlockAudio, true);
            window.removeEventListener('touchstart', unlockAudio, true);
        };
        window.addEventListener('pointerdown', unlockAudio, { passive: true, capture: true });
        window.addEventListener('touchstart', unlockAudio, { passive: true, capture: true });

        this.bindTap(this.dom.btnUndo, () => this.undo());
        this.bindTap(this.dom.btnNext, () => {
            this.dom.modal.hidden = true;
            this.loadLevel((this.currentLevelIdx + 1) % LEVELS.length);
        });
    }

    /**
     * Тап через pointer-события: без 300ms задержки click на мобильных,
     * без «фантомного» клика после свайпа и без реакции на второй палец.
     */
    bindTap(el, handler) {
        if (!el) return;
        let downX = 0, downY = 0, pid = null;

        const release = () => {
            if (pid !== null) el.classList.remove('is-pressed');
            pid = null;
        };

        el.addEventListener('pointerdown', (e) => {
            if (e.button !== undefined && e.button !== 0) return;
            if (this.activePointer !== null) return;
            pid = e.pointerId;
            downX = e.clientX;
            downY = e.clientY;
            el.classList.add('is-pressed');
            if (e.cancelable) e.preventDefault();
        });

        el.addEventListener('pointerup', (e) => {
            if (e.pointerId !== pid) return;
            const moved = Math.hypot(e.clientX - downX, e.clientY - downY);
            release();
            // палец уехал — это был свайп, а не тап
            if (moved > 24) return;
            if (this.activePointer !== null) return;
            if (el.disabled) return;
            handler();
        });

        el.addEventListener('pointercancel', release);
        el.addEventListener('touchstart', (e) => {
            if (e.cancelable) e.preventDefault();
        }, { passive: false });
    }

    /** Фишки позиционируются в пикселях, поэтому при любом ресайзе — перемер. */
    observeResize() {
        if (typeof ResizeObserver !== 'function') {
            window.addEventListener('resize', () => this.remeasure());
            return;
        }
        const ro = new ResizeObserver(() => this.remeasure());
        ro.observe(this.dom.grid);
    }

    remeasure() {
        this.measure();
        this.tiles.forEach((t) => this.positionTile(t, false));
    }

    /* --------------------------------- Уровень ---------------------------- */

    loadLevel(levelIdx) {
        const cfg = LEVELS[levelIdx] || LEVELS[0];

        this.currentLevelIdx = levelIdx;
        this.cols = cfg.cols;
        this.rows = cfg.rows;
        this.moves = 0;
        this.history = [];
        this.isDropping = false;
        this.activePointer = null;
        this.settling.clear();

        this.containers = cfg.colors.map((colorKey, idx) => ({
            color: colorKey,
            current: 0,
            max: cfg.containerCapacities[idx] || 3
        }));

        this.grid = this.dealChips(cfg);

        document.documentElement.style.setProperty('--cols', String(this.cols));
        document.documentElement.style.setProperty('--rows', String(this.rows));
        this.dom.levelTitle.textContent = cfg.title;

        this.buildCells();
        this.buildArrows();
        this.buildJars();
        this.measure();
        this.rebuildTiles();
        this.updateJars();
        this.syncCells();
        this.refreshStates();
        this.updateHud();
    }

    dealChips(cfg) {
        const chips = [];
        cfg.colors.forEach((colorKey) => {
            for (let i = 0; i < cfg.chipsPerColor; i++) {
                chips.push({ id: `c${this.chipSeq++}`, color: colorKey });
            }
        });

        // одна клетка всегда остаётся пустой, иначе фишки не смогут двигаться
        const totalSlots = this.rows * this.cols;
        while (chips.length < totalSlots - 1) chips.push(null);

        const shuffled = this.shuffleArray(chips);
        const grid = [];
        let idx = 0;
        for (let r = 0; r < this.rows; r++) {
            const row = [];
            for (let c = 0; c < this.cols; c++) {
                row.push(r === 0 && c === 0 ? null : (shuffled[idx++] || null));
            }
            grid.push(row);
        }
        return grid;
    }

    shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    /* ------------------------------ Построение DOM ------------------------ */

    buildCells() {
        this.dom.grid.innerHTML = '';
        this.cellEls = [];
        for (let r = 0; r < this.rows; r++) {
            const row = [];
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.id = `cell-${r}-${c}`;
                this.dom.grid.appendChild(cell);
                row.push(cell);
            }
            this.cellEls.push(row);
        }
    }

    buildArrows() {
        this.dom.arrowsBar.innerHTML = '';
        this.arrows = [];
        for (let c = 0; c < this.cols; c++) {
            const el = document.createElement('div');
            el.className = 'arrow';
            el.id = `arrow-col-${c}`;

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            use.setAttribute('href', '#i-chevron-down');
            svg.appendChild(use);
            el.appendChild(svg);

            const col = c;
            this.bindTap(el, () => this.dropChip(col));
            this.dom.arrowsBar.appendChild(el);
            this.arrows.push({ el, use });
        }
    }

    buildJars() {
        this.dom.jarsBar.innerHTML = '';
        this.jars = [];

        this.containers.forEach((cont, idx) => {
            const cfg = COLOR_CONFIG[cont.color] || COLOR_CONFIG.neutral;

            const el = document.createElement('div');
            el.className = 'jar';
            el.style.setProperty('--jar-color', cfg.hex);
            el.style.setProperty('--jar-glow', `${cfg.hex}88`);
            el.style.setProperty('--jar-fill', `${cfg.hex}33`);

            const cap = document.createElement('div');
            cap.className = 'jar__cap';

            const fill = document.createElement('div');
            fill.className = 'jar__fill';

            const dotsBox = document.createElement('div');
            dotsBox.className = 'jar__dots';
            const dots = [];
            for (let i = 0; i < cont.max; i++) {
                const dot = document.createElement('div');
                dot.className = 'jar__dot';
                dotsBox.appendChild(dot);
                dots.push(dot);
            }

            const label = document.createElement('div');
            label.className = 'jar__label';

            el.append(cap, fill, dotsBox, label);

            const col = idx;
            this.bindTap(el, () => this.dropChip(col));
            this.dom.jarsBar.appendChild(el);

            this.jars.push({ el, fill, dots, label, done: null, cfg, idx });
        });
    }

    rebuildTiles() {
        this.tiles.forEach((t) => t.el.remove());
        this.tiles.clear();
        this.dom.tilesLayer.innerHTML = '';

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const chip = this.grid[r][c];
                if (chip) this.createTile(chip, r, c);
            }
        }
    }

    createTile(chip, r, c) {
        const cfg = COLOR_CONFIG[chip.color] || COLOR_CONFIG.neutral;

        const el = document.createElement('div');
        el.className = 'tile';
        el.dataset.chip = chip.id;

        const body = document.createElement('div');
        body.className = `tile__body ${cfg.chipClass}`;
        body.style.setProperty('--dome', cfg.centerColor);
        body.innerHTML = `
            <svg class="tile__glint" viewBox="0 0 50 50" aria-hidden="true">
                <path d="M 10 36 C 6 22 14 8 36 10 C 24 12 12 20 10 36 Z" fill="#fff" opacity=".88"/>
                <circle cx="39" cy="8" r="2.5" fill="#fff" opacity=".6"/>
            </svg>
            <div class="tile__dome"><div class="tile__bead"></div></div>`;

        el.appendChild(body);
        this.dom.tilesLayer.appendChild(el);

        // t.jelly — текущая анимация желе этой фишки (Web Animations API)
        // curX/curY — фактически применённый translate (с учётом смещения
        // при перетаскивании); slide — текущая анимация переезда
        const t = { chip, el, body, r, c, baseX: 0, baseY: 0,
                    curX: 0, curY: 0, slide: null, jelly: null };
        this.tiles.set(chip.id, t);
        this.attachDrag(t);
        this.positionTile(t, false);
        return t;
    }

    /* ------------------------------ Геометрия ----------------------------- */

    measure() {
        if (!this.cellEls.length) return;
        const gridRect = this.dom.grid.getBoundingClientRect();
        if (!gridRect.width) return;

        this.cellRects = this.cellEls.map((row) => row.map((el) => {
            const r = el.getBoundingClientRect();
            return { x: r.left - gridRect.left, y: r.top - gridRect.top, w: r.width, h: r.height };
        }));

        // фишка — квадрат по меньшей стороне клетки, чтобы всегда быть кругом
        const first = this.cellRects[0][0];
        this.tileSize = Math.max(0, Math.min(first.w, first.h));
    }

    positionTile(t, animate) {
        const rect = this.cellRects[t.r] && this.cellRects[t.r][t.c];
        if (!rect) return;

        const size = this.tileSize;
        t.baseX = rect.x + (rect.w - size) / 2;
        t.baseY = rect.y + (rect.h - size) / 2;
        t.el.style.width = `${size}px`;
        t.el.style.height = `${size}px`;

        if (animate) this.slideTo(t, t.baseX, t.baseY);
        else this.setTransform(t, t.baseX, t.baseY);
    }

    /**
     * Плавный переезд из текущей позиции в целевую — через Web Animations,
     * а не через CSS-transition.
     *
     * CSS-путь отваливался целиком по двум независимым поводам:
     * 1) при включённом «Уменьшении движения» transition-duration уходил в
     *    0.01ms и фишка телепортировалась в слот;
     * 2) `transition: transform var(--move-ms) ...` — var() внутри shorthand:
     *    если браузер не подставит переменную, вся декларация становится
     *    невалидной на этапе вычисления и откатывается к `all 0s`, то есть
     *    снова мгновенный прыжок.
     * animate() не зависит ни от того, ни от другого — и это ровно тот путь,
     * которым уже работает анимация сброса в банку.
     */
    slideTo(t, x, y) {
        const fromX = t.curX;
        const fromY = t.curY;

        // Итоговое положение выставляем сразу: анимация идёт с fill:'none',
        // поэтому её обрыв (перехват пальцем) оставит фишку в цели, а не
        // отбросит назад.
        this.setTransform(t, x, y);

        if (typeof t.el.animate !== 'function') return;
        if (fromX === x && fromY === y) return;

        const anim = t.el.animate([
            { transform: `translate3d(${fromX}px, ${fromY}px, 0)` },
            { transform: `translate3d(${x}px, ${y}px, 0)` }
        ], {
            duration: this.moveDuration(),
            easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
            fill: 'none'
        });
        t.slide = anim;

        // та же защита от запоздавшего oncancel, что и у желе
        const clear = () => { if (t.slide === anim) t.slide = null; };
        anim.onfinish = clear;
        anim.oncancel = clear;
    }

    /**
     * При «Уменьшении движения» переезд укорачивается, но НЕ выключается:
     * игроку необходимо видеть, какая именно фишка сдвинулась — это обратная
     * связь, а не украшение. Убирается только упругое качание.
     */
    moveDuration() {
        return MOVE_MS;
    }

    /**
     * Множитель амплитуды качания: 1 — полное, 0 — без качания.
     * motionOverride позволяет форсировать значение из консоли
     * (`game.motionOverride = 1`) в обход системной настройки.
     */
    motionScale() {
        if (this.motionOverride !== null) return this.motionOverride;
        return REDUCED_MOTION.matches ? REDUCED_MOTION_SCALE : 1;
    }

    /** Мгновенно ставит фишку в позицию и запоминает её как текущую. */
    setTransform(t, x, y) {
        if (t.slide) {
            t.slide.cancel();
            t.slide = null;
        }
        t.curX = x;
        t.curY = y;
        t.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    /**
     * Желе через Web Animations API, а не через CSS-класс.
     *
     * До рефакторинга DOM пересобирался на каждый ход, поэтому класс jelly-*
     * всегда попадал на свежий элемент. Теперь фишка живёт весь уровень, и
     * КАЖДЫЙ повторный запуск зависел от трюка remove -> void offsetWidth ->
     * add. В WebKit этот трюк ненадёжен: Safari не всегда сбрасывает состояние
     * анимации при форсированном reflow в том же тике, и желе просто не
     * проигрывалось. cancel() + animate() перезапускает детерминированно.
     */
    playJelly(t, axis) {
        if (t.jelly) {
            t.jelly.cancel();
            t.jelly = null;
        }
        if (typeof t.body.animate !== 'function') return;

        // Ослабляем амплитуду вместо отключения: scale тянется к 1,
        // качание становится мягче, но остаётся заметным.
        const k = this.motionScale();
        if (k <= 0) return;

        // easing задаётся НА КАДРАХ, а не в опциях: в CSS
        // animation-timing-function применяется к каждому интервалу между
        // кадрами, а опция easing у animate() ремапит время всей итерации
        // целиком — из-за этого кривая качания получалась совсем другой.
        const frames = (axis === 'h' ? JELLY_H : JELLY_V)
            .map(([sx, sy, offset]) => ({
                transform: `scale(${1 + (sx - 1) * k}, ${1 + (sy - 1) * k})`,
                offset,
                easing: JELLY_EASING
            }));

        const anim = t.body.animate(frames, {
            duration: JELLY_MS,
            // fill не нужен: последний кадр scale(1,1) совпадает с базовым
            // состоянием, поэтому inline-transform при перетаскивании
            // больше ничем не перебивается
            fill: 'none'
        });
        t.jelly = anim;

        // Сверяемся с identity: cancel() ставит oncancel в ОЧЕРЕДЬ, поэтому
        // колбэк отменённой анимации срабатывает уже после того как в t.jelly
        // записана новая. Без проверки он затирал ссылку на живую анимацию,
        // и stopJelly() становился no-op.
        const clear = () => { if (t.jelly === anim) t.jelly = null; };
        anim.onfinish = clear;
        anim.oncancel = clear;
    }

    /** Гасит недоигранное желе — например когда фишку схватили на полпути. */
    stopJelly(t) {
        if (!t.jelly) return;
        t.jelly.cancel();
        t.jelly = null;
    }

    /* -------------------------------- Правила ----------------------------- */

    getEmptyNeighbors(r, c) {
        const out = [];
        for (const d of DIRS) {
            const nr = r + d.dr;
            const nc = c + d.dc;
            if (nr < 0 || nr >= this.rows || nc < 0 || nc >= this.cols) continue;
            if (this.grid[nr][nc] === null) out.push({ r: nr, c: nc, dir: d.dir });
        }
        return out;
    }

    /** Можно ли сбросить фишку из этой клетки в банку под её столбцом. */
    canDrop(t) {
        const cont = this.containers[t.c];
        return t.r === this.rows - 1
            && !!cont
            && t.chip.color === cont.color
            && cont.current < cont.max
            && !this.isDropping
            && !this.settling.has(t.chip.id);
    }

    saveState() {
        this.history.push({
            grid: this.grid.map((row) => row.map((chip) => (chip ? { ...chip } : null))),
            containers: this.containers.map((c) => ({ ...c })),
            moves: this.moves
        });
        if (this.history.length > HISTORY_LIMIT) this.history.shift();
    }

    moveTileTo(fromR, fromC, toR, toC) {
        if (this.isDropping) return false;
        if (this.grid[toR][toC] !== null) return false;

        const chip = this.grid[fromR][fromC];
        if (!chip) return false;
        const t = this.tiles.get(chip.id);
        if (!t) return false;

        this.saveState();

        this.grid[toR][toC] = chip;
        this.grid[fromR][fromC] = null;
        t.r = toR;
        t.c = toC;
        this.moves++;

        const axis = Math.abs(toC - fromC) > Math.abs(toR - fromR) ? 'h' : 'v';
        this.positionTile(t, true);
        this.playJelly(t, axis);
        this.sound.playSlide();

        // Стрелка сброса должна зажигаться, только когда фишка реально доехала.
        this.settling.add(chip.id);
        setTimeout(() => {
            this.settling.delete(chip.id);
            this.refreshStates();
        }, MOVE_MS);

        this.syncCells();
        this.refreshStates();
        this.updateHud();
        return true;
    }

    dropChip(col) {
        if (this.isDropping) return;

        const bottom = this.rows - 1;
        const chip = this.grid[bottom][col];
        const cont = this.containers[col];
        if (!chip || !cont) return;

        const t = this.tiles.get(chip.id);
        if (!t || !this.canDrop(t)) return;

        this.isDropping = true;
        this.stopJelly(t); // недоигранное желе не должно трястись в полёте
        this.saveState();
        this.refreshStates();
        this.updateHud();

        const jarRect = this.jars[col].el.getBoundingClientRect();
        const tileRect = t.el.getBoundingClientRect();

        // Переносим саму фишку в fixed-слой: без клонов, без дублей слушателей
        // и без «мигания» оригинала под клоном.
        t.el.classList.add('is-flying');
        t.el.style.transition = 'none';
        t.el.style.transform = 'none';
        t.el.style.left = `${tileRect.left}px`;
        t.el.style.top = `${tileRect.top}px`;
        t.el.style.width = `${tileRect.width}px`;
        t.el.style.height = `${tileRect.height}px`;
        document.body.appendChild(t.el);

        const dx = jarRect.left + (jarRect.width - tileRect.width) / 2 - tileRect.left;
        const dy = jarRect.top + 8 - tileRect.top;

        let settled = false;
        const finish = () => {
            if (settled) return;
            settled = true;

            this.tiles.delete(chip.id);
            t.el.remove();
            this.grid[bottom][col] = null;
            cont.current++;
            this.isDropping = false;

            this.sound.playDrop();
            this.updateJars();
            this.syncCells();
            this.refreshStates();
            this.updateHud();
            this.checkVictory();
        };

        if (typeof t.el.animate !== 'function') {
            finish();
            return;
        }

        const anim = t.el.animate([
            { transform: 'translate(0, 0) scale(1, 1)', opacity: 1 },
            { transform: `translate(${dx * 0.5}px, ${dy * 0.45}px) scale(0.72, 1.38)`, opacity: 1, offset: 0.35 },
            { transform: `translate(${dx}px, ${dy}px) scale(1.12, 0.82)`, opacity: 1, offset: 0.65 },
            { transform: `translate(${dx}px, ${dy + 28}px) scale(0.35, 0.35)`, opacity: 0, offset: 1 }
        ], { duration: DROP_MS, easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', fill: 'forwards' });

        anim.onfinish = finish;
        anim.oncancel = finish;
        // Страховка: если анимацию отбросят или её таймлайн подвиснет (свёрнутая
        // вкладка, throttling), onfinish не придёт и isDropping залипнет навсегда.
        // finish() идемпотентен, так что повторный вызов безопасен.
        setTimeout(finish, DROP_MS + 400);
    }

    undo() {
        if (this.isDropping || !this.history.length) return;

        const snapshot = this.history.pop();
        this.grid = snapshot.grid;
        this.containers = snapshot.containers;
        this.moves = snapshot.moves;
        this.settling.clear();
        this.activePointer = null;

        // Откат может вернуть фишку, уже улетевшую в банку, поэтому слой
        // пересобирается целиком. Это редкая операция, в отличие от хода.
        this.rebuildTiles();
        this.updateJars();
        this.syncCells();
        this.refreshStates();
        this.updateHud();
        this.sound.playUndo();
    }

    /* ------------------------------- Отрисовка ---------------------------- */

    /** Пустые клетки рисуются иначе — только переключение класса, без пересборки. */
    syncCells() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.cellEls[r][c].classList.toggle('is-empty', this.grid[r][c] === null);
            }
        }
    }

    refreshStates() {
        const bottom = this.rows - 1;

        this.arrows.forEach((arrow, c) => {
            const chip = this.grid[bottom][c];
            const t = chip ? this.tiles.get(chip.id) : null;
            const ready = !!t && this.canDrop(t);
            arrow.el.classList.toggle('is-active', ready);
            arrow.use.setAttribute('href', ready ? '#i-circle-arrow-down' : '#i-chevron-down');
        });

        this.tiles.forEach((t) => {
            const ready = this.canDrop(t);
            const canMove = ready || this.getEmptyNeighbors(t.r, t.c).length > 0;
            t.el.classList.toggle('is-ready', ready);
            t.el.classList.toggle('is-stuck', !canMove);
        });
    }

    updateJars() {
        this.containers.forEach((cont, idx) => {
            const jar = this.jars[idx];
            if (!jar) return;

            jar.fill.style.height = `${(cont.current / cont.max) * 100}%`;
            jar.label.textContent = `${cont.current}/${cont.max}`;
            jar.dots.forEach((dot, i) => {
                dot.classList.toggle(jar.cfg.chipClass, i < cont.current);
            });

            const isFull = cont.current >= cont.max;
            if (isFull && !jar.done) {
                const emojis = jar.cfg.womanEmojis || ['👩'];
                const done = document.createElement('div');
                done.className = 'jar__done';
                done.innerHTML = `
                    <div class="jar__thanks">Thank you!</div>
                    <div class="jar__face">${emojis[idx % emojis.length]}</div>`;
                jar.el.appendChild(done);
                jar.done = done;
            } else if (!isFull && jar.done) {
                jar.done.remove();
                jar.done = null;
            }
        });
    }

    updateHud() {
        this.dom.movesCounter.textContent = String(this.moves);
        this.dom.btnUndo.disabled = this.isDropping || this.history.length === 0;
    }

    checkVictory() {
        if (!this.containers.every((c) => c.current >= c.max)) return;

        setTimeout(() => {
            this.sound.playWin();
            this.dom.finalMoves.textContent = String(this.moves);
            this.dom.finalStars.innerHTML =
                '<svg aria-hidden="true"><use href="#i-star"></use></svg>'.repeat(3);
            this.dom.modal.hidden = false;
        }, 600);
    }

    /* ------------------------------- Подсказки ---------------------------- */

    showHints(neighbors, arrowCol) {
        this.clearHints();
        neighbors.forEach((n) => {
            const cell = this.cellEls[n.r] && this.cellEls[n.r][n.c];
            if (!cell) return;
            const hint = document.createElement('div');
            hint.className = 'cell__hint';
            cell.appendChild(hint);
        });
        if (arrowCol >= 0 && this.arrows[arrowCol]) {
            this.arrows[arrowCol].el.classList.add('is-hinted');
        }
    }

    clearHints() {
        this.dom.grid.querySelectorAll('.cell__hint').forEach((el) => el.remove());
        this.arrows.forEach((a) => a.el.classList.remove('is-hinted'));
    }

    /* --------------------------------- Ввод ------------------------------- */

    attachDrag(t) {
        let pid = null;
        let startX = 0, startY = 0;
        let neighbors = [];
        let dropAllowed = false;
        let size = 0;

        const detach = () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onCancel);
        };

        /** Завершает жест: снимает визуал, освобождает лок и выполняет действие. */
        const finish = (dir) => {
            detach();
            try {
                if (pid !== null) t.el.releasePointerCapture(pid);
            } catch (_) { /* синтетический pointerId — capture не выдавался */ }

            if (this.activePointer === pid) this.activePointer = null;
            pid = null;

            t.el.classList.remove('is-dragging');
            t.body.style.transform = '';
            this.clearHints();

            if (dir === 'DOWN' && dropAllowed) {
                this.dropChip(t.c);
                return true;
            }
            const target = neighbors.find((n) => n.dir === dir);
            // Позицию НЕ сбрасываем заранее: переезд стартует из точки, где
            // палец отпустил фишку, поэтому жест переходит в ход непрерывно.
            if (target && this.moveTileTo(t.r, t.c, target.r, target.c)) return true;

            // Ход не состоялся — плавно возвращаем фишку на место.
            this.slideTo(t, t.baseX, t.baseY);
            return false;
        };

        const onMove = (e) => {
            if (pid === null || e.pointerId !== pid) return;
            if (e.cancelable) e.preventDefault();

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const has = (d) => neighbors.some((n) => n.dir === d);

            // тянуть можно только туда, где есть куда двигаться
            let cx = 0, cy = 0;
            if (dx < 0 && has('LEFT')) cx = Math.max(dx, -size);
            if (dx > 0 && has('RIGHT')) cx = Math.min(dx, size);
            if (dy < 0 && has('UP')) cy = Math.max(dy, -size);
            if (dy > 0 && (has('DOWN') || dropAllowed)) cy = Math.min(dy, size);

            const threshold = size * 0.4;
            if (Math.abs(cx) >= threshold) {
                finish(cx > 0 ? 'RIGHT' : 'LEFT');
                return;
            }
            if (Math.abs(cy) >= threshold) {
                finish(cy > 0 ? 'DOWN' : 'UP');
                return;
            }

            const ratio = Math.min(Math.hypot(cx, cy) / size, 1);
            const sx = cx !== 0 ? 1 + ratio * 0.2 : 1 - ratio * 0.15;
            const sy = cy !== 0 ? 1 + ratio * 0.2 : 1 - ratio * 0.15;
            this.setTransform(t, t.baseX + cx, t.baseY + cy);
            t.body.style.transform = `scale(${sx}, ${sy})`;
        };

        const onUp = (e) => {
            if (pid === null || e.pointerId !== pid) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            if (Math.hypot(dx, dy) < TAP_SLOP) {
                // тап: выполняем ход, только если он однозначен
                if (dropAllowed) finish('DOWN');
                else if (neighbors.length === 1) finish(neighbors[0].dir);
                else finish(null);
                return;
            }

            finish(Math.abs(dx) > Math.abs(dy)
                ? (dx > 0 ? 'RIGHT' : 'LEFT')
                : (dy > 0 ? 'DOWN' : 'UP'));
        };

        const onCancel = (e) => {
            if (pid === null || (e && e.pointerId !== pid)) return;
            finish(null);
        };

        const onDown = (e) => {
            if (e.button !== undefined && e.button !== 0) return;
            // второй палец во время перетаскивания или анимации сброса — игнор
            if (this.activePointer !== null || this.isDropping) return;
            if (this.settling.has(t.chip.id)) return;

            e.preventDefault();

            pid = e.pointerId;
            this.activePointer = pid;
            startX = e.clientX;
            startY = e.clientY;

            // Окружение считаем на момент захвата: элемент фишки живёт весь
            // уровень, а поле вокруг него меняется каждый ход.
            neighbors = this.getEmptyNeighbors(t.r, t.c);
            dropAllowed = this.canDrop(t);
            size = this.tileSize || 70;

            try {
                t.el.setPointerCapture(pid);
            } catch (_) { /* не критично */ }

            // Желе живёт 650 мс, а хватать фишку можно уже через MOVE_MS.
            // Анимация сильнее inline-стиля, поэтому недоигранное желе
            // глушило бы squash при перетаскивании — гасим его.
            this.stopJelly(t);

            t.el.classList.add('is-dragging');
            window.addEventListener('pointermove', onMove, { passive: false });
            window.addEventListener('pointerup', onUp);
            window.addEventListener('pointercancel', onCancel);

            this.showHints(neighbors, dropAllowed ? t.c : -1);
        };

        t.el.addEventListener('pointerdown', onDown);
        // страховка для старых WebKit, где pointerdown не гасит нативный скролл
        t.el.addEventListener('touchstart', (e) => {
            if (e.cancelable) e.preventDefault();
        }, { passive: false });

        // Подсветка по наведению — только для настоящей мыши: на тач-устройствах
        // mouseenter эмулируется по тапу и подсказка «залипает».
        if (window.HAS_HOVER) {
            t.el.addEventListener('mouseenter', () => {
                if (this.activePointer !== null) return;
                const n = this.getEmptyNeighbors(t.r, t.c);
                this.showHints(n, this.canDrop(t) ? t.c : -1);
            });
            t.el.addEventListener('mouseleave', () => {
                if (this.activePointer === null) this.clearHints();
            });
        }
    }
}

window.game = new ColorSlideGame();
