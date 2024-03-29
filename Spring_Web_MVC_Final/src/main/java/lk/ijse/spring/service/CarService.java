package lk.ijse.spring.service;

import lk.ijse.spring.dto.CarDTO;

import java.util.ArrayList;
import java.util.List;

public interface CarService {

    void saveCar(CarDTO carDTO);

    void updateCar(CarDTO carDTO);

    void deleteCar(String id);

    CarDTO getCarDetail(String id);

    ArrayList<CarDTO> getAllCarDetail();

    List<CarDTO> getCarsUnderMaintain();

    List<CarDTO> getCarsNeedMaintain();

    List<CarDTO> getUnavailableOrAvailableCarsByStatus(String status);

    List<CarDTO> getAvailableAndRentalCarsForReservation(String pick_up_date, String return_date, String status);

    void setCarStatusUnavailableOrAvailable(String id, String status);

    List<CarDTO> sortCarsByAttributes(CarDTO carDTO);

    void uploadCarImages(String frontPath, String backPath, String sidePath, String InteriorPath, String registrationNum);

    CarDTO searchCarByRegistrationId(String registrationId);

    void updateCarRentStatus(String registrationNo, String status);

//    CarDTO searchCar(String brand);
long count();
}
