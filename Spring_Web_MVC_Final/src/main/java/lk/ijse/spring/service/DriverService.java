package lk.ijse.spring.service;

import lk.ijse.spring.dto.AdminDTO;
import lk.ijse.spring.dto.DriverDTO;
import lk.ijse.spring.dto.RentalDTO;

import java.util.List;

public interface DriverService {

    DriverDTO checkDriverLogIn(String name, String password);

    void saveDriver(DriverDTO driverDTO);

    void updateDriver(DriverDTO driverDTO);

    void deleteDriver(String id);

    public String generateDriverId();

    DriverDTO getDriverDetail(String id);

    List<DriverDTO> getAllDriverDetail();

    List<DriverDTO> getTodayAvailableAndOccupiedDrivers(String status);

    DriverDTO searchDriverByLicence(String driverLicenceNum);

//    DriverDTO getAllByAvailability();

    DriverDTO searchDriverByAvailabilty(String availability);

//    public List<DriverDTO> getRandomDriver();
    DriverDTO generateDriver();

    void updateDriverStatus(String driverID, String status);

    long count();

//    DriverDTO searchDriverBydriverId(String drivingId);
}
