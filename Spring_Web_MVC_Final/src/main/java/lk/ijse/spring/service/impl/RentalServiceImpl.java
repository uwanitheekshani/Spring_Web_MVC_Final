package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.RentalDTO;
import lk.ijse.spring.dto.RentalDetailsDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.RentDetails;
import lk.ijse.spring.entity.Rental;
import lk.ijse.spring.repo.*;
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
//        if (repo.existsById(rentalDTO.getRentalId())){
//            throw new RuntimeException("Rental "+rentalDTO.getRentalId()+" Already Exist..!");
//        }
//        Rental entity = mapper.map(rentalDTO, Rental.class);
//        repo.save(entity);

        if (!repo.existsById(rentalDTO.getRentalId())) {
            /*   Customer customer = customerRepo.findById(entity.getCustomer()).get();*/
            Rental rental = new Rental(
                    rentalDTO.getRentalId(),
                    rentalDTO.getCusNic(),
                    rentalDTO.getPickUpDate(),
                    rentalDTO.getReturnDate(),
                    rentalDTO.getRental_status(),
                    "uploads/"+rentalDTO.getPayment_slip(),
                    rentalDTO.getAmount(),
                    rentalDTO.getTotal_damage_waiver_payment(),
                    rentalDTO.getPickupLocation(),
                    rentalDTO.getReturnLocation()
            );

            Rental IsRental = repo.save(rental);

            if (IsRental != null) {
                for (RentalDetailsDTO rentDetailsDTO : rentalDTO.getRentDetails()) {
                    /* Booking booking1 = bookingRepo.findById(detailsDTO.getBookingId()).get();*/
                    RentDetails rentDetails = new RentDetails(
                            rentDetailsDTO.getRegistrationId(),
                            rentDetailsDTO.getDriver_id(),
                            rentDetailsDTO.getDriverOption(),
                            rental
                    );
                   rentalDetailsRepo.save(rentDetails);
//                    RentDetails IsRentalDetails = rentalDetailsRepo.save(rentDetails);

//                    if (IsRentalDetails != null) {
//
////                        System.out.println(detailsDTO.getDriverNICNumber());
//                        if(rentDetailsDTO.getDriver_id().equals("Driver")){
//                            Driver driver=mapper.map( driverService.getRandomDriver(),Driver.class);


//                        DriverSchedule driverSchedule = new DriverSchedule(
//                                detailsDTO.getPickUpDate(),
//                                detailsDTO.getReturnDate(),
//                                "On Work",
//                                IsBookingDetails,
//                                driver
//                        );
//                        DriverSchedule IsDriverSchedule = drivescheduleRepo.save(driverSchedule);
//                    }
//                    if (IsBookingDetails != null) {
//                        Vehicle vehicle = vehicleRepo.findById(detailsDTO.getVehicleNumber()).get();
//                        VehicleSchedule vehicleSchedule = new VehicleSchedule(
//                                detailsDTO.getPickUpDate(),
//                                detailsDTO.getReturnDate(),
//                                "On Booking",
//                                IsBookingDetails,
//                                vehicle
//                        );
//                        vehicleScheduleRepo.save(vehicleSchedule);
//                    }


                }



            }
        } else {
            throw new RuntimeException("This Booking ID is Already Exist !");
        }
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
