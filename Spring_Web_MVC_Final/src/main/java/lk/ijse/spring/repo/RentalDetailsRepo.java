package lk.ijse.spring.repo;

import lk.ijse.spring.entity.RentDetails;
import lk.ijse.spring.entity.Rental;
import lk.ijse.spring.entity.RentalDetails_PK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface RentalDetailsRepo extends JpaRepository<RentDetails, RentalDetails_PK> {


}
