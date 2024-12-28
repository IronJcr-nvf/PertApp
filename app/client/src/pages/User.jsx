import React, { useEffect, useState } from "react";
import axios from "axios";

function User() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // جلب بيانات المستخدم بعد تسجيل الدخول أو التسجيل
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          // يمكنك استخدام توكن JWT هنا إذا كنت بحاجة للتحقق من الهوية
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        setUserData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.name}</h1>
          <p>Email: {userData.email}</p>
          <p>Family Name: {userData.familyName}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default User;
