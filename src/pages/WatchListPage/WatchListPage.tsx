import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function WatchListPage() {
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  return <h1>Hello</h1>;
}
