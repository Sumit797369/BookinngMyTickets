import React, { useEffect, useState } from "react";

import axios from "axios";

import { Navigate } from "react-router-dom";

import { serverUrl } from "../../App";

const ProtectedAdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/auth/check-admin`, {
        withCredentials: true,
      });

      if (data.role === "admin") {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/admin-login" />;
  }

  return children;
};

export default ProtectedAdminRoute;
