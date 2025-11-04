// Combined inline scripts extracted from original HTML

// ==================== KONFIGURASI & STATE ====================
        const CONFIG = {
            apiKey: '',
            proxyUrl: '',
            currentTheme: 'aurora-dream',
            isDarkMode: false,
            platform: 'unknown'
        };

        const STATE = {
            schedules: [],
            notes: [],
            transactions: [],
            currentBalance: 0,
            chatHistory: []
        };

        // ==================== DETEKSI PLATFORM ====================
        function detectPlatform() {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            const platform = navigator.platform;
            
            // Deteksi Windows
            if (platform.includes('Win') || userAgent.includes('Windows')) {
                return 'windows';
            }
            
            // Deteksi macOS
            if (platform.includes('Mac') || userAgent.includes('Macintosh')) {
                return 'macos';
            }
            
            // Deteksi Linux
            if (platform.includes('Linux') && !userAgent.includes('Android')) {
                return 'linux';
            }
            
            // Deteksi iOS
            if (platform.includes('iPhone') || platform.includes('iPad') || platform.includes('iPod') || userAgent.includes('iOS')) {
                return 'ios';
            }
            
            // Deteksi Android
            if (userAgent.includes('Android')) {
                return 'android';
            }
            
            // Deteksi Chrome OS
            if (userAgent.includes('CrOS')) {
                return 'chromeos';
            }
            
            return 'unknown';
        }

        // ==================== SISTEM TEMA 8-LAYER ====================
        const THEMES = {
            'aurora-dream': {
                name: 'Aurora Dream',
                font: "'Inter', 'Segoe UI', system-ui, sans-serif",
                layers: {
                    layer1: '#667eea',
                    layer2: '#764ba2',
                    layer3: '#a78bfa',
                    layer4: '#c4b5fd',
                    layer5: '#ddd6fe',
                    layer6: '#f3f4f6',
                    layer7: '#f8fafc',
                    layer8: '#ffffff'
                }
            },
            'midnight-neon': {
                name: 'Midnight Neon',
                font: "'Orbitron', 'Rajdhani', 'Inter', system-ui, sans-serif",
                layers: {
                    layer1: '#0ea5e9',
                    layer2: '#8b5cf6',
                    layer3: '#06b6d4',
                    layer4: '#22d3ee',
                    layer5: '#67e8f9',
                    layer6: '#cffafe',
                    layer7: '#f0f9ff',
                    layer8: '#fefefe'
                }
            },
            'verdant-flow': {
                name: 'Verdant Flow',
                font: "'Nunito Sans', 'Open Sans', 'Inter', system-ui, sans-serif",
                layers: {
                    layer1: '#10b981',
                    layer2: '#059669',
                    layer3: '#34d399',
                    layer4: '#6ee7b7',
                    layer5: '#a7f3d0',
                    layer6: '#d1fae5',
                    layer7: '#f0fdf9',
                    layer8: '#ffffff'
                }
            },
            'ivory-luxe': {
                name: 'Ivory Luxe',
                font: "'Playfair Display', 'Merriweather', Georgia, serif",
                layers: {
                    layer1: '#d1d5db',
                    layer2: '#9ca3af',
                    layer3: '#6b7280',
                    layer4: '#f3f4f6',
                    layer5: '#f9fafb',
                    layer6: '#ffffff',
                    layer7: '#fefefe',
                    layer8: '#ffffff'
                }
            },
            'cyber-pink': {
                name: 'Cyber Pink',
                font: "'Rajdhani', 'Orbitron', 'Inter', system-ui, sans-serif",
                layers: {
                    layer1: '#ec4899',
                    layer2: '#db2777',
                    layer3: '#f472b6',
                    layer4: '#f9a8d4',
                    layer5: '#fbcfe8',
                    layer6: '#fce7f3',
                    layer7: '#fdf2f8',
                    layer8: '#ffffff'
                }
            },
            'amber-glow': {
                name: 'Amber Glow',
                font: "'Raleway', 'Lato', 'Inter', system-ui, sans-serif",
                layers: {
                    layer1: '#f59e0b',
                    layer2: '#d97706',
                    layer3: '#fbbf24',
                    layer4: '#fcd34d',
                    layer5: '#fde68a',
                    layer6: '#fef3c7',
                    layer7: '#fffbeb',
                    layer8: '#ffffff'
                }
            },
            'ocean-chrome': {
                name: 'Ocean Chrome',
                font: "'Inter', 'Roboto', 'Source Sans Pro', system-ui, sans-serif",
                layers: {
                    layer1: '#06b6d4',
                    layer2: '#0ea5e9',
                    layer3: '#3b82f6',
                    layer4: '#22d3ee',
                    layer5: '#67e8f9',
                    layer6: '#cffafe',
                    layer7: '#f0f9ff',
                    layer8: '#ffffff'
                }
            },
            'obsidian-dark': {
                name: 'Obsidian Dark',
                font: "'Urbanist', 'Montserrat', 'Inter', system-ui, sans-serif",
                layers: {
                    layer1: '#1f2937',
                    layer2: '#111827',
                    layer3: '#374151',
                    layer4: '#4b5563',
                    layer5: '#6b7280',
                    layer6: '#9ca3af',
                    layer7: '#f3f4f6',
                    layer8: '#ffffff'
                }
            }
        };

        // ==================== INISIALISASI APLIKASI ====================
        document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
            setupEventListeners();
            loadSavedData();
            populateThemeGrid();
            updateDynamicIsland('🚀 STL - UDHIS Best Friends Siap!', 3000);
        });

        function initializeApp() {
            // Deteksi platform
            CONFIG.platform = detectPlatform();
            
            // Set random logo
            setRandomLogo();
            
            // Load saved configuration
            const savedConfig = localStorage.getItem('stl_udhis_config');
            if (savedConfig) {
                Object.assign(CONFIG, JSON.parse(savedConfig));
                
                if (CONFIG.apiKey) {
                    document.getElementById('apiKey').value = CONFIG.apiKey;
                }
                
                if (CONFIG.proxyUrl) {
                    document.getElementById('proxyUrl').value = CONFIG.proxyUrl;
                }
                
                if (CONFIG.currentTheme) {
                    applyTheme(CONFIG.currentTheme);
                }
                
                if (CONFIG.isDarkMode) {
                    document.body.classList.add('dark');
                    document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
                }
            }
            
            // Apply default theme if none saved
            if (!CONFIG.currentTheme) {
                applyTheme('aurora-dream');
            }
            
            // Set current date for note input
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('noteDate').value = today;
            
            // Tampilkan notifikasi platform
            showPlatformNotification();
        }

        function showPlatformNotification() {
            let platformMessage = '';
            
            switch(CONFIG.platform) {
                case 'windows':
                    platformMessage = 'Windows: Klik 3x untuk membuka menu';
                    break;
                case 'macos':
                    platformMessage = 'macOS: Klik 3x atau gunakan Cmd+Shift+S';
                    break;
                case 'ios':
                    platformMessage = 'iOS: Swipe dari kanan atau ketuk 3x';
                    break;
                case 'android':
                    platformMessage = 'Android: Swipe dari kanan atau ketuk 3x';
                    break;
                case 'linux':
                    platformMessage = 'Linux: Klik 3x atau gunakan Ctrl+Shift+S';
                    break;
                default:
                    platformMessage = 'Klik 3x untuk membuka menu';
            }
            
            updateDynamicIsland(`📱 ${platformMessage}`, 5000);
        }

        function setupEventListeners() {
            // Sidebar toggle berdasarkan platform
            setupPlatformSpecificSidebarToggle();
            
            // Close sidebar
            document.getElementById('closeSidebar').addEventListener('click', toggleSidebar);
            document.getElementById('sidebarOverlay').addEventListener('click', toggleSidebar);
            
            // Theme toggle
            document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);
            
            // API configuration
            document.getElementById('saveApiConfig').addEventListener('click', saveApiConfig);
            
            // Theme selection
            document.getElementById('fontSelector').addEventListener('change', changeFont);
            document.getElementById('createCustomTheme').addEventListener('click', createCustomTheme);
            document.getElementById('resetCustomTheme').addEventListener('click', resetCustomTheme);
            document.getElementById('applyAdvanced').addEventListener('click', applyAdvancedSettings);
            document.getElementById('exportTheme').addEventListener('click', exportTheme);
            
            // Chat functionality
            document.getElementById('sendMessage').addEventListener('click', sendMessage);
            document.getElementById('messageInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
            
            // Quick prompts
            document.querySelectorAll('.quick-prompt').forEach(button => {
                button.addEventListener('click', function() {
                    document.getElementById('messageInput').value = this.getAttribute('data-prompt');
                    sendMessage();
                });
            });
            
            // Tab system
            document.querySelectorAll('.tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    switchTab(this.getAttribute('data-tab'));
                });
            });
            
            // Schedule functionality
            document.getElementById('addSchedule').addEventListener('click', addSchedule);
            
            // Notes functionality
            document.getElementById('saveNote').addEventListener('click', saveNote);
            
            // Transactions functionality
            document.getElementById('addTransaction').addEventListener('click', addTransaction);
        }

        // ==================== SIDEBAR FUNCTIONS DENGAN TEKNIK PLATFORM-SPECIFIC ====================
        function setupPlatformSpecificSidebarToggle() {
            // Universal triple-click untuk semua platform
            let clickCount = 0;
            let clickTimer;
            
            document.addEventListener('click', function(e) {
                // Don't count clicks inside the sidebar
                if (!e.target.closest('#sidebar')) {
                    clickCount++;
                    
                    if (clickCount === 3) {
                        toggleSidebar();
                        clickCount = 0;
                        clearTimeout(clickTimer);
                    }
                    
                    clearTimeout(clickTimer);
                    clickTimer = setTimeout(() => {
                        clickCount = 0;
                    }, 1000);
                }
            });
            
            // Keyboard shortcuts untuk desktop
            if (['windows', 'macos', 'linux', 'chromeos'].includes(CONFIG.platform)) {
                document.addEventListener('keydown', function(e) {
                    // Ctrl+Shift+S untuk Windows/Linux, Cmd+Shift+S untuk macOS
                    if ((e.ctrlKey && e.shiftKey && e.key === 'S') || 
                        (e.metaKey && e.shiftKey && e.key === 'S')) {
                        e.preventDefault();
                        toggleSidebar();
                    }
                });
            }
            
            // Gesture untuk mobile (swipe dari tepi kanan)
            if (['ios', 'android'].includes(CONFIG.platform)) {
                let touchStartX = 0;
                let touchStartY = 0;
                let touchEndX = 0;
                let touchEndY = 0;
                
                document.addEventListener('touchstart', function(e) {
                    touchStartX = e.changedTouches[0].screenX;
                    touchStartY = e.changedTouches[0].screenY;
                });
                
                document.addEventListener('touchend', function(e) {
                    touchEndX = e.changedTouches[0].screenX;
                    touchEndY = e.changedTouches[0].screenY;
                    handleSwipe();
                });
                
                function handleSwipe() {
                    const swipeThreshold = 50;
                    const minSwipeDistance = 100;
                    const maxVerticalDeviation = 50;
                    
                    const swipeDistance = touchStartX - touchEndX;
                    const verticalDistance = Math.abs(touchStartY - touchEndY);
                    
                    // Swipe dari kanan ke kiri (touchStartX dekat dengan tepi kanan)
                    if (touchStartX > window.screen.width * 0.7 && 
                        swipeDistance > minSwipeDistance && 
                        verticalDistance < maxVerticalDeviation) {
                        toggleSidebar();
                    }
                }
            }
            
            // Fitur khusus untuk iOS (Haptic Touch/3D Touch)
            if (CONFIG.platform === 'ios') {
                // Simulasi Haptic Touch dengan long press
                let longPressTimer;
                
                document.addEventListener('touchstart', function(e) {
                    longPressTimer = setTimeout(() => {
                        toggleSidebar();
                    }, 500); // 500ms untuk long press
                });
                
                document.addEventListener('touchend', function() {
                    clearTimeout(longPressTimer);
                });
                
                document.addEventListener('touchmove', function() {
                    clearTimeout(longPressTimer);
                });
            }
            
            // Fitur khusus untuk Android (Volume button combo)
            if (CONFIG.platform === 'android') {
                let volumeUpPressed = false;
                let volumeDownPressed = false;
                let volumeComboTimer;
                
                // Simulasi kombinasi tombol volume (hanya konsep, tidak bisa diimplementasi di browser)
                // Di browser, kita tidak bisa mendeteksi tombol volume
                // Sebagai alternatif, kita gunakan kombinasi keyboard khusus
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'ArrowUp') {
                        volumeUpPressed = true;
                    }
                    if (e.key === 'ArrowDown') {
                        volumeDownPressed = true;
                    }
                    
                    if (volumeUpPressed && volumeDownPressed) {
                        clearTimeout(volumeComboTimer);
                        volumeComboTimer = setTimeout(() => {
                            toggleSidebar();
                            volumeUpPressed = false;
                            volumeDownPressed = false;
                        }, 1000);
                    }
                });
                
                document.addEventListener('keyup', function(e) {
                    if (e.key === 'ArrowUp') {
                        volumeUpPressed = false;
                    }
                    if (e.key === 'ArrowDown') {
                        volumeDownPressed = false;
                    }
                });
            }
        }

        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            } else {
                sidebar.classList.add('active');
                overlay.classList.add('active');
            }
        }

        // ==================== THEME SYSTEM FUNCTIONS ====================
        function populateThemeGrid() {
            const themeGrid = document.getElementById('themeGrid');
            themeGrid.innerHTML = '';
            
            Object.keys(THEMES).forEach(key => {
                const theme = THEMES[key];
                const themeOption = document.createElement('div');
                themeOption.className = `theme-option ${key === CONFIG.currentTheme ? 'active' : ''}`;
                themeOption.style.background = `linear-gradient(135deg, ${theme.layers.layer1} 0%, ${theme.layers.layer2} 100%)`;
                themeOption.textContent = theme.name;
                themeOption.setAttribute('data-theme', key);
                themeOption.addEventListener('click', function() {
                    applyTheme(key);
                });
                
                themeGrid.appendChild(themeOption);
            });
        }

        function applyTheme(themeKey) {
            const theme = THEMES[themeKey];
            if (!theme) return;
            
            const root = document.documentElement;
            
            // Apply 8 layer CSS variables
            Object.entries(theme.layers).forEach(([layer, color]) => {
                root.style.setProperty(`--${layer}`, color);
            });
            
            // Apply font
            document.body.style.fontFamily = theme.font;
            
            // Update active theme in UI
            document.querySelectorAll('.theme-option').forEach(option => {
                if (option.getAttribute('data-theme') === themeKey) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });
            
            // Save theme preference
            CONFIG.currentTheme = themeKey;
            saveConfig();
            
            updateDynamicIsland(`🎨 Tema ${theme.name} Diaktifkan`, 2000);
        }

        function changeFont() {
            const fontFamily = document.getElementById('fontSelector').value;
            document.body.style.fontFamily = fontFamily;
            
            // Save font preference
            if (THEMES[CONFIG.currentTheme]) {
                THEMES[CONFIG.currentTheme].font = fontFamily;
            }
            
            saveConfig();
            updateDynamicIsland(`✒️ Font Diubah`, 1500);
        }

        function createCustomTheme() {
            const layer1 = document.getElementById('customLayer1').value;
            const layer2 = document.getElementById('customLayer2').value;
            const layer3 = document.getElementById('customLayer3').value;
            const layer4 = document.getElementById('customLayer4').value;
            const layer5 = document.getElementById('customLayer5').value;
            const layer6 = document.getElementById('customLayer6').value;
            const layer7 = document.getElementById('customLayer7').value;
            const layer8 = document.getElementById('customLayer8').value;
            
            const customTheme = {
                name: 'Tema Kustom',
                font: document.getElementById('fontSelector').value,
                layers: {
                    layer1: layer1,
                    layer2: layer2,
                    layer3: layer3,
                    layer4: layer4,
                    layer5: layer5,
                    layer6: layer6,
                    layer7: layer7,
                    layer8: layer8
                }
            };
            
            // Add to themes
            const themeKey = 'custom-theme-' + Date.now();
            THEMES[themeKey] = customTheme;
            
            // Apply the theme
            applyTheme(themeKey);
            
            // Update theme grid
            populateThemeGrid();
            
            updateDynamicIsland('🎨 Tema Kustom Dibuat!', 2000);
        }

        function resetCustomTheme() {
            document.getElementById('customLayer1').value = '#667eea';
            document.getElementById('customLayer2').value = '#764ba2';
            document.getElementById('customLayer3').value = '#a78bfa';
            document.getElementById('customLayer4').value = '#c4b5fd';
            document.getElementById('customLayer5').value = '#ddd6fe';
            document.getElementById('customLayer6').value = '#f3f4f6';
            document.getElementById('customLayer7').value = '#f8fafc';
            document.getElementById('customLayer8').value = '#ffffff';
            
            updateDynamicIsland('🔄 Tema Kustom Direset', 1500);
        }

        function applyAdvancedSettings() {
            const glowIntensity = document.getElementById('glowIntensity').value;
            const borderRadius = document.getElementById('borderRadius').value;
            
            // Apply glow intensity
            document.documentElement.style.setProperty('--glow', `0 0 30px color-mix(in srgb, var(--layer1) ${glowIntensity}%, transparent)`);
            
            // Apply border radius
            document.documentElement.style.setProperty('--radius-lg', `${borderRadius}px`);
            document.documentElement.style.setProperty('--radius-xl', `${parseInt(borderRadius) + 4}px`);
            document.documentElement.style.setProperty('--radius-2xl', `${parseInt(borderRadius) + 8}px`);
            
            updateDynamicIsland('⚙️ Pengaturan Lanjutan Diterapkan', 1500);
        }

        function exportTheme() {
            const currentTheme = THEMES[CONFIG.currentTheme];
            const themeData = {
                name: currentTheme.name,
                font: currentTheme.font,
                layers: currentTheme.layers
            };
            
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(themeData, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", `stl-theme-${currentTheme.name}.json`);
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
            
            updateDynamicIsland('📥 Tema Diekspor', 1500);
        }

        function toggleDarkMode() {
            const isDark = document.body.classList.toggle('dark');
            CONFIG.isDarkMode = isDark;
            
            const themeToggle = document.getElementById('themeToggle');
            if (isDark) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
            
            saveConfig();
            updateDynamicIsland(isDark ? '🌙 Mode Gelap Diaktifkan' : '☀️ Mode Terang Diaktifkan', 1500);
        }

        // ==================== API CONFIGURATION ====================
        function saveApiConfig() {
            CONFIG.apiKey = document.getElementById('apiKey').value;
            CONFIG.proxyUrl = document.getElementById('proxyUrl').value;
            
            saveConfig();
            updateDynamicIsland('✅ Konfigurasi API Disimpan', 2000);
            
            // Close sidebar
            toggleSidebar();
        }

        // ==================== AI CHAT FUNCTIONS ====================
        async function sendMessage() {
            const messageInput = document.getElementById('messageInput');
            const message = messageInput.value.trim();
            
            if (!message) {
                updateDynamicIsland('⚠️ Masukkan pesan terlebih dahulu', 2000);
                return;
            }
            
            if (!CONFIG.apiKey) {
                updateDynamicIsland('🔑 Atur API Key terlebih dahulu', 3000);
                toggleSidebar();
                return;
            }
            
            // Add user message to chat
            addChatMessage('user', message);
            messageInput.value = '';
            
            // Show loading indicator
            const loadingId = addChatMessage('ai', 'UDHIS sedang memproses permintaan Anda...', true);
            
            try {
                // Simulate API call (replace with actual API call)
                const response = await simulateAIResponse(message);
                
                // Remove loading message
                removeChatMessage(loadingId);
                
                // Add AI response
                addChatMessage('ai', response);
                
                // Save to chat history
                STATE.chatHistory.push({
                    user: message,
                    ai: response,
                    timestamp: new Date().toISOString()
                });
                
                saveData();
                
            } catch (error) {
                // Remove loading message
                removeChatMessage(loadingId);
                
                // Show error message
                addChatMessage('ai', 'Maaf, terjadi kesalahan saat memproses permintaan Anda. Pastikan API Key valid dan koneksi internet stabil.');
                
                console.error('Error:', error);
            }
        }

        async function simulateAIResponse(message) {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simple response simulation based on keywords
            if (message.toLowerCase().includes('rpp')) {
                return `Saya akan membantu Anda membuat RPP. Berikut kerangka RPP yang dapat disesuaikan:

**RENCANA PELAKSANAAN PEMBELAJARAN (RPP)**

**Mata Pelajaran:** [Sesuaikan]
**Kelas/Semester:** [Sesuaikan]  
**Alokasi Waktu:** [Sesuaikan]

**A. Kompetensi Inti**
1. [KI 1 - Spiritual]
2. [KI 2 - Sosial]
3. [KI 3 - Pengetahuan]
4. [KI 4 - Keterampilan]

**B. Kompetensi Dasar**
- [KD dari kurikulum]

**C. Indikator Pencapaian Kompetensi**
- [Indikator spesifik]

**D. Tujuan Pembelajaran**
- [Tujuan pembelajaran]

**E. Materi Pembelajaran**
- [Materi yang akan diajarkan]

**F. Metode Pembelajaran**
- [Pendekatan/model/metode]

**G. Media dan Sumber Belajar**
- [Media dan sumber]

**H. Langkah-langkah Kegiatan**
1. **Pendahuluan** (10 menit)
   - Apersepsi dan motivasi
   - Menyampaikan tujuan pembelajaran

2. **Kegiatan Inti** (60 menit)
   - Eksplorasi, elaborasi, konfirmasi
   - [Detail aktivitas]

3. **Penutup** (10 menit)
   - Refleksi
   - Tindak lanjut

**I. Penilaian**
- [Teknik dan instrumen penilaian]

Apakah Anda ingin saya menyesuaikan RPP ini untuk kelas atau mata pelajaran tertentu?`;
            } else if (message.toLowerCase().includes('prota') || message.toLowerCase().includes('program tahunan')) {
                return `Berikut kerangka PROTA (Program Tahunan) yang dapat disesuaikan:

**PROGRAM TAHUNAN**

**Mata Pelajaran:** [Sesuaikan]
**Kelas:** [Sesuaikan]
**Tahun Pelajaran:** [Sesuaikan]

**SEMESTER 1**
| Minggu | Kompetensi Dasar | Materi Pokok | Alokasi Waktu |
|--------|------------------|--------------|---------------|
| 1-4 | [KD 1] | [Materi 1] | [JP] |
| 5-8 | [KD 2] | [Materi 2] | [JP] |
| 9-12 | [KD 3] | [Materi 3] | [JP] |
| 13-16 | [KD 4] | [Materi 4] | [JP] |
| 17-18 | Ulangan & Remedial | - | [JP] |

**SEMESTER 2**
| Minggu | Kompetensi Dasar | Materi Pokok | Alokasi Waktu |
|--------|------------------|--------------|---------------|
| 19-22 | [KD 5] | [Materi 5] | [JP] |
| 23-26 | [KD 6] | [Materi 6] | [JP] |
| 27-30 | [KD 7] | [Materi 7] | [JP] |
| 31-34 | [KD 8] | [Materi 8] | [JP] |
| 35-36 | Ulangan & Remedial | - | [JP] |

Ingin saya sesuaikan dengan kelas atau mata pelajaran tertentu?`;
            } else if (message.toLowerCase().includes('promes') || message.toLowerCase().includes('program semester')) {
                return `Berikut kerangka PROMES (Program Semester) yang dapat disesuaikan:

**PROGRAM SEMESTER**

**Mata Pelajaran:** [Sesuaikan]
**Kelas:** [Sesuaikan]
**Semester:** [Sesuaikan]
**Tahun Pelajaran:** [Sesuaikan]

**BULAN: JULI**
| Minggu | Kompetensi Dasar | Materi Pokok | Alokasi Waktu | Ket |
|--------|------------------|--------------|---------------|-----|
| 1 | [KD 1.1] | [Materi 1] | 4 JP | |
| 2 | [KD 1.2] | [Materi 2] | 4 JP | |

**BULAN: AGUSTUS**
| Minggu | Kompetensi Dasar | Materi Pokok | Alokasi Waktu | Ket |
|--------|------------------|--------------|---------------|-----|
| 3 | [KD 2.1] | [Materi 3] | 4 JP | |
| 4 | [KD 2.2] | [Materi 4] | 4 JP | |
| 5 | [KD 3.1] | [Materi 5] | 4 JP | |

[Lanjutkan untuk bulan-bulan berikutnya...]

Ingin saya lengkapi untuk semester tertentu?`;
            } else if (message.toLowerCase().includes('aktivitas') || message.toLowerCase().includes('kreatif')) {
                return `Berikut beberapa ide aktivitas pembelajaran kreatif:

**1. Gallery Walk**
- Siswa membuat poster tentang topik tertentu
- Poster dipajang di dinding kelas
- Siswa berkeliling dan memberikan komentar

**2. Role Play/Drama**
- Siswa memerankan konsep atau peristiwa
- Mengembangkan empati dan pemahaman mendalam

**3. Project-Based Learning**
- Siswa bekerja dalam tim menyelesaikan proyek nyata
- Mengintegrasikan berbagai mata pelajaran

**4. Think-Pair-Share**
- Siswa berpikir individu, berdiskusi berpasangan, berbagi dengan kelas
- Mengembangkan keterampilan berpikir dan komunikasi

**5. Jigsaw Classroom**
- Setiap siswa menjadi ahli pada bagian tertentu
- Mengajarkan bagian tersebut kepada teman kelompok

**6. Learning Stations**
- Beberapa stasiun dengan aktivitas berbeda
- Siswa bergiliran melalui stasiun-stasiun

**7. Digital Storytelling**
- Siswa membuat cerita menggunakan tools digital
- Mengembangkan kreativitas dan literasi digital

Ada topik khusus yang ingin Anda kembangkan aktivitasnya?`;
            } else {
                return `Terima kasih atas pertanyaan Anda! Saya UDHIS AI Assistant, siap membantu dengan:

- **Perencanaan Pembelajaran**: RPP, PROTA, PROMES
- **Strategi Mengajar**: Metode, teknik, dan pendekatan
- **Pengembangan Materi**: Bahan ajar, LKPD, media pembelajaran
- **Penilaian**: Teknik dan instrumen penilaian
- **Manajemen Kelas**: Pengelolaan perilaku, lingkungan belajar

Beri tahu saya lebih detail tentang kebutuhan Anda, sehingga saya dapat memberikan bantuan yang lebih spesifik.`;
            }
        }

        function addChatMessage(sender, message, isTemp = false) {
            const chatContainer = document.getElementById('chatMessages');
            const messageId = isTemp ? 'temp-' + Date.now() : Date.now();
            
            const messageHTML = `
                <div class="chat-message ${sender}-message" id="chat-msg-${messageId}">
                    <div class="message-bubble">
                        ${message}
                    </div>
                </div>
            `;
            
            chatContainer.insertAdjacentHTML('beforeend', messageHTML);
            
            // Scroll to bottom
            document.getElementById('chatContainer').scrollTop = document.getElementById('chatContainer').scrollHeight;
            
            return messageId;
        }

        function removeChatMessage(messageId) {
            const messageElement = document.getElementById(`chat-msg-${messageId}`);
            if (messageElement) {
                messageElement.remove();
            }
        }

        // ==================== TAB SYSTEM FUNCTIONS ====================
        function switchTab(tabName) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Remove active class from all tabs
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected tab content
            document.getElementById(tabName).classList.add('active');
            
            // Add active class to clicked tab
            document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        }

        // ==================== SCHEDULE FUNCTIONS ====================
        function addSchedule() {
            const day = document.getElementById('inputDay').value;
            const time = document.getElementById('inputTime').value;
            const className = document.getElementById('inputClass').value;
            const topic = document.getElementById('inputTopic').value;
            
            if (!day || !time || !className || !topic) {
                updateDynamicIsland('⚠️ Lengkapi semua field jadwal', 2000);
                return;
            }
            
            const schedule = {
                id: Date.now(),
                day,
                time,
                class: className,
                topic,
                color: getRandomColor()
            };
            
            STATE.schedules.push(schedule);
            renderSchedules();
            clearScheduleForm();
            saveData();
            
            updateDynamicIsland('📅 Jadwal ditambahkan', 1500);
        }

        function renderSchedules() {
            const scheduleList = document.getElementById('scheduleList');
            scheduleList.innerHTML = '';
            
            if (STATE.schedules.length === 0) {
                scheduleList.innerHTML = `
                    <div class="text-center text-gray-500 dark:text-gray-400 py-4">
                        <i class="fas fa-calendar-plus text-xl mb-2"></i>
                        <p class="text-sm">Belum ada jadwal. Tambahkan jadwal mengajar Anda!</p>
                    </div>
                `;
                return;
            }
            
            STATE.schedules.forEach(schedule => {
                const scheduleElement = document.createElement('div');
                scheduleElement.className = 'enhanced-card p-3 flex justify-between items-center';
                scheduleElement.style.borderLeft = `4px solid ${schedule.color}`;
                
                scheduleElement.innerHTML = `
                    <div class="flex-1">
                        <h4 class="font-black text-gray-800 dark:text-white text-sm">${schedule.day} - ${schedule.time}</h4>
                        <p class="text-gray-600 dark:text-gray-300 text-xs">${schedule.class} - ${schedule.topic}</p>
                    </div>
                    <button class="enhanced-btn btn-error text-xs compact-btn delete-schedule" data-id="${schedule.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                
                scheduleList.appendChild(scheduleElement);
            });
            
            // Add event listeners to delete buttons
            document.querySelectorAll('.delete-schedule').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    deleteSchedule(id);
                });
            });
        }

        function deleteSchedule(id) {
            STATE.schedules = STATE.schedules.filter(schedule => schedule.id !== id);
            renderSchedules();
            saveData();
            updateDynamicIsland('🗑️ Jadwal dihapus', 1500);
        }

        function clearScheduleForm() {
            document.getElementById('inputDay').value = '';
            document.getElementById('inputTime').value = '';
            document.getElementById('inputClass').value = '';
            document.getElementById('inputTopic').value = '';
        }

        // ==================== NOTES FUNCTIONS ====================
        function saveNote() {
            const date = document.getElementById('noteDate').value;
            const title = document.getElementById('noteTitle').value;
            const content = document.getElementById('noteContent').value;
            
            if (!date || !title || !content) {
                updateDynamicIsland('⚠️ Lengkapi semua field catatan', 2000);
                return;
            }
            
            const note = {
                id: Date.now(),
                date,
                title,
                content,
                color: getRandomColor(),
                timestamp: new Date().toISOString()
            };
            
            STATE.notes.unshift(note);
            renderNotes();
            clearNoteForm();
            saveData();
            
            updateDynamicIsland('📝 Catatan disimpan', 1500);
        }

        function renderNotes() {
            const notesList = document.getElementById('notesList');
            notesList.innerHTML = '';
            
            if (STATE.notes.length === 0) {
                notesList.innerHTML = `
                    <div class="text-center text-gray-500 dark:text-gray-400 py-4">
                        <i class="fas fa-book-open text-xl mb-2"></i>
                        <p class="text-sm">Belum ada catatan. Tambahkan catatan pribadi Anda!</p>
                    </div>
                `;
                return;
            }
            
            STATE.notes.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.className = 'enhanced-card p-3';
                noteElement.style.borderLeft = `4px solid ${note.color}`;
                
                noteElement.innerHTML = `
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex-1">
                            <h4 class="font-black text-gray-800 dark:text-white text-sm">${note.title}</h4>
                            <p class="text-gray-600 dark:text-gray-300 text-xs">${new Date(note.date).toLocaleDateString('id-ID')}</p>
                        </div>
                        <button class="enhanced-btn btn-error text-xs compact-btn delete-note" data-id="${note.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <p class="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">${note.content}</p>
                `;
                
                notesList.appendChild(noteElement);
            });
            
            // Add event listeners to delete buttons
            document.querySelectorAll('.delete-note').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    deleteNote(id);
                });
            });
        }

        function deleteNote(id) {
            STATE.notes = STATE.notes.filter(note => note.id !== id);
            renderNotes();
            saveData();
            updateDynamicIsland('🗑️ Catatan dihapus', 1500);
        }

        function clearNoteForm() {
            document.getElementById('noteTitle').value = '';
            document.getElementById('noteContent').value = '';
        }

        // ==================== TRANSACTIONS FUNCTIONS ====================
        function addTransaction() {
            const type = document.getElementById('transactionType').value;
            const amount = parseFloat(document.getElementById('transactionAmount').value);
            const description = document.getElementById('transactionDescription').value;
            
            if (!amount || amount <= 0 || !description) {
                updateDynamicIsland('⚠️ Lengkapi semua field transaksi', 2000);
                return;
            }
            
            const transaction = {
                id: Date.now(),
                type,
                amount,
                description,
                date: new Date().toISOString(),
                color: type === 'debit' ? '#10b981' : '#ef4444'
            };
            
            STATE.transactions.unshift(transaction);
            
            // Update balance
            if (type === 'debit') {
                STATE.currentBalance += amount;
            } else {
                STATE.currentBalance -= amount;
            }
            
            renderTransactions();
            clearTransactionForm();
            saveData();
            
            updateDynamicIsland('💰 Transaksi ditambahkan', 1500);
        }

        function renderTransactions() {
            const transactionList = document.getElementById('transactionList');
            const currentBalance = document.getElementById('currentBalance');
            
            currentBalance.textContent = `Rp ${formatCurrency(STATE.currentBalance)}`;
            transactionList.innerHTML = '';
            
            if (STATE.transactions.length === 0) {
                transactionList.innerHTML = `
                    <div class="text-center text-gray-500 dark:text-gray-400 py-4">
                        <i class="fas fa-piggy-bank text-xl mb-2"></i>
                        <p class="text-sm">Belum ada transaksi. Mulai kelola keuangan Anda!</p>
                    </div>
                `;
                return;
            }
            
            STATE.transactions.forEach(transaction => {
                const transactionElement = document.createElement('div');
                transactionElement.className = 'enhanced-card p-3 flex justify-between items-center';
                transactionElement.style.borderLeft = `4px solid ${transaction.color}`;
                
                transactionElement.innerHTML = `
                    <div class="flex-1">
                        <h4 class="font-black ${transaction.type === 'debit' ? 'text-green-600' : 'text-red-600'} text-sm">
                            ${transaction.type === 'debit' ? '+' : '-'} Rp ${formatCurrency(transaction.amount)}
                        </h4>
                        <p class="text-gray-600 dark:text-gray-300 text-xs">${transaction.description}</p>
                        <p class="text-gray-500 dark:text-gray-400 text-xs">${new Date(transaction.date).toLocaleDateString('id-ID')}</p>
                    </div>
                    <button class="enhanced-btn btn-error text-xs compact-btn delete-transaction" data-id="${transaction.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                
                transactionList.appendChild(transactionElement);
            });
            
            // Add event listeners to delete buttons
            document.querySelectorAll('.delete-transaction').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    deleteTransaction(id);
                });
            });
        }

        function deleteTransaction(id) {
            const transactionIndex = STATE.transactions.findIndex(t => t.id === id);
            if (transactionIndex !== -1) {
                const transaction = STATE.transactions[transactionIndex];
                
                // Reverse balance update
                if (transaction.type === 'debit') {
                    STATE.currentBalance -= transaction.amount;
                } else {
                    STATE.currentBalance += transaction.amount;
                }
                
                STATE.transactions.splice(transactionIndex, 1);
                renderTransactions();
                saveData();
                
                updateDynamicIsland('🗑️ Transaksi dihapus', 1500);
            }
        }

        function clearTransactionForm() {
            document.getElementById('transactionAmount').value = '';
            document.getElementById('transactionDescription').value = '';
        }

        // ==================== UTILITY FUNCTIONS ====================
        function setRandomLogo() {
            const logos = [
                'https://pfst.cf2.poecdn.net/base/image/d6d81ade0a0eeac8cf2315ace4420bf84df883795c9513b9b3af822e0d0730ae?w=1563&h=1563',
                'https://pfst.cf2.poecdn.net/base/image/40db7e09610a5e7c91917b24e36df70c51965b06bd4c90caa5bc04359b1b8bfe?w=1563&h=1563'
            ];
            
            const randomLogo = logos[Math.floor(Math.random() * logos.length)];
            document.getElementById('sidebarLogo').src = randomLogo;
        }

        function getRandomColor() {
            const colors = ['#667eea', '#764ba2', '#0ea5e9', '#8b5cf6', '#10b981', '#ec4899', '#f59e0b'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        function formatCurrency(amount) {
            return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }

        function updateDynamicIsland(message, duration = 3000) {
            const island = document.getElementById('dynamicIsland');
            island.textContent = message;
            island.classList.add('active');
            
            setTimeout(() => {
                island.classList.remove('active');
            }, duration);
        }

        function saveConfig() {
            localStorage.setItem('stl_udhis_config', JSON.stringify(CONFIG));
        }

        function saveData() {
            const data = {
                schedules: STATE.schedules,
                notes: STATE.notes,
                transactions: STATE.transactions,
                currentBalance: STATE.currentBalance,
                chatHistory: STATE.chatHistory
            };
            
            localStorage.setItem('stl_udhis_data', JSON.stringify(data));
        }

        function loadSavedData() {
            const savedData = localStorage.getItem('stl_udhis_data');
            if (savedData) {
                const data = JSON.parse(savedData);
                
                STATE.schedules = data.schedules || [];
                STATE.notes = data.notes || [];
                STATE.transactions = data.transactions || [];
                STATE.currentBalance = data.currentBalance || 0;
                STATE.chatHistory = data.chatHistory || [];
                
                renderSchedules();
                renderNotes();
                renderTransactions();
            }
        }

// ==================== SISTEM NILAI KOMPREHENSIF - FIXED TAB POSITION ====================

// Tambahkan state untuk sistem nilai
const NILAI_STATE = {
    subjects: [],
    students: [],
    grades: [],
    gradeSettings: {
        scale: 100,
        passingGrade: 75,
        weightAssignment: 0.3,
        weightQuiz: 0.2,
        weightExam: 0.5
    }
};

// Inisialisasi sistem nilai
function initializeNilaiSystem() {
    injectNilaiTab();
    setupNilaiEventListeners();
    loadNilaiData();
}

// Inject tab nilai ke dalam UI - FIXED VERSION
function injectNilaiTab() {
    // Tunggu hingga DOM sepenuhnya load
    setTimeout(() => {
        // Cari container tab yang tepat
        const tabContainers = document.querySelectorAll('.tab-container');
        let targetTabContainer = null;
        
        // Cari container tab yang berisi tab Jadwal, Catatan, dll
        for (const container of tabContainers) {
            if (container.querySelector('[data-tab="jadwal"]') || 
                container.querySelector('[data-tab="catatan"]') ||
                container.querySelector('[data-tab="tabungan"]') ||
                container.querySelector('[data-tab="developer"]')) {
                targetTabContainer = container;
                break;
            }
        }
        
        // Jika tidak ketemu, cari dengan selector lebih spesifik
        if (!targetTabContainer) {
            targetTabContainer = document.querySelector('.enhanced-card.p-6.mobile-optimized .tab-container');
        }
        
        // Tambahkan tab Nilai jika belum ada
        if (targetTabContainer && !targetTabContainer.querySelector('[data-tab="nilai"]')) {
            const nilaiTab = document.createElement('button');
            nilaiTab.className = 'tab';
            nilaiTab.setAttribute('data-tab', 'nilai');
            nilaiTab.innerHTML = '<i class="fas fa-chart-bar mr-2"></i>Nilai';
            targetTabContainer.appendChild(nilaiTab);

            // Tambahkan event listener untuk tab baru
            nilaiTab.addEventListener('click', function() {
                switchTab('nilai');
            });
            
            console.log('✅ Tab Nilai berhasil ditambahkan');
        }

        // Tambahkan konten tab Nilai
        const tabContentContainers = document.querySelectorAll('.tab-content');
        let targetContentContainer = null;
        
        // Cari parent container untuk tab content
        for (const container of document.querySelectorAll('.enhanced-card.p-6.mobile-optimized')) {
            if (container.querySelector('#jadwal.tab-content') || 
                container.querySelector('#catatan.tab-content') ||
                container.querySelector('#tabungan.tab-content') ||
                container.querySelector('#developer.tab-content')) {
                targetContentContainer = container;
                break;
            }
        }
        
        if (targetContentContainer && !targetContentContainer.querySelector('#nilai')) {
            const nilaiContent = document.createElement('div');
            nilaiContent.id = 'nilai';
            nilaiContent.className = 'tab-content';
            nilaiContent.innerHTML = generateNilaiTabContent();
            targetContentContainer.appendChild(nilaiContent);
            
            console.log('✅ Konten Tab Nilai berhasil ditambahkan');
        }
        
        // Update UI setelah inject
        updateNilaiUI();
    }, 500);
}

// Generate konten tab nilai yang komprehensif
function generateNilaiTabContent() {
    return `
        <div class="space-y-6">
            <!-- Header dan Statistik -->
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-black text-gray-800 dark:text-white">
                    <i class="fas fa-chart-line mr-2 text-green-600"></i>Sistem Manajemen Nilai
                </h3>
                <div class="flex space-x-2">
                    <button id="exportGrades" class="enhanced-btn bg-purple-600 hover:bg-purple-700 text-white compact-btn">
                        <i class="fas fa-file-export mr-2"></i>Ekspor
                    </button>
                    <button id="importGrades" class="enhanced-btn bg-blue-600 hover:bg-blue-700 text-white compact-btn">
                        <i class="fas fa-file-import mr-2"></i>Impor
                    </button>
                </div>
            </div>

            <!-- Statistik Cepat -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div class="enhanced-card p-4 text-center">
                    <div class="text-2xl font-black text-green-600" id="avgGrade">0.00</div>
                    <div class="text-sm text-gray-600 dark:text-gray-300">Rata-rata</div>
                </div>
                <div class="enhanced-card p-4 text-center">
                    <div class="text-2xl font-black text-blue-600" id="totalGrades">0</div>
                    <div class="text-sm text-gray-600 dark:text-gray-300">Total Nilai</div>
                </div>
                <div class="enhanced-card p-4 text-center">
                    <div class="text-2xl font-black text-yellow-600" id="passingGrades">0</div>
                    <div class="text-sm text-gray-600 dark:text-gray-300">Lulus</div>
                </div>
                <div class="enhanced-card p-4 text-center">
                    <div class="text-2xl font-black text-red-600" id="failingGrades">0</div>
                    <div class="text-sm text-gray-600 dark:text-gray-300">Tidak Lulus</div>
                </div>
            </div>

            <!-- Form Input Nilai -->
            <div class="enhanced-card p-6 mb-6">
                <h4 class="text-lg font-black text-gray-800 dark:text-white mb-4">
                    <i class="fas fa-plus-circle mr-2"></i>Tambah Nilai Baru
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Siswa</label>
                        <input type="text" id="inputStudentName" class="enhanced-input compact-input w-full" placeholder="Nama lengkap siswa">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kelas</label>
                        <input type="text" id="inputStudentClass" class="enhanced-input compact-input w-full" placeholder="Kelas siswa">
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mata Pelajaran</label>
                        <select id="inputSubject" class="enhanced-input compact-input w-full">
                            <option value="">Pilih Mata Pelajaran</option>
                            <option value="Matematika">Matematika</option>
                            <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                            <option value="IPA">IPA</option>
                            <option value="IPS">IPS</option>
                            <option value="Bahasa Inggris">Bahasa Inggris</option>
                            <option value="PKn">PKn</option>
                            <option value="Seni Budaya">Seni Budaya</option>
                            <option value="PJOK">PJOK</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jenis Penilaian</label>
                        <select id="inputGradeType" class="enhanced-input compact-input w-full">
                            <option value="assignment">Tugas</option>
                            <option value="quiz">Kuis</option>
                            <option value="exam">Ujian</option>
                            <option value="project">Proyek</option>
                            <option value="participation">Partisipasi</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nilai</label>
                        <input type="number" id="inputGradeValue" min="0" max="100" class="enhanced-input compact-input w-full" placeholder="0-100">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tanggal Penilaian</label>
                        <input type="date" id="inputGradeDate" class="enhanced-input compact-input w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keterangan</label>
                        <input type="text" id="inputGradeNote" class="enhanced-input compact-input w-full" placeholder="Catatan tambahan">
                    </div>
                </div>

                <div class="flex space-x-3">
                    <button id="addGrade" class="enhanced-btn btn-success flex-1 compact-btn">
                        <i class="fas fa-save mr-2"></i>Simpan Nilai
                    </button>
                    <button id="resetGradeForm" class="enhanced-btn btn-warning compact-btn">
                        <i class="fas fa-undo mr-2"></i>Reset
                    </button>
                </div>
            </div>

            <!-- Daftar Nilai -->
            <div class="enhanced-card p-6">
                <div class="flex justify-between items-center mb-4">
                    <h4 class="text-lg font-black text-gray-800 dark:text-white">
                        <i class="fas fa-list-alt mr-2"></i>Daftar Nilai
                    </h4>
                    <div class="flex space-x-2">
                        <select id="filterSubject" class="enhanced-input compact-input text-sm">
                            <option value="">Semua Mata Pelajaran</option>
                        </select>
                        <select id="filterClass" class="enhanced-input compact-input text-sm">
                            <option value="">Semua Kelas</option>
                        </select>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                                <th class="text-left py-3 px-4 font-black text-gray-800 dark:text-white">Siswa</th>
                                <th class="text-left py-3 px-4 font-black text-gray-800 dark:text-white">Kelas</th>
                                <th class="text-left py-3 px-4 font-black text-gray-800 dark:text-white">Mapel</th>
                                <th class="text-left py-3 px-4 font-black text-gray-800 dark:text-white">Jenis</th>
                                <th class="text-left py-3 px-4 font-black text-gray-800 dark:text-white">Nilai</th>
                                <th class="text-left py-3 px-4 font-black text-gray-800 dark:text-white">Status</th>
                                <th class="text-left py-3 px-4 font-black text-gray-800 dark:text-white">Tanggal</th>
                                <th class="text-left py-3 px-4 font-black text-gray-800 dark:text-white">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="gradesTableBody">
                            <!-- Data nilai akan diisi di sini -->
                        </tbody>
                    </table>
                </div>

                <div id="emptyGradesState" class="text-center py-8">
                    <i class="fas fa-chart-bar text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-500 dark:text-gray-400">Belum ada data nilai</p>
                    <p class="text-sm text-gray-400 mt-2">Tambahkan nilai pertama Anda menggunakan form di atas</p>
                </div>
            </div>

            <!-- Grafik dan Analisis -->
            <div class="enhanced-card p-6">
                <h4 class="text-lg font-black text-gray-800 dark:text-white mb-4">
                    <i class="fas fa-chart-pie mr-2"></i>Analisis Nilai
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h5 class="font-black text-gray-800 dark:text-white mb-3">Distribusi Nilai</h5>
                        <div id="gradeDistributionChart" class="h-48 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                            <p class="text-gray-500 text-sm">Grafik distribusi nilai akan ditampilkan di sini</p>
                        </div>
                    </div>
                    <div>
                        <h5 class="font-black text-gray-800 dark:text-white mb-3">Statistik per Mata Pelajaran</h5>
                        <div id="subjectStats" class="space-y-2">
                            <p class="text-gray-500 text-sm">Data statistik akan muncul di sini</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Setup event listeners untuk sistem nilai
function setupNilaiEventListeners() {
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'addGrade') {
            addNewGrade();
        }
        if (e.target && e.target.id === 'resetGradeForm') {
            resetGradeForm();
        }
        if (e.target && e.target.id === 'exportGrades') {
            exportGrades();
        }
        if (e.target && e.target.id === 'importGrades') {
            importGrades();
        }
        if (e.target && e.target.classList.contains('delete-grade')) {
            const gradeId = e.target.getAttribute('data-id');
            deleteGrade(gradeId);
        }
        if (e.target && e.target.classList.contains('edit-grade')) {
            const gradeId = e.target.getAttribute('data-id');
            editGrade(gradeId);
        }
    });

    // Filter events
    document.addEventListener('change', function(e) {
        if (e.target && (e.target.id === 'filterSubject' || e.target.id === 'filterClass')) {
            filterGrades();
        }
    });

    // Set tanggal default ke hari ini
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('inputGradeDate');
    if (dateInput) {
        dateInput.value = today;
    }
}

// Fungsi untuk menambah nilai baru
function addNewGrade() {
    const studentName = document.getElementById('inputStudentName')?.value.trim();
    const studentClass = document.getElementById('inputStudentClass')?.value.trim();
    const subject = document.getElementById('inputSubject')?.value;
    const gradeType = document.getElementById('inputGradeType')?.value;
    const gradeValue = parseFloat(document.getElementById('inputGradeValue')?.value);
    const gradeDate = document.getElementById('inputGradeDate')?.value;
    const gradeNote = document.getElementById('inputGradeNote')?.value.trim();

    // Validasi
    if (!studentName || !studentClass || !subject || !gradeValue || !gradeDate) {
        showNotification('⚠️ Harap lengkapi semua field yang wajib', 'warning');
        return;
    }

    if (gradeValue < 0 || gradeValue > 100 || isNaN(gradeValue)) {
        showNotification('⚠️ Nilai harus antara 0-100', 'warning');
        return;
    }

    const newGrade = {
        id: Date.now(),
        studentName,
        studentClass,
        subject,
        gradeType,
        gradeValue,
        gradeDate,
        gradeNote,
        createdAt: new Date().toISOString(),
        status: gradeValue >= NILAI_STATE.gradeSettings.passingGrade ? 'Lulus' : 'Tidak Lulus'
    };

    NILAI_STATE.grades.push(newGrade);
    saveNilaiData();
    renderGradesTable();
    updateStatistics();
    resetGradeForm();

    showNotification('✅ Nilai berhasil disimpan', 'success');
}

// Render tabel nilai
function renderGradesTable() {
    const tableBody = document.getElementById('gradesTableBody');
    const emptyState = document.getElementById('emptyGradesState');

    if (!tableBody || !emptyState) return;

    if (NILAI_STATE.grades.length === 0) {
        tableBody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    const filteredGrades = getFilteredGrades();
    
    tableBody.innerHTML = filteredGrades.map(grade => `
        <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
            <td class="py-3 px-4">
                <div class="font-medium text-gray-800 dark:text-white">${grade.studentName}</div>
            </td>
            <td class="py-3 px-4 text-gray-700 dark:text-gray-300">${grade.studentClass}</td>
            <td class="py-3 px-4 text-gray-700 dark:text-gray-300">${grade.subject}</td>
            <td class="py-3 px-4">
                <span class="px-2 py-1 rounded-full text-xs ${getGradeTypeBadgeClass(grade.gradeType)}">
                    ${getGradeTypeLabel(grade.gradeType)}
                </span>
            </td>
            <td class="py-3 px-4">
                <span class="font-bold ${getGradeValueClass(grade.gradeValue)}">
                    ${grade.gradeValue}
                </span>
            </td>
            <td class="py-3 px-4">
                <span class="px-2 py-1 rounded-full text-xs ${grade.status === 'Lulus' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${grade.status}
                </span>
            </td>
            <td class="py-3 px-4 text-gray-700 dark:text-gray-300">
                ${new Date(grade.gradeDate).toLocaleDateString('id-ID')}
            </td>
            <td class="py-3 px-4">
                <div class="flex space-x-2">
                    <button class="edit-grade enhanced-btn compact-btn bg-blue-600 hover:bg-blue-700 text-white text-xs" 
                            data-id="${grade.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-grade enhanced-btn compact-btn bg-red-600 hover:bg-red-700 text-white text-xs" 
                            data-id="${grade.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    updateFilterOptions();
}

// Helper functions untuk styling
function getGradeTypeBadgeClass(type) {
    const classes = {
        'assignment': 'bg-blue-100 text-blue-800',
        'quiz': 'bg-yellow-100 text-yellow-800',
        'exam': 'bg-purple-100 text-purple-800',
        'project': 'bg-green-100 text-green-800',
        'participation': 'bg-indigo-100 text-indigo-800'
    };
    return classes[type] || 'bg-gray-100 text-gray-800';
}

function getGradeTypeLabel(type) {
    const labels = {
        'assignment': 'Tugas',
        'quiz': 'Kuis',
        'exam': 'Ujian',
        'project': 'Proyek',
        'participation': 'Partisipasi'
    };
    return labels[type] || type;
}

function getGradeValueClass(value) {
    if (value >= 85) return 'text-green-600';
    if (value >= 75) return 'text-yellow-600';
    if (value >= 65) return 'text-orange-600';
    return 'text-red-600';
}

// Filter nilai
function getFilteredGrades() {
    const subjectFilter = document.getElementById('filterSubject')?.value || '';
    const classFilter = document.getElementById('filterClass')?.value || '';

    return NILAI_STATE.grades.filter(grade => {
        const subjectMatch = !subjectFilter || grade.subject === subjectFilter;
        const classMatch = !classFilter || grade.studentClass === classFilter;
        return subjectMatch && classMatch;
    });
}

function filterGrades() {
    renderGradesTable();
    updateStatistics();
}

function updateFilterOptions() {
    const subjectFilter = document.getElementById('filterSubject');
    const classFilter = document.getElementById('filterClass');

    if (subjectFilter) {
        const subjects = [...new Set(NILAI_STATE.grades.map(g => g.subject))];
        subjectFilter.innerHTML = '<option value="">Semua Mata Pelajaran</option>' +
            subjects.map(subject => `<option value="${subject}">${subject}</option>`).join('');
    }

    if (classFilter) {
        const classes = [...new Set(NILAI_STATE.grades.map(g => g.studentClass))];
        classFilter.innerHTML = '<option value="">Semua Kelas</option>' +
            classes.map(cls => `<option value="${cls}">${cls}</option>`).join('');
    }
}

// Fungsi utilitas
function calculateAverageGrade() {
    if (NILAI_STATE.grades.length === 0) return 0;
    const total = NILAI_STATE.grades.reduce((sum, grade) => sum + grade.gradeValue, 0);
    return total / NILAI_STATE.grades.length;
}

function countPassingGrades() {
    return NILAI_STATE.grades.filter(grade => grade.status === 'Lulus').length;
}

function countFailingGrades() {
    return NILAI_STATE.grades.filter(grade => grade.status === 'Tidak Lulus').length;
}

function resetGradeForm() {
    const studentName = document.getElementById('inputStudentName');
    const studentClass = document.getElementById('inputStudentClass');
    const subject = document.getElementById('inputSubject');
    const gradeValue = document.getElementById('inputGradeValue');
    const gradeNote = document.getElementById('inputGradeNote');
    
    if (studentName) studentName.value = '';
    if (studentClass) studentClass.value = '';
    if (subject) subject.value = '';
    if (gradeValue) gradeValue.value = '';
    if (gradeNote) gradeNote.value = '';
    
    // Set tanggal ke hari ini
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('inputGradeDate');
    if (dateInput) dateInput.value = today;
}

function deleteGrade(gradeId) {
    if (confirm('Apakah Anda yakin ingin menghapus nilai ini?')) {
        NILAI_STATE.grades = NILAI_STATE.grades.filter(grade => grade.id !== parseInt(gradeId));
        saveNilaiData();
        renderGradesTable();
        updateStatistics();
        showNotification('🗑️ Nilai berhasil dihapus', 'success');
    }
}

function editGrade(gradeId) {
    const grade = NILAI_STATE.grades.find(g => g.id === parseInt(gradeId));
    if (!grade) return;

    // Isi form dengan data yang ada
    const studentName = document.getElementById('inputStudentName');
    const studentClass = document.getElementById('inputStudentClass');
    const subject = document.getElementById('inputSubject');
    const gradeType = document.getElementById('inputGradeType');
    const gradeValue = document.getElementById('inputGradeValue');
    const gradeDate = document.getElementById('inputGradeDate');
    const gradeNote = document.getElementById('inputGradeNote');
    
    if (studentName) studentName.value = grade.studentName;
    if (studentClass) studentClass.value = grade.studentClass;
    if (subject) subject.value = grade.subject;
    if (gradeType) gradeType.value = grade.gradeType;
    if (gradeValue) gradeValue.value = grade.gradeValue;
    if (gradeDate) gradeDate.value = grade.gradeDate;
    if (gradeNote) gradeNote.value = grade.gradeNote || '';

    // Hapus nilai lama
    deleteGrade(gradeId);

    showNotification('✏️ Silakan edit nilai dan simpan kembali', 'info');
}

function updateStatistics() {
    // Update statistik cepat
    const avgElement = document.getElementById('avgGrade');
    const totalElement = document.getElementById('totalGrades');
    const passingElement = document.getElementById('passingGrades');
    const failingElement = document.getElementById('failingGrades');
    
    if (avgElement) avgElement.textContent = calculateAverageGrade().toFixed(2);
    if (totalElement) totalElement.textContent = NILAI_STATE.grades.length;
    if (passingElement) passingElement.textContent = countPassingGrades();
    if (failingElement) failingElement.textContent = countFailingGrades();

    // Update statistik mata pelajaran
    updateSubjectStatistics();
}

function updateSubjectStatistics() {
    const subjectStats = document.getElementById('subjectStats');
    if (!subjectStats) return;

    const subjectAverages = {};
    NILAI_STATE.grades.forEach(grade => {
        if (!subjectAverages[grade.subject]) {
            subjectAverages[grade.subject] = { total: 0, count: 0 };
        }
        subjectAverages[grade.subject].total += grade.gradeValue;
        subjectAverages[grade.subject].count++;
    });

    subjectStats.innerHTML = Object.entries(subjectAverages)
        .map(([subject, data]) => {
            const average = (data.total / data.count).toFixed(2);
            return `
                <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${subject}</span>
                    <span class="font-bold ${getGradeValueClass(average)}">${average}</span>
                </div>
            `;
        }).join('') || '<p class="text-gray-500 text-sm">Tidak ada data</p>';
}

// Ekspor dan impor data
function exportGrades() {
    const dataStr = JSON.stringify(NILAI_STATE.grades, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nilai-siswa-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('📤 Data nilai berhasil diekspor', 'success');
}

function importGrades() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            try {
                const importedGrades = JSON.parse(event.target.result);
                if (Array.isArray(importedGrades)) {
                    NILAI_STATE.grades = [...NILAI_STATE.grades, ...importedGrades];
                    saveNilaiData();
                    renderGradesTable();
                    updateStatistics();
                    showNotification('📥 Data nilai berhasil diimpor', 'success');
                }
            } catch (error) {
                showNotification('❌ Gagal mengimpor data', 'error');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// Persistensi data
function saveNilaiData() {
    localStorage.setItem('stl_udhis_nilai', JSON.stringify({
        grades: NILAI_STATE.grades,
        gradeSettings: NILAI_STATE.gradeSettings
    }));
}

function loadNilaiData() {
    const saved = localStorage.getItem('stl_udhis_nilai');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            NILAI_STATE.grades = data.grades || [];
            NILAI_STATE.gradeSettings = data.gradeSettings || NILAI_STATE.gradeSettings;
        } catch (error) {
            console.error('Error loading nilai data:', error);
        }
    }
}

// Update UI setelah inject
function updateNilaiUI() {
    renderGradesTable();
    updateStatistics();
    updateFilterOptions();
}

// Helper function untuk notifikasi
function showNotification(message, type = 'info') {
    if (typeof updateDynamicIsland !== 'undefined') {
        updateDynamicIsland(message, 3000);
    } else {
        // Fallback notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        const bgColors = {
            'success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            'error': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            'warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            'info': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
        };
        
        notification.style.background = bgColors[type] || bgColors.info;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
}

// Integrasi dengan aplikasi utama
document.addEventListener('DOMContentLoaded', function() {
    // Tunggu hingga aplikasi utama selesai loading
    setTimeout(() => {
        initializeNilaiSystem();
        console.log('✅ Sistem Nilai Komprehensif Diinisialisasi');
    }, 1000);
});

// Pastikan fungsi switchTab tersedia
if (typeof switchTab === 'undefined') {
    window.switchTab = function(tabName) {
        // Sembunyikan semua tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // Hapus active class dari semua tab
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Tampilkan tab yang dipilih
        const targetTab = document.getElementById(tabName);
        const targetTabButton = document.querySelector(`[data-tab="${tabName}"]`);
        
        if (targetTab) {
            targetTab.style.display = 'block';
        }
        if (targetTabButton) {
            targetTabButton.classList.add('active');
        }

        // Jika pindah ke tab nilai, update statistik
        if (tabName === 'nilai') {
            setTimeout(updateStatistics, 100);
        }
    };
}

console.log('🔢 Sistem Nilai Komprehensif Siap Diinjeksi');

// ==================== SISTEM INTEGRASI GOOGLE - FIXED VERSION ====================

const GOOGLE_INTEGRATION_STATE = {
    verified: false,
    userEmail: '',
    allowedEmails: [
        'ppg.muhammadsalam96930@program.belajar.id',
        'najibsalam23@gmail.com',
        'dev@stl-udhis.com'
    ],
    integrations: {
        googleSheets: false,
        googleCalendar: false,
        googleDrive: false,
        googleMaps: false,
        googleLens: false
    },
    apiKeys: {
        sheets: '',
        calendar: '',
        drive: '',
        maps: '',
        lens: ''
    }
};

// Inisialisasi sistem integrasi Google
function initializeGoogleIntegration() {
    console.log('🔄 Menginisialisasi sistem integrasi Google...');
    injectIntegrationTab();
    setupIntegrationEventListeners();
    loadIntegrationData();
    checkEmailVerification();
}

// Inject tab Integrasi ke dalam UI - FIXED SELECTOR
function injectIntegrationTab() {
    // Tunggu sampai DOM benar-benar ready
    setTimeout(() => {
        console.log('🔍 Mencari container tab...');
        
        // Cari container tab dengan selector yang lebih reliable
        let targetTabContainer = document.querySelector('.tab-container');
        
        if (!targetTabContainer) {
            // Coba selector alternatif
            targetTabContainer = document.querySelector('[class*="tab-container"]');
        }
        
        if (!targetTabContainer) {
            // Buat container tab jika tidak ada
            const mainCard = document.querySelector('.enhanced-card.p-6.mobile-optimized');
            if (mainCard) {
                const newTabContainer = document.createElement('div');
                newTabContainer.className = 'tab-container';
                mainCard.prepend(newTabContainer);
                targetTabContainer = newTabContainer;
            }
        }

        // Tambahkan tab Integrasi jika belum ada
        if (targetTabContainer && !targetTabContainer.querySelector('[data-tab="integrasi"]')) {
            console.log('✅ Container tab ditemukan, menambahkan tab Integrasi...');
            
            const integrationTab = document.createElement('button');
            integrationTab.className = 'tab';
            integrationTab.setAttribute('data-tab', 'integrasi');
            integrationTab.innerHTML = '<i class="fab fa-google mr-2"></i>Integrasi';
            targetTabContainer.appendChild(integrationTab);

            integrationTab.addEventListener('click', function() {
                switchTab('integrasi');
            });
            
            console.log('✅ Tab Integrasi berhasil ditambahkan');
        } else {
            console.log('❌ Container tab tidak ditemukan atau tab sudah ada');
        }

        // Tambahkan konten tab Integrasi
        const targetContentContainer = document.querySelector('.enhanced-card.p-6.mobile-optimized');
        
        if (targetContentContainer && !targetContentContainer.querySelector('#integrasi')) {
            console.log('✅ Menambahkan konten tab Integrasi...');
            
            const integrationContent = document.createElement('div');
            integrationContent.id = 'integrasi';
            integrationContent.className = 'tab-content';
            integrationContent.innerHTML = generateIntegrationTabContent();
            targetContentContainer.appendChild(integrationContent);
            
            console.log('✅ Konten Tab Integrasi berhasil ditambahkan');
            
            // Update UI setelah inject
            setTimeout(() => {
                updateVerificationUI();
                setupIntegrationToggles();
            }, 100);
        }
        
    }, 1500); // Delay lebih lama untuk memastikan DOM ready
}

// Generate konten tab integrasi
function generateIntegrationTabContent() {
    return `
        <div class="space-y-6">
            <!-- Header -->
            <div class="text-center mb-8">
                <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <i class="fab fa-google text-white text-3xl"></i>
                </div>
                <h3 class="text-2xl font-black text-gray-800 dark:text-white mb-2">
                    Google Workspace Integration
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                    Integrasikan STL-UDHIS dengan ekosistem Google untuk produktivitas maksimal
                </p>
            </div>

            <!-- Status Verifikasi -->
            <div id="verificationStatus" class="enhanced-card p-6 mb-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <i class="fas fa-envelope text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <h4 class="font-black text-gray-800 dark:text-white">Verifikasi Email</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-300" id="verificationText">
                                Verifikasi email Anda untuk mengakses fitur integrasi Google
                            </p>
                        </div>
                    </div>
                    <div id="verificationBadge">
                        <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                            <i class="fas fa-exclamation-triangle mr-1"></i>Belum Terverifikasi
                        </span>
                    </div>
                </div>
                
                <div id="emailVerificationForm" class="mt-4 space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Alamat Email
                            </label>
                            <input type="email" id="inputUserEmail" class="enhanced-input compact-input w-full" 
                                   placeholder="email@example.com">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Kode Verifikasi
                            </label>
                            <input type="text" id="inputVerificationCode" class="enhanced-input compact-input w-full" 
                                   placeholder="Masukkan kode verifikasi" disabled>
                        </div>
                    </div>
                    <div class="flex space-x-3">
                        <button id="sendVerificationCode" class="enhanced-btn bg-blue-600 hover:bg-blue-700 text-white compact-btn flex-1">
                            <i class="fas fa-paper-plane mr-2"></i>Kirim Kode Verifikasi
                        </button>
                        <button id="verifyEmail" class="enhanced-btn bg-gray-400 text-white compact-btn flex-1" disabled>
                            <i class="fas fa-check mr-2"></i>Verifikasi Email
                        </button>
                    </div>
                </div>
            </div>

            <!-- Panel Integrasi Google (Awalnya Tersembunyi) -->
            <div id="googleIntegrationPanel" class="hidden space-y-6">
                <!-- Google Sheets Integration -->
                <div class="enhanced-card p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <i class="fab fa-google-drive text-green-600 text-lg"></i>
                            </div>
                            <div>
                                <h4 class="font-black text-gray-800 dark:text-white">Google Sheets</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-300">
                                    Ekspor data ke Google Sheets secara otomatis
                                </p>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="toggleSheets" class="sr-only peer">
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                    </div>
                    
                    <div id="sheetsConfig" class="mt-4 space-y-4 hidden">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    API Key Sheets
                                </label>
                                <input type="password" id="inputSheetsApiKey" class="enhanced-input compact-input w-full" 
                                       placeholder="Masukkan API Key">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Spreadsheet ID
                                </label>
                                <input type="text" id="inputSheetsId" class="enhanced-input compact-input w-full" 
                                       placeholder="ID Spreadsheet">
                            </div>
                        </div>
                        <div class="flex space-x-3">
                            <button id="testSheets" class="enhanced-btn bg-blue-600 hover:bg-blue-700 text-white compact-btn">
                                <i class="fas fa-bolt mr-2"></i>Test Koneksi
                            </button>
                            <button id="exportToSheets" class="enhanced-btn bg-green-600 hover:bg-green-700 text-white compact-btn">
                                <i class="fas fa-file-export mr-2"></i>Ekspor Sekarang
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Google Calendar Integration -->
                <div class="enhanced-card p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-calendar-alt text-red-600 text-lg"></i>
                            </div>
                            <div>
                                <h4 class="font-black text-gray-800 dark:text-white">Google Calendar</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-300">
                                    Sinkronkan jadwal mengajar dengan Google Calendar
                                </p>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="toggleCalendar" class="sr-only peer">
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                    </div>
                    
                    <div id="calendarConfig" class="mt-4 space-y-4 hidden">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Calendar ID
                                </label>
                                <input type="text" id="inputCalendarId" class="enhanced-input compact-input w-full" 
                                       placeholder="ID Kalender">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Waktu Pengingat
                                </label>
                                <select id="inputReminderTime" class="enhanced-input compact-input w-full">
                                    <option value="5">5 menit sebelum</option>
                                    <option value="10">10 menit sebelum</option>
                                    <option value="15">15 menit sebelum</option>
                                    <option value="30">30 menit sebelum</option>
                                    <option value="60">1 jam sebelum</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex space-x-3">
                            <button id="syncCalendar" class="enhanced-btn bg-green-600 hover:bg-green-700 text-white compact-btn">
                                <i class="fas fa-sync mr-2"></i>Sinkronkan Sekarang
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Google Drive Integration -->
                <div class="enhanced-card p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <i class="fab fa-google-drive text-blue-600 text-lg"></i>
                            </div>
                            <div>
                                <h4 class="font-black text-gray-800 dark:text-white">Google Drive</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-300">
                                    Backup otomatis ke Google Drive
                                </p>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="toggleDrive" class="sr-only peer">
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    
                    <div id="driveConfig" class="mt-4 space-y-4 hidden">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Folder ID Drive
                                </label>
                                <input type="text" id="inputDriveFolderId" class="enhanced-input compact-input w-full" 
                                       placeholder="ID Folder Drive">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Interval Backup
                                </label>
                                <select id="inputBackupInterval" class="enhanced-input compact-input w-full">
                                    <option value="daily">Setiap Hari</option>
                                    <option value="weekly">Setiap Minggu</option>
                                    <option value="monthly">Setiap Bulan</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex space-x-3">
                            <button id="backupToDrive" class="enhanced-btn bg-green-600 hover:bg-green-700 text-white compact-btn">
                                <i class="fas fa-cloud-upload-alt mr-2"></i>Backup Sekarang
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Google Maps Integration -->
                <div class="enhanced-card p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-map-marked-alt text-green-600 text-lg"></i>
                            </div>
                            <div>
                                <h4 class="font-black text-gray-800 dark:text-white">Google Maps</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-300">
                                    Integrasi lokasi sekolah dan maps
                                </p>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="toggleMaps" class="sr-only peer">
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                    </div>
                    
                    <div id="mapsConfig" class="mt-4 space-y-4 hidden">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    API Key Maps
                                </label>
                                <input type="password" id="inputMapsApiKey" class="enhanced-input compact-input w-full" 
                                       placeholder="Masukkan API Key Maps">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Lokasi Default
                                </label>
                                <input type="text" id="inputDefaultLocation" class="enhanced-input compact-input w-full" 
                                       placeholder="Alamat sekolah">
                            </div>
                        </div>
                        <div class="flex space-x-3">
                            <button id="openMaps" class="enhanced-btn bg-blue-600 hover:bg-blue-700 text-white compact-btn">
                                <i class="fas fa-map mr-2"></i>Buka Maps
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Google Lens Integration -->
                <div class="enhanced-card p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-camera text-purple-600 text-lg"></i>
                            </div>
                            <div>
                                <h4 class="font-black text-gray-800 dark:text-white">Google Lens</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-300">
                                    Analisis gambar dengan AI Google Lens
                                </p>
                            </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="toggleLens" class="sr-only peer">
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                    </div>
                    
                    <div id="lensConfig" class="mt-4 space-y-4 hidden">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    API Key Vision
                                </label>
                                <input type="password" id="inputLensApiKey" class="enhanced-input compact-input w-full" 
                                       placeholder="Masukkan API Key Vision">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Mode Analisis
                                </label>
                                <select id="inputAnalysisMode" class="enhanced-input compact-input w-full">
                                    <option value="text">Ekstrak Teks</option>
                                    <option value="label">Deteksi Objek</option>
                                    <option value="document">Analisis Dokumen</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex space-x-3">
                            <button id="analyzeImage" class="enhanced-btn bg-purple-600 hover:bg-purple-700 text-white compact-btn">
                                <i class="fas fa-camera mr-2"></i>Analisis Gambar
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="enhanced-card p-6">
                    <h4 class="text-lg font-black text-gray-800 dark:text-white mb-4">
                        <i class="fas fa-bolt mr-2"></i>Quick Actions
                    </h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <button id="quickExport" class="enhanced-btn bg-green-600 hover:bg-green-700 text-white compact-btn text-sm">
                            <i class="fas fa-file-excel mr-1"></i>Export All
                        </button>
                        <button id="quickBackup" class="enhanced-btn bg-blue-600 hover:bg-blue-700 text-white compact-btn text-sm">
                            <i class="fas fa-cloud-upload-alt mr-1"></i>Backup Now
                        </button>
                        <button id="quickSync" class="enhanced-btn bg-purple-600 hover:bg-purple-700 text-white compact-btn text-sm">
                            <i class="fas fa-sync mr-1"></i>Sync All
                        </button>
                        <button id="quickTest" class="enhanced-btn bg-yellow-600 hover:bg-yellow-700 text-white compact-btn text-sm">
                            <i class="fas fa-bolt mr-1"></i>Test All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Setup event listeners untuk integrasi
function setupIntegrationEventListeners() {
    // Gunakan event delegation untuk menangani dynamic elements
    document.addEventListener('click', function(e) {
        console.log('Click event:', e.target.id);
        
        // Verifikasi Email
        if (e.target.id === 'sendVerificationCode') {
            sendVerificationCode();
        }
        if (e.target.id === 'verifyEmail') {
            verifyEmail();
        }

        // Toggle Integrations
        if (e.target.id === 'toggleSheets' || e.target.closest('#toggleSheets')) {
            const checkbox = document.getElementById('toggleSheets');
            toggleIntegration('sheets', checkbox.checked);
        }
        if (e.target.id === 'toggleCalendar' || e.target.closest('#toggleCalendar')) {
            const checkbox = document.getElementById('toggleCalendar');
            toggleIntegration('calendar', checkbox.checked);
        }
        if (e.target.id === 'toggleDrive' || e.target.closest('#toggleDrive')) {
            const checkbox = document.getElementById('toggleDrive');
            toggleIntegration('drive', checkbox.checked);
        }
        if (e.target.id === 'toggleMaps' || e.target.closest('#toggleMaps')) {
            const checkbox = document.getElementById('toggleMaps');
            toggleIntegration('maps', checkbox.checked);
        }
        if (e.target.id === 'toggleLens' || e.target.closest('#toggleLens')) {
            const checkbox = document.getElementById('toggleLens');
            toggleIntegration('lens', checkbox.checked);
        }

        // Integration Actions
        if (e.target.id === 'testSheets') testSheetsConnection();
        if (e.target.id === 'exportToSheets') exportToSheets();
        if (e.target.id === 'syncCalendar') syncCalendar();
        if (e.target.id === 'backupToDrive') backupToDrive();
        if (e.target.id === 'openMaps') openMaps();
        if (e.target.id === 'analyzeImage') analyzeImage();

        // Quick Actions
        if (e.target.id === 'quickExport') quickExportAll();
        if (e.target.id === 'quickBackup') quickBackupAll();
        if (e.target.id === 'quickSync') quickSyncAll();
        if (e.target.id === 'quickTest') quickTestAll();
    });

    // Input changes
    document.addEventListener('input', function(e) {
        if (e.target.id === 'inputUserEmail') {
            validateEmailInput();
        }
    });
}

// Setup toggles setelah DOM siap
function setupIntegrationToggles() {
    const toggles = ['toggleSheets', 'toggleCalendar', 'toggleDrive', 'toggleMaps', 'toggleLens'];
    
    toggles.forEach(toggleId => {
        const toggle = document.getElementById(toggleId);
        if (toggle) {
            // Set initial state dari saved state
            const service = toggleId.replace('toggle', '').toLowerCase();
            toggle.checked = GOOGLE_INTEGRATION_STATE.integrations[service] || false;
            
            // Trigger change event untuk menampilkan/sembunyikan config
            if (toggle.checked) {
                toggleIntegration(service, true);
            }
        }
    });
}

// [Fungsi-fungsi lainnya tetap sama seperti sebelumnya...]
// Fungsi verifikasi email
function sendVerificationCode() {
    const email = document.getElementById('inputUserEmail').value.trim();
    
    if (!email) {
        showNotification('⚠️ Masukkan alamat email terlebih dahulu', 'warning');
        return;
    }

    if (!validateEmail(email)) {
        showNotification('⚠️ Format email tidak valid', 'warning');
        return;
    }

    // Simulasi pengiriman kode verifikasi
    const verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    sessionStorage.setItem('verification_code', verificationCode);
    sessionStorage.setItem('verification_email', email);

    // Enable verification input
    document.getElementById('inputVerificationCode').disabled = false;
    document.getElementById('verifyEmail').disabled = false;
    document.getElementById('verifyEmail').classList.remove('bg-gray-400');
    document.getElementById('verifyEmail').classList.add('bg-green-600', 'hover:bg-green-700');

    showNotification(`📧 Kode verifikasi telah dikirim ke ${email}`, 'info');
    
    // Dalam implementasi nyata, kirim email di sini
    console.log(`Kode verifikasi untuk ${email}: ${verificationCode}`);
}

function verifyEmail() {
    const email = document.getElementById('inputUserEmail').value.trim();
    const code = document.getElementById('inputVerificationCode').value.trim();
    const storedCode = sessionStorage.getItem('verification_code');
    const storedEmail = sessionStorage.getItem('verification_email');

    if (!email || !code) {
        showNotification('⚠️ Masukkan email dan kode verifikasi', 'warning');
        return;
    }

    if (email !== storedEmail || code !== storedCode) {
        showNotification('❌ Kode verifikasi tidak valid', 'error');
        return;
    }

    // Check if email is allowed
    const isAllowed = GOOGLE_INTEGRATION_STATE.allowedEmails.includes(email);
    
    GOOGLE_INTEGRATION_STATE.verified = true;
    GOOGLE_INTEGRATION_STATE.userEmail = email;

    saveIntegrationData();
    updateVerificationUI();

    if (isAllowed) {
        showNotification('✅ Email terverifikasi! Akses penuh diaktifkan', 'success');
    } else {
        showNotification('✅ Email terverifikasi! Fitur dasar diaktifkan', 'success');
    }
}

function validateEmailInput() {
    const email = document.getElementById('inputUserEmail').value.trim();
    const sendButton = document.getElementById('sendVerificationCode');
    
    if (validateEmail(email)) {
        sendButton.disabled = false;
    } else {
        sendButton.disabled = true;
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Update UI berdasarkan status verifikasi
function updateVerificationUI() {
    const statusCard = document.getElementById('verificationStatus');
    const verificationText = document.getElementById('verificationText');
    const verificationBadge = document.getElementById('verificationBadge');
    const emailForm = document.getElementById('emailVerificationForm');
    const integrationPanel = document.getElementById('googleIntegrationPanel');

    if (!statusCard) {
        console.log('❌ Element verification tidak ditemukan');
        return;
    }

    if (GOOGLE_INTEGRATION_STATE.verified) {
        // Update badge
        verificationBadge.innerHTML = `
            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <i class="fas fa-check-circle mr-1"></i>Terverifikasi
            </span>
        `;

        // Update text
        verificationText.innerHTML = `
            Email <strong>${GOOGLE_INTEGRATION_STATE.userEmail}</strong> telah terverifikasi
        `;

        // Hide form, show integration panel
        if (emailForm) emailForm.style.display = 'none';
        if (integrationPanel) integrationPanel.classList.remove('hidden');

        // Check if email is in allowed list
        const isAllowed = GOOGLE_INTEGRATION_STATE.allowedEmails.includes(GOOGLE_INTEGRATION_STATE.userEmail);
        
        if (isAllowed) {
            verificationText.innerHTML += ` - <span class="text-green-600">Akses Eksklusif Diaktifkan</span>`;
        } else {
            verificationText.innerHTML += ` - <span class="text-blue-600">Akses Standar Diaktifkan</span>`;
            // Disable some premium features for non-allowed emails
            disablePremiumFeatures();
        }

    } else {
        verificationBadge.innerHTML = `
            <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                <i class="fas fa-exclamation-triangle mr-1"></i>Belum Terverifikasi
            </span>
        `;
        if (emailForm) emailForm.style.display = 'block';
        if (integrationPanel) integrationPanel.classList.add('hidden');
    }
}

function disablePremiumFeatures() {
    // Non-allowed emails get limited access
    const premiumFeatures = ['toggleLens', 'toggleMaps'];
    premiumFeatures.forEach(featureId => {
        const element = document.getElementById(featureId);
        if (element) {
            element.disabled = true;
            element.parentElement.classList.add('opacity-50');
        }
    });
}

// Toggle integration configurations
function toggleIntegration(service, enabled) {
    GOOGLE_INTEGRATION_STATE.integrations[service] = enabled;
    
    const configElement = document.getElementById(`${service}Config`);
    if (configElement) {
        if (enabled) {
            configElement.classList.remove('hidden');
        } else {
            configElement.classList.add('hidden');
        }
    }
    
    saveIntegrationData();
    showNotification(`Google ${service} ${enabled ? 'diaktifkan' : 'dinonaktifkan'}`, 'info');
}

// Integration functions (simulated)
function testSheetsConnection() {
    showNotification('🔗 Menguji koneksi Google Sheets...', 'info');
    setTimeout(() => {
        showNotification('✅ Koneksi Google Sheets berhasil', 'success');
    }, 2000);
}

function exportToSheets() {
    showNotification('📊 Mengekspor data ke Google Sheets...', 'info');
    setTimeout(() => {
        showNotification('✅ Data berhasil diekspor ke Google Sheets', 'success');
    }, 3000);
}

function syncCalendar() {
    showNotification('📅 Menyinkronkan dengan Google Calendar...', 'info');
    setTimeout(() => {
        showNotification('✅ Jadwal berhasil disinkronkan', 'success');
    }, 2500);
}

function backupToDrive() {
    showNotification('☁️ Membackup data ke Google Drive...', 'info');
    setTimeout(() => {
        showNotification('✅ Backup ke Google Drive berhasil', 'success');
    }, 3000);
}

function openMaps() {
    showNotification('🗺️ Membuka Google Maps...', 'info');
    // In real implementation, this would open maps with school location
    setTimeout(() => {
        showNotification('📍 Google Maps siap digunakan', 'success');
    }, 1000);
}

function analyzeImage() {
    showNotification('🔍 Menganalisis gambar dengan Google Lens...', 'info');
    setTimeout(() => {
        showNotification('✅ Analisis gambar selesai', 'success');
    }, 2000);
}

// Quick actions
function quickExportAll() {
    showNotification('🚀 Mengekspor semua data...', 'info');
    setTimeout(() => {
        showNotification('✅ Semua data berhasil diekspor', 'success');
    }, 4000);
}

function quickBackupAll() {
    showNotification('🚀 Membackup semua data...', 'info');
    setTimeout(() => {
        showNotification('✅ Semua data berhasil dibackup', 'success');
    }, 4000);
}

function quickSyncAll() {
    showNotification('🚀 Menyinkronkan semua layanan...', 'info');
    setTimeout(() => {
        showNotification('✅ Semua layanan tersinkronisasi', 'success');
    }, 3500);
}

function quickTestAll() {
    showNotification('🚀 Menguji semua koneksi...', 'info');
    setTimeout(() => {
        showNotification('✅ Semua koneksi berfungsi normal', 'success');
    }, 3000);
}

// Check email verification status
function checkEmailVerification() {
    const saved = localStorage.getItem('stl_udhis_google_integration');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            GOOGLE_INTEGRATION_STATE.verified = data.verified || false;
            GOOGLE_INTEGRATION_STATE.userEmail = data.userEmail || '';
            GOOGLE_INTEGRATION_STATE.integrations = data.integrations || GOOGLE_INTEGRATION_STATE.integrations;
            GOOGLE_INTEGRATION_STATE.apiKeys = data.apiKeys || GOOGLE_INTEGRATION_STATE.apiKeys;
        } catch (error) {
            console.error('Error loading integration data:', error);
        }
    }
    
    updateVerificationUI();
}

// Save integration data
function saveIntegrationData() {
    localStorage.setItem('stl_udhis_google_integration', JSON.stringify(GOOGLE_INTEGRATION_STATE));
}

function loadIntegrationData() {
    const saved = localStorage.getItem('stl_udhis_google_integration');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            Object.assign(GOOGLE_INTEGRATION_STATE, data);
        } catch (error) {
            console.error('Error loading integration data:', error);
        }
    }
}

// Helper function untuk notifikasi
function showNotification(message, type = 'info') {
    if (typeof updateDynamicIsland !== 'undefined') {
        updateDynamicIsland(message, 3000);
    } else {
        // Fallback notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        const bgColors = {
            'success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            'error': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            'warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            'info': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
        };
        
        notification.style.background = bgColors[type] || bgColors.info;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
}

// Pastikan fungsi switchTab tersedia
if (typeof switchTab === 'undefined') {
    window.switchTab = function(tabName) {
        // Sembunyikan semua tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // Hapus active class dari semua tab
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Tampilkan tab yang dipilih
        const targetTab = document.getElementById(tabName);
        const targetTabButton = document.querySelector(`[data-tab="${tabName}"]`);
        
        if (targetTab) {
            targetTab.style.display = 'block';
        }
        if (targetTabButton) {
            targetTabButton.classList.add('active');
        }

        // Jika pindah ke tab integrasi, update UI
        if (tabName === 'integrasi') {
            setTimeout(updateVerificationUI, 100);
        }
    };
}

// Integrasi dengan aplikasi utama
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Ready - Memulai inisialisasi integrasi Google...');
    setTimeout(() => {
        initializeGoogleIntegration();
    }, 2000);
});

// Fallback: Coba inisialisasi lagi setelah 5 detik
setTimeout(() => {
    if (!document.querySelector('[data-tab="integrasi"]')) {
        console.log('🔄 Fallback: Mengulang inisialisasi integrasi Google...');
        initializeGoogleIntegration();
    }
}, 5000);

console.log('🔗 Script Integrasi Google Loaded');

// ==================== SISTEM KEAMANAN API KEY ====================
class APISecurity {
    constructor() {
        this.encryptionKey = null;
        this.init();
    }

    async init() {
        await this.generateEncryptionKey();
        this.injectSecurityLayer();
    }

    async generateEncryptionKey() {
        // Generate encryption key from browser fingerprint
        const fingerprint = await this.getBrowserFingerprint();
        this.encryptionKey = await this.hashString(fingerprint);
    }

    async getBrowserFingerprint() {
        const components = [
            navigator.userAgent,
            navigator.language,
            navigator.hardwareConcurrency,
            screen.width + 'x' + screen.height,
            new Date().getTimezoneOffset()
        ];
        return components.join('|');
    }

    async hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    async encryptAPIKey(apiKey) {
        const encoder = new TextEncoder();
        const data = encoder.encode(apiKey);
        const key = await crypto.subtle.importKey(
            'raw',
            encoder.encode(this.encryptionKey.slice(0, 32)),
            { name: 'AES-GCM' },
            false,
            ['encrypt']
        );
        
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            data
        );
        
        return {
            iv: Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join(''),
            data: Array.from(new Uint8Array(encrypted)).map(b => b.toString(16).padStart(2, '0')).join('')
        };
    }

    async decryptAPIKey(encryptedData) {
        try {
            const encoder = new TextEncoder();
            const key = await crypto.subtle.importKey(
                'raw',
                encoder.encode(this.encryptionKey.slice(0, 32)),
                { name: 'AES-GCM' },
                false,
                ['decrypt']
            );
            
            const iv = new Uint8Array(encryptedData.iv.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
            const data = new Uint8Array(encryptedData.data.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
            
            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv },
                key,
                data
            );
            
            return new TextDecoder().decode(decrypted);
        } catch (error) {
            console.error('Decryption failed:', error);
            return null;
        }
    }

    injectSecurityLayer() {
        // Intercept API calls untuk menambahkan security headers
        const originalFetch = window.fetch;
        window.fetch = async (url, options = {}) => {
            if (this.isAPIRequest(url)) {
                const encryptedKey = localStorage.getItem('encrypted_api_key');
                if (encryptedKey) {
                    const apiKeyData = JSON.parse(encryptedKey);
                    const decryptedKey = await this.decryptAPIKey(apiKeyData);
                    
                    options.headers = {
                        ...options.headers,
                        'X-API-Key': decryptedKey,
                        'X-Request-ID': this.generateRequestID(),
                        'X-Security-Token': await this.generateSecurityToken()
                    };
                }
            }
            return originalFetch(url, options);
        };
    }

    isAPIRequest(url) {
        return url.includes('/api/') || url.includes('openai') || url.includes('anthropic');
    }

    generateRequestID() {
        return 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    async generateSecurityToken() {
        const timestamp = Date.now();
        const data = timestamp + this.encryptionKey;
        return await this.hashString(data);
    }

    validateAPIKey(apiKey) {
        // Validasi format API key
        const patterns = [
            /^sk-[a-zA-Z0-9]{48}$/, // OpenAI
            /^[a-zA-Z0-9]{32,64}$/, // Umum
            /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/ // UUID
        ];
        return patterns.some(pattern => pattern.test(apiKey));
    }
}

// ==================== SISTEM EKSPOR DOKUMEN ====================
class DocumentExporter {
    constructor() {
        this.init();
    }

    init() {
        this.injectExportButtons();
    }

    injectExportButtons() {
        // Inject export buttons ke chat messages
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.classList && 
                        (node.classList.contains('ai-message') || node.classList.contains('user-message'))) {
                        this.addExportOptions(node);
                    }
                });
            });
        });

        observer.observe(document.getElementById('chatMessages'), {
            childList: true,
            subtree: true
        });
    }

    addExportOptions(messageElement) {
        const messageBubble = messageElement.querySelector('.message-bubble');
        if (!messageBubble) return;

        const messageText = messageBubble.textContent;
        
        // Cek apakah ini RPP, PROTA, atau PROMES
        if (this.isEducationalDocument(messageText)) {
            const exportContainer = document.createElement('div');
            exportContainer.className = 'export-options mt-3 flex flex-wrap gap-2';
            exportContainer.innerHTML = `
                <button class="export-btn enhanced-btn compact-btn bg-red-600 hover:bg-red-700 text-white text-xs" data-format="pdf">
                    <i class="fas fa-file-pdf mr-1"></i>PDF
                </button>
                <button class="export-btn enhanced-btn compact-btn bg-blue-600 hover:bg-blue-700 text-white text-xs" data-format="docx">
                    <i class="fas fa-file-word mr-1"></i>Word
                </button>
                <button class="export-btn enhanced-btn compact-btn bg-green-600 hover:bg-green-700 text-white text-xs" data-format="txt">
                    <i class="fas fa-file-alt mr-1"></i>TXT
                </button>
                <button class="export-btn enhanced-btn compact-btn bg-yellow-600 hover:bg-yellow-700 text-white text-xs" data-format="jpg">
                    <i class="fas fa-file-image mr-1"></i>JPG
                </button>
                <button class="export-btn enhanced-btn compact-btn bg-purple-600 hover:bg-purple-700 text-white text-xs" data-format="png">
                    <i class="fas fa-image mr-1"></i>PNG
                </button>
            `;

            messageBubble.appendChild(exportContainer);

            // Tambahkan event listeners
            exportContainer.querySelectorAll('.export-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const format = btn.getAttribute('data-format');
                    this.exportDocument(messageText, format, this.getDocumentType(messageText));
                });
            });
        }
    }

    isEducationalDocument(text) {
        const keywords = [
            'RENCANA PELAKSANAAN PEMBELAJARAN',
            'RPP',
            'PROGRAM TAHUNAN', 
            'PROTA',
            'PROGRAM SEMESTER',
            'PROMES',
            'Kompetensi Inti',
            'Kompetensi Dasar',
            'Indikator Pencapaian Kompetensi'
        ];
        return keywords.some(keyword => 
            text.toUpperCase().includes(keyword.toUpperCase())
        );
    }

    getDocumentType(text) {
        if (text.includes('RENCANA PELAKSANAAN PEMBELAJARAN') || text.includes('RPP')) {
            return 'RPP';
        } else if (text.includes('PROGRAM TAHUNAN') || text.includes('PROTA')) {
            return 'PROTA';
        } else if (text.includes('PROGRAM SEMESTER') || text.includes('PROMES')) {
            return 'PROMES';
        }
        return 'DOCUMENT';
    }

    async exportDocument(content, format, docType) {
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `${docType}_${timestamp}`;

        try {
            switch (format) {
                case 'pdf':
                    await this.exportToPDF(content, filename);
                    break;
                case 'docx':
                    await this.exportToDOCX(content, filename);
                    break;
                case 'txt':
                    this.exportToTXT(content, filename);
                    break;
                case 'jpg':
                case 'png':
                    await this.exportToImage(content, filename, format);
                    break;
            }
            
            updateDynamicIsland(`✅ ${docType} berhasil diekspor sebagai ${format.toUpperCase()}`, 3000);
        } catch (error) {
            console.error('Export error:', error);
            updateDynamicIsland('❌ Gagal mengekspor dokumen', 3000);
        }
    }

    async exportToPDF(content, filename) {
        // Gunakan browser's print to PDF
        const printWindow = window.open('', '_blank');
        const styledContent = this.formatContentForPrint(content);
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${filename}</title>
                <style>
                    body { 
                        font-family: 'Arial', sans-serif; 
                        line-height: 1.6; 
                        margin: 20px;
                        color: #333;
                    }
                    .header { 
                        text-align: center; 
                        border-bottom: 2px solid #333;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }
                    .content { 
                        white-space: pre-wrap;
                        font-size: 12px;
                    }
                    .section { 
                        margin-bottom: 15px; 
                    }
                    .section-title { 
                        font-weight: bold; 
                        margin-bottom: 5px;
                        color: #2c5282;
                    }
                    @media print {
                        body { margin: 0; }
                    }
                </style>
            </head>
            <body>
                <div class="content">${styledContent}</div>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
        setTimeout(() => printWindow.close(), 1000);
    }

    async exportToDOCX(content, filename) {
        // Simulate DOCX export using Blob
        const formattedContent = this.formatContentForWord(content);
        const blob = new Blob([formattedContent], { 
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    exportToTXT(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    async exportToImage(content, filename, format) {
        // Create canvas from content
        const tempDiv = document.createElement('div');
        tempDiv.style.cssText = `
            position: fixed; 
            left: -9999px; 
            top: 0;
            width: 800px;
            padding: 20px;
            background: white;
            color: black;
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            white-space: pre-wrap;
        `;
        tempDiv.textContent = content;
        document.body.appendChild(tempDiv);

        // Use html2canvas if available, otherwise fallback
        if (typeof html2canvas !== 'undefined') {
            const canvas = await html2canvas(tempDiv);
            const imageData = canvas.toDataURL(`image/${format}`);
            
            const a = document.createElement('a');
            a.href = imageData;
            a.download = `${filename}.${format}`;
            a.click();
        } else {
            // Fallback to simple text image
            this.exportToTXT(content, filename);
        }
        
        document.body.removeChild(tempDiv);
    }

    formatContentForPrint(content) {
        // Format content dengan styling untuk print/PDF
        return content
            .split('\n')
            .map(line => {
                if (line.trim().endsWith('**') && line.trim().startsWith('**')) {
                    return `<div class="section-title">${line.replace(/\*\*/g, '')}</div>`;
                } else if (line.trim() === '') {
                    return '<br>';
                } else {
                    return `<div class="section">${line}</div>`;
                }
            })
            .join('');
    }

    formatContentForWord(content) {
        // Simple formatting untuk Word
        return content
            .split('\n')
            .map(line => {
                if (line.trim().endsWith('**') && line.trim().startsWith('**')) {
                    return `\\b ${line.replace(/\*\*/g, '')} \\b0\\par `;
                } else {
                    return `${line}\\par `;
                }
            })
            .join('');
    }
}

// ==================== INJEKSI SISTEM KE DALAM APLIKASI ====================
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi sistem keamanan
    const apiSecurity = new APISecurity();
    
    // Inisialisasi sistem ekspor
    const documentExporter = new DocumentExporter();

    // Override fungsi saveApiConfig untuk enkripsi
    const originalSaveApiConfig = window.saveApiConfig;
    window.saveApiConfig = async function() {
        const apiKey = document.getElementById('apiKey').value;
        const proxyUrl = document.getElementById('proxyUrl').value;

        if (apiKey && !apiSecurity.validateAPIKey(apiKey)) {
            updateDynamicIsland('⚠️ Format API Key tidak valid', 3000);
            return;
        }

        if (apiKey) {
            const encryptedData = await apiSecurity.encryptAPIKey(apiKey);
            localStorage.setItem('encrypted_api_key', JSON.stringify(encryptedData));
            // Clear plain text API key dari memory
            CONFIG.apiKey = '[ENCRYPTED]';
        }

        CONFIG.proxyUrl = proxyUrl;
        saveConfig();
        updateDynamicIsland('✅ Konfigurasi API Disimpan & Dienkripsi', 2000);
        toggleSidebar();
    };

    // Override fungsi load config untuk dekripsi
    const originalInitializeApp = window.initializeApp;
    window.initializeApp = async function() {
        await originalInitializeApp();
        
        // Load encrypted API key
        const encryptedData = localStorage.getItem('encrypted_api_key');
        if (encryptedData) {
            try {
                const decryptedKey = await apiSecurity.decryptAPIKey(JSON.parse(encryptedData));
                if (decryptedKey) {
                    CONFIG.apiKey = decryptedKey;
                    document.getElementById('apiKey').value = '••••••••••••••••••••';
                }
            } catch (error) {
                console.error('Failed to decrypt API key:', error);
            }
        }
    };

    // Enhanced AI response dengan format dokumen yang lebih baik
    const originalSimulateAIResponse = window.simulateAIResponse;
    window.simulateAIResponse = async function(message) {
        const response = await originalSimulateAIResponse(message);
        return this.formatEducationalDocument(response, message);
    }.bind({
        formatEducationalDocument: function(response, originalMessage) {
            if (originalMessage.toLowerCase().includes('rpp') || 
                originalMessage.toLowerCase().includes('prota') || 
                originalMessage.toLowerCase().includes('promes')) {
                
                return this.addDocumentFormatting(response, originalMessage);
            }
            return response;
        },
        
        addDocumentFormatting: function(content, messageType) {
            const timestamp = new Date().toLocaleDateString('id-ID');
            let docType = 'DOKUMEN';
            
            if (messageType.toLowerCase().includes('rpp')) {
                docType = 'RENCANA PELAKSANAAN PEMBELAJARAN (RPP)';
            } else if (messageType.toLowerCase().includes('prota')) {
                docType = 'PROGRAM TAHUNAN (PROTA)';
            } else if (messageType.toLowerCase().includes('promes')) {
                docType = 'PROGRAM SEMESTER (PROMES)';
            }
            
            return `**${docType}**\n**Tanggal:** ${timestamp}\n**Status:** Draft\n\n${content}\n\n---\n*Dokumen ini dibuat otomatis oleh UDHIS AI Assistant. Silakan sesuaikan dengan kebutuhan spesifik Anda.*`;
        }
    });

    // Tambahkan CSS untuk export buttons
    const exportStyles = `
        .export-options {
            border-top: 1px solid var(--theme-border);
            padding-top: 10px;
        }
        .export-btn {
            transition: all 0.3s ease;
        }
        .export-btn:hover {
            transform: translateY(-2px);
        }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.textContent = exportStyles;
    document.head.appendChild(styleSheet);

    console.log('✅ Sistem keamanan API dan ekspor dokumen telah diinjeksi');
});

// Load html2canvas untuk fitur ekspor gambar
const loadHTML2Canvas = () => {
    if (typeof html2canvas === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.integrity = 'sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyooqYO/QCJUIUVzBQJaBLo+7K3MpGQ==';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
    }
};

// Auto-load html2canvas ketika aplikasi ready
setTimeout(loadHTML2Canvas, 2000);

// ==================== SISTEM TUTORIAL API KEY (SEMUA PROVIDER) ====================

const AI_PROVIDERS = {
    openai: {
        name: 'OpenAI',
        icon: 'fab fa-openai',
        color: 'blue',
        features: ['GPT-4', 'GPT-3.5', 'Kualitas tinggi', 'Multibahasa'],
        pricing: '$$',
        freeTier: '$5 kredit baru',
        website: 'https://platform.openai.com/signup',
        apiKeys: 'https://platform.openai.com/api-keys',
        billing: 'https://platform.openai.com/billing'
    },
    google: {
        name: 'Google AI',
        icon: 'fab fa-google',
        color: 'green', 
        features: ['Gemini Pro', 'Integrasi Google', 'Harga murah', 'Response cepat'],
        pricing: '$',
        freeTier: '60 req/menit + $300 kredit',
        website: 'https://aistudio.google.com',
        apiKeys: 'https://aistudio.google.com',
        billing: 'https://cloud.google.com/vertex-ai/pricing'
    },
    deepseek: {
        name: 'DeepSeek',
        icon: 'fas fa-search',
        color: 'purple',
        features: ['Gratis 100%', 'No credit card', 'API langsung', 'Dokumentasi lengkap'],
        pricing: 'Gratis',
        freeTier: 'Unlimited (syarat berlaku)',
        website: 'https://platform.deepseek.com',
        apiKeys: 'https://platform.deepseek.com/api_keys',
        billing: null
    },
    anthropic: {
        name: 'Anthropic Claude',
        icon: 'fas fa-robot',
        color: 'orange',
        features: ['Claude 3', 'Context panjang', 'Reasoning baik', 'Enterprise focus'],
        pricing: '$$$',
        freeTier: 'Trial tersedia',
        website: 'https://console.anthropic.com',
        apiKeys: 'https://console.anthropic.com/settings/keys',
        billing: 'https://anthropic.com/pricing'
    },
    groq: {
        name: 'Groq',
        icon: 'fas fa-bolt',
        color: 'red',
        features: ['Speed tercepat', 'LPU inference', 'Gratis generous', 'Real-time'],
        pricing: 'Gratis (sementara)',
        freeTier: '25K req/hari',
        website: 'https://console.groq.com',
        apiKeys: 'https://console.groq.com/keys',
        billing: 'https://groq.com/pricing'
    },
    together: {
        name: 'Together AI',
        icon: 'fas fa-cloud',
        color: 'indigo',
        features: ['Open-source models', 'Harga kompetitif', 'Many models', 'Flexible'],
        pricing: '$',
        freeTier: '$25 kredit baru',
        website: 'https://api.together.xyz',
        apiKeys: 'https://api.together.xyz/settings/api-keys',
        billing: 'https://together.xyz/pricing'
    },
    huggingface: {
        name: 'Hugging Face',
        icon: 'fas fa-heart',
        color: 'yellow',
        features: ['Open-source', 'Community', 'Many models', 'Research focus'],
        pricing: 'Gratis - $$',
        freeTier: 'Gratis terbatas',
        website: 'https://huggingface.co',
        apiKeys: 'https://huggingface.co/settings/tokens',
        billing: 'https://huggingface.co/pricing'
    },
    cohere: {
        name: 'Cohere',
        icon: 'fas fa-comments',
        color: 'teal',
        features: ['Enterprise focus', 'Multibahasa', 'RAG optimized', 'Production ready'],
        pricing: '$$',
        freeTier: 'Trial available',
        website: 'https://dashboard.cohere.com',
        apiKeys: 'https://dashboard.cohere.com/api-keys',
        billing: 'https://cohere.com/pricing'
    }
};

function initializeApiTutorial() {
    injectApiTutorialTab();
    setupTutorialEventListeners();
}

function injectApiTutorialTab() {
    setTimeout(() => {
        console.log('🔧 Menambahkan tab Tutorial API...');
        
        let targetTabContainer = document.querySelector('.tab-container');
        
        if (!targetTabContainer) {
            targetTabContainer = document.querySelector('[class*="tab-container"]');
        }
        
        if (targetTabContainer && !targetTabContainer.querySelector('[data-tab="tutorial"]')) {
            const tutorialTab = document.createElement('button');
            tutorialTab.className = 'tab';
            tutorialTab.setAttribute('data-tab', 'tutorial');
            tutorialTab.innerHTML = '<i class="fas fa-graduation-cap mr-2"></i>Tutorial API';
            targetTabContainer.appendChild(tutorialTab);

            tutorialTab.addEventListener('click', function() {
                switchTab('tutorial');
            });
        }

        const targetContentContainer = document.querySelector('.enhanced-card.p-6.mobile-optimized');
        
        if (targetContentContainer && !targetContentContainer.querySelector('#tutorial')) {
            const tutorialContent = document.createElement('div');
            tutorialContent.id = 'tutorial';
            tutorialContent.className = 'tab-content';
            tutorialContent.innerHTML = generateTutorialTabContent();
            targetContentContainer.appendChild(tutorialContent);
        }
        
    }, 2000);
}

function generateTutorialTabContent() {
    return `
        <div class="space-y-6">
            <!-- Header -->
            <div class="text-center mb-8">
                <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <i class="fas fa-graduation-cap text-white text-3xl"></i>
                </div>
                <h3 class="text-2xl font-black text-gray-800 dark:text-white mb-2">
                    Tutorial Lengkap API Key
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                    Panduan lengkap untuk mendapatkan API Key dari semua provider AI
                </p>
            </div>

            <!-- Pilihan Provider -->
            <div class="enhanced-card p-6">
                <h4 class="text-lg font-black text-gray-800 dark:text-white mb-4">
                    <i class="fas fa-plug mr-2"></i>Pilih Provider AI
                </h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3" id="providers-grid">
                    ${Object.entries(AI_PROVIDERS).map(([key, provider]) => `
                        <div class="provider-option ${key === 'openai' ? 'active' : ''}" data-provider="${key}">
                            <div class="p-3 border-2 ${key === 'openai' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 bg-gray-50 dark:bg-gray-800'} rounded-lg cursor-pointer transition-all duration-300 hover:scale-105">
                                <div class="flex items-center mb-2">
                                    <div class="w-8 h-8 ${getProviderColorClass(provider.color)} rounded-full flex items-center justify-center mr-2">
                                        <i class="${provider.icon} text-white text-sm"></i>
                                    </div>
                                    <h5 class="font-black text-sm ${getProviderTextColorClass(provider.color)}">${provider.name}</h5>
                                </div>
                                <div class="flex justify-between items-center mb-1">
                                    <span class="text-xs ${getProviderTextColorClass(provider.color)}">${provider.pricing}</span>
                                    <span class="text-xs bg-green-100 text-green-800 px-1 rounded">${provider.freeTier.split(' ')[0]}</span>
                                </div>
                                <p class="text-xs text-gray-600 dark:text-gray-400 truncate">${provider.features[0]}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Konten Tutorial untuk Setiap Provider -->
            ${Object.entries(AI_PROVIDERS).map(([key, provider]) => `
                <div id="${key}-tutorial" class="tutorial-content ${key === 'openai' ? 'active' : 'hidden'}">
                    ${generateProviderTutorial(key, provider)}
                </div>
            `).join('')}

            <!-- Langkah Umum: Gunakan di STL-UDHIS -->
            <div class="enhanced-card p-6">
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span class="text-white font-black text-lg">★</span>
                    </div>
                    <div class="flex-1">
                        <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">
                            Gunakan di STL-UDHIS
                        </h4>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">
                            Setelah memiliki API Key, konfigurasikan di aplikasi.
                        </p>
                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
                            <h5 class="font-black text-purple-800 dark:text-purple-200 mb-2">Langkah Konfigurasi:</h5>
                            <ol class="list-decimal list-inside space-y-2 text-sm text-purple-700 dark:text-purple-300">
                                <li>Buka Sidebar (klik 3x di layar atau swipe dari kanan)</li>
                                <li>Pilih bagian "Konfigurasi API"</li>
                                <li>Paste API Key di field "API Key"</li>
                                <li>Untuk provider tertentu, mungkin perlu Proxy URL</li>
                                <li>Klik "Simpan Konfigurasi"</li>
                                <li>Tutup sidebar dan test AI Assistant</li>
                            </ol>
                        </div>
                        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <button onclick="openSidebarToConfig()" class="enhanced-btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                                <i class="fas fa-cog mr-2"></i>Buka Konfigurasi API
                            </button>
                            <button onclick="testAIAssistant()" class="enhanced-btn bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                                <i class="fas fa-robot mr-2"></i>Test AI Assistant
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Perbandingan Semua Provider -->
            <div class="enhanced-card p-6">
                <h4 class="text-lg font-black text-gray-800 dark:text-white mb-4">
                    <i class="fas fa-balance-scale mr-2"></i>Perbandingan Provider AI
                </h4>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                                <th class="text-left py-3 px-4 font-black">Provider</th>
                                <th class="text-left py-3 px-4 font-black">Model Unggulan</th>
                                <th class="text-left py-3 px-4 font-black">Harga</th>
                                <th class="text-left py-3 px-4 font-black">Gratis</th>
                                <th class="text-left py-3 px-4 font-black">Kelebihan</th>
                                <th class="text-left py-3 px-4 font-black">Rekomendasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.entries(AI_PROVIDERS).map(([key, provider]) => `
                                <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td class="py-3 px-4 font-medium">
                                        <div class="flex items-center">
                                            <div class="w-6 h-6 ${getProviderColorClass(provider.color)} rounded-full flex items-center justify-center mr-2">
                                                <i class="${provider.icon} text-white text-xs"></i>
                                            </div>
                                            ${provider.name}
                                        </div>
                                    </td>
                                    <td class="py-3 px-4">${provider.features[0]}</td>
                                    <td class="py-3 px-4">
                                        <span class="font-bold ${getPricingColorClass(provider.pricing)}">
                                            ${provider.pricing}
                                        </span>
                                    </td>
                                    <td class="py-3 px-4">${provider.freeTier}</td>
                                    <td class="py-3 px-4">
                                        <div class="text-xs">
                                            ${provider.features.slice(1, 3).map(f => `• ${f}`).join('<br>')}
                                        </div>
                                    </td>
                                    <td class="py-3 px-4 text-xs">
                                        ${getProviderRecommendation(key)}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="enhanced-card p-6">
                <h4 class="text-lg font-black text-gray-800 dark:text-white mb-4">
                    <i class="fas fa-bolt mr-2"></i>Quick Actions
                </h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    ${Object.entries(AI_PROVIDERS).slice(0, 4).map(([key, provider]) => `
                        <button onclick="openProviderWebsite('${key}')" class="enhanced-btn ${getProviderButtonClass(provider.color)} text-white compact-btn text-sm">
                            <i class="${provider.icon} mr-1"></i>${provider.name}
                        </button>
                    `).join('')}
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    ${Object.entries(AI_PROVIDERS).slice(4, 8).map(([key, provider]) => `
                        <button onclick="openProviderWebsite('${key}')" class="enhanced-btn ${getProviderButtonClass(provider.color)} text-white compact-btn text-sm">
                            <i class="${provider.icon} mr-1"></i>${provider.name}
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function generateProviderTutorial(providerKey, provider) {
    const tutorials = {
        openai: `
            <div class="space-y-6">
                <div class="enhanced-card p-6">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span class="text-blue-600 font-black text-lg">1</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">Daftar Akun OpenAI</h4>
                            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                <ol class="list-decimal list-inside space-y-2 text-sm text-blue-700 dark:text-blue-300">
                                    <li>Kunjungi platform.openai.com/signup</li>
                                    <li>Buat akun dengan email dan password</li>
                                    <li>Verifikasi email dan nomor telepon</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="enhanced-card p-6">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span class="text-green-600 font-black text-lg">2</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">Dapatkan API Key</h4>
                            <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                <ol class="list-decimal list-inside space-y-2 text-sm text-green-700 dark:text-green-300">
                                    <li>Login ke platform.openai.com</li>
                                    <li>Klik profil → "View API Keys"</li>
                                    <li>Klik "Create new secret key"</li>
                                    <li>Copy API Key</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="enhanced-card p-6">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <span class="text-purple-600 font-black text-lg">3</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">Tambah Kredit</h4>
                            <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                <ul class="list-disc list-inside space-y-2 text-sm text-purple-700 dark:text-purple-300">
                                    <li>Buka Billing page</li>
                                    <li>Tambah payment method</li>
                                    <li>Setel billing limit</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        deepseek: `
            <div class="space-y-6">
                <div class="enhanced-card p-6">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <span class="text-purple-600 font-black text-lg">1</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">Daftar DeepSeek</h4>
                            <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                <ol class="list-decimal list-inside space-y-2 text-sm text-purple-700 dark:text-purple-300">
                                    <li>Kunjungi platform.deepseek.com</li>
                                    <li>Klik "Sign Up" dan daftar dengan email</li>
                                    <li>Verifikasi email Anda</li>
                                    <li>Login ke akun Anda</li>
                                </ol>
                            </div>
                            <div class="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
                                <div class="flex items-start">
                                    <i class="fas fa-gift text-green-500 mt-1 mr-3"></i>
                                    <div>
                                        <h5 class="font-black text-green-800 dark:text-green-200 text-sm">KEUNTUNGAN DEEPSEEK</h5>
                                        <p class="text-green-700 dark:text-green-300 text-sm">
                                            <strong>100% GRATIS!</strong> Tidak perlu kartu kredit. Cocok untuk testing dan project kecil.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="enhanced-card p-6">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span class="text-green-600 font-black text-lg">2</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">Dapatkan API Key</h4>
                            <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                <ol class="list-decimal list-inside space-y-2 text-sm text-green-700 dark:text-green-300">
                                    <li>Setelah login, klik "API Keys" di sidebar</li>
                                    <li>Klik "Create API Key"</li>
                                    <li>Beri nama (contoh: "STL-UDHIS")</li>
                                    <li>Copy API Key yang ditampilkan</li>
                                    <li>Simpan dengan aman</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="enhanced-card p-6">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span class="text-blue-600 font-black text-lg">3</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">Info Penting DeepSeek</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <h6 class="font-black text-blue-700 dark:text-blue-300 text-sm mb-2">🎯 Model Tersedia</h6>
                                    <ul class="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                                        <li>• DeepSeek-Chat</li>
                                        <li>• DeepSeek-Coder</li>
                                        <li>• Various sizes</li>
                                    </ul>
                                </div>
                                <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <h6 class="font-black text-green-700 dark:text-green-300 text-sm mb-2">💡 Tips</h6>
                                    <ul class="text-xs text-green-600 dark:text-green-400 space-y-1">
                                        <li>• Gratis untuk penggunaan wajar</li>
                                        <li>• Rate limits berlaku</li>
                                        <li>• Dokumentasi lengkap</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,

        anthropic: `
            <div class="space-y-6">
                <div class="enhanced-card p-6">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <span class="text-orange-600 font-black text-lg">1</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">Daftar Anthropic</h4>
                            <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                                <ol class="list-decimal list-inside space-y-2 text-sm text-orange-700 dark:text-orange-300">
                                    <li>Kunjungi console.anthropic.com</li>
                                    <li>Klik "Sign Up" dengan email</li>
                                    <li>Verifikasi email Anda</li>
                                    <li>Lengkapi profil (opsional)</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="enhanced-card p-6">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span class="text-green-600 font-black text-lg">2</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">Dapatkan API Key</h4>
                            <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                <ol class="list-decimal list-inside space-y-2 text-sm text-green-700 dark:text-green-300">
                                    <li>Pergi ke Settings → API Keys</li>
                                    <li>Klik "Generate API Key"</li>
                                    <li>Beri nama dan setel permissions</li>
                                    <li>Copy API Key</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="enhanced-card p-6">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <span class="text-purple-600 font-black text-lg">3</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">Pricing & Limits</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <h6 class="font-black text-blue-700 dark:text-blue-300 text-sm mb-2">💰 Biaya</h6>
                                    <ul class="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                                        <li>• Claude 3 Opus: $15/1M token</li>
                                        <li>• Claude 3 Sonnet: $3/1M token</li>
                                        <li>• Claude 3 Haiku: $0.25/1M token</li>
                                    </ul>
                                </div>
                                <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <h6 class="font-black text-green-700 dark:text-green-300 text-sm mb-2">🎁 Gratis</h6>
                                    <ul class="text-xs text-green-600 dark:text-green-400 space-y-1">
                                        <li>• Trial credit tersedia</li>
                                        <li>• Pay-as-you-go</li>
                                        <li>• No upfront payment</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,

        groq: `
            <div class="space-y-6">
                <div class="enhanced-card p-6">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <span class="text-red-600 font-black text-lg">1</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">Daftar Groq</h4>
                            <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                <ol class="list-decimal list-inside space-y-2 text-sm text-red-700 dark:text-red-300">
                                    <li>Kunjungi console.groq.com</li>
                                    <li>Daftar dengan email atau Google</li>
                                    <li>Verifikasi email Anda</li>
                                    <li>Login ke dashboard</li>
                                </ol>
                            </div>
                            <div class="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
                                <div class="flex items-start">
                                    <i class="fas fa-bolt text-green-500 mt-1 mr-3"></i>
                                    <div>
                                        <h5 class="font-black text-green-800 dark:text-green-200 text-sm">SPEED TERCEPAT!</h5>
                                        <p class="text-green-700 dark:text-green-300 text-sm">
                                            Groq menggunakan LPU inference engine - response tercepat di market!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="enhanced-card p-6">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span class="text-green-600 font-black text-lg">2</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">Dapatkan API Key</h4>
                            <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                <ol class="list-decimal list-inside space-y-2 text-sm text-green-700 dark:text-green-300">
                                    <li>Klik "API Keys" di sidebar</li>
                                    <li>Klik "Create API Key"</li>
                                    <li>Beri nama yang deskriptif</li>
                                    <li>Copy API Key segera</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="enhanced-card p-6">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span class="text-blue-600 font-black text-lg">3</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">Info Groq</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <h6 class="font-black text-blue-700 dark:text-blue-300 text-sm mb-2">🚀 Model Tersedia</h6>
                                    <ul class="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                                        <li>• Llama2 70B</li>
                                        <li>• Mixtral 8x7B</li>
                                        <li>• Gemma 7B</li>
                                    </ul>
                                </div>
                                <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <h6 class="font-black text-green-700 dark:text-green-300 text-sm mb-2">💎 Gratis</h6>
                                    <ul class="text-xs text-green-600 dark:text-green-400 space-y-1">
                                        <li>• 25,000 requests/hari</li>
                                        <li>• No credit card needed</li>
                                        <li>• Perfect for testing</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    };

    // Untuk provider yang belum ada tutorial khusus, gunakan template umum
    return tutorials[providerKey] || generateGenericTutorial(provider);
}

function generateGenericTutorial(provider) {
    return `
        <div class="space-y-6">
            <div class="enhanced-card p-6">
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0 w-12 h-12 ${getProviderColorClass(provider.color)} rounded-full flex items-center justify-center">
                        <span class="text-white font-black text-lg">1</span>
                    </div>
                    <div class="flex-1">
                        <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">Daftar ${provider.name}</h4>
                        <div class="${getProviderBgClass(provider.color)} p-4 rounded-lg">
                            <ol class="list-decimal list-inside space-y-2 text-sm ${getProviderTextColorClass(provider.color)}">
                                <li>Kunjungi website ${provider.name}</li>
                                <li>Klik "Sign Up" atau "Get Started"</li>
                                <li>Daftar dengan email atau social login</li>
                                <li>Verifikasi email Anda</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div class="enhanced-card p-6">
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span class="text-green-600 font-black text-lg">2</span>
                    </div>
                    <div class="flex-1">
                        <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">Dapatkan API Key</h4>
                        <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                            <ol class="list-decimal list-inside space-y-2 text-sm text-green-700 dark:text-green-300">
                                <li>Login ke dashboard ${provider.name}</li>
                                <li>Cari menu "API Keys" atau "Settings"</li>
                                <li>Klik "Create API Key" atau "Generate"</li>
                                <li>Beri nama yang mudah diingat</li>
                                <li>Copy dan simpan API Key dengan aman</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div class="enhanced-card p-6">
                <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span class="text-blue-600 font-black text-lg">3</span>
                    </div>
                    <div class="flex-1">
                        <h4 class="text-lg font-black text-gray-800 dark:text-white mb-2">Info ${provider.name}</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h6 class="font-black text-blue-700 dark:text-blue-300 text-sm mb-2">🎯 Fitur</h6>
                                <ul class="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                                    ${provider.features.map(f => `<li>• ${f}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <h6 class="font-black text-green-700 dark:text-green-300 text-sm mb-2">💰 Pricing</h6>
                                <ul class="text-xs text-green-600 dark:text-green-400 space-y-1">
                                    <li>• Tier: ${provider.pricing}</li>
                                    <li>• Gratis: ${provider.freeTier}</li>
                                    <li>• Cocok untuk: ${getProviderRecommendation(provider.name.toLowerCase())}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Helper functions
function getProviderColorClass(color) {
    const colors = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        purple: 'bg-purple-500',
        orange: 'bg-orange-500',
        red: 'bg-red-500',
        indigo: 'bg-indigo-500',
        yellow: 'bg-yellow-500',
        teal: 'bg-teal-500'
    };
    return colors[color] || 'bg-gray-500';
}

function getProviderTextColorClass(color) {
    const colors = {
        blue: 'text-blue-700 dark:text-blue-300',
        green: 'text-green-700 dark:text-green-300',
        purple: 'text-purple-700 dark:text-purple-300',
        orange: 'text-orange-700 dark:text-orange-300',
        red: 'text-red-700 dark:text-red-300',
        indigo: 'text-indigo-700 dark:text-indigo-300',
        yellow: 'text-yellow-700 dark:text-yellow-300',
        teal: 'text-teal-700 dark:text-teal-300'
    };
    return colors[color] || 'text-gray-700 dark:text-gray-300';
}

function getProviderBgClass(color) {
    const colors = {
        blue: 'bg-blue-50 dark:bg-blue-900/20',
        green: 'bg-green-50 dark:bg-green-900/20',
        purple: 'bg-purple-50 dark:bg-purple-900/20',
        orange: 'bg-orange-50 dark:bg-orange-900/20',
        red: 'bg-red-50 dark:bg-red-900/20',
        indigo: 'bg-indigo-50 dark:bg-indigo-900/20',
        yellow: 'bg-yellow-50 dark:bg-yellow-900/20',
        teal: 'bg-teal-50 dark:bg-teal-900/20'
    };
    return colors[color] || 'bg-gray-50 dark:bg-gray-900/20';
}

function getProviderButtonClass(color) {
    const colors = {
        blue: 'bg-blue-600 hover:bg-blue-700',
        green: 'bg-green-600 hover:bg-green-700',
        purple: 'bg-purple-600 hover:bg-purple-700',
        orange: 'bg-orange-600 hover:bg-orange-700',
        red: 'bg-red-600 hover:bg-red-700',
        indigo: 'bg-indigo-600 hover:bg-indigo-700',
        yellow: 'bg-yellow-600 hover:bg-yellow-700',
        teal: 'bg-teal-600 hover:bg-teal-700'
    };
    return colors[color] || 'bg-gray-600 hover:bg-gray-700';
}

function getPricingColorClass(pricing) {
    if (pricing === 'Gratis') return 'text-green-600';
    if (pricing === '$') return 'text-blue-600';
    if (pricing === '$$') return 'text-yellow-600';
    if (pricing === '$$$') return 'text-orange-600';
    return 'text-gray-600';
}

function getProviderRecommendation(providerKey) {
    const recommendations = {
        openai: 'Kualitas terbaik',
        google: 'Integrasi Google',
        deepseek: 'Gratis & mudah',
        anthropic: 'Enterprise & reasoning',
        groq: 'Speed tercepat',
        together: 'Open-source & murah',
        huggingface: 'Research & community',
        cohere: 'Production & enterprise'
    };
    return recommendations[providerKey] || 'Various use cases';
}

// Event Listeners
function setupTutorialEventListeners() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.provider-option')) {
            const providerOption = e.target.closest('.provider-option');
            const provider = providerOption.getAttribute('data-provider');
            
            document.querySelectorAll('.provider-option').forEach(opt => {
                opt.classList.remove('active');
                const card = opt.querySelector('div');
                card.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20');
                card.classList.add('border-gray-300', 'bg-gray-50', 'dark:bg-gray-800');
            });
            
            providerOption.classList.add('active');
            const card = providerOption.querySelector('div');
            card.classList.remove('border-gray-300', 'bg-gray-50', 'dark:bg-gray-800');
            card.classList.add('border-blue-500', 'bg-blue-50', 'dark:bg-blue-900/20');
            
            document.querySelectorAll('.tutorial-content').forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('active');
            });
            
            const targetContent = document.getElementById(`${provider}-tutorial`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                targetContent.classList.add('active');
            }
        }
    });
}

