'use client'

import React, { useEffect, useRef, useState } from 'react'
import logo from '../images/logo.svg';
import dollar from '../images/icon-dollar.svg'
import person from '../images/icon-person.svg'

const HomePageComponent = () => {

  const [billAmt, setBillAmt] = useState<string>('');
  const [peopleAmt, setPeopleAmt] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [selectedTip, setSelectedTip] = useState<number>(0);
  const [tipPer, setTipPer] = useState<string>('0.00');
  const [totalPer, setTotalPer] = useState<string>('0.00');

  const [activeButton, setActiveButton] = useState<number>(0);
  const [focusOne, setFocusOne] = useState<string>('');
  const [focusTwo, setFocusTwo] = useState<string>('');

  useEffect(() => {

    let tipAmount: string;

    //Calculating the tip
    const calculateTip = () => {
      tipAmount = (((Number(billAmt) * selectedTip) / Number(peopleAmt)).toFixed(2));
      return tipAmount
    }

    //Calculating the total tip per person
    const calculateTotal = () => {
      return (((Number(billAmt) + Number(tipAmount)) / Number(peopleAmt)).toFixed(2));
    }

    if (billAmt && selectedTip && peopleAmt) {
      setTipPer(calculateTip());
      setTotalPer(calculateTotal());
    }
  

    if (billAmt && selectedTip && peopleAmt === '0') {
      setError('Can\'t be Zero');
      setTipPer('0.00');
      setTotalPer('0.00');
    } else {
      setError('');
      setTipPer(calculateTip());
      setTotalPer(calculateTotal());
    }

  }, [billAmt, selectedTip, peopleAmt])


  // Tip ratio selected
  const handleTipSelection = (percentage: number) => {
    setSelectedTip(percentage / 100);
    setActiveButton(percentage);
  }

  // Reseting everything
  const resetCalc = () => {
    setBillAmt('');
    setPeopleAmt('');
    setSelectedTip(0);
    setTipPer('0.00');
    setTotalPer('0.00');
    setActiveButton(0);

    const tipInput = document.getElementById('tipInput') as HTMLInputElement;

    if (tipInput) {
      tipInput.value = '';
      tipInput.placeholder = 'Custom';
    }
  }


  return (

    <main className='min-h-screen bg  gap-4 grid place-items-center'>
      <div className='mt-10'>
        <img src={logo.src} alt='splitter-logo' />
      </div>
      <div className='bg-white p-8 pt-[18px] pb-7 px-6 sm:rounded-3xl rounded-tr-3xl rounded-tl-3xl rounded-br-none rounded-bl-none md:mx-[12rem] customShadow '>
        <div className='grid md:grid-cols-2  gap-4'>
          <div>
            <div className='flex flex-col h-full justify-center'>
              <h1 className="spaceMono mb-2 grayTxt mt-3">Bill</h1>

              <button className='w-full veryLightGC sm:mb-10 mb-8 sm:rounded-md flex justify-between items-center px-4 '>
                <img src={dollar.src} className='icon' />
                <input value={billAmt}  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBillAmt(e.target.value)} type='number' placeholder='0.00' className='w-full bg-transparent spaceMono text-end focus:outline-none focus:border-transparent' />
              </button>


              <p className='grayTxt'>Select Tip %</p>
              <div className='grid grid-cols-2 mt-4 lg:grid-cols-3 gap-2 '>
                <button className={`buttonT1 ${activeButton === 5 ? 'active' : ''}`}  onClick={() => handleTipSelection(5)}>5%</button>

                <button className={`buttonT1 ${activeButton === 10 ? 'active' : ''}`} onClick={() => handleTipSelection(10)}>10%</button>

                <button className={`buttonT1 ${activeButton === 15 ? 'active' : ''}`} onClick={() => handleTipSelection(15)}>15%</button>

                <button className={`buttonT1 ${activeButton === 25 ? 'active' : ''}`} onClick={() => handleTipSelection(25)}>25%</button>

                <button className={`buttonT1 ${activeButton === 50 ? 'active' : ''}`} onClick={() => handleTipSelection(50)}>50%</button>

                <div>
                  <input onClick={() => setActiveButton(0)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTipSelection(parseInt(e.target.value))} type="number" className='w-full text-center buttonT2 focus:outline focus:outline-2 focus:outline-[#26c0ab] hover:cursor-pointer' id='tipInput' placeholder={selectedTip === 0 || 5 || 10 || 25 || 50 ? 'Custom' : ''} />
                </div>
              </div>



              <div className='flex flex-col mt-8 md:flex-row justify-between'>
                <p className='grayTxt'>Number of People</p>
                <p className='error'>{error}</p>
              </div>
              <button className={`w-full veryLightGC mt-2 field sm:mb-10 mb-8 sm:rounded-md rounded-md flex justify-between items-center px-4 ${error ? 'errorOutline' : ''}`}>
                <img src={person.src} className='icon' />
                <input value={peopleAmt} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPeopleAmt(e.target.value)} type='number' placeholder='0' className='w-full bg-transparent spaceMono text-end focus:outline-none focus:border-transparent' />
              </button>

            </div>
          </div>


          <div>
            <div className='veryDCyan py-5 px-5 rounded-xl flex flex-col justify-between h-full'>
              <div className='grid gap-12'>

                <div className='flex justify-between'>
                  <div className='grid justify-start'>
                    <p className='text-white text-sm'>Tip amount</p>
                    <p className='unit'>/ person</p>
                  </div>
                  <div className='display-amt'>
                    <h1>${tipPer}</h1>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='grid justify-start'>
                    <p className='text-white text-sm'>Total</p>
                    <p className='unit'>/ person</p>
                  </div>
                  <div className='display-amt'>
                    <h1>${totalPer}</h1>
                  </div>
                </div>

              </div>
              <div className='flex justify-center mt-12'>
                <button className='rstBtn rounded-md px-5 py-1 w-full' onClick={resetCalc}>RESET</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

  )
}

export default HomePageComponent
