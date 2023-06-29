import React, { useEffect, useState } from 'react';
import './QuickPrompt.scss';
import axios from 'axios';
import { cssNumber } from 'jquery';

export default function QuickPrompt() {

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [prompt, setPrompt] = useState({});
  const [response, setResponse] = useState(``);
  const dynamicPrompt = [
    {role: "system", content: "You are a helpful web developer and copywriter. respond with js code to create what asked for"},
    {role: "user", content: "Target element with id 'canvas'"},
    {role: "assistant", content: "Elements will be appended to this canvas"},
    {role: "user", content: "Create a basic hero sectionof ecmmerce site"},
    {role: "assistant", content: 
    `|||// Create a div element with class "hero-section"
    let heroSection = document.createElement('div');
    heroSection.className = 'hero-section';
    
    // Create a heading element with the text "Welcome to our Ecommerce Site"
    let heading = document.createElement('h1');
    heading.textContent = 'Welcome to our Ecommerce Site';
    heroSection.appendChild(heading); // Append heading to the hero section
    
    // Create a paragraph element with some text
    let subtitle = document.createElement('p');
    subtitle.textContent = 'Explore our wide range of products and find the best deals.';
    heroSection.appendChild(subtitle); // Append subtitle to the hero section
    
    // Create a button element for the call-to-action
    let ctaButton = document.createElement('button');
    ctaButton.className = 'cta-button';
    ctaButton.textContent = 'Shop Now';
    heroSection.appendChild(ctaButton); // Append ctaButton to the hero section
    
    // Finally append the hero section to the body or any other container
    document.getElementById('canvas').appendChild(heroSection);|||`},
    {role: "user", content: "Create a basic subscription card"},
    {role: "assistant", content: 
    `|||
    // Create a div element with class "card"
let card = document.createElement('div');
card.className = 'card';

// Create a h2 element with the text "Subscribe Now!"
let heading = document.createElement('h2');
heading.textContent = 'Subscribe Now!';
card.appendChild(heading); // Append h2 to the card

// Create a p element with some text
let text = document.createElement('p');
text.textContent = 'Get the latest news and updates straight to your inbox.';
card.appendChild(text); // Append p to the card

// Create an input element for the email
let emailInput = document.createElement('input');
emailInput.type = 'text';
emailInput.id = 'email';
emailInput.name = 'email';
emailInput.placeholder = 'Your email address';
card.appendChild(emailInput); // Append input to the card

// Create a break line element
let br1 = document.createElement('br');
let br2 = document.createElement('br');
card.appendChild(br1); // Append br to the card
card.appendChild(br2); // Append another br to the card

// Create a button element
let button = document.createElement('button');
button.className = 'button';
button.textContent = 'Subscribe';
card.appendChild(button); // Append button to the card

// Finally append the card to the body or any other container
document.getElementById('canvas').appendChild(card);
|||`}
  ]

  const handlePromptEnter = (e: any) => 
  {
    setLoading(true);
    setPrompt({role: "user", content: input});
    dynamicPrompt.push({role: "user", content: input});
    // call the backend http://127.0.0.1:5001/dreamflow-cloud/us-central1/api/copilot
    // to get the response using axios
    // setMessages([...messages, {role: "system", content: response}]);

    const url = 'http://127.0.0.1:5001/dreamflow-cloud/us-central1/api/copilot';
    const config = {  
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
      params: {
        messages:dynamicPrompt
      }
    };
    axios.get(url, config)
      .then(response => {
        // response.data.content extract everything inside ``` ```
        let responseString = response.data.content;
        console.log(responseString.substring(responseString.indexOf('|||')+3,responseString.lastIndexOf('|||')));
        setResponse(responseString.substring(responseString.indexOf('|||')+3,responseString.lastIndexOf('|||')));
        setLoading(false);
      }
      )
      .catch(error => {
        console.log(error);
      });

    setInput('');

    console.log('loading done')
  }

  useEffect(() => {
    //  eval(response);

    eval(response);
  }, [response]);
  return (
    
    <div className="quickPrompt">
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
    className="prompt" placeholder="Create a basic .."  type="text" />
    <div className="ask"
    onClick={handlePromptEnter}
    >ask</div>
    <div className="promptSuggestions">
      <div className="suggestion"></div>
      <div className="suggestion"></div>
      <div className="suggestion"></div>
      <div className="suggestion"></div>
    </div>
  </div>
  );

  
};
