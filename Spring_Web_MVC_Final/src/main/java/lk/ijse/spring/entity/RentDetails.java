package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
@IdClass(RentalDetails_PK.class)
@Entity
public class RentDetails {
    @Id
    String rentalId;
    @Id
    String registrationId;
    @Id
    String driver_id;
    private LocalDate pickupDate;
    private LocalDate returnDate;
    private String driverOption;

    @ManyToOne
    @JoinColumn(name = "driver_id",referencedColumnName = "driver_id",insertable = false,updatable = false)
    private Driver driver;
    @ManyToOne
    @JoinColumn(name = "registrationId",referencedColumnName = "registrationId",insertable = false,updatable = false)
    private Car car;

    @ManyToOne
    @JoinColumn(name = "rentalId",referencedColumnName = "rentalId",insertable = false,updatable = false)
    private Rental rental;


//    public RentDetails(String registrationId, String driver_id, String driverOption) {
//        this.registrationId = registrationId;
//        this.driver_id = driver_id;
//        this.driverOption = driverOption;
////         this.rentalId=rentalId;
//    }

    public RentDetails(String registrationId, String driver_id, String driverOption, Rental rental) {
        this.registrationId = registrationId;
        this.driver_id = driver_id;
        this.driverOption = driverOption;
         this.rental=rental;
    }

}
