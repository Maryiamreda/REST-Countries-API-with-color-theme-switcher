import { useEffect, useState } from 'react';
import data from '../../../public/data.json';


// Define the country type
type Country = {
    name: string,
    population: number,
    region: string, // Corrected the spelling
    capital: string,
    flags: {
        png: string
    }
};

const Countries = () => {
    const [countries, setCountries] = useState<Country[] | null>(null); // Expecting an array of countries
    const [filteredcountries, setFilteredcountries] = useState<Country[] | null>(null);
    const [searchValue, setSearchValue] = useState(''); // Search input state

    useEffect(() => {
        fetch('/data.json') // Ensure correct path if using public folder
            .then((response) => response.json())
            .then((data) => {
                setCountries(data);
                setFilteredcountries(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    useEffect(() => {
        if (countries) {
            const filtered = countries.filter((country) => {
                // Check if the country name includes the search value
                return country.name.toLowerCase().includes(searchValue.toLowerCase());
            });
            // Set the filtered countries
            setFilteredcountries(filtered);
        }
    }, [searchValue, countries]); // Include 'countries' as a dependency
    return (
        <div className=''>

            <div className="flex justify-between mb-8">
                <div className="relative w-1/3">
                    <input
                        type="text"
                        className=" searchbar  rounded-md"
                        placeholder="Search for a country..."
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    {/* <Search className="absolute left-3 top-2.5 text-gray-400" size={20} /> */}
                </div>
                <select className=" px-4 py-2 rounded-md">
                    <option >Filter by Region</option>
                    <option>Africa</option>
                    <option>America</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                </select>
            </div>






            {filteredcountries ? (
                <div className='grid grid-cols-4 gap-4'>
                    {filteredcountries.map((country, index) => (
                        <div key={index} className="country border p-4 rounded-md shadow-md">
                            <img src={country.flags.png} alt={`${country.name} flag`} className='w-full h-32 object-cover' />
                            <h2 className='font-bold text-lg mt-2'>{country.name}</h2>
                            <p>Population: {country.population.toLocaleString()}</p>
                            <p>Region: {country.region}</p>
                            <p>Capital: {country.capital}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Countries;
