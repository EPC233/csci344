const makeBigger = () => {
   const content = document.querySelector('.content');
   const heading = document.querySelector('h1');
   
   let contentSize = window.getComputedStyle(content, null).getPropertyValue('font-size');
   let headingSize = window.getComputedStyle(heading, null).getPropertyValue('font-size');
   
   content.style.fontSize = (parseFloat(contentSize) + 1) + 'px';
   heading.style.fontSize = (parseFloat(headingSize) + 1) + 'px';
};

const makeSmaller = () => {
   const content = document.querySelector('.content');
   const heading = document.querySelector('h1');
   
   let contentSize = window.getComputedStyle(content, null).getPropertyValue('font-size');
   let headingSize = window.getComputedStyle(heading, null).getPropertyValue('font-size');
   
   content.style.fontSize = (parseFloat(contentSize) - 1) + 'px';
   heading.style.fontSize = (parseFloat(headingSize) - 1) + 'px';
};


/*
Tips:
1. First, in the index.html file, add an onclick attribute to each button.
   The value of the attribute should be a call to the corresponding function
   (see class demos).

2. Then modify the body of the "makeBigger" and 
   "makeSmaller" functions (in between the curly braces)
   to target the body element and set it's font size.
*/
