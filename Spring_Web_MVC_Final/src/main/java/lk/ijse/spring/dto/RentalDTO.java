package lk.ijse.spring.dto;

import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Driver;
//import lk.ijse.spring.entity.RentDetails;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.ManyToOne;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class RentalDTO {
    private String rentalId;
    private String cusNic;
    private LocalDate pickUpDate;
    private LocalDate returnDate;
    private String rental_status;
    private String payment_slip;
    private double total_damage_waiver_payment;
    private String pickupLocation;
    private String returnLocation;
    private String driverID;
    private String registrationID;
    private String driverOption;

//    private List<RentalDetailsDTO> rentDetails;

//    public RentalDTO(String rentalId, Customer cusNic, LocalDate pickUpDate, LocalDate returnDate, String rental_status, String payment_slip, double amount, double total_damage_waiver_payment, String pickupLocation, String returnLocation) {
//        this.rentalId = rentalId;
//        this.cusNic = cusNic;
//        this.pickUpDate = pickUpDate;
//        this.returnDate = returnDate;
//        this.rental_status = rental_status;
//        this.payment_slip = payment_slip;
//        this.amount = amount;
//        this.total_damage_waiver_payment = total_damage_waiver_payment;
//        this.pickupLocation = pickupLocation;
//        this.returnLocation = returnLocation;
//    }
}
