package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Driver;
import lk.ijse.spring.entity.Rental;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class RentalRepoTest {

    @Autowired
    RentalRepo repo;

//    @Test
//    public void testOne() {
//        List<Rental> dasunPerera = repo.getAllByRental_status("Available");
//        for (Rental rental : dasunPerera) {
//            System.out.println(rental.toString());
//        }
//    }

}