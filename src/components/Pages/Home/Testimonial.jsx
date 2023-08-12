import React, { useEffect, useState } from 'react'

const Testimonial = () => {
  const [testimonial , setTestimonial] = useState([])

  useEffect(() => {
    fetch('Testemonial.json')
      .then((res) => res.json())
      .then((data) => setTestimonial(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  
  
  return (
    <section className="w-[90%] mx-auto  my-20">
        <div className='text-center'>
            <h2 className='font-medium text-lg text-[#1BBF72] mb-4'>TESTIMONIAL</h2>
            <p className='text-3xl font-bold'>What Says Our Students</p>
        </div>
        <div className='flex flex-col md:flex-row gap-5 my-10'>
        {testimonial.map((single) => (
          <div key={single.id} className='md:w-1/3  w-full '>
          <p className="text-8xl font-bold text-[#1BBF72]">“</p>
          <p className='h-32 md:h-48'>{single.comment}</p>
          <div className='flex items-center gap-5'>
            <img className='w-16 h-16 rounded-full content-center'  src={single.image} alt="" />
            <div>
            <p className='font-bold'>{single.name}</p>
            <p>{single.title}</p>
            </div>
          </div>
        </div>
      ))}
      </div>
        
    </section>
  )
}

export default Testimonial