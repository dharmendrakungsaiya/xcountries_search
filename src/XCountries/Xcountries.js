import React, { useEffect, useState } from 'react';
import '../XCountries/XCountries.css';

const CountryCard = ({name, flagImg}) => {
    return(
        <div className='countryCard'>
            <img src={flagImg} alt='No image exists' className='img'/>
            <h2>{name}</h2>
        </div>
    )
}



const Countries = () => {
    const API_URL = 'https://restcountries.com/v3.1/all';

    const [country, setCountry] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch(API_URL);
                const data = await res.json()
                setCountry(data);
                console.log(data);
            } catch (error) {
                console.log("No data found", error);
            }
        }
        fetchCountries();
    },[])

     const handleSearch = (e) => {
        setSearch(e.target.value);
     }

     const filterCountry = () => {
        if (!search) {
            return country;
        }
        return country.filter(country => 
            country.name.common.toLowerCase().includes(search.toLowerCase())
        );
    };
     const filteredCountries = filterCountry();

    return(
        <div className='wrapper'>
       <input type='text' placeholder='Search for countries' value={search} onChange={handleSearch} className='input'/>
        <div className='container'>
                        

        {filteredCountries.length > 0 ? (
                    filteredCountries.map(country => (
                        <CountryCard
                            key={country.name.common}
                            name={country.name.common}
                            flagImg={country.flags.png}
                        />
                    ))
                ) : (
                    null
                )}
        </div>
        </div>
        
    )
}


export default Countries;