import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError("Token d'authentification manquant.");
          return;
        }
  
        const response = await axios.get(
          'https://localhost:7035/api/RUser/GetAll',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // Filtrer uniquement les utilisateurs de type "Trainee"
        const traineeUsers = response.data.filter(user => user.userType === "Trainee");
        setUsers(traineeUsers);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Vous n'êtes pas autorisé à voir cette ressource. Veuillez vous connecter.");
        } else {
          setError("Une erreur s'est produite lors du chargement des utilisateurs.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://localhost:7035/api/RUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user.id !== userId)); // Supprime l'utilisateur de la liste localement
      alert("Utilisateur supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      alert("Une erreur s'est produite lors de la suppression de l'utilisateur.");
    }
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-200 to-white">
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10 max-w-6xl">
        <h2 className="text-3xl font-semibold text-center p-4 bg-gray-800 text-white">Liste des Utilisateurs (Trainee)</h2>
        <table className="w-full table-fixed bg-white text-gray-800 shadow-sm">
          <thead>
            <tr className="bg-gray-300">
              <th className="w-1/2 py-4 px-6 text-left font-bold uppercase">Nom d'utilisateur</th>
              <th className="w-1/2 py-4 px-6 text-left font-bold uppercase">Email</th>
              <th className="w-1/4 py-4 px-6 text-left font-bold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="py-4 px-6">{user.userName}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6 flex">
                    <button
                      onClick={() => handleDeleteUser(user.id)} // Appelle la fonction handleDeleteUser avec l'ID utilisateur
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 px-6 text-center border-b border-gray-300">Aucun utilisateur de type Trainee trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
