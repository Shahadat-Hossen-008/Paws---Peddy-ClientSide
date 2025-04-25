

import useAxiosPublic from "./useAxiosPublic";


import toast from "react-hot-toast";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";


function UseFetch (searchQuery, category) {
  const axiosPublic = useAxiosPublic()
    const fetchPets = async ({ pageParam = 1 }) => {
      try {
        const { data } = await axiosPublic.get("/all-pets", {
          params: {
            query: searchQuery,
            category: category,
            page: pageParam,
            limit: 10,
          },
        });
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    };
    const {
      data,
      hasNextPage, fetchNextPage, status, isFetchingNextPage, isPending
    } = useInfiniteQuery({
      queryKey:["pets", searchQuery, category],
      queryFn: fetchPets,
      getNextPageParam:(lastPage, allPages)=>{
        
        return lastPage?.length === 10 ? allPages.length + 1 : undefined;
      }
    }
    );
    const handleScroll =()=>{
      const footer = document.getElementById('footer')
      const footerHeight = footer ? footer.offsetHeight : 0;
      const bottom = window.innerHeight + window.scrollY + 20 >= document.documentElement.scrollHeight - footerHeight ;
      if(bottom && hasNextPage && !isFetchingNextPage){
        fetchNextPage()
      }
    }
    useEffect(()=>{
      window.addEventListener('scroll', handleScroll)
      return ()=>window.removeEventListener('scroll', handleScroll)
    }, [hasNextPage, isFetchingNextPage])
   // Flatten the pages into a single array of pets
   const pets = data?.pages?.flatMap(page => page) || [];
   

  return [pets, status, isFetchingNextPage, isPending]
}

export default UseFetch