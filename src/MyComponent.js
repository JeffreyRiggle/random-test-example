import React from 'react';
import { SubmitButton } from './SubmitButton';
import restHelper from './restHelper';

export const MyComponent = (props) => {
  const { setShowErrorModal } = props;
  const [foo, setFoo] = React.useState('');
  const [bar, setBar] = React.useState('');
  
  const submitContents = () => {
    restHelper({ foo, bar }, 'POST');
  }
  
  const validateContents = () => {
    if (!foo) {
      setShowErrorModal(true);
      return;
    }
    
    if (!bar) {
      setShowErrorModal(true);
      return;
    }
    
    submitContents();
  }
  
  return (
    <>
        <input type="text" value={foo} onChange={(e) => { setFoo(e.target.value)}} data-testid="fooinput"/>
        <input type="text" value={bar} onChange={(e) => { setBar(e.target.value)}} data-testid="barinput"/>
        <SubmitButton onClick={validateContents} text={'Submit'} />
    </>
  )
}