import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Trainee = () => {
  const [traineeData, setTraineeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const stagiaireId = localStorage.getItem('stagiaireId');
      const token = localStorage.getItem('authToken');

      const response = await fetch(`https://localhost:7035/trainee/${stagiaireId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTraineeData(data);
      } else {
        console.error('Erreur de récupération des données du stagiaire');
        navigate('/login'); // Rediriger vers la page de connexion en cas d'erreur
      }
      setLoading(false);
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Interface du Stagiaire</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Nom</th>
            <th className="border border-gray-200 p-2">Prénom</th>
            <th className="border border-gray-200 p-2">Email</th>
            <th className="border border-gray-200 p-2">Statut</th>
            {/* Ajoutez d'autres colonnes selon vos besoins */}
          </tr>
        </thead>
        <tbody>
          {traineeData && (
            <tr>
              <td className="border border-gray-200 p-2">{traineeData.lastName}</td>
              <td className="border border-gray-200 p-2">{traineeData.firstName}</td>
              <td className="border border-gray-200 p-2">{traineeData.email}</td>
              <td className="border border-gray-200 p-2">{traineeData.status}</td>
              {/* Ajoutez d'autres données spécifiques ici */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Trainee;
