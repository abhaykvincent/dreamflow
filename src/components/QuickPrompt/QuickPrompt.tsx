import React, { useEffect, useState } from 'react';
import './QuickPrompt.scss';
import axios from 'axios';
import { cssNumber } from 'jquery';
import { useSelector } from 'react-redux';
import { selectTarget, updateCanvasHTML } from '../../features/canvas/canvasSlice';
import { useAppDispatch } from '../../app/hooks';

export default function QuickPrompt() {

  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [prompt, setPrompt] = useState({});
  const [response, setResponse] = useState(``);
  const [suggestions, setSuggestions] = useState([
    {text:'create a layout for calculator'}
  ]);
  const targetID = useSelector(selectTarget);
  const dynamicPrompt = [
    {role: "system", content: "You are a helpful web developer, web designer and copywriter. respond with js code to create what asked for"},
    {role: "user", content: "Provide style which is simple design and aesthetic , No text response other than // comment"},
    {role: "assistant", content: "Elements will be appended to this canvas. Code should be written in vanilla js and embedded in |||...|||"},
    {role: "user", content: "Create a section with three subscription plans in a grid"},
    {role: "assistant", content: `|||// Define the plan data in an array of objects
    const plansData = [
      {
        title: 'Basic Plan',
        price: '$9.99/month',
        features: ['Access to basic features', 'Single user account']
      },
      {
        title: 'Pro Plan',
        price: '$19.99/month',
        features: ['Access to all features', 'Up to 5 user accounts']
      },
      {
        title: 'Enterprise Plan',
        price: 'Contact us for pricing',
        features: ['Custom features and integrations', 'Unlimited user accounts']
      },
    ];
    
    // Create the main section element
    const section = document.createElement('section');
    section.className = 'subscription-plans';
    
    // Create the heading
    const h1 = document.createElement('h1');
    h1.textContent = 'Our Subscription Plans';
    section.appendChild(h1);
    
    // Create the grid container
    const grid = document.createElement('div');
    grid.className = 'plans-grid';
    section.appendChild(grid);
    
    // Create each plan card
    for (const plan of plansData) {
      const card = document.createElement('div');
      card.className = 'plan-card';
    
      const h2 = document.createElement('h2');
      h2.textContent = plan.title;
      card.appendChild(h2);
    
      const p = document.createElement('p');
      p.textContent = plan.price;
      card.appendChild(p);
    
      const ul = document.createElement('ul');
      for (const feature of plan.features) {
        const li = document.createElement('li');
        li.textContent = feature;
        ul.appendChild(li);
      }
      card.appendChild(ul);
    
      grid.appendChild(card);
    }
    
    // Append the section to the body (or another container element)
    const target = document.querySelector('[data-flow-id="${targetID}"]');
    target.appendChild(section);

    // Define your CSS as a string
let cssString = '.subscription-plans { width: 80%; margin: auto; text-align: center; } .plans-grid { display: flex; justify-content: space-between; gap: 20px; } .plan-card { background-color: #f8f8f8; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); } .plan-card h2 { margin-top: 0; } .plan-card ul { text-align: left; }';


// Create a new style element
let styleElement = document.createElement("style");

// Set its content to the CSS string
styleElement.textContent = cssString;

// Append the style element to the head of the document
    document.head.appendChild(styleElement);|||`},
    /* {role: "user", content: "Create a login page with a form that has a username input and a submit button"},
    {role: "assistant", content: `|||// Create an HTML element
    let mainElement = document.createElement('main');
    
    // Create a form
    let formElement = document.createElement('form');
    formElement.action = "/login";
    formElement.method = "post";
    
    // Create a label for username
    let usernameLabel = document.createElement('label');
    usernameLabel.for = "username";
    usernameLabel.textContent = "Username:";
    
    // Create an input for username
    let usernameInput = document.createElement('input');
    usernameInput.type = "text";
    usernameInput.id = "username";
    usernameInput.name = "username";
    usernameInput.required = true;
    
    // Append the label and input to the form
    formElement.appendChild(usernameLabel);
    formElement.appendChild(usernameInput);
    
    // Append the form to the main element
    mainElement.appendChild(formElement);
    
    // Append the main element to the body
    const target = document.querySelector('[data-flow-id="${targetID}"]');
    target.appendChild(mainElement);
    
    // Create a style element
    let styleElement = document.createElement('style');
    styleElement.textContent = "
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            line-height: 1.6;
        }
        main {
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
        }
        form {
            background: #fff;
            padding: 20px;
            box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.1);
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input[type="text"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
    ";
    
    // Append the style to the head
    document.head.appendChild(styleElement);|||`}, */
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


  const completions = (input: string) => {
    const url = 'http://127.0.0.1:5001/dreamflow-cloud/us-central1/api/monalisa';
    const config = {  
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
      params: {
        prompt:input
      }
    };
    axios.get(url, config)
      .then(response => {
        console.log(response.data);
        setSuggestions(response.data);
      }
      )
      .catch(error => {
        //console.log(error);
      });
  }
    

  useEffect(() => {
    try{
      eval(response);
      dispatch(updateCanvasHTML());

    }catch(error:any){
      console.log(error);
      console.log(error.name);
      console.log(error.message);
      console.log(error.stack);
    }
  }, [response]);

  // prompt commpletion helper
  useEffect(() => {
    // if input ends with a space or the current word  has more than 3 characters ,then prompt completion is needed
    if (input.endsWith(' ') || (input.split(' ').pop()?.length ?? 0) > 3) {
      completions(input);
    }
  }, [input]);
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
      {
        suggestions.map((suggestion: any,i) => (
          <div key={i} className="suggestion"
          onClick={() => setInput(input.substring(0,input.lastIndexOf(' ')+1)+suggestion.text)}
          >{suggestion.text}</div>
        ))
      }
    </div>
  </div>
  );

  
};
