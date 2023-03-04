package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.RentalDTO;
import lk.ijse.spring.entity.Rental;

import java.util.ArrayList;

public interface RentalService {

    public String generateRentalId();

    void saveRental(RentalDTO rentalDTO);

    void uploadRentalImages(String payment_slip, String rentalId);

    public ArrayList<RentalDTO> getAllRentals();

    void deleteRental(String rentalId);

}
