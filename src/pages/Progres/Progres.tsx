import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs } from "firebase/firestore";

export default function Progres() {
  const [weightData, setWeightData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "weight"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWeightData(data);
      } catch (error) {
        console.error("Error fetching weight data:", error);
      }
    };

    fetchData();
  }, [weightData]);

  return (
    <div>
      {weightData
        .slice()
        .sort((a, b) => (a.date && b.date ? new Date(a.date).getTime() - new Date(b.date).getTime() : 0))
        .map(weight => (
          <div key={weight.id}>
            {weight.date && <p>Date: {weight.date}</p>}
            {weight.weight && <p>Weight: {weight.weight}</p>}
            {weight.imageUrl && <img src={weight.imageUrl} alt="uploaded" />}
          </div>
        ))}
    </div>
  );
}