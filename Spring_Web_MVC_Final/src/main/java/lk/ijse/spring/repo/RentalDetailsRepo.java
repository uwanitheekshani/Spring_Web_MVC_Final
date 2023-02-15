package lk.ijse.spring.repo;

import lk.ijse.spring.entity.RentDetails;
import lk.ijse.spring.entity.Rental;
import lk.ijse.spring.entity.RentalDetails_PK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalDetailsRepo extends JpaRepository<RentDetails, RentalDetails_PK> {
}
