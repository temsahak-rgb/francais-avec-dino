/* =============================== */
/* Reset و استایل‌های پایه */
/* =============================== */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Vazirmatn', Arial, Helvetica, sans-serif;
}

body {
    background: #f4f6f8; /* پس‌زمینه خاکستری ملایم برای وب */
    color: black;
    min-height: 100vh;
    -webkit-tap-highlight-color: transparent;
}

#app {
    max-width: 430px;
    margin: auto;
    min-height: 100vh;
    padding: 25px;
    background: white;
}

/* در دسکتاپ، اپ را شبیه موبایل در وسط صفحه نشان بده */
@media (min-width: 768px) {
    #app {
        margin-top: 20px;
        margin-bottom: 20px;
        border-radius: 16px;
        min-height: calc(100vh - 40px);
        box-shadow: 0 0 20px rgba(0,0,0,0.08);
    }
}

h1 {
    text-align: center;
    font-size: 28px;
    margin-top: 40px;
}

p {
    text-align: center;
    margin-top: 15px;
    color: #444;
}

button {
    width: 100%;
    padding: 16px;
    margin-top: 18px;
    border: none;
    border-radius: 14px;
    background: black;
    color: white;
    font-size: 18px;
    cursor: pointer;
    transition: opacity 0.2s;
}

button:hover {
    opacity: .9;
}

/* =============================== */
/* حالت RTL (فارسی) */
/* =============================== */

body.rtl-mode {
    direction: rtl;
    text-align: right;
}

body.rtl-mode h1,
body.rtl-mode p {
    text-align: right;
}

/* =============================== */
/* ⚠️ حیاتی: متن‌های فرانسوی همیشه LTR */
/* =============================== */

/* این کلاس‌ها باعث می‌شوند متن‌های فرانسوی حتی در حالت فارسی، چپ‌چین بمانند */
.fr-text,
.lesson-content,
.question-text,
.option-btn,
table,
th, td {
    direction: ltr;
    text-align: left;
    unicode-bidi: embed;
}

/* در حالت LTR (فرانسوی)، همه چیز چپ‌چین است */
body:not(.rtl-mode) h1,
body:not(.rtl-mode) p {
    text-align: left;
}

/* =============================== */
/* استایل‌های جدول (برای درس‌های گرامر) */
/* =============================== */

table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 15px;
}

th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

th {
    background: #f8f9fa;
    font-weight: bold;
}

/* =============================== */
/* اسکرول‌بار زیبا (برای وب) */
/* =============================== */

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #aaa;
