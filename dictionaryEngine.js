// dictionaryEngine.js

let dictionaryData = [];
let dictionaryLoaded = false;

async function loadDictionary() {
    if (dictionaryLoaded) return dictionaryData;
    
    try {
        const response = await fetch("./data/dictionary/dictionary.json");
        dictionaryData = await response.json();
        dictionaryLoaded = true;
        console.log("✅ دیکشنری بارگذاری شد:", dictionaryData.length, "کلمه");
        return dictionaryData;
    } catch (error) {
        console.error("❌ خطا در بارگذاری دیکشنری:", error);
        return [];
    }
}

function getDictionary() {
    return dictionaryData;
}

function searchDictionary(query) {
    if (!query || query.trim() === "") return dictionaryData.slice(0, 50);
    
    const q = query.toLowerCase().trim();
    
    return dictionaryData.filter(word => {
        return word.word.toLowerCase().includes(q) ||
               word.translation.includes(q);
    }).slice(0, 50);
}

function getWordById(wordId) {
    return dictionaryData.find(w => w.id === wordId);
}

function getWordsByCategory(category) {
    return dictionaryData.filter(w => w.category === category);
}

function getWordsByLevel(level) {
    return dictionaryData.filter(w => w.level <= level);
}

function getCategories() {
    const cats = [...new Set(dictionaryData.map(w => w.category))];
    return cats;
}
