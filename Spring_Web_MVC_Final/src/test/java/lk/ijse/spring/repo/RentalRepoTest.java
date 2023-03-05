package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Driver;
import lk.ijse.spring.entity.Rental;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;

import static org.junit.jupiter.api.Assertions.*;

class RentalRepoTest {

    @Autowired
    RentalRepo repo;

    @Test
    public void test1(){

//        Rental rental = repo.updateCarRentStatus("GH-7383","Unvailable");
//        System.out.println(rental.toString());

//        void updateCarRentStatus(@Param("rentalId") String rentalId, @Param("rental_status") String rental_status);
//        System.out.println(driverRandomly);
    }

}