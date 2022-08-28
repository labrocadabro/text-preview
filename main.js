import { ipsum } from './ipsum.js';

function preview() {
    heading.innerText = headingText.value;
    body.innerText = bodyText.value;
    heading.style.color = headingColor.value;
    body.style.color = bodyColor.value;
    bg.style.backgroundColor = bgColor.value;
    heading.style.fontSize = `${headingSize.value}px`;
    body.style.fontSize = `${bodySize.value}px`;
}

// settiings
const headingText = document.getElementById('heading-text');
const bodyText = document.getElementById('body-text');
const headingColor = document.getElementById('heading-color');
const bodyColor = document.getElementById('body-color');
const bgColor = document.getElementById('bg-color');
const headingSize = document.getElementById('heading-size');
const bodySize = document.getElementById('body-size');

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



preview();


// google fonts api key:  AIzaSyDkSkxx5_B_iglWVHGGQeNKe-3zIEqMBP0 

