import { useForm, ValidationError } from '@formspree/react';
import { PrismicRichText } from '@prismicio/react';

function ContactForm({data}) {
  const {formID, successMessage, submitButtonText} = data
  const [state, handleSubmit] = useForm(formID);//"xvoyzqzb"
  
  if (state.succeeded) {
      return successMessage ?
        <PrismicRichText field={successMessage}/>
        : <p>Thanks for joining!</p>
      
  }
  return (
      <form onSubmit={handleSubmit} className="contactForm flex flex-col">
      <InputForm
        uniqueID="name"
        type="text" 
        placeholder='Your Full Name*'
      />
      <InputForm
        uniqueID="email"
        type="email" 
        placeholder='Your Email*'
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <InputForm
        uniqueID="phone"
        type="text" 
        placeholder='Your Phone Number*'
      />
      <InputForm
        uniqueID="device"
        type="text" 
        placeholder='Your Device Type'
      />
      <textarea
        id="message"
        name="message"
        placeholder='How may we help you?'
        rows="4"
        className='border border-white rounded-xxl text-jw-turquoise-2 w-full xxl:w-3/5 bg-transparent mb-4 px-7 py-3 outline-none'
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" className='t text-jw-green-1 px-7 w-max font-bold text-22 mt-4' disabled={state.submitting}>
       {submitButtonText}
      </button>
    </form>
  );
}

export default ContactForm;

const InputForm = ({uniqueID, type, placeholder}) => {

    return (
        <input
            className='border border-white rounded-xxl text-jw-turquoise-2 w-full md:w-1/2 xxl:w-1/3 bg-transparent mb-4 px-7 py-3 outline-none'
            id={uniqueID}
            type={type} 
            name={uniqueID}
            placeholder={placeholder}
        />
    );
}