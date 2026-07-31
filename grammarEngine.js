// grammarEngine.js

let grammarData = {};

async function loadGrammar(level) {
    try {
        const response = await fetch("./data/grammar-" + level + ".json");
        const data = await response.json();
        grammarData[level] = data;
        return data;
    } catch (error) {
        console.error("خطا در بارگذاری گرامر " + level + ":", error);
        return [];
    }
}

function getGrammar(level) {
    return grammarData[level] || [];
}

function getRecommendedGrammar(level) {
    const data = grammarData[level] || [];
    return data.filter(item => item.recommended === true);
}

function getGrammarByModule(level) {
    const data = grammarData[level] || [];
    const modules = {};
    
    data.forEach(item => {
        if (!modules[item.module]) {
            modules[item.module] = {
                icon: item.icon,
                items: []
            };
        }
        modules[item.module].items.push(item);
    });
    
    return modules;
}
