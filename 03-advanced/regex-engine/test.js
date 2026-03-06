const { match }=require("./regex");

let pass=0;

const tests=[
    // Basic literals
    ["abc", "abc", true],
    ["abc", "ab", false],

    // Wildcard
    ["a.c", "abc", true],
    ["a.c", "a9c", true],
    ["a.c", "ac", false],

    // Optional ?
    ["ab?c", "ac", true],
    ["ab?c", "abc", true],
    ["ab?c", "abbc", false],

    // Star *
    ["ab*c", "ac", true],
    ["ab*c", "abc", true],
    ["ab*c", "abbbc", true],
    ["ab*c", "abdc", false],

    // Plus +
    ["ab+c", "ac", false],
    ["ab+c", "abc", true],
    ["ab+c", "abbbc", true],

    // Anchors
    ["^abc", "abcdef", true],
    ["^abc", "zabc", false],
    ["abc$", "xxabc", true],
    ["abc$", "abcz", false],
    ["^abc$", "abc", true],
    ["^abc$", "abcc", false],

    // Escaped characters
    ["a\\.c", "a.c", true],
    ["a\\.c", "abc", false],
    ["a\\*", "a*", true],
    ["a\\*", "aaa", false],

    // Character classes
    ["[abc]", "a", true],
    ["[abc]", "b", true],
    ["[abc]", "d", false],
    ["file[abc].txt", "filea.txt", true],
    ["file[abc].txt", "filed.txt", false],

    // Ranges
    ["[a-z]", "m", true],
    ["[a-z]", "M", false],
    ["[0-9]", "7", true],
    ["[0-9]", "a", false],
    ["file[0-9].txt", "file7.txt", true],
    ["file[0-9].txt", "filex.txt", false],
];

tests.forEach(([pattern, text, expected], i)=>{
    const result=match(pattern, text);
    const ok=result===expected;
    if(ok) pass++;

    console.log(
        `${ok ? "YES" : "NO"} Test ${i+1}: /${pattern}/ vs "${text}" → ${result} (expected ${expected})`
    );
});