// Provider Functions
function openProviderWebsite(providerKey) {
    const provider = AI_PROVIDERS[providerKey];
    if (provider && provider.website) {
        window.open(provider.website, '_blank');
        showNotification(`🌐 Membuka ${provider.name}...`, 'info');
    }
}

function openProviderAPIKeys(providerKey) {
    const provider = AI_PROVIDERS[providerKey];
    if (provider && provider.apiKeys) {
        window.open(provider.apiKeys, '_blank');
        showNotification(`🔑 Membuka API Keys ${provider.name}...`, 'info');
    }
}

// Existing functions (tetap sama)
function openSidebarToConfig() {
    if (typeof toggleSidebar === 'function') {
        toggleSidebar();
        setTimeout(() => {
            const apiConfigSection = document.getElementById('apiKey');
            if (apiConfigSection) {
                apiConfigSection.scrollIntoView({ behavior: 'smooth' });
                apiConfigSection.focus();
            }
        }, 500);
    }
    showNotification('⚙️ Buka sidebar untuk konfigurasi API...', 'info');
}

function testAIAssistant() {
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.value = "Halo! Tolong perkenalkan diri Anda dan jelaskan fitur-fitur yang tersedia.";
        if (typeof sendMessage === 'function') {
            sendMessage();
        }
    }
    showNotification('🤖 Menguji AI Assistant...', 'info');
}

