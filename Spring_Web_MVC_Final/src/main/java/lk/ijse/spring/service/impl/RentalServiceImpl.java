package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.dto.RentalDTO;
//import lk.ijse.spring.dto.RentalDetailsDTO;
import lk.ijse.spring.entity.Car;
import lk.ijse.spring.entity.Customer;
//import lk.ijse.spring.entity.RentDetails;
import lk.ijse.spring.entity.Rental;
import lk.ijse.spring.repo.*;
import lk.ijse.spring.service.RentalService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RentalServiceImpl implements RentalService {

    @Autowired
    RentalRepo repo;

//    @Autowired
//    RentalDetailsRepo rentalDetailsRepo;

    @Autowired
    CarRepo carRepo;

    @Autowired
    DriverRepo driverRepo;

    @Autowired
    CustomerRepo customerRepo;

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
    public ArrayList<RentalDTO> getAllRentals() {
        return mapper.map(repo.findAll(),new TypeToken<ArrayList<RentalDTO>>(){}.getType());
    }

    @Override
    public void deleteRental(String rentalId) {
        if (!repo.existsById(rentalId)){
            throw new RuntimeException("Rental "+rentalId+" Not Available to Delete..!");
        }
        repo.deleteById(rentalId);
    }

    @Override
    public void updateRental(RentalDTO dto) {
        if (repo.existsById(dto.getRentalId())) {
            repo.save(mapper.map(dto, Rental.class));
        } else {
            throw new RuntimeException("Rent "+dto.getRentalId()+" Not Exist to Update....!");
        }
    }

    @Override
    public void uploadRentalImages(String payment_slip, String rentalId) {
        if (repo.existsById(rentalId)) {
            repo.updatePaymentSlipFilePaths(payment_slip, rentalId);
        } else {
            throw new RuntimeException("Renal Not Found");
        }
    }


    //===========================================================

//    @Override
//    public List<RentalDTO> getCarRentsByStatus(String status) {
//        return mapper.map(repo.getAllByRental_status(status), new TypeToken<List<RentalDTO>>() {
//        }.getType());
//    }
//
    @Override
    public RentalDTO searchRent(String rentalId) {
        if (repo.existsById(rentalId)) {
            return mapper.map(repo.findById(rentalId).get(), RentalDTO.class);
        } else {
            throw new RuntimeException("Rent "+rentalId+" Not Exist....!");
        }
    }

    @Override
    public void updateCarRentStatus(String rentID, String status) {
        if (repo.existsById(rentID)) {
            repo.updateCarRentStatus(rentID, status);
        } else {
            throw new RuntimeException("Rent "+rentID+" Not Exist to Update Status....!");
        }
    }

    @Override
    public void denyRental(String rentId) {
        if (!repo.existsById(rentId)){
            throw new RuntimeException("Rental "+rentId+" Not Available to Delete..!");
        }
        repo.deleteById(rentId);
    }


}
