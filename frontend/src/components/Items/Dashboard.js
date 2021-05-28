import React, { useState, useEffect, Fragment } from 'react';
import Button from "@material-ui/core/Button";

function handleButtonClick()
{
    const requestOptions={
        method:"POST",
        headers:{
                "Content-Type":"application/json",
                Authorization: `Token ${localStorage.getItem('token')}`,    
            },
    };

    fetch("/api/auth/logout/",requestOptions)
    .then((response)=>response.json())
    .then((data)=>
    {
        localStorage.clear();
        window.location.replace('');
    });

}

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      window.location.replace('');
    } else {
      fetch('http://127.0.0.1:8000/api/auth/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setUserEmail(data.email);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div>
      {loading === false && (
        <Fragment>
          <h1>Dashboard</h1>
          <h2>Hello {userEmail}!</h2>
          <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={()=>
            handleButtonClick()
          }>
              Logout
          </Button>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;