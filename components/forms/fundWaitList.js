import { useForm, ValidationError } from '@formspree/react';
import { PrismicRichText } from '@prismicio/react';
import { useState, useEffect } from 'react';
import countries from '../../utils/countries'
import states from '../../utils/states'
import { SelectForm } from './SelectForm';

function FundWaitListForm({data, description, onClose}) {
  const {formID, successMessage, submitButtonText, closeButtonText} = data
  const [state, handleSubmit] = useForm(formID);//"xvoyzqzb"
  const [showStates, setShowStates] = useState(null)

  function verifyCountry(c) {
      setShowStates(c === "USA")
  }

  if (state.succeeded) {
      return successMessage ?
        <div className='richtext'>
          <PrismicRichText field={successMessage}/>
          <div className='w-full mt-8 xs:mt-12 sm:mt-18 font-lato'>
              <div onClick={onClose} className='border-2 border-white rounded-full pb-1 sm:pb-3 sm:pt-2 lg:py-3 px-4 lg:px-10 flex justify-between items-center cursor-pointer'>
                <span className='bg-transparent border-none outline-0 text-white text-xs lg:text-base block w-max'>{closeButtonText}</span>
                <span className='text-xl 2xl:text-4xl font-thin pb-1'>
                  {">"}
                </span>
              </div>
          </div>
        </div>
        : <p>Thanks for joining!</p>
  }
  
  return (
      <form onSubmit={handleSubmit} className="contactForm flex flex-col">
      <div className='richtext mb-12 lg:mb-16 xxl:mb-20'><PrismicRichText field={description}/></div>
      <InputForm
        uniqueID="name"
        type="text" 
        required={true}
        placeholder='First Name*'
      />
      <InputForm
        uniqueID="lastname"
        type="text" 
        required={true}
        placeholder='Last Name*'
      />
      <SelectForm 
        className={'border rounded-xxl text-jw-turquoise-2 w-full bg-transparent px-5 py-3 outline-none lg:w-96'}
        wrapperClass={'mb-4'}
        openClass={'border-jw-turquoise-2'}
        selectWrapperClass={'rounded-xxl bg-jw-turquoise-2 text-white mt-1 border-white'}
        inputClass={'bg-jw-turquoise-2'}
        uniqueID="country"
        values={countries}
        placeholder="Country*"
        onChange={(v) => verifyCountry(v)}
      />
      {showStates && 
      <SelectForm 
        className={'border rounded-xxl text-jw-turquoise-2 w-full bg-transparent px-5 py-3 outline-none lg:w-96'}
        wrapperClass={'mb-4'}
        openClass={'border-jw-turquoise-2'}
        selectWrapperClass={'rounded-xxl bg-jw-turquoise-2 text-white mt-1 border-white'}
        inputClass={'bg-jw-turquoise-2'}
        uniqueID="state"
        values={states}
        placeholder="State*"
        onChange={(v) => {}}
      />
      }
      <InputForm
        uniqueID="phone"
        type="text" 
        required={true}
        placeholder='Phone*'
      />
      <InputForm
        uniqueID="email"
        type="email" 
        required={false}
        placeholder='Email*'
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <button type="submit" className='t text-jw-green-1 px-5 w-max font-bold text-22 mt-4' disabled={state.submitting}>
       {submitButtonText}
      </button>
    </form>
  );
}

export default FundWaitListForm;

const InputForm = ({uniqueID, type, placeholder, required}) => {

    return (
        <input
            className='border border-white rounded-xxl text-jw-turquoise-2 w-full bg-transparent mb-4 px-5 py-3 outline-none md:w-96'
            id={uniqueID}
            type={type} 
            name={uniqueID}
            required={required}
            placeholder={placeholder}
        />
    );
}