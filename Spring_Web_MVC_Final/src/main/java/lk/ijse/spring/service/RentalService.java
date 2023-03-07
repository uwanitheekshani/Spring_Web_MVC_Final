package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.RentalDTO;
import lk.ijse.spring.entity.Rental;

import java.util.ArrayList;
import java.util.List;

public interface RentalService {

    public String generateRentalId();

    void saveRental(RentalDTO rentalDTO);

    void uploadRentalImages(String payment_slip, String rentalId);

    public ArrayList<RentalDTO> getAllRentals();

    void deleteRental(String rentalId);

    void updateRental(RentalDTO dto);

    //====================================================

//    List<RentalDTO> getCarRentsByStatus(String status);
//
    RentalDTO searchRent(String rentalId);

    void updateCarRentStatus(String rentID, String status);

    void denyRental(String rentId);

    public List<RentalDTO> getAllByDriverID(String status, String driverId);
//    RentalDTO searchDriverRent(String driverId);

}
