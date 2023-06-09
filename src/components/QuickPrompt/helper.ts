// Extract HTML and CSS from response
export 
function validateExtractHTMLCSS(responseString: any) {
    console.log('String to be validated')
    console.log(responseString);
    let htmlRegex = /```html([\s\S]*?)```/;
    let cssRegex = /```css([\s\S]*?)```/;
  
    let htmlMatch = responseString.match(htmlRegex);
    let cssMatch = responseString.match(cssRegex);
  
    let htmlCode = htmlMatch ? htmlMatch[0].trim() : '' as string;
    let cssCode = cssMatch ? cssMatch[0].trim() : '' as string;
    console.log(htmlCode);
    console.log(cssCode);
    if (htmlCode === '' || cssCode === '') {
      // regeg for html and css seperated by //HTML// and //CSS//
      let htmlRegex2 = /\/\/HTML\/\/([\s\S]*?)\/\/CSS/;
      //CSS// to the last } of css
      let cssRegex2 = /\/\/CSS\/\/([\s\S]*?)$/;
      htmlCode = htmlCode.match(htmlRegex2)[1].trim();
      cssCode = cssCode.match(cssRegex2)[1].trim();
    }
    console.log('HTML and CSS extracted');
    debugger
    return { htmlCode, cssCode };
  }

// Render HTML and CSS and append to target
export function renderCodeSnippet(targetID: string, htmlCode: string, cssCode: string) {
  const target = document.querySelector(`[data-flow-id="${targetID}"]`);
  const style = document.createElement('style');
  if(target){
    target.innerHTML = htmlCode;
    
    style.innerHTML = cssCode;
    document.head.appendChild(style);
  }
  return ''
}

// Render HTML and CSS from cached response
export function renderCachedResponse(targetID: string) {

  console.log('%c failed to get response from van-gough', 'color: red');
  console.log('Generating random response from local storage');
  let vanGoughResponses = localStorage.getItem('van-goughResponses');
  if (vanGoughResponses) {
    let vanGoughResponsesOBJ = JSON.parse(vanGoughResponses);
    let randomIndex = Math.floor(Math.random() * vanGoughResponsesOBJ.length);
    let randomResponse = vanGoughResponsesOBJ[randomIndex];
    // Extract HTML and CSS from random response
    let { htmlCode, cssCode } = validateExtractHTMLCSS(randomResponse);
    renderCodeSnippet(htmlCode, cssCode, targetID);
  }
}