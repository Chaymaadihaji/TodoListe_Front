import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError("Token d'authentification manquant.");
          return;
        }
  
        const response = await axios.get(
          'https://localhost:7035/api/Comment/allComment',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        setComments(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires:", error);
        if (error.response?.status === 400) {
          setError("Erreur de requête. Veuillez vérifier les paramètres ou l'URL.");
        } else if (error.response?.status === 401) {
          setError("Non autorisé. Veuillez vous connecter.");
        } else {
          setError("Une erreur s'est produite lors du chargement des commentaires.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchComments();
  }, []);
  

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-200 to-white">
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10 max-w-6xl">
        <h2 className="text-3xl font-semibold text-center p-4 bg-gray-800 text-white">
          Liste des Commentaires
        </h2>
        <table className="w-full table-fixed bg-white text-gray-800 shadow-sm">
          <thead>
            <tr className="bg-gray-300">
              <th className="w-1/4 py-4 px-6 text-left font-bold uppercase">Titre de la Tâche</th>
              <th className="w-1/4 py-4 px-6 text-left font-bold uppercase">Contenu du Commentaire</th>
              <th className="w-1/4 py-4 px-6 text-left font-bold uppercase">Date de Création</th>
              <th className="w-1/4 py-4 px-6 text-left font-bold uppercase">Utilisateur</th>
            </tr>
          </thead>
          <tbody>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <tr key={comment.id} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="py-4 px-6">{comment.taskTodo?.title || "Aucun titre"}</td> {/* Accès au titre de la tâche */}
                  <td className="py-4 px-6">{comment.content}</td>
                  <td className="py-4 px-6">{new Date(comment.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-6">{comment.user?.userName || "Inconnu"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 px-6 text-center border-b border-gray-300">
                  Aucun commentaire trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
