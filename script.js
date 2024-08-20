// Define the mapping of chapters to their starting pages
const chapterToPageMap = {
    1: 1,    // Chapter 1 starts on page 1
    2: 2,    // Chapter 2 starts on page 2
    3: 50, // Chapter 3 starts on page 50
    4: 77,
    5: 106,  
    6: 128,
    7: 151,
    8: 177,
    9: 187,
    10: 28,
    11: 221,
    12: 235,
    13: 249,
    14: 255,
    15: 262,
    16: 267,
    17: 282,
    18: 293,
    19: 305,
    20: 312,
    21: 322,
    22: 332,
    23: 342,
    24: 350,
    25: 359,
    26: 367,
    27: 377,
    28: 385,
    29: 396,
    30: 404,
    31: 411,
    32: 415,
    33: 418,
    34: 428,
    35: 434,
    36: 440,
    37: 446,
    38: 453,
    39: 458,
    40: 467,
    41: 477,
    42: 483,
    43: 489,
    44: 496,
    45: 499,
    46: 502,
    47: 507,
    48: 511,
    49: 515,
    50: 518,
    51: 520,
    52: 523,
    53: 526,
    54: 528,
    55: 531,
    56: 534,
    57: 537,
    58: 542,
    59: 545,
    60: 549,
    61: 551,
    62: 553,
    63: 554,
    64: 556,
    65: 558,
    66: 560,
    67: 562,
    68: 564,
    69: 566,
    70: 568,
    71: 570,
    72: 572,
    73: 574,
    74: 575,
    75: 577,
    76: 578,
    77: 580,
    78: 582,
    79: 583,
    80: 585,
    81: 586,
    82: 587,
    83: 587,
    84: 589,
    85: 590,
    86: 591,
    87: 591,
    88: 592,
    89: 593,
    90: 594,
    91: 595,
    92: 595,
    93: 596,
    94: 596,
    95: 597,
    96: 597,
    97: 598,
    98: 598,
    99: 599,
    100: 599,
    101: 600,
    102: 600,
    103: 601,
    104: 601,
    105: 601,
    106: 602,
    107: 602,
    108: 602,
    109: 603,
    110: 603,
    111: 603,
    112: 604,
    113: 604,
    // Continue mapping chapters to their starting pages...
    114: 604
};

// Load PDF and initialize viewer
const url = './quran.pdf';
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;

// Asynchronous function to fetch and display PDF pages
const loadPDF = async () => {
    const loadingTask = pdfjsLib.getDocument(url);
    pdfDoc = await loadingTask.promise;
    renderPage(pageNum);
};

// Render a single page
const renderPage = async (num) => {
    if (pageRendering) {
        pageNumPending = num;
        return;
    }

    pageRendering = true;
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.getElementById('pdf-canvas');
    const context = canvas.getContext('2d');
    
    // Adjust canvas size for high DPI screens
    const scale = window.devicePixelRatio;
    canvas.width = viewport.width * scale;
    canvas.height = viewport.height * scale;
    context.scale(scale, scale);

    const renderContext = {
        canvasContext: context,
        viewport: viewport
    };

    // Render the page
    await page.render(renderContext).promise;

    // Indicate rendering is complete
    pageRendering = false;

    // If there is a pending page to render, do it now
    if (pageNumPending !== null) {
        renderPage(pageNumPending);
        pageNumPending = null;
    }
};

// Handle swipe navigation
const handleSwipe = (event) => {
    if (event.deltaX > 0) { // Swipe left
        if (pageNum < pdfDoc.numPages) {
            pageNum++;
            renderPage(pageNum);
        }
    } else if (event.deltaX < 0) { // Swipe right
        if (pageNum > 1) {
            pageNum--;
            renderPage(pageNum);
        }
    }
};

// Set up Hammer.js for swipe gestures
const canvas = document.getElementById('pdf-canvas');
const hammer = new Hammer(canvas);
hammer.on('swipe', handleSwipe);

// Toggle chapter list
const menuButton = document.getElementById('menu-button');
const chapterList = document.getElementById('chapter-list');
const chapterListUl = chapterList.querySelector('ul');

menuButton.addEventListener('click', () => {
    chapterList.style.display = chapterList.style.display === 'none' ? 'block' : 'none';
});

