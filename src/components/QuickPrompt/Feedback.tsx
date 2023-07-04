// CACHE Van Gough's response
const  cacheVanGoughResponse = (response: any) => {
  let vanGoughResponsesString = localStorage.getItem('van-goughResponses');
  if(vanGoughResponsesString === null){
    vanGoughResponsesString = JSON.stringify([response]);
  }
  else{
    let vanGoughResponses = JSON.parse(vanGoughResponsesString);
    vanGoughResponses.push(response);
    vanGoughResponsesString = JSON.stringify(vanGoughResponses);
  }
  localStorage.setItem('van-goughResponses', vanGoughResponsesString);
}
export default function Feedback(feedback: {}, setAskFeedback:any, setLoading:any) {
    return <div className="feedback">
      <div className="thumbs-up">
        <div className="icon"
          onClick={() => {
  
            cacheVanGoughResponse(feedback);
            setAskFeedback(false);
            setLoading(false);
  
          } }
        >👍</div>
      </div>
      <div className="thumbs-down">
        <div className="icon"
          onClick={() => {
            setAskFeedback(false);
            setLoading(false);
          } }
        >👎</div>
      </div>
    </div>;
  }