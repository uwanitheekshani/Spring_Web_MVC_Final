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
    String rentalId;
    private Rental rental;
    private Driver driver;
    private Car car;
    private String rental_status;
    private String payment_slip;
    private LocalDate pickupDate;
    private LocalDate returnDate;
}
