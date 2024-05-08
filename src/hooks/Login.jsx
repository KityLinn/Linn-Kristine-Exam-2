import React, { useState, useEffect } from 'react';


export function Login() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
          try {
            setIsLoading(true);
            setIsError(false);
            const fetchedData = await fetch(url);
            const json = await fetchedData.json();
            setData(json);
          } catch (error) {
            console.log(error);
            setIsError(true);
          } finally {
            setIsLoading(false);
          }
        }
    
        getData();
      }, [url]);
      return { data };

  }
    