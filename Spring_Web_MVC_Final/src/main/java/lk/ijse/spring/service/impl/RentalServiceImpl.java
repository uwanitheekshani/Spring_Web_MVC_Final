package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.RentalDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Rental;
import lk.ijse.spring.repo.CarRepo;
import lk.ijse.spring.repo.DriverRepo;
import lk.ijse.spring.repo.RentalDetailsRepo;
import lk.ijse.spring.repo.RentalRepo;
import lk.ijse.spring.service.CarService;
import lk.ijse.spring.service.PaymentService;
import lk.ijse.spring.service.RentalService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class RentalServiceImpl implements RentalService {

    @Autowired
    RentalRepo repo;

    @Autowired
    RentalDetailsRepo rentalDetailsRepo;

    @Autowired
    CarRepo carRepo;

    @Autowired
    DriverRepo driverRepo;

    @Autowired
    ModelMapper mapper;


    @Override
    public String generateRentalId() {
        String lastId = repo.generateRentalId();
        String id = "";

        if (lastId != null) {
            int tempId = Integer.parseInt(lastId.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                id = "R00-000" + tempId;
            } else if (tempId <= 99) {
                id = "R00-00" + tempId;
            } else if (tempId <= 999) {
                id = "R00-0" + tempId;
            } else if (tempId <= 9999) {
                id = "R00-" + tempId;
            }
        } else {
            id = "R00-0001";
        }
        return id;
    }

    @Override
    public void saveRental(RentalDTO rentalDTO) {
        if (repo.existsById(rentalDTO.getRentalId())){
            throw new RuntimeException("Rental "+rentalDTO.getRentalId()+" Already Exist..!");
        }
        Rental entity = mapper.map(rentalDTO, Rental.class);
        repo.save(entity);
    }

    @Override
    public void uploadRentalImages(String payment_slip, String rentalId) {
        if (repo.existsById(rentalId)) {
            repo.updatePaymentSlipFilePaths(payment_slip, rentalId);
        } else {
            throw new RuntimeException("Customer Not Found");
        }
    }

//    @Override
//    public void uploadRentalImages(String payment_slip, Rental rentalId) {
//        if (rentalDetails.existsById(rentalId)) {
//            rentalDetails.updatePaymentSlipFilePaths(payment_slip, rentalId);
//        } else {
//            throw new RuntimeException("Customer Not Found");
//        }
//    }
}
