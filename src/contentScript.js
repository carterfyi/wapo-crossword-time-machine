console.log("wapo date-fixer loaded");

const WAPO_DATE_FORMAT = "dddd, MMMM D, YYYY"
const observerOptions = { childList: true }

const dateElement = document.getElementsByClassName('cross-headline')[0];
let prevDateText = dateElement.textContent; // Expected to initialize as an empty string

const muob = new MutationObserver(mutationCb);
muob.observe(dateElement, observerOptions); // Start Dom Mutation Observer

function mutationCb (mlist) {
    // console.log(mlist) // Debug

    let newDateText = dateElement.textContent;
    
    if (newDateText === prevDateText) {
        return // Ignore report mutations that don't change text content
    }

    else if (newDateText !== "") {
        prevDateText = dateElement.textContent = getFixedDate(newDateText);
        console.log(`Crossword Date Corrected: ${prevDateText}`)
    }
}

function getFixedDate (dateString) {
    let mnt = moment(dateString, WAPO_DATE_FORMAT);
    mnt.add(1, 'day');
    let fixedDateString = mnt.format(WAPO_DATE_FORMAT);
    return fixedDateString;
}