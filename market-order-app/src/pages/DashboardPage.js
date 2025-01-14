import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DashboardPage.css";

const DashboardPage = () => {
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Açılır menü durumu
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Dropdown dışına tıklamayı algılamak için

  // Kullanıcı Bilgilerini API'den Çek
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Giriş yapan kullanıcı ID'sini alın
        if (!userId) {
          navigate("/login"); // Kullanıcı giriş yapmamışsa login'e yönlendir
          return;
        }

        const response = await axios.get(`http://localhost:5043/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUser();
  }, [navigate]);

  // Kategorileri API'den Çek
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5043/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  // Dropdown açma/kapatma
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Dropdown dışında bir yere tıklanırsa kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard-container">
      {/* Kullanıcı Paneli */}
      <div className="user-panel" ref={dropdownRef}>
        <div className="profile-info" onClick={toggleDropdown}>
          <img
            src="/images/default-profile.png"
            alt="Profile"
            className="profile-picture"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <span className="user-name">
            {user.firstName} {user.lastName}
          </span>
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <ul>
              <li>Bilgilerim</li>
              <li>Adreslerim</li>
              <li>Siparişlerim</li>
              <li
                onClick={() => {
                  localStorage.removeItem("userId");
                  navigate("/login");
                }}
              >
                Çıkış Yap
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Dashboard Başlığı */}
      <h1 className="dashboard-title">Welcome to the Market Dashboard</h1>

      {/* Kategoriler */}
      <div className="categories-grid">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.Id} className="category-card">
              {category.Name}
            </div>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
