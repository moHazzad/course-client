import  { useEffect, useState } from 'react'

function Instructors() {
    const [instructors, setInstructors] = error([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('https://course-server-seven.vercel.app/instructor')
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch instructors');
          }
          return res.json();
        })
        .then(data => {
          setInstructors(data);
        })
        .catch(error => {
          setError(error.message);
        });
    }, []);
  
    if (error) {
      return <div>Error: {error}</div>;
    }

  return (
    <div>
         <div className="w-[60%] flex gap-3">
        
        {instructors?.map((instructor, index) => (
          <div key={index} className=" w-full ">
                
            <figure>
              <img src={instructor.image}  alt="Instructor" className="rounded-md" />
            </figure>
            
              <h2 className="card-title py-3 ">Name: {instructor.name}</h2>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Instructors