import { useEffect, useState, useRef } from 'react';
import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => (
      <Card
        key={post.id}
        {...post}
      />
    ));
  }

  return <h2 className='mt-5 font-bold text-[#6469ff] text-xl uppercase'>{title}</h2>;
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);

  const searchTimeoutRef = useRef(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://2-ai-image-web-lhxt-gb3x4zkj9-brandon-i-sorias-projects.vercel.app/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (error) {
      // Mock alert since jsdom doesn't support it:
      // In production code consider another way of handling errors.
      window.alert && alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);

    clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(() => {
      if (!allPosts) return; // Guard if posts not fetched yet

      const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(newSearchText.toLowerCase()) || item.prompt.toLowerCase().includes(newSearchText.toLowerCase()));

      setSearchedResults(searchResult);
    }, 500);
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>The community Showcase</h1>
        <p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>Browse through a collection of imaginative and visually stunning images generated by DALL-E AI</p>
      </div>

      <div className='mt-16'>
        <FormField
          labelName='Search posts'
          type='text'
          name='text'
          placeholder='Search something...'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing Results for: <span className='text-[#222328]'>{searchText}</span>
              </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title='No Search Results Found'
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title='No Posts Found'
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;

// import { useEffect, useState, useRef } from 'react';
// import { Card, FormField, Loader } from '../components';

// // Child Component
// const RenderCards = ({ data, title }) => {
//   if (data?.length > 0) {
//     return data.map((post) => (
//       <Card
//         key={post.id}
//         {...post}
//       />
//     ));
//   }

//   // Fallback Return (in case data is falsy)
//   return <h2 className='mt-5 font-bold text-[#6469ff] text-xl uppercase'>{title}</h2>;
// };

// const Home = () => {
//   const [loading, setLoading] = useState(false);
//   const [allPosts, setAllPosts] = useState(null);

//   const [searchText, setSearchText] = useState('');
//   const [searchedResults, setSearchedResults] = useState(null);

//   const searchTimeoutRef = useRef(null);

//   // Retrieve posts from cloudinary?
//   const fetchPosts = async () => {
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:8080/api/v1/post', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setAllPosts(result.data.reverse());
//       }
//     } catch (error) {
//       alert(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchText(e.target.value);

//     clearTimeout(searchTimeoutRef.current);

//     clearTimeout.current = setTimeout(() => {
//       // Filter through title and description while debouncing
//       const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));

//       setSearchedResults(searchResult);
//     }, 500);
//   };

//   return (
//     <section className='max-w-7xl mx-auto'>
//       <div>
//         <h1 className='font-extrabold text-[#222328] text-[32px]'>The community Showcase</h1>
//         <p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>Browse through a collection of imaginative and visually stunning images generated by DALL-E AI</p>
//       </div>

//       <div className='mt-16'>
//         <FormField
//           labelName='Search posts'
//           type='text'
//           name='text'
//           placeholder='Search something...'
//           value={searchText}
//           handleChange={handleSearchChange}
//         />
//       </div>

//       <div className='mt-10'>
//         {loading ? (
//           <div className='flex justify-center items-center'>
//             <Loader />
//           </div>
//         ) : (
//           <>
//             {/* If searchText is truthy */}
//             {searchText && (
//               <h2 className='font-medium text-[#666e75] text-xl mb-3'>
//                 Showing Results for: <span className='text-[#222328]'>{searchText}</span>
//               </h2>
//             )}
//             {/* Render Images */}
//             <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
//               {searchText ? (
//                 <RenderCards
//                   data={searchedResults}
//                   title='No Search Results Found'
//                 />
//               ) : (
//                 <RenderCards
//                   data={allPosts}
//                   title='No Posts Found'
//                 />
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Home;
