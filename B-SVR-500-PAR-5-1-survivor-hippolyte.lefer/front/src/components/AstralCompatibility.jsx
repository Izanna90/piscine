import React, { useState } from 'react';
import Sidebar from './Sidebar';

const compatibilityData= [
    { signs: 'Aries Aries',             compatibility: '50', pros: ['cyan'] },
    { signs: 'Aries Taurus',            compatibility: '38', pros: ['maroon'] },
    { signs: 'Aries Gemini',            compatibility: '83', pros: ['orange', 'pink'] },
    { signs: 'Aries Cancer',            compatibility: '42', pros: ['yellow', 'cyan']},
    { signs: 'Aries Leo',               compatibility: '97', pros: ['orange', 'yellow'] },
    { signs: 'Aries Virgo',             compatibility: '63', pros: ['green', 'blue'] },
    { signs: 'Aries Libra',             compatibility: '85', pros: ['purple'] },
    { signs: 'Aries Scorpio',           compatibility: '50', pros: ['green'] },
    { signs: 'Aries Sagittarius',       compatibility: '93', pros: ['orange', 'yellow', 'pink'] },
    { signs: 'Aries Capricorn',         compatibility: '47', pros: ['cyan', 'blue'] },
    { signs: 'Aries Aquarius',          compatibility: '78', pros: ['black'] },
    { signs: 'Aries Pisces',            compatibility: '67', pros: ['black'] },

    { signs: 'Taurus Taurus',           compatibility: '65', pros: ['black'] },
    { signs: 'Taurus Gemini',           compatibility: '33', pros: ['cyan','maroon'] },
    { signs: 'Taurus Cancer',           compatibility: '97', pros: ['orange','yellow'] },
    { signs: 'Taurus Leo',              compatibility: '73', pros: ['green'] },
    { signs: 'Taurus Virgo',            compatibility: '90', pros: ['orange','blue'] },
    { signs: 'Taurus Libra',            compatibility: '65', pros: ['green'] },
    { signs: 'Taurus Scorpio',          compatibility: '88', pros: ['purple','yellow'] },
    { signs: 'Taurus Sagittarius',      compatibility: '30', pros: ['maroon','cyan'] },
    { signs: 'Taurus Capricorn',        compatibility: '98', pros: ['orange','yellow','blue'] },
    { signs: 'Taurus Aquarius',         compatibility: '58', pros: ['green','cyan'] },
    { signs: 'Taurus Pisces',           compatibility: '85', pros: ['orange','yellow'] },

    { signs: 'Gemini Gemini',           compatibility: '60', pros: ['green','pink'] },
    { signs: 'Gemini Cancer',           compatibility: '65', pros: ['green'] },
    { signs: 'Gemini Leo',              compatibility: '92', pros: ['orange','yellow','purple'] },
    { signs: 'Gemini Virgo',            compatibility: '68', pros: ['cyan','yellow'] },
    { signs: 'Gemini Libra',            compatibility: '93', pros: ['orange','yellow'] },
    { signs: 'Gemini Scorpio',          compatibility: '28', pros: ['maroon','yellow'] },
    { signs: 'Gemini Sagittarius',      compatibility: '60', pros: ['purple','pink'] },
    { signs: 'Gemini Capricorn',        compatibility: '68', pros: ['green','blue'] },
    { signs: 'Gemini Aquarius',         compatibility: '85', pros: ['orange'] },
    { signs: 'Gemini Pisces',           compatibility: '53', pros: ['yellow','pink'] },

    { signs: 'Cancer Cancer',           compatibility: '75', pros: ['black'] },
    { signs: 'Cancer Leo',              compatibility: '35', pros: ['maroon'] },
    { signs: 'Cancer Virgo',            compatibility: '90', pros: ['orange'] },
    { signs: 'Cancer Libra',            compatibility: '43', pros: ['yellow','cyan'] },
    { signs: 'Cancer Scorpio',          compatibility: '94', pros: ['orange','yellow'] },
    { signs: 'Cancer Sagittarius',      compatibility: '53', pros: ['green'] },
    { signs: 'Cancer Capricorn',        compatibility: '83', pros: ['purple','yellow'] },
    { signs: 'Cancer Aquarius',         compatibility: '27', pros: ['maroon'] },
    { signs: 'Cancer Pisces',           compatibility: '98', pros: ['orange','yellow'] },

    { signs: 'Leo Leo',                 compatibility: '45', pros: ['cyan'] },
    { signs: 'Leo Virgo',               compatibility: '35', pros: ['maroon','cyan'] },
    { signs: 'Leo Libra',               compatibility: '97', pros: ['orange'] },
    { signs: 'Leo Scorpio',             compatibility: '58', pros: ['green'] },
    { signs: 'Leo Sagittarius',         compatibility: '93', pros: ['orange','yellow'] },
    { signs: 'Leo Capricorn',           compatibility: '35', pros: ['maroon','cyan'] },
    { signs: 'Leo Aquarius',            compatibility: '68', pros: ['purple','cyan'] },
    { signs: 'Leo Pisces',              compatibility: '38', pros: ['maroon','pink'] },
    
    { signs: 'Virgo Virgo',             compatibility: '65', pros: ['black'] },
    { signs: 'Virgo Libra',             compatibility: '68', pros: ['green'] },
    { signs: 'Virgo Scorpio',           compatibility: '88', pros: ['orange','blue'] },
    { signs: 'Virgo Sagittarius',       compatibility: '48', pros: ['yellow','cyan','pink'] },
    { signs: 'Virgo Capricorn',         compatibility: '95', pros: ['orange','yellow','blue'] },
    { signs: 'Virgo Aquarius',          compatibility: '30', pros: ['maroon'] },
    { signs: 'Virgo Pisces',            compatibility: '88', pros: ['purple','yellow'] },

    { signs: 'Libra Libra',             compatibility: '75', pros: ['black'] },
    { signs: 'Libra Scorpio',           compatibility: '35', pros: ['maroon','cyan'] },
    { signs: 'Libra Sagittarius',       compatibility: '73', pros: ['orange','pink'] },
    { signs: 'Libra Capricorn',         compatibility: '55', pros: ['yellow','cyan'] },
    { signs: 'Libra Aquarius',          compatibility: '90', pros: ['orange','yellow'] },
    { signs: 'Libra Pisces',            compatibility: '88', pros: ['green','blue'] },

    { signs: 'Scorpio Scorpio',         compatibility: '80', pros: ['green','blue','yellow'] },
    { signs: 'Scorpio Sagittarius',     compatibility: '28', pros: ['cyan','maroon'] },
    { signs: 'Scorpio Capricorn',       compatibility: '95', pros: ['orange','blue'] },
    { signs: 'Scorpio Aquarius',        compatibility: '73', pros: ['green','cyan'] },
    { signs: 'Scorpio Pisces',          compatibility: '97', pros: ['orange','yellow'] },

    { signs: 'Sagittarius Sagittarius', compatibility: '45', pros: ['orange','pink','green'] },
    { signs: 'Sagittarius Capricorn',   compatibility: '60', pros: ['pink','green'] },
    { signs: 'Sagittarius Aquarius',    compatibility: '90', pros: ['green'] },
    { signs: 'Sagittarius Pisces',      compatibility: '63', pros: ['yellow','pink'] },

    { signs: 'Capricorn Capricorn',   compatibility: '75', pros: ['green','blue'] },
    { signs: 'Capricorn Aquarius',    compatibility: '68', pros: ['black'] },
    { signs: 'Capricorn Pisces',      compatibility: '88', pros: ['orange','blue','yellow'] },
    
    { signs: 'Aquarius Aquarius',       compatibility: '45', pros: ['cyan'] },
    { signs: 'Aquarius Pisces',         compatibility: '45', pros: ['maroon'] },

    { signs: 'Pisces Pisces',           compatibility: '60', pros: ['black'] },
];

