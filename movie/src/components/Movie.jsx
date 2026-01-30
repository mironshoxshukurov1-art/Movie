import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { IoSearch } from 'react-icons/io5';
import { RiMovie2Fill } from 'react-icons/ri';
import { TailSpin } from 'react-loader-spinner';

export default function Movie() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const getData = async () => {
        if (!search) return;
        setLoading(true);
        try {
            const res = await axios.get(`http://www.omdbapi.com/?apikey=3b3e3958&s=${search}&page=${page}`);
            if (res.data.Response === "True") {
                setData(res.data.Search);
                setTotalResults(parseInt(res.data.totalResults));
            } else {
                setData([]);
                setTotalResults(0);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    // Sahifa o'zgarganda avtomatik qidirish
    useEffect(() => {
        if (search) getData();
    }, [page]);

    // Form yuborilganda (Enter bosilganda)
    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        getData();
    };

    return (
        <div className='min-h-screen bg-slate-950 text-slate-200 font-sans pb-20'>
            {/* Header / Search Section */}
            <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-6 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <h1 className='text-3xl font-black tracking-tighter text-yellow-500 italic'>
                        CINE<span className='text-white'>FLIX</span>
                    </h1>
                    
                    <form onSubmit={handleSubmit} className="relative w-full max-w-lg group">
                        
                        <input 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            type="text" 
                            placeholder="Search movies, series..."
                            className='w-full bg-slate-900 border border-slate-700 rounded-full py-3 px-6 pl-12 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all text-white' 
                        />
                        <IoSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-500 text-xl' />
                        <button type="submit" className='absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-4 py-1.5 rounded-full font-bold text-sm transition-colors'>
                            Search
                        </button>
                    </form>
                    {/* extra things */}
             {/* Asosiy konteynerga 'relative' beramiz */}
<div className="grid grid-cols-2 gap-20 pr-5">
    <details className="group relative cursor-pointer bg-slate-900 border border-slate-800 rounded-xl transition-all duration-300 w-48 shadow-lg">
  
  <summary className="flex items-center justify-between list-none p-3 font-semibold text-white hover:bg-slate-800 transition-colors rounded-xl">
    <div className="flex items-center gap-2 text-sm">
      <BiCategoryAlt className="text-lg text-yellow-500" />
      <span>Genres</span>
    </div>
    <svg 
      className="w-4 h-4 text-gray-400 transition-transform duration-300 group-open:rotate-180" 
      fill="none" viewBox="0 0 24 24" stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </summary>

  {/* 'absolute' klassi header balandligini saqlab qoladi */}
  <div className="absolute left-0 top-full mt-2 w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
    {["Action", "Comedy", "Horror", "Thriller", "Sci-Fi", "Drama"].map((genre) => (
      <button
        key={genre}
        onClick={() => {
            setSearch(genre);
            setPage(1);
        }}
        className="text-left px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-yellow-500/10 hover:pl-6 transition-all duration-200 text-sm font-medium"
      >
        {genre}
      </button>
    ))}
  </div>
</details>
    <details className="group relative cursor-pointer bg-slate-900 border border-slate-800 rounded-xl transition-all duration-300 w-48 shadow-lg">
  
  <summary className="flex items-center justify-between list-none p-3 font-semibold text-white hover:bg-slate-800 transition-colors rounded-xl">
    <div className="flex items-center gap-2 text-sm">
      <BiCategoryAlt className="text-lg text-yellow-500" />
      <span>Category & Type</span>
    </div>
    <svg 
      className="w-4 h-4 text-gray-400 transition-transform duration-300 group-open:rotate-180" 
      fill="none" viewBox="0 0 24 24" stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </summary>

  {/* 'absolute' klassi header balandligini saqlab qoladi */}
  <div className="absolute left-0 top-full mt-2 w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
    {["Movies", "TV Shows", "Modern Classics", "Thriller", "DC Comics", "New Releases"].map((genre) => (
      <button
        key={genre}
        onClick={() => {
            setSearch(genre);
            setPage(1);
        }}
        className="text-left px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-yellow-500/10 hover:pl-6 transition-all duration-200 text-sm font-medium"
      >
        {genre}
      </button>
    ))}
  </div>
</details>

</div>


                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 mt-10'>
                {/* Main Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {!search ? (
                        <div className='col-span-full py-40 flex flex-col items-center justify-center text-slate-500 opacity-50 italic uppercase tracking-widest'>
                            <RiMovie2Fill size={80} className='mb-4' />
                            <p className='text-xl'>Enter a movie title to explore</p>
                        </div>
                    ) : data.length > 0 ? (
                        data.map((movie, index) => (
                            <div key={movie.imdbID || index} className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-yellow-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
                                {/* Poster Image */}
                                <div className='relative h-[420px] overflow-hidden'>
                                    <img 
                                        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=No+Image"} 
                                        alt={movie.Title} 
                                        className='object-cover w-full h-full transition-transform duration-700 group-hover:scale-110' 
                                    />
                                    {/* Overlay Gradient */}
                                    <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80' />
                                    
                                    {/* Type Tag */}
                                    <span className='absolute top-4 right-4 bg-yellow-500/90 text-slate-950 text-[10px] font-black uppercase px-2 py-1 rounded backdrop-blur-sm'>
                                        {movie.Type}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 w-full p-5 bg-slate-900/60 backdrop-blur-sm">
                                    <h2 className='text-lg font-bold leading-tight line-clamp-1 mb-1 group-hover:text-yellow-500 transition-colors'>
                                        {movie.Title}
                                    </h2>
                                    <div className="flex justify-between items-center">
                                        <p className='text-slate-400 text-sm font-medium'>{movie.Year}</p>
                                        <button className='text-[10px] font-bold border border-slate-700 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-all uppercase'>
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : !loading && (
                        <div className='col-span-full py-40 flex flex-col items-center justify-center text-red-500 opacity-70'>
                            <p className='text-xl font-bold'>MOVIE NOT FOUND</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {data.length > 0 && (
                    <div className="flex justify-center items-center mt-20 gap-x-6">
                        <button 
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
                            disabled={page === 1}
                            className={`flex items-center gap-2 h-12 px-6 rounded-full border border-slate-700 bg-slate-900 text-white hover:bg-slate-800 transition-all ${page === 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:border-yellow-500'}`}
                        >
                            <GrLinkPrevious />
                            <span className='font-bold text-sm'>Prev</span>
                        </button>
                        
                        <div className='flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 text-slate-950 font-black text-lg shadow-lg shadow-yellow-500/20'>
                            {page}
                        </div>

                        <button 
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={page * 10 >= totalResults}
                            className={`flex items-center gap-2 h-12 px-6 rounded-full border border-slate-700 bg-slate-900 text-white hover:bg-slate-800 transition-all ${page * 10 >= totalResults ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:border-yellow-500'}`}
                        >
                            <span className='font-bold text-sm'>Next</span>
                            <GrLinkNext />
                        </button>
                    </div>
                )}
            </div>

            {/* Global Loader Overlay */}
            {loading && (
                <div className='fixed inset-0 z-50 bg-slate-950/90 flex flex-col items-center justify-center backdrop-blur-sm'>
                    <TailSpin visible={true} height="60" width="60" color="#eab308" ariaLabel="loading" radius="1" />
                    <p className='mt-4 text-yellow-500 font-bold tracking-widest text-xs uppercase animate-pulse'>Fetching Movies...</p>
                </div>
            )}
        </div>
    );
}