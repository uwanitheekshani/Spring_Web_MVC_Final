package lk.ijse.spring.dto;

import lk.ijse.spring.entity.Car;
import lk.ijse.spring.entity.Driver;
import lk.ijse.spring.entity.Rental;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class RentalDetailsDTO{
    private String rentalId;
    private Rental rental;
    private String registrationId;
    private String driver_id;
    private String driverOption;
    private Car car;
    private Driver driver;
    private LocalDate pickupDate;
    private LocalDate returnDate;
}
