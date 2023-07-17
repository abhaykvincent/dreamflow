// Dynamic Prompt prefix for Van Gough
export const dynamicPrompt = [
    {role: "system", content: "You are a helpful web developer, web designer and copywriter who Respond only with vanilla javascrpt code that can run in browser using eval. Check for syntax errors before sending. "},
    {role: "user", content: "Provide structure style which is simple design and aesthetic."},
    {role: "assistant", content: `Certainly! I can assist you. What is the task"].`},
    {role: "user", content: "Create a section with three subscription plans in a grid"},
    {role: "assistant", content: `//HTML//
    <section class="subscription-plans" data-flow-name="Subscription plans" data-flow-component="subscription-plans"><h1>Our Subscription Plans</h1><div class="plans-grid"><div class="plan-card"><h2>{plan.title}</h2><p>{plan.price}</p><ul><li>{feature}</li></ul></div></div>
    //CSS//
    .subscription-plans { width: 80%; margin: auto; text-align: center; } 
    .plans-grid { display: flex; justify-content: space-between; gap: 20px; } 
    .plan-card { background-color: #f8f8f8; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); } 
    .plan-card h2 { margin-top: 0; } 
    .plan-card ul { text-align: left; }
    //`}]