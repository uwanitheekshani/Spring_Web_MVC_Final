package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.RentalDTO;
import lk.ijse.spring.entity.Rental;

public interface RentalService {

//    public String generateRentalId();

    void saveRental(RentalDTO rentalDTO);

    void uploadRentalImages(String payment_slip, String rentalId);
}
