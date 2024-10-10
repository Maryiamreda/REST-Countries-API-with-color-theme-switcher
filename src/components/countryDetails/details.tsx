import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ThemeContext } from "../../ThemeProvider";
import './details.scss';
type Country = {
    name: string;
    region: string;
    capital: string;
    subregion: string;
    population: number;
    nativeName: string;
    topLevelDomain: string[];
    currencies: { name: string }[];
    languages: { name: string }[];
    flags: { png: string };
    borders: string[];
};

const Details = () => {
    const { name } = useParams<{ name: string }>();
    const [country, setCountry] = useState<Country | null>(null);
    const themeContext = useContext(ThemeContext);
    const { theme, elementColor } = themeContext;
    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data: Country[]) => {
                const foundCountry = data.find(c => c.name.toLowerCase() === name?.toLowerCase());
                setCountry(foundCountry || null);
            });
    }, [name]);

    if (!country) return <div>Loading...</div>;

    return (
        <div className="container">
            <Link to={"/"}>
                <div style={{ backgroundColor: elementColor }}
                    className="btn inline-flex gap-2 p-10 ">

                    <FaArrowLeftLong />
                    <span>Back</span>

                </div>
            </Link>
            <div className=" country-details ">
                <img src={country.flags.png} alt={`${country.name} flag`} className="w-1/3" />
                <div className="info">
                    <h1 style={{ fontWeight: "800", paddingBottom: "2rem" }} className="">{country.name}</h1>
                    <div className="country-info" style={{ fontSize: "15px" }}>
                        <div style={{ display: "flex", flexDirection: "column" }} >
                            <div style={{ display: "inline-flex" }} ><strong>Native Name:</strong><p style={{ opacity: "0.7" }} >{country.nativeName}</p> </div>

                            <div style={{ display: "inline-flex", gap: "5px" }}><strong>Population:</strong> <p style={{ opacity: "0.7" }} >{country.population.toLocaleString()}</p> </div>
                            <div style={{ display: "inline-flex", gap: "5px" }}><strong>Region:</strong> <p style={{ opacity: "0.7" }} >{country.region}</p> </div>
                            <div style={{ display: "inline-flex", gap: "5px" }}><strong>Sub Region:</strong> <p style={{ opacity: "0.7" }} >{country.subregion}</p> </div>
                            <div style={{ display: "inline-flex", gap: "5px" }}><strong>Capital:</strong> <p style={{ opacity: "0.7" }} >{country.capital}</p> </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }} >
                            <div style={{ display: "inline-flex", gap: "5px" }}><strong>Top Level Domain:</strong> <p style={{ opacity: "0.7" }} > {country.topLevelDomain.join(', ')}</p></div>
                            <div style={{ display: "inline-flex", gap: "5px" }}><strong>Currencies:</strong> <p style={{ opacity: "0.7" }} >{country.currencies.map(c => c.name).join(', ')}</p></div>
                            <div style={{ display: "inline-flex", gap: "5px" }}><strong>Languages:</strong> <p style={{ opacity: "0.7" }} >{country.languages.map(l => l.name).join(', ')}</p></div>
                        </div>
                    </div>
                    <div className="border-countries">
                        <strong>Border Countries:</strong>
                        <div className="flex gap-2 mt-2">
                            {country.borders && country.borders.map(border => (
                                <div key={border} style={{ backgroundColor: elementColor }} className="border-country-item">{border}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;