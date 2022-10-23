import { ipsum } from '../src/data/ipsum.js';

async function getFonts() {
    // this api key is restricted to the google fonts api and one domain
    // if you want to use this script yourself, you can get an api key here:
    // https://developers.google.com/fonts/docs/developer_api
    const apiKey = "AIzaSyDkSkxx5_B_iglWVHGGQeNKe-3zIEqMBP0";
    const res = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`);
    const data = await res.json();
    const options = data.items.map(font => {
        return `<option value ="${font.family}">${font.family}</option>`;
    });
    elements.headingFont.innerHTML = options;
    elements.bodyFont.innerHTML = options;
    return data.items.map(font => font.family);
}

function randomizeFontOrder(fonts) {
    const indices = [...Array(fonts.length).keys()];
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
}

function loadFont(font) {
    WebFont.load({
        google: {
            families: [font]
        }
    });
};

function updatePreview() {
    // inputs have an id that specifies which property on which element needs to be changed
    // elData[0] = heading or body, elData[1] =  color, font, size, etc
    const elData = this.id.split('-');
    // get the element that needs to be updated
    const changeEl = elements[elData[0]];
    // change the element based on what property needs to be changed
    switch (elData[1]) {
        case 'text':
            changeEl.innerText = this.value;
            break;
        case 'alignment':
            changeEl.style.textAlign = this.value;
            break;
        case 'size':
            changeEl.style.fontSize = `${this.value}px`;
            break;
        case 'color':
            if (elData[0] === 'bg') {
                changeEl.style.backgroundColor = this.value;
            } else {
                changeEl.style.color = this.value;
            }
            if (elData.length === 3) {
                document.getElementById(`${this.id.slice(0, -5)}`).value = this.value;
            } else {
                document.getElementById(`${this.id}-text`).value = this.value;
            }
            break;
        case 'font':
            loadFont(this.value);
            changeEl.style.fontFamily = this.value;
            loadFont(this.value);
            changeEl.style.fontFamily = this.value;
    }
}

function browseFonts() {
    // see updatePreview for explanation of this line
    const type = this.id.split('-')[0];
    // get the pointer value fontOrder[`${type}Curr`]
    // get the array of indices fontOrder[type]
    // use pointer to get an index from indices and use that index to get a font
    const pointer = ++fontOrder[`${type}Curr`];
    const indices = fontOrder[type];
    const font = fonts[indices[pointer]];

    // set the select value and trigger a change event to update the preview
    elements[`${type}Font`].value = font;
    elements[`${type}Font`].dispatchEvent(new Event('change'));
}

/* store the selected elements in an object, this way I can use object keys to get elements by string values. eg: 
const heading = document.getElementById('heading') 
I can't use the string 'heading' to get the stored element, but
elements = { heading: document.getElementById('heading') }
I can use elements['heading'] to access the stored element. */
const elements = {
    bg: document.getElementById('preview'),
    heading: document.getElementById('heading'),
    body: document.getElementById('body'),
    headingFont: document.getElementById('heading-font'),
    bodyFont: document.getElementById('body-font')
}

// set initial text
let random = Math.floor(Math.random() * ipsum.length);
document.getElementById('heading-text').value = ipsum[random].heading;
document.getElementById('body-text').value = ipsum[random].body;

// get the fonts
const fonts = await getFonts();

/* the logic here is:
- there is an array of fonts listed in alphabetical order
- In order to explore different fonts, the font browser will display the fonts in a random order
- so for each font type (heading & body) I create an array which stores the indices to the fonts array in a randomized order
- then I can just increment through the indices and use them to grab the fonts from the font array in random order, guaranteed to go through the whole list with no repeats
- this object holds two different arrays so that the heading and body fonts will have different orders and a pointer for each one to make sure the user doesn't get sent back to the beginning of the list if they stop the font browser
*/

const fontOrder = {
    heading: randomizeFontOrder(fonts),
    body: randomizeFontOrder(fonts),
    headingCurr: 0,
    bodyCurr: 0
}

// set initial value for fonts
elements.headingFont.value = fonts[fontOrder.heading[fontOrder.headingCurr]];
elements.bodyFont.value = fonts[fontOrder.body[fontOrder.bodyCurr]];

// add listeners to all the form elements
const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('change', updatePreview);
    if (input.id.endsWith('color-text')) return;
    if (input.id.includes('alignment') && !input.checked) return;
    input.dispatchEvent(new Event('change'));
});

const browseButtons = document.querySelectorAll('.fa-play');
browseButtons.forEach(button => button.addEventListener('click', browseFonts));