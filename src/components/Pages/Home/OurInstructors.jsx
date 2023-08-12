import { useEffect, useState } from "react";
// import AwesomeSlider from 'react-awesome-slider';
// import AwsSliderStyles from 'react-awesome-slider/src/styles.scss';
import Marquee from "react-fast-marquee";

function OurInstructors() {
  const [instructors, setInstructors] = useState([]);
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
        console.log(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col text-center justify-center gap-4 items-center">
      <div className="w-full  ">
        <h2 className="font-bold text-4xl ">These Are Our Instructors</h2>
        <p className="py-8 text-slate-400 w-[60%] mx-auto">
        Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
        Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin
        eget tortor risus. Sed porttitor lectus nibh. Praesent sapien massa,
        convallis a pellentesque nec, egestas non nisi. Mauris blandit aliquet
        elit, eget tincidunt nibh pulvinar ultricies ligula sed magna dictum
        porta
        </p>
        {/* <button className="py-2 px-4 bg-[#1BBF72] text-slate-100 font-semibold  ">Instructors</button> */}
      </div>
      
      <Marquee>

        
        {instructors.map((instructor, index) => (




            <div key={index} className="card w-96 bg-base-100 ">
            <figure><img  src={instructor.image}  alt="Instructor" className="h-52" /></figure>
            <div className="card-body">
              <h2 className="card-title">{instructor.name}</h2>
              <p className="text-start">This expert has an extensive list of achievements along all the years.</p>
              
            </div>
            </div>

         
        ))}
        </Marquee>
      
    </div>
  );
}

export default OurInstructors;
