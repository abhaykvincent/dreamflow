import { useCallback, useEffect, useState } from 'react';
import { useSelector }    from 'react-redux';
import { debounce}  from 'lodash';
import axios from 'axios';
import Feedback from './Feedback';
import PromptSuggestions from './PromptSuggestions';
import QuickPromptInput from './QuickPromptInput';
import ErrorView from './ErrorView';
import { selectTarget } from '../../features/canvas/canvasSlice';
import { renderCachedResponse, renderCodeSnippet, validateExtractHTMLCSS } from './helper';
import { dynamicPrompt } from './dynamicPrompt';
import './QuickPrompt.scss';

export default function QuickPrompt() {
  const targetID = useSelector(selectTarget);

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([
    {text:'create a layout for calculator'},
    {text:'create a layout for 1 week calendar'},
    {text:'create a todo list  with 6 items'},
  ]);

  const [error, setError] = useState({})as any;
  const [isErrorVisible, setErrorVisible] = useState(false);
  
  const [askFeedback, setAskFeedback] = useState(false);
  const [feedback, setFeedback] = useState({});
  //// Code Snippet Generation
  const handlePrompt = (e: any) => 
  {
    setLoading(true);
    dynamicPrompt.push({role: "user", content: input});
    const API_VANGOUGH_URL = 'http://127.0.0.1:5001/dreamflow-cloud/us-central1/api/van-gough';
    const config = {  
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors',
      params: {
        targetID:targetID,
        messages:dynamicPrompt  
      }
    };
    axios.get(API_VANGOUGH_URL, config)
    .then(response => {
      let responseString = response.data.choices[0].message.content;
      setLoading(false);
      setInput('');
      setFeedback(responseString)
      setAskFeedback(true);
      // Extract HTML and CSS from response
      let { htmlCode, cssCode } = validateExtractHTMLCSS(responseString);
      console.log('responseString', htmlCode, cssCode );
      renderCodeSnippet(htmlCode, cssCode, targetID);
    })
    .catch(error => {
      setError(error);
      setErrorVisible(true);
      setLoading(false);
      setInput('');
      setFeedback({});
      setAskFeedback(false);
      // if API call FAILED; GET a cached response
      renderCachedResponse(targetID);
    });
    }

  return (
    <div className={`quickPrompt ${isVisible? '' : 'hide'}`}>
      <div className="quickPrompt__icon"
        onClick={()=>setIsVisible(!isVisible)}
      >🔮</div>
      <QuickPromptInput  input={input} setInput={setInput}/>
      <div className={`ask ${loading? 'loading' : ''}`} onClick={handlePrompt}>
        { loading? 'Loading...' : 'Generate' }
      </div>
      <PromptSuggestions  suggestions={suggestions} setSuggestions={setSuggestions}  input={input} setInput={setInput}  loading={loading}/>
      <ErrorView error={error} isErrorVisible={isErrorVisible} />
        
      
      <div className="close__icon"
      onClick={()=>setIsVisible(!isVisible)}
      >x</div>
      <div className="clear-localStorage"
      onClick={() => {
        localStorage.removeItem('van-goughResponses');
        // orange color
        console.log("%c Cached Vangough responses Cleared", "color: #ff9800")
      }}
      >
        clear
      </div>
      { askFeedback ? 
        Feedback(feedback, setAskFeedback, setLoading)
        : null 
      }
    </div>
  );
};
// Lines     : 324  -> 270  -> 230  -> 187  -> 121
// Complexity: 51   -> 43   -> 36   -> 30   -> 27
