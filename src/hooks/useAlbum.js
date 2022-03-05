import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

export const useAlbum = (contract) => {
  const { token } = useMoralisWeb3Api();
  const { isInitialized } = useMoralis();

  const [album, setAlbum] = useState();

  useEffect(() => {
    if (isInitialized) {
      fetchAlbum().then((songs) => {
        setAlbum(songs.result)
        });
    }
  }, [isInitialized, contract]);

  const fetchAlbum = async () => {
    return await token
      .getAllTokenIds({
        address: contract,
        chain: "mumbai"
      })
      .then((result) => result);
  };

  return { fetchAlbum, album };
};