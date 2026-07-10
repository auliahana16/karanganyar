/* ============================================================
   LARAS — Multi-Language Engine (Vanilla JS, no backend)
   Bahasa: Indonesia (default) · English · Basa Jawa
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'laras_lang';
  var DEFAULT_LANG = 'id';
  var SUPPORTED = ['id', 'en', 'jv'];
  var FADE_MS = 150; // out + in ≈ 300ms total, per spec

  /* ---------------------------------------------------------
     1) STATIC UI TRANSLATIONS
     Tambah/ubah teks di sini saja — tidak perlu ubah HTML.
     --------------------------------------------------------- */
  var translations = {
    id: {
      meta: { title: 'LARAS — Temukan Warisan Hidup Karanganyar', description: 'LARAS adalah Digital Heritage Experience Platform yang mengajak Anda menjelajahi jiwa budaya Kabupaten Karanganyar.' },
      skipLink: 'Lewati ke konten utama',
      langSwitcher: { label: 'Bahasa', current: 'ID' },
      nav: { about: 'Tentang', journey: 'Jelajahi', map: 'Peta', preserve: 'Lestarikan', toggle: 'Buka menu' },
      hero: {
        ariaLabel: 'Gerbang masuk menuju Karanganyar',
        location: 'Kabupaten Karanganyar \u2014 Jawa Tengah',
        line1: 'Anda berdiri', accent: 'di ambang', line2: 'Karanganyar',
        tagline: 'Di kaki Gunung Lawu, sebuah tanah menyimpan napas panjang sejarah \u2014 menanti untuk dirasakan, bukan sekadar dibaca.',
        cta: 'Melangkah Masuk',
        scrollHintLabel: 'Gulir turun untuk melangkah masuk ke Karanganyar',
        scrollHint: 'Gulir Perlahan'
      },
      about: {
        eyebrow: 'Where Heritage Lives',
        titleHtml: 'Di Tanah Ini, Warisan <em>Tidak Pernah Berhenti Hidup</em>.',
        text: 'Sejak masa kerajaan kuno, Karanganyar tumbuh di antara candi, hutan, dan ladang teh \u2014 tempat alam, tradisi, dan kehidupan sehari-hari saling menyatu tanpa batas. Setiap sudutnya menyimpan cerita yang belum banyak diceritakan. Perjalanan Anda akan membawa pada penemuan itu, satu demi satu.',
        stat1: 'Jalur Penjelajahan Budaya', stat2: 'Halaman Warisan', stat3: 'Cerita yang Hidup'
      },
      journey: {
        eyebrow: 'Pilih Jalur Anda', title: 'Lima Jalan Menuju Jiwa Karanganyar', exploreLabel: 'Jelajahi',
        cards: {
          sacred: { desc: 'Candi Sukuh, Candi Cetho, dan Museum Dayu \u2014 jejak filosofi yang terukir di batu.' },
          living: { desc: 'Sedekah Bumi, festival, dan tarian yang masih dirayakan oleh masyarakat hari ini.' },
          hands: { desc: 'Batik, kerajinan kayu dan bambu \u2014 kisah tangan yang merawat tradisi.' },
          taste: { desc: 'Timlo, jadah, sate kelinci \u2014 rasa yang menyimpan sejarah keluarga.' },
          nature: { desc: 'Gunung Lawu, Kebun Teh Kemuning, dan Grojogan Sewu \u2014 alam yang membentuk cara hidup masyarakat Karanganyar.' }
        }
      },
      stories: {
        eyebrow: 'Cerita Pilihan', title: 'Kisah yang Patut Diselami',
        prevLabel: 'Cerita sebelumnya', nextLabel: 'Cerita berikutnya',
        items: {
          sacred: { title: 'Relief yang Berbisik', desc: 'Di lereng Lawu, Candi Sukuh menyimpan pesan moral yang diwariskan lintas generasi tanpa pernah ditulis dalam buku.' },
          hands: { title: 'Malam-malam Canting', desc: 'Setiap goresan malam pada kain batik adalah doa yang dititipkan pengrajin untuk pemakainya.' },
          living: { title: 'Bumi yang Disyukuri', desc: 'Sedekah Bumi bukan sekadar ritual \u2014 ia adalah cara masyarakat berterima kasih pada tanah yang menghidupi.' },
          nature: { title: 'Embun di Kemuning', desc: 'Kebun teh yang menghijau bukan hanya lanskap, tetapi ritme hidup yang menuntun keseharian warga.' }
        }
      },
      explorer: {
        eyebrow: 'Jelajahi Karanganyar', title: 'The Living Map of Karanganyar',
        desc: 'Setiap destinasi adalah gerbang menuju sejarah, budaya, dan alam yang menanti untuk dijelajahi.',
        pill1: '17 Destinasi Warisan', pill2: '5 Jalur Penjelajahan', pill3: 'Pengalaman Interaktif',
        filtersAriaLabel: 'Filter destinasi berdasarkan kategori',
        filters: { all: 'Semua', temple: 'Candi', nature: 'Alam', museum: 'Museum', culture: 'Budaya', teaPlantation: 'Kebun Teh', waterfall: 'Air Terjun' },
        emptyState: 'Pilih salah satu marker di peta untuk memulai penjelajahan.',
        exploreStory: 'Jelajahi Kisah', openMaps: 'Buka Google Maps',
        mapAriaLabel: 'Peta interaktif wilayah Kabupaten Karanganyar'
      },
      preserve: {
        eyebrow: 'Bersama Menjaga',
        titleHtml: 'Warisan bukan hanya apa yang kita terima,<br>tetapi apa yang kita pilih untuk kita jaga.',
        text: 'Setiap kunjungan, setiap cerita yang dibagikan, dan setiap apresiasi terhadap budaya lokal adalah langkah kecil dalam menjaga warisan ini tetap hidup untuk generasi berikutnya.',
        cta: 'Mulai Menjelajah'
      },
      footer: { tagline: 'Menyingkap Warisan Hidup Karanganyar', credit: 'Dibuat untuk BYTESFEST 2026 \u2014 CultureVerse: Preserving Heritage Through Design' },
      aboutPage: {
        hero: {
          crumb: 'Tentang',
          title: 'Tentang Laras',
          subtitle: 'Laras adalah Digital Heritage Experience Platform \u2014 ruang untuk merasakan, bukan sekadar membaca, jiwa budaya Kabupaten Karanganyar.'
        },
        philosophy: {
          eyebrow: 'Filosofi Kami',
          text: 'Budaya bukan sesuatu yang hanya disimpan di museum. Budaya adalah sesuatu yang hidup, terus berkembang bersama masyarakat, dan harus dikenalkan kembali kepada generasi muda melalui teknologi digital. Karena itu, Laras mengubah pengalaman mengenal budaya menjadi sebuah perjalanan digital.'
        },
        meaning: {
          eyebrow: 'Makna Nama',
          title: 'Laras Berarti Harmoni',
          text: 'Dalam budaya Jawa, "Laras" berarti keselarasan \u2014 harmoni antara sejarah, budaya, manusia, alam, tradisi, dan masa depan. Laras bukan media informasi, bukan portal pemerintah, dan bukan website wisata. Laras adalah ruang untuk merasakan perjalanan budaya Karanganyar melalui pengalaman digital yang modern.'
        },
        purpose: {
          eyebrow: 'Tujuan Kami',
          title: 'Mengapa Laras Hadir',
          cards: {
            introduce: { title: 'Memperkenalkan Budaya', desc: 'Mengenalkan kekayaan budaya Kabupaten Karanganyar kepada generasi masa kini secara modern dan mendalam.' },
            education: { title: 'Edukasi Digital', desc: 'Menjadi media edukasi yang mendukung pelestarian budaya sejalan dengan SDG 11: Kota dan Permukiman Berkelanjutan.' },
            connect: { title: 'Menghubungkan Generasi', desc: 'Menjembatani budaya tradisional dengan generasi digital agar rasa bangga terhadap budaya lokal terus tumbuh.' }
          }
        },
        audience: {
          title: 'Ditujukan bagi Setiap Pecinta Budaya',
          text: 'Laras dirancang untuk Generasi Z, pelajar, mahasiswa, wisatawan, masyarakat umum, hingga siapa pun yang mencintai budaya Indonesia \u2014 siapa pun yang ingin merasakan, bukan sekadar membaca, kekayaan budaya Karanganyar.'
        },
        competition: {
          title: 'CultureVerse: Preserving Heritage Through Design',
          text: 'Laras dirancang sebagai karya untuk kompetisi BYTESFEST 2026 dengan subtema CultureVerse, menggabungkan storytelling, desain modern, dan teknologi web statis untuk membuktikan bahwa teknologi dapat menjadi media efektif pelestarian warisan budaya.'
        },
        cta: {
          eyebrow: 'Mulai Sekarang',
          quoteHtml: '"Every Heritage Lives Because<br>Someone Chooses to Preserve It."',
          button: 'Mulai Menjelajah'
        },
        footer: {
          credit: 'CultureVerse: Preserving Heritage Through Design',
          backHome: 'Kembali ke Beranda'
        }
      },
      sacred: {
        sukuh: {
          crumb: 'Sacred Heritage',
          hero: {
            title: 'Candi Sukuh',
            subtitle: 'Candi filosofis di lereng Gunung Lawu yang menyimpan pesan moral lintas generasi dalam setiap reliefnya.'
          },
          intro: 'Candi Sukuh berdiri megah di kaki Gunung Lawu, pada ketinggian sekitar 910 meter di atas permukaan laut. Berbeda dengan candi-candi Hindu lainnya di Jawa, Candi Sukuh memiliki arsitektur yang unik \u2014 bentuknya menyerupai piramida dengan tangga yang menjulang tinggi, mirip dengan struktur zaman pra-kolonial Amerika.',
          philosophy: {
            title: 'Filosofi Terukir di Batu',
            text: 'Setiap relief di Candi Sukuh bukan sekadar hiasan. Mereka adalah buku visual yang menceritakan tentang siklus kehidupan, dari kelahiran hingga kematian, tentang kesucian, dan tentang hubungan manusia dengan alam semesta. Relief Lingga-Yoni yang terkenal, misalnya, bukan hanya simbol kesuburan, tetapi juga representasi dari keseimbangan energi dalam kehidupan.'
          },
          quote: '\u201cDi setiap batu Candi Sukuh, ada bisikan nenek moyang yang menunggu didengar.\u201d',
          facts: {
            title: 'Fakta Menarik',
            items: [
              'Dibangun pada akhir abad ke-15, masa transisi dari Kerajaan Majapahit',
              'Arsitekturnya unik dan tidak ditemukan di candi lain di Indonesia',
              'Reliefnya menggambarkan adegan dari wayang dan mitologi Jawa',
              'Terletak di Desa Karang, Kecamatan Ngargoyoso'
            ]
          },
          gallery: { alt: 'Candi Sukuh' },
          why: {
            title: 'Mengapa Penting?',
            text: 'Candi Sukuh adalah bukti bahwa masyarakat Jawa kuno memiliki pemahaman mendalam tentang filsafat, seni, dan arsitektur. Keberadaannya mengingatkan kita bahwa warisan budaya bukan hanya tentang bangunan tua, tetapi tentang kebijaksanaan yang tertanam dalam setiap batu.'
          },
          nav: { backToExplore: '\u2190 Kembali ke Jelajahi', next: 'Candi Cetho \u2192' }
        }
      },
      cetho: {
        crumb: 'Sacred Heritage',
        hero: {
          title: 'Candi Cetho',
          subtitle: 'Candi berundak yang menghadap matahari terbit, pusat ritual spiritual di lereng Gunung Lawu.'
        },
        history: {
          description: 'Candi Cetho terletak di ketinggian sekitar 1.400 meter di atas permukaan laut, menjadikannya salah satu candi tertinggi di Indonesia. Dibangun pada masa akhir Kerajaan Majapahit, candi ini memiliki arsitektur berundak yang menghadap ke arah timur \u2014 simbol dari penghormatan terhadap matahari sebagai sumber kehidupan.'
        },
        architecture: {
          title: 'Arsitektur yang Bersimbol',
          description: 'Candi Cetho memiliki teras-teras berundak yang mengingatkan pada piramida. Di setiap tingkatnya, terdapat relief dan arca yang masing-masing memiliki makna spiritual. Tangga menuju puncak candi melambangkan perjalanan spiritual manusia menuju kesucian.'
        },
        quote: '\u201cSetiap anak tangga Candi Cetho adalah langkah menuju pemahaman diri yang lebih dalam.\u201d',
        facts: {
          title: 'Fakta Menarik',
          items: [
            'Berada di ketinggian 1.400 mdpl, lebih tinggi dari Candi Sukuh',
            'Memiliki 13 tingkat teras yang melambangkan 13 tahap kesucian',
            'Menghadap ke timur, simbol penghormatan pada matahari',
            'Masih digunakan untuk ritual keagamaan hingga kini'
          ]
        },
        nav: { prev: '\u2190 Candi Sukuh', next: 'Museum Dayu \u2192' }
      },
      museum: {
        crumb: 'Sacred Heritage',
        hero: {
          title: 'Museum Dayu',
          subtitle: 'Ruang penyimpan artefak dan jejak sejarah masyarakat Karanganyar, dari masa purba hingga masa kerajaan.'
        },
        history: {
          description: 'Tak jauh dari kompleks Candi Sukuh, Museum Dayu menyimpan koleksi artefak yang menjadi saksi panjangnya perjalanan peradaban di lereng Gunung Lawu \u2014 mulai dari peninggalan masa megalitikum, era Hindu-Buddha, hingga benda-benda budaya masyarakat agraris setempat.'
        },
        collection: {
          title: 'Jendela Menuju Masa Lalu',
          description: 'Di dalam museum, pengunjung dapat menelusuri replika arca, prasasti, hingga alat-alat pertanian kuno yang digunakan masyarakat Karanganyar berabad-abad silam. Setiap koleksi disusun untuk membantu pengunjung memahami konteks sejarah Candi Sukuh dan Candi Cetho secara lebih utuh.'
        },
        quote: '\u201cMuseum bukan tempat menyimpan masa lalu, melainkan ruang untuk terus mendengarkannya.\u201d',
        facts: {
          title: 'Fakta Menarik',
          items: [
            'Berlokasi dekat kompleks Candi Sukuh di Kecamatan Ngargoyoso',
            'Menyimpan koleksi dari masa megalitikum hingga era Hindu-Buddha',
            'Menjadi pusat edukasi sejarah bagi pelajar dan peneliti',
            'Sering menjadi titik awal sebelum menjelajahi kawasan candi di lereng Lawu'
          ]
        },
        why: {
          title: 'Mengapa Penting?',
          description: 'Museum Dayu menjembatani pemahaman pengunjung terhadap konteks sejarah di balik candi-candi sakral di Karanganyar, menjadikan kunjungan ke kawasan ini lebih bermakna dan utuh.'
        },
        nav: { prev: '\u2190 Candi Cetho', next: 'Living Traditions \u2192' }
      },
      living: {
        sedekah: {
          crumb: 'Living Traditions',
          hero: { title: 'Sedekah Bumi', subtitle: 'Ritual syukuran hasil bumi yang masih dirayakan masyarakat Karanganyar sebagai ungkapan terima kasih kepada tanah yang menghidupi.' },
          intro: 'Setiap tahun, ketika musim panen tiba, desa-desa di Karanganyar menggelar Sedekah Bumi \\u2014 sebuah tradisi turun-temurun yang merayakan kelimpahan hasil bumi sekaligus memanjatkan rasa syukur. Warga berkumpul membawa hasil tani, gunungan tumpeng, dan aneka sesaji untuk diarak menuju balai desa atau punden setempat.',
          history: {
            title: 'Lebih dari Sekadar Ritual',
            description: 'Sedekah Bumi bukan hanya seremoni keagamaan, melainkan juga ruang sosial yang mempererat kebersamaan warga. Gotong royong dalam mempersiapkan acara, doa bersama, hingga pertunjukan seni tradisional seperti tari tayub dan wayang kulit menjadikan tradisi ini sebagai perayaan identitas kolektif masyarakat agraris Karanganyar.'
          },
          quote: '\\u201cBumi memberi tanpa diminta, maka sudah sepatutnya kita berterima kasih tanpa diminta pula.\\u201d',
          facts: {
            title: 'Fakta Menarik',
            items: [
              'Digelar setiap tahun setelah musim panen raya, biasanya di bulan Sura (kalender Jawa)',
              'Gunungan hasil bumi diarak keliling desa sebelum dibagikan kepada warga',
              'Diiringi pertunjukan seni tradisional seperti tayub, reog, dan wayang kulit',
              'Masih aktif dirayakan di berbagai desa di Karanganyar hingga hari ini'
            ]
          },
          gallery: { alt: 'Sedekah Bumi' },
          why: {
            title: 'Mengapa Penting?',
            description: 'Di tengah modernisasi, Sedekah Bumi menjadi pengingat bahwa hubungan manusia dengan alam perlu dijaga dengan rasa hormat. Tradisi ini mengajarkan generasi muda untuk tidak melupakan akar agraris dan nilai gotong royong yang membentuk karakter masyarakat Karanganyar.'
          },
          nav: { prev: '\\u2190 Museum Dayu', next: 'Festival Budaya \\u2192' }
        },
        festival: {
          crumb: 'Living Traditions',
          hero: { title: 'Festival Budaya Karanganyar', subtitle: 'Perayaan tahunan yang menyatukan kesenian, komunitas, dan identitas masyarakat Karanganyar dalam satu panggung besar.' },
          intro: 'Setiap tahun, alun-alun dan jalan-jalan desa di Karanganyar berubah menjadi panggung yang hidup. Festival Budaya Karanganyar adalah perayaan yang mengumpulkan kesenian dari berbagai kecamatan \\u2014 dari gamelan yang mengalun hingga tari topeng yang berputar \\u2014 menjadi satu momentum yang menegaskan bahwa budaya ini belum pernah berhenti berdetak.',
          history: {
            title: 'Panggung yang Menyatukan Lintas Generasi',
            description: 'Festival ini lahir dari kebutuhan masyarakat untuk merawat kesenian yang dulunya hanya tampil secara terpisah di tiap dusun. Kini, ia menjadi ruang temu antara seniman tradisional berusia lanjut dan komunitas seni muda yang ingin belajar, tampil, dan meneruskan warisan yang hampir terputus.'
          },
          quote: '\\u201cFestival bukan sekadar tontonan. Bagi kami, ini bukti bahwa tradisi bisa terus hidup selama ada yang mau merayakannya.\\u201d',
          facts: {
            title: 'Fakta Menarik',
            items: [
              'Festival biasanya menampilkan lebih dari belasan jenis kesenian dari berbagai kecamatan dalam satu rangkaian acara',
              'Banyak sanggar seni menjadikan festival ini sebagai ajang regenerasi penari dan seniman muda',
              'Beberapa pertunjukan yang ditampilkan merupakan kesenian langka yang nyaris punah dan dihidupkan kembali khusus untuk festival',
              'Dikemas sebagai agenda resmi tahunan pemerintah Kabupaten Karanganyar sejak 2008'
            ]
          },
          gallery: { alt: 'Festival Budaya Karanganyar' },
          why: {
            title: 'Mengapa Penting?',
            description: 'Festival Budaya adalah bukti bahwa tradisi tidak harus mati ketika zaman berubah. Ia bisa bertransformasi menjadi ruang ekspresi yang relevan bagi generasi baru, asalkan ada komunitas yang memilih untuk terus merayakannya bersama-sama.'
          },
          nav: { prev: '\\u2190 Sedekah Bumi', next: 'Tari Tradisional \\u2192' }
        },
        seni: {
          crumb: 'Living Traditions',
          hero: { title: 'Seni Karawitan Daerah', subtitle: 'Dari karawitan yang mengalun di malam hari hingga teater rakyat yang menghidupkan kisah-kisah lama \\u2014 seni daerah Karanganyar hadir dalam banyak rupa.' },
          intro: 'Seni daerah Karanganyar tidak pernah lahir dari panggung megah. Ia tumbuh dari kehidupan sehari-hari masyarakat \\u2014 dari suara kentongan yang mengawali pagi di dusun, karawitan yang dimainkan dalam acara pernikahan dan khitanan, hingga pertunjukan reog yang menghibur warga di malam festival. Ini adalah seni yang tidak pernah terpisah dari hidup yang dijalaninya.',
          history: {
            title: 'Karawitan: Suara yang Menyatukan',
            description: 'Karawitan adalah musik gamelan yang menjadi tulang punggung kesenian Jawa. Di Karanganyar, kelompok-kelompok karawitan desa masih aktif berlatih setiap minggu, mengiringi berbagai upacara adat dan pertunjukan wayang. Suaranya yang khas \\u2014 perpaduan antara gender, gong, dan saron \\u2014 menjadi latar keseharian yang tidak tergantikan.'
          },
          quote: '\\u201cDalam karawitan, tidak ada yang bermain sendiri. Semua harus saling mendengar, saling menyesuaikan. Itulah filosofi hidup bersama.\\u201d',
          facts: {
            title: 'Fakta Menarik',
            items: [
              'Karawitan di Karanganyar memiliki ciri khas gaya Surakarta yang membedakannya dari wilayah lain di Jawa',
              'Banyak kesenian daerah di sini melibatkan seluruh keluarga lintas generasi dalam satu kelompok penampil'
            ]
          },
          gallery: { alt: 'Pertunjukan Seni Karawitan Daerah' },
          why: {
            title: 'Mengapa Penting?',
            description: 'Bermain karawitan mengajarkan disiplin, kesabaran, kerja sama, dan saling menghargai karena setiap pemain memiliki peran yang harus selaras.'
          },
          nav: { prev: '\\u2190 Tari Tradisional', next: 'Hands of Heritage \\u2192' }
        },
        tari: {
          crumb: 'Living Traditions',
          hero: { title: 'Tari Tradisional Karanganyar', subtitle: 'Setiap gerak dalam tari tradisional Karanganyar menyimpan bahasa \\u2014 tentang penghormatan kepada alam, raja, dan Sang Pencipta.' },
          intro: 'Sebelum kata-kata ditemukan, ada gerak. Tari-tarian tradisional di Karanganyar bukan sekadar tontonan \\u2014 mereka adalah bahasa tubuh yang menyimpan kisah-kisah leluhur. Setiap gerakan, dari posisi jari yang meruncing hingga arah tatapan mata, telah dimaknai dan diwariskan dari satu penari ke penari berikutnya selama berabad-abad.',
          history: {
            title: 'Gerak yang Diwarisi dari Keraton',
            description: 'Banyak tarian tradisional di Karanganyar tumbuh dari pengaruh budaya keraton Surakarta yang menyebar ke wilayah pedesaan sekitarnya. Tari Bedhaya, Srimpi, hingga berbagai tari topeng berkembang di sanggar-sanggar desa yang menjaga pakem geraknya dengan ketat, sambil tetap memberi ruang bagi interpretasi lokal masing-masing komunitas.'
          },
          quote: '\\u201cMenari bukan sekadar bergerak. Setiap gerakan adalah doa yang disampaikan lewat tubuh.\\u201d',
          facts: {
            title: 'Fakta Menarik',
            items: [
              'Sebagian besar tarian tradisional Karanganyar memiliki pakem gerak yang diturunkan secara lisan dari guru ke murid',
              'Kostum tari biasanya dibuat dengan kain batik khas daerah, menyatukan dua warisan budaya sekaligus',
              'Beberapa tarian hanya boleh ditampilkan pada momen tertentu \\u2014 upacara adat atau penyambutan tamu kehormatan',
              'Sanggar-sanggar tari lokal kini mulai membuka kelas untuk umum sebagai cara meregenerasi penari muda'
            ]
          },
          gallery: { alt: 'Pertunjukan Tari Tradisional' },
          why: {
            title: 'Mengapa Penting?',
            description: 'Tari tradisional adalah museum yang bergerak. Setiap penari yang menekuni gerak ini sesungguhnya sedang menjaga sebuah bahasa kuno tetap hidup melalui tubuhnya sendiri. Ketika tidak ada lagi yang menari, bahasa itu punah \\u2014 dan bersamanya hilang pula satu cara manusia memahami dirinya dalam hubungannya dengan alam dan kosmos.'
          },
          nav: { prev: '\\u2190 Festival Budaya', next: 'Seni Karawitan\\u2192' }
        }
      },
      hands: {
        batik: {
          crumb: 'Hands of Heritage',
          hero: {
            title: 'Batik Karanganyar',
            subtitle: 'Setiap goresan malam di atas kain adalah doa yang dititipkan pengrajin untuk pemakainya, diwariskan lintas generasi.'
          },
          intro: 'Di sudut-sudut kampung Karanganyar, suara canting yang menari di atas kain mori masih terdengar setiap hari. Sentra batik di wilayah ini, seperti di sekitar Kecamatan Jaten dan Colomadu, menjadi rumah bagi para pengrajin yang telah mewarisi keterampilan membatik dari orang tua dan kakek-nenek mereka.',
          history: {
            title: 'Filosofi dalam Setiap Motif',
            description: 'Batik Karanganyar memiliki motif khas yang terinspirasi dari alam lereng Gunung Lawu \\u2014 daun teh, relief candi, hingga kabut pegunungan. Proses pembuatannya melalui tahapan panjang: nyungging (membuat pola), nglowong (mencanting garis utama), hingga nembok dan pewarnaan berulang yang bisa memakan waktu berminggu-minggu untuk satu lembar kain.'
          },
          quote: '\\u201cCanting bukan sekadar alat, ia adalah perpanjangan tangan dari hati yang menenangkan jiwa.\\u201d',
          facts: {
            title: 'Fakta Menarik',
            items: [
              'Proses membatik tulis satu kain bisa memakan waktu 2-4 minggu',
              'Motif khas terinspirasi alam Lawu: daun teh, relief candi, dan kabut gunung',
              'Diwariskan secara lisan dan praktik langsung dari generasi ke generasi',
              'Beberapa sentra kini membuka kelas membatik untuk wisatawan'
            ]
          },
          gallery: { alt: 'Proses membatik', alt2: 'Motif batik Karanganyar' },
          why: {
            title: 'Mengapa Penting?',
            description: 'Batik bukan hanya kain, melainkan identitas. Menjaga sentra batik Karanganyar tetap hidup berarti menjaga mata pencaharian pengrajin sekaligus melestarikan bahasa visual yang merekam filosofi hidup masyarakat lereng Lawu.'
          },
          nav: { prev: '\\u2190 Seni Karawitan', next: 'Kerajinan Kayu \\u2192' }
        },
        bambu: {
          crumb: 'Hands of Heritage',
          hero: {
            title: 'Kerajinan Bambu Karanganyar',
            subtitle: 'Dari batang bambu yang tumbuh liar di lereng bukit, tangan-tangan terampil pengrajin Karanganyar mengubahnya menjadi anyaman halus yang fungsional sekaligus indah.'
          },
          intro: 'Bambu telah lama menjadi sahabat kehidupan masyarakat Karanganyar, jauh sebelum kata \\u201cramah lingkungan\\u201d menjadi tren. Di halaman-halaman rumah yang rindang, rumpun bambu tumbuh setia menjadi sumber bahan yang tak pernah habis \\u2014 dan di tangan para pengrajin, ia berubah menjadi anyaman yang membentuk keseharian: tampah, besek, bakul, hingga furnitur dan aksesori dekoratif kontemporer.',
          history: {
            title: 'Anyaman yang Menyambungkan Generasi',
            description: 'Teknik menganyam bambu di Karanganyar dipelajari bukan dari buku, melainkan dari duduk di samping nenek atau ibu yang tangannya bergerak cepat membentuk pola. Setiap pola anyaman punya nama, punya fungsinya, dan punya cara membuatnya yang khas \\u2014 sebuah pengetahuan praktis yang hidup dalam gerakan tangan, bukan dalam tulisan.'
          },
          quote: '\\u201cMenganyam bambu itu seperti merajut kesabaran. Salah sedikit pola, harus dibongkar lagi dari awal. Tapi justru di situ letak nilainya.\\u201d',
          facts: {
            title: 'Fakta Menarik',
            items: [
              'Satu anyaman bambu sederhana bisa membutuhkan puluhan hingga ratusan helai bilah yang disiapkan secara manual',
              'Bambu yang digunakan biasanya direndam dan diolah terlebih dahulu agar lebih lentur dan tahan jamur',
              'Pola anyaman tertentu hanya diketahui oleh pengrajin tertentu dan diwariskan secara sangat terbatas',
              'Produk kerajinan bambu Karanganyar mulai merambah pasar ekspor untuk segmen dekorasi rumah artisanal'
            ]
          },
          gallery: { alt: 'Pengrajin menganyam bambu', alt2: 'Produk kerajinan bambu' },
          why: {
            title: 'Mengapa Penting?',
            description: 'Di era ketika produk plastik sekali pakai masih mendominasi, kerajinan bambu adalah pengingat bahwa kearifan lokal sudah lebih dulu menemukan solusi yang berkelanjutan. Menjaga kerajinan ini tetap hidup berarti menjaga pengetahuan tentang cara hidup yang lebih selaras dengan alam.'
          },
          nav: { prev: '\\u2190 Kerajinan Kayu', next: 'Taste of Karanganyar \\u2192' }
        },
        kayu: {
          crumb: 'Hands of Heritage',
          hero: {
            title: 'Kerajinan Kayu Karanganyar',
            subtitle: 'Di tangan pengrajin Karanganyar, sepotong kayu perlahan berubah menjadi ukiran yang menyimpan berminggu-minggu kesabaran dalam setiap lekukannya.'
          },
          intro: 'Suara pahat yang beradu dengan kayu terdengar dari balik pintu rumah-rumah pengrajin di pinggiran Karanganyar setiap pagi. Seorang pengrajin tua duduk membungkuk menghadapi balok kayu yang masih kasar, tangannya bergerak pelan namun pasti. Ia tidak terburu-buru. Ia sudah tahu sejak lama bahwa setiap kayu punya waktunya sendiri untuk menjadi sesuatu yang indah.',
          history: {
            title: 'Kayu yang Diberi Jiwa',
            description: 'Kerajinan kayu di Karanganyar berkembang dari kebutuhan masyarakat akan perabot dan ornamen rumah tangga yang dekat dengan bahan alam sekitar. Seiring waktu, keterampilan ini berkembang menjadi seni ukir yang menggabungkan fungsi praktis dengan nilai estetika dan filosofi Jawa \u2014 di mana setiap motif flora dan fauna yang diukir memiliki makna tersendiri bagi pemilikinya.'
          },
          quote: '\u201cSetiap kayu itu beda seratnya, beda karakternya. Kerjaan ini bukan soal cepat-cepatan, tapi soal mendengarkan kayunya dulu sebelum mulai mengukir.\u201d',
          facts: {
            title: 'Fakta Menarik',
            items: [
              'Kayu yang digunakan pengrajin biasanya berasal dari pohon lokal yang dipanen secara berkelanjutan di lereng Lawu',
              'Motif ukiran sering terinspirasi dari flora pegunungan Lawu \u2014 daun, bunga, dan sulur-sulur khas dataran tinggi',
              'Sebagian pengrajin masih menggunakan alat pahat tradisional yang diwariskan langsung dari orang tua mereka',
              'Beberapa sentra kerajinan kini membuka workshop bagi pelajar dan wisatawan yang ingin belajar mengukir'
            ]
          },
          gallery: { alt: 'Pengrajin Kayu Karanganyar' },
          why: {
            title: 'Mengapa Penting?',
            description: 'Kerajinan kayu adalah latihan kesabaran yang tidak bisa diakselarasi oleh mesin. Setiap ukiran yang dihasilkan secara manual menyimpan jejak manusia \u2014 ketidakrataan yang justru menjadi keunikannya, dan nilai filosofis yang tidak bisa diterjemahkan ke dalam produksi massal.'
          },
          nav: { prev: '\u2190 Batik Karanganyar', next: 'Kerajinan Bambu \u2192' }
        }
      },
      taste: {
        timlo: {
          crumb: 'Taste of Karanganyar',
          hero: {
            title: 'Timlo',
            subtitle: 'Sup bening hangat berisi sosis Solo, telur pindang, dan suwiran ayam \u2014 rasa yang menyimpan sejarah keluarga.'
          },
          intro: 'Timlo adalah hidangan sup bening khas Surakarta yang juga lekat dengan keseharian masyarakat Karanganyar. Kuahnya yang gurih dan ringan berpadu dengan sosis Solo (telur dadar gulung berisi daging cincang), telur pindang, ati ampela, serta suwiran ayam yang disiram di atas nasi hangat.',
          history: {
            title: 'Hidangan yang Merayakan Kesederhanaan',
            description: 'Berbeda dengan banyak masakan Jawa yang manis dan kental rempah, Timlo justru tampil dengan kuah bening yang ringan namun kaya rasa. Hidangan ini sering disajikan dalam acara keluarga maupun sebagai menu sarapan, menjadikannya bagian dari ritme keseharian warga Karanganyar dan sekitarnya.'
          },
          quote: '\u201cSemangkuk Timlo bukan sekadar sarapan, tapi pengingat akan dapur ibu di pagi hari.\u201d',
          ingredients: {
            title: 'Fakta Menarik',
            items: [
              'Nama "Timlo" diduga berasal dari pengaruh kuliner Tionghoa-Jawa di Karesidenan Surakarta',
              'Komponen khasnya: sosis Solo, telur pindang, ati ampela, dan suwiran ayam',
              'Disajikan dengan kuah bening yang ringan, berbeda dari sup Jawa pada umumnya',
              'Banyak ditemukan di warung-warung legendaris yang telah berdiri puluhan tahun'
            ]
          },
          gallery: { alt: 'Semangkuk Timlo' },
          why: {
            title: 'Mengapa Penting?',
            description: 'Timlo adalah jejak akulturasi budaya yang hidup di atas piring. Melestarikan resep dan cara penyajiannya berarti menjaga sepenggal sejarah perjumpaan budaya yang membentuk identitas kuliner Karanganyar hari ini.'
          },
          nav: { prev: '\u2190 Kerajinan Bambu', next: 'Jadah \u2192' }
        },
        jadah: {
          crumb: 'Taste of Karanganyar',
          hero: {
            title: 'Jadah',
            subtitle: 'Di pos-pos pendakian Gunung Lawu, sepotong jadah dengan tempe bacem hangat selalu menjadi teman setia perjalanan.'
          },
          intro: 'Sebelum matahari terbit, warung-warung kecil di lereng Gunung Lawu sudah menyiapkan jadah untuk para pendaki yang akan memulai perjalanan panjang ke puncak. Terbuat dari ketan yang dikukus lalu dipadatkan, jadah hadir dalam kesederhanaannya yang tak bisa digantikan \u2014 hangat, mengenyangkan, dan selalu mengingatkan siapa pun yang memakannya pada udara dingin dan kabut lereng Lawu.',
          history: {
            title: 'Bekal Kekuatan dari Leluhur',
            description: 'Jadah bukan camilan baru. Ia adalah bekal tradisional yang sudah dikenal masyarakat pegunungan Jawa sejak lama, dibawa ke ladang atau ke perjalanan panjang karena kandungan energi karbohidratnya yang padat. Di lereng Lawu, jadah biasanya disajikan bersama tempe bacem manis atau gula merah cair \u2014 kombinasi rasa manis dan gurih yang sederhana namun memuaskan.'
          },
          quote: '\u201cJadah itu makanan pendaki. Sebelum naik, makan jadah dulu. Sampai atas, badan tetap hangat dan kuat.\u201d',
          ingredients: {
            title: 'Fakta Menarik',
            items: [
              'Jadah dibuat dari ketan putih yang dikukus, lalu ditumbuk atau dipadatkan hingga teksturnya kenyal dan padat',
              'Biasanya disajikan hangat bersama tempe bacem, gula merah, atau kelapa parut berbumbu',
              'Menjadi salah satu camilan khas yang dicari wisatawan dan pendaki di kawasan Tawangmangu',
              'Beberapa penjual jadah di lereng Lawu sudah berdagang di tempat yang sama selama puluhan tahun'
            ]
          },
          gallery: { alt: 'Jadah khas lereng Gunung Lawu' },
          why: {
            title: 'Mengapa Penting?',
            description: 'Dalam kesederhanaannya, jadah menyimpan filosofi hidup masyarakat pegunungan: bahwa kekuatan tidak selalu datang dari sesuatu yang rumit atau mahal. Sebutir ketan yang dipadatkan dengan penuh perhatian cukup untuk menghangatkan tubuh dan menemani perjalanan panjang menyusuri lereng Lawu.'
          },
          nav: { prev: '\u2190 Timlo', next: 'Sate Kelinci \u2192' }
        },
        sate: {
          crumb: 'Taste of Karanganyar',
          hero: {
            title: 'Sate Kelinci',
            subtitle: 'Aroma bakaran sate yang khas selalu menyambut siapa pun yang singgah di Tawangmangu \u2014 dan yang membuatnya istimewa adalah dagingnya yang tak biasa.'
          },
          intro: 'Sepanjang jalan menuju Tawangmangu, deretan warung dengan arang membara dan asap putih yang mengepul adalah pemandangan yang paling khas. Para penjual mengipas tusukan demi tusukan sate dengan sabar, menghasilkan aroma yang sulit ditolak. Dan ketika ditanya apa isinya, jawabannya selalu sama: kelinci \u2014 hewan ternak yang justru tumbuh subur di dataran tinggi yang sejuk ini.',
          history: {
            title: 'Kreativitas yang Lahir dari Kearifan Lokal',
            description: 'Beternak kelinci sudah lama menjadi bagian dari kehidupan masyarakat di kawasan Tawangmangu yang sejuk dan lembab. Kelinci tumbuh subur di sini karena iklimnya yang cocok dan ketersediaan pakan hijau yang melimpah. Dari kebiasaan beternak inilah muncul kreativitas mengolah daging kelinci menjadi sate \u2014 menciptakan kuliner khas yang kini menjadi identitas rasa Tawangmangu.'
          },
          quote: '\u201cAwalnya cuma coba-coba mengolah daging kelinci dari ternak sendiri. Sekarang malah jadi yang paling dicari orang kalau ke Tawangmangu.\u201d',
          ingredients: {
            title: 'Fakta Menarik',
            items: [
              'Daging kelinci memiliki kandungan protein tinggi dengan lemak lebih rendah dibanding daging ayam maupun sapi',
              'Bumbu sate kelinci Tawangmangu menggunakan kecap dan rempah Jawa yang dibalurkan sebelum dibakar',
              'Kuliner ini paling ramai dijual pada akhir pekan saat wisatawan mengunjungi kawasan Tawangmangu',
              'Beberapa warung sate kelinci telah berdiri lebih dari 30 tahun dan menjadi tujuan kuliner wajib di kawasan ini'
            ]
          },
          gallery: { alt: 'Sate Kelinci khas Tawangmangu' },
          why: {
            title: 'Mengapa Penting?',
            description: 'Sate kelinci adalah bukti bahwa identitas kuliner bisa lahir dari adaptasi dan kreativitas terhadap kondisi alam lokal. Ia tidak berasal dari resep leluhur yang tertulis, melainkan dari percobaan dan keberanian mencoba \u2014 dan hasilnya adalah sesuatu yang kini menjadi kebanggaan tersendiri bagi masyarakat Tawangmangu.'
          },
          nav: { prev: '\u2190 Jadah', next: 'Wedang Tradisional \u2192' }
        },
        wedang: {
          crumb: 'Taste of Karanganyar',
          hero: {
            title: 'Wedang Tradisional',
            subtitle: 'Di udara dingin lereng Lawu, segelas wedang jahe hangat yang mengepul selalu lebih dari sekadar minuman \u2014 ia adalah ritual kebersamaan.'
          },
          intro: 'Sore hari di lereng Gunung Lawu, ketika udara mulai menggigit dan kabut mulai turun dari puncak, warung-warung kecil di pinggir jalan ramai dengan obrolan dan kepulan uap dari gelas-gelas wedang yang baru diseduh. Jahe yang dibakar lalu digeprek, serai yang menebarkan aroma segar, gula aren yang manis dan gelap \u2014 semua bersatu dalam minuman hangat yang sudah menjadi bagian tak terpisahkan dari keseharian masyarakat pegunungan Karanganyar.',
          history: {
            title: 'Rempah yang Merawat Tubuh dan Jiwa',
            description: 'Wedang tradisional Karanganyar berkembang dari kebutuhan masyarakat pegunungan untuk menjaga tubuh tetap hangat di tengah suhu yang bisa turun drastis di malam hari. Bahan-bahannya semuanya berasal dari alam sekitar \u2014 jahe, serai, kayu manis, cengkeh, hingga kapulaga \u2014 yang diracik dengan proporsi yang dijaga turun-temurun dalam setiap keluarga.'
          },
          quote: '\u201cSetiap sore warung saya ramai orang ngobrol sambil minum wedang. Bukan cuma soal rasanya, tapi soal kebersamaannya itu yang bikin orang selalu balik lagi.\u201d',
          ingredients: {
            title: 'Fakta Menarik',
            items: [
              'Wedang jahe Karanganyar biasanya menggunakan jahe yang dibakar terlebih dahulu agar rasanya lebih kuat dan aromatik',
              'Beberapa warung memiliki racikan rahasia keluarga yang tidak pernah dituliskan dalam bentuk resep formal',
              'Selain jahe, variannya meliputi wedang uwuh, wedang ronde, dan wedang secang yang masing-masing punya penggemar setia',
              'Dipercaya secara turun-temurun mampu menghangatkan tubuh, meredakan masuk angin, dan menjaga daya tahan tubuh'
            ]
          },
          gallery: { alt: 'Wedang rempah hangat', alt2: 'Suasana warung wedang' },
          why: {
            title: 'Mengapa Penting?',
            description: 'Wedang tradisional adalah pengingat bahwa kearifan lokal dalam bidang kesehatan dan kebersamaan sudah ada jauh sebelum istilah "wellness" menjadi tren. Melestarikan kebiasaan minum wedang bersama berarti menjaga ruang sosial yang tidak bisa digantikan oleh layar gawai manapun.'
          },
          nav: { prev: '\u2190 Sate Kelinci', next: 'Nature That Shapes Culture \u2192' }
        }
      },
      nature: {
        lawu: {
          crumb: 'Nature That Shapes Culture',
          hero: {
            title: 'Gunung Lawu',
            subtitle: 'Gunung yang dihormati, sumber kehidupan yang membentuk budaya dan jati diri masyarakat.'
          },
          intro: 'Gunung Lawu bukan sekadar gunung berapi tidak aktif setinggi 3.265 mdpl di perbatasan Jawa Tengah dan Jawa Timur. Bagi masyarakat Karanganyar, Lawu adalah penjaga, sumber air, dan ruang spiritual. Di lerengnya berdiri Candi Sukuh dan Candi Cetho, menjadi bukti betapa eratnya hubungan antara alam dan kepercayaan masyarakat sejak masa lampau.',
          history: {
            title: 'Penjaga yang Membentuk Kehidupan',
            description: 'Sejak masa lampau, Gunung Lawu menjadi sumber air dan kesuburan bagi tanah di sekelilingnya. Udara sejuk pegunungan turut membentuk pertanian teh dan sayur, sementara lerengnya yang menyimpan Candi Sukuh dan Candi Cetho menjadikan Lawu bukan hanya ruang alam, tetapi juga ruang spiritual yang membentuk keseharian dan kepercayaan masyarakat Karanganyar.'
          },
          quote: '\u201cGunung mengajarkan untuk tetap teguh; setiap langkah menuju puncak adalah kisah tentang keberanian, kesabaran, dan harapan.\u201d',
          facts: {
            title: 'Fakta Menarik',
            items: [
              'Gunung Lawu memiliki ketinggian 3.265 mdpl dan menjadi jalur pendakian spiritual populer',
              'Kawasan ini menjadi rumah bagi Candi Sukuh dan Candi Cetho di lerengnya',
              'Udara sejuk pegunungan turut membentuk pertanian teh dan sayur di sekitarnya'
            ]
          },
          gallery: { alt: 'Grojogan Sewu', alt2: 'Langit pegunungan Kemuning' },
          why: {
            title: 'Mengapa Penting?',
            description: 'Alam di sekitar Gunung Lawu bukan sekadar latar pemandangan, melainkan fondasi yang membentuk mata pencaharian, ritual, dan filosofi hidup masyarakat Karanganyar. Menjaga kelestariannya berarti menjaga akar dari seluruh budaya yang tumbuh di atasnya.'
          },
          nav: { prev: '\u2190 Wedang Tradisional', next: 'Kebun Teh Kemuning \u2192' }
        },
        grojogan: {
          crumb: 'Nature That Shapes Culture',
          hero: {
            title: 'Grojogan Sewu',
            subtitle: 'Suara gemuruh air yang jatuh dari ketinggian 81 meter terdengar jauh sebelum Grojogan Sewu terlihat \u2014 dan begitu terlihat, sulit untuk tidak berdiam diri sejenak.'
          },
          intro: 'Ada sesuatu yang terjadi pada setiap orang ketika pertama kali berdiri di depan Grojogan Sewu. Deburan air yang jatuh dari ketinggian 81 meter menciptakan kabut tipis yang menyegarkan wajah, suaranya yang konstan seperti meredam semua pikiran yang lain. Orang-orang berhenti bicara sebentar, hanya memandang. Bagi masyarakat Tawangmangu, air terjun ini bukan hanya objek wisata \u2014 ia adalah tetangga tua yang sudah menjadi bagian dari kehidupan mereka.',
          history: {
            title: 'Air yang Membentuk Peradaban Mini',
            description: 'Jauh sebelum Grojogan Sewu menjadi destinasi wisata, air yang mengalir dari ketinggian ini sudah menjadi sumber kehidupan bagi ladang-ladang di lembahnya. Masyarakat sekitar membangun sistem irigasi sederhana yang mengalirkan airnya ke sawah dan kebun sayur yang memberi makan keluarga mereka. Air terjun ini bukan sekadar pemandangan \u2014 ia adalah tulang punggung pertanian lereng Lawu di sisi selatan.'
          },
          quote: '\u201cKalau lagi banyak pikiran, saya suka duduk dekat air terjun ini. Entah kenapa, suaranya saja sudah bikin tenang.\u201d',
          facts: {
            title: 'Fakta Menarik',
            items: [
              'Grojogan Sewu memiliki ketinggian air terjun sekitar 81 meter, salah satu yang tertinggi di Jawa Tengah',
              'Nama "Sewu" berarti seribu dalam bahasa Jawa, menggambarkan percikan air yang begitu banyak saat jatuh',
              'Kawasan sekitar air terjun dihuni kera ekor panjang yang hidup liar dan sudah sangat terbiasa dengan kehadiran manusia',
              'Aliran airnya dimanfaatkan untuk mengairi ladang sayur dan kebun di lembah-lembah sekitarnya'
            ]
          },
          gallery: { alt: 'Air terjun Grojogan Sewu', alt2: 'Kawasan Grojogan Sewu' },
          why: {
            title: 'Mengapa Penting?',
            description: 'Grojogan Sewu mengajarkan sesuatu yang sederhana namun sering terlupakan: bahwa alam yang dijaga dengan baik akan terus memberi \u2014 air bersih, udara segar, kesuburan tanah, dan tempat bagi jiwa yang lelah untuk beristirahat. Menjaga air terjun ini tetap bersih dan lestari berarti menjaga fondasi kehidupan bagi ribuan orang yang tinggal di sekitarnya.'
          },
          nav: { prev: '\u2190 Kebun Teh Kemuning', next: 'Kembali ke Jelajahi \u2192' }
        },
        kemuning: {
          crumb: 'Nature That Shapes Culture',
          hero: {
            title: 'Kebun Teh Kemuning',
            subtitle: 'Hamparan kebun teh yang menghijau bukan hanya lanskap, tetapi ritme hidup yang menuntun keseharian warga.'
          },
          intro: 'Di ketinggian sekitar 1.200 meter di lereng barat Gunung Lawu, Kebun Teh Kemuning terhampar bagai permadani hijau yang menyejukkan mata. Kawasan ini telah menjadi sumber kehidupan masyarakat sekitar sejak masa kolonial, ketika perkebunan teh pertama kali dibuka di wilayah tersebut.',
          history: {
            title: 'Ritme yang Mengikat Generasi',
            description: 'Setiap pagi, para pemetik teh menyusuri jalur-jalur kebun mengikuti ritme yang sama seperti generasi sebelumnya. Aktivitas memetik, mengolah, hingga menyeduh teh telah menjadi bagian dari identitas warga Kemuning \u2014 sebuah siklus hidup yang berjalan selaras dengan musim dan embun pagi pegunungan.'
          },
          quote: '\u201cDaun teh dipetik dengan sabar, sama seperti budaya dirawat dari generasi ke generasi.\u201d',
          facts: {
            title: 'Fakta Menarik',
            items: [
              'Berada di ketinggian sekitar 1.200 mdpl di lereng barat Gunung Lawu',
              'Perkebunan teh ini telah beroperasi sejak masa kolonial Belanda',
              'Menjadi sumber mata pencaharian utama bagi warga Desa Kemuning',
              'Kini juga menjadi destinasi wisata alam dan edukasi pengolahan teh'
            ]
          },
          gallery: { alt: 'Kebun teh Kemuning', alt2: 'Pemetik teh Kemuning' },
          why: {
            title: 'Mengapa Penting?',
            description: 'Kebun Teh Kemuning adalah contoh nyata bagaimana alam dapat membentuk cara hidup sebuah komunitas. Menjaga kelestarian kebun ini berarti turut menjaga mata pencaharian dan ritme kehidupan yang telah berlangsung lintas generasi.'
          },
          nav: { prev: '\u2190 Gunung Lawu', next: 'Grojogan Sewu \u2192' }
        }
      }
    },

    en: {
      meta: { title: 'LARAS — Discover the Living Heritage of Karanganyar', description: 'LARAS is a Digital Heritage Experience Platform inviting you to explore the cultural soul of Karanganyar Regency.' },
      skipLink: 'Skip to main content',
      langSwitcher: { label: 'Language', current: 'EN' },
      nav: { about: 'About', journey: 'Explore', map: 'Map', preserve: 'Preserve', toggle: 'Open menu' },
      hero: {
        ariaLabel: 'The gateway into Karanganyar',
        location: 'Karanganyar Regency \u2014 Central Java',
        line1: 'You are standing', accent: 'at the threshold', line2: 'of Karanganyar',
        tagline: 'At the foot of Mount Lawu, a land holds a long breath of history \u2014 waiting to be felt, not merely read.',
        cta: 'Step Inside',
        scrollHintLabel: 'Scroll down to step into Karanganyar',
        scrollHint: 'Scroll Slowly'
      },
      about: {
        eyebrow: 'Where Heritage Lives',
        titleHtml: 'On This Land, Heritage <em>Never Stops Living</em>.',
        text: 'Since the age of ancient kingdoms, Karanganyar has grown among temples, forests, and tea gardens \u2014 where nature, tradition, and everyday life blend without borders. Every corner holds a story rarely told. Your journey will lead you to that discovery, one step at a time.',
        stat1: 'Cultural Journey Routes', stat2: 'Heritage Pages', stat3: 'Living Stories'
      },
      journey: {
        eyebrow: 'Choose Your Path', title: 'Five Roads to the Soul of Karanganyar', exploreLabel: 'Explore',
        cards: {
          sacred: { desc: 'Candi Sukuh, Candi Cetho, and Museum Dayu \u2014 traces of philosophy carved in stone.' },
          living: { desc: 'Sedekah Bumi, festivals, and dances still celebrated by the community today.' },
          hands: { desc: 'Batik, wood and bamboo crafts \u2014 the story of hands that keep tradition alive.' },
          taste: { desc: 'Timlo, jadah, rabbit satay \u2014 flavors that carry a family\u2019s history.' },
          nature: { desc: 'Mount Lawu, Kemuning Tea Garden, and Grojogan Sewu \u2014 nature that shapes the way of life in Karanganyar.' }
        }
      },
      stories: {
        eyebrow: 'Featured Stories', title: 'Tales Worth Diving Into',
        prevLabel: 'Previous story', nextLabel: 'Next story',
        items: {
          sacred: { title: 'The Whispering Relief', desc: 'On the slopes of Lawu, Candi Sukuh holds moral lessons passed across generations, never written in any book.' },
          hands: { title: 'Nights of the Canting', desc: 'Every stroke of wax on batik cloth is a prayer the craftsman entrusts to its wearer.' },
          living: { title: 'The Earth We Give Thanks For', desc: 'Sedekah Bumi is more than ritual \u2014 it is how the community gives thanks to the land that sustains it.' },
          nature: { title: 'Dew Over Kemuning', desc: 'The green tea gardens are not just scenery, but the rhythm of life that guides the villagers\u2019 days.' }
        }
      },
      explorer: {
        eyebrow: 'Explore Karanganyar', title: 'The Living Map of Karanganyar',
        desc: 'Every destination is a gateway to history, culture, and nature waiting to be explored.',
        pill1: '17 Heritage Destinations', pill2: '5 Exploration Routes', pill3: 'Interactive Experience',
        filtersAriaLabel: 'Filter destinations by category',
        filters: { all: 'All', temple: 'Temple', nature: 'Nature', museum: 'Museum', culture: 'Culture', teaPlantation: 'Tea Plantation', waterfall: 'Waterfall' },
        emptyState: 'Select a marker on the map to begin exploring.',
        exploreStory: 'Explore Story', openMaps: 'Open Google Maps',
        mapAriaLabel: 'Interactive map of Karanganyar Regency'
      },
      preserve: {
        eyebrow: 'Preserving Together',
        titleHtml: 'Heritage is not only what we inherit,<br>but what we choose to preserve.',
        text: 'Every visit, every story shared, and every appreciation of local culture is a small step toward keeping this heritage alive for the next generation.',
        cta: 'Start Exploring'
      },
      footer: { tagline: 'Discover the Living Heritage of Karanganyar', credit: 'Made for BYTESFEST 2026 \u2014 CultureVerse: Preserving Heritage Through Design' },
      aboutPage: {
        hero: {
          crumb: 'About',
          title: 'About Laras',
          subtitle: 'Laras is a Digital Heritage Experience Platform \u2014 a space to feel, not merely read, the cultural soul of Karanganyar Regency.'
        },
        philosophy: {
          eyebrow: 'Our Philosophy',
          text: 'Culture is not something kept only in museums. Culture is alive, constantly evolving alongside its people, and must be reintroduced to younger generations through digital technology. That is why Laras turns the experience of discovering culture into a digital journey.'
        },
        meaning: {
          eyebrow: 'The Meaning of the Name',
          title: 'Laras Means Harmony',
          text: 'In Javanese culture, "Laras" means harmony \u2014 a balance between history, culture, people, nature, tradition, and the future. Laras is not an information portal, not a government site, and not a tourism website. Laras is a space to feel Karanganyar\u2019s cultural journey through a modern digital experience.'
        },
        purpose: {
          eyebrow: 'Our Purpose',
          title: 'Why Laras Exists',
          cards: {
            introduce: { title: 'Introducing Culture', desc: 'Introducing the cultural richness of Karanganyar Regency to today\u2019s generation in a modern and meaningful way.' },
            education: { title: 'Digital Education', desc: 'Becoming an educational medium that supports cultural preservation, aligned with SDG 11: Sustainable Cities and Communities.' },
            connect: { title: 'Connecting Generations', desc: 'Bridging traditional culture with the digital generation so pride in local culture keeps growing.' }
          }
        },
        audience: {
          title: 'Made for Every Culture Lover',
          text: 'Laras is designed for Gen Z, students, travelers, the general public, and anyone who loves Indonesian culture \u2014 anyone who wants to feel, not merely read, the richness of Karanganyar\u2019s heritage.'
        },
        competition: {
          title: 'CultureVerse: Preserving Heritage Through Design',
          text: 'Laras was designed as an entry for the BYTESFEST 2026 competition under the CultureVerse subtheme, combining storytelling, modern design, and static web technology to prove that technology can be an effective medium for preserving cultural heritage.'
        },
        cta: {
          eyebrow: 'Start Now',
          quoteHtml: '"Every Heritage Lives Because<br>Someone Chooses to Preserve It."',
          button: 'Start Exploring'
        },
        footer: {
          credit: 'CultureVerse: Preserving Heritage Through Design',
          backHome: 'Back to Home'
        }
      },
      sacred: {
        sukuh: {
          crumb: 'Sacred Heritage',
          hero: {
            title: 'Candi Sukuh',
            subtitle: 'A philosophical temple on the slopes of Mount Lawu, holding moral lessons passed across generations within every relief.'
          },
          intro: 'Candi Sukuh stands proudly at the foot of Mount Lawu, at an elevation of roughly 910 meters above sea level. Unlike other Hindu temples in Java, Candi Sukuh has a unique architecture \u2014 shaped like a pyramid with a soaring staircase, resembling pre-colonial structures of the Americas.',
          philosophy: {
            title: 'Philosophy Carved in Stone',
            text: 'Every relief at Candi Sukuh is more than decoration. They form a visual book telling the cycle of life, from birth to death, of purity, and of humanity\u2019s relationship with the universe. The famous Lingga-Yoni relief, for instance, is not only a symbol of fertility but also a representation of the balance of energy in life.'
          },
          quote: '\u201cIn every stone of Candi Sukuh, there is a whisper from the ancestors waiting to be heard.\u201d',
          facts: {
            title: 'Interesting Facts',
            items: [
              'Built in the late 15th century, during the transition from the Majapahit Kingdom',
              'Its architecture is unique and found nowhere else among Indonesia\u2019s temples',
              'Its reliefs depict scenes from wayang puppetry and Javanese mythology',
              'Located in Karang Village, Ngargoyoso District'
            ]
          },
          gallery: { alt: 'Candi Sukuh' },
          why: {
            title: 'Why Does It Matter?',
            text: 'Candi Sukuh is proof that ancient Javanese society held a deep understanding of philosophy, art, and architecture. Its presence reminds us that cultural heritage is not only about old buildings, but about the wisdom embedded in every stone.'
          },
          nav: { backToExplore: '\u2190 Back to Explore', next: 'Candi Cetho \u2192' }
        }
      },
      cetho: {
        crumb: 'Sacred Heritage',
        hero: {
          title: 'Candi Cetho',
          subtitle: 'A terraced temple facing the sunrise, a center of spiritual ritual on the slopes of Mount Lawu.'
        },
        history: {
          description: 'Candi Cetho sits at an elevation of roughly 1,400 meters above sea level, making it one of the highest temples in Indonesia. Built in the late era of the Majapahit Kingdom, the temple has a terraced architecture facing east \u2014 a symbol of reverence for the sun as the source of life.'
        },
        architecture: {
          title: 'Architecture Full of Symbolism',
          description: 'Candi Cetho has stepped terraces reminiscent of a pyramid. Each level holds reliefs and statues, each carrying its own spiritual meaning. The staircase to the temple\u2019s peak symbolizes humanity\u2019s spiritual journey toward purity.'
        },
        quote: '\u201cEvery step of Candi Cetho is a step toward deeper self-understanding.\u201d',
        facts: {
          title: 'Interesting Facts',
          items: [
            'Sits at 1,400m above sea level, higher than Candi Sukuh',
            'Has 13 terrace levels symbolizing 13 stages of purity',
            'Faces east, a symbol of reverence for the sun',
            'Still used for religious rituals today'
          ]
        },
        nav: { prev: '\u2190 Candi Sukuh', next: 'Museum Dayu \u2192' }
      },
      museum: {
        crumb: 'Sacred Heritage',
        hero: {
          title: 'Museum Dayu',
          subtitle: 'A hall of artifacts and historical traces of the people of Karanganyar, from ancient times to the age of kingdoms.'
        },
        history: {
          description: 'Not far from the Candi Sukuh complex, Museum Dayu holds a collection of artifacts that bear witness to the long journey of civilization on the slopes of Mount Lawu \u2014 from megalithic relics, through the Hindu-Buddhist era, to the cultural objects of the local agrarian community.'
        },
        collection: {
          title: 'A Window Into the Past',
          description: 'Inside the museum, visitors can explore replica statues, inscriptions, and ancient farming tools once used by the people of Karanganyar centuries ago. Each collection is arranged to help visitors more fully understand the historical context of Candi Sukuh and Candi Cetho.'
        },
        quote: '\u201cA museum is not a place to store the past, but a space to keep listening to it.\u201d',
        facts: {
          title: 'Interesting Facts',
          items: [
            'Located near the Candi Sukuh complex in Ngargoyoso District',
            'Houses a collection spanning the megalithic period to the Hindu-Buddhist era',
            'Serves as a center of historical education for students and researchers',
            'Often the starting point before exploring the temple area on the slopes of Lawu'
          ]
        },
        why: {
          title: 'Why Does It Matter?',
          description: 'Museum Dayu bridges visitors\u2019 understanding of the historical context behind the sacred temples of Karanganyar, making a visit to the area more meaningful and complete.'
        },
        nav: { prev: '\u2190 Candi Cetho', next: 'Living Traditions \u2192' }
      },
      living: {
        sedekah: {
          crumb: 'Living Traditions',
          hero: { title: 'Sedekah Bumi', subtitle: 'A harvest thanksgiving ritual still celebrated by the people of Karanganyar as an expression of gratitude to the land that sustains them.' },
          intro: 'Every year, when harvest season arrives, villages across Karanganyar hold Sedekah Bumi \u2014 a tradition passed down through generations that celebrates the abundance of the harvest while offering thanks. Residents gather, bringing farm produce, towering rice-cone offerings, and various ceremonial offerings to be paraded to the village hall or local shrine.',
          history: {
            title: 'More Than Just a Ritual',
            description: 'Sedekah Bumi is not merely a religious ceremony, but also a social space that strengthens community bonds. Mutual cooperation in preparing the event, communal prayer, and traditional art performances such as tayub dance and wayang kulit shadow puppetry make this tradition a celebration of the collective identity of Karanganyar\u2019s agrarian community.'
          },
          quote: '\u201cThe earth gives without being asked, so it is only right that we give thanks without being asked as well.\u201d',
          facts: {
            title: 'Interesting Facts',
            items: [
              'Held every year after the main harvest season, usually in the month of Sura (Javanese calendar)',
              'A mountain of harvest offerings is paraded around the village before being shared among residents',
              'Accompanied by traditional art performances such as tayub, reog, and wayang kulit',
              'Still actively celebrated in many villages across Karanganyar to this day'
            ]
          },
          gallery: { alt: 'Sedekah Bumi' },
          why: {
            title: 'Why Does It Matter?',
            description: 'Amid modernization, Sedekah Bumi serves as a reminder that the relationship between humans and nature must be maintained with respect. This tradition teaches younger generations not to forget their agrarian roots and the values of mutual cooperation that shape the character of Karanganyar\u2019s people.'
          },
          nav: { prev: '\u2190 Museum Dayu', next: 'Cultural Festival \u2192' }
        },
        festival: {
          crumb: 'Living Traditions',
          hero: { title: 'Festival Budaya Karanganyar', subtitle: 'An annual celebration uniting the arts, community, and identity of Karanganyar\u2019s people on one grand stage.' },
          intro: 'Every year, the town squares and village streets of Karanganyar transform into a living stage. The Karanganyar Cultural Festival is a celebration that gathers arts from across the district \u2014 from resonating gamelan music to spinning mask dances \u2014 into one moment affirming that this culture has never stopped beating.',
          history: {
            title: 'A Stage That Unites Across Generations',
            description: 'This festival was born out of the community\u2019s need to preserve arts that once appeared only separately in each hamlet. Today, it has become a meeting space between elderly traditional artists and young art communities eager to learn, perform, and carry forward a heritage that was nearly lost.'
          },
          quote: '\u201cThe festival is not just a spectacle. For us, it is proof that tradition can keep living as long as someone chooses to celebrate it.\u201d',
          facts: {
            title: 'Interesting Facts',
            items: [
              'The festival typically features more than a dozen types of art from various districts in a single series of events',
              'Many art studios use this festival as a platform to regenerate young dancers and artists',
              'Some performances featured are rare art forms nearly extinct, revived especially for the festival',
              'Established as an official annual agenda of the Karanganyar Regency government since 2008'
            ]
          },
          gallery: { alt: 'Festival Budaya Karanganyar' },
          why: {
            title: 'Why Does It Matter?',
            description: 'The Cultural Festival is proof that tradition does not have to die as times change. It can transform into a relevant space of expression for new generations, as long as a community chooses to keep celebrating it together.'
          },
          nav: { prev: '\u2190 Sedekah Bumi', next: 'Traditional Dance \u2192' }
        },
        seni: {
          crumb: 'Living Traditions',
          hero: { title: 'Seni Karawitan Daerah', subtitle: 'From karawitan music resonating through the night to folk theater that brings old stories to life \u2014 Karanganyar\u2019s regional arts appear in countless forms.' },
          intro: 'Karanganyar\u2019s regional arts were never born on a grand stage. They grew out of everyday community life \u2014 from the sound of the kentongan signal drum that opens the morning in a hamlet, karawitan played at weddings and circumcision ceremonies, to reog performances that entertain residents on festival nights. This is an art that has never been separated from the life it inhabits.',
          history: {
            title: 'Karawitan: The Sound That Unites',
            description: 'Karawitan is gamelan music that forms the backbone of Javanese art. In Karanganyar, village karawitan groups still rehearse actively every week, accompanying various traditional ceremonies and wayang performances. Its distinctive sound \u2014 a blend of gender, gong, and saron \u2014 has become an irreplaceable part of everyday life.'
          },
          quote: '\u201cIn karawitan, no one plays alone. Everyone must listen to each other, adjust to each other. That is the philosophy of living together.\u201d',
          facts: {
            title: 'Interesting Facts',
            items: [
              'Karawitan in Karanganyar carries the distinctive Surakarta style that sets it apart from other regions in Java',
              'Many regional art forms here involve entire families across generations within a single performing group'
            ]
          },
          gallery: { alt: 'Regional Karawitan Art Performance' },
          why: {
            title: 'Why Does It Matter?',
            description: 'Playing karawitan teaches discipline, patience, cooperation, and mutual respect, since every player has a role that must stay in harmony with the others.'
          },
          nav: { prev: '\u2190 Traditional Dance', next: 'Hands of Heritage \u2192' }
        },
        tari: {
          crumb: 'Living Traditions',
          hero: { title: 'Tari Tradisional Karanganyar', subtitle: 'Every movement in Karanganyar\u2019s traditional dance holds a language \u2014 of reverence for nature, for kings, and for the Creator.' },
          intro: 'Before words were found, there was movement. Traditional dances in Karanganyar are not merely a spectacle \u2014 they are a body language carrying the stories of ancestors. Every gesture, from the pointed position of the fingers to the direction of the gaze, has been given meaning and passed from one dancer to the next for centuries.',
          history: {
            title: 'Movements Inherited from the Palace',
            description: 'Many traditional dances in Karanganyar grew from the influence of Surakarta palace culture that spread into the surrounding villages. Bedhaya, Srimpi, and various mask dances developed in village studios that strictly preserve the traditional movement patterns, while still leaving room for each community\u2019s local interpretation.'
          },
          quote: '\u201cDancing is not merely movement. Every gesture is a prayer delivered through the body.\u201d',
          facts: {
            title: 'Interesting Facts',
            items: [
              'Most traditional dances in Karanganyar follow movement patterns passed down orally from teacher to student',
              'Dance costumes are usually made from the region\u2019s distinctive batik cloth, uniting two cultural heritages at once',
              'Some dances may only be performed on specific occasions \u2014 traditional ceremonies or the welcoming of honored guests',
              'Local dance studios have now begun opening classes to the public as a way to regenerate young dancers'
            ]
          },
          gallery: { alt: 'Traditional Dance Performance' },
          why: {
            title: 'Why Does It Matter?',
            description: 'Traditional dance is a moving museum. Every dancer devoted to these movements is, in effect, keeping an ancient language alive through their own body. When no one dances anymore, that language goes extinct \u2014 and with it, one way humanity understood itself in relation to nature and the cosmos.'
          },
          nav: { prev: '\u2190 Cultural Festival', next: 'Regional Karawitan Art\u2192' }
        }
      },
      hands: {
        batik: {
          crumb: 'Hands of Heritage',
          hero: {
            title: 'Batik Karanganyar',
            subtitle: 'Every stroke of wax on cloth is a prayer entrusted by the craftsman to its wearer, passed down across generations.'
          },
          intro: 'In the corners of Karanganyar\u2019s villages, the sound of the canting dancing over mori cloth can still be heard every day. Batik centers in this area, such as around Jaten and Colomadu Districts, are home to artisans who have inherited their batik-making skills from their parents and grandparents.',
          history: {
            title: 'Philosophy in Every Motif',
            description: 'Karanganyar batik features distinctive motifs inspired by the natural surroundings of Mount Lawu\u2019s slopes \u2014 tea leaves, temple reliefs, and mountain mist. The making process goes through long stages: nyungging (sketching the pattern), nglowong (drawing the main lines in wax), then nembok and repeated dyeing that can take weeks to finish a single piece of cloth.'
          },
          quote: '\u201cThe canting is more than a tool \u2014 it is an extension of the hand from a heart that soothes the soul.\u201d',
          facts: {
            title: 'Interesting Facts',
            items: [
              'Hand-drawn batik on a single cloth can take 2\u20134 weeks to complete',
              'Distinctive motifs are inspired by Mount Lawu: tea leaves, temple reliefs, and mountain mist',
              'Passed down orally and through direct practice from generation to generation',
              'Some centers now offer batik-making classes for visitors'
            ]
          },
          gallery: { alt: 'The batik-making process', alt2: 'Karanganyar batik motif' },
          why: {
            title: 'Why Does It Matter?',
            description: 'Batik is more than fabric \u2014 it is identity. Keeping Karanganyar\u2019s batik centers alive means preserving the livelihoods of its artisans while safeguarding a visual language that records the philosophy of life on the slopes of Lawu.'
          },
          nav: { prev: '\u2190 Regional Karawitan Art', next: 'Wood Craft \u2192' }
        },
        bambu: {
          crumb: 'Hands of Heritage',
          hero: {
            title: 'Karanganyar Bamboo Craft',
            subtitle: 'From bamboo stalks growing wild on the hillsides, the skilled hands of Karanganyar\u2019s artisans transform them into fine weaves that are both functional and beautiful.'
          },
          intro: 'Bamboo has long been a companion in the life of Karanganyar\u2019s people, long before the phrase \u201ceco-friendly\u201d became a trend. In the shaded yards of homes, bamboo clumps grow faithfully as an endless source of material \u2014 and in the hands of artisans, it becomes woven items that shape daily life: trays, baskets, hampers, and even contemporary furniture and decorative accessories.',
          history: {
            title: 'Weaving That Connects Generations',
            description: 'The technique of bamboo weaving in Karanganyar is learned not from books, but by sitting beside a grandmother or mother whose hands move quickly to form a pattern. Every weaving pattern has a name, a function, and a distinctive way of being made \u2014 practical knowledge that lives in the movement of hands rather than in writing.'
          },
          quote: '\u201cWeaving bamboo is like knitting patience. One small mistake in the pattern, and it must be undone and started again. But that is exactly where its value lies.\u201d',
          facts: {
            title: 'Interesting Facts',
            items: [
              'A single simple bamboo weave can require dozens to hundreds of strips prepared by hand',
              'The bamboo used is usually soaked and treated beforehand to make it more pliable and resistant to mold',
              'Certain weaving patterns are known only to specific artisans and passed down in a very limited way',
              'Karanganyar\u2019s bamboo craft products are beginning to reach export markets for artisanal home decor'
            ]
          },
          gallery: { alt: 'An artisan weaving bamboo', alt2: 'Bamboo craft products' },
          why: {
            title: 'Why Does It Matter?',
            description: 'In an era still dominated by single-use plastic products, bamboo craft is a reminder that local wisdom had already found sustainable solutions long before. Keeping this craft alive means preserving knowledge of a way of living more in harmony with nature.'
          },
          nav: { prev: '\u2190 Wood Craft', next: 'Taste of Karanganyar \u2192' }
        },
        kayu: {
          crumb: 'Hands of Heritage',
          hero: {
            title: 'Karanganyar Wood Craft',
            subtitle: 'In the hands of Karanganyar\u2019s artisans, a piece of wood slowly transforms into a carving that holds weeks of patience in every curve.'
          },
          intro: 'The sound of chisels striking wood echoes from behind the doors of artisans\u2019 homes on the outskirts of Karanganyar every morning. An elderly craftsman sits bent over a still-rough block of wood, his hands moving slowly but surely. He is in no hurry. He has long known that every piece of wood has its own time to become something beautiful.',
          history: {
            title: 'Wood Given a Soul',
            description: 'Wood craft in Karanganyar grew from the community\u2019s need for furniture and household ornaments close to natural materials. Over time, this skill developed into a carving art that blends practical function with aesthetic value and Javanese philosophy \u2014 where every carved flora and fauna motif holds its own meaning for its owner.'
          },
          quote: '\u201cEvery piece of wood has different grain, a different character. This work isn\u2019t about speed, but about listening to the wood before you start carving.\u201d',
          facts: {
            title: 'Interesting Facts',
            items: [
              'The wood used by artisans usually comes from local trees sustainably harvested on the slopes of Lawu',
              'Carving motifs are often inspired by the flora of Mount Lawu \u2014 leaves, flowers, and vines typical of the highlands',
              'Some artisans still use traditional chisels passed down directly from their parents',
              'Some craft centers now offer workshops for students and tourists who want to learn carving'
            ]
          },
          gallery: { alt: 'A Karanganyar wood artisan' },
          why: {
            title: 'Why Does It Matter?',
            description: 'Wood craft is an exercise in patience that cannot be accelerated by machines. Every hand-made carving holds a human trace \u2014 the unevenness that becomes its uniqueness, and philosophical value that cannot be translated into mass production.'
          },
          nav: { prev: '\u2190 Batik Karanganyar', next: 'Bamboo Craft \u2192' }
        }
      },
      taste: {
        timlo: {
          crumb: 'Taste of Karanganyar',
          hero: {
            title: 'Timlo',
            subtitle: 'A warm clear soup with Solo sausage, pindang egg, and shredded chicken \u2014 a flavor that carries a family\u2019s history.'
          },
          intro: 'Timlo is a clear soup dish native to Surakarta that is also deeply tied to daily life in Karanganyar. Its light, savory broth is paired with Solo sausage (a rolled omelet filled with minced meat), pindang egg, chicken giblets, and shredded chicken poured over warm rice.',
          history: {
            title: 'A Dish That Celebrates Simplicity',
            description: 'Unlike many Javanese dishes that are sweet and rich with spices, Timlo stands out with a light, clear broth that is still full of flavor. It is often served at family gatherings as well as for breakfast, making it part of the daily rhythm of life for the people of Karanganyar and its surroundings.'
          },
          quote: '\u201cA bowl of Timlo isn\u2019t just breakfast \u2014 it\u2019s a reminder of mother\u2019s kitchen in the morning.\u201d',
          ingredients: {
            title: 'Interesting Facts',
            items: [
              'The name "Timlo" is believed to come from Chinese-Javanese culinary influence in the Surakarta Residency',
              'Its signature components: Solo sausage, pindang egg, chicken giblets, and shredded chicken',
              'Served with a light, clear broth, unlike most Javanese soups',
              'Widely found in legendary food stalls that have been operating for decades'
            ]
          },
          gallery: { alt: 'A bowl of Timlo' },
          why: {
            title: 'Why Does It Matter?',
            description: 'Timlo is a living trace of cultural blending, served on a plate. Preserving its recipe and way of serving means safeguarding a piece of the cultural encounters that shape Karanganyar\u2019s culinary identity today.'
          },
          nav: { prev: '\u2190 Bamboo Craft', next: 'Jadah \u2192' }
        },
        jadah: {
          crumb: 'Taste of Karanganyar',
          hero: {
            title: 'Jadah',
            subtitle: 'At the hiking posts of Mount Lawu, a piece of jadah with warm sweet tempeh is always a faithful companion on the journey.'
          },
          intro: 'Before sunrise, small stalls on the slopes of Mount Lawu are already preparing jadah for hikers about to begin their long climb to the summit. Made from steamed and pressed glutinous rice, jadah offers an irreplaceable simplicity \u2014 warm, filling, and always a reminder of the cold air and mist on the slopes of Lawu.',
          history: {
            title: 'A Traveler\u2019s Provision from the Ancestors',
            description: 'Jadah is not a new snack. It is a traditional provision long known to the mountain communities of Java, carried to the fields or on long journeys for its dense carbohydrate energy. On the slopes of Lawu, jadah is usually served with sweet bacem tempeh or liquid palm sugar \u2014 a simple yet satisfying blend of sweet and savory.'
          },
          quote: '\u201cJadah is a hiker\u2019s food. Before climbing, eat jadah first. By the time you reach the top, your body stays warm and strong.\u201d',
          ingredients: {
            title: 'Interesting Facts',
            items: [
              'Jadah is made from steamed white glutinous rice, then pounded or pressed until chewy and dense',
              'Usually served warm with bacem tempeh, palm sugar, or seasoned grated coconut',
              'One of the signature snacks sought after by tourists and hikers in the Tawangmangu area',
              'Some jadah sellers on the slopes of Lawu have traded in the same spot for decades'
            ]
          },
          gallery: { alt: 'Jadah, a specialty of Mount Lawu\u2019s slopes' },
          why: {
            title: 'Why Does It Matter?',
            description: 'In its simplicity, jadah holds the life philosophy of mountain communities: that strength doesn\u2019t always come from something complicated or expensive. A piece of carefully pressed glutinous rice is enough to warm the body and accompany a long journey along the slopes of Lawu.'
          },
          nav: { prev: '\u2190 Timlo', next: 'Rabbit Satay \u2192' }
        },
        sate: {
          crumb: 'Taste of Karanganyar',
          hero: {
            title: 'Rabbit Satay',
            subtitle: 'The distinctive aroma of grilled satay always greets anyone passing through Tawangmangu \u2014 and what makes it special is its unusual meat.'
          },
          intro: 'Along the road to Tawangmangu, rows of stalls with glowing charcoal and billowing white smoke are the most iconic sight. Vendors patiently fan skewer after skewer of satay, producing an aroma that\u2019s hard to resist. And when asked what\u2019s inside, the answer is always the same: rabbit \u2014 livestock that thrives especially well in this cool highland.',
          history: {
            title: 'Creativity Born from Local Wisdom',
            description: 'Rabbit farming has long been part of life in the cool, humid Tawangmangu area. Rabbits thrive here thanks to the suitable climate and abundant supply of green feed. From this farming tradition came the creativity of turning rabbit meat into satay \u2014 creating a signature dish that is now part of Tawangmangu\u2019s culinary identity.'
          },
          quote: '\u201cIt started as just an experiment cooking rabbit meat from our own farm. Now it\u2019s the thing people look for most when they come to Tawangmangu.\u201d',
          ingredients: {
            title: 'Interesting Facts',
            items: [
              'Rabbit meat is high in protein with lower fat than chicken or beef',
              'Tawangmangu rabbit satay seasoning uses soy sauce and Javanese spices brushed on before grilling',
              'This dish sells busiest on weekends when tourists visit the Tawangmangu area',
              'Some rabbit satay stalls have been operating for more than 30 years and are a must-visit culinary destination here'
            ]
          },
          gallery: { alt: 'Rabbit satay, a Tawangmangu specialty' },
          why: {
            title: 'Why Does It Matter?',
            description: 'Rabbit satay is proof that a culinary identity can emerge from adaptation and creativity in response to local natural conditions. It didn\u2019t come from a written ancestral recipe, but from experimentation and the courage to try \u2014 and the result is now a source of pride for the people of Tawangmangu.'
          },
          nav: { prev: '\u2190 Jadah', next: 'Traditional Wedang \u2192' }
        },
        wedang: {
          crumb: 'Taste of Karanganyar',
          hero: {
            title: 'Traditional Wedang',
            subtitle: 'In the cold air of Lawu\u2019s slopes, a steaming glass of ginger wedang is always more than just a drink \u2014 it\u2019s a ritual of togetherness.'
          },
          intro: 'In the late afternoon on the slopes of Mount Lawu, as the air begins to bite and mist descends from the peak, small roadside stalls fill with chatter and rising steam from freshly brewed glasses of wedang. Grilled and crushed ginger, fragrant lemongrass, sweet dark palm sugar \u2014 all come together in a warm drink that has become an inseparable part of daily life for the mountain communities of Karanganyar.',
          history: {
            title: 'Spices That Care for Body and Soul',
            description: 'Traditional wedang in Karanganyar grew from the mountain community\u2019s need to stay warm as temperatures drop sharply at night. All the ingredients come from the surrounding nature \u2014 ginger, lemongrass, cinnamon, cloves, and cardamom \u2014 blended in proportions passed down through generations within each family.'
          },
          quote: '\u201cEvery evening my stall fills with people chatting over wedang. It\u2019s not just about the taste, but the togetherness that keeps people coming back.\u201d',
          ingredients: {
            title: 'Interesting Facts',
            items: [
              'Karanganyar ginger wedang usually uses ginger that is grilled first for a stronger, more aromatic flavor',
              'Some stalls hold secret family recipes that have never been written down formally',
              'Besides ginger, variants include wedang uwuh, wedang ronde, and wedang secang, each with its own loyal following',
              'Believed for generations to warm the body, ease colds, and boost the immune system'
            ]
          },
          gallery: { alt: 'Warm spiced wedang', alt2: 'Atmosphere of a wedang stall' },
          why: {
            title: 'Why Does It Matter?',
            description: 'Traditional wedang is a reminder that local wisdom around health and togetherness existed long before the term "wellness" became a trend. Preserving the habit of drinking wedang together means protecting a social space that no screen can replace.'
          },
          nav: { prev: '\u2190 Rabbit Satay', next: 'Nature That Shapes Culture \u2192' }
        }
      },
      nature: {
        lawu: {
          crumb: 'Nature That Shapes Culture',
          hero: {
            title: 'Mount Lawu',
            subtitle: 'A revered mountain, a source of life that shapes the culture and identity of the people.'
          },
          intro: 'Mount Lawu is far more than an inactive volcano standing 3,265 meters above sea level on the border of Central and East Java. For the people of Karanganyar, Lawu is a guardian, a source of water, and a spiritual space. On its slopes stand Candi Sukuh and Candi Cetho, proof of how closely nature and belief have been intertwined since ancient times.',
          history: {
            title: 'A Guardian That Shapes Life',
            description: 'Since ancient times, Mount Lawu has been a source of water and fertility for the land around it. Its cool mountain air has helped shape tea and vegetable farming, while its slopes \u2014 home to Candi Sukuh and Candi Cetho \u2014 make Lawu not just a natural space but also a spiritual one, shaping the daily life and beliefs of the Karanganyar community.'
          },
          quote: '\u201cThe mountain teaches steadfastness; every step toward the peak is a story of courage, patience, and hope.\u201d',
          facts: {
            title: 'Interesting Facts',
            items: [
              'Mount Lawu stands at 3,265 meters above sea level and is a popular spiritual hiking route',
              'The area is home to Candi Sukuh and Candi Cetho on its slopes',
              'The cool mountain air has also shaped the tea and vegetable farming around it'
            ]
          },
          gallery: { alt: 'Grojogan Sewu waterfall', alt2: 'Sky over the Kemuning highlands' },
          why: {
            title: 'Why Does It Matter?',
            description: 'The nature surrounding Mount Lawu is not just scenery, but the foundation that shapes the livelihoods, rituals, and life philosophy of the people of Karanganyar. Preserving it means protecting the roots of all the culture that has grown from it.'
          },
          nav: { prev: '\u2190 Traditional Wedang', next: 'Kemuning Tea Garden \u2192' }
        },
        grojogan: {
          crumb: 'Nature That Shapes Culture',
          hero: {
            title: 'Grojogan Sewu',
            subtitle: 'The roar of water falling from 81 meters can be heard long before Grojogan Sewu comes into view \u2014 and once it does, it\u2019s hard not to stand still for a moment.'
          },
          intro: 'Something happens to everyone the first time they stand in front of Grojogan Sewu. The crash of water falling from 81 meters creates a fine mist that cools the face, its constant roar drowning out every other thought. People stop talking for a moment, just watching. For the people of Tawangmangu, this waterfall isn\u2019t just a tourist spot \u2014 it\u2019s an old neighbor that has become part of their lives.',
          history: {
            title: 'Water That Shaped a Small Civilization',
            description: 'Long before Grojogan Sewu became a tourist destination, the water flowing from this height was already a source of life for the fields in the valley below. Local communities built simple irrigation systems that carried the water to rice paddies and vegetable gardens that fed their families. This waterfall isn\u2019t just scenery \u2014 it\u2019s the backbone of agriculture on the southern slope of Lawu.'
          },
          quote: '\u201cWhen my mind is full, I like sitting near this waterfall. I don\u2019t know why, but just the sound of it is calming.\u201d',
          facts: {
            title: 'Interesting Facts',
            items: [
              'Grojogan Sewu has a waterfall height of around 81 meters, one of the tallest in Central Java',
              'The name "Sewu" means a thousand in Javanese, describing the countless water droplets as it falls',
              'The area around the waterfall is home to wild long-tailed macaques that are very accustomed to human presence',
              'Its water flow is used to irrigate vegetable fields and gardens in the surrounding valleys'
            ]
          },
          gallery: { alt: 'Grojogan Sewu waterfall', alt2: 'The Grojogan Sewu area' },
          why: {
            title: 'Why Does It Matter?',
            description: 'Grojogan Sewu teaches something simple yet often forgotten: nature that is well cared for keeps giving \u2014 clean water, fresh air, fertile soil, and a place for weary souls to rest. Keeping this waterfall clean and preserved means protecting the foundation of life for thousands of people living around it.'
          },
          nav: { prev: '\u2190 Kemuning Tea Garden', next: 'Back to Explore \u2192' }
        },
        kemuning: {
          crumb: 'Nature That Shapes Culture',
          hero: {
            title: 'Kemuning Tea Garden',
            subtitle: 'The green expanse of tea gardens is not just a landscape, but a rhythm of life that guides the daily routine of the local community.'
          },
          intro: 'At an altitude of around 1,200 meters on the western slope of Mount Lawu, the Kemuning Tea Garden stretches out like a soothing green carpet. This area has been a source of livelihood for the local community since colonial times, when the tea plantation was first opened in the region.',
          history: {
            title: 'A Rhythm That Binds Generations',
            description: 'Every morning, tea pickers walk the garden paths following the same rhythm as generations before them. Picking, processing, and brewing tea has become part of the identity of the people of Kemuning \u2014 a life cycle that moves in harmony with the seasons and the morning dew of the mountains.'
          },
          quote: '\u201cTea leaves are picked with patience, just as culture is nurtured from generation to generation.\u201d',
          facts: {
            title: 'Interesting Facts',
            items: [
              'Located at an altitude of around 1,200 meters above sea level on the western slope of Mount Lawu',
              'This tea plantation has been operating since the Dutch colonial era',
              'It is the main source of livelihood for the people of Kemuning Village',
              'It is now also a nature tourism and tea-processing education destination'
            ]
          },
          gallery: { alt: 'Kemuning tea garden', alt2: 'Tea pickers of Kemuning' },
          why: {
            title: 'Why Does It Matter?',
            description: 'The Kemuning Tea Garden is a clear example of how nature can shape a community\u2019s way of life. Preserving this garden means protecting the livelihoods and rhythm of life that have continued across generations.'
          },
          nav: { prev: '\u2190 Mount Lawu', next: 'Grojogan Sewu \u2192' }
        }
      }
    },

    jv: {
      meta: { title: 'LARAS — Nyawang Warisan Urip Karanganyar', description: 'LARAS iku Digital Heritage Experience Platform sing ngajak Panjenengan ngraosaken jiwa budaya Kabupaten Karanganyar.' },
      skipLink: 'Langkung dhateng isi utama',
      langSwitcher: { label: 'Basa', current: 'JW' },
      nav: { about: 'Bab LARAS', journey: 'Jelajah', map: 'Peta', preserve: 'Nglestantunaken', toggle: 'Bikak menu' },
      hero: {
        ariaLabel: 'Gapura mlebet Karanganyar',
        location: 'Kabupaten Karanganyar \u2014 Jawa Tengah',
        line1: 'Panjenengan sampun ngadeg', accent: 'wonten gapuranipun', line2: 'Karanganyar',
        tagline: 'Ing sikil Gunung Lawu, satunggaling tanah nyimpen ambegan panjang sejarah \u2014 ngentosi dipun raosaken, mboten namung dipun waos.',
        cta: 'Mangga Lumebet',
        scrollHintLabel: 'Gulung mandhap kanggo lumebet Karanganyar',
        scrollHint: 'Gulung Alon-alon'
      },
      about: {
        eyebrow: 'Where Heritage Lives',
        titleHtml: 'Ing Tanah Punika, Warisan <em>Boten Nate Kendel Gesang</em>.',
        text: 'Wiwit jaman karaton kina, Karanganyar tuwuh ing antawisipun candi, wana, lan kebon teh \u2014 papan alam, tradisi, saha gesang padintenan nyawiji tanpa wates. Saben pojok nyimpen crita ingkang dereng kathah dipun cariyosaken. Lampah Panjenengan badhe ngirid dhateng panemuan punika, setunggal mbaka setunggal.',
        stat1: 'Margi Jelajah Budaya', stat2: 'Kaca Warisan', stat3: 'Crita ingkang Gesang'
      },
      journey: {
        eyebrow: 'Pilih Margi Panjenengan', title: 'Gangsal Margi Dhateng Jiwa Karanganyar', exploreLabel: 'Jelajah',
        cards: {
          sacred: { desc: 'Candi Sukuh, Candi Cetho, saha Museum Dayu \u2014 lacak filsafat ingkang kaukir ing sela.' },
          living: { desc: 'Sedekah Bumi, festival, saha tari-tarian ingkang taksih dipun rayakaken masyarakat sapunika.' },
          hands: { desc: 'Batik, kerajinan kajeng saha pring \u2014 crita tangan ingkang njagi tradisi.' },
          taste: { desc: 'Timlo, jadah, sate kelinci \u2014 rasa ingkang nyimpen sejarah kulawarga.' },
          nature: { desc: 'Gunung Lawu, Kebon Teh Kemuning, saha Grojogan Sewu \u2014 alam ingkang mbentuk cara gesang warga Karanganyar.' }
        }
      },
      stories: {
        eyebrow: 'Crita Pilihan', title: 'Crita ingkang Pantes Dipun Simak',
        prevLabel: 'Crita sadèrèngipun', nextLabel: 'Crita salajengipun',
        items: {
          sacred: { title: 'Relief ingkang Wisik-wisik', desc: 'Ing lereng Lawu, Candi Sukuh nyimpen piweling moral ingkang dipun turunaken lintas generasi, mboten nate dipun serat ing buku.' },
          hands: { title: 'Ndalu-ndalu Canting', desc: 'Saben goresan malam ing kain batik punika donga ingkang dipun titipaken pengrajin dhateng ingkang ngagem.' },
          living: { title: 'Bumi ingkang Disyukuri', desc: 'Sedekah Bumi mboten namung ritual \u2014 punika cara masyarakat matur nuwun dhateng siti ingkang nggesangi.' },
          nature: { title: 'Ebun ing Kemuning', desc: 'Kebon teh ingkang ijo mboten namung pemandangan, nanging ritme gesang ingkang nuntun padintenanipun warga.' }
        }
      },
      explorer: {
        eyebrow: 'Jelajah Karanganyar', title: 'The Living Map of Karanganyar',
        desc: 'Saben destinasi punika gapura dhateng sejarah, budaya, saha alam ingkang ngentosi dipun jelajahi.',
        pill1: '17 Destinasi Warisan', pill2: '5 Margi Jelajah', pill3: 'Pengalaman Interaktif',
        filtersAriaLabel: 'Filter destinasi miturut kategori',
        filters: { all: 'Sedaya', temple: 'Candi', nature: 'Alam', museum: 'Museum', culture: 'Budaya', teaPlantation: 'Kebon Teh', waterfall: 'Grojogan' },
        emptyState: 'Pilih salah satunggaling marker ing peta kanggo miwiti jelajah.',
        exploreStory: 'Jelajah Critanipun', openMaps: 'Bikak Google Maps',
        mapAriaLabel: 'Peta interaktif wilayah Kabupaten Karanganyar'
      },
      preserve: {
        eyebrow: 'Sesarengan Njagi',
        titleHtml: 'Warisan mboten namung ingkang kita tampi,<br>nanging ingkang kita pilih kanggo dipun jagi.',
        text: 'Saben rawuh, saben crita ingkang dipun bagi, saha saben apresiasi dhateng budaya lokal punika lampah alit kanggo njagi warisan punika tetep gesang kanggo generasi salajengipun.',
        cta: 'Miwiti Jelajah'
      },
      footer: { tagline: 'Nyawang Warisan Urip Karanganyar', credit: 'Dipun damel kanggo BYTESFEST 2026 \u2014 CultureVerse: Preserving Heritage Through Design' },
      aboutPage: {
        hero: {
          crumb: 'Bab',
          title: 'Bab Laras',
          subtitle: 'Laras punika Digital Heritage Experience Platform \u2014 papan kanggo ngraosaken, mboten namung maos, jiwa budaya Kabupaten Karanganyar.'
        },
        philosophy: {
          eyebrow: 'Filosofi Kita',
          text: 'Budaya sanes namung barang ingkang dipun simpen ing museum. Budaya punika gesang, tansah ngrembaka sesarengan masyarakat, saha kedah dipun tepangaken malih dhateng generasi enom lumantar teknologi digital. Pramila, Laras ngewahi pengalaman ngraos-tepangi budaya dados lampah digital.'
        },
        meaning: {
          eyebrow: 'Teges Nama',
          title: 'Laras Tegesipun Harmoni',
          text: 'Ing budaya Jawi, "Laras" tegesipun keselarasan \u2014 harmoni antawisipun sejarah, budaya, manungsa, alam, tradisi, saha mangsa ngajeng. Laras sanes media informasi, sanes portal pamarentah, saha sanes website wisata. Laras punika papan kanggo ngraosaken lampah budaya Karanganyar lumantar pengalaman digital ingkang modern.'
        },
        purpose: {
          eyebrow: 'Ancas Kita',
          title: 'Kenging Punapa Laras Wonten',
          cards: {
            introduce: { title: 'Ngenalaken Budaya', desc: 'Ngenalaken kasugihan budaya Kabupaten Karanganyar dhateng generasi sapunika kanthi cara modern saha mendalem.' },
            education: { title: 'Edukasi Digital', desc: 'Dados media edukasi ingkang ndhukung pelestarian budaya jumbuh kaliyan SDG 11: Kitha saha Padunungan Berkelanjutan.' },
            connect: { title: 'Nyambungaken Generasi', desc: 'Nyambungaken budaya tradisional kaliyan generasi digital supados raos bangga dhateng budaya lokal tansah tuwuh.' }
          }
        },
        audience: {
          title: 'Katujokaken kanggo Saben Pecinta Budaya',
          text: 'Laras dipun rancang kanggo Generasi Z, siswa, mahasiswa, wisatawan, masyarakat umum, ngantos sinten kemawon ingkang tresna budaya Indonesia \u2014 sinten kemawon ingkang badhe ngraosaken, mboten namung maos, kasugihan budaya Karanganyar.'
        },
        competition: {
          title: 'CultureVerse: Preserving Heritage Through Design',
          text: 'Laras dipun rancang minangka karya kanggo kompetisi BYTESFEST 2026 kanthi subtema CultureVerse, nggabungaken storytelling, desain modern, saha teknologi web statis kanggo mbuktekaken bilih teknologi saged dados media efektif kanggo nglestantunaken warisan budaya.'
        },
        cta: {
          eyebrow: 'Wiwit Sapunika',
          quoteHtml: '"Every Heritage Lives Because<br>Someone Chooses to Preserve It."',
          button: 'Wiwiti Jelajah'
        },
        footer: {
          credit: 'CultureVerse: Preserving Heritage Through Design',
          backHome: 'Wangsul dhateng Beranda'
        }
      },
      sacred: {
        sukuh: {
          crumb: 'Sacred Heritage',
          hero: {
            title: 'Candi Sukuh',
            subtitle: 'Candi filsafat ing lereng Gunung Lawu ingkang nyimpen piweling moral lintas generasi ing saben reliefipun.'
          },
          intro: 'Candi Sukuh ngadeg megah ing sikil Gunung Lawu, ing inggilipun watawis 910 meter saking permukaan segara. Beda kaliyan candi-candi Hindu sanesipun ing Jawi, Candi Sukuh nggadhahi arsitektur ingkang unik \u2014 wangunipun kados piramida kanthi undhak-undhakan ingkang inggil, m\u00e8mper struktur jaman pra-kolonial Amerika.',
          philosophy: {
            title: 'Filsafat ingkang Kaukir ing Sela',
            text: 'Saben relief ing Candi Sukuh sanes namung rerenggan. Punika buku visual ingkang nyariosaken siklus gesang, wiwit lair ngantos pejah, bab kesucen, saha bab gegayutanipun manungsa kaliyan jagad raya. Relief Lingga-Yoni ingkang misuwur, tuladhanipun, sanes namung simbol kesuburan, nanging ugi representasi saking imbanging energi ing gesang.'
          },
          quote: '\u201cIng saben sela Candi Sukuh, wonten wisik leluhur ingkang ngentosi dipun mireng.\u201d',
          facts: {
            title: 'Fakta Narik Kawigatosan',
            items: [
              'Dipun bangun ing pungkasaning abad kaping-15, jaman transisi saking Karaton Majapahit',
              'Arsitekturipun unik saha mboten dipun panggihaken ing candi sanes ing Indonesia',
              'Reliefipun nggambaraken adegan saking wayang saha mitologi Jawi',
              'Manggen ing Desa Karang, Kecamatan Ngargoyoso'
            ]
          },
          gallery: { alt: 'Candi Sukuh' },
          why: {
            title: 'Kenging Punapa Wigati?',
            text: 'Candi Sukuh punika bukti bilih masyarakat Jawi kina sampun mangertos sacara mendalem babagan filsafat, seni, saha arsitektur. Anenipun ng\u00e8ngetaken kita bilih warisan budaya sanes namung babagan bangunan sepuh, nanging babagan kawicaksanan ingkang katanem ing saben sela.'
          },
          nav: { backToExplore: '\u2190 Wangsul dhateng Jelajah', next: 'Candi Cetho \u2192' }
        }
      },
      cetho: {
        crumb: 'Sacred Heritage',
        hero: {
          title: 'Candi Cetho',
          subtitle: 'Candi undhak-undhakan ingkang madhep surya mlethek, pusat ritual spiritual ing lereng Gunung Lawu.'
        },
        history: {
          description: 'Candi Cetho manggen ing inggilipun watawis 1.400 meter saking permukaan segara, ndadosaken punika salah setunggaling candi paling inggil ing Indonesia. Dipun bangun ing pungkasaning jaman Karaton Majapahit, candi punika nggadhahi arsitektur undhak-undhakan ingkang madhep mangetan \u2014 simbol pakurmatan dhateng surya minangka sumber gesang.'
        },
        architecture: {
          title: 'Arsitektur ingkang Kebak Simbol',
          description: 'Candi Cetho nggadhahi taras-taras undhak-undhakan ingkang m\u00e8mper piramida. Ing saben tataran, wonten relief saha reca ingkang saben-saben nggadhahi teges spiritual. Undhak-undhakan dhateng pucaking candi nglambangaken lampah spiritual manungsa dhateng kesucen.'
        },
        quote: '\u201cSaben undhakan Candi Cetho punika lampah dhateng pangertosan dhiri ingkang langkung lebet.\u201d',
        facts: {
          title: 'Fakta Narik Kawigatosan',
          items: [
            'Manggen ing inggilipun 1.400 mdpl, langkung inggil tinimbang Candi Sukuh',
            'Nggadhahi 13 tataran teras ingkang nglambangaken 13 tahapan kesucen',
            'Madhep mangetan, simbol pakurmatan dhateng surya',
            'Taksih dipun ginakaken kanggo ritual agami ngantos sapunika'
          ]
        },
        nav: { prev: '\u2190 Candi Sukuh', next: 'Museum Dayu \u2192' }
      },
      museum: {
        crumb: 'Sacred Heritage',
        hero: {
          title: 'Museum Dayu',
          subtitle: 'Papan nyimpen artefak saha lacak sejarah masyarakat Karanganyar, saking jaman kina ngantos jaman karaton.'
        },
        history: {
          description: 'Mboten tebih saking kompleks Candi Sukuh, Museum Dayu nyimpen koleksi artefak ingkang dados seksi panjanging lampah peradaban ing lereng Gunung Lawu \u2014 wiwit tilas jaman megalitikum, jaman Hindu-Buddha, ngantos barang-barang budaya masyarakat agraris setempat.'
        },
        collection: {
          title: 'Cendhela Dhateng Jaman Rumiyin',
          description: 'Ing salebeting museum, para tamu saged nyemak replika reca, prasasti, ngantos pirantos tetan\u00e8n kina ingkang dipun ginakaken masyarakat Karanganyar pinten-pinten abad kepengker. Saben koleksi katata kanggo mbiyantu tamu mangertos konteks sejarah Candi Sukuh saha Candi Cetho kanthi langkung utuh.'
        },
        quote: '\u201cMuseum sanes papan nyimpen jaman rumiyin, nanging papan kanggo tetep mirengaken.\u201d',
        facts: {
          title: 'Fakta Narik Kawigatosan',
          items: [
            'Manggen cedhak kompleks Candi Sukuh ing Kecamatan Ngargoyoso',
            'Nyimpen koleksi saking jaman megalitikum ngantos jaman Hindu-Buddha',
            'Dados pusat edukasi sejarah kanggo siswa saha peneliti',
            'Asring dados titik wiwitan saderengipun jelajah kawasan candi ing lereng Lawu'
          ]
        },
        why: {
          title: 'Kenging Punapa Wigati?',
          description: 'Museum Dayu nyambungaken pangertosan tamu dhateng konteks sejarah wonten wingkinging candi-candi suci ing Karanganyar, ndadosaken rawuh dhateng kawasan punika langkung migunani saha utuh.'
        },
        nav: { prev: '\u2190 Candi Cetho', next: 'Living Traditions \u2192' }
      },
      living: {
        sedekah: {
          crumb: 'Living Traditions',
          hero: { title: 'Sedekah Bumi', subtitle: 'Ritual syukuran asil bumi ingkang taksih dipun rayakaken masyarakat Karanganyar minangka ungkapan matur nuwun dhateng siti ingkang nggesangi.' },
          intro: 'Saben taun, nalika mangsa panen dugi, desa-desa ing Karanganyar ngawontenaken Sedekah Bumi \u2014 tradisi turun-tumurun ingkang ngrayakaken kelimpahan asil bumi saha ngaturaken raos syukur. Warga kempal mbekta asil tetanèn, gunungan tumpeng, saha sesaji warna-warni kanggo dipun arak dhateng balai desa utawi punden setempat.',
          history: {
            title: 'Langkung saking Ritual Kemawon',
            description: 'Sedekah Bumi sanes namung seremoni kagamen, nanging ugi papan sosial ingkang ngraketaken kebersamaan warga. Gotong royong ing anggenipun nyawisaken acara, donga sesarengan, ngantos pagelaran seni tradisional kadosta tari tayub saha wayang kulit ndadosaken tradisi punika perayaan identitas kolektif masyarakat agraris Karanganyar.'
          },
          quote: '\u201cBumi maringi tanpa dipun suwun, mila sampun sakmestinipun kita matur nuwun tanpa dipun suwun ugi.\u201d',
          facts: {
            title: 'Fakta Narik Kawigatosan',
            items: [
              'Dipun wontenaken saben taun sasampunipun mangsa panen ageng, limrahipun ing wulan Sura (kalender Jawi)',
              'Gunungan asil bumi dipun arak ngubengi desa saderengipun dipun bagi dhateng warga',
              'Dipun iringi pagelaran seni tradisional kadosta tayub, reog, saha wayang kulit',
              'Taksih aktif dipun rayakaken ing pinten-pinten desa ing Karanganyar ngantos sapunika'
            ]
          },
          gallery: { alt: 'Sedekah Bumi' },
          why: {
            title: 'Kenging Punapa Wigati?',
            description: 'Ing tengah modernisasi, Sedekah Bumi dados pepenget bilih gegayutanipun manungsa kaliyan alam kedah dipun jagi kanthi raos pakurmatan. Tradisi punika mucal generasi enom supados mboten kesupen akar agraris saha nilai gotong royong ingkang mbentuk karakter masyarakat Karanganyar.'
          },
          nav: { prev: '\u2190 Museum Dayu', next: 'Festival Budaya \u2192' }
        },
        festival: {
          crumb: 'Living Traditions',
          hero: { title: 'Festival Budaya Karanganyar', subtitle: 'Perayaan taunan ingkang nyawijikaken kesenian, komunitas, saha identitas masyarakat Karanganyar ing setunggal panggung ageng.' },
          intro: 'Saben taun, alun-alun saha margi-margi desa ing Karanganyar ewah dados panggung ingkang gesang. Festival Budaya Karanganyar punika perayaan ingkang ngempalaken kesenian saking pinten-pinten kecamatan \u2014 wiwit gamelan ingkang muni ngantos tari topeng ingkang mubeng \u2014 dados setunggal wekdal ingkang negesaken bilih budaya punika dereng nate kèndel gesang.',
          history: {
            title: 'Panggung ingkang Nyawijikaken Lintas Generasi',
            description: 'Festival punika miyos saking betahing masyarakat kanggo ngrimat kesenian ingkang rumiyin namung katonaken piyambak-piyambak ing saben dhusun. Sapunika, punika dados papan pepanggihan antawisipun seniman tradisional ingkang sepuh saha komunitas seni enom ingkang badhe sinau, tampil, saha nglajengaken warisan ingkang meh pedhot.'
          },
          quote: '\u201cFestival sanes namung tontonan. Kangge kita, punika bukti bilih tradisi saged tetep gesang salaminipun wonten ingkang purun ngrayakaken.\u201d',
          facts: {
            title: 'Fakta Narik Kawigatosan',
            items: [
              'Festival limrahipun ngaturaken langkung saking sedasa jinis kesenian saking pinten-pinten kecamatan ing setunggal rangkaian acara',
              'Kathah sanggar seni ndadosaken festival punika ajang regenerasi penari saha seniman enom',
              'Sawetawis pagelaran ingkang katonaken minangka kesenian langka ingkang meh punah saha dipun gesangaken malih khusus kanggo festival',
              'Dipun dadosaken agenda resmi taunan pamarentah Kabupaten Karanganyar wiwit 2008'
            ]
          },
          gallery: { alt: 'Festival Budaya Karanganyar' },
          why: {
            title: 'Kenging Punapa Wigati?',
            description: 'Festival Budaya punika bukti bilih tradisi mboten kedah pejah nalika jaman ewah. Punika saged brojol dados papan ekspresi ingkang relevan kagem generasi enggal, salaminipun wonten komunitas ingkang milih tetep ngrayakaken sesarengan.'
          },
          nav: { prev: '\u2190 Sedekah Bumi', next: 'Tari Tradisional \u2192' }
        },
        seni: {
          crumb: 'Living Traditions',
          hero: { title: 'Seni Karawitan Daerah', subtitle: 'Saking karawitan ingkang muni ing wanci ndalu ngantos teater rakyat ingkang nggesangaken crita-crita lami \u2014 seni daerah Karanganyar wonten ing kathah wujud.' },
          intro: 'Seni daerah Karanganyar mboten nate miyos saking panggung ingkang megah. Punika tuwuh saking gesang padintenan masyarakat \u2014 saking swanten kentongan ingkang miwiti enjing ing dhusun, karawitan ingkang dipun tabuh ing acara mantenan saha sunatan, ngantos pagelaran reog ingkang nglipur warga ing dalu festival. Punika seni ingkang mboten nate pisah saking gesang ingkang dipun lampahi.',
          history: {
            title: 'Karawitan: Swanten ingkang Nyawijikaken',
            description: 'Karawitan punika musik gamelan ingkang dados balung punggung kesenian Jawi. Ing Karanganyar, kelompok-kelompok karawitan desa taksih aktif gladhen saben minggu, ngiringi pinten-pinten upacara adat saha pagelaran wayang. Swantenipun ingkang khas \u2014 pepaduan antawisipun gender, gong, saha saron \u2014 dados latar padintenan ingkang mboten kenging dipun gantos.'
          },
          quote: '\u201cIng karawitan, mboten wonten ingkang main piyambak. Sedaya kedah sami mirengaken, sami nyesuaikaken. Punika filsafat gesang sesarengan.\u201d',
          facts: {
            title: 'Fakta Narik Kawigatosan',
            items: [
              'Karawitan ing Karanganyar nggadhahi ciri khas gaya Surakarta ingkang mbedakaken saking wilayah sanes ing Jawi',
              'Kathah kesenian daerah ing ngriki nglibataken sedaya kulawarga lintas generasi ing setunggal kelompok penampil'
            ]
          },
          gallery: { alt: 'Pagelaran Seni Karawitan Daerah' },
          why: {
            title: 'Kenging Punapa Wigati?',
            description: 'Main karawitan mucal disiplin, sabar, kerja sama, saha sami ngajeni amargi saben pemain nggadhahi peran ingkang kedah selaras.'
          },
          nav: { prev: '\u2190 Tari Tradisional', next: 'Hands of Heritage \u2192' }
        },
        tari: {
          crumb: 'Living Traditions',
          hero: { title: 'Tari Tradisional Karanganyar', subtitle: 'Saben polatan ing tari tradisional Karanganyar nyimpen basa \u2014 bab pakurmatan dhateng alam, ratu, saha Gusti Ingkang Damel.' },
          intro: 'Saderengipun tembung dipun panggihaken, wonten polatan. Tari-tarian tradisional ing Karanganyar sanes namung tontonan \u2014 punika basa badan ingkang nyimpen crita-crita leluhur. Saben polatan, wiwit posisi driji ingkang lancip ngantos arah pandeng mripat, sampun dipun tegesi saha katurunaken saking setunggal penari dhateng penari salajengipun sajroning abad-abad.',
          history: {
            title: 'Polatan ingkang Katurunaken saking Karaton',
            description: 'Kathah tari tradisional ing Karanganyar tuwuh saking pangaribawa budaya karaton Surakarta ingkang mrembet dhateng wilayah padesan sakiwa-tengenipun. Tari Bedhaya, Srimpi, ngantos pinten-pinten tari topeng ngrembaka ing sanggar-sanggar desa ingkang njagi pakem polatanipun kanthi ketat, sinambi tetep maringi papan kagem interpretasi lokal saben komunitas.'
          },
          quote: '\u201cNari sanes namung obah. Saben polatan punika donga ingkang dipun aturaken lumantar badan.\u201d',
          facts: {
            title: 'Fakta Narik Kawigatosan',
            items: [
              'Kathah tari tradisional Karanganyar nggadhahi pakem polatan ingkang katurunaken sacara lisan saking guru dhateng murid',
              'Kostum tari limrahipun kadamel saking kain batik khas daerah, nyawijikaken kalih warisan budaya sekaligus',
              'Sawetawis tarian namung kenging dipun tontonaken ing wekdal tartamtu \u2014 upacara adat utawi panyambutan tamu kinurmatan',
              'Sanggar-sanggar tari lokal sapunika wiwit mbikak kelas kagem umum minangka cara regenerasi penari enom'
            ]
          },
          gallery: { alt: 'Pagelaran Tari Tradisional' },
          why: {
            title: 'Kenging Punapa Wigati?',
            description: 'Tari tradisional punika museum ingkang gesang. Saben penari ingkang temen ing polatan punika sejatosipun nembe njagi basa kina tetep gesang lumantar badanipun piyambak. Nalika mboten wonten malih ingkang nari, basa punika pedhot \u2014 saha sesarengan punika ical ugi setunggal cara manungsa mangertos dhirinipun ing gegayutanipun kaliyan alam saha jagad.'
          },
          nav: { prev: '\u2190 Festival Budaya', next: 'Seni Karawitan\u2192' }
        }
      },
      hands: {
        batik: {
          crumb: 'Hands of Heritage',
          hero: {
            title: 'Batik Karanganyar',
            subtitle: 'Saben goresan malam ing kain punika donga ingkang dipun titipaken pengrajin dhateng ingkang ngagem, katurunaken lintas generasi.'
          },
          intro: 'Ing pojok-pojok kampung Karanganyar, swanten canting ingkang nari ing kain mori taksih kepireng saben dinten. Sentra batik ing wilayah punika, kadosta ing sakiwa-tengenipun Kecamatan Jaten saha Colomadu, dados griya kagem para pengrajin ingkang sampun nampi katrampilan mbatik saking tiyang sepuh saha simbah-simbahipun.',
          history: {
            title: 'Filsafat ing Saben Motif',
            description: 'Batik Karanganyar nggadhahi motif khas ingkang kailhami saking alam lereng Gunung Lawu \u2014 ron teh, relief candi, ngantos kabut pegunungan. Proses damelipun lumantar tataran ingkang panjang: nyungging (damel pola), nglowong (nyanting garis utama), ngantos nembok saha pewarnaan ingkang wongsal-wangsul saged mbetahaken pinten-pinten minggu kanggo setunggal lembar kain.'
          },
          quote: '\u201cCanting sanes namung pirantos, punika sambungan tangan saking manah ingkang nentremaken jiwa.\u201d',
          facts: {
            title: 'Fakta Narik Kawigatosan',
            items: [
              'Proses mbatik tulis setunggal kain saged mbetahaken wekdal 2-4 minggu',
              'Motif khas kailhami alam Lawu: ron teh, relief candi, saha kabut gunung',
              'Katurunaken sacara lisan saha praktik langsung saking generasi dhateng generasi',
              'Sawetawis sentra sapunika mbikak kelas mbatik kagem wisatawan'
            ]
          },
          gallery: { alt: 'Proses mbatik', alt2: 'Motif batik Karanganyar' },
          why: {
            title: 'Kenging Punapa Wigati?',
            description: 'Batik sanes namung kain, nanging identitas. Njagi sentra batik Karanganyar tetep gesang tegesipun njagi panggesangan pengrajin sekaligus nglestantunaken basa visual ingkang nyimpen filsafat gesang masyarakat lereng Lawu.'
          },
          nav: { prev: '\u2190 Seni Karawitan', next: 'Kerajinan Kajeng \u2192' }
        },
        bambu: {
          crumb: 'Hands of Heritage',
          hero: {
            title: 'Kerajinan Pring Karanganyar',
            subtitle: 'Saking pring ingkang tuwuh wonten ing lereng gunung, tangan-tangan trampil pengrajin Karanganyar ngewahi dados anyaman alus ingkang fungsional sekaligus asri.'
          },
          intro: 'Pring sampun dangu dados mitra gesang masyarakat Karanganyar, tebih saderengipun tembung \u201cramah lingkungan\u201d dados tren. Ing plataran griya ingkang ayom, rumpun pring tuwuh setya dados sumber bahan ingkang mboten nate telas \u2014 saha ing tangan para pengrajin, punika ewah dados anyaman ingkang mbentuk gesang padintenan: tampah, besek, bakul, ngantos furnitur saha aksesori dekoratif kontemporer.',
          history: {
            title: 'Anyaman ingkang Nyambungaken Generasi',
            description: 'Teknik nganyam pring ing Karanganyar dipun sinaoni sanes saking buku, nanging saking lenggah ing sisih simbah utawi biyung ingkang tanganipun gerak gancang mbentuk pola. Saben pola anyaman nggadhahi nama, nggadhahi fungsinipun, saha nggadhahi cara damel ingkang khas \u2014 kawruh praktis ingkang gesang ing gerakan tangan, sanes ing seratan.'
          },
          quote: '\u201cNganyam pring punika kados ngrajut sabar. Lepat sekedhik pola, kedah dipun bongkar malih saking wiwitan. Nanging pancen ing ngriku regenipun.\u201d',
          facts: {
            title: 'Fakta Narik Kawigatosan',
            items: [
              'Setunggal anyaman pring prasaja saged mbetahaken puluhan ngantos atusan wilah ingkang kasiapaken kanthi manual',
              'Pring ingkang dipun ginakaken limrahipun karendhem saha diolah rumiyin supados langkung lentur saha tahan jamur',
              'Pola anyaman tartamtu namung dipun mangertosi dening pengrajin tartamtu saha katurunaken kanthi sanget winates',
              'Produk kerajinan pring Karanganyar wiwit ngrambah pasar ekspor kagem segmen dekorasi griya artisanal'
            ]
          },
          gallery: { alt: 'Pengrajin nganyam pring', alt2: 'Produk kerajinan pring' },
          why: {
            title: 'Kenging Punapa Wigati?',
            description: 'Ing jaman nalika produk plastik sepisan ginakaken taksih mendominasi, kerajinan pring punika pepenget bilih kearifan lokal sampun langkung rumiyin manggihaken solusi ingkang berkelanjutan. Njagi kerajinan punika tetep gesang tegesipun njagi kawruh bab cara gesang ingkang langkung selaras kaliyan alam.'
          },
          nav: { prev: '\u2190 Kerajinan Kajeng', next: 'Taste of Karanganyar \u2192' }
        },
        kayu: {
          crumb: 'Hands of Heritage',
          hero: {
            title: 'Kerajinan Kajeng Karanganyar',
            subtitle: 'Ing tangan pengrajin Karanganyar, sapotong kajeng alon-alon ewah dados tatahan ingkang nyimpen pinten-pinten minggu kesabaran ing saben lengkung-lengkungipun.'
          },
          intro: 'Swanten tatah ingkang kaadu kaliyan kajeng kepireng saking wingking lawang griya-griya pengrajin ing pinggiran Karanganyar saben enjing. Setunggal pengrajin sepuh lenggah mbungkuk ngadhepi glondhong kajeng ingkang taksih kasar, tanganipun gerak alon nanging mesthi. Piyambakipun mboten kesesa. Piyambakipun sampun dangu mangertos bilih saben kajeng nggadhahi wekdalipun piyambak kagem dados satunggaling ingkang endah.',
          history: {
            title: 'Kajeng ingkang Kaparingan Jiwa',
            description: 'Kerajinan kajeng ing Karanganyar tuwuh saking kabetahan masyarakat badhe piranti saha ornamen griya ingkang celak kaliyan bahan alam sakiwa-tengenipun. Sasampunipun wekdal, katrampilan punika tuwuh dados seni tatah ingkang nyawijikaken fungsi praktis kaliyan pambiji estetika saha filsafat Jawi \u2014 ing pundi saben motif flora saha fauna ingkang katatah nggadhahi teges piyambak kagem ingkang gadhah.'
          },
          quote: '\u201cSaben kajeng punika beda seratipun, beda karakteripun. Padamelan punika sanes bab cepet-cepetan, nanging bab mirengaken kajengipun rumiyin saderengipun wiwit natah.\u201d',
          facts: {
            title: 'Fakta Narik Kawigatosan',
            items: [
              'Kajeng ingkang dipun ginakaken pengrajin limrahipun asalipun saking wit lokal ingkang dipun panen kanthi berkelanjutan ing lereng Lawu',
              'Motif tatahan asring kailhami saking flora pegunungan Lawu \u2014 ron, kembang, saha sulur-sulur khas dataran inggil',
              'Sawetawis pengrajin taksih ngginakaken piranti tatah tradisional ingkang katurunaken langsung saking tiyang sepuhipun',
              'Sawetawis sentra kerajinan sapunika mbikak workshop kagem siswa saha wisatawan ingkang badhe sinau natah'
            ]
          },
          gallery: { alt: 'Pengrajin Kajeng Karanganyar' },
          why: {
            title: 'Kenging Punapa Wigati?',
            description: 'Kerajinan kajeng punika laten kesabaran ingkang mboten saged dipun percepet dening mesin. Saben tatahan ingkang dipun damel kanthi manual nyimpen tapak manungsa \u2014 katidaksaman ingkang malah dados kaunikanipun, saha pambiji filosofis ingkang mboten saged katerjemahaken dhateng produksi masal.'
          },
          nav: { prev: '\u2190 Batik Karanganyar', next: 'Kerajinan Pring \u2192' }
        }
      },
      taste: {
        timlo: {
          crumb: 'Taste of Karanganyar',
          hero: {
            title: 'Timlo',
            subtitle: 'Sup bening anget isi sosis Solo, tigan pindang, saha suwiran ayam \u2014 raos ingkang nyimpen sejarah kulawarga.'
          },
          intro: 'Timlo punika panganan sup bening khas Surakarta ingkang ugi celak kaliyan padintenan masyarakat Karanganyar. Kuahipun ingkang gurih saha entheng dipun campur kaliyan sosis Solo (tigan dadar gulung isi daging cincang), tigan pindang, ati ampela, saha suwiran ayam ingkang dipun siram wonten ing sekul anget.',
          history: {
            title: 'Panganan ingkang Ngrayakaken Kesederhanaan',
            description: 'Beda kaliyan kathah masakan Jawi ingkang legi saha kandel rempah, Timlo malah tampil kaliyan kuah bening ingkang entheng nanging sugih raos. Panganan punika asring dipun aturaken ing acara kulawarga utawi minangka menu sarapan, ndadosaken bagian saking ritme padintenan warga Karanganyar saha sakiwa-tengenipun.'
          },
          quote: '\u201cSemangkuk Timlo sanes namung sarapan, nanging pepenget dhateng pawon ibu ing wanci enjing.\u201d',
          ingredients: {
            title: 'Fakta Narik Kawigatosan',
            items: [
              'Nama "Timlo" dipun kinten asalipun saking pengaruh kuliner Tionghoa-Jawi ing Karesidenan Surakarta',
              'Komponen khasipun: sosis Solo, tigan pindang, ati ampela, saha suwiran ayam',
              'Dipun aturaken kaliyan kuah bening ingkang entheng, beda saking sup Jawi limrahipun',
              'Kathah dipun panggihaken ing warung-warung legendaris ingkang sampun ngadeg puluhan taun'
            ]
          },
          gallery: { alt: 'Semangkuk Timlo' },
          why: {
            title: 'Kenging Punapa Wigati?',
            description: 'Timlo punika tapak akulturasi budaya ingkang gesang wonten ing piring. Nglestantunaken resep saha cara ngaturaken tegesipun njagi cuwilan sejarah pepanggihan budaya ingkang mbentuk identitas kuliner Karanganyar ing dinten punika.'
          },
          nav: { prev: '\u2190 Kerajinan Pring', next: 'Jadah \u2192' }
        },
        jadah: {
          crumb: 'Taste of Karanganyar',
          hero: {
            title: 'Jadah',
            subtitle: 'Ing pos-pos pendakian Gunung Lawu, sairis jadah kaliyan tempe bacem anget tansah dados kanca setya lelampahan.'
          },
          intro: 'Sadereng surya mlethek, warung-warung alit ing lereng Gunung Lawu sampun nyawisaken jadah kagem para pendaki ingkang badhe miwiti lelampahan panjang dhateng pucak. Kadamel saking ketan ingkang dipun kukus lajeng dipun padetaken, jadah gesang wonten ing kesederhanaanipun ingkang mboten saged dipun gantos \u2014 anget, ngeyengaken, saha tansah ngengetaken sinten kemawon ingkang nedha dhateng hawa adhem saha kabut lereng Lawu.',
          history: {
            title: 'Sangu Kekiyatan saking Leluhur',
            description: 'Jadah sanes camilan enggal. Punika sangu tradisional ingkang sampun dangu dipun mangertosi masyarakat pegunungan Jawi, dipun bekta dhateng sabin utawi lelampahan panjang amargi kandhutan energi karbohidratipun ingkang kandel. Ing lereng Lawu, jadah limrahipun dipun aturaken sesarengan tempe bacem legi utawi gendhis abrit cair \u2014 gabungan raos legi saha gurih ingkang prasaja nanging marem.'
          },
          quote: '\u201cJadah punika panganan pendaki. Sadereng minggah, nedha jadah rumiyin. Dumugi inggil, badan tetep anget saha kiyat.\u201d',
          ingredients: {
            title: 'Fakta Narik Kawigatosan',
            items: [
              'Jadah kadamel saking ketan pethak ingkang dipun kukus, lajeng dipun gepuk utawi dipun padetaken ngantos teksturipun kenyal saha padet',
              'Limrahipun dipun aturaken anget sesarengan tempe bacem, gendhis abrit, utawi klapa parut bumbon',
              'Dados salah setunggaling camilan khas ingkang dipun padosi wisatawan saha pendaki ing kawasan Tawangmangu',
              'Sawetawis bakul jadah ing lereng Lawu sampun dodolan ing papan ingkang sami sajeng puluhan taun'
            ]
          },
          gallery: { alt: 'Jadah khas lereng Gunung Lawu' },
          why: {
            title: 'Kenging Punapa Wigati?',
            description: 'Ing kesederhanaanipun, jadah nyimpen filsafat gesang masyarakat pegunungan: bilih kekiyatan mboten tansah dhateng saking satunggaling ingkang ruwet utawi awis. Sairis ketan ingkang dipun padetaken kanthi permati sampun cekap kagem ngangetaken badan saha ngancani lelampahan panjang ngurutaken lereng Lawu.'
          },
          nav: { prev: '\u2190 Timlo', next: 'Sate Kelinci \u2192' }
        },
        sate: {
          crumb: 'Taste of Karanganyar',
          hero: {
            title: 'Sate Kelinci',
            subtitle: 'Ambet obongan sate ingkang khas tansah nyambut sinten kemawon ingkang mampir ing Tawangmangu \u2014 saha ingkang ndadosaken istimewa inggih menika dagingipun ingkang mboten limrah.'
          },
          intro: 'Sadangunipun margi dhateng Tawangmangu, jejeran warung kaliyan areng mengangah saha kebul pethak ingkang ngelun inggih menika pemandangan ingkang paling khas. Para bakul ngipasi tusukan sate satunggal-setunggal kanthi sabar, ngasilaken ambet ingkang angel dipun tolak. Saha nalika dipun taken menapa isinipun, wangsulanipun tansah sami: kelinci \u2014 kewan ternak ingkang malah tuwuh subur ing dataran inggil ingkang seger punika.',
          history: {
            title: 'Kreativitas ingkang Miyos saking Kearifan Lokal',
            description: 'Ngingah kelinci sampun dangu dados bagian saking gesang masyarakat ing kawasan Tawangmangu ingkang seger saha lembab. Kelinci tuwuh subur wonten ing ngriki amargi hawanipun cocog saha sedhiyanipun pakan ijem ingkang kathah. Saking padatan ngingah punika miyos kreativitas ngolah daging kelinci dados sate \u2014 nyipta kuliner khas ingkang sapunika dados identitas raos Tawangmangu.'
          },
          quote: '\u201cWiwitanipun namung coba-coba ngolah daging kelinci saking ternak piyambak. Sapunika malah dados ingkang paling dipun padosi tiyang menawi dhateng Tawangmangu.\u201d',
          ingredients: {
            title: 'Fakta Narik Kawigatosan',
            items: [
              'Daging kelinci nggadhahi kandhutan protein inggil kaliyan lemak langkung andhap tinimbang daging ayam menapa dene sapi',
              'Bumbu sate kelinci Tawangmangu ngginakaken kecap saha rempah Jawi ingkang dipun lumuraken saderengipun dipun obong',
              'Kuliner punika paling rame dipun sadhe wonten akhir minggu nalika wisatawan rawuh dhateng kawasan Tawangmangu',
              'Sawetawis warung sate kelinci sampun ngadeg langkung saking 30 taun saha dados tujuan kuliner wajib ing kawasan punika'
            ]
          },
          gallery: { alt: 'Sate Kelinci khas Tawangmangu' },
          why: {
            title: 'Kenging Punapa Wigati?',
            description: 'Sate kelinci punika bukti bilih identitas kuliner saged miyos saking adaptasi saha kreativitas dhateng kawontenan alam lokal. Punika sanes asalipun saking resep leluhur ingkang katulis, nanging saking pacoban saha kawanenan nyoba \u2014 saha asilipun inggih menika satunggaling ingkang sapunika dados kabanggan piyambak kagem masyarakat Tawangmangu.'
          },
          nav: { prev: '\u2190 Jadah', next: 'Wedang Tradisional \u2192' }
        },
        wedang: {
          crumb: 'Taste of Karanganyar',
          hero: {
            title: 'Wedang Tradisional',
            subtitle: 'Ing hawa adhem lereng Lawu, segelas wedang jahe anget ingkang ngebul tansah langkung saking sekadar unjukan \u2014 punika ritual kebersamaan.'
          },
          intro: 'Sonten wonten lereng Gunung Lawu, nalika hawa wiwit nyucuk saha kabut wiwit tumurun saking pucak, warung-warung alit ing pinggir margi rame kaliyan rembagan saha kebul saking gelas-gelas wedang ingkang nembe diseduh. Jahe ingkang diobong lajeng digeprek, sereh ingkang nyebaraken ambet seger, gendhis aren ingkang manis saha peteng \u2014 sedaya nyawiji dados unjukan anget ingkang sampun dados perangan mboten kepisah saking padintenanipun masyarakat pegunungan Karanganyar.',
          history: {
            title: 'Rempah ingkang Ngrawat Badan saha Jiwa',
            description: 'Wedang tradisional Karanganyar tuwuh saking kabetahan masyarakat pegunungan kangge njagi badan tetep anget ing satengahing suhu ingkang saged tumurun drastis wonten wanci dalu. Bahan-bahanipun sedaya asalipun saking alam sekitar \u2014 jahe, sereh, kayu manis, cengkeh, ngantos kapulaga \u2014 ingkang diracik kanthi proporsi ingkang dijagi turun-temurun ing saben kulawarga.'
          },
          quote: '\u201cSaben sonten warung kula rame tiyang ngobrol sinambi ngunjuk wedang. Sanes namung babagan raosipun, nanging babagan kebersamaanipun punika ingkang ndadosaken tiyang tansah wangsul malih.\u201d',
          ingredients: {
            title: 'Fakta Narik Kawigatosan',
            items: [
              'Wedang jahe Karanganyar limrahipun ngginakaken jahe ingkang diobong rumiyin supados raosipun langkung kiyat saha aromatik',
              'Sawetawis warung nggadhahi racikan rahasia kulawarga ingkang mboten nate dipun serat wonten wujud resep formal',
              'Kejawi jahe, variasinipun kalebet wedang uwuh, wedang ronde, saha wedang secang ingkang saben-saben nggadhahi panggemar setya',
              'Dipun pitados turun-temurun saged ngangetaken badan, ngirangi mriang, saha njagi daya tahan badan'
            ]
          },
          gallery: { alt: 'Wedang rempah anget', alt2: 'Swasana warung wedang' },
          why: {
            title: 'Kenging Punapa Wigati?',
            description: 'Wedang tradisional punika pangeling bilih kearifan lokal ing babagan kesehatan saha kebersamaan sampun wonten tebih saderengipun istilah "wellness" dados tren. Njagi kabiyasaan ngunjuk wedang sesarengan ateges njagi ruang sosial ingkang mboten saged dipun gantos kaliyan layar gawai menapa kemawon.'
          },
          nav: { prev: '\u2190 Sate Kelinci', next: 'Nature That Shapes Culture \u2192' }
        }
      },
      nature: {
        lawu: {
          crumb: 'Nature That Shapes Culture',
          hero: {
            title: 'Gunung Lawu',
            subtitle: 'Gunung ingkang dipun hormati, sumber gesang ingkang mbentuk budaya saha jati diri masyarakat.'
          },
          intro: 'Gunung Lawu sanes namung gunung geni mboten aktif kanthi inggil 3.265 mdpl ing wewatesan Jawa Tengah saha Jawa Timur. Kagem masyarakat Karanganyar, Lawu punika penjaga, sumber toya, saha ruang spiritual. Ing lerengipun ngadeg Candi Sukuh saha Candi Cetho, dados bukti sanget rakedipun sesambetan antawis alam saha kapitadosan masyarakat wiwit jaman rumiyin.',
          history: {
            title: 'Penjaga ingkang Mbentuk Gesang',
            description: 'Wiwit jaman rumiyin, Gunung Lawu dados sumber toya saha kesuburan kagem siti ing sakiwatengenipun. Hawa seger pegunungan ugi mbentuk tetanen teh saha sayuran, mangka lerengipun ingkang nyimpen Candi Sukuh saha Candi Cetho ndadosaken Lawu mboten namung ruang alam, nanging ugi ruang spiritual ingkang mbentuk padintenan saha kapitadosan masyarakat Karanganyar.'
          },
          quote: '\u201cGunung mucal supados tetep teguh; saben lampah dhateng pucak inggih menika crita babagan kawanenan, kesabaran, saha pangajeng-ajeng.\u201d',
          facts: {
            title: 'Fakta Narik Kawigatosan',
            items: [
              'Gunung Lawu nggadhahi inggil 3.265 mdpl saha dados margi pendakian spiritual ingkang populer',
              'Kawasan punika dados griya kagem Candi Sukuh saha Candi Cetho ing lerengipun',
              'Hawa seger pegunungan ugi mbentuk tetanen teh saha sayuran ing sakiwatengenipun'
            ]
          },
          gallery: { alt: 'Grojogan Sewu', alt2: 'Langit pegunungan Kemuning' },
          why: {
            title: 'Kenging Punapa Wigati?',
            description: 'Alam ing sakiwatengen Gunung Lawu sanes namung pemandangan, nanging fondasi ingkang mbentuk mata pencaharian, ritual, saha filosofi gesang masyarakat Karanganyar. Njagi kelestarianipun ateges njagi oyod saking sedaya budaya ingkang tuwuh wonten nginggilipun.'
          },
          nav: { prev: '\u2190 Wedang Tradisional', next: 'Kebun Teh Kemuning \u2192' }
        },
        grojogan: {
          crumb: 'Nature That Shapes Culture',
          hero: {
            title: 'Grojogan Sewu',
            subtitle: 'Swanten gumuruh toya ingkang dhawah saking inggil 81 meter kepireng tebih saderengipun Grojogan Sewu katingal \u2014 saha nalika sampun katingal, awrat kagem mboten kendel sakedhap.'
          },
          intro: 'Wonten satunggaling perkawis ingkang kedadosan kagem saben tiyang nalika sepisan ngadeg wonten ngajenging Grojogan Sewu. Debur toya ingkang dhawah saking inggil 81 meter nyipta kabut tipis ingkang nyegeraken pasuryan, swantenipun ingkang tetep kadosdene nyameraken sedaya pamikiran sanes. Tiyang-tiyang kendel rembagan sakedhap, namung mirsani. Kagem masyarakat Tawangmangu, grojogan punika sanes namung obyek wisata \u2014 nanging tangga sepuh ingkang sampun dados perangan gesangipun.',
          history: {
            title: 'Toya ingkang Mbentuk Peradaban Alit',
            description: 'Tebih saderengipun Grojogan Sewu dados destinasi wisata, toya ingkang mili saking inggil punika sampun dados sumber gesang kagem sabin-sabin ing lembahipun. Masyarakat sekitar ndamel sistem irigasi prasaja ingkang ngaliraken toyanipun dhateng sabin saha kebon sayuran ingkang nyekapi kulawarganipun. Grojogan punika sanes namung pemandangan \u2014 nanging balung geger tetanen lereng Lawu ing sisih kidul.'
          },
          quote: '\u201cManawi kathah pamikiran, kula remen lenggah caket grojogan punika. Mboten ngertos kadospundi, swantenipun kemawon sampun ndamel tentrem.\u201d',
          facts: {
            title: 'Fakta Narik Kawigatosan',
            items: [
              'Grojogan Sewu nggadhahi inggil grojogan toya kirang langkung 81 meter, salah satunggal ingkang paling inggil ing Jawa Tengah',
              'Nami "Sewu" ateges sewu ing basa Jawi, nggambaraken tempyakan toya ingkang kathah sanget nalika dhawah',
              'Kawasan sakiwatengen grojogan dipun enggeni kethek buntut panjang ingkang gesang liar saha sampun sanget kulina kaliyan tiyang',
              'Aliran toyanipun dipun ginakaken kagem ngeleban sabin sayuran saha kebon ing lembah-lembah sekitaripun'
            ]
          },
          gallery: { alt: 'Grojogan Sewu', alt2: 'Kawasan Grojogan Sewu' },
          why: {
            title: 'Kenging Punapa Wigati?',
            description: 'Grojogan Sewu mucal satunggaling perkawis ingkang prasaja nanging asring dipun lali: bilih alam ingkang dipun jagi kanthi sae badhe tansah maringi \u2014 toya resik, hawa seger, kesuburan siti, saha papan kagem jiwa ingkang lungkrah kagem ngaso. Njagi grojogan punika tetep resik saha lestari ateges njagi fondasi gesang kagem ewonan tiyang ingkang manggen ing sekitaripun.'
          },
          nav: { prev: '\u2190 Kebun Teh Kemuning', next: 'Wangsul dhateng Jelajahi \u2192' }
        },
        kemuning: {
          crumb: 'Nature That Shapes Culture',
          hero: {
            title: 'Kebun Teh Kemuning',
            subtitle: 'Hamparan kebon teh ingkang ijem sanes namung lanskap, nanging ritme gesang ingkang nuntun padintenanipun warga.'
          },
          intro: 'Ing inggil kirang langkung 1.200 meter ing lereng kilen Gunung Lawu, Kebun Teh Kemuning ngamparan kadosdene permadani ijem ingkang nyegeraken mripat. Kawasan punika sampun dados sumber gesang masyarakat sekitar wiwit jaman kolonial, nalika perkebunan teh sepisan dipun bikak ing wewengkon punika.',
          history: {
            title: 'Ritme ingkang Ngiket Generasi',
            description: 'Saben enjing, para among tani teh nglampahi margi-margi kebon nderek ritme ingkang sami kadosdene generasi sadereng. Kagiyatan metik, ngolah, ngantos nyeduh teh sampun dados perangan saking jati diri warga Kemuning \u2014 satunggaling siklus gesang ingkang lumampah selaras kaliyan mangsa saha embun enjing pegunungan.'
          },
          quote: '\u201cDaun teh dipun petik kanthi sabar, sami kadosdene budaya dipun rawat saking generasi dhateng generasi.\u201d',
          facts: {
            title: 'Fakta Narik Kawigatosan',
            items: [
              'Manggen ing inggil kirang langkung 1.200 mdpl ing lereng kilen Gunung Lawu',
              'Perkebunan teh punika sampun operasi wiwit jaman kolonial Walandi',
              'Dados sumber mata pencaharian utami kagem warga Desa Kemuning',
              'Samenika ugi dados destinasi wisata alam saha edukasi olahan teh'
            ]
          },
          gallery: { alt: 'Kebon teh Kemuning', alt2: 'Among tani teh Kemuning' },
          why: {
            title: 'Kenging Punapa Wigati?',
            description: 'Kebun Teh Kemuning punika tuladha nyata kadospundi alam saged mbentuk cara gesang satunggaling komunitas. Njagi kelestarian kebon punika ateges tumut njagi mata pencaharian saha ritme gesang ingkang sampun lumampah lintas generasi.'
          },
          nav: { prev: '\u2190 Gunung Lawu', next: 'Grojogan Sewu \u2192' }
        }
      }
    }
  };

  /* ---------------------------------------------------------
     2) DESTINATION DATA TRANSLATIONS (Explorer / Living Map)
     Nama tempat & lokasi dibiarkan sama di semua bahasa
     (nama diri), yang diterjemahkan: deskripsi, jam, harga, fakta.
     --------------------------------------------------------- */
  var destinationsI18n = {
    'candi-sukuh': {
      id: { desc: 'Candi filosofi di lereng Lawu, simbol kesucian dan kesuburan.', hours: '08.00 \u2013 17.00 WIB', price: 'Rp15.000', fact: 'Salah satu candi tertua bercorak simbolis di Jawa, dibangun sekitar abad ke-15.' },
      en: { desc: 'A philosophical temple on the slopes of Lawu, a symbol of purity and fertility.', hours: '08:00 \u2013 17:00 WIB', price: 'IDR 15,000', fact: 'One of Java\u2019s oldest symbolic temples, built around the 15th century.' },
      jv: { desc: 'Candi filsafat ing lereng Lawu, simbol kesucen saha kesuburan.', hours: '08.00 \u2013 17.00 WIB', price: 'Rp15.000', fact: 'Salah setunggaling candi paling sepuh kanthi corak simbolis ing Jawa, dipun bangun watawis abad kaping-15.' }
    },
    'candi-cetho': {
      id: { desc: 'Candi berundak menghadap matahari terbit, pusat ritual spiritual.', hours: '08.00 \u2013 16.00 WIB', price: 'Rp15.000', fact: 'Berada di ketinggian \u00b11.400 mdpl, sering diselimuti kabut tipis di pagi hari.' },
      en: { desc: 'A terraced temple facing the sunrise, a center of spiritual ritual.', hours: '08:00 \u2013 16:00 WIB', price: 'IDR 15,000', fact: 'Sitting at roughly 1,400m above sea level, often wrapped in thin morning mist.' },
      jv: { desc: 'Candi undhak-undhakan madhep surya mlethek, pusat ritual spiritual.', hours: '08.00 \u2013 16.00 WIB', price: 'Rp15.000', fact: 'Wonten ing inggilipun \u00b11.400 mdpl, asring kaselimutan kabut tipis wanci enjing.' }
    },
    'museum-dayu': {
      id: { desc: 'Ruang penyimpan artefak dan jejak sejarah masyarakat Karanganyar.', hours: '09.00 \u2013 15.00 WIB (Senin tutup)', price: 'Rp10.000', fact: 'Menyimpan koleksi arsip dan artefak yang jarang dipamerkan di tempat lain.' },
      en: { desc: 'A hall of artifacts and historical traces of the people of Karanganyar.', hours: '09:00 \u2013 15:00 WIB (closed Mondays)', price: 'IDR 10,000', fact: 'Houses archival collections and artifacts rarely displayed elsewhere.' },
      jv: { desc: 'Papan nyimpen artefak saha lacak sejarah masyarakat Karanganyar.', hours: '09.00 \u2013 15.00 WIB (Senin tutup)', price: 'Rp10.000', fact: 'Nyimpen koleksi arsip saha artefak ingkang awis dipun pamerkaken ing papan sanes.' }
    },
    'kebun-teh-kemuning': {
      id: { desc: 'Hamparan kebun teh yang membentuk ritme hidup warga pegunungan.', hours: '07.00 \u2013 17.00 WIB', price: 'Gratis (parkir Rp5.000)', fact: 'Terhampar di ketinggian \u00b11.200 mdpl di lereng barat Gunung Lawu.' },
      en: { desc: 'A sweeping tea garden that shapes the rhythm of life for mountain communities.', hours: '07:00 \u2013 17:00 WIB', price: 'Free (parking IDR 5,000)', fact: 'Spread across roughly 1,200m above sea level on the western slope of Mount Lawu.' },
      jv: { desc: 'Hamparan kebon teh ingkang mbentuk ritme gesang warga pegunungan.', hours: '07.00 \u2013 17.00 WIB', price: 'Gratis (parkir Rp5.000)', fact: 'Kaimpar wonten ing inggilipun \u00b11.200 mdpl ing lereng kilen Gunung Lawu.' }
    },
    'grojogan-sewu': {
      id: { desc: 'Air terjun 81 meter yang dipercaya membawa ketenangan jiwa di Tawangmangu.', hours: '07.00 \u2013 17.00 WIB', price: 'Rp25.000', fact: 'Salah satu air terjun tertinggi di Jawa Tengah, dengan kabut tipis yang menyejukkan.' },
      en: { desc: 'An 81-meter waterfall in Tawangmangu believed to bring peace of mind.', hours: '07:00 \u2013 17:00 WIB', price: 'IDR 25,000', fact: 'One of Central Java\u2019s tallest waterfalls, wrapped in a cool, gentle mist.' },
      jv: { desc: 'Grojogan 81 meter ing Tawangmangu ingkang dipun pitados nggadhahi ketentreman jiwa.', hours: '07.00 \u2013 17.00 WIB', price: 'Rp25.000', fact: 'Salah setunggaling grojogan paling inggil ing Jawa Tengah, kanthi kabut tipis ingkang nyejukaken.' }
    },
    'gunung-lawu': {
      id: { desc: 'Gunung suci yang membentuk spiritualitas dan kehidupan masyarakat Karanganyar.', hours: 'Basecamp buka bervariasi', price: 'Rp25.000 (simaksi)', fact: 'Puncaknya berada di ketinggian 3.265 mdpl, salah satu titik spiritual tertinggi di Jawa.' },
      en: { desc: 'A sacred mountain that shapes the spirituality and life of Karanganyar\u2019s people.', hours: 'Basecamp hours vary', price: 'IDR 25,000 (permit)', fact: 'Its peak stands at 3,265m, one of the highest spiritual points in Java.' },
      jv: { desc: 'Gunung suci ingkang mbentuk spiritualitas saha gesang masyarakat Karanganyar.', hours: 'Basecamp bikak beda-beda', price: 'Rp25.000 (simaksi)', fact: 'Pucakipun wonten ing inggilipun 3.265 mdpl, salah setunggaling papan spiritual paling inggil ing Jawa.' }
    },
    'sentra-batik': {
      id: { desc: 'Kampung pengrajin yang menjaga warisan canting dari generasi ke generasi.', hours: '08.00 \u2013 16.00 WIB', price: 'Gratis kunjungan', fact: 'Pengrajin masih menggunakan teknik canting tulis yang diwariskan turun-temurun.' },
      en: { desc: 'A craftsmen\u2019s village keeping the canting tradition alive across generations.', hours: '08:00 \u2013 16:00 WIB', price: 'Free to visit', fact: 'Artisans still use the hand-drawn canting technique passed down for generations.' },
      jv: { desc: 'Kampung pengrajin ingkang njagi warisan canting saking generasi dhateng generasi.', hours: '08.00 \u2013 16.00 WIB', price: 'Gratis rawuh', fact: 'Pengrajin taksih ngginakaken teknik canting tulis ingkang katurunaken turun-tumurun.' }
    },
    'kerajinan-bambu': {
      id: { desc: 'Pengrajin anyaman bambu yang mengubah material sederhana menjadi karya bernilai tinggi.', hours: '08.00 \u2013 16.00 WIB', price: 'Gratis kunjungan', fact: 'Satu anyaman rumit bisa memakan waktu berhari-hari untuk diselesaikan.' },
      en: { desc: 'Bamboo-weaving artisans turning simple material into high-value craft.', hours: '08:00 \u2013 16:00 WIB', price: 'Free to visit', fact: 'One intricate weave can take several days to complete.' },
      jv: { desc: 'Pengrajin anyaman pring ingkang ngewahi bahan prasaja dados karya ingkang inggil regenipun.', hours: '08.00 \u2013 16.00 WIB', price: 'Gratis rawuh', fact: 'Setunggal anyaman ingkang ruwet saged mbetahaken pinten-pinten dinten kanggo rampung.' }
    },
    'sedekah-bumi': {
      id: { desc: 'Tradisi syukuran hasil bumi yang masih dirayakan masyarakat Karanganyar.', hours: 'Musiman, sekali setahun', price: 'Gratis untuk umum', fact: 'Diselenggarakan setelah musim panen sebagai ungkapan syukur kepada alam.' },
      en: { desc: 'A harvest thanksgiving tradition still celebrated by the people of Karanganyar.', hours: 'Seasonal, once a year', price: 'Free for the public', fact: 'Held after the harvest season as an expression of gratitude to nature.' },
      jv: { desc: 'Tradisi syukuran asil bumi ingkang taksih dipun rayakaken masyarakat Karanganyar.', hours: 'Musiman, sepisan setaun', price: 'Gratis kanggo umum', fact: 'Dipun wontenaken sasampunipun mangsa panen minangka ungkapan syukur dhateng alam.' }
    },
    'festival-budaya': {
      id: { desc: 'Perayaan tahunan yang menyatukan kesenian lintas generasi dalam satu panggung.', hours: 'Tahunan, jadwal bervariasi', price: 'Gratis untuk umum', fact: 'Menghadirkan tari, musik, dan kerajinan lokal dalam satu perayaan bersama.' },
      en: { desc: 'An annual celebration uniting cross-generational arts on one stage.', hours: 'Annual, schedule varies', price: 'Free for the public', fact: 'Brings together dance, music, and local crafts in one shared celebration.' },
      jv: { desc: 'Perayaan taunan ingkang nyawijikaken kesenian lintas generasi ing setunggal panggung.', hours: 'Taunan, jadwal beda-beda', price: 'Gratis kanggo umum', fact: 'Ngaturaken tari, musik, saha kerajinan lokal ing setunggal perayaan sesarengan.' }
    },
    'timlo': {
      id: { desc: 'Hidangan sup bening khas yang menyimpan sejarah akulturasi budaya.', hours: '07.00 \u2013 21.00 WIB', price: 'Rp15.000 \u2013 Rp25.000', fact: 'Lahir dari akulturasi budaya Jawa dan Tionghoa di masa lampau.' },
      en: { desc: 'A signature clear soup that carries the history of cultural blending.', hours: '07:00 \u2013 21:00 WIB', price: 'IDR 15,000 \u2013 25,000', fact: 'Born from the cultural blending of Javanese and Chinese heritage long ago.' },
      jv: { desc: 'Panganan sup bening khas ingkang nyimpen sejarah akulturasi budaya.', hours: '07.00 \u2013 21.00 WIB', price: 'Rp15.000 \u2013 Rp25.000', fact: 'Miyos saking akulturasi budaya Jawa saha Tionghoa ing jaman rumiyin.' }
    },
    'sate-kelinci': {
      id: { desc: 'Kuliner khas dataran tinggi yang lahir dari kearifan lokal masyarakat pegunungan.', hours: '10.00 \u2013 20.00 WIB', price: 'Rp20.000 \u2013 Rp30.000', fact: 'Populer di kalangan pendaki sebagai hidangan penghangat sepulang mendaki Lawu.' },
      en: { desc: 'A highland specialty born from the local wisdom of mountain communities.', hours: '10:00 \u2013 20:00 WIB', price: 'IDR 20,000 \u2013 30,000', fact: 'Popular among hikers as a warming dish after descending Mount Lawu.' },
      jv: { desc: 'Kuliner khas dataran inggil ingkang miyos saking kearifan lokal masyarakat pegunungan.', hours: '10.00 \u2013 20.00 WIB', price: 'Rp20.000 \u2013 Rp30.000', fact: 'Kondhang wonten ing pendaki minangka panganan anget sasampunipun mendhaki Lawu.' }
    }
  };

  // Maps a destination's raw `category` slug to a filters.* translation key
  var categoryKeyMap = {
    temple: 'temple', nature: 'nature', museum: 'museum',
    culture: 'culture', 'tea-plantation': 'teaPlantation', waterfall: 'waterfall'
  };

  /* ---------------------------------------------------------
     3) ENGINE
     --------------------------------------------------------- */
  function getPath(obj, path) {
    return path.split('.').reduce(function (acc, key) { return acc && acc[key] !== undefined ? acc[key] : undefined; }, obj);
  }

  function currentLang() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    return SUPPORTED.indexOf(stored) !== -1 ? stored : DEFAULT_LANG;
  }

  function applyStaticTranslations(lang) {
    var dict = translations[lang] || translations[DEFAULT_LANG];

    document.documentElement.setAttribute('lang', lang === 'jv' ? 'jv' : lang);

    var titleEl = getPath(dict, 'meta.title');
    if (titleEl) document.title = titleEl;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && getPath(dict, 'meta.description')) metaDesc.setAttribute('content', getPath(dict, 'meta.description'));

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = getPath(dict, el.getAttribute('data-i18n'));
      if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var value = getPath(dict, el.getAttribute('data-i18n-html'));
      if (value !== undefined) el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var value = getPath(dict, el.getAttribute('data-i18n-aria'));
      if (value !== undefined) el.setAttribute('aria-label', value);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var value = getPath(dict, el.getAttribute('data-i18n-placeholder'));
      if (value !== undefined) el.setAttribute('placeholder', value);
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var value = getPath(dict, el.getAttribute('data-i18n-alt'));
      if (value !== undefined) el.setAttribute('alt', value);
    });

    // Language switcher own label / current code
    document.querySelectorAll('[data-lang-current]').forEach(function (el) {
      el.textContent = getPath(dict, 'langSwitcher.current') || lang.toUpperCase();
    });
    document.querySelectorAll('.lang-switcher__trigger').forEach(function (el) {
      var label = getPath(dict, 'langSwitcher.label');
      if (label) el.setAttribute('aria-label', label);
    });
    document.querySelectorAll('[data-lang]').forEach(function (opt) {
      opt.setAttribute('aria-selected', opt.getAttribute('data-lang') === lang ? 'true' : 'false');
      opt.classList.toggle('is-active', opt.getAttribute('data-lang') === lang);
    });

    // Let other scripts (destination panel, filter chips) refresh their own content
    document.dispatchEvent(new CustomEvent('laras:langchange', { detail: { lang: lang } }));
  }

  function setLanguage(lang, opts) {
    opts = opts || {};
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }

    if (opts.fade === false) {
      applyStaticTranslations(lang);
      return;
    }

    var targets = document.querySelectorAll('[data-i18n], [data-i18n-html]');
    targets.forEach(function (el) { el.classList.add('i18n-fade'); });
    setTimeout(function () {
      applyStaticTranslations(lang);
      requestAnimationFrame(function () {
        targets.forEach(function (el) { el.classList.remove('i18n-fade'); });
      });
    }, FADE_MS);
  }

  // Translate one destination-data field, falling back to the original (ID) value
  function translateDestination(dest, lang) {
    lang = lang || currentLang();
    var entry = destinationsI18n[dest.id];
    var localized = entry && (entry[lang] || entry.id);
    return {
      id: dest.id,
      name: dest.name,
      category: dest.category,
      categoryLabel: getPath(translations[lang] || translations.id, 'explorer.filters.' + categoryKeyMap[dest.category]) || dest.categoryLabel,
      desc: (localized && localized.desc) || dest.desc,
      location: dest.location,
      hours: (localized && localized.hours) || dest.hours,
      price: (localized && localized.price) || dest.price,
      fact: (localized && localized.fact) || dest.fact,
      image: dest.image, link: dest.link, lat: dest.lat, lng: dest.lng
    };
  }

  function t(path, lang) {
    return getPath(translations[lang || currentLang()] || translations.id, path);
  }

  /* ---------------------------------------------------------
     4) LANGUAGE SWITCHER UI WIRING
     --------------------------------------------------------- */
  function initSwitcher() {
    var trigger = document.getElementById('langTrigger');
    var menu = document.getElementById('langMenu');
    var wrap = document.getElementById('langSwitcher');
    if (!trigger || !menu || !wrap) return;

    function closeMenu() {
      wrap.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function openMenu() {
      wrap.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      wrap.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    function choose(opt) {
      var lang = opt.getAttribute('data-lang');
      setLanguage(lang);
      closeMenu();
      // If the mobile hamburger panel is open, close it too for a clean handoff
      var mobileNav = document.getElementById('navLinks');
      var navToggle = document.getElementById('navToggle');
      if (mobileNav && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
        document.body.classList.remove('nav-open');
      }
    }

    menu.querySelectorAll('[data-lang]').forEach(function (opt) {
      opt.addEventListener('click', function () { choose(opt); });
      opt.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(opt); }
      });
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSwitcher();
    applyStaticTranslations(currentLang()); // no fade on first load (hidden behind loader)
  });

  // Expose a small public API for the inline map/explorer script in index.html
  window.LARAS_I18N = {
    getLang: currentLang,
    setLang: setLanguage,
    t: t,
    translateDestination: translateDestination
  };
})();
