import React from 'react';

const Modal = (props) => {
  return (
    <div id={`${props.type}Modal`}>
      <div id={`${props.type}ModalContent`}>
        <span className="close" onClick={() => { props.modalUp() }}>&times;</span>
        {
          props.type === 'question' ?
          <div>
            <h2>Ask Your Question</h2>
            <h3>About the {props.product}</h3>
            <div>
              Your question:
            </div>
            <textarea id="questionBody" maxLength="1000" rows="5" cols="33" placeholder="Why did you like the product or not?" value={props.body} onChange={(e) => { props.textChange(e) }}></textarea>
          </div>

          :

          <div>
            <h2>Submit Your Answer</h2>
            <h3>{props.product}: {props.question}</h3>
            <div>
              Your answer:
            </div>
            <textarea id="answerBody" maxLength="1000" rows="5" cols="33" placeholder="Why did you like the product or not?" value={props.body} onChange={(e) => { props.textChange(e) }}></textarea>
          </div>
        }

        <div>
          Nickname:
          <input type="text" id="nickname" maxLength="60" placeholder={props.type === 'question' ? 'Example: jackson11!' : 'Example: jack543!'} value={props.name} onChange={(e) => { props.textChange(e) }} />
        </div>
        <div>For privacy reasons, do not use your full name or email address.</div>

        <div>
          E-mail:
          <input type="text" id="email" maxLength="60" placeholder="sample@email.com" value={props.email} onChange={(e) => { props.textChange(e) }} />
        </div>
        <div>For authentication reasons, you will not be emailed.</div>

        {
          props.type === 'answer' ?
          <div>
            ADD PHOTO UPLOAD
          </div>

          :

          <>
          </>
        }

        <button onClick={() => { props.submit() }}>Submit {props.type === 'question' ? 'Question' : 'Answer'}</button>
      </div>
    </div>
  )
}

export default Modal;