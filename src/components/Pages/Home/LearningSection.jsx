
import { useEffect } from 'react';
import  { useState } from 'react'

function LearningSection() {
const [learningOptions, setLearningOptions] = useState([])

 
useEffect(() => {
  fetch('learining.json')
    .then(res => res.json())
    .then(data => {
      setLearningOptions(data);
    });
}, []);


  return (
    <div className='grid md:grid-cols-3 grid-cols-1 gap-4 '>
      {learningOptions.map(learn => (
        <div key={learn.title} className='flex gap-4 items-center'> {/* Added a key prop for each mapped element */}
          <img src={learn.icon} alt="icon" />
          <div className='px-2'>
            <h1 className='text-lg font-bold py-2'>{learn.title}</h1>
            <p>{learn.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LearningSection