const peopleData = [
    { name: 'Isaac',     zodiacSign: 'Aries',        picture: 'https://thispersondoesnotexist.com/' },
    { name: 'Théo',     zodiacSign: 'Taurus',       picture: 'https://thispersondoesnotexist.com/' },
    { name: 'Dimitri',     zodiacSign: 'Gemini',       picture: 'https://thispersondoesnotexist.com/' },
    { name: 'Tristan',     zodiacSign: 'Cancer',       picture: 'https://media.licdn.com/dms/image/v2/D4E03AQHeU7_HWviOsA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1682351789121?e=2147483647&v=beta&t=MqHielHQwm1khYHweyuMX3-WrNTis1ZReGuqcRvcFE4' },
    { name: 'Sacha',     zodiacSign: 'Leo',          picture: 'https://thispersondoesnotexist.com/' },
    { name: 'Yann',     zodiacSign: 'Virgo',        picture: 'https://thispersondoesnotexist.com/' },
    { name: 'Julien',     zodiacSign: 'Libra',        picture: 'https://thispersondoesnotexist.com/' },
    { name: 'Adrian',     zodiacSign: 'Scorpio',      picture: 'https://sosmissdolittle.com/wp-content/uploads/2024/02/Chauve-souris-scaled-2-1024x681.jpg' },
    { name: 'Nicolas',     zodiacSign: 'Sagittarius',  picture: 'https://thispersondoesnotexist.com/' },
    { name: 'Julideux',     zodiacSign: 'Capricorn',    picture: 'https://thispersondoesnotexist.com/' },
    { name: 'Adrien',     zodiacSign: 'Aquarius',     picture: 'https://thispersondoesnotexist.com/' },
    { name: 'Fromaj',     zodiacSign: 'Pisces',       picture: 'https://thispersondoesnotexist.com/' },
];

