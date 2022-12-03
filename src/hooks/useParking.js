

import { useContext } from 'react'
import { ParkingContext } from '../context/ParkingContext'

const useParking = () => {

    const parkingContext = useContext(ParkingContext);

  return parkingContext;
};

export default useParking;