// Populate chapter list
// Quran Chapters Data
const chapters = [
    { number: 1, name: 'الفاتحة' },
    { number: 2, name: 'البقرة' },
    { number: 3, name: 'آل عمران' },
    { number: 4, name: 'النساء' },
    { number: 5, name: 'المائدة' },
    { number: 6, name: 'الأنعام' },
    { number: 7, name: 'الأعراف' },
    { number: 8, name: 'الأنفال' },
    { number: 9, name: 'التوبة' },
    { number: 10, name: 'يونس' },
    { number: 11, name: 'هود' },
    { number: 12, name: 'يوسف' },
    { number: 13, name: 'الرعد' },
    { number: 14, name: 'إبراهيم' },
    { number: 15, name: 'الحجر' },
    { number: 16, name: 'النحل' },
    { number: 17, name: 'الإسراء' },
    { number: 18, name: 'الكهف' },
    { number: 19, name: 'مريم' },
    { number: 20, name: 'طه' },
    { number: 21, name: 'الأنبياء' },
    { number: 22, name: 'الحج' },
    { number: 23, name: 'المؤمنون' },
    { number: 24, name: 'النور' },
    { number: 25, name: 'الفرقان' },
    { number: 26, name: 'الشعراء' },
    { number: 27, name: 'النمل' },
    { number: 28, name: 'القصص' },
    { number: 29, name: 'العنكبوت' },
    { number: 30, name: 'الروم' },
    { number: 31, name: 'لقمان' },
    { number: 32, name: 'السجدة' },
    { number: 33, name: 'الأحزاب' },
    { number: 34, name: 'سبأ' },
    { number: 35, name: 'فاطر' },
    { number: 36, name: 'يس' },
    { number: 37, name: 'الصافات' },
    { number: 38, name: 'ص' },
    { number: 39, name: 'الزمر' },
    { number: 40, name: 'غافر' },
    { number: 41, name: 'فصلت' },
    { number: 42, name: 'الشورى' },
    { number: 43, name: 'الزخرف' },
    { number: 44, name: 'الدخان' },
    { number: 45, name: 'الجاثية    ' },
    { number: 46, name: 'الأحقاف' },
    { number: 47, name: 'محمد' },
    { number: 48, name: 'الفتح' },
    { number: 49, name: 'الحجرات' },
    { number: 50, name: 'ق' },
    { number: 51, name: 'الذاريات' },
    { number: 52, name: 'الطور' },
    { number: 53, name: 'النجم' },
    { number: 54, name: 'القمر' },
    { number: 55, name: 'الرحمن' },
    { number: 56, name: 'الواقعة' },
    { number: 57, name: 'الحديد' },
    { number: 58, name: 'المجادلة' },
    { number: 59, name: 'الحشر' },
    { number: 60, name: 'الممتحنة' },
    { number: 61, name: 'الصف' },
    { number: 62, name: 'الجمعة' },
    { number: 63, name: 'المنافقون' },
    { number: 64, name: 'التغابن' },
    { number: 65, name: 'الطلاق' },
    { number: 66, name: 'التحريم' },
    { number: 67, name: 'الملك' },
    { number: 68, name: 'القلم' },
    { number: 69, name: 'الحاقة' },
    { number: 70, name: 'المعارج' },
    { number: 71, name: 'نوح' },
    { number: 72, name: 'الجن' },
    { number: 73, name: 'المزمل' },
    { number: 74, name: 'المدثر' },
    { number: 75, name: 'القيامة' },
    { number: 76, name: 'الإنسان' },
    { number: 77, name: 'المرسلات' },
    { number: 78, name: 'النبأ' },
    { number: 79, name: 'النازعات' },
    { number: 80, name: 'عبس' },
    { number: 81, name: 'التكوير' },
    { number: 82, name: 'الانفطار' },
    { number: 83, name: 'المطففين' },
    { number: 84, name: 'الانشقاق' },
    { number: 85, name: 'البروج' },
    { number: 86, name: 'الطارق' },
    { number: 87, name: 'الأعلى' },
    { number: 88, name: 'الغاشية' },
    { number: 89, name: 'الفجر' },
    { number: 90, name: 'البلد' },
    { number: 91, name: 'الشمس' },
    { number: 92, name: 'الليل' },
    { number: 93, name: 'الضحى' },
    { number: 94, name: 'الشرح' },
    { number: 95, name: 'التين' },
    { number: 96, name: 'العلق' },
    { number: 97, name: 'القدر' },
    { number: 98, name: 'البينة' },
    { number: 99, name: 'الزلزلة' },
    { number: 100, name: 'العاديات' },
    { number: 101, name: 'القارعة' },
    { number: 102, name: 'التكاثر' },
    { number: 103, name: 'العصر' },
    { number: 104, name: 'الهمزة' },
    { number: 105, name: 'الفيل' },
    { number: 106, name: 'قريش' },
    { number: 107, name: 'الماعون' },
    { number: 108, name: 'الكوثر' },
    { number: 109, name: 'الكافرون' },
    { number: 110, name: 'النصر' },
    { number: 111, name: 'المسد' },
    { number: 112, name: 'الإخلاص' },
    { number: 113, name: 'الفلق' },
    // Add the rest of the chapters here...
    { number: 114, name: 'الناس' }
];

chapters.forEach(chapter => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = chapter.number;
    li.textContent = chapter.name;
    li.appendChild(span);
    li.addEventListener('click', () => {
        const page = chapterToPageMap[chapter.number];
        if (page) {
            pageNum = page;
            renderPage(pageNum);
            chapterList.style.display = 'none'; // Hide the chapter list after selection
        }
    });
    chapterListUl.appendChild(li);
});

// Initialize PDF viewer
loadPDF();
