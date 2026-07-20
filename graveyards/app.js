/* ═══════════════════════════════════════════════════════════════
   DIGITAL GRAVEYARD — FEATURE-RICH APP LOGIC
   ═══════════════════════════════════════════════════════════════ */

(() => {
    'use strict';

    // ─── Rich Memorial Data ───
    let memorialsData = [];

    const FALLBACK_DATA = [
        {
            id: 1,
            name: 'Eleanor Whitmore',
            birth: '1942-03-15',
            death: '2024-11-02',
            epitaph: '"She danced through life with grace and left the world more beautiful."',
            bio: 'Eleanor was a beloved painter, gardener, and grandmother of six. Her watercolors of the English countryside hung in galleries from London to Edinburgh. She believed that beauty was not something you find — it was something you create, one brushstroke at a time. Her laughter could fill a room and her kindness knew no bounds.',
            images: [
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=500&fit=crop&crop=faces',
                'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=200&h=200&fit=crop&crop=faces',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=faces'
            ],
            tags: ['Artist', 'Grandmother', 'Gardener'],
            song: '"La Vie en Rose" — Édith Piaf',
            location: 'London, England',
            timeline: [
                { year: '1942', event: 'Born in Cambridge, England' },
                { year: '1964', event: 'Graduated from the Royal College of Art' },
                { year: '1970', event: 'First solo exhibition in London' },
                { year: '1988', event: 'Awarded the Order of the British Empire for contributions to art' },
                { year: '2024', event: 'Passed peacefully, surrounded by family' }
            ],
            reactions: { candle: 342, rose: 128, lily: 45, sunflower: 12, bouquet: 67, heart: 201 },
            tributes: [
                { author: 'James W.', text: 'Grandma, your garden still blooms every spring. We think of you with every flower.', time: '2 days ago' },
                { author: 'Sophie R.', text: 'Your paintings hang in my living room. You taught me to see the world in color.', time: '5 days ago' }
            ]
        },
        {
            id: 2,
            name: 'Marcus Chen',
            birth: '1988-07-22',
            death: '2025-01-18',
            epitaph: '"A mind that never stopped exploring, a heart that never stopped caring."',
            bio: 'Marcus was a software engineer and passionate advocate for open-source education. He spent weekends teaching coding to underprivileged youth and believed technology could be the great equalizer. His colleagues remember him for his infectious enthusiasm, his 3 AM commit messages, and his uncanny ability to debug anything with a cup of green tea in hand.',
            images: [
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=500&fit=crop&crop=faces',
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces'
            ],
            tags: ['Engineer', 'Teacher', 'Open Source'],
            song: '"Heroes" — David Bowie',
            location: 'San Francisco, USA',
            timeline: [
                { year: '1988', event: 'Born in Taipei, Taiwan' },
                { year: '2010', event: 'Graduated from Stanford University' },
                { year: '2015', event: 'Founded CodeForAll — free coding workshops for youth' },
                { year: '2020', event: 'Open-source project reached 10,000 contributors' },
                { year: '2025', event: 'Passed suddenly; CodeForAll renamed in his honor' }
            ],
            reactions: { candle: 891, rose: 234, lily: 89, sunflower: 156, bouquet: 45, heart: 678 },
            tributes: [
                { author: 'Dev Community', text: 'Your open-source contributions live on in thousands of projects worldwide.', time: '1 day ago' },
                { author: 'Lisa M.', text: 'You taught my daughter to code. She just got her first internship. Thank you, Marcus.', time: '3 days ago' },
                { author: 'Raj P.', text: 'Still using your debugging framework daily. Legend.', time: '1 week ago' }
            ]
        },
        {
            id: 3,
            name: 'Isabelle Fontaine',
            birth: '1955-12-08',
            death: '2025-05-30',
            epitaph: '"Her music was the bridge between hearts that words could never reach."',
            bio: 'Isabelle was a concert cellist who performed with the Paris Philharmonic for over 30 years. After retiring from the stage, she opened a small music school in her hometown of Lyon, where she taught children that music was not about perfection — it was about feeling. Her rendition of Bach\'s Cello Suite No. 1 could bring an audience to tears.',
            images: [
                'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=500&fit=crop&crop=faces'
            ],
            tags: ['Musician', 'Cellist', 'Teacher'],
            song: '"Cello Suite No. 1" — J.S. Bach',
            location: 'Lyon, France',
            timeline: [
                { year: '1955', event: 'Born in Lyon, France' },
                { year: '1975', event: 'Joined the Paris Philharmonic Orchestra' },
                { year: '2005', event: 'Retired and opened a music school in Lyon' },
                { year: '2025', event: 'Passed away; school renamed Conservatoire Fontaine' }
            ],
            reactions: { candle: 567, rose: 312, lily: 156, sunflower: 23, bouquet: 89, heart: 445 },
            tributes: [
                { author: 'Pierre D.', text: 'Maman, your cello still sits in the corner of the studio. Sometimes I swear I can hear it play.', time: '4 days ago' },
                { author: 'Marie L.', text: 'You were my first teacher. Every note I play carries a piece of you.', time: '1 week ago' }
            ]
        },
        {
            id: 4,
            name: 'Samuel Okafor',
            birth: '1970-04-03',
            death: '2024-08-15',
            epitaph: '"He built bridges — between communities, between cultures, between hearts."',
            bio: 'Samuel was a civil engineer turned community organizer in Lagos. He led infrastructure projects that brought clean water to over 50 rural villages across Nigeria. His philosophy was simple: every person deserves dignity, and dignity starts with the basics. He was a father, a mentor, and to many, a hero who never sought the spotlight.',
            images: [
                'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=600&h=500&fit=crop&crop=faces',
                'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces'
            ],
            tags: ['Engineer', 'Humanitarian', 'Father'],
            song: '"Redemption Song" — Bob Marley',
            location: 'Lagos, Nigeria',
            timeline: [
                { year: '1970', event: 'Born in Enugu, Nigeria' },
                { year: '1995', event: 'Graduated as a civil engineer from University of Lagos' },
                { year: '2005', event: 'First clean water project completed' },
                { year: '2018', event: 'Milestone: 50 villages with clean water access' },
                { year: '2024', event: 'Passed away; foundation continues his work' }
            ],
            reactions: { candle: 1203, rose: 567, lily: 234, sunflower: 89, bouquet: 345, heart: 890 },
            tributes: [
                { author: 'Amara O.', text: 'Papa, the wells you built still bring water to our village. Your legacy flows.', time: '6 days ago' },
                { author: 'NGO Partners', text: 'Your vision transformed communities. We carry your mission forward.', time: '2 weeks ago' }
            ]
        },
        {
            id: 5,
            name: 'Lily Hargrove',
            birth: '2001-09-14',
            death: '2025-03-22',
            epitaph: '"A shooting star — brief and brilliant, lighting up every sky she crossed."',
            bio: 'Lily was a marine biology student at UC Santa Cruz with an infectious love for ocean life. She spent her summers volunteering at marine sanctuaries and dreamed of establishing a coral reef restoration program. Despite her brief time on earth, she touched countless lives with her bright spirit, her terrible puns, and her unwavering belief that we could save the oceans.',
            images: [
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=500&fit=crop&crop=faces',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces'
            ],
            tags: ['Student', 'Marine Biologist', 'Volunteer'],
            song: '"Somewhere Over the Rainbow" — Israel Kamakawiwoʻole',
            location: 'Santa Cruz, USA',
            timeline: [
                { year: '2001', event: 'Born in Portland, Oregon' },
                { year: '2019', event: 'Enrolled at UC Santa Cruz, Marine Biology' },
                { year: '2022', event: 'Co-founded Ocean Hearts coral restoration initiative' },
                { year: '2025', event: 'Passed away; scholarship established in her name' }
            ],
            reactions: { candle: 2104, rose: 890, lily: 567, sunflower: 345, bouquet: 234, heart: 1567 },
            tributes: [
                { author: 'Mom & Dad', text: 'Our little mermaid. The ocean misses you as much as we do.', time: '1 day ago' },
                { author: 'UC Santa Cruz', text: 'The scholarship in your name will help students continue your dream.', time: '3 days ago' },
                { author: 'Jake T.', text: 'You made me care about the ocean. I\'m finishing what you started.', time: '1 week ago' }
            ]
        },
        {
            id: 6,
            name: 'Arthur Brennan',
            birth: '1930-01-28',
            death: '2024-12-25',
            epitaph: '"A life well-lived is the greatest story ever told."',
            bio: 'Arthur was a World War II historian, retired schoolteacher, and beloved figure in his small Vermont community. For 40 years, he taught history not as a list of dates, but as a tapestry of human stories. Every Veteran\'s Day, he organized the town ceremony, reminding everyone that freedom is never free. He passed peacefully on Christmas morning, surrounded by family, at the age of 94.',
            images: [
                'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&h=500&fit=crop&crop=faces'
            ],
            tags: ['Veteran', 'Teacher', 'Historian'],
            song: '"What a Wonderful World" — Louis Armstrong',
            location: 'Woodstock, Vermont',
            timeline: [
                { year: '1930', event: 'Born in Boston, Massachusetts' },
                { year: '1952', event: 'Began teaching history at Woodstock High School' },
                { year: '1975', event: 'Published "Voices of the Front" — oral histories of WWII' },
                { year: '1992', event: 'Retired after 40 years of teaching' },
                { year: '2024', event: 'Passed on Christmas morning, age 94' }
            ],
            reactions: { candle: 756, rose: 234, lily: 167, sunflower: 56, bouquet: 123, heart: 345 },
            tributes: [
                { author: 'Former Students', text: 'Mr. Brennan made us love history. He made us love learning.', time: '2 weeks ago' },
                { author: 'Town of Woodstock', text: 'The town flag flew at half-mast. You were our heart.', time: '3 weeks ago' }
            ]
        }
    ];

    async function fetchMemorials() {
        try {
            const res = await fetch('/api/memorials');
            if (res.ok) {
                memorialsData = await res.json();
                renderFeatured();
                renderCards(getFilteredData());
                renderBookmarksDrawer();
                return;
            }
        } catch (e) {
            console.warn('Failed to fetch from Python API. Falling back to static demo data.', e);
        }
        
        // Fallback for Vercel / static hosting
        memorialsData = [...FALLBACK_DATA];
        renderFeatured();
        renderCards(getFilteredData());
        renderBookmarksDrawer();
    }

    // Quotes rotation
    const quotes = [
        { text: '"What we once enjoyed and deeply loved we can never lose, for all that we love deeply becomes part of us."', author: '— Helen Keller' },
        { text: '"The song is ended, but the melody lingers on."', author: '— Irving Berlin' },
        { text: '"Those we love don\'t go away, they walk beside us every day."', author: '— Unknown' },
        { text: '"To live in hearts we leave behind is not to die."', author: '— Thomas Campbell' },
        { text: '"Death leaves a heartache no one can heal, love leaves a memory no one can steal."', author: '— Irish Proverb' }
    ];

    // Activity feed data
    const activityFeed = [
        { emoji: '🕯', text: '<strong>Sarah M.</strong> lit a candle for <strong>Lily Hargrove</strong>', time: '2 min ago' },
        { emoji: '🌹', text: '<strong>James W.</strong> sent roses to <strong>Eleanor Whitmore</strong>', time: '8 min ago' },
        { emoji: '💬', text: '<strong>Raj P.</strong> left a tribute on <strong>Marcus Chen\'s</strong> memorial', time: '15 min ago' },
        { emoji: '🕊', text: '<strong>Amara O.</strong> created a memorial for <strong>Grace Udo</strong>', time: '32 min ago' },
        { emoji: '🌷', text: '<strong>Marie L.</strong> sent lilies to <strong>Isabelle Fontaine</strong>', time: '1 hour ago' },
        { emoji: '🕯', text: '<strong>Anonymous</strong> lit a candle for <strong>Arthur Brennan</strong>', time: '2 hours ago' },
        { emoji: '❤️', text: '<strong>Jake T.</strong> sent love to <strong>Lily Hargrove</strong>', time: '3 hours ago' },
        { emoji: '💐', text: '<strong>NGO Partners</strong> sent a bouquet to <strong>Samuel Okafor</strong>', time: '5 hours ago' },
    ];

    // ─── State ───
    let currentFilter = 'all';
    let bookmarks = new Set();
    let userReactions = {};
    
    try { bookmarks = new Set(JSON.parse(localStorage.getItem('dg_bookmarks') || '[]')); } catch(e) { console.error(e); }
    try { userReactions = JSON.parse(localStorage.getItem('dg_reactions') || '{}'); } catch(e) { console.error(e); }

    // ─── Helpers ───
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);
    const grid = $('#memorials-grid');
    const memorialModal = $('#memorial-modal');
    const createModal = $('#create-modal');
    const toast = $('#toast');

    function getInitials(name) { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }
    function formatDate(dateStr) {
        if (!dateStr) return '—';
        return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    function getTotalReactions(mem) { return Object.values(mem.reactions).reduce((a, b) => a + b, 0); }
    function saveBookmarks() { localStorage.setItem('dg_bookmarks', JSON.stringify([...bookmarks])); }
    function saveReactions() { localStorage.setItem('dg_reactions', JSON.stringify(userReactions)); }


    // ─── Scroll / Counters ───
    function initScrollEffects() {
        const nav = $('#main-nav');
        const scrollTopBtn = $('#scroll-top');

        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 40);
            if (scrollTopBtn) {
                scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
            }
        }, { passive: true });

        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { animateCounters(); statObserver.unobserve(entry.target); } });
        }, { threshold: 0.5 });
        const statsBar = $('#stats-bar');
        if (statsBar) statObserver.observe(statsBar);
    }

    function animateCounters() {
        $$('.stat-number[data-count]').forEach(el => {
            const target = parseInt(el.dataset.count), duration = 1600, start = performance.now();
            (function update(now) {
                const p = Math.min((now - start) / duration, 1);
                el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString();
                if (p < 1) requestAnimationFrame(update);
            })(start);
        });
    }

    // ─── Live counter simulation ───
    function initLiveCounter() {
        const el = $('#live-count');
        if (!el) return;
        let count = 47;
        setInterval(() => {
            count += Math.floor(Math.random() * 3) - 1;
            count = Math.max(30, Math.min(80, count));
            el.textContent = count;
        }, 8000);
    }


    // ─── Quote Rotation ───
    function initQuoteRotation() {
        let idx = 0;
        const textEl = $('#quote-text'), authorEl = $('#quote-author');
        if (!textEl) return;
        setInterval(() => {
            textEl.style.transition = 'opacity 0.3s ease';
            authorEl.style.transition = 'opacity 0.3s ease';
            textEl.style.opacity = '0';
            authorEl.style.opacity = '0';
            
            setTimeout(() => {
                idx = (idx + 1) % quotes.length;
                textEl.textContent = quotes[idx].text;
                authorEl.textContent = quotes[idx].author;
                textEl.style.opacity = '1';
                authorEl.style.opacity = '1';
            }, 300);
        }, 12000);
    }


    // ─── Featured Memorial ───
    function renderFeatured() {
        const featured = memorialsData.reduce((best, m) => getTotalReactions(m) > getTotalReactions(best) ? m : best, memorialsData[0]);
        const card = $('#featured-card');
        if (!card) return;

        card.innerHTML = `
            ${featured.images[0]
                ? `<img class="featured-image" src="${featured.images[0]}" alt="${featured.name}" loading="lazy">`
                : `<div class="featured-image-placeholder">${getInitials(featured.name)}</div>`
            }
            <div class="featured-body">
                <div class="featured-badge">⭐ Most Loved Memorial</div>
                <h3 class="featured-name">${featured.name}</h3>
                <p class="featured-dates">${formatDate(featured.birth)} — ${formatDate(featured.death)}${featured.location ? ' · ' + featured.location : ''}</p>
                <p class="featured-epitaph">${featured.epitaph}</p>
                <p class="featured-bio">${featured.bio}</p>
                <div class="featured-tags">${featured.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                <div class="featured-stats">
                    <div class="featured-stat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2c-1 3-3 5-3 8a3 3 0 006 0c0-3-2-5-3-8z"/><rect x="11" y="12" width="2" height="8" rx="1"/></svg>
                        ${featured.reactions.candle.toLocaleString()} candles
                    </div>
                    <div class="featured-stat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                        ${getTotalReactions(featured).toLocaleString()} reactions
                    </div>
                    <div class="featured-stat">💬 ${featured.tributes.length} tributes</div>
                </div>
            </div>
        `;

        const featuredImg = card.querySelector('.featured-image');
        if (featuredImg) {
            featuredImg.onerror = () => {
                featuredImg.parentElement.innerHTML = `<div class="featured-image-placeholder">${getInitials(featured.name)}</div>`;
            };
        }

        card.addEventListener('click', () => openMemorialModal(featured));
    }


    // ─── Activity Feed ───
    function renderActivityFeed() {
        const list = $('#activity-list');
        if (!list) return;
        list.innerHTML = activityFeed.map(a => `
            <div class="activity-item">
                <div class="activity-avatar">${a.emoji}</div>
                <p class="activity-text">${a.text}</p>
                <span class="activity-time">${a.time}</span>
            </div>
        `).join('');
    }


    // ─── Render Cards ───
    function renderCards(data) {
        grid.innerHTML = '';
        if (data.length === 0) {
            grid.innerHTML = '<p class="empty-state">No memorials found.</p>';
            return;
        }
        data.forEach((mem, i) => {
            const card = document.createElement('div');
            card.className = 'memorial-card';
            card.dataset.id = mem.id;
            card.tabIndex = 0;
            const isBookmarked = bookmarks.has(mem.id);
            const topReactions = Object.entries(mem.reactions).sort((a, b) => b[1] - a[1]).slice(0, 3);
            const emojiMap = { candle: '🕯', rose: '🌹', lily: '🌷', sunflower: '🌻', bouquet: '💐', heart: '❤️' };

            card.innerHTML = `
                <button class="card-bookmark-btn ${isBookmarked ? 'active' : ''}" data-id="${mem.id}" title="${isBookmarked ? 'Remove from saved' : 'Save memorial'}">
                    <svg viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                    </svg>
                </button>
                <div class="card-image-wrapper">
                    ${mem.images && mem.images[0]
                        ? `<img class="card-image" src="${mem.images[0]}" alt="${mem.name}" loading="lazy">`
                        : `<div class="card-image-placeholder" data-initials="${getInitials(mem.name)}"></div>`
                    }
                </div>
                <div class="card-body">
                    <h3 class="card-name">${mem.name}</h3>
                    <p class="card-dates">${formatDate(mem.birth)} — ${formatDate(mem.death)}${mem.location ? ' · ' + mem.location : ''}</p>
                    <p class="card-epitaph">${mem.epitaph}</p>
                    ${mem.tags && mem.tags.length ? `<div class="card-tags">${mem.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
                </div>
                <div class="card-footer">
                    <div class="card-reactions-mini">
                        ${topReactions.map(([type, count]) => `<span title="${count} ${type}s">${emojiMap[type]} ${count}</span>`).join(' ')}
                    </div>
                    <div class="card-stat">💬 ${mem.tributes.length}</div>
                </div>
            `;

            const img = card.querySelector('.card-image');
            if (img) {
                img.onerror = () => {
                    img.parentElement.innerHTML = `<div class="card-image-placeholder" data-initials="${getInitials(mem.name)}"></div>`;
                };
            }

            card.addEventListener('click', (e) => {
                if (e.target.closest('.card-bookmark-btn')) return;
                openMemorialModal(mem);
            });
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') openMemorialModal(mem);
            });

            card.querySelector('.card-bookmark-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                toggleBookmark(mem.id);
            });

            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            grid.appendChild(card);

            requestAnimationFrame(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.transitionDelay = (i * 0.04) + 's';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        });
    }


    // ─── Bookmarks ───
    function toggleBookmark(id) {
        if (bookmarks.has(id)) {
            bookmarks.delete(id);
            showToast('Removed from saved');
        } else {
            bookmarks.add(id);
            showToast('Memorial saved', 'success');
        }
        saveBookmarks();
        updateBookmarkBadge();
        renderCards(getFilteredData());
    }

    function updateBookmarkBadge() {
        const badge = $('#bookmark-badge');
        if (badge) {
            badge.textContent = bookmarks.size;
            badge.dataset.count = bookmarks.size;
            badge.style.display = bookmarks.size > 0 ? 'flex' : 'none';
        }
    }

    function renderBookmarksDrawer() {
        const list = $('#bookmarks-list');
        if (!list) return;
        const saved = memorialsData.filter(m => bookmarks.has(m.id));
        if (saved.length === 0) {
            list.innerHTML = '<p class="empty-state">No saved memorials yet.</p>';
            return;
        }
        list.innerHTML = saved.map(m => `
            <div class="bookmark-item" data-id="${m.id}">
                ${m.images && m.images[0]
                    ? `<img class="bookmark-thumb" src="${m.images[0]}" alt="${m.name}">`
                    : `<div class="bookmark-thumb-placeholder">${getInitials(m.name)}</div>`
                }
                <div class="bookmark-info">
                    <p class="bookmark-name">${m.name}</p>
                    <p class="bookmark-dates">${formatDate(m.birth)} — ${formatDate(m.death)}</p>
                </div>
                <button class="bookmark-remove" data-id="${m.id}" title="Remove">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `).join('');

        list.querySelectorAll('.bookmark-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.closest('.bookmark-remove')) return;
                const mem = memorialsData.find(m => m.id === parseInt(item.dataset.id));
                if (mem) { closeDrawer(); openMemorialModal(mem); }
            });
        });

        list.querySelectorAll('.bookmark-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleBookmark(parseInt(btn.dataset.id));
                renderBookmarksDrawer();
            });
        });
    }


    // ─── Filtering ───
    function getFilteredData() {
        let data = [...memorialsData];
        const query = ($('#search-input')?.value || '').toLowerCase();

        if (query) {
            data = data.filter(m =>
                m.name.toLowerCase().includes(query) ||
                m.epitaph.toLowerCase().includes(query) ||
                m.bio.toLowerCase().includes(query) ||
                (m.tags && m.tags.some(t => t.toLowerCase().includes(query))) ||
                (m.location && m.location.toLowerCase().includes(query))
            );
        }

        switch (currentFilter) {
            case 'recent':
                data.sort((a, b) => new Date(b.death) - new Date(a.death)); break;
            case 'trending':
                data.sort((a, b) => getTotalReactions(b) - getTotalReactions(a)); break;
            case 'most-loved':
                data.sort((a, b) => b.tributes.length - a.tributes.length); break;
            case 'bookmarked':
                data = data.filter(m => bookmarks.has(m.id)); break;
        }
        return data;
    }

    function initFilters() {
        $$('.filter-tag').forEach(btn => {
            btn.addEventListener('click', () => {
                $$('.filter-tag').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderCards(getFilteredData());
            });
        });
        let debounce;
        $('#search-input')?.addEventListener('input', () => {
            clearTimeout(debounce);
            debounce = setTimeout(() => renderCards(getFilteredData()), 200);
        });
    }


    // ─── Memorial Modal ───
    let currentModalMem = null;

    function openMemorialModal(mem) {
        currentModalMem = mem;

        // Cover image
        const imgSection = $('#modal-image-section');
        const coverImg = $('#modal-cover-img');
        if (mem.images && mem.images[0]) {
            imgSection.style.display = 'block';
            coverImg.src = mem.images[0];
            coverImg.alt = mem.name;
            coverImg.onclick = () => openLightbox(coverImg.src);
            coverImg.onerror = () => {
                coverImg.parentElement.innerHTML = `<div class="card-image-placeholder" data-initials="${getInitials(mem.name)}"></div>`;
            };
        } else {
            imgSection.style.display = 'none';
        }

        // Gallery thumbnails
        const gallery = $('#modal-gallery');
        if (mem.images && mem.images.length > 1) {
            gallery.innerHTML = mem.images.map((img, i) =>
                `<img src="${img}" alt="${mem.name} photo ${i + 1}" class="${i === 0 ? 'active' : ''}" data-src="${img}">`
            ).join('');
            gallery.querySelectorAll('img').forEach(thumb => {
                thumb.addEventListener('click', () => {
                    const activeCover = $('#modal-cover-img');
                    if (activeCover) activeCover.src = thumb.dataset.src;
                    gallery.querySelectorAll('img').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
            });
        } else {
            gallery.innerHTML = '';
        }

        // Tags
        const tagsEl = $('#modal-tags');
        tagsEl.innerHTML = (mem.tags || []).map(t => `<span class="tag">${t}</span>`).join('');

        // Info
        $('#modal-name').textContent = mem.name;
        $('#modal-dates').textContent = `${formatDate(mem.birth)} — ${formatDate(mem.death)}${mem.location ? ' · ' + mem.location : ''}`;
        $('#modal-epitaph').textContent = mem.epitaph;
        $('#modal-bio').textContent = mem.bio;

        // Media (Audio/Video)
        const mediaSection = $('#modal-media');
        const audioEl = $('#modal-audio');
        const videoEl = $('#modal-video');
        
        let hasMedia = false;
        if (mem.audio_url) {
            audioEl.src = mem.audio_url;
            audioEl.style.display = 'block';
            hasMedia = true;
        } else {
            audioEl.style.display = 'none';
            audioEl.removeAttribute('src');
        }
        
        if (mem.video_url) {
            videoEl.src = mem.video_url;
            videoEl.style.display = 'block';
            hasMedia = true;
        } else {
            videoEl.style.display = 'none';
            videoEl.removeAttribute('src');
        }
        
        if (mediaSection) {
            mediaSection.style.display = hasMedia ? 'block' : 'none';
        }

        // Song
        const songSection = $('#modal-song-section');
        if (mem.song) {
            songSection.style.display = 'flex';
            $('#modal-song-name').textContent = mem.song;
        } else {
            songSection.style.display = 'none';
        }

        // Timeline
        const timelineSection = $('#modal-timeline');
        if (mem.timeline && mem.timeline.length) {
            timelineSection.style.display = 'block';
            $('#modal-timeline-list').innerHTML = mem.timeline.map(t => `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div>
                        <p class="timeline-year">${t.year}</p>
                        <p class="timeline-text">${t.event}</p>
                    </div>
                </div>
            `).join('');
        } else {
            timelineSection.style.display = 'none';
        }

        // Reactions
        const myReactions = userReactions[mem.id] || {};
        const emojiMap = { candle: '🕯', rose: '🌹', lily: '🌷', sunflower: '🌻', bouquet: '💐', heart: '❤️' };
        Object.keys(emojiMap).forEach(type => {
            const countEl = $(`#reaction-${type}`);
            const total = (mem.reactions[type] || 0) + (myReactions[type] ? 1 : 0);
            if (countEl) countEl.textContent = total.toLocaleString();
        });

        // Update reaction button states
        $$('.reaction-btn').forEach(btn => {
            const type = btn.dataset.type;
            btn.classList.toggle('active', !!(myReactions[type]));
        });

        // Bookmark button
        const bmBtn = $('#modal-bookmark-btn');
        bmBtn.classList.toggle('active', bookmarks.has(mem.id));
        const newBm = bmBtn.cloneNode(true);
        bmBtn.parentNode.replaceChild(newBm, bmBtn);
        newBm.id = 'modal-bookmark-btn';
        newBm.addEventListener('click', () => {
            toggleBookmark(mem.id);
            newBm.classList.toggle('active', bookmarks.has(mem.id));
        });

        // Share
        const shareBtn = $('#modal-share-btn');
        const newShare = shareBtn.cloneNode(true);
        shareBtn.parentNode.replaceChild(newShare, shareBtn);
        newShare.id = 'modal-share-btn';
        newShare.addEventListener('click', () => {
            const url = `${window.location.origin}${window.location.pathname}?memorial=${mem.id}`;
            navigator.clipboard.writeText(url).then(() => showToast('Link copied to clipboard', 'success'));
        });

        // Reaction buttons
        $$('.reaction-btn').forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', async () => {
                if (newBtn.disabled) return;
                newBtn.disabled = true;

                const type = newBtn.dataset.type;
                if (!userReactions[mem.id]) userReactions[mem.id] = {};
                if (userReactions[mem.id][type]) {
                    // We don't support removing reactions in this simple API, so just ignore
                    setTimeout(() => newBtn.disabled = false, 300);
                    return;
                }
                
                userReactions[mem.id][type] = true;
                newBtn.classList.add('active');
                saveReactions();

                const countEl = $(`#reaction-${type}`);
                
                try {
                    const fd = new FormData();
                    fd.append('type', type);
                    const res = await fetch(`/api/memorials/${mem.id}/react`, {
                        method: 'POST',
                        body: fd
                    });
                    if (res.ok) {
                        const data = await res.json();
                        if (countEl) countEl.textContent = data.count.toLocaleString();
                        // Update local object so it stays consistent before next fetch
                        if (!mem.reactions) mem.reactions = {};
                        mem.reactions[type] = data.count;
                        renderCards(getFilteredData());
                    }
                } catch (e) {
                    console.error('Reaction failed', e);
                } finally {
                    setTimeout(() => newBtn.disabled = false, 300);
                }
            });
        });

        // Tributes
        $('#modal-tributes-count').textContent = mem.tributes ? mem.tributes.length : 0;
        const tributesList = $('#modal-tributes-list');
        tributesList.innerHTML = (mem.tributes || []).map(t => `
            <div class="tribute-item">
                <p class="tribute-author">${t.author}</p>
                <p class="tribute-text">${t.text}</p>
                ${t.time ? `<p class="tribute-time">${t.time}</p>` : ''}
            </div>
        `).join('');

        // Tribute submit
        const submitBtn = $('#submit-tribute-btn');
        const newSubmit = submitBtn.cloneNode(true);
        submitBtn.parentNode.replaceChild(newSubmit, submitBtn);
        newSubmit.id = 'submit-tribute-btn';
        newSubmit.addEventListener('click', async () => {
            const textInput = $('#tribute-input');
            const authorInput = $('#tribute-author-input');
            const text = textInput.value.trim();
            const author = authorInput.value.trim() || 'Anonymous';
            if (!text) {
                textInput.style.borderColor = 'hsl(0,60%,50%)';
                setTimeout(() => textInput.style.borderColor = '', 1500);
                return;
            }
            
            try {
                newSubmit.disabled = true;
                newSubmit.textContent = '...';
                
                const fd = new FormData();
                fd.append('author', author);
                fd.append('text', text);
                
                const res = await fetch(`/api/memorials/${mem.id}/tribute`, {
                    method: 'POST',
                    body: fd
                });
                if (res.ok) {
                    const data = await res.json();
                    if (!mem.tributes) mem.tributes = [];
                    mem.tributes.unshift({ author: data.author, text, time: data.time });
                    textInput.value = '';
                    authorInput.value = '';
                    openMemorialModal(mem);
                }
            } catch (e) {
                console.error(e);
                showToast('Failed to post tribute', 'error');
            } finally {
                newSubmit.disabled = false;
                newSubmit.textContent = 'Leave Tribute';
            }
        });

        memorialModal.classList.add('active');
        memorialModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }


    // ─── Lightbox ───
    function openLightbox(src) {
        const lb = $('#lightbox');
        $('#lightbox-img').src = src;
        lb.classList.add('active');
        lb.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        const lb = $('#lightbox');
        lb.classList.remove('active');
        lb.setAttribute('aria-hidden', 'true');
    }


    // ─── Modals / Drawers ───
    function closeModal(modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function openDrawer() {
        renderBookmarksDrawer();
        const drawer = $('#bookmarks-drawer');
        drawer.classList.add('active');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        const drawer = $('#bookmarks-drawer');
        drawer.classList.remove('active');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function initModals() {
        $('#modal-close-btn')?.addEventListener('click', () => closeModal(memorialModal));
        memorialModal?.addEventListener('click', (e) => { if (e.target === memorialModal) closeModal(memorialModal); });

        $('#nav-bookmarks-btn')?.addEventListener('click', openDrawer);
        $('#drawer-close-btn')?.addEventListener('click', closeDrawer);
        $('#bookmarks-drawer')?.addEventListener('click', (e) => { if (e.target.id === 'bookmarks-drawer') closeDrawer(); });

        $('#lightbox-close')?.addEventListener('click', closeLightbox);
        $('#lightbox')?.addEventListener('click', (e) => { if (e.target.id === 'lightbox') closeLightbox(); });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if ($('#lightbox')?.classList.contains('active')) closeLightbox();
                else if (memorialModal?.classList.contains('active')) closeModal(memorialModal);
                else if (createModal?.classList.contains('active')) closeModal(createModal);
                else if ($('#bookmarks-drawer')?.classList.contains('active')) closeDrawer();
            }

            // Gallery navigation
            if (memorialModal?.classList.contains('active')) {
                const galleryImgs = Array.from($$('#modal-gallery img'));
                if (galleryImgs.length > 1) {
                    const activeIdx = galleryImgs.findIndex(img => img.classList.contains('active'));
                    if (activeIdx !== -1) {
                        let nextIdx = activeIdx;
                        if (e.key === 'ArrowRight') nextIdx = (activeIdx + 1) % galleryImgs.length;
                        else if (e.key === 'ArrowLeft') nextIdx = (activeIdx - 1 + galleryImgs.length) % galleryImgs.length;
                        
                        if (nextIdx !== activeIdx) {
                            galleryImgs[activeIdx].classList.remove('active');
                            galleryImgs[nextIdx].classList.add('active');
                            const activeCover = $('#modal-cover-img');
                            if (activeCover) activeCover.src = galleryImgs[nextIdx].dataset.src;
                        }
                    }
                }
            }
        });
    }


    // ─── Create Modal (Multi-step) ───
    function initCreateModal() {
        ['#btn-create-memorial', '#hero-create-btn', '#about-create-btn'].forEach(sel => {
            $(sel)?.addEventListener('click', (e) => {
                e.preventDefault();
                createModal.classList.add('active');
                createModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                goToStep(1);
            });
        });

        $('#create-modal-close')?.addEventListener('click', () => closeModal(createModal));
        createModal?.addEventListener('click', (e) => { if (e.target === createModal) closeModal(createModal); });

        // Step navigation
        $$('.step-next-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const next = parseInt(btn.dataset.next);
                // Validate step 1
                if (next === 2 && !$('#mem-name').value.trim()) {
                    showToast('Please enter a name');
                    return;
                }
                goToStep(next);
            });
        });

        $$('.step-back-btn').forEach(btn => {
            btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.back)));
        });

        // Add milestone
        $('#add-milestone-btn')?.addEventListener('click', () => {
            const container = $('#milestone-inputs');
            const row = document.createElement('div');
            row.className = 'milestone-row';
            row.innerHTML = '<input type="text" placeholder="Year" class="milestone-year"><input type="text" placeholder="Milestone event" class="milestone-event">';
            container.appendChild(row);
        });

        // Submit
        $('#create-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = $('#mem-name').value.trim();
            if (!name) return;

            // Gather milestones
            const milestones = [];
            $$('.milestone-row').forEach(row => {
                const year = row.querySelector('.milestone-year').value.trim();
                const event = row.querySelector('.milestone-event').value.trim();
                if (year && event) milestones.push({ year, event });
            });

            // Gather tags
            const tagsRaw = $('#mem-tags')?.value || '';
            const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
            
            const formData = new FormData();
            formData.append('name', name);
            formData.append('birth_date', $('#mem-birth').value || '');
            formData.append('death_date', $('#mem-death').value || '');
            formData.append('epitaph', $('#mem-epitaph').value || '"Forever in our hearts."');
            formData.append('bio', $('#mem-bio').value || '');
            formData.append('location', $('#mem-location')?.value || '');
            formData.append('tags', JSON.stringify(tags));
            formData.append('timeline', JSON.stringify(milestones));
            
            const imgFile = $('#mem-image')?.files[0];
            if (imgFile) formData.append('image', imgFile);
            
            const audioFile = $('#mem-audio')?.files[0];
            if (audioFile) formData.append('audio', audioFile);
            
            const videoFile = $('#mem-video')?.files[0];
            if (videoFile) formData.append('video', videoFile);

            try {
                const submitBtn = e.target.querySelector('button[type="submit"]');
                const origText = submitBtn.textContent;
                submitBtn.textContent = 'Uploading...';
                submitBtn.disabled = true;

                const res = await fetch('/api/memorials', {
                    method: 'POST',
                    body: formData
                });
                if (!res.ok) throw new Error('Failed to create memorial');
                
                // Refresh data
                await fetchMemorials();
                
                closeModal(createModal);
                e.target.reset();
                // Reset milestone inputs
                const milestoneContainer = $('#milestone-inputs');
                milestoneContainer.innerHTML = '<div class="milestone-row"><input type="text" placeholder="Year" class="milestone-year"><input type="text" placeholder="Milestone event" class="milestone-event"></div>';
                showToast('Memorial created', 'success');
                setTimeout(() => document.getElementById('memorials')?.scrollIntoView({ behavior: 'smooth' }), 300);
            } catch (err) {
                console.error(err);
                showToast('Error creating memorial', 'error');
            } finally {
                const submitBtn = e.target.querySelector('button[type="submit"]');
                submitBtn.textContent = 'Create Eternal Memorial';
                submitBtn.disabled = false;
            }
        });
    }

    function goToStep(step) {
        $$('.form-step-panel').forEach(p => p.classList.remove('active'));
        $(`.form-step-panel[data-panel="${step}"]`)?.classList.add('active');

        $$('.form-step').forEach(s => {
            const sNum = parseInt(s.dataset.step);
            s.classList.remove('active', 'done');
            if (sNum === step) s.classList.add('active');
            else if (sNum < step) s.classList.add('done');
        });

        const progressBar = $('#form-progress');
        if (progressBar) progressBar.style.width = (step / 3 * 100) + '%';
    }


    // ─── Toast ───
    function showToast(message, type = '') {
        if (type === 'success') {
            toast.textContent = '✓ ' + message;
        } else {
            toast.textContent = message;
        }
        toast.className = 'toast show' + (type ? ` ${type}` : '');
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
    }


    // ─── Mobile Menu ───
    function initMobileMenu() {
        const toggle = $('#mobile-menu-toggle');
        const links = $('.nav-links');
        if (!toggle || !links) return;
        toggle.addEventListener('click', () => links.classList.toggle('open'));
        links.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('click', () => links.classList.remove('open'));
        });
    }

    // ─── Smooth Scroll ───
    function initSmoothScroll() {
        $$('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                const target = document.querySelector(a.getAttribute('href'));
                if (target) { 
                    e.preventDefault(); 
                    if (memorialModal?.classList.contains('active')) closeModal(memorialModal);
                    if (createModal?.classList.contains('active')) closeModal(createModal);
                    if ($('#bookmarks-drawer')?.classList.contains('active')) closeDrawer();
                    if ($('#lightbox')?.classList.contains('active')) closeLightbox();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
                }
            });
        });
    }


    // ─── Deep Link ───
    function handleDeepLink() {
        const params = new URLSearchParams(window.location.search);
        const memId = parseInt(params.get('memorial'));
        if (memId) {
            const mem = memorialsData.find(m => m.id === memId);
            if (mem) setTimeout(() => openMemorialModal(mem), 500);
        }
    }

    // ─── Auto Scroll for Screen Recording ───
    function initAutoScroll() {
        let isScrolling = false;
        let scrollSpeed = 1; // pixels per frame

        function autoScroll() {
            if (!isScrolling) return;
            window.scrollBy(0, scrollSpeed);
            
            // Stop if reached the bottom
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                isScrolling = false;
                showToast('Reached the bottom', 'success');
                return;
            }
            requestAnimationFrame(autoScroll);
        }

        document.addEventListener('keydown', (e) => {
            // Trigger on Ctrl + Shift + S
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
                e.preventDefault();
                isScrolling = !isScrolling;
                if (isScrolling) {
                    showToast('Auto-scroll started. Press Ctrl+Shift+S to stop.');
                    requestAnimationFrame(autoScroll);
                } else {
                    showToast('Auto-scroll stopped.');
                }
            }
        });
    }

    // ─── Init ───
    function init() {
        initScrollEffects();
        initLiveCounter();
        initQuoteRotation();
        initFilters();
        initModals();
        initCreateModal();
        initMobileMenu();
        initSmoothScroll();

        renderFeatured();
        renderActivityFeed();
        
        // Fetch data from backend
        fetchMemorials();
        
        updateBookmarkBadge();
        handleDeepLink();
        initAutoScroll();
    }

    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