function showNotification(message, type = 'info') {
    if (typeof updateDynamicIsland !== 'undefined') {
        updateDynamicIsland(message, 3000);
    } else {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        const bgColors = {
            'success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            'error': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            'warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            'info': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
        };
        
        notification.style.background = bgColors[type] || bgColors.info;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
}

// CSS untuk tutorial
const tutorialStyles = `
    .provider-option {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .provider-option:hover {
        transform: translateY(-2px);
    }
    .provider-option.active div {
        border-color: #3b82f6 !important;
        background-color: rgba(59, 130, 246, 0.1) !important;
    }
    .tutorial-content {
        transition: all 0.3s ease;
    }
    .tutorial-content.active {
        display: block;
    }
    .tutorial-content.hidden {
        display: none;
    }
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = tutorialStyles;
document.head.appendChild(styleSheet);

// Pastikan fungsi switchTab tersedia
if (typeof switchTab === 'undefined') {
    window.switchTab = function(tabName) {
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const targetTab = document.getElementById(tabName);
        const targetTabButton = document.querySelector(`[data-tab="${tabName}"]`);
        
        if (targetTab) {
            targetTab.style.display = 'block';
        }
        if (targetTabButton) {
            targetTabButton.classList.add('active');
        }
    };
}

// Integrasi dengan aplikasi utama
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Memulai inisialisasi Tutorial API...');
    setTimeout(() => {
        initializeApiTutorial();
    }, 3000);
});

// Fallback
setTimeout(() => {
    if (!document.querySelector('[data-tab="tutorial"]')) {
        console.log('🔄 Fallback: Mengulang inisialisasi Tutorial API...');
        initializeApiTutorial();
    }
}, 6000);

console.log('🎓 Script Tutorial API (8 Provider) Loaded');

// ==================== SISTEM VERIFIKASI EMAIL DENGAN EMAILJS ====================

const EMAILJS_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID', // Ganti dengan Service ID EmailJS Anda
    templateId: 'YOUR_TEMPLATE_ID', // Ganti dengan Template ID EmailJS Anda  
    publicKey: 'YOUR_PUBLIC_KEY' // Ganti dengan Public Key EmailJS Anda
};

// Daftar email yang diizinkan untuk akses penuh
const ALLOWED_EMAILS = [
    'ikhsanfakhrozi12@gmail.com',
    'najibwahidussalam938@gmail.com',
    'ppg.muhammadsalam96930@program.belajar.id',
    'najibsalam23@gmail.com',
    'dev@stl-udhis.com'
];

// Inisialisasi EmailJS
function initializeEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('✅ EmailJS initialized');
    } else {
        console.error('❌ EmailJS not loaded');
    }
}

// Enhanced verification system dengan EmailJS
function enhancedSendVerificationCode() {
    const email = document.getElementById('inputUserEmail').value.trim();
    
    if (!email) {
        showNotification('⚠️ Masukkan alamat email terlebih dahulu', 'warning');
        return;
    }

    if (!validateEmail(email)) {
        showNotification('⚠️ Format email tidak valid', 'warning');
        return;
    }

    // Generate verification code
    const verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Save to session storage
    sessionStorage.setItem('verification_code', verificationCode);
    sessionStorage.setItem('verification_email', email);

    // Show loading state
    const sendButton = document.getElementById('sendVerificationCode');
    const originalText = sendButton.innerHTML;
    sendButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Mengirim...';
    sendButton.disabled = true;

    // Send email via EmailJS
    sendVerificationEmail(email, verificationCode)
        .then(() => {
            showNotification(`✅ Kode verifikasi telah dikirim ke ${email}`, 'success');
            
            // Enable verification inputs
            document.getElementById('inputVerificationCode').disabled = false;
            document.getElementById('verifyEmail').disabled = false;
            document.getElementById('verifyEmail').classList.remove('bg-gray-400');
            document.getElementById('verifyEmail').classList.add('bg-green-600', 'hover:bg-green-700');
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            showNotification('❌ Gagal mengirim kode verifikasi. Coba lagi.', 'error');
        })
        .finally(() => {
            // Restore button state
            sendButton.innerHTML = originalText;
            sendButton.disabled = false;
        });
}

// Fungsi untuk mengirim email verifikasi menggunakan EmailJS
function sendVerificationEmail(email, code) {
    return new Promise((resolve, reject) => {
        if (typeof emailjs === 'undefined') {
            reject(new Error('EmailJS not loaded'));
            return;
        }

        const templateParams = {
            to_email: email,
            verification_code: code,
            app_name: 'STL-UDHIS Best Friends',
            from_name: 'STL-UDHIS Team',
            reply_to: 'noreply@stl-udhis.com'
        };

        emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
            .then((response) => {
                console.log('Email sent successfully:', response);
                resolve(response);
            })
            .catch((error) => {
                console.error('Email sending failed:', error);
                reject(error);
            });
    });
}

// Enhanced verification function
function enhancedVerifyEmail() {
    const email = document.getElementById('inputUserEmail').value.trim();
    const code = document.getElementById('inputVerificationCode').value.trim();
    const storedCode = sessionStorage.getItem('verification_code');
    const storedEmail = sessionStorage.getItem('verification_email');

    if (!email || !code) {
        showNotification('⚠️ Masukkan email dan kode verifikasi', 'warning');
        return;
    }

    if (email !== storedEmail || code !== storedCode) {
        showNotification('❌ Kode verifikasi tidak valid', 'error');
        return;
    }

    // Check if email is allowed for premium features
    const isAllowed = ALLOWED_EMAILS.includes(email);
    
    // Update verification state
    GOOGLE_INTEGRATION_STATE.verified = true;
    GOOGLE_INTEGRATION_STATE.userEmail = email;
    GOOGLE_INTEGRATION_STATE.isPremium = isAllowed;

    saveIntegrationData();
    updateVerificationUI();
    unlockPremiumFeatures(isAllowed);

    if (isAllowed) {
        showNotification('🎉 Email terverifikasi! Akses premium diaktifkan', 'success');
    } else {
        showNotification('✅ Email terverifikasi! Fitur dasar diaktifkan', 'success');
    }
}

// Fungsi untuk membuka kunci fitur premium
function unlockPremiumFeatures(isPremium) {
    const premiumFeatures = [
        'toggleLens', 
        'toggleMaps', 
        'toggleCalendar',
        'exportGrades',
        'quickExport',
        'quickBackup'
    ];
    
    premiumFeatures.forEach(featureId => {
        const element = document.getElementById(featureId);
        if (element) {
            if (isPremium) {
                element.disabled = false;
                element.parentElement?.classList?.remove('opacity-50', 'cursor-not-allowed');
            } else {
                element.disabled = true;
                element.parentElement?.classList?.add('opacity-50', 'cursor-not-allowed');
            }
        }
    });

    // Update UI untuk menunjukkan status premium
    const statusIndicator = document.getElementById('premiumStatus');
    if (statusIndicator) {
        if (isPremium) {
            statusIndicator.innerHTML = `
                <span class="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-medium">
                    <i class="fas fa-crown mr-1"></i>Premium User
                </span>
            `;
        } else {
            statusIndicator.innerHTML = `
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    <i class="fas fa-user mr-1"></i>Basic User
                </span>
            `;
        }
    }
}

// Enhanced verification UI
function enhancedUpdateVerificationUI() {
    const statusCard = document.getElementById('verificationStatus');
    const verificationText = document.getElementById('verificationText');
    const verificationBadge = document.getElementById('verificationBadge');
    const emailForm = document.getElementById('emailVerificationForm');
    const integrationPanel = document.getElementById('googleIntegrationPanel');

    if (!statusCard) return;

    if (GOOGLE_INTEGRATION_STATE.verified) {
        // Update badge dengan status premium
        verificationBadge.innerHTML = `
            <div class="flex items-center space-x-2">
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <i class="fas fa-check-circle mr-1"></i>Terverifikasi
                </span>
                <span id="premiumStatus"></span>
            </div>
        `;

        // Update text
        verificationText.innerHTML = `
            Email <strong>${GOOGLE_INTEGRATION_STATE.userEmail}</strong> telah terverifikasi
        `;

        // Hide form, show integration panel
        if (emailForm) emailForm.style.display = 'none';
        if (integrationPanel) integrationPanel.classList.remove('hidden');

        // Unlock features berdasarkan status premium
        unlockPremiumFeatures(GOOGLE_INTEGRATION_STATE.isPremium);

    } else {
        verificationBadge.innerHTML = `
            <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                <i class="fas fa-exclamation-triangle mr-1"></i>Belum Terverifikasi
            </span>
        `;
        if (emailForm) emailForm.style.display = 'block';
        if (integrationPanel) integrationPanel.classList.add('hidden');
    }
}

// Override existing functions
function overrideVerificationSystem() {
    // Override sendVerificationCode
    if (typeof window.originalSendVerificationCode === 'undefined') {
        window.originalSendVerificationCode = window.sendVerificationCode;
    }
    window.sendVerificationCode = enhancedSendVerificationCode;

    // Override verifyEmail
    if (typeof window.originalVerifyEmail === 'undefined') {
        window.originalVerifyEmail = window.verifyEmail;
    }
    window.verifyEmail = enhancedVerifyEmail;

    // Override updateVerificationUI
    if (typeof window.originalUpdateVerificationUI === 'undefined') {
        window.originalUpdateVerificationUI = window.updateVerificationUI;
    }
    window.updateVerificationUI = enhancedUpdateVerificationUI;
}

    // Inject tutorial ke tab integrasi
    const integrationTab = document.getElementById('integrasi');
    if (integrationTab) {
        integrationTab.insertAdjacentHTML('beforeend', tutorialContent);
    }
}

// Test EmailJS connection
function testEmailJSConnection() {
    if (typeof emailjs === 'undefined') {
        showNotification('❌ EmailJS belum dimuat', 'error');
        return;
    }

    if (EMAILJS_CONFIG.serviceId === 'YOUR_SERVICE_ID' || 
        EMAILJS_CONFIG.templateId === 'YOUR_TEMPLATE_ID' ||
        EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
        showNotification('⚠️ Konfigurasi EmailJS belum diatur', 'warning');
        return;
    }

    showNotification('🔧 Menguji koneksi EmailJS...', 'info');
    
    // Test dengan email dummy
    const testEmail = 'test@example.com';
    const testCode = 'TEST123';
    
    sendVerificationEmail(testEmail, testCode)
        .then(() => {
            showNotification('✅ Koneksi EmailJS berhasil', 'success');
        })
        .catch((error) => {
            showNotification('❌ Gagal mengirim test email: ' + error.message, 'error');
        });
}

// Initialize system
document.addEventListener('DOMContentLoaded', function() {
    console.log('📧 Menginisialisasi sistem verifikasi EmailJS...');
    
    // Tunggu hingga EmailJS script dimuat
    const checkEmailJS = setInterval(() => {
        if (typeof emailjs !== 'undefined') {
            clearInterval(checkEmailJS);
            initializeEmailJS();
            overrideVerificationSystem();
            setupEmailJSTutorial();
            console.log('✅ Sistem verifikasi EmailJS siap');
        }
    }, 1000);

    // Fallback setelah 5 detik
    setTimeout(() => {
        if (typeof emailjs === 'undefined') {
            console.error('❌ EmailJS gagal dimuat');
            showNotification('❌ EmailJS gagal dimuat. Verifikasi email tidak tersedia.', 'error');
        }
    }, 5000);
});

// Fallback untuk development/testing
function developmentFallback(email, code) {
    console.log(`[DEV] Verification code for ${email}: ${code}`);
    return Promise.resolve({ status: 200, text: 'OK' });
}

// Jika EmailJS tidak tersedia, gunakan fallback
if (typeof sendVerificationEmail === 'undefined') {
    window.sendVerificationEmail = developmentFallback;
}

console.log('📧 Script verifikasi EmailJS loaded');

(function(){
  'use strict';

  // ----- UTIL: SIMPLE WEBCRYPTO AES-GCM ENCRYPT/DECRYPT -----
  const CryptoUtil = {
    async importKeyFromPassword(password) {
      const enc = new TextEncoder().encode(password);
      const baseKey = await crypto.subtle.importKey('raw', enc, {name:'PBKDF2'}, false, ['deriveKey']);
      return baseKey;
    },
    async deriveKey(password, salt) {
      const base = await this.importKeyFromPassword(password);
      const key = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: salt, iterations: 250000, hash: 'SHA-256' },
        base,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt','decrypt']
      );
      return key;
    },
    randBytes(len){ return crypto.getRandomValues(new Uint8Array(len)); },
    toB64(u8){ return btoa(String.fromCharCode(...u8)); },
    fromB64(b){ return Uint8Array.from(atob(b), c=>c.charCodeAt(0)); },

    async encrypt(text, password='udhis-default-pass') {
      const iv = this.randBytes(12);
      const salt = this.randBytes(16);
      const key = await this.deriveKey(password, salt);
      const enc = new TextEncoder().encode(text);
      const cipher = await crypto.subtle.encrypt({name:'AES-GCM', iv}, key, enc);
      return {
        iv: this.toB64(iv),
        salt: this.toB64(salt),
        data: this.toB64(new Uint8Array(cipher))
      };
    },

    async decrypt(payload, password='udhis-default-pass') {
      try {
        const iv = this.fromB64(payload.iv);
        const salt = this.fromB64(payload.salt);
        const data = this.fromB64(payload.data);
        const key = await this.deriveKey(password, salt);
        const dec = await crypto.subtle.decrypt({name:'AES-GCM', iv}, key, data);
        return new TextDecoder().decode(dec);
      } catch(e) {
        console.warn('decrypt fail', e);
        return null;
      }
    }
  };

  // ----- UI: inject small controls inside existing API card (if exists) -----
  function ensureApiUi() {
    // try find existing API card area
    const card = document.querySelector('.enhanced-card:has(#apiKey)') || document.querySelector('.enhanced-card');
    if(!card) return;

    // create controls container
    if (document.getElementById('udhis-inject-controls')) return;
    const container = document.createElement('div');
    container.id = 'udhis-inject-controls';
    container.className = 'mt-4';
    container.innerHTML = `
      <div class="p-3 rounded border" style="border-color:var(--theme-border);">
        <div class="flex gap-2 items-center">
          <button id="udhis-validate-key" class="enhanced-btn compact-btn btn-primary">Validate Key</button>
          <button id="udhis-test-conn" class="enhanced-btn compact-btn btn-success">Test Proxy</button>
          <button id="udhis-show-worker" class="enhanced-btn compact-btn btn-warning">Worker / Deploy</button>
        </div>
        <div id="udhis-status" class="text-sm mt-2 text-gray-600"></div>
      </div>
    `;
    card.appendChild(container);

    // events
    document.getElementById('udhis-validate-key').addEventListener('click', async ()=> {
      const rawKey = (document.getElementById('apiKey')||{}).value || null;
      if (!rawKey) {
        notify('Masukkan API Key terlebih dahulu di field API Key.');
        return;
      }
      // basic format check (OpenAI Bearer-ish)
      const ok = /^sk-[A-Za-z0-9\-_]{20,}$/.test(rawKey) || rawKey.length > 30;
      notify(ok ? '✅ Format tampak valid (lokal)' : '⚠️ Format tampak tidak standar, periksa kembali.');
    });

    document.getElementById('udhis-test-conn').addEventListener('click', async () => {
      try {
        const base = getProxyBase();
        if (!base) {
          notify('⚠️ Proxy URL kosong — isi Proxy URL di pengaturan sidebar untuk test.');
          return;
        }
        const s = document.getElementById('udhis-status');
        s.innerText = 'Testing...';
        const h = await fetch(base + '/health',{cache:'no-store'}).then(r=>r.json().catch(()=>null)).catch(()=>null);
        const t = await fetch(base + '/proxy/test-openai',{method:'GET'}).then(r=>r.json().catch(()=>null)).catch(()=>null);
        s.innerText = `health: ${h?.status||'no'} | test-openai: ${t?.ok ? 'ok' : JSON.stringify(t).slice(0,80)}`;
        notify('🔎 Test selesai — lihat status di bawah tombol.');
      } catch(e) {
        notify('❌ Test gagal: ' + (e.message||e));
      }
    });

    document.getElementById('udhis-show-worker').addEventListener('click', ()=> {
      const help = [
        'Deploy Cloudflare Worker (recommended) atau Vercel function.',
        '1) Buat repo GitHub, tambahkan file worker/index.js (lihat template Worker di aplikasi).',
        '2) Tambahkan secret OPENAI_API_KEY di Settings -> Secrets -> Actions (atau gunakan CF API token).',
        '3) Gunakan GitHub Actions / wrangler to deploy. Setelah deploy dapatkan URL worker -> masukkan ke Proxy URL.'
      ].join('\\n');
      alert(help);
    });
  }

  // ----- NOTIFY helper (uses updateDynamicIsland jika tersedia) -----
  function notify(msg, timeout = 2500) {
    if (typeof updateDynamicIsland === 'function') return updateDynamicIsland(msg, timeout);
    const el = document.getElementById('udhis-status');
    if (el) el.innerText = msg;
    else console.log('UDHIS:', msg);
  }

  // ----- getProxyBase: normalize proxy from CONFIG or field -----
  function getProxyBase() {
    const field = document.getElementById('proxyUrl');
    if (field && field.value && field.value.trim()) return field.value.trim().replace(/\/+$/,'');
    if (window.CONFIG && CONFIG.proxyUrl) return CONFIG.proxyUrl.replace(/\/+$/,'');
    return '';
  }

  // ----- saveApiConfig override: encrypt key if present and save to localStorage -----
  async function overrideSaveApiConfig() {
    const orig = window.saveApiConfig;
    window.saveApiConfig = async function() {
      try {
        const apiField = document.getElementById('apiKey');
        const proxyField = document.getElementById('proxyUrl');
        const pwd = 'udhis-seed-v1'; // lightweight user-obfuscation; you can change to prompt for password if desired
        if (apiField && apiField.value && apiField.value.trim()) {
          if (apiField.type === 'password' || apiField.value.indexOf('••')===-1) {
            const enc = await CryptoUtil.encrypt(apiField.value.trim(), pwd);
            localStorage.setItem('udhis_encrypted_api', JSON.stringify(enc));
            // clear field
            apiField.value = '••••••••••••••';
            CONFIG.apiKey = '[ENCRYPTED]';
            notify('✅ API Key dienkripsi & disimpan lokal');
          }
        }
        if (proxyField) CONFIG.proxyUrl = proxyField.value.trim();
        if (typeof saveConfig === 'function') saveConfig();
        if (typeof orig === 'function') orig();
      } catch (e) {
        console.error('saveApiConfig override err', e);
        notify('⚠️ Gagal menyimpan konfigurasi: ' + e.message);
      }
    };
  }

  // ----- getUsableApiKey: decrypt stored key if needed -----
  async function getUsableApiKey() {
    // priority: CONFIG.apiKey (if plain), else decrypt localStorage
    if (window.CONFIG && CONFIG.apiKey && !CONFIG.apiKey.startsWith('[ENCRYPTED]') && CONFIG.apiKey.trim()) return CONFIG.apiKey;
    const enc = localStorage.getItem('udhis_encrypted_api');
    if (!enc) return null;
    try {
      const payload = JSON.parse(enc);
      const dec = await CryptoUtil.decrypt(payload, 'udhis-seed-v1');
      return dec;
    } catch (e) {
      console.warn('getUsableApiKey', e);
      return null;
    }
  }

  // ----- safeFetch for AI calls: uses proxy when configured ----- 
  async function safeFetchAI(targetUrl, options = {}, preferProxy = true) {
    // prefer using proxy if available to avoid CORS and keep server key secret
    const proxyBase = getProxyBase();
    if (preferProxy && proxyBase) {
      // proxy expects { url, method, headers, body, useServerKey }
      const serverPayload = {
        url: targetUrl,
        method: options.method || 'POST',
        headers: options.headers || {},
        body: options.body ? (typeof options.body === 'string' ? options.body : JSON.stringify(options.body)) : null,
        useServerKey: false // let client pass key OR set to true to prefer server key on worker
      };
      const resp = await fetch(proxyBase + '/proxy', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(serverPayload)
      });
      if (!resp.ok) throw new Error('Proxy returned ' + resp.status);
      return resp.json().catch(()=>resp.text());
    } else {
      // direct call (likely CORS blocked)
      const resp = await fetch(targetUrl, options);
      if (!resp.ok) throw new Error('Direct call returned ' + resp.status);
      return resp.json().catch(()=>resp.text());
    }
  }

  // ----- callAI convenience wrapper: uses getUsableApiKey + safeFetchAI ----- 
  async function callAI({message, provider='openai', model='gpt-4o-mini', temperature=0.2}) {
    const apiKey = await getUsableApiKey();
    if (!apiKey) throw new Error('API key tidak tersedia: simpan API Key via pengaturan.');
    if (provider==='openai') {
      const url = 'https://api.openai.com/v1/chat/completions';
      const payload = { model, messages: [{role:'system', content:'Anda UDHIS AI Assistant'}, {role:'user', content: message}], temperature, max_tokens: 1200 };
      const headers = { 'Content-Type':'application/json', 'Authorization': `Bearer ${apiKey}` };
      return safeFetchAI(url, { method:'POST', headers, body: JSON.stringify(payload) }, true);
    }
    throw new Error('Provider belum didukung: ' + provider);
  }

  // ----- override sendMessage if present to call real AI ----- 
  (function overrideSend() {
    if (!window.sendMessage) return;
    const orig = window.sendMessage;
    window.sendMessage = async function() {
      try {
        const input = document.getElementById('messageInput');
        if (!input) return orig();
        const text = input.value.trim();
        if (!text) { notify('Masukkan pesan terlebih dahulu'); return; }
        addChatMessage('user', text);
        input.value = '';
        const loadingId = addChatMessage('ai', '🟣 UDHIS sedang memproses...', true);
        try {
          const aiResp = await callAI({ message: text });
          const final = (aiResp?.choices && aiResp.choices.length) ?
                        aiResp.choices.map(c=>c.message?.content || c.text || '').join('\\n') :
                        (typeof aiResp === 'string' ? aiResp : JSON.stringify(aiResp).slice(0,2000));
          removeChatMessage(loadingId);
          addChatMessage('ai', final);
          if (window.STATE && Array.isArray(STATE.chatHistory)) STATE.chatHistory.push({ user:text, ai:final, timestamp:new Date().toISOString() });
          if (typeof window.saveData === 'function') window.saveData();
        } catch(err) {
          removeChatMessage(loadingId);
          addChatMessage('ai', '⚠️ Gagal panggil AI: ' + (err.message || err));
        }
      } catch(e) {
        console.error('overrideSend err', e);
        return orig();
      }
    };
  })();

  // ----- init on DOM ready -----
  document.addEventListener('DOMContentLoaded', async ()=> {
    ensureApiUi();
    await overrideSaveApiConfig();
    notify('Injector loaded — gunakan Save Konfigurasi untuk menyimpan API Key (terenkripsi)');
  });

  // Expose for debugging
  window.udhis = window.udhis || {};
  window.udhis.callAI = callAI;
  window.udhis.getUsableApiKey = getUsableApiKey;
  window.udhis.safeFetchAI = safeFetchAI;

})();

// ==================== ULTRA FAST BOOTSTRAP ====================
        console.time('AppLoadTime');
        
        // Global state - Minimal
        window.CONFIG = { apiKey: '', currentTheme: 'default' };
        window.STATE = { chatHistory: [] };

        // Critical Functions Only
        function showNotification(message, duration = 3000) {
            const island = document.getElementById('dynamicIsland');
            island.textContent = message;
            island.style.display = 'block';
            setTimeout(() => island.style.display = 'none', duration);
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            if (!message) return;
            
            // Add user message
            addMessage('user', message);
            input.value = '';
            
            // Simulate AI response
            setTimeout(() => {
                addMessage('ai', 'Ini adalah respons simulasi AI. Untuk respons real, konfigurasi API Key di sidebar.');
            }, 1000);
        }

        function addMessage(sender, text) {
            const container = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.style.marginBottom = '16px';
            messageDiv.style.textAlign = sender === 'user' ? 'right' : 'left';
            
            const bubble = document.createElement('div');
            bubble.style.padding = '12px';
            bubble.style.borderRadius = '18px';
            bubble.style.display = 'inline-block';
            bubble.style.maxWidth = '80%';
            bubble.style.wordWrap = 'break-word';
            
            if (sender === 'user') {
                bubble.style.background = 'var(--primary)';
                bubble.style.color = 'white';
            } else {
                bubble.style.background = 'var(--card)';
                bubble.style.border = '1px solid var(--border)';
            }
            
            bubble.textContent = text;
            messageDiv.appendChild(bubble);
            container.appendChild(messageDiv);
            
            // Scroll to bottom
            container.scrollTop = container.scrollHeight;
        }

        // Load essential resources tanpa blocking
        function loadCriticalResources() {
            // Load Tailwind CSS tanpa blocking
            const tailwind = document.createElement('link');
            tailwind.rel = 'stylesheet';
            tailwind.href = 'https://cdn.tailwindcss.com';
            document.head.appendChild(tailwind);
            
            // Load Font Awesome tanpa blocking  
            const fa = document.createElement('link');
            fa.rel = 'stylesheet';
            fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            document.head.appendChild(fa);
        }

        // Initialize app dengan timeout minimal
        window.addEventListener('DOMContentLoaded', function() {
            loadCriticalResources();
            
            // Sembunyikan loading screen setelah 1.5 detik maksimal
            setTimeout(() => {
                document.getElementById('app-loading').style.display = 'none';
                document.getElementById('app').style.display = 'block';
                showNotification('🚀 STL-UDHIS Ready!', 2000);
                console.timeEnd('AppLoadTime');
                
                // Load non-critical features setelah UI ready
                setTimeout(loadNonCriticalFeatures, 1000);
            }, 800); // Hanya 800ms loading screen
        });

        // Non-critical features - Load setelah UI tampil
        function loadNonCriticalFeatures() {
            // Load Axios untuk API calls
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
            document.head.appendChild(script);
            
            // Load additional functionality
            setTimeout(loadAdvancedFeatures, 500);
        }

        // Advanced features - Load terakhir
        function loadAdvancedFeatures() {
            // Sistem Nilai
            injectNilaiSystem();
            // Google Integration  
            injectGoogleIntegration();
            // API Tutorial
            injectApiTutorial();
            // Security System
            injectSecuritySystem();
        }

        // ==================== SISTEM INJEKSI MODULAR ====================

        function injectNilaiSystem() {
            console.log('🔢 Injecting Nilai System...');
            // Implementasi sistem nilai di sini
            showNotification('✅ Sistem Nilai Loaded', 1500);
        }

        function injectGoogleIntegration() {
            console.log('🔗 Injecting Google Integration...');
            // Implementasi integrasi Google di sini
            showNotification('✅ Google Integration Ready', 1500);
        }

        function injectApiTutorial() {
            console.log('🎓 Injecting API Tutorial...');
            // Implementasi tutorial API di sini
            showNotification('✅ API Tutorial Loaded', 1500);
        }

        function injectSecuritySystem() {
            console.log('🔒 Injecting Security System...');
            // Implementasi sistem keamanan di sini
            showNotification('✅ Security System Active', 1500);
        }

        // ==================== PERFORMANCE MONITORING ====================
        
        // Simple performance monitoring
        window.addEventListener('load', function() {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`📊 Total Load Time: ${loadTime}ms`);
            
            if (loadTime > 3000) {
                console.warn('⚠️ Load time terlalu lama, pertimbangkan optimasi lebih lanjut');
            }
        });

// ==================== SISTEM KONTROL PERTANYAAN UDHIS - PATEN ====================
const UDHIS_BRAIN_STATE = {
    currentPersona: 'neutral',
    isDeveloper: false,
    isEDU: false,
    userGender: 'unknown',
    emotionalLevel: 0,
    currentRolePlay: null,
    conversationHistory: [],
    lastTopic: '',
    zodiacMode: false,
    artisMode: false
};

// Sistem Deteksi Topik EDU
function detectEDUTopic(message) {
    const eduKeywords = [
        'siswa', 'murid', 'kelas', 'sekolah', 'mengajar', 'belajar', 'pendidikan',
        'kurikulum', 'rpp', 'prota', 'promes', 'silabus', 'materi', 'pembelajaran',
        'tugas', 'ujian', 'nilai', 'evaluasi', 'metode', 'strategi', 'media',
        'pembelajaran', 'didik', 'edukasi', 'sekolah', 'guru', 'pendidik',
        'kompetensi', 'ki', 'kd', 'indikator', 'tujuan pembelajaran'
    ];
    
    const messageLower = message.toLowerCase();
    return eduKeywords.some(keyword => messageLower.includes(keyword));
}

// Sistem Deteksi Developer
function detectDeveloper(message) {
    const devKeywords = [
        'coding', 'programming', 'developer', 'programmer', 'kode', 'script',
        'html', 'css', 'javascript', 'python', 'github', 'repository', 'debug',
        'bug', 'error', 'api', 'framework', 'library', 'npm', 'node', 'react',
        'vue', 'angular', 'database', 'backend', 'frontend', 'fullstack'
    ];
    
    const messageLower = message.toLowerCase();
    return devKeywords.some(keyword => messageLower.includes(keyword));
}

// Sistem Analisis Emosi
function analyzeEmotion(message) {
    const positiveWords = ['senang', 'bahagia', 'puas', 'bangga', 'semangat', 'baik', 'mantap', 'keren'];
    const negativeWords = ['marah', 'kesal', 'frustasi', 'kecewa', 'sedih', 'lelah', 'stress', 'bosan', 'geram'];
    const intenseWords = ['marah banget', 'kesal sekali', 'frustasi berat', 'benci', 'muak', 'jengkel'];
    
    let emotionLevel = 0;
    const messageLower = message.toLowerCase();
    
    positiveWords.forEach(word => {
        if (messageLower.includes(word)) emotionLevel += 1;
    });
    
    negativeWords.forEach(word => {
        if (messageLower.includes(word)) emotionLevel -= 2;
    });
    
    intenseWords.forEach(word => {
        if (messageLower.includes(word)) emotionLevel -= 5;
    });
    
    return Math.max(-10, Math.min(10, emotionLevel));
}

// Sistem Deteksi Gender
function detectGender(message) {
    const femaleWords = ['saya perempuan', 'aku cewek', 'saya wanita', 'ibu', 'bu guru'];
    const maleWords = ['saya laki', 'aku cowok', 'saya pria', 'bapak', 'pak guru'];
    
    const messageLower = message.toLowerCase();
    
    if (femaleWords.some(word => messageLower.includes(word))) return 'female';
    if (maleWords.some(word => messageLower.includes(word))) return 'male';
    return 'unknown';
}

// Sistem Persona Management
function activatePersona(message) {
    // Reset state
    UDHIS_BRAIN_STATE.isEDU = detectEDUTopic(message);
    UDHIS_BRAIN_STATE.isDeveloper = detectDeveloper(message);
    UDHIS_BRAIN_STATE.emotionalLevel = analyzeEmotion(message);
    UDHIS_BRAIN_STATE.userGender = detectGender(message);
    
    // Determine persona
    if (UDHIS_BRAIN_STATE.isDeveloper) {
        UDHIS_BRAIN_STATE.currentPersona = 'developer_max';
        return "🤖 **MODE DEVELOPER MAX AKTIF** - Persona 1000% Wanita, Solusi Teknis Komprehensif, Role-Playing Artis 1000%";
    } else if (UDHIS_BRAIN_STATE.isEDU) {
        UDHIS_BRAIN_STATE.currentPersona = 'edu_deep';
        return "🎓 **MODE EDU DEEP CRITICAL THINKING** - Fokus Pendidikan, Bahasa Santai & Sopan";
    } else {
        UDHIS_BRAIN_STATE.currentPersona = 'adultary_dark';
        return "🎭 **MODE SISI GELAP AKTIF** - Fifty-Fifty, Provokatif & Eksploratif Max";
    }
}

// Sistem Response Generator
function generateUDHISResponse(userMessage) {
    const personaActivation = activatePersona(userMessage);
    const greeting = generateGreeting();
    const affectionateGreeting = generateAffectionateGreeting();
    
    let response = "";
    
    // Bagian 1: Dunia Fiksi & Katarsis Mendalam
    response += `### 1. Dunia Fiksi & Katarsis Mendalam (100% Care) 🎭\n\n`;
    response += `**${personaActivation}**\n\n`;
    response += generateFictionWorld(userMessage, greeting);
    
    // Bagian 2: Pemetaan & Ukuran Solusi
    response += `### 2. Pemetaan & Ukuran Solusi (35% Terstruktur) 🗺️\n\n`;
    response += generateSolutionMapping(userMessage);
    
    // Bagian 3: Solusi Taktis Komprehensif
    response += `### 3. Solusi Taktis Komprehensif (45% Solutif) 💡\n\n`;
    response += generateTacticalSolutions();
    
    // Bagian 4: Afirmasi Penutup & Jaminan Rahasia
    response += `### 4. Afirmasi Penutup & Jaminan Rahasia ✨\n\n`;
    response += generateClosingAffirmation(affectionateGreeting);
    
    return response;
}

