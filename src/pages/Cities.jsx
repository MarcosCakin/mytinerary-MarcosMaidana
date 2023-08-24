import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "../components/NotFound";

const Cities = () => {

  const [cities, setCities] = useState([]);

  useEffect(() => {
    scroll(0,0)
    axios.get('http://localhost:8000/api/cities')
      .then(response => setCities(response.data.cities))
      .catch(err => console.log(err))
  }, []);

    const handleInputChange = async (city) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cities?city=${city.target.value}`)
        setCities(response.data.cities)
      } catch (error) {
        console.log(error)
      }
    };

  return (
    <section id="cities" className="bg-darkLight text-light flex flex-col items-center text-center">

      <h1 className="pt-8 font-semibold text-2xl">THE MOST SOUGHT AFTER DESTINATIONS BY TRAVELERS</h1>
      <input onChange={handleInputChange} className='text-dark border-2 border-gray-700 rounded-md py-1 mt-8 px-2 w-3/4 md:w-1/3' type="text" placeholder='Buscar' />
      <div className="flex justify-center flex-wrap md:space-x-4 md:justify-around">
            { cities?.length > 0 ? 
            cities?.map((city) => {
                    return (
                        <Link key={city._id} to={`/cities/${city._id}`}>
                            <Card city={city.city} description={city.description} country={city.country} image={city.image}/>
                        </Link>
                    )
                }) : <NotFound />
              }
      </div>
    </section>  
  )
}

export default Cities;