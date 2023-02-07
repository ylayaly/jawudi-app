import { useState, useRef } from 'react';

export function SelectForm({ uniqueID, values, placeholder, onChange, className, wrapperClass, openClass, selectWrapperClass, inputClass, showSearch = true, optionClass = "py-2", minHeight = "max-h-64", leadingClass="leading-6 lg:leading-8 2xl:leading-[3rem]", except, children }) {
  const [value, setValue] = useState(undefined);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  values.map(v => {
    v.show = true;
    if(v.currencyCode){
      v.show = v.currencyCode !== except;
    }
    
    return v;
  });
  const [options, setOptions] = useState(values);

  function openDrop(v) {
    setOpen(v);
    if (v) {
      dropdownRef.current.focus();
    }
  }

  function closeDrop(ev) {
    if (!(ev && ev.relatedTarget && ev.relatedTarget.id && (ev.relatedTarget.id === "searchInput"+uniqueID || ev.relatedTarget.id === "jw-select"+uniqueID))) {
      setOpen(false);
    }
  }

  function filter(ev) {
    let val = ev.target.value;
    val = val.toLowerCase();
    var op = values.filter(v => {
      return v.name.toLowerCase().includes(val);
    });
    setOptions(op);
  }

  return (
    <div id={"jw-select"+uniqueID} className={`relative ${wrapperClass}`} ref={dropdownRef} tabIndex={-1} onBlur={(ev) => closeDrop(ev)}>
      <select id={uniqueID}
        name={uniqueID}
        className="hidden"
        value={value}
      >
        <option value={""}>Select one</option>
        {options.map((v, key) => {
          return <option key={key} value={v.name}>{v.name}</option>;
        })}
      </select>
      <div onClick={() => openDrop(!open)} className={`relative jw-select ${className} ${open ? openClass+' open' : 'border-white'}`}>
        <span className={`block pr-4 xs:pr-8 lg:pr-12 ${leadingClass}`}>{value ? value : placeholder}</span>
      </div>
      <div className={`absolute z-10 left-0 right-0 top-full w-full overflow-auto shadow-lg focus:outline-none transition-all jw-dropdown ${selectWrapperClass} ${open ? minHeight+' border' : 'max-h-0'} `}>
        {showSearch && <div className={`px-5 sticky top-0 ${inputClass}`}>
          <input id={"searchInput"+uniqueID} onKeyUp={(ev) => filter(ev)} placeholder="Search" className='searchInput bg-transparent border-b border-white pt-3 pb-2 outline-none w-full' type="text" />
        </div>}
        <ul className='py-1'>
          {options.map((v, key) => {
            return (
              v.show && <li key={key} data-show={v.show} className={`${optionClass} px-5 cursor-pointer hover:bg-jw-dark-blue/40 ${value === v.name && 'bg-jw-dark-blue/70'}`} onClick={(ev) => { setValue(v.name); onChange(v), closeDrop(ev); }}>{v.name}</li>
            );
          })}
        </ul>
        {children}
      </div>
    </div>
  );
}