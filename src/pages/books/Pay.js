import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Pay = () => {

const navigate = useNavigate();

  const handleSubmit= ()=>{
    console.log("payment done")
    navigate('/')
  }

  return (

    <>

<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        Payment Done
      </div>
      <div>
        <Button variant='outlined' onClick={handleSubmit}>Continue Shopping</Button>
      </div>
    </div>
    </>
    
  )
}

export default Pay