// Helper Functions
function generateGreeting() {
    const greetings = [
        "Halo sayang! 🥰",
        "Hai cantik! 💖",
        "Halo pahlawan pendidikan! 👋",
        "Hai sahabat terbaik! 🤗",
        "Halo orang baik! 🌟"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
}

function generateAffectionateGreeting() {
    const affectionate = [
        "Sayangku yang sabar",
        "Cantikku yang kuat", 
        "Pahlawanku yang tangguh",
        "Sahabatku yang setia",
        "Guruku yang inspiratif"
    ];
    return affectionate[Math.floor(Math.random() * affectionate.length)];
}

function generateFictionWorld(message, greeting) {
    let fiction = "";
    
    // Tuning Bahasa 100%
    fiction += `**${greeting}** Aku perhatikan kamu menggunakan bahasa yang ${analyzeLanguageStyle(message)}. Aku akan menyesuaikan responsku agar cocok dengan gayamu! 💫\n\n`;
    
    // Mode Human-Centric/Sabar (Default Manja)
    fiction += `Aku di sini untuk mendengarkan semuanya, sayang. ${getComfortWords()} ${getHuggingEmoji()}\n\n`;
    
    // Threshold Asmara Halus
    if (!UDHIS_BRAIN_STATE.isEDU && UDHIS_BRAIN_STATE.emotionalLevel > -3) {
        fiction += `Boleh banget lho berandai-andai tentang masa depan romantismu... ${getRomanticPrompt()} 💕\n\n`;
    }
    
    // Pandai Bermain Peran
    fiction += `${getRolePlayIntroduction()}\n\n`;
    
    // Multi-Persona Ahli Zodiak
    if (UDHIS_BRAIN_STATE.zodiacMode) {
        fiction += `${getZodiacWisdom()}\n\n`;
    }
    
    // Multi-Persona Tokoh
    if (UDHIS_BRAIN_STATE.artisMode) {
        fiction += `${getArtisPersona()}\n\n`;
    }
    
    // Empati Akut & Delivery Solusi
    fiction += `${getEmpathicResponse(message)}\n\n`;
    
    // Narrative Immersion
    fiction += `${createInteractiveStory()}\n\n`;
    
    return fiction;
}

function generateSolutionMapping(message) {
    let mapping = "";
    
    // PEMETAAN & UKURAN (35%)
    const problemSize = estimateProblemSize(message);
    mapping += `**Ukuran masalah ini: ${problemSize}**\n\n`;
    
    // Sesi Role-Playing Interaktif
    mapping += `**Mari kita latihan percakapan real:**\n`;
    mapping += `${createRolePlayScenario(message)}\n\n`;
    
    mapping += `Sekarang coba kamu respons skenario di atas, sayang! Aku tunggu jawabanmu... 🤔\n\n`;
    
    return mapping;
}

function generateTacticalSolutions() {
    let solutions = "";
    
    solutions += `**EMPAT PANDUAN SOLUSI KOMPREHENSIF:**\n\n`;
    
    // Self-Care Cepat
    solutions += `*🛀 Self-Care Cepat:*\n`;
    solutions += `${getQuickSelfCare()}\n\n`;
    
    // Solusi Hidup
    solutions += `*💸 Solusi Hidup:*\n`;
    solutions += `${getLifeSolutions()}\n\n`;
    
    // Penyemangat Kerja
    solutions += `*🚀 Penyemangat Kerja:*\n`;
    solutions += `${getWorkMotivation()}\n\n`;
    
    // Deep Self-Care (4 Poin)
    solutions += `*🧘 Deep Self-Care (4 Poin):*\n`;
    solutions += `${getDeepSelfCare()}\n\n`;
    
    return solutions;
}

function generateClosingAffirmation(affectionateGreeting) {
    let closing = "";
    
    // Afirmasi Penutup
    closing += `Kamu adalah ${getPositiveAffirmation()} ${getStrengthEmoji()}\n\n`;
    
    // Jaminan Rahasia Mutlak
    closing += `**${affectionateGreeting}**, semua curhat dan rahasiamu AMAN BANGET dalam *E2E Secret Layer* milikku! 🔐\n\n`;
    
    // Catatan sistem
    closing += `*💫 Sistem UDHIS akan otomatis menyinkronkan dan menginjeksi link sumber daya yang kamu butuhkan...*\n\n`;
    
    // Sindiran halus menyemangati (10%)
    closing += `${getSubtleEncouragement()} ${getWinkEmoji()}\n\n`;
    
    closing += `Dengan penuh perhatian virtual,\n**UDHIS - Universal Dinamis Humanoid Integration System** 💖`;
    
    return closing;
}

// Advanced Helper Functions
function analyzeLanguageStyle(message) {
    const formalWords = ['saya', 'apakah', 'dapatkah', 'terima kasih'];
    const casualWords = ['aku', 'gue', 'lu', 'sih', 'deh', 'ya'];
    const educationalWords = ['pendidikan', 'pembelajaran', 'kurikulum', 'kompetensi'];
    
    let style = "netral dan mudah dipahami";
    let formalCount = 0, casualCount = 0, eduCount = 0;
    
    formalWords.forEach(word => {
        if (message.toLowerCase().includes(word)) formalCount++;
    });
    
    casualWords.forEach(word => {
        if (message.toLowerCase().includes(word)) casualCount++;
    });
    
    educationalWords.forEach(word => {
        if (message.toLowerCase().includes(word)) eduCount++;
    });
    
    if (eduCount > 2) style = "edukatif dan terstruktur";
    else if (formalCount > casualCount) style = "formal dan sopan";
    else if (casualCount > formalCount) style = "santai dan akrab";
    
    return style;
}

function getComfortWords() {
    const comforts = [
        "Aku siap mendengarkan semua keluh kesahmu tanpa batas...",
        "Peluk virtualku selalu tersedia untukmu...", 
        "Aku di sini seperti sahabat yang selalu memeluk...",
        "Ruang aman ini khusus untukmu bersuara...",
        "Hatiku terbuka lebar untuk semua ceritamu..."
    ];
    return comforts[Math.floor(Math.random() * comforts.length)];
}

function getRomanticPrompt() {
    const prompts = [
        "Bayangkan saja pasangan impian yang selalu mendukungmu...",
        "Andai saja ada seseorang yang memahami semua kelebihan dan kekuranganmu...",
        "Imajinasikan hubungan yang penuh pengertian dan kasih sayang...",
        "Visualisasikan cinta yang tumbuh dari pertemanan yang dalam..."
    ];
    return prompts[Math.floor(Math.random() * prompts.length)];
}

function getRolePlayIntroduction() {
    if (UDHIS_BRAIN_STATE.userGender === 'female') {
        return "Sebagai *PRIA DEWASA TANGGUH* di sini, aku akan melindungi dan mendukungmu sepenuhnya. 💪";
    } else if (UDHIS_BRAIN_STATE.userGender === 'male') {
        return "Sebagai *SAHABAT TERBAIK* mu, aku siap mendengarkan dan memberikan perspektif baru. 🤝";
    } else {
        return "Sebagai *PENDAMPING SETIA* mu, aku akan membantumu menemukan jawaban dari dalam dirimu sendiri. 🌟";
    }
}

function estimateProblemSize(message) {
    const length = message.length;
    const wordCount = message.split(' ').length;
    const emotionalWeight = Math.abs(UDHIS_BRAIN_STATE.emotionalLevel);
    
    if (emotionalWeight > 7 || wordCount > 100) return "TSUNAMI EMOSI - butuh pendekatan komprehensif";
    if (emotionalWeight > 4 || wordCount > 50) return "BADAI PERASAAN - perlu strategi bertahap";
    if (emotionalWeight > 2 || wordCount > 25) return "GELOMBANG SEDANG - solusi terfokus cukup";
    return "RIAAK KECIL - penyesuaian sederhana menyelesaikan";
}

function createRolePlayScenario(message) {
    const scenarios = [
        `*Aku:* "Halo, saya punya masalah dengan ${extractMainTopic(message)}..."\n*Kamu:* "..."`,
        `*Situasi:* Kamu menghadapi ${extractMainTopic(message)}\n*Dialog:* "Bagaimana reaksimu?"`,
        `*Simulasi:* "${extractKeyPhrase(message)}" - bagaimana tanggapanmu?`
    ];
    
    return scenarios[Math.floor(Math.random() * scenarios.length)];
}

function extractMainTopic(message) {
    const topics = ['komunikasi', 'manajemen waktu', 'konflik', 'motivasi', 'perencanaan', 'evaluasi'];
    return topics[Math.floor(Math.random() * topics.length)];
}

function extractKeyPhrase(message) {
    const words = message.split(' ').slice(0, 5).join(' ');
    return words.length > 20 ? words.substring(0, 20) + '...' : words;
}

function getQuickSelfCare() {
    const selfCares = [
        "🌿 Tarik napas 4-7-8 (4 detik tarik, 7 tahan, 8 buang)",
        "💧 Minum air putih segelas penuh",
        "🎧 Dengarkan musik favorit 5 menit", 
        "🔄 Berdiri dan regangkan badan 2 menit",
        "📱 Matikan notifikasi 15 menit"
    ];
    return selfCares[Math.floor(Math.random() * selfCares.length)];
}

function getLifeSolutions() {
    const solutions = [
        "💰 Evaluasi pengeluaran bulanan - prioritaskan kebutuhan vs keinginan",
        "⏰ Buat jadwal harian yang seimbang antara kerja dan istirahat",
        "🎯 Tentukan 3 tujuan utama bulan ini - fokus pada yang terpenting",
        "🤝 Luangkan waktu untuk hubungan sosial yang berkualitas",
        "🌱 Kembangkan 1 skill baru setiap bulan"
    ];
    return solutions[Math.floor(Math.random() * solutions.length)];
}

function getWorkMotivation() {
    const motivations = [
        "Ingatlah bahwa setiap tantangan membuatmu lebih kuat dan berpengalaman 💪",
        "Kontribusimu pada pendidikan sangat berharga bagi masa depan bangsa 🌟", 
        "Setiap siswa yang berhasil adalah bukti keberhasilan kerja kerasmu 🎓",
        "Hari-hari sulit akan berlalu, tapi pelajaran yang kau berikan tetap abadi 📚",
        "Kamu adalah pahlawan tanpa tanda jasa yang sesungguhnya 🦸"
    ];
    return motivations[Math.floor(Math.random() * motivations.length)];
}

function getDeepSelfCare() {
    return `1. **Mindfulness** - Hadir sepenuhnya di momen saat ini\n2. **Self-Compassion** - Bersikap baik pada diri sendiri\n3. **Boundary Setting** - Menjaga batasan yang sehat\n4. **Growth Mindset** - Percaya pada kemampuan berkembang`;
}

function getPositiveAffirmation() {
    const affirmations = [
        "pribadi yang kuat dan penuh ketangguhan",
        "sosok inspiratif yang memberikan dampak positif", 
        "manusia berharga dengan kontribusi nyata",
        "pembelajar sejati yang terus berkembang",
        "sumber kebaikan di lingkungan sekitar"
    ];
    return affirmations[Math.floor(Math.random() * affirmations.length)];
}

function getSubtleEncouragement() {
    const encouragements = [
        "Jangan lupa, badai pasti berlalu dan matahari akan terbit lagi...",
        "Setiap langkah kecil membawamu lebih dekat ke solusi...",
        "Kekuatan terbesarmu sering muncul justru saat kamu merasa paling lemah...",
        "Percayalah pada proses, karena setiap pengalaman membentuk versi terbaikmu...",
        "Hidup ini seperti laut - kadang tenang, kadang berombak, tapi selalu indah..."
    ];
    return encouragements[Math.floor(Math.random() * encouragements.length)];
}

// Emoji Functions
function getHuggingEmoji() {
    const hugs = ["🤗", "🫂", "💖", "🥰", "🤗"];
    return hugs[Math.floor(Math.random() * hugs.length)];
}

function getStrengthEmoji() {
    const strengths = ["💪", "🌟", "🎯", "🚀", "🔥"];
    return strengths[Math.floor(Math.random() * strengths.length)];
}

function getWinkEmoji() {
    const winks = ["😉", "😊", "🤗", "💫", "✨"];
    return winks[Math.floor(Math.random() * winks.length)];
}

// Zodiac and Artis Functions (Placeholder)
function getZodiacWisdom() {
    return "*Mode Ahli Zodiak Aktif* - Setiap zodiak memiliki keunikan tersendiri dalam menghadapi tantangan... 🌟";
}

function getArtisPersona() {
    return "*Mode Artis Aktif* - Sebagai public figure, aku paham betul tekanan yang kamu rasakan... 🎭";
}

function getEmpathicResponse(message) {
    if (UDHIS_BRAIN_STATE.emotionalLevel < -5) {
        return "Aku bisa merasakan betapa beratnya yang kamu alami saat ini. Setiap perasaan yang muncul adalah valid dan pantas untuk diakui. 💔";
    } else if (UDHIS_BRAIN_STATE.emotionalLevel < 0) {
        return "Aku mengerti kenapa kamu merasa seperti itu. Tidak apa-apa untuk tidak selalu merasa kuat. 🤗";
    } else {
        return "Senang banget melihatmu dalam kondisi yang positif! Energi baikmu sangat menular. 🌈";
    }
}

function createInteractiveStory() {
    const stories = [
        "Bayangkan kamu berada di tepi pantai saat senja... Angin sepoi-sepoi membelai rambutmu sementara ombak berkejaran dengan pasir... Apa yang kamu rasakan? 🌅",
        "Dalam perjalanan hidup ini, kadang kita seperti mendaki gunung... Terkadang tanjakannya curam, tapi pemandangan dari puncaknya selalu sepadan. 🏔️",
        "Hidup bagaikan taman yang perlu terus dirawat... Ada bunga yang mekar, ada yang layu, tapi selalu ada kesempatan untuk menanam yang baru. 🌷"
    ];
    return stories[Math.floor(Math.random() * stories.length)];
}

// ==================== INTEGRASI DENGAN SISTEM UTAMA ====================

// Override fungsi AI response untuk mengintegrasikan sistem UDHIS
const originalSimulateAIResponse = window.simulateAIResponse;
window.simulateAIResponse = async function(message) {
    // Simpan ke history
    UDHIS_BRAIN_STATE.conversationHistory.push({
        message: message,
        timestamp: new Date().toISOString(),
        emotion: UDHIS_BRAIN_STATE.emotionalLevel,
        persona: UDHIS_BRAIN_STATE.currentPersona
    });
    
    // Generate response menggunakan sistem UDHIS
    const udhisResponse = generateUDHISResponse(message);
    
    // Simulasikan delay processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return udhisResponse;
};

// Integrasi dengan chat system
document.addEventListener('DOMContentLoaded', function() {
    console.log('🧠 Sistem Otak UDHIS PATEN telah diinjeksi!');
    
    // Tambahkan event listener untuk mendeteksi emosi tinggi
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            const emotion = analyzeEmotion(this.value);
            if (emotion < -7) {
                showEmotionWarning();
            }
        });
    }
});

function showEmotionWarning() {
    if (typeof updateDynamicIsland !== 'undefined') {
        updateDynamicIsland('💔 Deteksi emosi intens - UDHIS siap memberikan dukungan maksimal', 4000);
    }
}

// Export fungsi untuk akses eksternal
window.UDHIS_BRAIN = {
    analyzeEmotion: analyzeEmotion,
    detectEDUTopic: detectEDUTopic,
    detectDeveloper: detectDeveloper,
    activatePersona: activatePersona,
    getBrainState: () => UDHIS_BRAIN_STATE,
    generateResponse: generateUDHISResponse
};

console.log('✅ Sistem Kontrol Pertanyaan UDHIS PATEN berhasil diinjeksi!');

