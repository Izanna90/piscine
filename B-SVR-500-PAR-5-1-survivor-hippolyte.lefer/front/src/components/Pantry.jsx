import React, { useState } from 'react';
import Sidebar from './Sidebar';

const clothingItems = {
    hats: [
        { id: '1', picture: 'https://m.media-amazon.com/images/I/71OsbIECe0L._AC_SL1200_.jpg' },
        { id: '2', picture: 'https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg' },
        { id: '3', picture: 'https://i.etsystatic.com/36212092/r/il/80a8a0/4128746471/il_794xN.4128746471_f8vn.jpg' }
        ],
    tops: [
        { id: '42', picture: 'https://m.media-amazon.com/images/I/61s0i2pcXYS.__AC_SX300_SY300_QL70_ML2_.jpg' },
        { id: '5', picture: 'https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg' },
        { id: '6', picture: 'https://i.ebayimg.com/images/g/TSgAAOSwxVtjv~sJ/s-l1600.webp' }
        ],
    bottoms: [
        { id: '7', picture: 'https://www.cdiscount.com/pdt2/8/3/6/1/700x700/mp11773836/rw/pantacourt-homme-en-jeans-stretch-slim-fit-5-poche.jpg' },
        { id: '8', picture: 'https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg' },
        { id: '9', picture: 'https://ih1.redbubble.net/image.1658855464.6496/ur,socks_female_back_medium,tall_portrait,750x1000-bg,f8f8f8.4.jpg' }
        ]
};


export default function Pantry() {

    const ClothingSlot = ({ items, selectedIndex, onPrevious, onNext }) => (
        <div className='flex items-center'>
            <button onClick={onPrevious} className='p-2 bg-[#606060]'>&lt;</button>
            <div className='w-fit h-fit p-1 flex items-center justify-center bg-[#AAAAAA] mx-2'>
                <img src={items[selectedIndex].picture} alt={items[selectedIndex].name} className='w-40 h-40' />
            </div>
            <button onClick={onNext} className='p-2 bg-[#606060]'>&gt;</button>
        </div>
    );
    const [topIndex, setTopIndex] = useState(0);
    const [bottomIndex, setBottomIndex] = useState(0);
    const [hatIndex, setHatIndex] = useState(0);

    const handlePreviousHat = () => setHatIndex((prevIndex) => (prevIndex - 1 + clothingItems.hats.length) % clothingItems.hats.length);
    const handlePreviousTop = () => setTopIndex((prevIndex) => (prevIndex - 1 + clothingItems.tops.length) % clothingItems.tops.length);
    const handlePreviousBottom = () => setBottomIndex((prevIndex) => (prevIndex - 1 + clothingItems.bottoms.length) % clothingItems.bottoms.length);
    
    const handleNextHat = () => setHatIndex((prevIndex) => (prevIndex + 1) % clothingItems.hats.length);
    const handleNextTop = () => setTopIndex((prevIndex) => (prevIndex + 1) % clothingItems.tops.length);
    const handleNextBottom = () => setBottomIndex((prevIndex) => (prevIndex + 1) % clothingItems.bottoms.length);

    return (
        <div className='flex h-screen w-screen'>
            <Sidebar />
            <div className=' h-full w-full m-auto text-center p-8'>
                <h1 className='text-2xl mb-4 text-left'>Pantry</h1>
                <hr className='border-solid border-t-2 p-1 border-black mb-4' />
                <div className='mb-4 flex items-center justify-center px-4'>
                    <ClothingSlot
                        items={clothingItems.hats}
                        selectedIndex={hatIndex}
                        onPrevious={handlePreviousHat}
                        onNext={handleNextHat}
                    />
                </div>
                <div className='mb-4 flex items-center justify-center px-4'>
                    <ClothingSlot
                        items={clothingItems.tops}
                        selectedIndex={topIndex}
                        onPrevious={handlePreviousTop}
                        onNext={handleNextTop}
                    />
                </div>
                <div className='mb-4 flex items-center justify-center px-4'>
                    <ClothingSlot
                        items={clothingItems.bottoms}
                        selectedIndex={bottomIndex}
                        onPrevious={handlePreviousBottom}
                        onNext={handleNextBottom}
                    />
                </div>
            </div>
        </div>
    );
}
