package lk.ijse.spring.repo;

import lk.ijse.spring.dto.DriverDTO;
import lk.ijse.spring.entity.Admin;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DriverRepo extends JpaRepository<Driver,String> {
    Driver getDriverByDrivingLicenceNum(String driverLicenceNum);

    @Query(value = "SELECT * from Driver where availability=:availability",nativeQuery = true)
    List<Driver> getAllByAvailability(@Param("availability") String availability);

}
