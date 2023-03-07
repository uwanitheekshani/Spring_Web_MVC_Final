package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Rental {
    @Id
    private String rentalId;
    private LocalDate pickUpDate;
    private LocalDate returnDate;
    private String payment_slip;
//    private double amount;
    private String rental_status;
    private double total_damage_waiver_payment;
    private String pickupLocation;
    private String returnLocation;
    private String driverOption;


    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "nic",referencedColumnName = "nic",nullable = false)
    private Customer cusNic;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "driverID",referencedColumnName = "driverID")
    private Driver driverID;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "registrationId",referencedColumnName = "registrationId")
    private Car registrationID;


//    @OneToMany(mappedBy = "rental",cascade = CascadeType.ALL)
//    private List<RentDetails> rentDetails;

//    public Rental(String rentalId, Customer cusNic, LocalDate pickUpDate, LocalDate returnDate, String rental_status, String payment_slip, double amount, double total_damage_waiver_payment, String pickupLocation, String returnLocation) {
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
