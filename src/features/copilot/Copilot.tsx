import './Copilot.scss';
export function Copilot() {
  return (
    <div className="copilot">
      <div className="chatbox">

        <div className="chatbox__header">
          <div className="chatbox__header__title">Copilot <span>Powery by OpenAI</span>
          </div>
          <div className="chatbox__header__buttons">
            <div className="maximize"></div>
            <div className="minimize"></div>
            <div className="close"></div>

          </div>
        </div>

        <div className="chatbox__messages">
          <div className="messages">
            <div className="message">
            </div>
            <div className="message">
            </div>
            <div className="message">
            </div>
            <div className="message">
            </div>
            <div className="message">
            </div>
          </div>
          <div className="input__message">
            <input type="text" placeholder="Type a message" />
          </div>
        </div>

      </div>
    </div>
  );
}
