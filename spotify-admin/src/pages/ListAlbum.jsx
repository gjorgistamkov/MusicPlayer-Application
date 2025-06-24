import React, { use, useState, useEffect } from 'react'
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {

    const [data, setData] = useState([])

    const fetchAlbums = async () => {



        try {
            
            const response = await axios.get(`${url}/api/album/list`);

            if (response.data.success) {
                setData(response.data.albums);
            } else {
                toast.error("Failed to fetch albums. Please try again.");
            }

        } catch (error) {
            toast.error("An error occurred while fetching albums. Please try again.");
        }

    }

    const removeAlbum = async (id) => {
        try {
            
            const response = await axios.post(`${url}/api/album/remove`, { id });

            if (response.data.success) {
                toast.success(response.data.message);
                await fetchAlbums(); // Refresh the album list after deletion
            } else {
                toast.error("Failed to remove album. Please try again.");
            }

        } catch (error) {
            toast.error("An error occurred while removing the album. Please try again.");
        }
    }

    useEffect(() => {
        fetchAlbums();
    
    }, [])

  return (
    <div>
        <p>All Albums List</p>
        <br />
        <div>
            <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                <b>Image</b>
                <b>Name</b>
                <b>Description</b>
                <b>Album Color</b>
                <b>Action</b>
            </div>
            {data.map((item, index) => {
                return (
                    <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                        <img className='w-12' src={item.image}  alt="" />
                        <p>{item.name}</p>
                        <p>{item.desc}</p>
                        <input value={item.bgColour} type="color" disabled />
                        <p onClick={() => removeAlbum(item._id)} className='cursor-pointer'>x</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ListAlbum