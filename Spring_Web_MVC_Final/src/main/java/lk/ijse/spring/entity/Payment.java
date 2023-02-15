package lk.ijse.spring.entity;

import javax.persistence.OneToOne;
import java.time.LocalDate;

public class Payment {

    private String paymentId;
    private LocalDate date;
    private double rent_amount;
    private long extra_mileage;
    private double cost_per_extra_km;
    private double damage_cost;
    private String damageDescription;
    private String payment_status;

    @OneToOne
    private Rental rentalId;
}
