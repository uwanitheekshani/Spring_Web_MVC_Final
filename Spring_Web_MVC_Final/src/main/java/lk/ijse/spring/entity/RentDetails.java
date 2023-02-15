package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Data
public class RentDetails {

    @EmbeddedId
    private RentalDetails_PK id;
    @ManyToOne
    private Driver driver_id;
    private String rental_status;
    private String payment_slip;
}
