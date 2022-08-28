import { ipsum } from './ipsum.js';

async function getFonts() {
    const apiKey = "AIzaSyDkSkxx5_B_iglWVHGGQeNKe-3zIEqMBP0";
    const res = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`);
    const data = await res.json();
    const options = data.items.map(font => {
        return `<option value ="${font.family}">${font.family}</option>`;
    });
    headingFont.innerHTML = options;
    bodyFont.innerHTML = options;
}

function loadFont(font) {
    WebFont.load({
        google: {
            families: [font]
        }
    });
};

function preview() {
    heading.innerText = headingText.value;
    body.innerText = bodyText.value;
    heading.style.color = headingColor.value;
    body.style.color = bodyColor.value;
    bg.style.backgroundColor = bgColor.value;
    headingColorText.value = headingColor.value;
    bodyColorText.value = bodyColor.value;
    bgColorText.value = bgColor.value;
    heading.style.fontSize = `${headingSize.value}px`;
    body.style.fontSize = `${bodySize.value}px`;
    loadFont(headingFont.value);
    heading.style.fontFamily = headingFont.value;
    loadFont(bodyFont.value);
    body.style.fontFamily = bodyFont.value;
}

function updatePicker() {
    headingColor.value = headingColorText.value;
    bodyColor.value = bodyColorText.value;
    bodyColor.value = bodyColorText.value;
    preview();
}

// settiings
const headingText = document.getElementById('heading-text');
const bodyText = document.getElementById('body-text');
const headingColor = document.getElementById('heading-color');
const bodyColor = document.getElementById('body-color');
const bgColor = document.getElementById('bg-color');
const headingColorText = document.getElementById('heading-color-text');
const bodyColorText = document.getElementById('body-color-text');
const bgColorText = document.getElementById('bg-color-text');
const headingSize = document.getElementById('heading-size');
const bodySize = document.getElementById('body-size');
const headingFont = document.getElementById('heading-font');
const bodyFont = document.getElementById('body-font');

// preview
const bg = document.getElementById('preview');
const heading = document.getElementById('heading');
const body = document.getElementById('body');

// set initial text
let random = Math.floor(Math.random() * ipsum.length);
headingText.value = ipsum[random].heading;
bodyText.value = ipsum[random].body;

// update preview on any change
headingText.addEventListener('change', preview);
bodyText.addEventListener('change', preview);
headingColor.addEventListener('change', preview);
bodyColor.addEventListener('change', preview);
bgColor.addEventListener('change', preview);
headingSize.addEventListener('change', preview);
bodySize.addEventListener('change', preview);
headingFont.addEventListener('change', preview);
bodyFont.addEventListener('change', preview);

// update colors pickers when color text field changes
headingColorText.addEventListener('change', updatePicker);
bodyColorText.addEventListener('change', updatePicker);
bodyColorText.addEventListener('change', updatePicker);

// get the fonts
const fonts = await getFonts();

// initial update to sync preview with inputs
preview();

// populate the font selectors
getFonts();
