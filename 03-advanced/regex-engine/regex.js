function matchOne(p, t){
    if(!p) return true;
    if(!t) return false;
    if(p===".") return true;
    return p===t;
}

function matchStar(char, pattern, text){
    let i=0;
    do{
        if(matchHere(pattern, text.slice(i))) return true;
    }while(i<text.length && matchOne(char, text[i++]));
    return false;
}

function matchPlus(char, pattern, text){
    if(!text.length || !matchOne(char, text[0])) return false;
    return matchStar(char, pattern, text.slice(1));
}

function matchCharClass(pattern, textChar){
    const content=pattern.slice(1, -1);

    for(let i=0; i<content.length; i++){
        if(i + 2 < content.length && content[i + 1]==="-"){
            const start=content.charCodeAt(i);
            const end=content.charCodeAt(i + 2);
            const code=textChar.charCodeAt(0);
            if(code >=start && code <=end) return true;
            i +=2;
        }else{
            if(content[i]===textChar) return true;
        }
    }
    return false;
}

function matchHere(pattern, text){
    if(pattern.length===0) return true;

    if(pattern==="$") return text.length===0;

    if(pattern[0]==="\\" && pattern.length >=2){
        if(text.length && text[0]===pattern[1]){
            return matchHere(pattern.slice(2), text.slice(1));
        }
        return false;
    }

    if(pattern[0]==="["){
        const close=pattern.indexOf("]");
        if(close!==-1){
            const cls=pattern.slice(0, close+1);
            if(text.length && matchCharClass(cls, text[0])){
                return matchHere(pattern.slice(close+1), text.slice(1));
            }
            return false;
        }
    }

    if(pattern.length >=2 && pattern[1]==="?"){
        return(
            matchHere(pattern.slice(2), text) ||
           (text.length &&
                matchOne(pattern[0], text[0]) &&
                matchHere(pattern.slice(2), text.slice(1)))
        );
    }

    if(pattern.length >=2 && pattern[1]==="*"){
        return matchStar(pattern[0], pattern.slice(2), text);
    }

    if(pattern.length >=2 && pattern[1]==="+"){
        return matchPlus(pattern[0], pattern.slice(2), text);
    }

    if(text.length && matchOne(pattern[0], text[0])){
        return matchHere(pattern.slice(1), text.slice(1));
    }

    return false;
}

function match(pattern, text){
    if(pattern[0]==="^"){
        return matchHere(pattern.slice(1), text);
    }

    for(let i=0; i <=text.length; i++){
        if(matchHere(pattern, text.slice(i))) return true;
    }

    return false;
}

module.exports={ match };