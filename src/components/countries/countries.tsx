import { useContext, useEffect, useState } from 'react';
import './countries.scss';
import { FaSearch } from 'react-icons/fa';

import { ThemeContext, ThemeProvider } from '../../ThemeProvider';
import { Link } from 'react-router-dom';
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
    const [selectedRegion, setSelectedRegion] = useState(''); // Region filter state
    const themeContext = useContext(ThemeContext);
    const { theme, elementColor } = themeContext;
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
    // Filter countries based on search and region
    useEffect(() => {
        if (countries) {
            const filtered = countries.filter((country) => {

                return selectedRegion === '' || country.region === selectedRegion;
            });
            setFilteredcountries(filtered);
        }
    }, [selectedRegion, countries]);
    return (
        <div className=''>

            <div className=" search-row flex justify-between mb-8 ">
                <div className="  relative w-1/3" >
                    <div className="seatch-icon">
                        <FaSearch className="text-gray-400 text-sm" />
                    </div>
                    <input
                        type="text"
                        className=" searchbar "
                        placeholder="           Search for a country..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        style={{ backgroundColor: elementColor }}
                    />
                    {/* <Search className="absolute left-3 top-2.5 text-gray-400" size={20} /> */}
                </div>
                <select className=" region-select px-4 py-2 rounded-md" style={{ backgroundColor: elementColor }} onChange={(e) => setSelectedRegion(e.target.value)}>
                    <option value="" disabled>Filter by Region</option>

                    <option>Africa</option>
                    <option>America</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                </select>
            </div>
            <div className="countries-grid">
                {filteredcountries ? (
                    filteredcountries.map((country, index) => (
                        <Link to={`/country/details/${country.name}`}>
                            <div key={index} className="country p-4 bg-white shadow rounded-md">

                                <img src={country.flags.png} alt={`${country.name} flag`} className="w-full h-auto" />
                                <h2 className="text-lg font-bold mt-2">{country.name}</h2>
                                <p>Population: {country.population}</p>
                                <p>Region: {country.region}</p>
                                <p>Capital: {country.capital}</p>

                            </div></Link>

                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>

        </div >
    );
};

export default Countries;