const colorLegend = {
    orange: 'Harmonious',
    yellow: 'Great chemistry',
    green: 'Mutual understanding',
    cyan: 'Highly volatile',
    purple: 'Natural partners',
    blue: 'Good work combination',
    pink: 'Low commitment',
    maroon: 'Nothing in common',
    black: 'Could go both ways'
};


export default function Astral() {

    const getBackgroundColor = (compatibility) => {
        const value = parseInt(compatibility, 10);
        const normalizedValue = Math.min(100, Math.max(0, value));
        const red = normalizedValue <= 50 
            ? 255 
            : Math.floor(255 - (normalizedValue - 50) * 5.1);
        const green = normalizedValue <= 50 
            ? Math.floor(normalizedValue * 5.1) 
            : 255;
        return `rgb(${red}, ${green}, 0)`;
    };

    const findCompatibility = (person1, person2, data) => {
        const key1 = `${person1.zodiacSign} ${person2.zodiacSign}`;
        const key2 = `${person2.zodiacSign} ${person1.zodiacSign}`;
        return data.find(entry => entry.signs === key1 || entry.signs === key2);
    };

    const PersonSelector = ({ person, onChange }) => {
        const handlePrevClick = () => {
            const currentIndex = peopleData.indexOf(person);
            const prevIndex = (currentIndex - 1 + peopleData.length) % peopleData.length;
            onChange(peopleData[prevIndex]);
        };

        const handleNextClick = () => {
            const currentIndex = peopleData.indexOf(person);
            const nextIndex = (currentIndex + 1) % peopleData.length;
            onChange(peopleData[nextIndex]);
        };

        return (
            <div className='flex items-center m-auto p-4 w-fit h-fit'>
                <button onClick={handlePrevClick} className='p-2 bg-[#606060]'>
                    &lt;
                </button>
                <div className='p-8 flex flex-col items-center justify-center bg-[#AAAAAA]'>
                    <img src={person.picture} alt={person.name} className='w-24 h-24 rounded-full mb-2' />
                    <span className='text-2xl'>{person.name}</span>
                    <span className='text-md'>{person.zodiacSign}</span>
                </div>
                <button onClick={handleNextClick} className='p-2 bg-[#606060]'>
                    &gt;
                </button>
            </div>
        );
    };

    const [person1, setPerson1] = useState(peopleData[0]);
    const [person2, setPerson2] = useState(peopleData[0]);
    const match = findCompatibility(person1, person2, compatibilityData);

    return (
        <div className='flex h-screen w-screen'>
            <Sidebar />
            <div className='h-full w-full m-auto text-center p-8'>
                <h1 className='text-2xl text-left mb-4'>Astral Compatibility</h1>
                <hr className='border-solid border-t-2 p-4 border-black' />
                <div className='mb-4 grid grid-cols-2'>
                    <PersonSelector person={person1} onChange={setPerson1} />
                    <PersonSelector person={person2} onChange={setPerson2} />
                </div>
                {match && (
                    <>
                        <div className='p-8 w-2/5 m-auto border-2 border-black' style={{ backgroundColor: getBackgroundColor(match.compatibility) }}>
                            <h2 className='text-4xl'>{match.compatibility}%</h2>
                        </div>
                        {match.pros && match.pros.length > 0 && (
                            <>
                                {match.pros.map((color, index) => (
                                    <div key={index} className='flex items-center justify-center mt-2'>
                                        <span 
                                            className='w-4 h-4 rounded-full mr-2'
                                            style={{ backgroundColor: color }}
                                        />
                                        <span className='text-l'>{colorLegend[color]}</span>
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}