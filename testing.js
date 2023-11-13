// Testing and messing around with Github Co-pilot here:

function calculateDaysBetweenDates(begin, end) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return Math.round((end - begin) / millisecondsPerDay);
};
console.log(calculateDaysBetweenDates(new Date('2020-01-01'), new Date('2020-01-02')));

function calculateDatesInRomanNumerals(begin, end) {
    const days = calculateDaysBetweenDates(begin, end);
    const romanNumerals = {
        1: 'I',
        5: 'V',
        10: 'X',
        50: 'L'
    };
    let result = '';
    for (let i = 0; i < days; i++) {
        result += romanNumerals[1];
    }
    return result;
};
console.log(1967)
