package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Admin;
import lk.ijse.spring.entity.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface RentalRepo extends JpaRepository<Rental,String> {


    @Modifying
    @Transactional
    @Query(value = "UPDATE Rental SET payment_slip=:payment_slip", nativeQuery = true)
    void updatePaymentSlipFilePaths(@Param("payment_slip") String payment_slip, @Param("rentalId") String rentalId);



    @Query(value = "SELECT rentalId FROM Rental ORDER BY rentalId DESC LIMIT 1", nativeQuery = true)
    String generateRentalId();
}
