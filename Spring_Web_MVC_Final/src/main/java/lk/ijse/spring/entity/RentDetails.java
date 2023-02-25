package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Data
public class RentDetails {
    @Id
    String rentalId;
    @ManyToOne
    private Rental rental;
    @ManyToOne
    private Driver driver;
    @ManyToOne
    private Car car;
    private String rental_status;
    private String payment_slip;
    private LocalDate pickupDate;
    private LocalDate returnDate;
}
